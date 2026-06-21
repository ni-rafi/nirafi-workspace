import { 
  IMdmCycleStep, 
  IMdmFinalMomentsStep, 
  IStructuralStep 
} from '../../shared/types/step-protocol';
import { INode, IMember, IFrameSupport, IFrameLoad } from '../../../features/frame-solver/types/frame';
import { calculatePointLoadFEM, calculateUDLFEM } from '../../frame-solver/fixedEndMoments';
import { calculateDistributionFactors, getMemberLength, getFarEndCondition } from './distributionFactors';

// Computes the reaction moment at the support for a cantilever member under gravity/transverse loads
function calculateCantileverMoment(
  member: IMember,
  supportNodeId: string,
  nodes: INode[],
  loads: IFrameLoad[]
): number {
  const L = getMemberLength(member, nodes);
  const memberLoads = loads.filter(l => l.attachedTo === 'member' && l.memberId === member.id);
  let M_support = 0;

  const startNode = nodes.find(n => n.id === member.startNodeId);
  const endNode = nodes.find(n => n.id === member.endNodeId);
  if (!startNode || !endNode) return 0;
  
  const dx = endNode.x - startNode.x;
  const dy = endNode.y - startNode.y;
  const cosT = dx / L;
  const sinT = dy / L;

  memberLoads.forEach(load => {
    let P = load.magnitude;
    if (load.direction === 'global-vertical') {
      P = load.magnitude * cosT;
    } else if (load.direction === 'global-horizontal') {
      P = -load.magnitude * sinT;
    }

    if (load.type === 'point') {
      const dist = (supportNodeId === member.startNodeId)
        ? (load.position ?? 0.5) * L
        : L - (load.position ?? 0.5) * L;
      // Resisting moment is counterclockwise (negative) under positive gravity load
      M_support += -P * dist;
    } else if (load.type === 'udl') {
      M_support += -(P * L * L) / 2;
    }
  });

  return M_support;
}

/**
 * Executes the Moment Distribution Method on non-sway frames or continuous beams.
 */
