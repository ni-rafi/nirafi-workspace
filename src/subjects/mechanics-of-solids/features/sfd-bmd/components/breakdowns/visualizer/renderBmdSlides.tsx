import React from 'react';
import { ClickReveal, LatexFormula, ClickHighlight } from '@/features/presentation/components/elements';
import { TwoColumnToastLayout } from '@/shared/layouts/TwoColumnToastLayout';
import { IBeam, ISolverOutput, calculateSfdSegmentArea } from '@/subjects/mechanics-of-solids/cores/sfd-bmd';

export interface IBmdSlide {
  type: 'bmd-segment' | 'bmd-jump' | 'bmd-node-check';
  startX?: number;
  endX?: number;
  x?: number;
  vStart?: number;
  vEnd?: number;
  mStart?: number;
  mEnd?: number;
  shearArea?: number;
  jump?: number;
  source?: string;
  isPeakSplit?: 'first' | 'second';
  peakX?: number;
  peakM?: number;
}

export const getBmdDegreeInfo = (
  startX: number,
  endX: number,
  intervals: ISolverOutput['intervals']
) => {
  const interval = intervals?.find(
    int => startX >= int.startX - 1e-3 && endX <= int.endX + 1e-3
  );
  if (!interval) return { degree: 1, label: 'linear (Degree 1)' };

  const [a, b, c] = interval.mCoeffs;
  if (Math.abs(a) > 1e-6) {
    return { degree: 3, label: 'cubic curve (Degree 3)' };
  }
  if (Math.abs(b) > 1e-6) {
    return { degree: 2, label: 'parabolic curve (Degree 2)' };
  }
  if (Math.abs(c) > 1e-6) {
    return { degree: 1, label: 'linear (Degree 1)' };
  }
  return { degree: 0, label: 'constant (Degree 0)' };
};

const buildBmdDrawText = (mStart: number, mEnd: number, label: string) => {
  const diff = Math.abs(mStart - mEnd);
  if (diff > 1e-6) {
    return (
      <span>
        Draw {label} moment line from <LatexFormula math={`M = ${mStart.toFixed(3)}\\text{ kNm}`} /> to <LatexFormula math={`M = ${mEnd.toFixed(3)}\\text{ kNm}`} />.
      </span>
    );
  }
  if (Math.abs(mStart) < 1e-3) {
    return (
      <span>
        Draw {label} moment line at <LatexFormula math="M = 0.000\text{ kNm}" /> (no change).
      </span>
    );
  }
  return (
    <span>
      Draw {label} moment line at constant M = <LatexFormula math={`${mStart.toFixed(3)}\\text{ kNm}`} /> (no change).
    </span>
  );
};

export const renderBmdJump = (
  activeSlide: IBmdSlide,
  toastPosition: 'left' | 'right',
  diagram: React.ReactNode
) => {
  const isClockwise = (activeSlide.jump || 0) > 0;
  return (
    <TwoColumnToastLayout
      toastPosition={toastPosition}
      title={`BMD Jumps - Node at x = ${activeSlide.x}m`}
      leftWidth="55%"
      leftContent={diagram}
      rightContent={
        <div className="flex flex-col gap-2.5 justify-center h-full text-left font-sans font-medium">
          <span className="text-[9px] font-bold text-rose-500 uppercase tracking-widest block font-mono">BMD Node Checkpoint</span>
          <h4 className="text-sm font-extrabold text-foreground font-sans">Concentrated Moment Jump</h4>
          <div className="text-[11px] text-muted-foreground bg-muted/15 border border-border/30 rounded-xl p-2.5 space-y-2 select-text">
            <div>
              <span className="font-bold text-foreground block mb-0.5">1. Check Point Moments:</span>
              Concentrated moment of <LatexFormula math={`${Math.abs(activeSlide.jump || 0).toFixed(3)}\\text{ kNm}`} /> acts {isClockwise ? 'clockwise' : 'counter-clockwise'}.
            </div>
            <ClickReveal at={1}>
              <div className="border-t border-border/25 pt-2">
                <span className="font-bold text-indigo-500 block mb-0.5 font-mono">2. Moment Continuity:</span>
                <LatexFormula math={`M(${(activeSlide.x ?? 0).toFixed(2)}^+) = M(${(activeSlide.x ?? 0).toFixed(2)}^-) + \\Delta M = ${(activeSlide.mStart ?? 0).toFixed(3)} + ${(activeSlide.jump ?? 0).toFixed(3)} = ${(activeSlide.mEnd ?? 0).toFixed(3)}\\text{ kNm}`} />
              </div>
            </ClickReveal>
          </div>
        </div>
      }
    />
  );
};

