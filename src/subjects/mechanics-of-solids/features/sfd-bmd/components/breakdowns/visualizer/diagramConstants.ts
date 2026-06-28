export const rxnA = 14.325;
export const svgWidth = 480;

export const getSvgX = (x: number): number => {
  return 50 + x * 20;
};

export const getBaselines = (pairing: 'beam' | 'beam-sfd' | 'sfd-bmd' | 'all') => {
  const beamY = pairing === 'all' ? 38 : 42;
  const sfdY = pairing === 'all' ? 112 : pairing === 'sfd-bmd' ? 52 : 138;
  const bmdY = pairing === 'all' ? 202 : 142;
  return { beamY, sfdY, bmdY };
};

export const getScales = (pairing: 'beam' | 'beam-sfd' | 'sfd-bmd' | 'all') => {
  const sfdScale = pairing === 'all' ? 1.15 : pairing === 'sfd-bmd' ? 1.45 : 1.9;
  const bmdScale = pairing === 'all' ? 0.42 : 0.45;
  return { sfdScale, bmdScale };
};

export const getParabolaPoints = (xStart: number, xEnd: number, bmdBaseline: number, bmdScale: number): string => {
  let points = '';
  const steps = 20;
  for (let i = 0; i <= steps; i++) {
    const xVal = xStart + (xEnd - xStart) * (i / steps);
    const u = xVal - 5;
    const m = 71.625 + 14.325 * u - 1.5 * u * u;
    const svgX = getSvgX(xVal);
    const svgY = bmdBaseline - m * bmdScale;
    points += `${svgX},${svgY} `;
  }
  return points;
};
