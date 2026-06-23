/**
 * Resolves standard registration numbers to extract specific digits.
 * Standard format examples: "2020331045", "USN-2045", etc.
 */

export interface DynamicParameter<T = string | number> {
  formula: string;
  resolve: (reg: string) => T;
  digitsRequired?: number;
}

export interface IParameterResolver {
  getLastDigit(reg: string): number;
  getLastTwoDigits(reg: string): number;
  isDynamic(value: unknown): boolean;
  resolve<T>(
    value: T | ((reg: string) => T) | DynamicParameter<T>,
    reg: string
  ): T;
  resolve<T>(
    value: T | ((reg: string) => T) | DynamicParameter<T>,
    reg?: string
  ): T | string;
  resolveTemplate(
    template: string,
    params: Record<string, unknown>,
    reg?: string
  ): string;
  lastDigit(offset?: number, multiplier?: number, suffix?: string): DynamicParameter<string | number>;
  lastTwoDigits(offset?: number, multiplier?: number, suffix?: string): DynamicParameter<string | number>;
}

export const parameterResolver: IParameterResolver = {
  getLastDigit(reg: string): number {
    const digits = reg.replace(/\D/g, '');
    if (!digits) return 0;
    return parseInt(digits.slice(-1), 10);
  },

  getLastTwoDigits(reg: string): number {
    const digits = reg.replace(/\D/g, '');
    if (!digits) return 0;
    const len = digits.length;
    if (len === 1) return parseInt(digits, 10);
    return parseInt(digits.slice(-2), 10);
  },

  isDynamic(value: unknown): boolean {
    if (typeof value === 'function') return true;
    if (value && typeof value === 'object') {
      const obj = value as Record<string, unknown>;
      return 'formula' in obj || '__isDynamic' in obj || 'resolve' in obj;
    }
    return false;
  },

  resolve<T>(
    value: T | ((reg: string) => T) | DynamicParameter<T>,
    reg?: string
  ): T | string {
    if (!reg) {
      if (value && typeof value === 'object') {
        const obj = value as Record<string, unknown>;
        if ('formula' in obj) return String(obj.formula);
      }
      if (typeof value === 'function') {
        const fn = value as { formula?: string };
        return fn.formula || '[Dynamic Value]';
      }
      return value as T;
    }

    if (value && typeof value === 'object') {
      const obj = value as { resolve?: (reg: string) => T };
      if (typeof obj.resolve === 'function') {
        return obj.resolve(reg);
      }
    }
    return typeof value === 'function' ? (value as (reg: string) => T)(reg) : (value as T);
  },

  resolveTemplate(
    template: string,
    params: Record<string, unknown>,
    reg?: string
  ): string {
    let result = template;
    for (const [key, param] of Object.entries(params)) {
      const placeholder = `{${key}}`;
      if (!result.includes(placeholder)) continue;

      const replacement = this.resolve(param as Parameters<IParameterResolver['resolve']>[0], reg);
      result = result.replaceAll(placeholder, String(replacement));
    }
    return result;
  },

  lastDigit(offset = 0, multiplier = 1, suffix = ''): DynamicParameter<string | number> {
    const formula = offset === 0 && multiplier === 1
      ? '[last digit]'
      : `${offset} + [last digit]${multiplier !== 1 ? ` × ${multiplier}` : ''}`;
    const fullFormula = formula + (suffix ? ` ${suffix}` : '');
    return {
      formula: fullFormula,
      resolve: (reg: string) => {
        const digits = reg.replace(/\D/g, '');
        if (digits.length < 1) {
          return fullFormula;
        }
        const val = offset + this.getLastDigit(reg) * multiplier;
        const rounded = Math.round(val * 1000) / 1000;
        return suffix ? `${rounded}${suffix}` : rounded;
      },
      digitsRequired: 1
    };
  },

  lastTwoDigits(offset = 0, multiplier = 1, suffix = ''): DynamicParameter<string | number> {
    const formula = offset === 0 && multiplier === 1
      ? '[last 2 digits]'
      : `${offset} + [last 2 digits]${multiplier !== 1 ? ` × ${multiplier}` : ''}`;
    const fullFormula = formula + (suffix ? ` ${suffix}` : '');
    return {
      formula: fullFormula,
      resolve: (reg: string) => {
        const digits = reg.replace(/\D/g, '');
        if (digits.length < 2) {
          return fullFormula;
        }
        const val = offset + this.getLastTwoDigits(reg) * multiplier;
        const rounded = Math.round(val * 1000) / 1000;
        return suffix ? `${rounded}${suffix}` : rounded;
      },
      digitsRequired: 2
    };
  }
};
