import { describe, it, expect } from 'vitest';
import { processSectionForces } from '../sectionLoadHelper';
import { ISupport, ILoad } from '@/subjects/mechanics-of-solids/cores/sfd-bmd/types';

describe('sectionLoadHelper', () => {
  it('should choose left side when cut is close to start', () => {
    const supports: ISupport[] = [
      { id: 's1', type: 'roller', position: 0 },
      { id: 's2', type: 'hinge', position: 6 },
    ];
    const loads: ILoad[] = [
      { id: 'l1', type: 'point', position: 2, magnitude: 10 },
    ];

    const result = processSectionForces(supports, loads, 1.0, 6.0, true);

    expect(result.activeSide).toBe('left');
    expect(result.activeReactions).toHaveLength(1);
    expect(result.activeReactions[0]?.letter).toBe('A');
    expect(result.activeLoadVisuals).toHaveLength(0);
  });

  it('should choose right side when cut is close to end', () => {
    const supports: ISupport[] = [
      { id: 's1', type: 'roller', position: 0 },
      { id: 's2', type: 'hinge', position: 6 },
    ];
    const loads: ILoad[] = [
      { id: 'l1', type: 'point', position: 2, magnitude: 10 },
    ];

    const result = processSectionForces(supports, loads, 5.0, 6.0, true);

    expect(result.activeSide).toBe('right');
    expect(result.activeReactions).toHaveLength(1);
    expect(result.activeReactions[0]?.letter).toBe('B');
    expect(result.activeLoadVisuals).toHaveLength(0);
  });

  it('should calculate UDL cut moment arm correctly for left side', () => {
    const supports: ISupport[] = [];
    const loads: ILoad[] = [
      { id: 'l1', type: 'udl', startPosition: 2, endPosition: 6, magnitude: 4 },
    ];

    const result = processSectionForces(supports, loads, 4.0, 6.0, true);

    expect(result.activeSide).toBe('left');
    expect(result.activeLoadVisuals).toHaveLength(1);
    const activeUDL = result.activeLoadVisuals[0];
    expect(activeUDL).toBeDefined();
    if (activeUDL) {
      expect(activeUDL.magnitude).toBe(8.0);
      expect(activeUDL.centroidX).toBe(3.0);
      expect(activeUDL.armLabel).toBe('(x - 2.0)/2');
    }
  });

  it('should calculate UDL cut moment arm correctly for right side', () => {
    const supports: ISupport[] = [
      { id: 's1', type: 'roller', position: 0 },
    ];
    const loadsWithLeftPoint: ILoad[] = [
      { id: 'l1', type: 'udl', startPosition: 0, endPosition: 4, magnitude: 4 },
      { id: 'l2', type: 'point', position: 0.5, magnitude: 10 },
    ];

    const result = processSectionForces(supports, loadsWithLeftPoint, 2.0, 6.0, true);

    expect(result.activeSide).toBe('right');
    expect(result.activeLoadVisuals).toHaveLength(1);
    const activeUDL = result.activeLoadVisuals[0];
    expect(activeUDL).toBeDefined();
    if (activeUDL) {
      expect(activeUDL.magnitude).toBe(8.0);
      expect(activeUDL.centroidX).toBe(3.0);
      expect(activeUDL.armLabel).toBe('(4.0 - x)/2');
    }
  });
});
