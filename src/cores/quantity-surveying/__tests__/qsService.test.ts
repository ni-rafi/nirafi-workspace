import { describe, test, expect } from 'vitest';
import { QSEngine } from '../qsService';

describe('QSEngine Facade Service', () => {
  const engine = new QSEngine();

  test('should invoke concrete calculator correctly via interface', () => {
    const result = engine.calculateConcreteVolume(10, 0.3, 0.4);
    expect(result.volume).toBe(1.26);
  });

  test('should invoke brickwork calculator correctly via interface', () => {
    const result = engine.calculateBrickwork(10, 0.24, 0.24, 0.115, 0.07, 0.01);
    expect(result.brickCount).toBe(960);
    expect(result.mortarVolume).toBe(0.545);
  });

  test('should invoke steel weight calculator correctly via interface', () => {
    const result = engine.calculateSteelWeight(16, 100);
    expect(result.weightKg).toBe(158.025);
  });
});
