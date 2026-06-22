import { describe, it, expect } from 'vitest';
import { UnitConverter } from '../unitConverter';

describe('UnitConverter Core Utility', () => {
  describe('Length conversions', () => {
    it('should convert meters to feet correctly', () => {
      // 1 m * 3.280839895 = 3.280839895
      expect(UnitConverter.length.mToFt(1)).toBeCloseTo(3.2808, 4);
      expect(UnitConverter.length.mToFt(1, 3)).toBe(3.281);
      expect(UnitConverter.length.mToFt(0)).toBe(0);
      expect(UnitConverter.length.mToFt(-5, 2)).toBe(-16.4);
    });

    it('should convert feet to meters correctly', () => {
      // 1 ft * 0.3048 = 0.3048 m
      expect(UnitConverter.length.ftToM(1)).toBe(0.3048);
      expect(UnitConverter.length.ftToM(10, 2)).toBe(3.05);
    });

    it('should convert inches and meters correctly', () => {
      expect(UnitConverter.length.inToM(1)).toBe(0.0254);
      expect(UnitConverter.length.mToIn(1, 4)).toBe(39.3701);
    });

    it('should convert millimeters and meters correctly', () => {
      expect(UnitConverter.length.mmToM(1000)).toBe(1);
      expect(UnitConverter.length.mToMm(1.5)).toBe(1500);
    });

    it('should convert feet to inches and vice versa', () => {
      expect(UnitConverter.length.ftToIn(2)).toBe(24);
      expect(UnitConverter.length.inToFt(12)).toBe(1);
    });
  });

  describe('Area conversions', () => {
    it('should convert square meters to square feet (sft)', () => {
      expect(UnitConverter.area.m2ToSft(1, 3)).toBe(10.764);
      expect(UnitConverter.area.sftToM2(10.7639104, 3)).toBe(1.0);
    });
  });

  describe('Volume conversions', () => {
    it('should convert cubic meters to cubic feet (cft)', () => {
      expect(UnitConverter.volume.m3ToCft(1, 3)).toBe(35.315);
      expect(UnitConverter.volume.cftToM3(35.3146667, 3)).toBe(1.0);
    });
  });

  describe('Mass and weight conversions', () => {
    it('should convert kg, lb, kip, tonnes, and quintals', () => {
      expect(UnitConverter.mass.kgToLb(1, 3)).toBe(2.205);
      expect(UnitConverter.mass.lbToKg(2.2046226, 3)).toBe(1.0);
      expect(UnitConverter.mass.kgToKip(1000, 3)).toBe(2.205);
      expect(UnitConverter.mass.kipToKg(1, 3)).toBe(453.592);
      expect(UnitConverter.mass.kgToTonne(1000)).toBe(1);
      expect(UnitConverter.mass.tonneToKg(1.5)).toBe(1500);
      expect(UnitConverter.mass.kgToQtl(100)).toBe(1);
      expect(UnitConverter.mass.qtlToKg(1)).toBe(100);
    });
  });

  describe('Force and Pressure conversions', () => {
    it('should convert N and kN', () => {
      expect(UnitConverter.force.nToKn(1500)).toBe(1.5);
      expect(UnitConverter.force.knToN(2.5)).toBe(2500);
    });

    it('should convert pounds and kips force', () => {
      expect(UnitConverter.force.nToLb(4.44822, 2)).toBe(1);
      expect(UnitConverter.force.lbToN(1, 4)).toBe(4.4482);
    });

    it('should convert Pa, kPa, psi, and ksi', () => {
      expect(UnitConverter.pressure.paToKpa(1000)).toBe(1);
      expect(UnitConverter.pressure.kpaToPa(2.5)).toBe(2500);
      expect(UnitConverter.pressure.psiToPa(1, 2)).toBe(6894.76);
      expect(UnitConverter.pressure.psiToKsi(1000)).toBe(1);
      expect(UnitConverter.pressure.ksiToPsi(2.5)).toBe(2500);
    });
  });

  describe('Cement conversions', () => {
    it('should convert cft to standard bags of cement (1 bag = 1.25 cft)', () => {
      expect(UnitConverter.cement.cftToBags(1.25)).toBe(1);
      expect(UnitConverter.cement.cftToBags(2.5)).toBe(2);
      expect(UnitConverter.cement.bagsToCft(3)).toBe(3.75);
    });
  });
});
