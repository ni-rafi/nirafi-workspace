import { 
  IStructuralStep,
  ISdmEquationsPayload,
  ISdmEquilibriumPayload
} from '../../shared/types/step-protocol';
import { INode, IMember, IFrameSupport, IFrameLoad } from '../../../features/frame-solver/types/frame';
import { calculatePointLoadFEM, calculateUDLFEM } from '../../frame-solver/fixedEndMoments';
import { getMemberLength, getFarEndCondition } from '../mdm/distributionFactors';
import { buildSdmEquationsForMember, formatSdmEquationString, ISdmEquation } from './sdmEquations';
import { solveMatrixEquations } from '../matrixSolver';

// Helper to calculate static cantilever moment at the support node
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
      M_support += -P * dist; // Reaction moment is counterclockwise (negative)
    } else if (load.type === 'udl') {
      M_support += -(P * L * L) / 2;
    }
  });

  return M_support;
}

/**
 * Solves moments for non-sway structures using the Slope-Deflection Method.
 */
export function solveSlopeDeflection(
  nodes: INode[],
  members: IMember[],
  supports: IFrameSupport[],
  loads: IFrameLoad[]
): {
  finalMoments: Map<string, { M_ab: number; M_ba: number }>;
  steps: IStructuralStep[];
} {
  const steps: IStructuralStep[] = [];

  // Initialize FEM maps
  const femStartMap = new Map<string, number>();
  const femEndMap = new Map<string, number>();

  members.forEach(member => {
    femStartMap.set(member.id, 0);
    femEndMap.set(member.id, 0);
  });

  // 1. Calculate Initial Fixed-End Moments (FEMs)
  members.forEach(member => {
    const L = getMemberLength(member, nodes);
    const startFar = getFarEndCondition(member, member.startNodeId, member.endNodeId, members, supports);
    const endFar = getFarEndCondition(member, member.endNodeId, member.startNodeId, members, supports);

    if (startFar === 'CANTILEVER' || endFar === 'CANTILEVER') {
      return; // Cantilevers handled statically
    }

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
        // Convert to clockwise-positive reaction convention
        femStartMap.set(member.id, (femStartMap.get(member.id) ?? 0) - femStep.payload.results.M_ab);
        femEndMap.set(member.id, (femEndMap.get(member.id) ?? 0) - femStep.payload.results.M_ba);
      }
    });
  });

  // 2. Build member Slope-Deflection equations
  const memberEquations = new Map<string, { Near: ISdmEquation; Far: ISdmEquation }>();
  const eqSetupList: ISdmEquationsPayload['equations'] = [];

  members.forEach(member => {
    const startFar = getFarEndCondition(member, member.startNodeId, member.endNodeId, members, supports);
    const endFar = getFarEndCondition(member, member.endNodeId, member.startNodeId, members, supports);

    if (startFar === 'CANTILEVER' || endFar === 'CANTILEVER') {
      return; // Cantilevers skipped
    }

    const startFem = femStartMap.get(member.id) ?? 0;
    const endFem = femEndMap.get(member.id) ?? 0;
    
    const sdmEqs = buildSdmEquationsForMember(member, nodes, startFem, endFem);
    memberEquations.set(member.id, sdmEqs);

    eqSetupList.push({
      memberId: member.id,
      equations: {
        nearEnd: `M_${member.id}_${member.startNodeId} = ` + formatSdmEquationString(
          member.startNodeId, member.endNodeId, sdmEqs.Near.nearCoef, sdmEqs.Near.farCoef, sdmEqs.Near.constant
        ),
        farEnd: `M_${member.id}_${member.endNodeId} = ` + formatSdmEquationString(
          member.endNodeId, member.startNodeId, sdmEqs.Far.nearCoef, sdmEqs.Far.farCoef, sdmEqs.Far.constant
        )
      }
    });
  });

  steps.push({
    stepId: `sdm_equations_${Date.now()}`,
    type: 'SDM_EQUATIONS_SETUP',
    payload: { equations: eqSetupList }
  });

  // 3. Identify rotational degrees of freedom (DOFs)
  const activeNodes: string[] = [];
  nodes.forEach(node => {
    // Check if node is connected to at least one member
    const connected = members.some(m => m.startNodeId === node.id || m.endNodeId === node.id);
    if (!connected) return;

    // Fixed supports have zero rotation (not a DOF)
    const support = supports.find(s => s.nodeId === node.id);
    if (support?.type === 'fixed') return;

    // If a node has only 1 connected member and no support, it is a free cantilever end (no rotational DOF)
    const connectedMembers = members.filter(m => m.startNodeId === node.id || m.endNodeId === node.id);
    const hasSupport = supports.some(s => s.nodeId === node.id);
    if (connectedMembers.length === 1 && !hasSupport) return;

    activeNodes.push(node.id);
  });

  const dofMap = new Map<string, number>();
  activeNodes.forEach((nodeId, idx) => {
    dofMap.set(nodeId, idx);
  });

  const n_dof = activeNodes.length;
  const K = Array.from({ length: n_dof }, () => new Array<number>(n_dof).fill(0));
  const F = new Array<number>(n_dof).fill(0);
  const eqList: ISdmEquilibriumPayload['equations'] = [];

  // 4. Assemble Joint Equilibrium Equations
  activeNodes.forEach((nodeId, r) => {
    let totalConstant = 0;
    const sdmTerms: string[] = [];

    // Find all members meeting at this joint
    members.forEach(member => {
      const startFar = getFarEndCondition(member, member.startNodeId, member.endNodeId, members, supports);
      const endFar = getFarEndCondition(member, member.endNodeId, member.startNodeId, members, supports);

      if (member.startNodeId === nodeId) {
        if (startFar === 'CANTILEVER') {
          const M_cant = calculateCantileverMoment(member, nodeId, nodes, loads);
          totalConstant += M_cant;
          sdmTerms.push(`${M_cant.toFixed(2)} (Cantilever)`);
          return;
        }

        const eq = memberEquations.get(member.id)!.Near;
        totalConstant += eq.constant;
        K[r]![r]! += eq.nearCoef;

        const farIdx = dofMap.get(eq.farNodeId);
        if (farIdx !== undefined) {
          K[r]![farIdx]! += eq.farCoef;
        }
        sdmTerms.push(`M_${member.id}_${nodeId}`);
      } else if (member.endNodeId === nodeId) {
        if (endFar === 'CANTILEVER') {
          const M_cant = calculateCantileverMoment(member, nodeId, nodes, loads);
          totalConstant += M_cant;
          sdmTerms.push(`${M_cant.toFixed(2)} (Cantilever)`);
          return;
        }

        const eq = memberEquations.get(member.id)!.Far;
        totalConstant += eq.constant;
        K[r]![r]! += eq.nearCoef;

        const farIdx = dofMap.get(eq.farNodeId);
        if (farIdx !== undefined) {
          K[r]![farIdx]! += eq.farCoef;
        }
        sdmTerms.push(`M_${member.id}_${nodeId}`);
      }
    });

    F[r] = -totalConstant;
    eqList.push({
      nodeId,
      equation: `${sdmTerms.join(' + ')} = 0`
    });
  });

  steps.push({
    stepId: `sdm_equilibrium_${Date.now()}`,
    type: 'SDM_EQUILIBRIUM_SETUP',
    payload: { equations: eqList }
  });

  // 5. Solve linear system for rotations
  let rotations = new Array<number>(n_dof).fill(0);
  if (n_dof > 0) {
    const step = solveMatrixEquations(K, F);
    rotations = step.payload.vectorD ?? [];
    steps.push(step);
  }

  // Helper to resolve rotation for a node
  const getRotation = (nodeId: string) => {
    const idx = dofMap.get(nodeId);
    return idx !== undefined ? rotations[idx]! : 0;
  };

  // 6. Back-Substitute rotations to compute final moments
  const finalMoments = new Map<string, { M_ab: number; M_ba: number }>();
  const finalMomentsList: IMdmFinalMomentsPayload['memberEndMoments'] = [];

  members.forEach(member => {
    const startFar = getFarEndCondition(member, member.startNodeId, member.endNodeId, members, supports);
    const endFar = getFarEndCondition(member, member.endNodeId, member.startNodeId, members, supports);

    let M_ab = 0;
    let M_ba = 0;

    if (startFar === 'CANTILEVER') {
      M_ab = calculateCantileverMoment(member, member.startNodeId, nodes, loads);
      M_ba = 0;
    } else if (endFar === 'CANTILEVER') {
      M_ba = calculateCantileverMoment(member, member.endNodeId, nodes, loads);
      M_ab = 0;
    } else {
      const eq = memberEquations.get(member.id)!;
      const theta_a = getRotation(member.startNodeId);
      const theta_b = getRotation(member.endNodeId);

      M_ab = eq.Near.nearCoef * theta_a + eq.Near.farCoef * theta_b + eq.Near.constant;
      M_ba = eq.Far.farCoef * theta_a + eq.Far.nearCoef * theta_b + eq.Far.constant;
    }

    M_ab = parseFloat(M_ab.toFixed(3));
    M_ba = parseFloat(M_ba.toFixed(3));

    finalMoments.set(member.id, { M_ab, M_ba });
    finalMomentsList.push({
      memberId: member.id,
      startMoment: M_ab,
      endMoment: M_ba
    });
  });

  steps.push({
    stepId: `sdm_final_moments_${Date.now()}`,
    type: 'MDM_FINAL_MOMENTS',
    payload: { memberEndMoments: finalMomentsList }
  });

  return { finalMoments, steps };
}

// Interfaces matching structural step-protocol
interface IMdmFinalMomentsPayload {
  memberEndMoments: {
    memberId: string;
    startMoment: number;
    endMoment: number;
  }[];
}
