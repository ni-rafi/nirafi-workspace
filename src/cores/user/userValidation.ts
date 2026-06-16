/**
 * Normalizes a student registration number by stripping all non-digit characters.
 */
export function normalizeRegistration(reg: string): string {
  return reg.replace(/\D/g, '');
}

/**
 * Validates whether a registration number consists of exactly 10 digits.
 */
export function validateRegistration(reg: string): boolean {
  const normalized = normalizeRegistration(reg);
  return /^\d{10}$/.test(normalized);
}

/**
 * Normalizes a session string to the standard YYYY-YY format.
 * Supports delimiters like '-', '/', spaces, and resolves 4-digit end years.
 * E.g., '2016-2017' -> '2016-17', '2021/22' -> '2021-22', '2016 17' -> '2016-17'
 */
export function normalizeSession(session: string): string {
  const cleaned = session.trim();
  const match = cleaned.match(/^(\d{4})[-/\s]+(\d{2,4})$/);
  
  if (match && match[1] && match[2]) {
    const startYear = match[1];
    const endYear = match[2];
    const endSuffix = endYear.length === 4 ? endYear.slice(2) : endYear;
    return `${startYear}-${endSuffix}`;
  }
  
  return cleaned;
}

/**
 * Validates if the normalized session matches YYYY-YY and ensures
 * that the end year suffix is mathematically start year + 1 (modulo 100).
 * E.g. '2016-17' is valid (16 + 1 = 17), '2016-18' is invalid.
 */
export function validateSession(session: string): boolean {
  const normalized = normalizeSession(session);
  const match = normalized.match(/^(\d{4})-(\d{2})$/);
  if (!match || !match[1] || !match[2]) {
    return false;
  }

  const startYear = parseInt(match[1], 10);
  const endYearSuffix = parseInt(match[2], 10);

  // Check if end year is start year + 1 (modulo 100 to handle century rollover like 1999-00)
  const expectedEnd = (startYear + 1) % 100;
  return expectedEnd === endYearSuffix;
}
