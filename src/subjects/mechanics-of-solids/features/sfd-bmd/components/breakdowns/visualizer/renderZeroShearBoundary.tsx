import React from 'react';
import { IBeam, ISolverOutput } from '@/subjects/mechanics-of-solids/cores/sfd-bmd/types';
import { LatexFormula } from '@/features/presentation/components/elements';
import { TwoColumnToastLayout } from '@/shared/layouts/TwoColumnToastLayout';

export const renderZeroShearBoundary = (
  diagram: React.ReactNode,
  beam: IBeam,
  solverResult: ISolverOutput
) => {
  const sfdSteps = solverResult.graphicalStepsData?.filter(s => s.type.startsWith('sfd-')) || [];
  const crossingSegment = sfdSteps.find(s => s.type === 'sfd-segment' && (s.vStart || 0) * (s.vEnd || 0) < 0);
  if (!crossingSegment) return null;

  const startX = crossingSegment.startX || 0;
  const endX = crossingSegment.endX || 0;
  const v1 = Math.abs(crossingSegment.vStart || 0);
  const v2 = Math.abs(crossingSegment.vEnd || 0);
  const L_seg = endX - startX;

  let x0 = 0;
  let totalX = 0;
  const exactCP = solverResult.criticalPoints.find(
    cp => cp.x > startX + 1e-3 && cp.x < endX - 1e-3 && cp.isLocalMaxMinM
  );
  if (exactCP) {
    totalX = exactCP.x;
    x0 = totalX - startX;
  } else {
    x0 = (v1 * L_seg) / (v1 + v2);
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
    if (w1 === 0) {
      formulaLatex = `x_0 = \\sqrt{\\frac{2 V_1 L_{seg}}{w_{max}}}`;
      calcLatex = `x_0 = \\sqrt{\\frac{2 \\cdot ${v1.toFixed(2)} \\cdot ${L_seg.toFixed(2)}}{${Math.max(w1, w2).toFixed(2)}}} = ${x0.toFixed(3)}\\text{ m}`;
    } else if (w2 === 0) {
      const w_max = Math.max(w1, w2);
      formulaLatex = `V_1 - w_{max} x_0 + \\frac{w_{max} x_0^2}{2 L_{seg}} = 0`;
      calcLatex = `${v1.toFixed(2)} - ${w_max.toFixed(2)} x_0 + \\frac{${w_max.toFixed(2)} x_0^2}{${(2 * L_seg).toFixed(2)}} = 0 \\implies x_0 = ${x0.toFixed(3)}\\text{ m}`;
    } else {
      formulaLatex = `x_0 = \\frac{V_1 \\cdot L_{seg}}{V_1 + V_2}`;
      calcLatex = `x_0 = \\frac{${v1.toFixed(2)} \\cdot ${L_seg.toFixed(2)}}{${v1.toFixed(2)} + ${v2.toFixed(2)}} = ${x0.toFixed(3)}\\text{ m}`;
    }
  } else {
    formulaLatex = `x_0 = \\frac{V_1 \\cdot L_{seg}}{V_1 + V_2}`;
    calcLatex = `x_0 = \\frac{${v1.toFixed(2)} \\cdot ${L_seg.toFixed(2)}}{${v1.toFixed(2)} + ${v2.toFixed(2)}} = ${x0.toFixed(3)}\\text{ m}`;
  }

  const toastPosition = totalX < beam.length / 2 ? 'right' : 'left';

  return (
    <TwoColumnToastLayout
      toastPosition={toastPosition}
      title="Zero-Shear Crossing Point"
      leftWidth="55%"
      leftContent={diagram}
      rightContent={
        <div className="flex flex-col gap-2.5 justify-center h-full text-left font-sans font-medium">
          <span className="text-[9px] font-bold text-rose-500 uppercase tracking-widest block font-mono">Zero-Shear Crossing</span>
          <h4 className="text-sm font-extrabold text-foreground font-sans">Crossing Point Calculation</h4>
          <div className="text-[11px] text-muted-foreground bg-muted/15 border border-border/30 rounded-xl p-2.5 space-y-2 select-text font-sans">
            <div>
              <span className="font-bold text-foreground block mb-0.5">Formula:</span>
              <div className="bg-indigo-500/5 dark:bg-indigo-500/10 border border-indigo-500/15 rounded-lg py-1.5 text-center text-indigo-500 my-1 font-semibold text-[10.5px]">
                <LatexFormula math={formulaLatex} />
              </div>
            </div>
            <div className="border-t border-border/25 pt-2">
              <span className="font-bold text-foreground block mb-0.5">Solve:</span>
              <div className="my-1 text-center font-semibold text-foreground text-[10.5px]">
                <LatexFormula math={calcLatex} />
              </div>
              <div className="mt-1.5 text-[10.5px]">
                Zero-shear point is located at <LatexFormula math={`x = ${totalX.toFixed(3)}\\text{ m}`} /> from the left support.
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
};
