import { IIntervalEquation } from '@/subjects/mechanics-of-solids/cores/sfd-bmd/types';

export const rxnA = 14.325;
export const svgWidth = 480;

export const getSvgX = (x: number, beamLength: number = 20): number => {
  return 50 + (x / beamLength) * 400;
};

export const getBaselines = (pairing: 'beam' | 'beam-sfd' | 'sfd-bmd' | 'all') => {
  const beamY = pairing === 'all' ? 38 : 42;
  const sfdY = pairing === 'all' ? 124 : pairing === 'sfd-bmd' ? 42 : 152;
  const bmdY = pairing === 'all' ? 192 : pairing === 'sfd-bmd' ? 130 : 142;
  return { beamY, sfdY, bmdY };
};

export const getScales = (pairing: 'beam' | 'beam-sfd' | 'sfd-bmd' | 'all') => {
  const sfdScale = pairing === 'all' ? 1.15 : pairing === 'sfd-bmd' ? 1.45 : 1.9;
  const bmdScale = pairing === 'all' ? 0.42 : 0.45;
  return { sfdScale, bmdScale };
};

export const getBmdCurvePoints = (
  xStart: number,
  xEnd: number,
  bmdBaseline: number,
  bmdScale: number,
  beamLength: number,
  intervals: IIntervalEquation[]
): string => {
  let points = '';
  const steps = 25;
  for (let i = 0; i <= steps; i++) {
    const xVal = xStart + (xEnd - xStart) * (i / steps);
    const interval = intervals.find(
      inv => xVal >= inv.startX - 1e-6 && xVal <= inv.endX + 1e-6
    );
    const [a, b, c, d] = interval ? interval.mCoeffs : [0, 0, 0, 0];
    const m = a * Math.pow(xVal, 3) + b * Math.pow(xVal, 2) + c * xVal + d;
    const svgX = getSvgX(xVal, beamLength);
    const svgY = bmdBaseline - m * bmdScale;
    points += `${svgX},${svgY} `;
  }
  return points.trim();
};

export const getSfdCurvePoints = (
  xStart: number,
  xEnd: number,
  sfdBaseline: number,
  sfdScale: number,
  beamLength: number,
  intervals: IIntervalEquation[]
): string => {
  let points = '';
  const steps = 25;
  for (let i = 0; i <= steps; i++) {
    const xVal = xStart + (xEnd - xStart) * (i / steps);
    const interval = intervals.find(
      inv => xVal >= inv.startX - 1e-6 && xVal <= inv.endX + 1e-6
    );
    const [a, b, c] = interval ? interval.vCoeffs : [0, 0, 0];
    const v = a * Math.pow(xVal, 2) + b * xVal + c;
    const svgX = getSvgX(xVal, beamLength);
    const svgY = sfdBaseline - v * sfdScale;
    points += `${svgX},${svgY} `;
  }
  return points.trim();
};
