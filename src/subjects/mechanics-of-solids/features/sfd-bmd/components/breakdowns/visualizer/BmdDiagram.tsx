import React from 'react';
import { motion } from 'motion/react';
import { getSvgX, getBmdCurvePoints } from './diagramConstants';
import { IBeam, ISolverOutput } from '@/subjects/mechanics-of-solids/cores/sfd-bmd/types';
import { DimensionLine } from '@/features/presentation/components/elements';

const getCircleClass = (step: number, currentStep: number, baseClass: string) => {
  return `${baseClass} ${step === currentStep ? 'animate-in zoom-in-50 duration-200' : ''}`;
};

function getBmdStepNum(idx: number): number {
  if (idx <= 3) return idx + 19;
  return idx + 21;
}

function getConcaveUpCurvePoints(
  startX: number,
  endX: number,
  bmdY: number,
  bmdScale: number,
  beamLength: number,
  mStart: number,
  mEnd: number
): string {
  const steps = 30;
  const dx = (endX - startX) / steps;
  const points: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const x = startX + i * dx;
    const m = mStart + (mEnd - mStart) * Math.pow((x - startX) / (endX - startX), 2);
    const px = getSvgX(x, beamLength);
    const py = bmdY - m * bmdScale;
    points.push(`${px},${py}`);
  }
  return points.join(' ');
}

interface BmdDiagramProps {
  bmdY: number;
  bmdScale: number;
  pairing: 'beam' | 'beam-sfd' | 'sfd-bmd' | 'all';
  stepIndex: number;
  displayedStep: number;
  clickIdx: number;
  beam: IBeam;
  solverResult: ISolverOutput;
}

