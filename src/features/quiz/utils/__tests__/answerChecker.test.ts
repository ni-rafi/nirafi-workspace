import { describe, it, expect } from 'vitest';
import {
  normalizeUnit,
  parseNumericAnswer,
  checkQuizAnswerCorrectness,
} from '../answerChecker';

describe('normalizeUnit', () => {
  it('should normalize standard volume units', () => {
    expect(normalizeUnit('m3')).toBe('m3');
    expect(normalizeUnit('cum')).toBe('m3');
    expect(normalizeUnit('cu.m.')).toBe('m3');
    expect(normalizeUnit('Cubic Meter')).toBe('m3');
  });

  it('should normalize standard feet/cft units', () => {
    expect(normalizeUnit('cft')).toBe('cft');
    expect(normalizeUnit('cu.ft')).toBe('cft');
    expect(normalizeUnit('ft3')).toBe('cft');
    expect(normalizeUnit('cubicfeet')).toBe('cft');
  });

  it('should normalize standard area units', () => {
    expect(normalizeUnit('sqft')).toBe('sqft');
    expect(normalizeUnit('sft')).toBe('sqft');
    expect(normalizeUnit('ft2')).toBe('sqft');
  });

  it('should normalize standard linear and mass units', () => {
    expect(normalizeUnit('m')).toBe('m');
    expect(normalizeUnit('meter')).toBe('m');
    expect(normalizeUnit('kg')).toBe('kg');
    expect(normalizeUnit('kgs')).toBe('kg');
  });

  it('should return empty string for empty input', () => {
    expect(normalizeUnit('')).toBe('');
    expect(normalizeUnit('   ')).toBe('');
  });
});

describe('parseNumericAnswer', () => {
  it('should parse simple integers', () => {
    expect(parseNumericAnswer('308')).toEqual({ value: 308, unit: '' });
  });

  it('should parse decimals with signs', () => {
    expect(parseNumericAnswer('-123.45')).toEqual({ value: -123.45, unit: '' });
    expect(parseNumericAnswer('+0.99')).toEqual({ value: 0.99, unit: '' });
  });

  it('should parse number and unit with spaces', () => {
    expect(parseNumericAnswer('308 cft')).toEqual({ value: 308, unit: 'cft' });
    expect(parseNumericAnswer('  -15.5   cum ')).toEqual({ value: -15.5, unit: 'cum' });
  });

  it('should parse number and unit without spaces', () => {
    expect(parseNumericAnswer('308cft')).toEqual({ value: 308, unit: 'cft' });
    expect(parseNumericAnswer('12.5m')).toEqual({ value: 12.5, unit: 'm' });
  });

  it('should return null for non-numeric input', () => {
    expect(parseNumericAnswer('abc')).toBeNull();
    expect(parseNumericAnswer('cft 308')).toBeNull();
    expect(parseNumericAnswer('')).toBeNull();
  });
});

describe('checkQuizAnswerCorrectness', () => {
  describe('Multiple Choice Type', () => {
    it('should match case-insensitively', () => {
      expect(checkQuizAnswerCorrectness('A', 'a', 'multiple-choice')).toBe(true);
      expect(checkQuizAnswerCorrectness('b', 'B', 'multiple-choice')).toBe(true);
    });

    it('should fail on mismatched choices', () => {
      expect(checkQuizAnswerCorrectness('A', 'B', 'multiple-choice')).toBe(false);
    });
  });

  describe('Numeric Input Type', () => {
    it('should match exact numbers and identical units', () => {
      expect(checkQuizAnswerCorrectness('308 cft', '308 cft', 'numeric-input')).toBe(true);
      expect(checkQuizAnswerCorrectness('308cft', '308 cft', 'numeric-input')).toBe(true);
      expect(checkQuizAnswerCorrectness('308 cft', '308cft', 'numeric-input')).toBe(true);
    });

    it('should match within default 1% tolerance', () => {
      // 308 * 0.01 = 3.08 tolerance range
      expect(checkQuizAnswerCorrectness('306 cft', '308 cft', 'numeric-input')).toBe(true);
      expect(checkQuizAnswerCorrectness('310 cft', '308 cft', 'numeric-input')).toBe(true);
      expect(checkQuizAnswerCorrectness('300 cft', '308 cft', 'numeric-input')).toBe(false);
    });

    it('should allow unit omission as match-all', () => {
      expect(checkQuizAnswerCorrectness('308', '308 cft', 'numeric-input')).toBe(true);
      expect(checkQuizAnswerCorrectness('308 cft', '308', 'numeric-input')).toBe(true);
    });

    it('should check unit aliases', () => {
      expect(checkQuizAnswerCorrectness('308 cum', '308 m3', 'numeric-input')).toBe(true);
      expect(checkQuizAnswerCorrectness('308 cft', '308 ft3', 'numeric-input')).toBe(true);
    });

    it('should fail on unit mismatch when both are defined', () => {
      expect(checkQuizAnswerCorrectness('308 kg', '308 m', 'numeric-input')).toBe(false);
    });

    it('should support structured config definitions', () => {
      const config = {
        value: 300,
        unit: 'm',
        tolerance: 5,
        toleranceType: 'absolute' as const,
      };

      expect(checkQuizAnswerCorrectness('296 m', config, 'numeric-input')).toBe(true);
      expect(checkQuizAnswerCorrectness('305 m', config, 'numeric-input')).toBe(true);
      expect(checkQuizAnswerCorrectness('294 m', config, 'numeric-input')).toBe(false);
    });
  });
});
