import { describe, test, expect } from 'vitest';
import {
  calculateReservoirExcavation,
  calculateReservoirRaft,
  calculateReservoirWalls,
  calculateReservoirPlasterArea,
  calculatePudloRequirement,
  calculateSoakPitNetVolume,
  calculateSoakPitLooseVolume,
  calculateReservoirShearKeyVolume,
  calculateReservoirKeyDowelWeight,
  calculateSteppedSepticTankMasonry,
  calculateSepticPlasterAreas,
  calculateSoakPitStructural,
  calculateEcoStpCost,
  calculatePrefabTanksCost,
} from '../reservoir';

describe('Water Reservoir & Soak Pit Core Calculations', () => {
  test('should calculate correct excavation volume', () => {
    const vol = calculateReservoirExcavation(6.0, 4.0, 3.0, 0.5);
    expect(vol).toBe(105.0);
  });

  test('should calculate correct base raft volume', () => {
    const vol = calculateReservoirRaft(5.0, 3.0, 0.25, 0.3);
    expect(vol).toBe(5.775);
  });

  test('should calculate correct concrete walls volume', () => {
    const vol = calculateReservoirWalls(5.0, 3.0, 0.25, 2.5);
    expect(vol).toBe(10.625);
  });

  test('should calculate correct plaster area', () => {
    const area = calculateReservoirPlasterArea(5.0, 3.0, 2.5);
    expect(area).toBe(55.0);
  });

  test('should calculate correct Pudlo chemical requirement', () => {
    const kg = calculatePudloRequirement(55.0, 0.015, 50.0);
    expect(kg).toBe(41.250);
  });

  test('should calculate correct soak pit net volume', () => {
    const vol = calculateSoakPitNetVolume(2.0, 3.0);
    expect(vol).toBe(9.425); // Math.round(PI * 1 * 3 * 1000) / 1000 = 9.425
  });

  test('should calculate correct soak pit loose volume', () => {
    const vol = calculateSoakPitLooseVolume(9.425, 1.33);
    expect(vol).toBe(12.535);
  });

  test('should calculate correct shear key concrete volume', () => {
    const vol = calculateReservoirShearKeyVolume(15.0, 0.3, 0.2, 0.15);
    expect(vol).toBe(0.563); // 15 * 0.5 * 0.5 * 0.15 = 0.5625 -> 0.563
  });

  test('should calculate correct key dowel rebar weight', () => {
    const weight = calculateReservoirKeyDowelWeight(1.2, 0.15, 12, 16.0);
    expect(weight).toBe(114.133);
  });

  test('should calculate correct stepped septic tank brickwork masonry volume', () => {
    const steps = [
      { tWall: 0.375, height: 1.0 },
      { tWall: 0.25, height: 1.5 },
    ];
    const res = calculateSteppedSepticTankMasonry(3.0, 1.5, 1, steps);
    expect(res.stepVolumes).toEqual([4.5, 4.313]);
    expect(res.totalVolume).toBe(8.813);
  });

  test('should calculate correct septic tank plaster areas', () => {
    const res = calculateSepticPlasterAreas(3.0, 1.5, 2.0, 1);
    expect(res.wallPlasterAreaM2).toBe(24.0);
    expect(res.floorPlasterAreaM2).toBe(4.5);
  });

  test('should calculate correct soak pit structural volumes and steel weight', () => {
    const res = calculateSoakPitStructural(1.8, 2.5, 1.0, 0.25, 0.4, 0.3);
    expect(res.honeycombVolM3).toBe(3.019);
    expect(res.solidVolM3).toBe(1.610);
    expect(res.curbVolM3).toBe(0.829);
    expect(res.reinforcementKg).toBe(65.106);
  });

  test('should calculate correct Eco STP costs', () => {
    const res = calculateEcoStpCost(2000, 45, 12000);
    expect(res.baseStpCostBdt).toBe(90000);
    expect(res.totalStpCostBdt).toBe(102000);
  });

  test('should calculate correct prefabricated storage tanks costs', () => {
    const res = calculatePrefabTanksCost(3, 8500, 2, 14000);
    expect(res.plasticCostBdt).toBe(25500);
    expect(res.ferroCostBdt).toBe(28000);
    expect(res.totalPrefabCostBdt).toBe(53500);
  });
});
