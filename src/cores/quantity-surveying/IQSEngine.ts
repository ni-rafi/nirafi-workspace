export interface ConcreteResult {
  volume: number;
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
