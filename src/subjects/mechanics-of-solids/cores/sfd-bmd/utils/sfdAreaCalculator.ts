import { IIntervalEquation } from '../types';

export interface ISfdAreaResult {
  area: number;
  formulaLatex: string;
  calcLatex: string;
  noteText: string;
}

export function calculateSfdSegmentArea(
  startX: number,
  endX: number,
  vStart: number,
  vEnd: number,
  intervals: IIntervalEquation[],
  isPeakSplit?: 'first' | 'second',
  _peakX?: number,
  hasVertexAtStart?: boolean,
  hasVertexAtEnd?: boolean
): ISfdAreaResult {
  const L_seg = endX - startX;
  if (L_seg <= 1e-9) {
    return { area: 0, formulaLatex: '', calcLatex: '', noteText: '' };
  }

  // Find matching interval
  const interval = intervals?.find(
    inv => startX >= inv.startX - 1e-3 && endX <= inv.endX + 1e-3
  );

  const [a, b] = interval ? interval.vCoeffs : [0, 0];
  const isCurved = Math.abs(a) > 1e-6;
  const isLinear = Math.abs(b) > 1e-6;

  // Compute area analytically by integrating V(x) = a*x^2 + b*x + c
  let area = 0;
  if (interval) {
    const [aVal, bVal, cVal] = interval.vCoeffs; // vCoeffs is [a, b, c] where V(x) = a*x^2 + b*x + c
    const intV = (x: number) => (aVal / 3) * Math.pow(x, 3) + (bVal / 2) * Math.pow(x, 2) + cVal * x;
    area = intV(endX) - intV(startX);
  } else {
    // Fallback area calculations if no interval found
    if (isCurved) {
      area = (2 / 3) * L_seg * (isPeakSplit === 'first' ? vStart : vEnd);
    } else if (isLinear) {
      area = ((vStart + vEnd) / 2) * L_seg;
    } else {
      area = vStart * L_seg;
    }
  }

  const finalArea = Math.abs(area);
  const areaSign = area >= 0 ? '+' : '-';

  let formulaLatex = '';
  let calcLatex = '';
  let noteText = '';

  if (isCurved) {
    if (isPeakSplit === 'first' && hasVertexAtStart) {
      formulaLatex = `\\Delta M = \\frac{2}{3} \\cdot b \\cdot h`;
      calcLatex = `\\Delta M = \\frac{2}{3} \\cdot ${L_seg.toFixed(3)}\\text{m} \\cdot ${Math.abs(vStart).toFixed(3)}\\text{kN} = ${areaSign}${finalArea.toFixed(3)}\\text{ kNm}`;
      noteText = `★ Note: Since the shear curve has a vertex (zero load) at x = ${startX.toFixed(1)}m, we can use the parabolic spandrel area formula: A = 2/3 * b * h.`;
    } else if (isPeakSplit === 'second' && hasVertexAtEnd) {
      formulaLatex = `\\Delta M = \\frac{2}{3} \\cdot b \\cdot h`;
      calcLatex = `\\Delta M = \\frac{2}{3} \\cdot ${L_seg.toFixed(3)}\\text{m} \\cdot ${Math.abs(vEnd).toFixed(3)}\\text{kN} = ${areaSign}${finalArea.toFixed(3)}\\text{ kNm}`;
      noteText = `★ Note: Since the shear curve has a vertex (zero load) at x = ${endX.toFixed(1)}m, we can use the parabolic spandrel area formula: A = 2/3 * b * h.`;
    } else {
      formulaLatex = `\\Delta M = \\int_{x_1}^{x_2} V(x) \\, dx`;
      calcLatex = `\\Delta M = \\text{Area} = ${areaSign}${finalArea.toFixed(3)}\\text{ kNm}`;
      noteText = `★ Note: Since this parabolic segment does not start or end at the vertex (slope is non-zero at both boundaries), the area is calculated using the difference of parabolic spandrels or formal integration.`;
    }
  } else if (isLinear) {
    if (isPeakSplit) {
      formulaLatex = `\\Delta M = \\frac{1}{2} \\cdot b \\cdot h`;
      calcLatex = `\\Delta M = \\frac{1}{2} \\cdot ${L_seg.toFixed(3)}\\text{m} \\cdot ${Math.abs(isPeakSplit === 'first' ? vStart : vEnd).toFixed(3)}\\text{kN} = ${areaSign}${finalArea.toFixed(3)}\\text{ kNm}`;
      noteText = `★ Note: Since the shear crosses zero, this segment forms a right-angled triangle.`;
    } else {
      formulaLatex = `\\Delta M = \\frac{V_1 + V_2}{2} \\cdot L`;
      calcLatex = `\\Delta M = \\frac{${vStart.toFixed(3)} + ${vEnd.toFixed(3)}}{2} \\cdot ${L_seg.toFixed(3)} = ${areaSign}${finalArea.toFixed(3)}\\text{ kNm}`;
    }
  } else {
    formulaLatex = `\\Delta M = V \\cdot L`;
    calcLatex = `\\Delta M = ${vStart.toFixed(3)}\\text{kN} \\cdot ${L_seg.toFixed(3)}\\text{m} = ${areaSign}${finalArea.toFixed(3)}\\text{ kNm}`;
  }

  return {
    area,
    formulaLatex,
    calcLatex,
    noteText,
  };
}
