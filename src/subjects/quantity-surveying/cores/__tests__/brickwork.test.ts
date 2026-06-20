import { describe, test, expect } from 'vitest';
import { calculateBrickworkInternal } from '../brickwork';

describe('Brickwork Estimation Module', () => {
  test('should estimate correct brick count and mortar volume', () => {
    // Wall Area = 10m2, Wall Thickness = 0.24m (volume = 2.4m3)
    // Brick size = 240mm x 115mm x 70mm -> 0.24 x 0.115 x 0.07 = 0.001932 m3
    // Mortar joint thickness = 10mm -> 0.01m
    // Brick + Mortar size = 0.25 x 0.125 x 0.08 = 0.0025 m3
    // Bricks Count = Math.ceil(2.4 / 0.0025) = 960 bricks
    // Mortar Volume = 2.4 - (960 * 0.001932) = 2.4 - 1.85472 = 0.54528 -> 0.545 m3
    const result = calculateBrickworkInternal(10, 0.24, 0.24, 0.115, 0.07, 0.01);
    expect(result.brickCount).toBe(960);
    expect(result.mortarVolume).toBe(0.545);
  });

  test('should fallback gracefully to standard dimensions if brick inputs are invalid', () => {
    const result = calculateBrickworkInternal(10, 0.24, 0, 0, -1, 0.01);
    expect(result.brickCount).toBeGreaterThan(0);
  });

  test('should handle negative wall area and thickness by returning zero values', () => {
    const result1 = calculateBrickworkInternal(-10, 0.24, 0.24, 0.115, 0.07, 0.01);
    expect(result1.brickCount).toBe(0);
    expect(result1.mortarVolume).toBe(0);

    const result2 = calculateBrickworkInternal(10, -0.24, 0.24, 0.115, 0.07, 0.01);
    expect(result2.brickCount).toBe(0);
    expect(result2.mortarVolume).toBe(0);
  });

  test('should handle negative mortar thickness by defaulting to 0.01m', () => {
    const result = calculateBrickworkInternal(10, 0.24, 0.24, 0.115, 0.07, -0.005);
    // Should fallback to 0.01m mortar thickness, yielding the same count of 960 bricks
    expect(result.brickCount).toBe(960);
  });
});
