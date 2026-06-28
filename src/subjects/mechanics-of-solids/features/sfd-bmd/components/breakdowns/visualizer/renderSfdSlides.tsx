import React from 'react';
import { ClickReveal, LatexFormula } from '@/features/presentation/components/elements';
import { TwoColumnToastLayout } from '@/shared/layouts/TwoColumnToastLayout';
import { ISolverOutput } from '@/subjects/mechanics-of-solids/cores/sfd-bmd/types';

export interface ISfdSlide {
  type: 'sfd-segment' | 'sfd-jump' | 'sfd-node-check';
  x?: number;
  startX?: number;
  endX?: number;
  vStart?: number;
  vEnd?: number;
  loadArea?: number;
  jump?: number;
  source?: string;
}

export const getSfdDegreeInfo = (
  startX: number,
  endX: number,
  intervals: ISolverOutput['intervals']
) => {
  const interval = intervals?.find(
    int => Math.abs(int.startX - startX) < 1e-3 && Math.abs(int.endX - endX) < 1e-3
  );
  if (!interval) return { degree: 0, label: 'horizontal (Degree 0)' };
  
  const [a, b] = interval.vCoeffs;
  if (Math.abs(a) > 1e-6) {
    return { degree: 2, label: 'quadratic parabolic curve (Degree 2)' };
  }
  if (Math.abs(b) > 1e-6) {
    return { degree: 1, label: 'sloped linear (Degree 1)' };
  }
  return { degree: 0, label: 'horizontal (Degree 0)' };
};

const buildSfdDrawText = (vStart: number, vEnd: number, label: string) => {
  const diff = Math.abs(vStart - vEnd);
  if (diff > 1e-6) {
    return (
      <span>
        Draw {label} shear line from <LatexFormula math={`V = ${vStart.toFixed(3)}\\text{ kN}`} /> to <LatexFormula math={`V = ${vEnd.toFixed(3)}\\text{ kN}`} />.
      </span>
    );
  }
  if (Math.abs(vStart) < 1e-3) {
    return (
      <span>
        Draw {label} shear line at <LatexFormula math="V = 0.000\text{ kN}" /> (no change).
      </span>
    );
  }
  return (
    <span>
      Draw {label} shear line at constant V = <LatexFormula math={`${vStart.toFixed(3)}\\text{ kN}`} /> (no change).
    </span>
  );
};

export const renderSfdJump = (
  activeStep: ISfdSlide,
  toastPosition: 'left' | 'right',
  diagram: React.ReactNode,
  clickIdx: number
) => {
  const isUpward = (activeStep.jump || 0) > 0;
  const term = activeStep.source === 'support' ? 'Support Reaction' : 'Point Load';
  const sign = isUpward ? '+' : '-';
  return (
    <TwoColumnToastLayout
      toastPosition={toastPosition}
      title={`SFD Jumps - Node at x = ${activeStep.x}m`}
      leftWidth="55%"
      leftContent={diagram}
      rightContent={
        <div className="flex flex-col gap-2.5 justify-center h-full text-left font-sans font-medium">
          <span className="text-[9px] font-bold text-rose-500 uppercase tracking-widest block font-mono">Node Jump Checkpoint</span>
          <h4 className="text-sm font-extrabold text-foreground font-sans">{term} Jump</h4>
          <div className="text-[11px] text-muted-foreground bg-muted/15 border border-border/30 rounded-xl p-2.5 space-y-2 select-text">
            <div>
              <span className="font-bold text-foreground block mb-0.5">1. Check Node Loads:</span>
              Concentrated force of <LatexFormula math={`${Math.abs(activeStep.jump || 0).toFixed(3)}\\text{ kN}`} /> acts {isUpward ? 'upward' : 'downward'}.
            </div>
            <ClickReveal at={1}>
              <div className="border-t border-border/25 pt-2">
                <span className="font-bold text-indigo-500 block mb-0.5 font-mono">2. Jump Calculation:</span>
                <LatexFormula math={`V(${activeStep.x}^+) = V(${activeStep.x}^-) ${sign} ${Math.abs(activeStep.jump || 0).toFixed(3)} = ${activeStep.vEnd?.toFixed(3)}\\text{ kN}`} />
              </div>
            </ClickReveal>
            <ClickReveal at={2}>
              <div className={`border-t border-border/25 pt-2 ${clickIdx >= 3 ? 'line-through text-muted-foreground/50 transition-all duration-300' : ''}`}>
                <span className={`font-bold block mb-0.5 ${clickIdx >= 3 ? 'text-muted-foreground/60' : 'text-foreground'}`}>3. Reference line & arrow:</span>
                Draw reference line at <LatexFormula math={`V=${activeStep.vStart?.toFixed(3)}`} />, show difference arrow of <LatexFormula math={`${sign}${Math.abs(activeStep.jump || 0).toFixed(3)}\\text{ kN}`} />.
              </div>
            </ClickReveal>
            <ClickReveal at={3}>
              <div className="border-t border-border/25 pt-2">
                <span className="font-bold text-foreground block mb-0.5">4. Draw Jump Line:</span>
                Draw vertical jump line from <LatexFormula math={`V = ${(activeStep.vStart || 0).toFixed(3)}\\text{ kN}`} /> to <LatexFormula math={`V = ${(activeStep.vEnd || 0).toFixed(3)}\\text{ kN}`} />.
              </div>
            </ClickReveal>
          </div>
        </div>
      }
    />
  );
};

