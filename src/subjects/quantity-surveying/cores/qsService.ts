import type { IQSEngine, ConcreteResult, ConcreteMixResult, BrickworkResult, SteelResult } from './IQSEngine';
import { calculateConcreteVolumeInternal, calculateConcreteMixIngredients } from './concrete';
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

  public calculateConcreteMix(
    wetVolume: number,
    sandPart: number,
    stonePart: number,
    cementPart: number = 1,
    shrinkageFactor: number = 1.54
  ): ConcreteMixResult {
    return calculateConcreteMixIngredients(wetVolume, sandPart, stonePart, cementPart, shrinkageFactor);
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

