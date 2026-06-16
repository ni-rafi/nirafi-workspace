import type { BrickworkResult } from './IQSEngine';

/**
 * Calculates raw masonry blocks and mortar margins.
 * Input values in base SI units (meters).
 */
export function calculateBrickworkInternal(
  wallArea: number,
  wallThickness: number,
  brickLength: number,
  brickWidth: number,
  brickHeight: number,
  mortarThickness: number
): BrickworkResult {
  const area = wallArea < 0 ? 0 : wallArea;
  const thickness = wallThickness < 0 ? 0 : wallThickness;
  const bL = brickLength <= 0 ? 0.24 : brickLength;
  const bW = brickWidth <= 0 ? 0.115 : brickWidth;
  const bH = brickHeight <= 0 ? 0.07 : brickHeight;
  const m = mortarThickness < 0 ? 0.01 : mortarThickness;

  const totalWallVolume = area * thickness;

  // Volume of single brick with mortar
  const singleBrickVolumeWithMortar = (bL + m) * (bW + m) * (bH + m);

  // Number of bricks needed (ceiling integer)
  let brickCount = 0;
  if (singleBrickVolumeWithMortar > 0) {
    brickCount = Math.ceil(totalWallVolume / singleBrickVolumeWithMortar);
  }

  // Volume of single brick without mortar
  const singleBrickVolume = bL * bW * bH;

  // Mortar volume = Wall Volume - (Brick Count * Single Brick Volume)
  let mortarVolume = totalWallVolume - (brickCount * singleBrickVolume);
  if (mortarVolume < 0) {
    mortarVolume = 0;
  }

  return {
    brickCount,
    mortarVolume: Math.round(mortarVolume * 1000) / 1000,
  };
}
