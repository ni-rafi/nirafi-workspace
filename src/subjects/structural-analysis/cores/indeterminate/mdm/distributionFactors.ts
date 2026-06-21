import { IMdmDfSetupStep } from '../../shared/types/step-protocol';
import { INode, IMember, IFrameSupport } from '../../../features/frame-solver/types/frame';

// Calculates the length of a member in meters
export function getMemberLength(member: IMember, nodes: INode[]): number {
  const start = nodes.find(n => n.id === member.startNodeId);
  const end = nodes.find(n => n.id === member.endNodeId);
  if (!start || !end) return 1.0;
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  return Math.sqrt(dx * dx + dy * dy);
}

// Determines the far-end boundary condition of a member
export function getFarEndCondition(
  member: IMember,
  nearNodeId: string,
  farNodeId: string,
  allMembers: IMember[],
  supports: IFrameSupport[]
): 'FIXED' | 'PINNED' | 'CANTILEVER' | 'CONTINUOUS' {
  // Check if there is a pinned release at the far node for this member
  const isFarRelease = (nearNodeId === member.startNodeId)
    ? member.releases?.end
    : member.releases?.start;

  if (isFarRelease) {
    return 'PINNED';
  }

  // Find if farNode has a support
  const support = supports.find(s => s.nodeId === farNodeId);
  
  // Find other members connected to farNode
  const otherMembers = allMembers.filter(
    m => m.id !== member.id && (m.startNodeId === farNodeId || m.endNodeId === farNodeId)
  );

  if (otherMembers.length > 0) {
    return 'CONTINUOUS';
  }

  if (support) {
    if (support.type === 'fixed') {
      return 'FIXED';
    }
    return 'PINNED';
  }

  return 'CANTILEVER';
}

// Computes stiffness (k) for a member seen from a specific node
export function getMemberStiffness(
  member: IMember,
  L: number,
  farEndCondition: 'FIXED' | 'PINNED' | 'CANTILEVER' | 'CONTINUOUS'
): number {
  if (farEndCondition === 'CANTILEVER') {
    return 0;
  }

  const E = member.E ?? 200; // GPa
  const I = member.I ?? 100; // 10^6 mm^4
  const EI = E * I; // kN * m^2

  if (farEndCondition === 'PINNED') {
    // 3 * E * I / L
    return (3 * EI) / L;
  }

  // FIXED or CONTINUOUS far end: 4 * E * I / L
  return (4 * EI) / L;
}

/**
 * Computes Stiffness and Distribution Factors for all joints in the structure.
 */
export function calculateDistributionFactors(
  nodes: INode[],
  members: IMember[],
  supports: IFrameSupport[]
): IMdmDfSetupStep {
  const jointsPayload: IMdmDfSetupPayload['joints'] = [];

  // Identify all nodes that connect to at least one member
  nodes.forEach(node => {
    const connectedMembers = members.filter(
      m => m.startNodeId === node.id || m.endNodeId === node.id
    );

    if (connectedMembers.length === 0) return;

    // Check support condition at this near node
    const nearSupport = supports.find(s => s.nodeId === node.id);
    const isNearFixed = nearSupport?.type === 'fixed';

    const membersDfList = connectedMembers.map(member => {
      const farNodeId = member.startNodeId === node.id ? member.endNodeId : member.startNodeId;
      const L = getMemberLength(member, nodes);
      const farEndCondition = getFarEndCondition(member, node.id, farNodeId, members, supports);
      const stiffness = getMemberStiffness(member, L, farEndCondition);

      return {
        memberId: member.id,
        stiffness,
        df: 0, // Will be computed in the next step
        farNodeId,
        farEndCondition
      };
    });

    if (isNearFixed) {
      // DFs for members meeting at a fixed support are 0 (fixed support absorbs all moment)
      membersDfList.forEach(m => {
        m.df = 0;
      });
    } else {
      // Calculate total stiffness at this joint
      const totalStiffness = membersDfList.reduce((sum, m) => sum + m.stiffness, 0);

      if (totalStiffness > 0) {
        membersDfList.forEach(m => {
          m.df = m.stiffness / totalStiffness;
        });
      } else {
        // If all connected members are cantilevers (total stiffness = 0)
        membersDfList.forEach(m => {
          m.df = 0;
        });
      }
    }

    jointsPayload.push({
      nodeId: node.id,
      members: membersDfList
    });
  });

  return {
    stepId: `mdm_df_setup_${Date.now()}`,
    type: 'MDM_DF_SETUP',
    payload: {
      joints: jointsPayload
    }
  };
}

// Interface Helper from step-protocol
interface IMdmDfSetupPayload {
  joints: {
    nodeId: string;
    members: {
      memberId: string;
      stiffness: number;
      df: number;
      farNodeId: string;
      farEndCondition: 'FIXED' | 'PINNED' | 'CANTILEVER' | 'CONTINUOUS';
    }[];
  }[];
}
