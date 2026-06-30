import { IBeam, ISolverOutput } from '../types';

export interface IZeroShearCrossingInfo {
  x0: number;
  totalX: number;
  formulaLatex: string;
  calcLatex: string;
}

export function solveZeroShearCrossing(
  beam: IBeam,
  solverResult: ISolverOutput,
  startX: number,
  endX: number,
  vStart: number,
  vEnd: number
): IZeroShearCrossingInfo | null {
  const L_seg = endX - startX;
  if (L_seg <= 1e-9) return null;

  const v1 = Math.abs(vStart);
  const v2 = Math.abs(vEnd);

  let x0 = 0;
  let totalX = 0;
  const exactCP = solverResult.criticalPoints.find(
    cp => cp.x > startX + 1e-3 && cp.x < endX - 1e-3 && cp.isLocalMaxMinM
  );
  if (exactCP) {
    totalX = exactCP.x;
    x0 = totalX - startX;
  } else {
    x0 = v1 + v2 > 1e-9 ? (v1 * L_seg) / (v1 + v2) : 0;
    totalX = startX + x0;
  }

  const midX = (startX + endX) / 2;
  const udlLoad = beam.loads.find(
    l => l.type === 'udl' && midX >= (l.startPosition ?? 0) && midX <= (l.endPosition ?? 0)
  );
  const uvlLoad = beam.loads.find(
    l => l.type === 'uvl' && midX >= (l.startPosition ?? 0) && midX <= (l.endPosition ?? 0)
  );

  let formulaLatex = '';
  let calcLatex = '';

  if (udlLoad) {
    const w = udlLoad.magnitude || 0;
    formulaLatex = `x_0 = \\frac{V_1}{w}`;
    calcLatex = `x_0 = \\frac{${v1.toFixed(2)}}{${w.toFixed(2)}} = ${x0.toFixed(3)}\\text{ m}`;
  } else if (uvlLoad) {
    const w1 = uvlLoad.startMagnitude || 0;
    const w2 = uvlLoad.endMagnitude || 0;
    const wDiff = w2 - w1;
    const signStr = wDiff < 0 ? '+' : '-';
    const absWDiff = Math.abs(wDiff);
    const denom = 2 * L_seg;

    formulaLatex = `V_1 - w_1 x_0 - \\frac{w_2 - w_1}{2 L_{seg}} x_0^2 = 0`;
    calcLatex = `${v1.toFixed(2)} - ${w1.toFixed(2)} x_0 ${signStr} \\frac{${absWDiff.toFixed(2)}}{${denom.toFixed(2)}} x_0^2 = 0 \\implies x_0 = ${x0.toFixed(3)}\\text{ m}`;
  } else {
    formulaLatex = `x_0 = \\frac{V_1 \\cdot L_{seg}}{V_1 + V_2}`;
    calcLatex = `x_0 = \\frac{${v1.toFixed(2)} \\cdot ${L_seg.toFixed(2)}}{${v1.toFixed(2)} + ${v2.toFixed(2)}} = ${x0.toFixed(3)}\\text{ m}`;
  }

  return {
    x0,
    totalX,
    formulaLatex,
    calcLatex,
  };
}
