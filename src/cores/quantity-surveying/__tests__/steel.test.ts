import { describe, test, expect } from 'vitest';
import { calculateSteelWeightInternal } from '../steel';

describe('Steel Reinforcement Module', () => {
  test('should calculate correct rebar weight in kilograms', () => {
    // Formula: Weight = (D^2 / 162) * L
    // D = 16mm, L = 100m -> (256 / 162) * 100 = 1.5802469 * 100 = 158.025
    const result = calculateSteelWeightInternal(16, 100);
    expect(result.weightKg).toBe(158.025);
  });

  test('should return 0 weight if inputs are negative', () => {
    const result1 = calculateSteelWeightInternal(-16, 100);
    expect(result1.weightKg).toBe(0);

    const result2 = calculateSteelWeightInternal(16, -100);
    expect(result2.weightKg).toBe(0);
  });

  test('should compute weight correctly for standard diameters like 10mm and 12mm', () => {
    // D=10mm, L=10m -> (100 / 162) * 10 = 6.173
    const result10 = calculateSteelWeightInternal(10, 10);
    expect(result10.weightKg).toBe(6.173);

    // D=12mm, L=10m -> (144 / 162) * 10 = 8.889
    const result12 = calculateSteelWeightInternal(12, 10);
    expect(result12.weightKg).toBe(8.889);
  });
});
