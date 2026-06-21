import { describe, it, expect } from 'vitest';
import { buildMemberStiffness, assembleGlobalStiffness } from '../stiffnessAssembler';
import { INode, IMember } from '../../../features/frame-solver/types/frame';

describe('stiffnessAssembler module', () => {
  it('correctly builds a 6x6 local stiffness matrix for a horizontal member', () => {
    const startNode: INode = { id: 'node_1', x: 0, y: 0 };
    const endNode: INode = { id: 'node_2', x: 4, y: 0 }; // L = 4m
    const member: IMember = {
      id: 'member_1',
      startNodeId: 'node_1',
      endNodeId: 'node_2',
      E: 200, // GPa
      I: 100, // 10^6 mm^4
      A: 5000 // mm^2
    };

    const nodeToIndex = new Map<string, number>();
    nodeToIndex.set('node_1', 0);
    nodeToIndex.set('node_2', 1);

    const step = buildMemberStiffness(member, startNode, endNode, nodeToIndex);

    expect(step.type).toBe('MEMBER_STIFFNESS_SETUP');
    expect(step.payload.memberId).toBe('member_1');

    const k = step.payload.localMatrix;
    expect(k).toHaveLength(6);
    expect(k[0]).toHaveLength(6);

    // L = 4m, E = 200, I = 100, A = 5000
    // EA = 200 * 5000 = 1,000,000 kN. EA/L = 250,000 kN/m.
    expect(k[0]![0]).toBeCloseTo(250000, 4);
    expect(k[0]![3]).toBeCloseTo(-250000, 4);

    // EI = 200 * 100 = 20,000 kNm^2.
    // 12EI/L^3 = 12 * 20000 / 64 = 3750 kN/m.
    expect(k[1]![1]).toBeCloseTo(3750, 4);
    expect(k[1]![4]).toBeCloseTo(-3750, 4);

    // 6EI/L^2 = 6 * 20000 / 16 = 7500 kN.
    expect(k[1]![2]).toBeCloseTo(7500, 4);

    // 4EI/L = 4 * 20000 / 4 = 20000 kNm.
    expect(k[2]![2]).toBeCloseTo(20000, 4);

    // 2EI/L = 2 * 20000 / 4 = 10000 kNm.
    expect(k[2]![5]).toBeCloseTo(10000, 4);
  });

  it('correctly transforms stiffness matrices for a vertical column', () => {
    const startNode: INode = { id: 'node_1', x: 0, y: 0 };
    const endNode: INode = { id: 'node_2', x: 0, y: 3 }; // L = 3m, vertical (dx=0, dy=3, angle = 90 deg)
    const member: IMember = {
      id: 'member_1',
      startNodeId: 'node_1',
      endNodeId: 'node_2',
      E: 200,
      I: 100,
      A: 5000
    };

    const nodeToIndex = new Map<string, number>();
    nodeToIndex.set('node_1', 0);
    nodeToIndex.set('node_2', 1);

    const step = buildMemberStiffness(member, startNode, endNode, nodeToIndex);
    const T = step.payload.transformationMatrix;
    const kg = step.payload.globalMatrix;

    // cos(90) = 0, sin(90) = 1
    expect(T[0]![0]).toBeCloseTo(0, 4);
    expect(T[0]![1]).toBeCloseTo(1, 4);
    expect(T[1]![0]).toBeCloseTo(-1, 4);
    expect(T[1]![1]).toBeCloseTo(0, 4);

    // Check that global axial stiffness acts in global Y direction
    // kg[1][1] (global Y translation of node A) should be close to local axial stiffness (EA/L)
    // L = 3m. EA/L = 200 * 5000 / 3 = 333,333.33 kN/m.
    expect(kg[1]![1]).toBeCloseTo(333333.33, 2);
  });

  it('correctly assembles the global stiffness matrix of a portal frame structure', () => {
    const nodes: INode[] = [
      { id: 'node_1', x: 0, y: 0 },
      { id: 'node_2', x: 6, y: 0 },
      { id: 'node_3', x: 0, y: 4 },
      { id: 'node_4', x: 6, y: 4 }
    ];
    const members: IMember[] = [
      { id: 'member_col1', startNodeId: 'node_1', endNodeId: 'node_3', E: 200, I: 100, A: 5000 },
      { id: 'member_col2', startNodeId: 'node_2', endNodeId: 'node_4', E: 200, I: 100, A: 5000 },
      { id: 'member_beam', startNodeId: 'node_3', endNodeId: 'node_4', E: 200, I: 100, A: 5000 }
    ];

    const { K, steps } = assembleGlobalStiffness(nodes, members);

    expect(steps).toHaveLength(3);
    // 4 nodes * 3 DOF = 12x12 master global stiffness matrix K
    expect(K).toHaveLength(12);
    expect(K[0]).toHaveLength(12);

    // Node 3 (index 2) degrees of freedom are 6, 7, 8.
    // Node 4 (index 3) degrees of freedom are 9, 10, 11.
    // Check that there is coupling between Node 3 and Node 4 in global beam stiffness
    expect(K[6]![9]).not.toBe(0); // Horizontal translation coupling
    expect(K[8]![11]).not.toBe(0); // Rotation coupling
  });
});
