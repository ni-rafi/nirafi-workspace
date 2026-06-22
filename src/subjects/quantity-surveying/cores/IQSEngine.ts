export interface ConcreteResult {
  volume: number;
}

export interface ConcreteMixResult {
  dryVolume: number;
  cementVolume: number;
  sandVolume: number;
  stoneVolume: number;
}

export interface BrickworkResult {
  brickCount: number;
  mortarVolume: number;
}

export interface SteelResult {
  weightKg: number;
}

export interface IQSEngine {
  calculateConcreteVolume(
    length: number,
    width: number,
    height: number,
    wastageFactor: number
  ): ConcreteResult;

  calculateConcreteMix(
    wetVolume: number,
    sandPart: number,
    stonePart: number,
    cementPart: number,
    shrinkageFactor: number
  ): ConcreteMixResult;


  calculateBrickwork(
    wallArea: number,
    wallThickness: number,
    brickLength: number,
    brickWidth: number,
    brickHeight: number,
    mortarThickness: number
  ): BrickworkResult;

  calculateSteelWeight(
    diameterMm: number,
    totalLengthMeters: number
  ): SteelResult;
}