export const renderSfdSegment = (
  activeStep: ISfdSlide,
  toastPosition: 'left' | 'right',
  diagram: React.ReactNode,
  clickIdx: number,
  intervals: ISolverOutput['intervals']
) => {
  const dx = (activeStep.endX || 0) - (activeStep.startX || 0);
  const isUnloaded = Math.abs(activeStep.loadArea || 0) < 1e-6;
  const w = isUnloaded ? 0 : Math.abs(activeStep.loadArea || 0) / dx;
  const { label } = getSfdDegreeInfo(activeStep.startX || 0, activeStep.endX || 0, intervals);

  return (
    <TwoColumnToastLayout
      toastPosition={toastPosition}
      title={`SFD Integration - Segment x in [${activeStep.startX}, ${activeStep.endX}]`}
      leftWidth="55%"
      leftContent={diagram}
      rightContent={
        <div className="flex flex-col gap-2.5 justify-center h-full text-left font-sans font-medium">
          <span className="text-[9px] font-bold text-rose-500 uppercase tracking-widest block font-mono">Segment Integration Checkpoint</span>
          <h4 className="text-sm font-extrabold text-foreground font-sans">{isUnloaded ? 'Shear over Unloaded Span' : 'Shear over Distributed Load'}</h4>
          <div className="text-[11px] text-muted-foreground bg-muted/15 border border-border/30 rounded-xl p-2.5 space-y-2 select-text font-sans">
            <div>
              <span className="font-bold text-foreground block mb-0.5">1. Check Segment Load:</span>
              External distributed load is <LatexFormula math={`w = ${w.toFixed(2)}\\text{ kN/m}`} />.
            </div>
            <ClickReveal at={1}>
              <div className="border-t border-border/25 pt-2">
                <span className="font-bold text-indigo-500 block mb-0.5 font-mono">2. Area Calculation (Change):</span>
                <LatexFormula math={`\\Delta V = \\int -w \\, dx = -${Math.abs(activeStep.loadArea || 0).toFixed(3)}\\text{ kN}`} />
              </div>
            </ClickReveal>
            <ClickReveal at={2}>
              <div className={`border-t border-border/25 pt-2 ${clickIdx >= 3 ? 'line-through text-muted-foreground/50 transition-all duration-300' : ''}`}>
                <span className={`font-bold block mb-0.5 ${clickIdx >= 3 ? 'text-muted-foreground/60' : 'text-foreground'}`}>3. Reference line & arrow:</span>
                Draw reference line at <LatexFormula math={`V=${activeStep.vStart?.toFixed(3)}`} />, difference arrow of <LatexFormula math={`-${Math.abs(activeStep.loadArea || 0).toFixed(3)}\\text{ kN}`} />.
              </div>
            </ClickReveal>
            <ClickReveal at={3}>
              <div className="border-t border-border/25 pt-2">
                <span className="font-bold text-foreground block mb-0.5">4. Draw Segment:</span>
                {buildSfdDrawText(activeStep.vStart || 0, activeStep.vEnd || 0, label)}
              </div>
            </ClickReveal>
          </div>
        </div>
      }
    />
  );
};

export const renderSfdNodeCheck = (
  activeStep: ISfdSlide,
  toastPosition: 'left' | 'right',
  diagram: React.ReactNode
) => {
  return (
    <TwoColumnToastLayout
      toastPosition={toastPosition}
      title={`SFD Checkpoint - Node at x = ${activeStep.x}m`}
      leftWidth="55%"
      leftContent={diagram}
      rightContent={
        <div className="flex flex-col gap-2.5 justify-center h-full text-left font-sans font-medium">
          <span className="text-[9px] font-bold text-rose-500 uppercase tracking-widest block font-mono">Node Checkpoint</span>
          <h4 className="text-sm font-extrabold text-foreground font-sans">Shear Force Value</h4>
          <div className="text-[11px] text-muted-foreground bg-muted/15 border border-border/30 rounded-xl p-2.5 space-y-2 select-text font-sans">
            <div>
              <span className="font-bold text-foreground block mb-0.5">1. Check Node Loads:</span>
              External concentrated point load at this node is zero.
            </div>
            <ClickReveal at={1}>
              <div className="border-t border-border/25 pt-2">
                <span className="font-bold text-indigo-500 block mb-0.5 font-mono">2. Continuity Calculation:</span>
                <LatexFormula math={`V(${activeStep.x}^+) = V(${activeStep.x}^-) = ${activeStep.vEnd?.toFixed(3)}\\text{ kN}`} />
              </div>
            </ClickReveal>
            <ClickReveal at={2}>
              <div className="border-t border-border/25 pt-2">
                <span className="font-bold text-foreground block mb-0.5">3. Action:</span>
                Keep value as is (no change).
              </div>
            </ClickReveal>
          </div>
        </div>
      }
    />
  );
};
