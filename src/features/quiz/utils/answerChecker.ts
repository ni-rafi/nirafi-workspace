export interface NumericAnswerConfig {
  value: number;
  unit?: string;
  tolerance?: number; // e.g. 0.01 for 1%
  toleranceType?: 'percent' | 'absolute';
}

export type QuizAnswerDefinition = string | NumericAnswerConfig;

export interface ParsedAnswer {
  value: number;
  unit: string;
}

/**
 * Normalizes common unit names and aliases for consistency (e.g. cum -> m3, sft -> sqft).
 */
export function normalizeUnit(unit: string): string {
  const u = unit.trim().toLowerCase().replace(/[\s.]/g, '');
  if (!u) return '';
  if (['m3', 'cum', 'cumtr', 'cubicmeter', 'cubicmeters'].includes(u)) return 'm3';
  if (['m2', 'sqm', 'squaremeter', 'squaremeters'].includes(u)) return 'm2';
  if (['ft3', 'cft', 'cuft', 'cubicfeet', 'cubicfoot'].includes(u)) return 'cft';
  if (['ft2', 'sqft', 'sft', 'squarefeet', 'squarefoot'].includes(u)) return 'sqft';
  if (['m', 'meter', 'meters'].includes(u)) return 'm';
  if (['ft', 'foot', 'feet'].includes(u)) return 'ft';
  if (['kg', 'kgs', 'kilogram', 'kilograms'].includes(u)) return 'kg';
  return u;
}

/**
 * Parses a string input into a numeric value and an optional unit string.
 * Example: "308 cft" -> { value: 308, unit: "cft" }
 */
export function parseNumericAnswer(input: string): ParsedAnswer | null {
  const cleanInput = input.trim();
  if (!cleanInput) return null;

  // Match leading number (optional sign, decimal), optional spacing, and trailing text (unit)
  const match = cleanInput.match(/^([+-]?(?:\d+(?:\.\d*)?|\.\d+))\s*(.*)$/);
  if (!match) return null;

  const numVal = parseFloat(match[1]);
  if (isNaN(numVal)) return null;

  return {
    value: numVal,
    unit: match[2].trim(),
  };
}

/**
 * Validates correctness of a student's answer against the target quiz answer definition.
 */
export function checkQuizAnswerCorrectness(
  studentAns: string,
  correctAnsDef: QuizAnswerDefinition,
  quizType: 'numeric-input' | 'multiple-choice'
): boolean {
  const studentClean = studentAns.trim();
  if (!studentClean) return false;

  // Multiple Choice matching is straightforward exact case-insensitive match
  if (quizType === 'multiple-choice') {
    const targetStr = typeof correctAnsDef === 'string' 
      ? correctAnsDef.trim() 
      : String(correctAnsDef.value).trim();
    return studentClean.toLowerCase() === targetStr.toLowerCase();
  }

  // Parse Student Answer
  const studentParsed = parseNumericAnswer(studentClean);
  if (!studentParsed) return false;

  // Resolve Correct Answer Configuration
  let targetValue: number;
  let targetUnit = '';
  let tolerance = 0.01; // Default ±1% tolerance
  let toleranceType: 'percent' | 'absolute' = 'percent';

  if (typeof correctAnsDef === 'object' && correctAnsDef !== null) {
    targetValue = correctAnsDef.value;
    targetUnit = correctAnsDef.unit || '';
    if (correctAnsDef.tolerance !== undefined) {
      tolerance = correctAnsDef.tolerance;
    }
    if (correctAnsDef.toleranceType !== undefined) {
      toleranceType = correctAnsDef.toleranceType;
    }
  } else {
    // If correctAnsDef is a string, try to parse it as a numeric answer
    const targetParsed = parseNumericAnswer(String(correctAnsDef));
    if (targetParsed) {
      targetValue = targetParsed.value;
      targetUnit = targetParsed.unit;
    } else {
      // Fallback: If correct answer isn't parseable as numeric, do standard string match
      return studentClean.toLowerCase() === String(correctAnsDef).trim().toLowerCase();
    }
  }

  // 1. Verify Numeric Value within Tolerance
  const diff = Math.abs(studentParsed.value - targetValue);
  let isCorrectNumber = false;

  if (toleranceType === 'percent') {
    const maxAllowedDiff = Math.abs(targetValue) * tolerance;
    isCorrectNumber = diff <= maxAllowedDiff;
  } else {
    isCorrectNumber = diff <= tolerance;
  }

  if (!isCorrectNumber) return false;

  // 2. Verify Units
  const normStudentUnit = normalizeUnit(studentParsed.unit);
  const normTargetUnit = normalizeUnit(targetUnit);

  // If one unit is completely omitted, we count it as correct (math-only check)
  if (!normStudentUnit || !normTargetUnit) {
    return true;
  }

  // If both specified units, they must match normalized values
  return normStudentUnit === normTargetUnit;
}
