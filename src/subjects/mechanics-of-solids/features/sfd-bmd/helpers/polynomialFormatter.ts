export const formatSimplifiedPolynomial = (coeffs: number[], variable: string): string => {
  const cleanCoeffs = coeffs.findIndex(c => Math.abs(c) > 1e-5) !== -1
    ? coeffs.slice(coeffs.findIndex(c => Math.abs(c) > 1e-5))
    : [0];

  const degree = cleanCoeffs.length - 1;
  const nonZero = cleanCoeffs.map((c, i) => ({ val: c, deg: degree - i })).filter(item => Math.abs(item.val) > 1e-5);
  
  if (nonZero.length === 0) return '0';

  if (degree === 1 && cleanCoeffs[0] !== undefined && cleanCoeffs[0] < 0 && cleanCoeffs[1] !== undefined && cleanCoeffs[1] > 0) {
    return `${cleanCoeffs[1].toFixed(2)} - ${Math.abs(cleanCoeffs[0]).toFixed(2)}${variable}`;
  }

  let text = '';
  nonZero.forEach((item, idx) => {
    const sign = item.val >= 0 ? (idx === 0 ? '' : ' + ') : (idx === 0 ? '-' : ' - ');
    const absVal = Math.abs(item.val);
    const valText = absVal === 1 && item.deg > 0 ? '' : absVal.toFixed(2);
    const varText = item.deg === 0 ? '' : (item.deg === 1 ? variable : `${variable}^${item.deg}`);
    text += `${sign}${valText}${varText}`;
  });
  return text;
};
