import { describe, it, expect } from 'vitest';
import { buildSdmEquationsForMember } from '../sdmEquations';
import { solveSlopeDeflection } from '../sdmSolver';
import { INode, IMember, IFrameSupport, IFrameLoad } from '../../../../features/frame-solver/types/frame';

describe('Slope-Deflection Method (SDM) Module', () => {
  it('correctly builds standard Slope-Deflection equations for a member', () => {
    const nodes: INode[] = [
      { id: 'node_1', x: 0, y: 0 },
      { id: 'node_2', x: 6, y: 0 } // L = 6m
    ];
    const member: IMember = {
      id: 'member_1',
      startNodeId: 'node_1',
      endNodeId: 'node_2',
      E: 200, // GPa
      I: 100, // 10^6 mm^4
      A: 5000
    };

    // EI = 200 * 100 = 20000 kNm^2
    // 4EI/L = 80000 / 6 = 13333.333 kNm
    // 2EI/L = 40000 / 6 = 6666.667 kNm
    const femStart = -36;
    const femEnd = 36;

    const { Near, Far } = buildSdmEquationsForMember(member, nodes, femStart, femEnd);

    expect(Near.memberId).toBe('member_1');
    expect(Near.nearNodeId).toBe('node_1');
    expect(Near.farNodeId).toBe('node_2');
    expect(Near.nearCoef).toBeCloseTo(13333.333, 2);
    expect(Near.farCoef).toBeCloseTo(6666.667, 2);
    expect(Near.constant).toBe(-36);

    expect(Far.nearNodeId).toBe('node_2');
    expect(Far.farNodeId).toBe('node_1');
    expect(Far.nearCoef).toBeCloseTo(13333.333, 2);
    expect(Far.farCoef).toBeCloseTo(6666.667, 2);
    expect(Far.constant).toBe(36);
  });

  it('correctly solves moments for a continuous 2-span beam under UDL', () => {
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
    // w = 12kN/m UDL on member_1 (first span)
    const loads: IFrameLoad[] = [
      { id: 'load_1', type: 'udl', magnitude: 12, direction: 'global-vertical', attachedTo: 'member', memberId: 'member_1' }
    ];

    const { finalMoments, steps } = solveSlopeDeflection(nodes, members, supports, loads);

    expect(steps.some(s => s.type === 'SDM_EQUATIONS_SETUP')).toBe(true);
    expect(steps.some(s => s.type === 'SDM_EQUILIBRIUM_SETUP')).toBe(true);
    expect(steps.some(s => s.type === 'MATRIX_INVERSION')).toBe(true);
    expect(steps[steps.length - 1]!.type).toBe('MDM_FINAL_MOMENTS');

    const m1 = finalMoments.get('member_1')!;
    const m2 = finalMoments.get('member_2')!;

    // Pinned Node 1 moment is 0
    expect(m1.M_ab).toBeCloseTo(0, 2);

    // Node 2 moments: M_ba = 36 kNm, M_bc = -36 kNm
    expect(m1.M_ba).toBeCloseTo(36.0, 1);
    expect(m2.M_ab).toBeCloseTo(-36.0, 1);

    // Node 3 moment (fixed support): M_cb = -18 kNm
    expect(m2.M_ba).toBeCloseTo(-18.0, 1);
  });

  it('correctly handles cantilever overhang static moments in SDM', () => {
    const nodes: INode[] = [
      { id: 'node_1', x: 0, y: 0 },
      { id: 'node_2', x: 6, y: 0 },
      { id: 'node_3', x: 8, y: 0 } // Cantilever free end
    ];
    const members: IMember[] = [
      { id: 'member_1', startNodeId: 'node_1', endNodeId: 'node_2', E: 200, I: 100, A: 5000 }, // L = 6m
      { id: 'member_cantilever', startNodeId: 'node_2', endNodeId: 'node_3', E: 200, I: 100, A: 5000 } // L = 2m
    ];
    const supports: IFrameSupport[] = [
      { id: 'sup_1', nodeId: 'node_1', type: 'roller', angle: 0 },
      { id: 'sup_2', nodeId: 'node_2', type: 'roller', angle: 0 }
    ];
    // Point load P = 10kN at the end of the cantilever (position = 1.0)
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

    const { finalMoments } = solveSlopeDeflection(nodes, members, supports, loads);

    const m_span = finalMoments.get('member_1')!;
    const m_cant = finalMoments.get('member_cantilever')!;

    // Free end moment is 0
    expect(m_cant.M_ba).toBeCloseTo(0, 2);

    // Cantilever support moment is statically determinate: M_cant_start = -P * L_cant = -20 kNm
    expect(m_cant.M_ab).toBeCloseTo(-20, 2);

    // Joint 2 is balanced: M_span_end + M_cant_start = 0 => M_span_end = 20 kNm
    expect(m_span.M_ba).toBeCloseTo(20, 2);

    // Joint 1 is pinned, moment is 0
    expect(m_span.M_ab).toBeCloseTo(0, 2);
  });
});