export const renderBmdSegment = (
  activeSlide: IBmdSlide,
  toastPosition: 'left' | 'right',
  diagram: React.ReactNode,
  peakX: number,
  clickIdx: number,
  intervals: ISolverOutput['intervals'],
  beam: IBeam
) => {
  const isPeakFirst = activeSlide.isPeakSplit === 'first';
  const isPeakSecond = activeSlide.isPeakSplit === 'second';

  let heading = 'Bending Moment Integration';
  if (isPeakFirst) heading = 'Integrating to Peak Moment';
  else if (isPeakSecond) heading = 'Integrating from Peak Moment';

  const startX = activeSlide.startX ?? 0;
  const endX = activeSlide.endX ?? 0;
  const midX = (startX + endX) / 2;

  let step1Desc = `Analyze SFD area over segment x = [${startX.toFixed(2)}m, ${endX.toFixed(2)}m].`;
  if (isPeakFirst) step1Desc = `Analyze positive shear area between x = ${startX.toFixed(2)}m and zero-shear crossing point (${peakX.toFixed(3)}m).`;
  else if (isPeakSecond) step1Desc = `Analyze negative shear area between zero-shear crossing point (${peakX.toFixed(3)}m) and x = ${endX.toFixed(2)}m.`;

  const activeUdl = beam.loads.find(
    l => l.type === 'udl' &&
      midX >= (l.startPosition ?? 0) &&
      midX <= (l.endPosition ?? 0)
  );

  const activeUvl = beam.loads.find(
    l => l.type === 'uvl' &&
      midX >= (l.startPosition ?? 0) &&
      midX <= (l.endPosition ?? 0)
  );

  const { degree, label } = getBmdDegreeInfo(startX, endX, intervals);
  const activeLoad = activeUdl || activeUvl;
  let finalLabel = label;
  let isDownward = true;

  if (activeLoad) {
    const mag = activeLoad.type === 'udl'
      ? (activeLoad.magnitude ?? 0)
      : Math.max(Math.abs(activeLoad.startMagnitude ?? 0), Math.abs(activeLoad.endMagnitude ?? 0));
    isDownward = mag >= 0; // standard conventions treat downward load magnitudes positive
  }

  if (degree >= 2 && activeLoad) {
    finalLabel = `${label.split(' (')[0]} (Degree ${degree}, ${isDownward ? 'concave down' : 'concave up'})`;
  }

  const vStart = activeSlide.vStart ?? 0;
  const vEnd = activeSlide.vEnd ?? 0;

  const hasVertexAtStart = activeUvl && (activeUvl.startMagnitude === 0) && (Math.abs(startX - (activeUvl.startPosition ?? 0)) < 1e-3);
  const hasVertexAtEnd = activeUvl && (activeUvl.endMagnitude === 0) && (Math.abs(endX - (activeUvl.endPosition ?? 0)) < 1e-3);

  const areaResult = calculateSfdSegmentArea(
    isPeakSecond ? peakX : startX,
    isPeakFirst ? peakX : endX,
    vStart,
    vEnd,
    intervals,
    activeSlide.isPeakSplit,
    peakX,
    hasVertexAtStart,
    hasVertexAtEnd
  );

  const { formulaLatex, calcLatex, noteText } = areaResult;

  return (
    <TwoColumnToastLayout
      toastPosition={toastPosition}
      title={`BMD Integration - Segment x in [${activeSlide.startX?.toFixed(2)}, ${activeSlide.endX?.toFixed(2)}]`}
      leftWidth="55%"
      leftContent={diagram}
      rightContent={
        <div className="flex flex-col gap-2.5 justify-center h-full text-left font-sans font-medium">
          <span className="text-[9px] font-bold text-indigo-500 uppercase tracking-widest block font-mono animate-in fade-in">Segment Integration Checkpoint</span>
          <h4 className="text-sm font-extrabold text-foreground font-sans">{heading}</h4>
          <div className="text-[11px] text-muted-foreground bg-muted/15 border border-border/30 rounded-xl p-2.5 space-y-2 select-text font-sans">
            <div>
              <span className="font-bold text-foreground block mb-0.5">1. Check Shear Area:</span>
              {step1Desc}
            </div>
            <ClickReveal at={1}>
              <div className="border-t border-border/25 pt-2">
                <span className="font-bold text-indigo-500 block mb-0.5 font-mono">2. Calculate Area (Change):</span>
                <div className="space-y-1 mt-1 text-muted-foreground font-medium text-[11px]">
                  <div>
                    <span className="text-foreground/80 font-bold">Formula:</span> <LatexFormula math={formulaLatex} />
                  </div>
                  <div>
                    <span className="text-foreground/80 font-bold">Solve:</span>{' '}
                    {Math.abs(areaResult.area) > 1e-3 ? (
                      <ClickHighlight variant="paint" at={1} className="inline-block">
                        <LatexFormula math={calcLatex} />
                      </ClickHighlight>
                    ) : (
                      <LatexFormula math={calcLatex} />
                    )}
                  </div>
                </div>
              </div>
            </ClickReveal>
            <ClickReveal at={2}>
              <div className={`border-t border-border/25 pt-2 ${clickIdx >= 3 ? 'text-muted-foreground/40 transition-all duration-300' : ''}`}>
                <span className={`font-bold block mb-0.5 ${clickIdx >= 3 ? 'text-muted-foreground/40' : 'text-foreground'}`}>3. Reference line & arrow:</span>
                Draw reference line at <LatexFormula math={`${activeSlide.mStart?.toFixed(3)}\\text{ kNm}`} />, show difference arrow of <LatexFormula math={`${(activeSlide.shearArea ?? 0) >= 0 ? '+' : ''}${(activeSlide.shearArea ?? 0).toFixed(3)}\\text{ kNm}`} />.
              </div>
            </ClickReveal>
            <ClickReveal at={3}>
              <div className="border-t border-border/25 pt-2">
                <span className="font-bold text-foreground block mb-0.5">4. Draw Segment:</span>
                {buildBmdDrawText(activeSlide.mStart || 0, activeSlide.mEnd || 0, finalLabel)}
                {degree >= 2 && (
                  <div className="text-[10px] text-muted-foreground mt-1 flex flex-col gap-0.5 font-sans font-medium leading-relaxed">
                    <div>
                      • <span className="font-bold text-foreground/80">Concavity:</span> Since the load is {isDownward ? 'downward' : 'upward'}, the moment curve is <span className="font-bold text-indigo-500">{isDownward ? 'concave down' : 'concave up'}</span>.
                    </div>
                    <div>
                      • <span className="font-bold text-foreground/80">Slope:</span> The slope <ClickHighlight variant="paint" at={3} className="inline-block">magnitude {Math.abs(vEnd) < Math.abs(vStart) ? 'decreases' : 'increases'}</ClickHighlight> from <LatexFormula math={`${Math.abs(vStart).toFixed(3)}`} /> to <LatexFormula math={`${Math.abs(vEnd).toFixed(3)}`} />.
                    </div>
                  </div>
                )}
              </div>
            </ClickReveal>
            {noteText && (
              <div className="border-t border-border/25 pt-1.5 text-[9.5px] font-bold text-indigo-500/90 leading-normal">
                {noteText}
              </div>
            )}
          </div>
        </div>
      }
    />
  );
};

