import type { ConcreteResult, ConcreteMixResult } from './IQSEngine';
import { CONCRETE_SHRINKAGE_FACTOR } from './constants';

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

/**
 * Calculates raw concrete ingredients (cement, sand, stone volumes) from design wet volume.
 * All volume inputs/outputs are in base SI units (cubic meters).
 */
export function calculateConcreteMixIngredients(
  wetVolume: number,
  sandPart: number,
  stonePart: number,
  cementPart: number = 1,
  shrinkageFactor: number = CONCRETE_SHRINKAGE_FACTOR
): ConcreteMixResult {
  const wetVol = wetVolume < 0 ? 0 : wetVolume;
  const sand = sandPart < 0 ? 0 : sandPart;
  const stone = stonePart < 0 ? 0 : stonePart;
  const cement = cementPart < 0 ? 0 : cementPart;
  const sf = shrinkageFactor < 0 ? 0 : shrinkageFactor;

  const dryVolume = wetVol * sf;
  const totalParts = cement + sand + stone;

  let cementVolume = 0;
  let sandVolume = 0;
  let stoneVolume = 0;

  if (totalParts > 0) {
    cementVolume = (cement / totalParts) * dryVolume;
    sandVolume = (sand / totalParts) * dryVolume;
    stoneVolume = (stone / totalParts) * dryVolume;
  }

  return {
    dryVolume: Math.round(dryVolume * 1000) / 1000,
    cementVolume: Math.round(cementVolume * 1000) / 1000,
    sandVolume: Math.round(sandVolume * 1000) / 1000,
    stoneVolume: Math.round(stoneVolume * 1000) / 1000,
  };
}

