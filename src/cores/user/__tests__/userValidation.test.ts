import { describe, test, expect } from 'vitest';
import {
  normalizeRegistration,
  validateRegistration,
  normalizeSession,
  validateSession
} from '../userValidation';

describe('User Registration & Session Utilities', () => {

  describe('Registration Checker & Normalizer', () => {
    test('should strip non-digits from registration number', () => {
      expect(normalizeRegistration('2016-333-012')).toBe('2016333012');
      expect(normalizeRegistration(' 2016 333 012 ')).toBe('2016333012');
      expect(normalizeRegistration('2016abc333xyz012')).toBe('2016333012');
    });

    test('should validate correct 10-digit registration', () => {
      expect(validateRegistration('2016333012')).toBe(true);
      expect(validateRegistration('2016-333-012')).toBe(true); // normalizes first
    });

    test('should reject invalid registration lengths', () => {
      expect(validateRegistration('201633301')).toBe(false);  // 9 digits
      expect(validateRegistration('20163330123')).toBe(false); // 11 digits
      expect(validateRegistration('abc')).toBe(false);
    });
  });

  describe('Session Checker & Normalizer', () => {
    test('should normalize varying session formats to YYYY-YY', () => {
      expect(normalizeSession('2016-2017')).toBe('2016-17');
      expect(normalizeSession('2021/22')).toBe('2021-22');
      expect(normalizeSession('2016 17')).toBe('2016-17');
      expect(normalizeSession('2020-21')).toBe('2020-21');
    });

    test('should validate standard YYYY-YY sessions with correct rollover', () => {
      expect(validateSession('2016-17')).toBe(true);
      expect(validateSession('2021-22')).toBe(true);
      expect(validateSession('1999-00')).toBe(true); // century rollover (99 + 1) % 100 = 0
    });

    test('should reject mathematically incorrect sessions', () => {
      expect(validateSession('2016-18')).toBe(false); // gap of 2 years
      expect(validateSession('2021-21')).toBe(false); // same year
      expect(validateSession('2016-15')).toBe(false); // backwards year
    });

    test('should reject malformed session strings', () => {
      expect(validateSession('abcd-ef')).toBe(false);
      expect(validateSession('2016')).toBe(false);
      expect(validateSession('16-17')).toBe(false); // Needs YYYY start year
    });
  });

});
