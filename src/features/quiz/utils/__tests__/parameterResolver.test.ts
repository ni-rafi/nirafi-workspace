import { describe, it, expect } from 'vitest';
import { parameterResolver } from '../parameterResolver';

describe('parameterResolver', () => {
  describe('getLastDigit', () => {
    it('should extract last digit from a valid registration number string', () => {
      expect(parameterResolver.getLastDigit('2020331045')).toBe(5);
      expect(parameterResolver.getLastDigit('1234567890')).toBe(0);
    });

    it('should handle registration numbers with non-numeric prefixes', () => {
      expect(parameterResolver.getLastDigit('USN-45')).toBe(5);
      expect(parameterResolver.getLastDigit('CE-1002')).toBe(2);
    });

    it('should fallback to 0 for empty or entirely non-numeric strings', () => {
      expect(parameterResolver.getLastDigit('')).toBe(0);
      expect(parameterResolver.getLastDigit('ABC')).toBe(0);
    });
  });

  describe('getLastTwoDigits', () => {
    it('should extract last two digits from a standard registration number string', () => {
      expect(parameterResolver.getLastTwoDigits('2020331045')).toBe(45);
      expect(parameterResolver.getLastTwoDigits('1234567890')).toBe(90);
    });

    it('should handle registration numbers with letters and return two digits', () => {
      expect(parameterResolver.getLastTwoDigits('USN-2045')).toBe(45);
      expect(parameterResolver.getLastTwoDigits('CE-1002')).toBe(2);
    });

    it('should handle single digit numbers', () => {
      expect(parameterResolver.getLastTwoDigits('5')).toBe(5);
      expect(parameterResolver.getLastTwoDigits('USN-9')).toBe(9);
    });

    it('should fallback to 0 for invalid non-numeric registration inputs', () => {
      expect(parameterResolver.getLastTwoDigits('')).toBe(0);
      expect(parameterResolver.getLastTwoDigits('XYZ')).toBe(0);
    });
  });

  describe('isDynamic', () => {
    it('should identify functions as dynamic', () => {
      expect(parameterResolver.isDynamic((_reg: string) => _reg)).toBe(true);
    });

    it('should identify objects with formula/resolve properties as dynamic', () => {
      expect(parameterResolver.isDynamic({ formula: 'x', resolve: () => 1 })).toBe(true);
    });

    it('should identify static values as not dynamic', () => {
      expect(parameterResolver.isDynamic('static')).toBe(false);
      expect(parameterResolver.isDynamic(123)).toBe(false);
      expect(parameterResolver.isDynamic(null)).toBe(false);
    });
  });

  describe('resolve', () => {
    it('should return static value directly if a static value is passed', () => {
      expect(parameterResolver.resolve('static text', '2020331045')).toBe('static text');
      expect(parameterResolver.resolve(100, '2020331045')).toBe(100);
    });

    it('should evaluate dynamic generator function if a function is passed', () => {
      const dynamicFn = (reg: string) => `Value is ${10 + parameterResolver.getLastDigit(reg)}`;
      expect(parameterResolver.resolve(dynamicFn, '2020331045')).toBe('Value is 15');
    });

    it('should return formula representation of dynamic values if registration is missing', () => {
      const fnWithFormula = () => 'val';
      Object.assign(fnWithFormula, { formula: 'my-formula' });

      expect(parameterResolver.resolve(fnWithFormula)).toBe('my-formula');
      expect(parameterResolver.resolve({ formula: 'obj-formula', resolve: () => 'x' })).toBe('obj-formula');
    });
  });

  describe('resolveTemplate', () => {
    const params = {
      L: parameterResolver.lastDigit(10, 2, 'mm'),
      W: (reg: string) => String(parameterResolver.getLastDigit(reg) * 100)
    };
    Object.assign(params.W, { formula: '[last digit × 100]' });

    it('should resolve template placeholders with formulas when registration is missing', () => {
      const template = 'Length = {L}, Width = {W}';
      const resolved = parameterResolver.resolveTemplate(template, params);
      expect(resolved).toBe('Length = 10 + [last digit] × 2 mm, Width = [last digit × 100]');
    });

    it('should resolve template placeholders with evaluated values when registration is provided', () => {
      const template = 'Length = {L}, Width = {W}';
      const resolved = parameterResolver.resolveTemplate(template, params, '2020331045');
      expect(resolved).toBe('Length = 20mm, Width = 500');
    });
  });
});
