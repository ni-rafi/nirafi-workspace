/**
 * Water Reservoir & Septic Tank/Soak Pit Calculation Engine
 * Implements equations from sessional design rules.
 */

/**
 * Calculates total reservoir excavation volume.
 * Formula: (L + 2c) * (B + 2c) * H
 */
export function calculateReservoirExcavation(
  L: number,
  B: number,
  H: number,
  c: number
): number {
  if (L <= 0 || B <= 0 || H <= 0 || c < 0) return 0;
  const vol = (L + 2 * c) * (B + 2 * c) * H;
  return Math.round(vol * 1000) / 1000;
}

/**
 * Calculates base raft concrete volume.
 * Formula: (L + 2 * t_wall) * (B + 2 * t_wall) * t_raft
 */
export function calculateReservoirRaft(
  L: number,
  B: number,
  tWall: number,
  tRaft: number = 0.3
): number {
  if (L <= 0 || B <= 0 || tWall < 0 || tRaft <= 0) return 0;
  const vol = (L + 2 * tWall) * (B + 2 * tWall) * tRaft;
  return Math.round(vol * 1000) / 1000;
}

/**
 * Calculates vertical concrete walls volume (deducting overlaps).
 * Formula: 2 * (L + B + 2 * t_wall) * t_wall * H
 */
export function calculateReservoirWalls(
  L: number,
  B: number,
  tWall: number,
  H: number
): number {
  if (L <= 0 || B <= 0 || tWall <= 0 || H <= 0) return 0;
  const vol = 2 * (L + B + 2 * tWall) * tWall * H;
  return Math.round(vol * 1000) / 1000;
}

/**
 * Calculates internal plastering area of walls + floor.
 * Formula: 2 * (L + B) * H + L * B
 */
export function calculateReservoirPlasterArea(
  L: number,
  B: number,
  H: number
): number {
  if (L <= 0 || B <= 0 || H <= 0) return 0;
  const area = 2 * (L + B) * H + L * B;
  return Math.round(area * 1000) / 1000;
}

/**
 * Calculates Pudlo waterproofing chemical requirement in kg.
 * Formula: plasterArea * admixtureRatio * cementBagWeightKg
 */
export function calculatePudloRequirement(
  plasterArea: number,
  admixtureRatio: number = 0.015,
  cementBagWeightKg: number = 50
): number {
  if (plasterArea <= 0 || admixtureRatio < 0 || cementBagWeightKg <= 0) return 0;
  const kg = plasterArea * admixtureRatio * cementBagWeightKg;
  return Math.round(kg * 1000) / 1000;
}

/**
 * Calculates soak pit net cylindrical volume.
 * Formula: PI * R^2 * H
 */
export function calculateSoakPitNetVolume(
  diameter: number,
  depth: number
): number {
  if (diameter <= 0 || depth <= 0) return 0;
  const radius = diameter / 2;
  const vol = Math.PI * radius * radius * depth;
  return Math.round(vol * 1000) / 1000;
}

/**
 * Calculates soak pit loose aggregate volume.
 * Formula: netVolume * containerFactor
 */
export function calculateSoakPitLooseVolume(
  netVolume: number,
  containerFactor: number = 1.33
): number {
  if (netVolume <= 0 || containerFactor <= 0) return 0;
  const vol = netVolume * containerFactor;
  return Math.round(vol * 1000) / 1000;
}

/**
 * Calculates shear key concrete volume at raft-wall junction (trapezoidal section)
 */
export function calculateReservoirShearKeyVolume(
  lengthM: number,
  w1: number,
  w2: number,
  depth: number
): number {
  if (lengthM <= 0 || w1 <= 0 || w2 < 0 || depth <= 0) return 0;
  const vol = lengthM * 0.5 * (w1 + w2) * depth;
  return Math.round(vol * 1000) / 1000;
}

/**
 * Calculates dowel reinforcement steel weight for shear key
 */
export function calculateReservoirKeyDowelWeight(
  dowelLengthM: number,
  spacingM: number,
  barDiaMm: number,
  perimeterM: number
): number {
  if (dowelLengthM <= 0 || spacingM <= 0 || barDiaMm <= 0 || perimeterM <= 0) return 0;
  const dowelCount = Math.ceil(perimeterM / spacingM);
  const unitWeight = (barDiaMm * barDiaMm) / 162; // kg/m
  const totalWeight = dowelCount * dowelLengthM * unitWeight;
  return Math.round(totalWeight * 1000) / 1000;
}

/**
 * Calculates stepped septic tank brickwork masonry volume layer by layer
 */
export function calculateSteppedSepticTankMasonry(
  L_in: number,
  B_in: number,
  partitionCount: number,
  steps: Array<{ tWall: number; height: number }>
): { stepVolumes: number[]; totalVolume: number } {
  if (L_in <= 0 || B_in <= 0 || partitionCount < 0 || !steps || steps.length === 0) {
    return { stepVolumes: [], totalVolume: 0 };
  }

  let totalVol = 0;
  const stepVolumes = steps.map((step) => {
    if (step.tWall <= 0 || step.height <= 0) return 0;
    // Long walls (2 nos): L = L_in + 2*tWall
    const volLong = 2 * (L_in + 2 * step.tWall) * step.tWall * step.height;
    // Short walls (2 nos): B = B_in
    const volShort = 2 * B_in * step.tWall * step.height;
    // Partition walls: B = B_in
    const volPartition = partitionCount * B_in * step.tWall * step.height;

    const stepVol = volLong + volShort + volPartition;
    totalVol += stepVol;
    return Math.round(stepVol * 1000) / 1000;
  });

  return {
    stepVolumes,
    totalVolume: Math.round(totalVol * 1000) / 1000,
  };
}

