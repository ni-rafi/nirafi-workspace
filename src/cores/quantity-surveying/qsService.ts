import type { IQSEngine, ConcreteResult, BrickworkResult, SteelResult } from './IQSEngine';
import { calculateConcreteVolumeInternal } from './concrete';
import { calculateBrickworkInternal } from './brickwork';
import { calculateSteelWeightInternal } from './steel';

export class QSEngine implements IQSEngine {
  public calculateConcreteVolume(
    length: number,
    width: number,
    height: number,
    wastageFactor: number = 0.05
  ): ConcreteResult {
    return calculateConcreteVolumeInternal(length, width, height, wastageFactor);
  }

  public calculateBrickwork(
    wallArea: number,
    wallThickness: number,
    brickLength: number,
    brickWidth: number,
    brickHeight: number,
    mortarThickness: number = 0.01
  ): BrickworkResult {
    return calculateBrickworkInternal(
      wallArea,
      wallThickness,
      brickLength,
      brickWidth,
      brickHeight,
      mortarThickness
    );
  }

  public calculateSteelWeight(
    diameterMm: number,
    totalLengthMeters: number
  ): SteelResult {
    return calculateSteelWeightInternal(diameterMm, totalLengthMeters);
  }
}
