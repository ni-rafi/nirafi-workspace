import { describe, it, expect } from 'vitest';
import { calculatePileMatrix } from '../pileMatrixEngine';

describe('calculatePileMatrix', () => {
  it('should return center (0,0) for a single pile', () => {
    const result = calculatePileMatrix(1, 600);
    expect(result).toEqual([{ x: 0, y: 0 }]);
  });

  it('should calculate symmetrical offsets for 2 piles', () => {
    const diameter = 600;
    const spacingFactor = 2.5; // s = 1500
    const result = calculatePileMatrix(2, diameter, spacingFactor);
    expect(result).toEqual([
      { x: -750, y: 0 },
      { x: 750, y: 0 },
    ]);
  });

  it('should calculate square layout for 4 piles', () => {
    const diameter = 600;
    const spacingFactor = 2.5; // s = 1500
    const result = calculatePileMatrix(4, diameter, spacingFactor);
    expect(result).toEqual([
      { x: -750, y: -750 },
      { x: 750, y: -750 },
      { x: -750, y: 750 },
      { x: 750, y: 750 },
    ]);
  });

  it('should respect custom override coordinates if provided', () => {
    const overrides = [
      { x: 10, y: 20 },
      { x: 30, y: 40 },
    ];
    const result = calculatePileMatrix(2, 600, 2.5, overrides);
    expect(result).toEqual(overrides);
  });
});
