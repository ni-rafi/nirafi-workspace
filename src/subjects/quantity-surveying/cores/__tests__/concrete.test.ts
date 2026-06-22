import { describe, test, expect } from 'vitest';
import { calculateConcreteVolumeInternal, calculateConcreteMixIngredients } from '../concrete';

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

describe('Concrete Mix Ingredients Module', () => {
  test('should calculate mix ingredients correctly for standard 1:2:4 ratio', () => {
    // wetVolume = 100, sand = 2, stone = 4, cement = 1, sf = 1.54
    // dryVolume = 100 * 1.54 = 154
    // totalParts = 1 + 2 + 4 = 7
    // cementVolume = (1/7) * 154 = 22
    // sandVolume = (2/7) * 154 = 44
    // stoneVolume = (4/7) * 154 = 88
    const result = calculateConcreteMixIngredients(100, 2, 4, 1, 1.54);
    expect(result.dryVolume).toBe(154);
    expect(result.cementVolume).toBe(22);
    expect(result.sandVolume).toBe(44);
    expect(result.stoneVolume).toBe(88);
  });

  test('should handle zero volumes gracefully', () => {
    const result = calculateConcreteMixIngredients(0, 2, 4);
    expect(result.dryVolume).toBe(0);
    expect(result.cementVolume).toBe(0);
    expect(result.sandVolume).toBe(0);
    expect(result.stoneVolume).toBe(0);
  });

  test('should default cement proportion to 1 and shrinkage factor to 1.54', () => {
    const result = calculateConcreteMixIngredients(100, 2, 4);
    expect(result.dryVolume).toBe(154);
    expect(result.cementVolume).toBe(22);
    expect(result.sandVolume).toBe(44);
    expect(result.stoneVolume).toBe(88);
  });
});

