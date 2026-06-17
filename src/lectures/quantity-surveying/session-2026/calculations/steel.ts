export interface SteelResult {
  weightKg: number;
}

/**
 * Calculates reinforcement steel weight in kg.
 * Formula: W = (D^2 / 162) * Length
 * diameterMm is in millimeters (e.g. 10, 12, 16).
 * totalLengthMeters is in meters.
 */
export function calculateSteelWeight(
  diameterMm: number,
  totalLengthMeters: number
): SteelResult {
  const d = diameterMm < 0 ? 0 : diameterMm;
  const l = totalLengthMeters < 0 ? 0 : totalLengthMeters;

  const unitWeight = (d * d) / 162;
  const totalWeight = unitWeight * l;

  return {
    weightKg: Math.round(totalWeight * 1000) / 1000,
  };
}
