import { describe, test, expect } from 'vitest';
import { calculateConcreteVolumeInternal } from '../concrete';

describe('Concrete Volumetric Module', () => {
  test('should calculate volume with default wastage of 5%', () => {
    const result = calculateConcreteVolumeInternal(10, 0.3, 0.4);
    // Volume = 10 * 0.3 * 0.4 = 1.2. Wastage = 5% -> 1.2 * 1.05 = 1.26
    expect(result.volume).toBe(1.26);
  });

  test('should calculate volume with custom wastage factor', () => {
    const result = calculateConcreteVolumeInternal(12, 0.3, 0.4, 0.10);
    // Volume = 12 * 0.3 * 0.4 = 1.44. Wastage = 10% -> 1.44 * 1.10 = 1.584
    expect(result.volume).toBe(1.584);
  });

  test('should prevent negative dimensions and default to 0', () => {
    const result = calculateConcreteVolumeInternal(-5, 0.3, 0.4);
    expect(result.volume).toBe(0);
  });

  test('should handle negative width and height by defaulting to 0', () => {
    const result1 = calculateConcreteVolumeInternal(10, -0.3, 0.4);
    expect(result1.volume).toBe(0);

    const result2 = calculateConcreteVolumeInternal(10, 0.3, -0.4);
    expect(result2.volume).toBe(0);
  });

  test('should handle negative wastage factor by defaulting to 0', () => {
    const result = calculateConcreteVolumeInternal(10, 0.3, 0.4, -0.05);
    // 10 * 0.3 * 0.4 * 1.0 = 1.2
    expect(result.volume).toBe(1.2);
  });
});