export function solveMDM(
  nodes: INode[],
  members: IMember[],
  supports: IFrameSupport[],
  loads: IFrameLoad[]
): {
  finalMoments: Map<string, { M_ab: number; M_ba: number }>;
  steps: IStructuralStep[];
} {
  const steps: IStructuralStep[] = [];

  // 1. Setup Stiffnesses and Distribution Factors
  const dfStep = calculateDistributionFactors(nodes, members, supports);
  steps.push(dfStep);

  // Initialize member end moments maps
  const M_ab_map = new Map<string, number>();
  const M_ba_map = new Map<string, number>();
  
  // Initialize FEMs
  members.forEach(member => {
    M_ab_map.set(member.id, 0);
    M_ba_map.set(member.id, 0);
  });

  // 2. Compute Initial Fixed-End Moments from external member loads
  members.forEach(member => {
    const L = getMemberLength(member, nodes);
    
    // Check if member is cantilever from start or end node
    const startFar = getFarEndCondition(member, member.startNodeId, member.endNodeId, members, supports);
    const endFar = getFarEndCondition(member, member.endNodeId, member.startNodeId, members, supports);

    if (startFar === 'CANTILEVER') {
      // End node is free, start node is support. Compute moment at start node (M_ab)
      const M_support = calculateCantileverMoment(member, member.startNodeId, nodes, loads);
      M_ab_map.set(member.id, M_support);
      M_ba_map.set(member.id, 0);
      return;
    }
    if (endFar === 'CANTILEVER') {
      // Start node is free, end node is support. Compute moment at end node (M_ba)
      const M_support = calculateCantileverMoment(member, member.endNodeId, nodes, loads);
      M_ba_map.set(member.id, M_support);
      M_ab_map.set(member.id, 0);
      return;
    }

    // Standard fixed-fixed member: calculate FEMs
    const memberLoads = loads.filter(l => l.attachedTo === 'member' && l.memberId === member.id);
    const startNode = nodes.find(n => n.id === member.startNodeId);
    const endNode = nodes.find(n => n.id === member.endNodeId);
    if (!startNode || !endNode) return;
    
    const dx = endNode.x - startNode.x;
    const dy = endNode.y - startNode.y;
    const cosT = dx / L;
    const sinT = dy / L;

    memberLoads.forEach(load => {
      let P = load.magnitude;
      if (load.direction === 'global-vertical') {
        P = load.magnitude * cosT;
      } else if (load.direction === 'global-horizontal') {
        P = -load.magnitude * sinT;
      }

      let femStep;
      if (load.type === 'point') {
        femStep = calculatePointLoadFEM(member.id, L, P, load.position ?? 0.5);
      } else if (load.type === 'udl') {
        femStep = calculateUDLFEM(member.id, L, P, 0, L);
      }

      if (femStep) {
        steps.push(femStep);
        // Convert to clockwise-positive reaction convention (multiply by -1)
        M_ab_map.set(member.id, (M_ab_map.get(member.id) ?? 0) - femStep.payload.results.M_ab);
        M_ba_map.set(member.id, (M_ba_map.get(member.id) ?? 0) - femStep.payload.results.M_ba);
      }
    });
  });

  // 3. Iterative Joint Balancing and Carry-Over cycles
  const maxCycles = 10;
  const tolerance = 0.01; // kNm

  for (let cycle = 0; cycle < maxCycles; cycle++) {
    const balances: IMdmCyclePayload['balances'] = [];
    const carryOvers: IMdmCyclePayload['carryOvers'] = [];

    // Map to store distributed moments in this cycle for carry-over calculation
    const dist_ab_map = new Map<string, number>();
    const dist_ba_map = new Map<string, number>();

    // A. Balance joint moments
    dfStep.payload.joints.forEach(joint => {
      // Sum moments of all members meeting at this joint
      let unbalancedMoment = 0;
      joint.members.forEach(m => {
        const isStart = members.find(mem => mem.id === m.memberId)?.startNodeId === joint.nodeId;
        unbalancedMoment += isStart ? (M_ab_map.get(m.memberId) ?? 0) : (M_ba_map.get(m.memberId) ?? 0);
      });

      const distributions: { memberId: string; distributedMoment: number }[] = [];

      joint.members.forEach(m => {
        const distMoment = -m.df * unbalancedMoment;
        distributions.push({
          memberId: m.memberId,
          distributedMoment: distMoment
        });

        const isStart = members.find(mem => mem.id === m.memberId)?.startNodeId === joint.nodeId;
        if (isStart) {
          dist_ab_map.set(m.memberId, distMoment);
        } else {
          dist_ba_map.set(m.memberId, distMoment);
        }
      });

      balances.push({
        nodeId: joint.nodeId,
        unbalancedMoment,
        distributions
      });
    });

    // B. Carry-Over distributed moments to far ends
    members.forEach(member => {
      const startFar = getFarEndCondition(member, member.startNodeId, member.endNodeId, members, supports);
      const endFar = getFarEndCondition(member, member.endNodeId, member.startNodeId, members, supports);

      // Carry-Over from start to end (A to B)
      const dist_ab = dist_ab_map.get(member.id) ?? 0;
      if (dist_ab !== 0 && (startFar === 'FIXED' || startFar === 'CONTINUOUS')) {
        const coMoment = 0.5 * dist_ab;
        carryOvers.push({
          fromMemberId: member.id,
          fromNodeId: member.startNodeId,
          toNodeId: member.endNodeId,
          moment: coMoment
        });
      }

      // Carry-Over from end to start (B to A)
      const dist_ba = dist_ba_map.get(member.id) ?? 0;
      if (dist_ba !== 0 && (endFar === 'FIXED' || endFar === 'CONTINUOUS')) {
        const coMoment = 0.5 * dist_ba;
        carryOvers.push({
          fromMemberId: member.id,
          fromNodeId: member.endNodeId,
          toNodeId: member.startNodeId,
          moment: coMoment
        });
      }
    });

    // Update current moment state for next cycle
    members.forEach(member => {
      const dist_ab = dist_ab_map.get(member.id) ?? 0;
      const dist_ba = dist_ba_map.get(member.id) ?? 0;

      const co_to_ab = carryOvers.find(co => co.fromMemberId === member.id && co.toNodeId === member.startNodeId)?.moment ?? 0;
      const co_to_ba = carryOvers.find(co => co.fromMemberId === member.id && co.toNodeId === member.endNodeId)?.moment ?? 0;

      M_ab_map.set(member.id, (M_ab_map.get(member.id) ?? 0) + dist_ab + co_to_ab);
      M_ba_map.set(member.id, (M_ba_map.get(member.id) ?? 0) + dist_ba + co_to_ba);
    });

    // Log cycle steps
    const cycleStep: IMdmCycleStep = {
      stepId: `mdm_cycle_${cycle}_${Date.now()}`,
      type: 'MDM_CYCLE',
      payload: {
        cycleIndex: cycle,
        balances,
        carryOvers
      }
    };
    steps.push(cycleStep);

    // C. Check Convergence: if all unbalanced moments are close to zero
    const maxUnbalanced = Math.max(...balances.map(b => Math.abs(b.unbalancedMoment)));
    if (maxUnbalanced < tolerance) {
      break;
    }
  }

  // 4. Sum up final member end moments
  const finalMoments = new Map<string, { M_ab: number; M_ba: number }>();
  const memberEndMoments: IMdmFinalMomentsPayload['memberEndMoments'] = [];

  members.forEach(member => {
    const M_ab = parseFloat((M_ab_map.get(member.id) ?? 0).toFixed(3));
    const M_ba = parseFloat((M_ba_map.get(member.id) ?? 0).toFixed(3));
    finalMoments.set(member.id, { M_ab, M_ba });

    memberEndMoments.push({
      memberId: member.id,
      startMoment: M_ab,
      endMoment: M_ba
    });
  });

  const finalStep: IMdmFinalMomentsStep = {
    stepId: `mdm_final_moments_${Date.now()}`,
    type: 'MDM_FINAL_MOMENTS',
    payload: {
      memberEndMoments
    }
  };
  steps.push(finalStep);

  return { finalMoments, steps };
}

// Interface Helper from step-protocol
interface IMdmCyclePayload {
  cycleIndex: number;
  balances: {
    nodeId: string;
    unbalancedMoment: number;
    distributions: {
      memberId: string;
      distributedMoment: number;
    }[];
  }[];
  carryOvers: {
    fromMemberId: string;
    fromNodeId: string;
    toNodeId: string;
    moment: number;
  }[];
}

interface IMdmFinalMomentsPayload {
  memberEndMoments: {
    memberId: string;
    startMoment: number;
    endMoment: number;
  }[];
}