/**
 * Calculates differential plaster areas (12mm walls vs 20mm floor)
 */
export function calculateSepticPlasterAreas(
  L_in: number,
  B_in: number,
  depthM: number,
  partitionCount: number
): { wallPlasterAreaM2: number; floorPlasterAreaM2: number } {
  if (L_in <= 0 || B_in <= 0 || depthM <= 0 || partitionCount < 0) {
    return { wallPlasterAreaM2: 0, floorPlasterAreaM2: 0 };
  }
  const walls = 2 * (L_in + B_in) * depthM + 2 * partitionCount * B_in * depthM;
  const floor = L_in * B_in;
  return {
    wallPlasterAreaM2: Math.round(walls * 1000) / 1000,
    floorPlasterAreaM2: Math.round(floor * 1000) / 1000,
  };
}

/**
 * Calculates soak pit structural quantities (honeycomb & solid brickwork, concrete, rebar)
 */
export function calculateSoakPitStructural(
  diameterInM: number,
  depthHoneycombM: number,
  depthSolidM: number,
  wallThicknessM: number,
  curbWidthM: number,
  curbThicknessM: number
): {
  honeycombVolM3: number;
  solidVolM3: number;
  curbVolM3: number;
  reinforcementKg: number;
  totalConcreteVolM3: number;
} {
  if (
    diameterInM <= 0 ||
    wallThicknessM <= 0 ||
    curbWidthM <= 0 ||
    curbThicknessM <= 0
  ) {
    return { honeycombVolM3: 0, solidVolM3: 0, curbVolM3: 0, reinforcementKg: 0, totalConcreteVolM3: 0 };
  }

  const meanDia = diameterInM + wallThicknessM;
  
  // Honeycomb masonry (25% voids, so 75% solid volume)
  const hcSolidVol = Math.PI * meanDia * wallThicknessM * Math.max(0, depthHoneycombM);
  const honeycombVol = hcSolidVol * 0.75;

  // Solid masonry
  const solidVol = Math.PI * meanDia * wallThicknessM * Math.max(0, depthSolidM);

  // R.C.C. Well Curb (ring footing)
  // Internal dia = diameterInM, Ext dia = diameterInM + 2 * curbWidthM
  const curbMeanDia = diameterInM + curbWidthM;
  const curbArea = Math.PI * curbMeanDia * curbWidthM;
  const curbVol = curbArea * curbThicknessM;

  // Reinforcement weight (1% of concrete volume by weight: 78.5 kg per m³)
  const reinforcement = curbVol * 0.01 * 7850;

  return {
    honeycombVolM3: Math.round(honeycombVol * 1000) / 1000,
    solidVolM3: Math.round(solidVol * 1000) / 1000,
    curbVolM3: Math.round(curbVol * 1000) / 1000,
    reinforcementKg: Math.round(reinforcement * 1000) / 1000,
    totalConcreteVolM3: Math.round(curbVol * 1000) / 1000,
  };
}

/**
 * Calculates Eco Sewage Treatment Plant costs
 */
export function calculateEcoStpCost(
  capacityL: number,
  stpRateBdtPerL: number,
  startupChargeBdt: number
): { baseStpCostBdt: number; startupChargeBdt: number; totalStpCostBdt: number } {
  if (capacityL <= 0 || stpRateBdtPerL < 0 || startupChargeBdt < 0) {
    return { baseStpCostBdt: 0, startupChargeBdt: 0, totalStpCostBdt: 0 };
  }
  const base = capacityL * stpRateBdtPerL;
  const total = base + startupChargeBdt;
  return {
    baseStpCostBdt: Math.round(base * 1000) / 1000,
    startupChargeBdt: Math.round(startupChargeBdt * 1000) / 1000,
    totalStpCostBdt: Math.round(total * 1000) / 1000,
  };
}

/**
 * Calculates prefabricated storage tanks costs
 */
export function calculatePrefabTanksCost(
  plasticCount: number,
  plasticRateBdt: number,
  ferroCount: number,
  ferroRateBdt: number
): { plasticCostBdt: number; ferroCostBdt: number; totalPrefabCostBdt: number } {
  const pCount = Math.max(0, plasticCount);
  const pRate = Math.max(0, plasticRateBdt);
  const fCount = Math.max(0, ferroCount);
  const fRate = Math.max(0, ferroRateBdt);

  const pCost = pCount * pRate;
  const fCost = fCount * fRate;
  return {
    plasticCostBdt: Math.round(pCost * 1000) / 1000,
    ferroCostBdt: Math.round(fCost * 1000) / 1000,
    totalPrefabCostBdt: Math.round((pCost + fCost) * 1000) / 1000,
  };
}

