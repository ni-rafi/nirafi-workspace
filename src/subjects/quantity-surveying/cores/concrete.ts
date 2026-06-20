import type { ConcreteResult } from './IQSEngine';

/**
 * Calculates concrete volume with a wastage factor.
 * Formula: V = L * W * H * (1 + Wastage Factor)
 * All dimensions should be in base SI units (meters).
 */
export function calculateConcreteVolumeInternal(
  length: number,
  width: number,
  height: number,
  wastageFactor: number = 0.05
): ConcreteResult {
  // Input validations & defaults
  const l = length < 0 ? 0 : length;
  const w = width < 0 ? 0 : width;
  const h = height < 0 ? 0 : height;
  const wf = wastageFactor < 0 ? 0 : wastageFactor;

  const volume = l * w * h * (1 + wf);

  // Round output to exactly 3 decimal places
  return {
    volume: Math.round(volume * 1000) / 1000,
  };
}
