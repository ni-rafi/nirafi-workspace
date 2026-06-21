import { describe, it, expect } from 'vitest';
import { calculateDistributionFactors } from '../distributionFactors';
import { solveMDM } from '../mdmSolver';
import { INode, IMember, IFrameSupport, IFrameLoad } from '../../../../features/frame-solver/types/frame';

describe('Moment Distribution Method (MDM) Module', () => {
  it('correctly calculates stiffness and distribution factors for a 2-span continuous beam', () => {
    const nodes: INode[] = [
      { id: 'node_1', x: 0, y: 0 },
      { id: 'node_2', x: 6, y: 0 },
      { id: 'node_3', x: 10, y: 0 }
    ];
    const members: IMember[] = [
      { id: 'member_1', startNodeId: 'node_1', endNodeId: 'node_2', E: 200, I: 100, A: 5000 }, // L = 6m
      { id: 'member_2', startNodeId: 'node_2', endNodeId: 'node_3', E: 200, I: 100, A: 5000 }  // L = 4m
    ];
    const supports: IFrameSupport[] = [
      { id: 'sup_1', nodeId: 'node_1', type: 'roller', angle: 0 },
      { id: 'sup_2', nodeId: 'node_2', type: 'roller', angle: 0 },
      { id: 'sup_3', nodeId: 'node_3', type: 'fixed', angle: 0 }
    ];

    const step = calculateDistributionFactors(nodes, members, supports);

    expect(step.type).toBe('MDM_DF_SETUP');
    const joints = step.payload.joints;

    // Joint 1: roller at end
    const j1 = joints.find(j => j.nodeId === 'node_1')!;
    expect(j1).toBeDefined();
    expect(j1.members).toHaveLength(1);
    expect(j1.members[0]!.df).toBeCloseTo(1.0, 4);

    // Joint 2: continuous roller joint
    const j2 = joints.find(j => j.nodeId === 'node_2')!;
    expect(j2).toBeDefined();
    expect(j2.members).toHaveLength(2);
    
    // Member 1 stiffness: far-end node_1 is PINNED. k1 = 3*E*I/L1 = 3 * 20000 / 6 = 10000
    // Member 2 stiffness: far-end node_3 is FIXED. k2 = 4*E*I/L2 = 4 * 20000 / 4 = 20000
    // Total stiffness = 30000
    const m1_df = j2.members.find(m => m.memberId === 'member_1')!;
    const m2_df = j2.members.find(m => m.memberId === 'member_2')!;
    expect(m1_df.stiffness).toBeCloseTo(10000, 2);
    expect(m2_df.stiffness).toBeCloseTo(20000, 2);
    expect(m1_df.df).toBeCloseTo(1/3, 4);
    expect(m2_df.df).toBeCloseTo(2/3, 4);

    // Joint 3: fixed end support
    const j3 = joints.find(j => j.nodeId === 'node_3')!;
    expect(j3.members[0]!.df).toBe(0);
  });

  it('correctly solves moments for a continuous beam under full UDL', () => {
    const nodes: INode[] = [
      { id: 'node_1', x: 0, y: 0 },
      { id: 'node_2', x: 6, y: 0 },
      { id: 'node_3', x: 10, y: 0 }
    ];
    const members: IMember[] = [
      { id: 'member_1', startNodeId: 'node_1', endNodeId: 'node_2', E: 200, I: 100, A: 5000 },
      { id: 'member_2', startNodeId: 'node_2', endNodeId: 'node_3', E: 200, I: 100, A: 5000 }
    ];
    const supports: IFrameSupport[] = [
      { id: 'sup_1', nodeId: 'node_1', type: 'roller', angle: 0 },
      { id: 'sup_2', nodeId: 'node_2', type: 'roller', angle: 0 },
      { id: 'sup_3', nodeId: 'node_3', type: 'fixed', angle: 0 }
    ];
    // w = 12kN/m UDL on Member 1 (first span)
    const loads: IFrameLoad[] = [
      { id: 'load_1', type: 'udl', magnitude: 12, direction: 'global-vertical', attachedTo: 'member', memberId: 'member_1' }
    ];

    const { finalMoments, steps } = solveMDM(nodes, members, supports, loads);

    expect(steps.length).toBeGreaterThan(2);
    expect(steps[steps.length - 1]!.type).toBe('MDM_FINAL_MOMENTS');

    const m1 = finalMoments.get('member_1')!;
    const m2 = finalMoments.get('member_2')!;

    // Pinned end moment is 0
    expect(m1.M_ab).toBeCloseTo(0, 2);

    // Exact structural mechanics solution for continuous beam:
    // M_ba (at Node 2) = -M_bc (at Node 2) = 36.0 kNm
    // Let's assert:
    expect(m1.M_ba).toBeCloseTo(36.0, 1);
    expect(m2.M_ab).toBeCloseTo(-36.0, 1);

    // Fixed end Node 3 moment:
    // M_cb = 0.5 * M_bc = 0.5 * (-36.0) = -18.0 kNm
    expect(m2.M_ba).toBeCloseTo(-18.0, 1);
  });

  it('correctly handles cantilever overhangs and calculates static support moments', () => {
    const nodes: INode[] = [
      { id: 'node_1', x: 0, y: 0 },
      { id: 'node_2', x: 6, y: 0 },
      { id: 'node_3', x: 8, y: 0 } // Cantilever free end (Node 3)
    ];
    const members: IMember[] = [
      { id: 'member_1', startNodeId: 'node_1', endNodeId: 'node_2', E: 200, I: 100, A: 5000 }, // L = 6m
      { id: 'member_cantilever', startNodeId: 'node_2', endNodeId: 'node_3', E: 200, I: 100, A: 5000 } // L = 2m
    ];
    const supports: IFrameSupport[] = [
      { id: 'sup_1', nodeId: 'node_1', type: 'roller', angle: 0 },
      { id: 'sup_2', nodeId: 'node_2', type: 'roller', angle: 0 }
    ];
    // Point load P = 10kN at the end of the cantilever (position = 1.0 along member_cantilever)
    const loads: IFrameLoad[] = [
      { 
        id: 'load_cantilever', 
        type: 'point', 
        magnitude: 10, 
        direction: 'global-vertical', 
        attachedTo: 'member', 
        memberId: 'member_cantilever', 
        position: 1.0 
      }
    ];

    const { finalMoments } = solveMDM(nodes, members, supports, loads);

    const m_span = finalMoments.get('member_1')!;
    const m_cant = finalMoments.get('member_cantilever')!;

    // Free end moment is 0
    expect(m_cant.M_ba).toBeCloseTo(0, 2);

    // Support end of cantilever has static moment: M_cant_start = -P * L_cant = -10 * 2 = -20 kNm
    expect(m_cant.M_ab).toBeCloseTo(-20, 2);

    // Joint 2 is balanced: sum of moments must be 0 => M_span_end + M_cant_start = 0 => M_span_end = 20 kNm
    expect(m_span.M_ba).toBeCloseTo(20, 2);

    // Joint 1 is pinned support, so moment must be 0
    expect(m_span.M_ab).toBeCloseTo(0, 2);
  });
});
