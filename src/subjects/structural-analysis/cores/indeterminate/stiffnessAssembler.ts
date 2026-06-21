import { IMemberStiffnessStep } from '../shared/types/step-protocol';
import { INode, IMember } from '../../features/frame-solver/types/frame';

// Helper to create a 2D matrix filled with zeros
function createZeroMatrix(rows: number, cols: number): number[][] {
  return Array.from({ length: rows }, () => new Array<number>(cols).fill(0));
}

// Transposes a square matrix
function transpose(A: number[][]): number[][] {
  const n = A.length;
  const AT = createZeroMatrix(n, n);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      AT[j]![i] = A[i]![j]!;
    }
  }
  return AT;
}

// Multiplies two matrices
function multiply(A: number[][], B: number[][]): number[][] {
  const rA = A.length;
  const cA = A[0]!.length;
  const cB = B[0]!.length;
  const C = createZeroMatrix(rA, cB);

  for (let i = 0; i < rA; i++) {
    for (let j = 0; j < cB; j++) {
      let sum = 0;
      for (let k = 0; k < cA; k++) {
        sum += A[i]![k]! * B[k]![j]!;
      }
      C[i]![j] = sum;
    }
  }
  return C;
}

/**
 * Computes 6x6 local stiffness matrix [k], transformation matrix [T], and global matrix [kg] for a member.
 */
export function buildMemberStiffness(
  member: IMember,
  startNode: INode,
  endNode: INode,
  nodeToIndex: Map<string, number>
): IMemberStiffnessStep {
  const dx = endNode.x - startNode.x;
  const dy = endNode.y - startNode.y;
  const L = Math.sqrt(dx * dx + dy * dy);

  const cosT = dx / L;
  const sinT = dy / L;

  // E (GPa) -> 10^6 kN/m^2. I (10^6 mm^4) -> 10^-6 m^4.
  // E * I is directly in kN * m^2.
  const E = member.E ?? 200;
  const I = member.I ?? 100;
  const A = member.A ?? 5000; // mm^2 -> 10^-6 m^2. E * A (GPa * mm^2) -> 10^3 kN.
  
  const EI = E * I;
  const EA = E * A;

  // 1. Build Local 6x6 Matrix [k]
  const k = createZeroMatrix(6, 6);
  
  // Axial components
  const axialK = EA / L;
  k[0]![0] = axialK;
  k[0]![3] = -axialK;
  k[3]![0] = -axialK;
  k[3]![3] = axialK;

  // Bending/Shear components
  const k11 = (12 * EI) / (L * L * L);
  const k12 = (6 * EI) / (L * L);
  const k22 = (4 * EI) / L;
  const k25 = (2 * EI) / L;

  k[1]![1] = k11;
  k[1]![2] = k12;
  k[1]![4] = -k11;
  k[1]![5] = k12;

  k[2]![1] = k12;
  k[2]![2] = k22;
  k[2]![4] = -k12;
  k[2]![5] = k25;

  k[4]![1] = -k11;
  k[4]![2] = -k12;
  k[4]![4] = k11;
  k[4]![5] = -k12;

  k[5]![1] = k12;
  k[5]![2] = k25;
  k[5]![4] = -k12;
  k[5]![5] = k22;

  // 2. Build Transformation Matrix [T]
  const T = createZeroMatrix(6, 6);
  T[0]![0] = cosT;
  T[0]![1] = sinT;
  T[1]![0] = -sinT;
  T[1]![1] = cosT;
  T[2]![2] = 1;

  T[3]![3] = cosT;
  T[3]![4] = sinT;
  T[4]![3] = -sinT;
  T[4]![4] = cosT;
  T[5]![5] = 1;

  // 3. Compute Global Matrix [kg] = [T]^T * [k] * [T]
  const TT = transpose(T);
  const kg = multiply(multiply(TT, k), T);

  // 4. Map degrees of freedom
  const startIdx = nodeToIndex.get(member.startNodeId) ?? 0;
  const endIdx = nodeToIndex.get(member.endNodeId) ?? 0;

  const dofMap = [
    3 * startIdx,
    3 * startIdx + 1,
    3 * startIdx + 2,
    3 * endIdx,
    3 * endIdx + 1,
    3 * endIdx + 2
  ];

  return {
    stepId: `stiffness_member_${member.id}_${Date.now()}`,
    type: 'MEMBER_STIFFNESS_SETUP',
    highlightMembers: [member.id],
    payload: {
      memberId: member.id,
      localMatrix: k,
      transformationMatrix: T,
      globalMatrix: kg,
      dofMap
    }
  };
}

/**
 * Assembles individual member global matrices into the structural Global Stiffness Matrix [K].
 * @param nodes List of nodes in the frame
 * @param members List of members in the frame
 * @returns A tuple of the assembled K matrix and the set of setup steps.
 */
export function assembleGlobalStiffness(
  nodes: INode[],
  members: IMember[]
): {
  K: number[][];
  steps: IMemberStiffnessStep[];
} {
  const n = nodes.length;
  const K = createZeroMatrix(3 * n, 3 * n);
  const steps: IMemberStiffnessStep[] = [];

  // Map nodeId to node index (0 to n-1)
  const nodeToIndex = new Map<string, number>();
  nodes.forEach((node, idx) => {
    nodeToIndex.set(node.id, idx);
  });

  // Build and assemble each member
  members.forEach(member => {
    const startNode = nodes.find(n => n.id === member.startNodeId);
    const endNode = nodes.find(n => n.id === member.endNodeId);
    if (!startNode || !endNode) return;

    const step = buildMemberStiffness(member, startNode, endNode, nodeToIndex);
    steps.push(step);

    const kg = step.payload.globalMatrix;
    const map = step.payload.dofMap;

    // Assemble kg into master K
    for (let r = 0; r < 6; r++) {
      for (let c = 0; c < 6; c++) {
        const globalR = map[r]!;
        const globalC = map[c]!;
        K[globalR]![globalC]! += kg[r]![c]!;
      }
    }
  });

  return { K, steps };
}
