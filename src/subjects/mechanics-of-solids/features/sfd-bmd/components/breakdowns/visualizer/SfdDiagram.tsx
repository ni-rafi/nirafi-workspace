import React from 'react';
import { motion } from 'motion/react';
import { getSvgX } from './diagramConstants';
import { IBeam, ISolverOutput } from '@/subjects/mechanics-of-solids/cores/sfd-bmd/types';

const getCircleClass = (step: number, currentStep: number, baseClass: string) => {
  return `${baseClass} ${step === currentStep ? 'animate-in zoom-in-50 duration-200' : ''}`;
};

interface SfdDiagramProps {
  sfdY: number;
  sfdScale: number;
  pairing: 'beam' | 'beam-sfd' | 'sfd-bmd' | 'all';
  stepIndex: number;
  displayedStep: number;
  clickIdx: number;
  beam: IBeam;
  solverResult: ISolverOutput;
}

export const SfdDiagram: React.FC<SfdDiagramProps> = ({
  sfdY,
  sfdScale,
  pairing,
  stepIndex,
  displayedStep,
  clickIdx,
  beam,
  solverResult,
}) => {
  const showSfd = pairing === 'beam-sfd' || pairing === 'sfd-bmd' || pairing === 'all';
  if (!showSfd) return null;

  const sfdSteps = (solverResult.graphicalStepsData || []).filter(s => s.type.startsWith('sfd-'));
  if (sfdSteps.length <= 1) return null; // No steps resolved

  const sfdSlides: {
    type: 'sfd-segment' | 'sfd-jump' | 'sfd-node-check';
    x?: number;
    startX?: number;
    endX?: number;
    vStart?: number;
    vEnd?: number;
    loadArea?: number;
    jump?: number;
    source?: string;
    vCoeffs?: [number, number, number];
  }[] = [];

  sfdSteps.forEach((step, idx) => {
    if (step.type === 'sfd-start') return;
    if (step.type === 'sfd-jump') {
      sfdSlides.push({
        type: 'sfd-jump',
        x: step.x,
        vStart: step.vStart,
        vEnd: step.vEnd,
        jump: step.jump,
        source: step.source,
      });
    } else if (step.type === 'sfd-segment') {
      sfdSlides.push({
        type: 'sfd-segment',
        startX: step.startX,
        endX: step.endX,
        vStart: step.vStart,
        vEnd: step.vEnd,
        loadArea: step.loadArea,
        vCoeffs: step.vCoeffs,
      });
      
      // Check if there is a jump at endX
      const nextStep = sfdSteps[idx + 1];
      const hasJumpAtEnd = nextStep && nextStep.type === 'sfd-jump' && Math.abs((nextStep.x || 0) - (step.endX || 0)) < 1e-3;
      if (!hasJumpAtEnd && step.endX !== undefined && step.endX < beam.length - 1e-3) {
        sfdSlides.push({
          type: 'sfd-node-check',
          x: step.endX,
          vEnd: step.vEnd,
        });
      }
    }
  });

  // Helper function to draw reference lines + orange difference arrows
  const renderHelperVisuals = (
    stepCond: boolean,
    opacity: number,
    refY1: number,
    refY2: number,
    xRefStart: number,
    xRefEnd: number,
    arrowX: number,
    arrowYStart: number,
    arrowYEnd: number,
    diffValue?: string
  ) => {
    if (!stepCond) return null;
    const midY = (arrowYStart + arrowYEnd) / 2;
    const textX = getSvgX(arrowX, beam.length) + (arrowX > beam.length * 0.75 ? -6 : 6);
    const textAnchor = arrowX > beam.length * 0.75 ? 'end' : 'start';

    return (
      <g style={{ opacity }}>
        <line
          x1={getSvgX(xRefStart, beam.length)}
          y1={refY1}
          x2={getSvgX(xRefEnd, beam.length)}
          y2={refY2}
          className="stroke-amber-500/70"
          strokeWidth="1.2"
          strokeDasharray="2 2"
        />
        {arrowYStart !== arrowYEnd && (
          <g>
            <line
              x1={getSvgX(arrowX, beam.length)}
              y1={arrowYStart}
              x2={getSvgX(arrowX, beam.length)}
              y2={arrowYEnd}
              className="stroke-amber-500 animate-in fade-in duration-200"
              strokeWidth="1.8"
              markerEnd="url(#arrow)"
            />
            {diffValue && (
              <text
                x={textX}
                y={midY + 3}
                textAnchor={textAnchor}
                className="text-[7.5px] font-black fill-amber-500 font-mono animate-in fade-in"
              >
                {diffValue}
              </text>
            )}
          </g>
        )}
      </g>
    );
  };

  // Integration highlight area on SFD dynamically
  let shadeSource: React.ReactNode = null;
  if (pairing === 'sfd-bmd' && solverResult.graphicalStepsData) {
    // Locate the active BMD step segment
    const bmdSteps = solverResult.graphicalStepsData.filter(s => s.type.startsWith('bmd-'));
    // Replicate visualStepsBuilder's bmdSlides sequence index-for-index
    const bmdSlides: { type: string; startX?: number; endX?: number; x?: number; vStart?: number; vEnd?: number; isPeakSplit?: 'first' | 'second' }[] = [];

    // Find crossing
    const crossingSegment = sfdSteps.find(s => s.type === 'sfd-segment' && (s.vStart || 0) * (s.vEnd || 0) < 0);
    let peakX = 0;
    if (crossingSegment) {
      const v1 = Math.abs(crossingSegment.vStart || 0);
      const v2 = Math.abs(crossingSegment.vEnd || 0);
      const L_seg = (crossingSegment.endX || 0) - (crossingSegment.startX || 0);
      const x0 = (v1 * L_seg) / (v1 + v2);
      peakX = (crossingSegment.startX || 0) + x0;
    }

    // Step 14 is always the start node check at x = 0
    bmdSlides.push({
      type: 'bmd-node-check',
      x: 0,
      vEnd: 0,
    });

    bmdSteps.forEach((step, idx) => {
      if (step.type === 'bmd-start') return;
      if (step.type === 'bmd-jump') {
        bmdSlides.push({
          type: 'bmd-jump',
          x: step.x,
          vEnd: 0,
        });
      } else if (step.type === 'bmd-segment') {
        const sX = step.startX || 0;
        const eX = step.endX || 0;
        const matchingSfd = sfdSteps.find(s => s.type === 'sfd-segment' && s.startX === sX && s.endX === eX);

        if (crossingSegment && peakX > sX + 1e-2 && peakX < eX - 1e-2) {
          // Split!
          bmdSlides.push({
            type: 'bmd-segment',
            startX: sX,
            endX: peakX,
            vStart: matchingSfd?.vStart || 0,
            vEnd: 0,
            isPeakSplit: 'first'
          });
          bmdSlides.push({
            type: 'bmd-node-check',
            x: peakX,
            vEnd: 0,
          });
          bmdSlides.push({
            type: 'bmd-segment',
            startX: peakX,
            endX: eX,
            vStart: 0,
            vEnd: matchingSfd?.vEnd || 0,
            isPeakSplit: 'second'
          });
        } else {
          bmdSlides.push({
            type: 'bmd-segment',
            startX: sX,
            endX: eX,
            vStart: matchingSfd?.vStart || 0,
            vEnd: matchingSfd?.vEnd || 0
          });
        }

        const nextStep = bmdSteps[idx + 1];
        const hasJumpAtEnd = nextStep && nextStep.type === 'bmd-jump' && Math.abs((nextStep.x || 0) - eX) < 1e-3;
        if (!hasJumpAtEnd && eX < beam.length - 1e-3) {
          bmdSlides.push({
            type: 'bmd-node-check',
            x: eX,
            vEnd: matchingSfd?.vEnd || 0,
          });
        }
      }
    });

    bmdSlides.push({
      type: 'bmd-node-check',
      x: beam.length,
      vEnd: 0,
    });

    const activeBmdSlide = bmdSlides[stepIndex - 14];
    if (activeBmdSlide && activeBmdSlide.type === 'bmd-segment' && clickIdx >= 0) {
      const sX = getSvgX(activeBmdSlide.startX || 0, beam.length);
      const eX = getSvgX(activeBmdSlide.endX || 0, beam.length);
      const dx = (activeBmdSlide.endX || 0) - (activeBmdSlide.startX || 0);
      const vStart = activeBmdSlide.vStart || 0;
      const vEnd = activeBmdSlide.vEnd || 0;

      // Draw polygon representation of the shear area
      const pts = `${sX},${sfdY} ${sX},${sfdY - vStart * sfdScale} ${eX},${sfdY - vEnd * sfdScale} ${eX},${sfdY}`;
      const isPositive = vStart >= -1e-6 && vEnd >= -1e-6;
      const colorClass = "fill-fuchsia-500/20 stroke-fuchsia-500/20";
      const textColorClass = "fill-fuchsia-600 dark:fill-fuchsia-400";

      // Label positioning
      const textX = (sX + eX) / 2;
      const maxVal = Math.max(Math.abs(vStart), Math.abs(vEnd));
      const textY = isPositive
        ? sfdY - maxVal * sfdScale - 8
        : sfdY + maxVal * sfdScale + 16;

      shadeSource = (
        <g>
          <polygon points={pts} className={`${colorClass} animate-in fade-in duration-300`} />
          {clickIdx >= 1 && (
            <text x={textX} y={textY} textAnchor="middle" className={`text-[7px] font-black font-mono ${textColorClass} animate-in fade-in`}>
              V = {Math.abs(vStart || vEnd).toFixed(3)}, L = {dx.toFixed(3)}m
            </text>
          )}
        </g>
      );
    }
  }

  // Generate dynamic path strings for final path overlay
  let dPath = `M ${getSvgX(0, beam.length)} ${sfdY}`;
  sfdSteps.slice(1).forEach(step => {
    const x = step.x ?? step.endX ?? step.startX ?? 0;
    const xPos = getSvgX(x, beam.length);
    if (step.type === 'sfd-jump') {
      dPath += ` L ${xPos} ${sfdY - (step.vStart || 0) * sfdScale} L ${xPos} ${sfdY - (step.vEnd || 0) * sfdScale}`;
    } else if (step.type === 'sfd-segment') {
      const sX = getSvgX(step.startX || 0, beam.length);
      const eX = getSvgX(step.endX || 0, beam.length);
      dPath += ` L ${sX} ${sfdY - (step.vStart || 0) * sfdScale} L ${eX} ${sfdY - (step.vEnd || 0) * sfdScale}`;
    }
  });
  dPath += ` L ${getSvgX(beam.length, beam.length)} ${sfdY}`;

  // Centralized deduplicated node labels to prevent overlaps/shadows
  const plottedSfdLabels: { x: number; val: number }[] = [];
  sfdSlides.forEach((slide, idx) => {
    const stepNum = idx + 3;
    if (displayedStep < stepNum) return;
    const isCurrent = displayedStep === stepNum;

    if (slide.type === 'sfd-jump') {
      if (isCurrent && clickIdx < 3) return;
      if (slide.vStart !== undefined && Math.abs(slide.vStart) >= 1e-2) {
        plottedSfdLabels.push({ x: slide.x ?? 0, val: slide.vStart });
      }
      if (slide.vEnd !== undefined && Math.abs(slide.vEnd) >= 1e-2) {
        plottedSfdLabels.push({ x: slide.x ?? 0, val: slide.vEnd });
      }
    } else if (slide.type === 'sfd-segment') {
      if (isCurrent && clickIdx < 3) return;
      if (slide.vEnd !== undefined && Math.abs(slide.vEnd) >= 1e-2) {
        plottedSfdLabels.push({ x: slide.endX ?? 0, val: slide.vEnd });
      }
    } else if (slide.type === 'sfd-node-check') {
      if (isCurrent && clickIdx < 2) return;
      if (slide.vEnd !== undefined && Math.abs(slide.vEnd) >= 1e-2) {
        plottedSfdLabels.push({ x: slide.x ?? 0, val: slide.vEnd });
      }
    }
  });

  const uniqueSfdLabels: typeof plottedSfdLabels = [];
  plottedSfdLabels.forEach(item => {
    const exists = uniqueSfdLabels.some(
      u => Math.abs(u.x - item.x) < 1e-3 && Math.abs(u.val - item.val) < 1e-3
    );
    if (!exists) {
      uniqueSfdLabels.push(item);
    }
  });

  return (
    <g>
      {/* Baseline */}
      <line x1="30" y1={sfdY} x2="470" y2={sfdY} className="stroke-slate-400/60 dark:stroke-slate-650" strokeWidth="1.2" />
      <text x="473" y={sfdY + 3} className="text-[8px] font-bold fill-muted-foreground font-mono">x</text>
      <text x="45" y={sfdY - 26} textAnchor="end" className="text-[8px] font-black fill-rose-500 font-mono">V (kN)</text>

      {pairing === 'sfd-bmd' && shadeSource}

      {/* Dynamic Step-by-Step SFD drawing */}
      {sfdSlides.map((slide, idx) => {
        const stepNum = idx + 3; // sfd-jump at A is step 3
        if (displayedStep < stepNum) return null;

        const isCurrent = displayedStep === stepNum;

        if (slide.type === 'sfd-jump') {
          const x = slide.x ?? 0;
          const xPos = getSvgX(x, beam.length);
          const yStart = sfdY - (slide.vStart || 0) * sfdScale;
          const yEnd = sfdY - (slide.vEnd || 0) * sfdScale;
          const isUpward = (slide.jump || 0) > 0;
          const sign = isUpward ? '+' : '-';
          return (
            <g key={idx}>
              {((isCurrent && clickIdx >= 3) || !isCurrent) && (
                <>
                  <circle cx={xPos} cy={yStart} r="3" className={getCircleClass(stepNum, displayedStep, "fill-rose-500 stroke-white dark:stroke-slate-900")} strokeWidth="1" />
                  <circle cx={xPos} cy={yEnd} r="3" className={getCircleClass(stepNum, displayedStep, "fill-rose-500 stroke-white dark:stroke-slate-900")} strokeWidth="1" />
                </>
              )}
              {renderHelperVisuals(
                stepIndex === stepNum && clickIdx === 2,
                1,
                yStart,
                yStart,
                x - 0.5,
                x + 0.5,
                x,
                yStart,
                yEnd,
                `${sign}${Math.abs(slide.jump || 0).toFixed(3)} kN`
              )}
              {!isCurrent ? (
                <line x1={xPos} y1={yStart} x2={xPos} y2={yEnd} className="stroke-rose-500" strokeWidth="2" />
              ) : clickIdx >= 3 ? (
                <motion.line
                  x1={xPos}
                  y1={yStart}
                  x2={xPos}
                  y2={yEnd}
                  className="stroke-rose-500"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              ) : null}
            </g>
          );
        }

        if (slide.type === 'sfd-segment') {
          const sX = getSvgX(slide.startX || 0, beam.length);
          const eX = getSvgX(slide.endX || 0, beam.length);
          const yStart = sfdY - (slide.vStart || 0) * sfdScale;
          const yEnd = sfdY - (slide.vEnd || 0) * sfdScale;
          const isZeroCrossing = (slide.vStart || 0) * (slide.vEnd || 0) < 0;

          return (
            <g key={idx}>
              {((isCurrent && clickIdx >= 3) || !isCurrent) && (
                <circle cx={eX} cy={yEnd} r="3" className={getCircleClass(stepNum, displayedStep, "fill-rose-500 stroke-white dark:stroke-slate-900")} strokeWidth="1" />
              )}
              {renderHelperVisuals(
                stepIndex === stepNum && clickIdx === 2,
                1,
                yStart,
                yStart,
                slide.startX || 0,
                slide.endX || 0,
                slide.endX || 0,
                yStart,
                yEnd,
                `-${Math.abs(slide.loadArea || 0).toFixed(3)} kN`
              )}
              {!isCurrent ? (
                <line x1={sX} y1={yStart} x2={eX} y2={yEnd} className="stroke-rose-500" strokeWidth="2" />
              ) : clickIdx >= 3 ? (
                <motion.line
                  x1={sX}
                  y1={yStart}
                  x2={eX}
                  y2={yEnd}
                  className="stroke-rose-500"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              ) : null}

              {/* Zero-shear point dynamic display */}
              {isZeroCrossing && (displayedStep > stepNum || (isCurrent && clickIdx >= 3) || stepIndex >= 12) && (() => {
                const v1 = Math.abs(slide.vStart || 0);
                const v2 = Math.abs(slide.vEnd || 0);
                const dx = (slide.endX || 0) - (slide.startX || 0);
                const x0 = (v1 * dx) / (v1 + v2);
                const crossX = (slide.startX || 0) + x0;
                return (
                  <g className="animate-in fade-in" key="crossing">
                    <circle cx={getSvgX(crossX, beam.length)} cy={sfdY} r="2" className="fill-rose-500 animate-pulse" />
                    <text x={getSvgX(crossX, beam.length)} y={sfdY + 12} textAnchor="middle" className="text-[7.5px] font-black fill-rose-500 font-mono">
                      x_0 = {crossX.toFixed(3)}m
                    </text>
                  </g>
                );
              })()}
            </g>
          );
        }

        if (slide.type === 'sfd-node-check') {
          const xPos = getSvgX(slide.x || 0, beam.length);
          const yEnd = sfdY - (slide.vEnd || 0) * sfdScale;
          return (
            <g key={idx}>
              {((isCurrent && clickIdx >= 2) || !isCurrent) && (
                <circle cx={xPos} cy={yEnd} r="3" className={getCircleClass(stepNum, displayedStep, "fill-rose-500 stroke-white dark:stroke-slate-900")} strokeWidth="1" />
              )}
            </g>
          );
        }

        return null;
      })}

      {/* SFD Final Path Overlay (Static Path) */}
      {(displayedStep > 11 || pairing === 'sfd-bmd' || pairing === 'all') && (
        <path
          d={dPath}
          fill="none"
          className="stroke-rose-500/80"
          strokeWidth="1.6"
        />
      )}

      {/* Unified deduplicated boundary labels */}
      {uniqueSfdLabels.map((lbl, idx) => {
        const xPos = getSvgX(lbl.x, beam.length);
        const yPos = sfdY - lbl.val * sfdScale + (lbl.val > 0 ? -5 : 11);
        const anchor = lbl.x === beam.length ? 'end' : lbl.x === 0 ? 'start' : 'middle';

        return (
          <text
            key={idx}
            x={xPos}
            y={yPos}
            textAnchor={anchor}
            className="text-[7.5px] font-bold fill-rose-500/90 font-mono animate-in fade-in duration-200"
          >
            {lbl.val > 0 ? `+${lbl.val.toFixed(3)}` : lbl.val.toFixed(3)}
          </text>
        );
      })}
    </g>
  );
};
