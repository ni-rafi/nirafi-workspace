import React from 'react';
import { IBeam, ISolverOutput } from '@/subjects/mechanics-of-solids/cores/sfd-bmd/types';
import { LatexFormula } from '@/features/presentation/components/elements';
import { TwoColumnToastLayout } from '@/shared/layouts/TwoColumnToastLayout';
import { solveZeroShearCrossing } from '@/subjects/mechanics-of-solids/cores/sfd-bmd';

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
  const vStart = crossingSegment.vStart || 0;
  const vEnd = crossingSegment.vEnd || 0;

  const crossInfo = solveZeroShearCrossing(beam, solverResult, startX, endX, vStart, vEnd);
  if (!crossInfo) return null;

  const { totalX, formulaLatex, calcLatex } = crossInfo;

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