export const BmdDiagram: React.FC<BmdDiagramProps> = ({
  bmdY,
  bmdScale,
  pairing,
  stepIndex,
  displayedStep,
  clickIdx,
  beam,
  solverResult,
}) => {
  const showBmd = pairing === 'sfd-bmd' || pairing === 'all';
  if (!showBmd) return null;

  const bmdSteps = (solverResult.graphicalStepsData || []).filter(s => s.type.startsWith('bmd-'));
  if (bmdSteps.length <= 1) return null; // No steps resolved

  // Find the peak bending moment value from critical points to position labels correctly
  const maxMomentPoint = solverResult.criticalPoints.reduce(
    (max, cp) => Math.abs(cp.m) > Math.abs(max.m) ? cp : max,
    { m: 0 }
  );
  const maxMomentVal = maxMomentPoint.m;

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

  // Build the array of BMD slides dynamically
  const bmdSlides: {
    type: 'bmd-segment' | 'bmd-jump' | 'bmd-node-check';
    startX?: number;
    endX?: number;
    x?: number;
    mStart?: number;
    mEnd?: number;
    shearArea?: number;
    jump?: number;
    isPeakSplit?: 'first' | 'second';
    peakX?: number;
    peakM?: number;
  }[] = [];

  // Push initial boundary check at x=0
  bmdSlides.push({
    type: 'bmd-node-check',
    x: 0,
    mEnd: 0,
  });

  // Auto-discover zero shear crossing from SFD steps
  const sfdSteps = (solverResult.graphicalStepsData || []).filter(s => s.type.startsWith('sfd-'));
  const crossingSegment = sfdSteps.find(s => s.type === 'sfd-segment' && (s.vStart || 0) * (s.vEnd || 0) < 0);
  let peakX = 0;
  let peakM = 0;
  if (crossingSegment) {
    const sX = crossingSegment.startX || 0;
    const eX = crossingSegment.endX || 0;
    const exactCP = solverResult.criticalPoints.find(
      cp => cp.x > sX + 1e-3 && cp.x < eX - 1e-3 && cp.isLocalMaxMinM
    );
    if (exactCP) {
      peakX = exactCP.x;
      peakM = exactCP.m;
    } else {
      const v1 = Math.abs(crossingSegment.vStart || 0);
      const v2 = Math.abs(crossingSegment.vEnd || 0);
      const L_seg = eX - sX;
      const x0 = (v1 * L_seg) / (v1 + v2);
      peakX = sX + x0;
      peakM = solverResult.criticalPoints.find(cp => Math.abs(cp.x - peakX) < 1e-2)?.m || 0;
    }
  }

  bmdSteps.forEach((step, idx) => {
    if (step.type === 'bmd-start') return;
    if (step.type === 'bmd-jump') {
      bmdSlides.push({
        type: 'bmd-jump',
        x: step.x,
        mStart: step.mStart,
        mEnd: step.mEnd,
        jump: step.jump,
      });
    } else if (step.type === 'bmd-segment') {
      const sX = step.startX || 0;
      const eX = step.endX || 0;
      if (crossingSegment && peakX > sX + 1e-2 && peakX < eX - 1e-2) {
        bmdSlides.push({
          type: 'bmd-segment',
          startX: sX,
          endX: peakX,
          mStart: step.mStart,
          mEnd: peakM,
          shearArea: peakM - (step.mStart || 0),
          isPeakSplit: 'first',
          peakX,
          peakM,
        });
        bmdSlides.push({
          type: 'bmd-node-check',
          x: peakX,
          mEnd: peakM,
        });
        bmdSlides.push({
          type: 'bmd-segment',
          startX: peakX,
          endX: eX,
          mStart: peakM,
          mEnd: step.mEnd,
          shearArea: (step.mEnd || 0) - peakM,
          isPeakSplit: 'second',
          peakX,
          peakM,
        });
      } else {
        bmdSlides.push({
          type: 'bmd-segment',
          startX: sX,
          endX: eX,
          mStart: step.mStart,
          mEnd: step.mEnd,
          shearArea: step.shearArea,
        });
      }

      // Check if there is a jump at endX
      const nextStep = bmdSteps[idx + 1];
      const hasJumpAtEnd = nextStep && nextStep.type === 'bmd-jump' && Math.abs((nextStep.x || 0) - eX) < 1e-3;
      if (!hasJumpAtEnd && eX < beam.length - 1e-3) {
        bmdSlides.push({
          type: 'bmd-node-check',
          x: eX,
          mEnd: step.mEnd,
        });
      }
    }
  });

  // Finally, push the last boundary node check at the end of the beam (e.g. Node B Check)
  bmdSlides.push({
    type: 'bmd-node-check',
    x: beam.length,
    mEnd: bmdSlides[bmdSlides.length - 1]?.mEnd || 0,
  });

  // Centralized deduplicated node labels to prevent overlaps/shadows
  const plottedBmdLabels: { x: number; val: number }[] = [];
  bmdSlides.forEach((slide, idx) => {
    const stepNum = getBmdStepNum(idx);
    if (displayedStep < stepNum) return;
    const isCurrent = displayedStep === stepNum;

    if (slide.type === 'bmd-jump') {
      if (isCurrent && clickIdx < 3) return;
      if (slide.mStart !== undefined && Math.abs(slide.mStart) >= 1e-2) {
        plottedBmdLabels.push({ x: slide.x ?? 0, val: slide.mStart });
      }
      if (slide.mEnd !== undefined && Math.abs(slide.mEnd) >= 1e-2) {
        plottedBmdLabels.push({ x: slide.x ?? 0, val: slide.mEnd });
      }
    } else if (slide.type === 'bmd-segment') {
      if (isCurrent && clickIdx < 3) return;
      if (slide.mEnd !== undefined && Math.abs(slide.mEnd) >= 1e-2) {
        plottedBmdLabels.push({ x: slide.endX ?? 0, val: slide.mEnd });
      }
    } else if (slide.type === 'bmd-node-check') {
      if (isCurrent && clickIdx < 2) return;
      if (slide.mEnd !== undefined && Math.abs(slide.mEnd) >= 1e-2) {
        plottedBmdLabels.push({ x: slide.x ?? 0, val: slide.mEnd });
      }
    }
  });

  const uniqueBmdLabels: typeof plottedBmdLabels = [];
  plottedBmdLabels.forEach(item => {
    const exists = uniqueBmdLabels.some(
      u => Math.abs(u.x - item.x) < 1e-3 && Math.abs(u.val - item.val) < 1e-3
    );
    if (!exists) {
      uniqueBmdLabels.push(item);
    }
  });

  return (
    <g>
      {/* Baseline */}
      <line x1="30" y1={bmdY} x2="470" y2={bmdY} className="stroke-slate-400/60 dark:stroke-slate-650" strokeWidth="1.2" />
      <text x="473" y={bmdY + 3} className="text-[8px] font-bold fill-muted-foreground font-mono">x</text>
      <text x="45" y={bmdY - 26} textAnchor="end" className="text-[8px] font-black fill-indigo-500 font-mono">M (kNm)</text>

      {/* Dynamic Step-by-Step BMD drawing */}
      {bmdSlides.map((slide, idx) => {
        const stepNum = getBmdStepNum(idx);
        if (displayedStep < stepNum) return null;

        const isCurrent = displayedStep === stepNum;

        if (slide.type === 'bmd-jump') {
          const xPos = getSvgX(slide.x || 0, beam.length);
          const yStart = bmdY - (slide.mStart || 0) * bmdScale;
          const yEnd = bmdY - (slide.mEnd || 0) * bmdScale;
          const isClockwise = (slide.jump || 0) > 0;
          const sign = isClockwise ? '+' : '-';

          return (
            <g key={idx}>
              {((isCurrent && clickIdx >= 3) || !isCurrent) && (
                <>
                  <circle cx={xPos} cy={yStart} r="3" className={getCircleClass(stepNum, displayedStep, "fill-indigo-500 stroke-white dark:stroke-slate-900")} strokeWidth="1" />
                  <circle cx={xPos} cy={yEnd} r="3" className={getCircleClass(stepNum, displayedStep, "fill-indigo-500 stroke-white dark:stroke-slate-900")} strokeWidth="1" />
                </>
              )}
              {renderHelperVisuals(
                stepIndex >= stepNum,
                stepIndex === stepNum ? (clickIdx >= 2 ? 1 : 0) : 0.15,
                yStart,
                yStart,
                (slide.x || 0) - 0.5,
                (slide.x || 0) + 0.5,
                slide.x || 0,
                yStart,
                yEnd,
                `${sign}${Math.abs(slide.jump || 0).toFixed(3)} kNm`
              )}
              {!isCurrent ? (
                <line x1={xPos} y1={yStart} x2={xPos} y2={yEnd} className="stroke-indigo-500" strokeWidth="2.2" />
              ) : clickIdx >= 3 ? (
                <motion.line
                  x1={xPos}
                  y1={yStart}
                  x2={xPos}
                  y2={yEnd}
                  className="stroke-indigo-500"
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

        if (slide.type === 'bmd-segment') {
          const sX = getSvgX(slide.startX || 0, beam.length);
          const eX = getSvgX(slide.endX || 0, beam.length);
          const yStart = bmdY - (slide.mStart || 0) * bmdScale;
          const yEnd = bmdY - (slide.mEnd || 0) * bmdScale;

          const interval = solverResult.intervals.find(
            inv => (slide.startX || 0) >= inv.startX - 1e-3 && (slide.endX || 0) <= inv.endX + 1e-3
          );
          const isCurved = interval && (Math.abs(interval.vCoeffs[0]) > 1e-6 || Math.abs(interval.vCoeffs[1]) > 1e-6);

          const sign = (slide.shearArea || 0) >= 0 ? '+' : '-';
          const areaLabel = `${sign}${Math.abs(slide.shearArea || 0).toFixed(3)} kNm`;

          const ptsStr = isCurved
            ? getBmdCurvePoints(slide.startX || 0, slide.endX || 0, bmdY, bmdScale, beam.length, solverResult.intervals)
            : `${sX},${yStart} ${eX},${yEnd}`;

          if (slide.isPeakSplit === 'first' && (displayedStep === 22 || displayedStep === 23) && beam.length === 20) {
            const ptsConcaveUp = getConcaveUpCurvePoints(
              slide.startX || 0,
              slide.endX || 0,
              bmdY,
              bmdScale,
              beam.length,
              slide.mStart || 0,
              slide.mEnd || 0
            );

            // Curve A is solid starting from Click 3 on Slide 23
            const isCurveAActive = displayedStep === 23 && clickIdx >= 3;
            
            // Curves are shown on Slide 22 only at Click 3, and always on Slide 23
            const showCurves = (displayedStep === 22 && clickIdx >= 3) || displayedStep === 23;

            // Scanning visual highlights on BMD if stepIndex is 23
            let bmdScanVisuals = null;
            if (displayedStep === 23) {
              const startX = slide.startX || 5.0;
              const endX = slide.endX || 9.775;
              
              const vStart = interval ? evalPoly(interval.vCoeffs, startX) : 14.325;
              const vEnd = interval ? evalPoly(interval.vCoeffs, endX) : 0;
              
              // Position of x_scan based on clickIdx (0 = start, 1 = mid, >=2 = end)
              const xScanVal = startX + (clickIdx === 0 ? 0 : clickIdx === 1 ? (endX - startX) / 2 : endX - startX);
              const pxScan = getSvgX(xScanVal, beam.length);

              // Calculate correct Curve A height & slope
              const w = Math.abs(vStart - vEnd) / (endX - startX);
              const mCorrect = (slide.mStart || 0) + vStart * (xScanVal - startX) - 0.5 * w * Math.pow(xScanVal - startX, 2);
              const pyCorrect = bmdY - mCorrect * bmdScale;
              const slopeCorrect = vStart - w * (xScanVal - startX);

              // Calculate incorrect Curve B height & slope
              const mIncorrect = (slide.mStart || 0) + 0.5 * w * Math.pow(xScanVal - startX, 2);
              const pyIncorrect = bmdY - mIncorrect * bmdScale;
              const slopeIncorrect = w * (xScanVal - startX);

              // SVG tangent lines dx, dy math
              const L_tan = 28;
              const scaleX = 440 / beam.length;
              
              const slopeSvgA = -slopeCorrect * (bmdScale / scaleX);
              const angleA = Math.atan(slopeSvgA);
              const dxA = (L_tan / 2) * Math.cos(angleA);
              const dyA = (L_tan / 2) * Math.sin(angleA);

              const slopeSvgB = -slopeIncorrect * (bmdScale / scaleX);
              const angleB = Math.atan(slopeSvgB);
              const dxB = (L_tan / 2) * Math.cos(angleB);
              const dyB = (L_tan / 2) * Math.sin(angleB);

              bmdScanVisuals = (
                <g>
                  {/* Projection dashed line */}
                  <motion.line
                    animate={{ x1: pxScan, y1: bmdY - 60, x2: pxScan, y2: bmdY + 60 }}
                    transition={{ type: 'spring', stiffness: 90, damping: 15 }}
                    className="stroke-indigo-500/60 stroke-[1.2]"
                    strokeDasharray="3 3"
                  />
                  
                  {/* Tangent line for Curve A (Correct) */}
                  <motion.line
                    animate={{ x1: pxScan - dxA, y1: pyCorrect - dyA, x2: pxScan + dxA, y2: pyCorrect + dyA }}
                    transition={{ type: 'spring', stiffness: 90, damping: 15 }}
                    className="stroke-emerald-600 dark:stroke-emerald-400 stroke-[2]"
                  />
                  <motion.circle
                    animate={{ cx: pxScan, cy: pyCorrect }}
                    transition={{ type: 'spring', stiffness: 90, damping: 15 }}
                    r="3.5"
                    className="fill-emerald-500 stroke-white dark:stroke-slate-900 stroke-[1]"
                  />
                  
                  {/* Tangent line for Curve B (Incorrect) */}
                  <motion.line
                    animate={{ x1: pxScan - dxB, y1: pyIncorrect - dyB, x2: pxScan + dxB, y2: pyIncorrect + dyB }}
                    transition={{ type: 'spring', stiffness: 90, damping: 15 }}
                    className="stroke-red-500 stroke-[1.5]"
                  />
                  <motion.circle
                    animate={{ cx: pxScan, cy: pyIncorrect }}
                    transition={{ type: 'spring', stiffness: 90, damping: 15 }}
                    r="3.5"
                    className="fill-red-500 stroke-white dark:stroke-slate-900 stroke-[1]"
                  />
                </g>
              );
            }

            return (
              <g key={idx}>
                {/* Circle marker at end point when plotted */}
                {((isCurrent && clickIdx >= 2) || !isCurrent) && (
                  <circle cx={eX} cy={yEnd} r="3" className={getCircleClass(stepNum, displayedStep, "fill-indigo-500 stroke-white dark:stroke-slate-900")} strokeWidth="1" />
                )}

                {/* Helper visuals (reference line & arrow) at Click 2 */}
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
                  areaLabel
                )}

                {showCurves && (
                  <>
                    {/* Curve A: Concave Down (Correct) */}
                    {isCurveAActive ? (
                      <polyline points={ptsStr} fill="none" className="stroke-indigo-500" strokeWidth={2.2} />
                    ) : (
                      <polyline points={ptsStr} fill="none" className="stroke-indigo-500/80" strokeWidth={1.8} strokeDasharray="3 3" />
                    )}
                    <text x={(sX + eX) / 2} y={yEnd - 12} textAnchor="middle" className="text-[7.5px] font-extrabold fill-indigo-600">Curve A</text>

                    {/* Curve B: Concave Up (Incorrect) */}
                    <polyline points={ptsConcaveUp} fill="none" className="stroke-slate-400 dark:stroke-slate-500" strokeWidth={1.8} strokeDasharray="3 3" />
                    <text x={(sX + eX) / 2} y={yStart + 12} textAnchor="middle" className="text-[7.5px] font-extrabold fill-slate-500">Curve B</text>
                  </>
                )}

                {bmdScanVisuals}
              </g>
            );
          }

          return (
            <g key={idx}>
              {((isCurrent && clickIdx >= 3) || !isCurrent) && (
                <circle cx={eX} cy={yEnd} r="3" className={getCircleClass(stepNum, displayedStep, "fill-indigo-500 stroke-white dark:stroke-slate-900")} strokeWidth="1" />
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
                areaLabel
              )}
              {!isCurved ? (
                !isCurrent ? (
                  <line x1={sX} y1={yStart} x2={eX} y2={yEnd} className="stroke-indigo-500" strokeWidth="2.2" />
                ) : clickIdx >= 3 ? (
                  <motion.line
                    x1={sX}
                    y1={yStart}
                    x2={eX}
                    y2={yEnd}
                    className="stroke-indigo-500"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                ) : null
              ) : (
                !isCurrent ? (
                  <polyline points={ptsStr} fill="none" className="stroke-indigo-500" strokeWidth="2.2" />
                ) : clickIdx >= 3 ? (
                  <motion.path
                    d={`M ${ptsStr.trim().split(' ').join(' L ')}`}
                    fill="none"
                    className="stroke-indigo-500"
                    strokeWidth="2.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                ) : null
              )}
            </g>
          );
        }

        if (slide.type === 'bmd-node-check') {
          const xPos = getSvgX(slide.x || 0, beam.length);
          const yEnd = bmdY - (slide.mEnd || 0) * bmdScale;
          return (
            <g key={idx}>
              {((isCurrent && clickIdx >= 2) || !isCurrent) && (
                <circle cx={xPos} cy={yEnd} r="3" className={getCircleClass(stepNum, displayedStep, "fill-indigo-500 stroke-white dark:stroke-slate-900")} strokeWidth="1" />
              )}
            </g>
          );
        }

        return null;
      })}

      {/* Completed BMD overlay (Recap view) */}
      {(displayedStep === 32 || displayedStep === 12) && (
        <g>
          {solverResult.intervals.map((inv, idx) => {
            const isCurved = Math.abs(inv.vCoeffs[0]) > 1e-6 || Math.abs(inv.vCoeffs[1]) > 1e-6;
            const sX = getSvgX(inv.startX, beam.length);
            const eX = getSvgX(inv.endX, beam.length);
            const yStart = bmdY - evalPoly(inv.mCoeffs, inv.startX) * bmdScale;
            const yEnd = bmdY - evalPoly(inv.mCoeffs, inv.endX) * bmdScale;

            if (isCurved) {
              const ptsStr = getBmdCurvePoints(inv.startX, inv.endX, bmdY, bmdScale, beam.length, solverResult.intervals);
              return <polyline key={idx} points={ptsStr} fill="none" className="stroke-indigo-500" strokeWidth="2.2" />;
            }
            return <line key={idx} x1={sX} y1={yStart} x2={eX} y2={yEnd} className="stroke-indigo-500" strokeWidth="2.2" />;
          })}
        </g>
      )}

      {/* Unified deduplicated boundary labels */}
      {uniqueBmdLabels.map((lbl, idx) => {
        const xPos = getSvgX(lbl.x, beam.length);
        const yPos = bmdY - lbl.val * bmdScale + (lbl.val === maxMomentVal ? -6 : 10);
        const anchor = lbl.x === beam.length ? 'end' : lbl.x === 0 ? 'start' : 'middle';

        return (
          <text
            key={idx}
            x={xPos}
            y={yPos}
            textAnchor={anchor}
            className={`text-[7.5px] font-mono fill-indigo-500 ${lbl.val === maxMomentVal ? 'font-black' : 'font-bold'} animate-in fade-in duration-200`}
          >
            {lbl.val.toFixed(3)}
          </text>
        );
      })}

      {/* Segment dimension lines under BMD diagram when the beam is hidden */}
      {pairing === 'sfd-bmd' && (
        <g>
          {solverResult.intervals.map((inv, idx) => {
            const sX = getSvgX(inv.startX, beam.length);
            const eX = getSvgX(inv.endX, beam.length);
            const L = inv.endX - inv.startX;
            return (
              <DimensionLine
                key={idx}
                x1={sX}
                y1={174}
                x2={eX}
                y2={174}
                label={`${L.toFixed(1)}m`}
                color="#94a3b8"
                className="opacity-90 dark:opacity-85 text-[7px]"
                textClassName="fill-slate-500 dark:fill-slate-400 text-[6.5px] font-sans font-extrabold"
              />
            );
          })}
        </g>
      )}
    </g>
  );
};

function evalPoly(coeffs: number[], x: number): number {
  let val = 0;
  for (let i = 0; i < coeffs.length; i++) {
    const c = coeffs[i];
    if (c !== undefined) {
      val = val * x + c;
    }
  }
  return val;
}
