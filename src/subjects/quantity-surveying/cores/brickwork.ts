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

/**
 * Calculates net wall volume by deducting opening voids.
 */
export function calculateNetWallVolume(
  grossVolume: number,
  openingWidth: number,
  openingHeight: number,
  wallThickness: number
): { voidVolume: number; netVolume: number } {
  const gV = grossVolume < 0 ? 0 : grossVolume;
  const w = openingWidth < 0 ? 0 : openingWidth;
  const h = openingHeight < 0 ? 0 : openingHeight;
  const t = wallThickness < 0 ? 0 : wallThickness;
  
  const voidVolume = Math.round(w * h * t * 1000) / 1000;
  const netVolume = Math.round(Math.max(0, gV - voidVolume) * 1000) / 1000;
  
  return { voidVolume, netVolume };
}

/**
 * Calculates surface areas for plastering and floor finishing.
 */
export function calculateFinishingAreas(
  roomLength: number,
  roomWidth: number,
  wallHeight: number
): { floorArea: number; wallArea: number } {
  const l = roomLength < 0 ? 0 : roomLength;
  const w = roomWidth < 0 ? 0 : roomWidth;
  const h = wallHeight < 0 ? 0 : wallHeight;
  
  const floorArea = Math.round(l * w * 1000) / 1000;
  const wallArea = Math.round((2 * l + 2 * w) * h * 1000) / 1000;
  
  return { floorArea, wallArea };
}

/**
 * Calculates plinth DPC area with door sill omissions.
 */
export function calculateDpcArea(
  length: number,
  width: number,
  doorCount: number,
  doorWidth: number = 1.00
): { grossArea: number; deductionArea: number; netArea: number } {
  const l = length < 0 ? 0 : length;
  const w = width < 0 ? 0 : width;
  const count = doorCount < 0 ? 0 : doorCount;
  const dW = doorWidth < 0 ? 0 : doorWidth;
  
  const grossArea = Math.round(l * w * 1000) / 1000;
  const deductionArea = Math.round(count * dW * w * 1000) / 1000;
  const netArea = Math.round(Math.max(0, grossArea - deductionArea) * 1000) / 1000;
  
  return { grossArea, deductionArea, netArea };
}

/**
 * Calculates net masonry wall height by deducting beam depth.
 */
export function calculateNetWallHeight(
  floorHeight: number,
  beamDepth: number
): number {
  const fH = floorHeight < 0 ? 0 : floorHeight;
  const bD = beamDepth < 0 ? 0 : beamDepth;
  return Math.round(Math.max(0, fH - bD) * 1000) / 1000;
}