export const renderBmdNodeCheck = (
  activeSlide: IBmdSlide,
  toastPosition: 'left' | 'right',
  diagram: React.ReactNode,
  peakX: number
) => {
  const isPeak = activeSlide.x !== undefined && Math.abs(activeSlide.x - peakX) < 1e-2;
  return (
    <TwoColumnToastLayout
      toastPosition={toastPosition}
      title={isPeak ? `BMD Checkpoint - Peak Moment` : `BMD Checkpoint - Node at x = ${activeSlide.x}m`}
      leftWidth="55%"
      leftContent={diagram}
      rightContent={
        <div className="flex flex-col gap-2.5 justify-center h-full text-left font-sans font-medium">
          <span className="text-[9px] font-bold text-indigo-500 uppercase tracking-widest block font-mono">Node Checkpoint</span>
          <h4 className="text-sm font-extrabold text-foreground font-sans">{isPeak ? 'Peak Moment Value' : 'Bending Moment Value'}</h4>
          <div className="text-[11px] text-muted-foreground bg-muted/15 border border-border/30 rounded-xl p-2.5 space-y-2 select-text font-sans">
            <div>
              <span className="font-bold text-foreground block mb-0.5">{isPeak ? 'Maximum moment at crossing point:' : 'Moment at this boundary:'}</span>
              External concentrated moment at this node is zero.
            </div>
            <ClickReveal at={1}>
              <div className="border-t border-border/25 pt-2">
                <span className="font-bold text-indigo-500 block mb-0.5 font-mono">2. Moment Continuity:</span>
                <LatexFormula math={`M(${activeSlide.x?.toFixed(3)}\\text{ m}) = ${activeSlide.mEnd?.toFixed(3)}\\text{ kNm}`} />
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

export { renderPedagogicalCircle } from './renderPedagogicalCircle';
export { renderPedagogicalApplication } from './renderPedagogicalApplication';
