/**
 * Standard Conversion Constants
 */
export const LENGTH = {
  M_TO_FT: 3.280839895,
  FT_TO_M: 0.3048,
  M_TO_IN: 39.37007874,
  IN_TO_M: 0.0254,
  MM_TO_M: 0.001,
  M_TO_MM: 1000,
} as const;

export const AREA = {
  M2_TO_SFT: 10.7639104167,
  SFT_TO_M2: 0.09290304,
  M2_TO_SQIN: 1550.0031000062,
  SQIN_TO_M2: 0.00064516,
} as const;

export const VOLUME = {
  M3_TO_CFT: 35.3146667215,
  CFT_TO_M3: 0.028316846592,
} as const;

export const MASS = {
  KG_TO_LB: 2.2046226218,
  LB_TO_KG: 0.45359237,
  LB_TO_KIP: 0.001,
  KIP_TO_LB: 1000,
  KG_TO_TONNE: 0.001,
  TONNE_TO_KG: 1000,
  KG_TO_QTL: 0.01,
  QTL_TO_KG: 100,
} as const;

export const FORCE = {
  N_TO_KN: 0.001,
  KN_TO_N: 1000,
  N_TO_LB: 0.22480894387,
  LB_TO_N: 4.44822161526,
  LB_TO_KIP: 0.001,
  KIP_TO_LB: 1000,
} as const;

export const PRESSURE = {
  PA_TO_KPA: 0.001,
  KPA_TO_PA: 1000,
  PA_TO_PSI: 0.0001450377377,
  PSI_TO_PA: 6894.7572931683,
  PSI_TO_PSI: 1,
  PSI_TO_KSI: 0.001,
  KSI_TO_PSI: 1000,
} as const;

export const CEMENT = {
  CFT_PER_BAG: 1.25,
} as const;

/**
 * Rounds a number to a specified number of decimal places.
 */
export function round(value: number, precision?: number): number {
  if (precision === undefined) return value;
  const multiplier = Math.pow(10, precision);
  return Math.round(value * multiplier) / multiplier;
}

/**
 * Central Unit Converter providing pure utility functions grouped by dimension.
 */
export const UnitConverter = {
  length: {
    mToFt: (val: number, p?: number) => round(val * LENGTH.M_TO_FT, p),
    ftToM: (val: number, p?: number) => round(val * LENGTH.FT_TO_M, p),
    mToIn: (val: number, p?: number) => round(val * LENGTH.M_TO_IN, p),
    inToM: (val: number, p?: number) => round(val * LENGTH.IN_TO_M, p),
    mmToM: (val: number, p?: number) => round(val * LENGTH.MM_TO_M, p),
    mToMm: (val: number, p?: number) => round(val * LENGTH.M_TO_MM, p),
    inToMm: (val: number, p?: number) => round(val * LENGTH.IN_TO_M * 1000, p),
    mmToIn: (val: number, p?: number) => round((val * LENGTH.MM_TO_M) * LENGTH.M_TO_IN, p),
    ftToIn: (val: number, p?: number) => round(val * 12, p),
    inToFt: (val: number, p?: number) => round(val / 12, p),
  },
  area: {
    m2ToSft: (val: number, p?: number) => round(val * AREA.M2_TO_SFT, p),
    sftToM2: (val: number, p?: number) => round(val * AREA.SFT_TO_M2, p),
    m2ToSqIn: (val: number, p?: number) => round(val * AREA.M2_TO_SQIN, p),
    sqInToM2: (val: number, p?: number) => round(val * AREA.SQIN_TO_M2, p),
  },
  volume: {
    m3ToCft: (val: number, p?: number) => round(val * VOLUME.M3_TO_CFT, p),
    cftToM3: (val: number, p?: number) => round(val * VOLUME.CFT_TO_M3, p),
  },
  mass: {
    kgToLb: (val: number, p?: number) => round(val * MASS.KG_TO_LB, p),
    lbToKg: (val: number, p?: number) => round(val * MASS.LB_TO_KG, p),
    kgToKip: (val: number, p?: number) => round(val * MASS.KG_TO_LB * MASS.LB_TO_KIP, p),
    kipToKg: (val: number, p?: number) => round(val * MASS.KIP_TO_LB * MASS.LB_TO_KG, p),
    kgToTonne: (val: number, p?: number) => round(val * MASS.KG_TO_TONNE, p),
    tonneToKg: (val: number, p?: number) => round(val * MASS.TONNE_TO_KG, p),
    kgToQtl: (val: number, p?: number) => round(val * MASS.KG_TO_QTL, p),
    qtlToKg: (val: number, p?: number) => round(val * MASS.QTL_TO_KG, p),
    lbToKip: (val: number, p?: number) => round(val * MASS.LB_TO_KIP, p),
    kipToLb: (val: number, p?: number) => round(val * MASS.KIP_TO_LB, p),
  },
  force: {
    nToKn: (val: number, p?: number) => round(val * FORCE.N_TO_KN, p),
    knToN: (val: number, p?: number) => round(val * FORCE.KN_TO_N, p),
    nToLb: (val: number, p?: number) => round(val * FORCE.N_TO_LB, p),
    lbToN: (val: number, p?: number) => round(val * FORCE.LB_TO_N, p),
    nToKip: (val: number, p?: number) => round(val * FORCE.N_TO_LB * FORCE.LB_TO_KIP, p),
    kipToN: (val: number, p?: number) => round(val * FORCE.KIP_TO_LB * FORCE.LB_TO_N, p),
    knToKip: (val: number, p?: number) => round((val * FORCE.KN_TO_N) * FORCE.N_TO_LB * FORCE.LB_TO_KIP, p),
    kipToKn: (val: number, p?: number) => round((val * FORCE.KIP_TO_LB * FORCE.LB_TO_N) * FORCE.N_TO_KN, p),
  },
  pressure: {
    paToKpa: (val: number, p?: number) => round(val * PRESSURE.PA_TO_KPA, p),
    kpaToPa: (val: number, p?: number) => round(val * PRESSURE.KPA_TO_PA, p),
    paToPsi: (val: number, p?: number) => round(val * PRESSURE.PA_TO_PSI, p),
    psiToPa: (val: number, p?: number) => round(val * PRESSURE.PSI_TO_PA, p),
    kpaToPsi: (val: number, p?: number) => round(val * 1000 * PRESSURE.PA_TO_PSI, p),
    psiToKpa: (val: number, p?: number) => round((val * PRESSURE.PSI_TO_PA) * PRESSURE.PA_TO_KPA, p),
    psiToKsi: (val: number, p?: number) => round(val * PRESSURE.PSI_TO_KSI, p),
    ksiToPsi: (val: number, p?: number) => round(val * PRESSURE.KSI_TO_PSI, p),
    kpaToKsi: (val: number, p?: number) => round((val * 1000 * PRESSURE.PA_TO_PSI) * PRESSURE.PSI_TO_KSI, p),
    ksiToKpa: (val: number, p?: number) => round(((val * PRESSURE.KSI_TO_PSI) * PRESSURE.PSI_TO_PA) * PRESSURE.PA_TO_KPA, p),
  },
  cement: {
    cftToBags: (val: number, p?: number) => round(val / CEMENT.CFT_PER_BAG, p),
    bagsToCft: (val: number, p?: number) => round(val * CEMENT.CFT_PER_BAG, p),
  },
  round,
};
