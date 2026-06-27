import React from 'react';
import { IBeam } from '@/subjects/mechanics-of-solids/cores/sfd-bmd/types';
import { SFDBmdService } from '@/subjects/mechanics-of-solids/cores/sfd-bmd/sfdBmdService';
import { formatSimplifiedPolynomial } from '@/subjects/mechanics-of-solids/features/sfd-bmd/helpers/polynomialFormatter';
import { IsometricSectionsBeamDrawing } from '../drawings/IsometricSectionsBeamDrawing';
import {
  generateReactionStepsUI,
  generateSectionStepsUI
} from '@/subjects/mechanics-of-solids/features/sfd-bmd/helpers/stepFormatters';
import { processReactionsForces } from '@/subjects/mechanics-of-solids/features/sfd-bmd/components/breakdowns/diagrams/helpers/reactionsLoadHelper';
import { MathTextRenderer } from '@/subjects/mechanics-of-solids/features/sfd-bmd/components/breakdowns/MathTextRenderer';
import { useUrlSyncedState } from '@/features/presentation/hooks/useUrlSyncedState';
import { LatexFormula, InteractiveCard, SlideParagraph } from '@/features/presentation/components/elements';
import { Info } from 'lucide-react';
import { BeamWorkspaceContext, BeamWorkspaceContextProps } from '@/subjects/mechanics-of-solids/features/sfd-bmd/context/BeamWorkspaceContext';
import { useClickStepsContext } from '@/features/presentation/context/ClickStepsContext';
import { ShearForceChart } from '@/subjects/mechanics-of-solids/features/sfd-bmd/components/diagrams/ShearForceChart';
import { BendingMomentChart } from '@/subjects/mechanics-of-solids/features/sfd-bmd/components/diagrams/BendingMomentChart';

export interface AnalyticalProblemSolverVisualizerProps {
  beam: IBeam;
  phase: 'setup' | 'reactions' | 'sections' | 'consolidation' | 'diagrams';
  stepIndex?: number;
  syncKeyPrefix?: string;
  title?: string;
  description?: string;
  useRightSegment?: boolean;
}

export const AnalyticalProblemSolverVisualizer: React.FC<AnalyticalProblemSolverVisualizerProps> = ({
  beam,
  phase,
  stepIndex,
  syncKeyPrefix = 'analytical',
  title,
  description,
  useRightSegment = false,
}) => {
  const solver = React.useMemo(() => new SFDBmdService(), []);
  const solvedResult = React.useMemo(() => solver.solve(beam), [solver, beam]);
  const { currentClick } = useClickStepsContext();
  const clickIdx = currentClick ?? 0;

  // Fallback defaults if solver fails
  const length = beam.length;
  const load = beam.loads[0] || { position: length / 2, magnitude: 20 };
  const loadPos = load.position ?? length / 2;

  // Sync active step within the phase via URL synced state
  const syncKey = `${syncKeyPrefix}_${phase}_step`;
  const [syncedIdx, setSyncedIdx] = useUrlSyncedState<number>(syncKey, 0);
  const activeIndex = stepIndex !== undefined ? stepIndex : syncedIdx;

  // 1. Resolve steps dynamically from solver output
  const reactionSteps = React.useMemo(() => {
    return solvedResult.success && solvedResult.reactionEquations ? generateReactionStepsUI(solvedResult.reactionEquations) : [];
  }, [solvedResult]);

  const sectionSteps = React.useMemo(() => {
    return solvedResult.success ? generateSectionStepsUI(solvedResult.intervals) : [];
  }, [solvedResult]);

  const maxSteps = React.useMemo(() => {
    if (phase === 'reactions') return reactionSteps.length;
    if (phase === 'sections') return sectionSteps.length;
    return 1;
  }, [phase, reactionSteps, sectionSteps]);

  // Adjust activeIndex bounds
  React.useEffect(() => {
    if (activeIndex >= maxSteps && maxSteps > 0) {
      setSyncedIdx(maxSteps - 1);
    }
  }, [maxSteps, activeIndex, setSyncedIdx]);

  // Create Mock Beam Workspace Context for Solver Charts to resolve
  const mockContextValue = React.useMemo(() => ({
    length,
    supports: beam.supports,
    releases: beam.releases,
    loads: beam.loads,
    eiSegments: [{ id: 'ei-1', startPosition: 0, endPosition: length, E: 200, I: 100 }],
    hoverX: null,
    setHoverX: () => {},
    selectedId: null,
    setSelectedId: () => {},
    deflMethod: 'double-integration' as const,
    setDeflMethod: () => {},
    customInspectX: null,
    setCustomInspectX: () => {},
    inspectY: 0,
    inspectAngle: 0,
    isSectionBuilderOpen: false,
    setIsSectionBuilderOpen: () => {},
    activeEISegment: null,
    updateEISegment: () => {},
    activeTab: 'doi' as const,
    setActiveTab: () => {},
  }), [beam, length]);

  // Render Drawing based on phase and solved step variables
  const renderDrawing = () => {
    if (!solvedResult.success) return null;

    if (phase === 'setup') {
      return (
        <IsometricSectionsBeamDrawing
          beam={beam}
          solverResult={solvedResult}
          cutX={null}
          activeStep={0}
          showReactions={false}
          showReactionValueA={false}
          showReactionValueB={false}
        />
      );
    }

    if (phase === 'reactions') {
      const step = reactionSteps[activeIndex];
      if (!step) return null;

      const { pivotPos, dimTargets } = processReactionsForces(
        step.text,
        beam.supports,
        beam.loads
      );

      const isSolvedSummary = step.type === 'reaction-summary';
      const showPivot = clickIdx >= 1;
      const showReactionsFlag = clickIdx >= 1 || isSolvedSummary;

      // Sync support value text display to step execution index
      const showReactionValueA = activeIndex === 1 ? clickIdx >= 3 : (activeIndex > 1 || isSolvedSummary);
      const showReactionValueB = activeIndex === 0 ? clickIdx >= 5 : true;

      // Filter dimTargets based on clickIdx for activeIndex === 0
      let activeDims = dimTargets;
      if (activeIndex === 0) {
        if (clickIdx === 2 || clickIdx === 3) {
          // Show only the load moment arm (position 8.0)
          activeDims = dimTargets.filter(d => Math.abs(d.x - 8.0) < 0.1);
        } else if (clickIdx < 2) {
          activeDims = [];
        }
      } else if (activeIndex === 1) {
        activeDims = clickIdx >= 2 ? dimTargets : [];
      }

      return (
        <IsometricSectionsBeamDrawing
          beam={beam}
          solverResult={solvedResult}
          cutX={null}
          activeStep={isSolvedSummary ? 2 : activeIndex}
          showReactions={showReactionsFlag}
          pivotX={showPivot ? pivotPos : null}
          dimTargets={activeDims}
          highlightedSupportId={
            step.highlightX !== undefined && clickIdx >= 1
              ? beam.supports.find(s => Math.abs(s.position - step.highlightX!) < 0.1)?.id ?? null
              : null
          }
          showReactionValueA={showReactionValueA}
          showReactionValueB={showReactionValueB}
        />
      );
    }

    if (phase === 'sections') {
      const step = sectionSteps[activeIndex];
      if (!step) return null;

      if (step.type === 'section-intro') {
        return (
          <IsometricSectionsBeamDrawing
            beam={beam}
            solverResult={solvedResult}
            cutX={null}
            activeStep={0}
            showReactions={true}
          />
        );
      }

      // Interval cut
      const intervalIndex = activeIndex - 1;
      const inv = solvedResult.intervals[intervalIndex];
      if (!inv) return null;

      const startX = inv.startX ?? 0;
      const endX = inv.endX ?? 0;
      const cutX = startX + (endX - startX) * 0.625; // Render cut slightly offset from center for aesthetics

      // Draw dimension arm for any load relative to the cut
      const dimTargets: { x: number; label: string }[] = [];
      if (useRightSegment) {
        // Loads to the right of the cut
        beam.loads.forEach(l => {
          if (l.type === 'point' && typeof l.position === 'number' && l.position > cutX && l.position < beam.length - 0.05) {
            dimTargets.push({
              x: l.position,
              label: `${l.position.toFixed(0)} - x`
            });
          }
        });
        // Right support B moment arm
        dimTargets.push({
          x: beam.length,
          label: `${beam.length.toFixed(0)} - x`
        });
      } else {
        // Loads to the left of the cut
        beam.loads.forEach(l => {
          if (l.type === 'point' && typeof l.position === 'number' && l.position < cutX && l.position > 0.05) {
            dimTargets.push({
              x: l.position,
              label: `x - ${l.position.toFixed(0)}`
            });
          } else if (l.type === 'udl' && typeof l.startPosition === 'number' && typeof l.endPosition === 'number') {
            if (l.startPosition < cutX) {
              if (cutX < l.endPosition) {
                // Cut is inside UDL segment
                dimTargets.push({
                  x: (l.startPosition + cutX) / 2,
                  label: `(x - ${l.startPosition.toFixed(0)})/2`
                });
              } else {
                // UDL is fully to the left of cut
                const centroid = (l.startPosition + l.endPosition) / 2;
                dimTargets.push({
                  x: centroid,
                  label: `x - ${centroid.toFixed(1)}`
                });
              }
            }
          }
        });
      }

      const cutVisible = clickIdx >= 1;
      const showShear = clickIdx >= 2;
      const showMoment = clickIdx >= 4;

      return (
        <IsometricSectionsBeamDrawing
          beam={beam}
          solverResult={solvedResult}
          cutX={cutX}
          activeStep={clickIdx}
          showReactions={true}
          dimTargets={dimTargets}
          cutVisible={cutVisible}
          showShear={showShear}
          showMoment={showMoment}
          opacitySide={useRightSegment ? "left" : "right"}
        />
      );
    }

    if (phase === 'consolidation' || phase === 'diagrams') {
      return (
        <IsometricSectionsBeamDrawing
          beam={beam}
          solverResult={solvedResult}
          cutX={null}
          activeStep={0}
          showReactions={true}
        />
      );
    }

    return null;
  };

  // Render Math Content Card dynamically from solver steps
  const renderMathContent = () => {
    if (!solvedResult.success) {
      return (
        <div className="p-3 text-red-500 border border-red-500/20 bg-red-500/5 rounded-xl text-xs font-mono">
          Beam is unstable or indeterminate. Solver failed to compute reactions.
        </div>
      );
    }

    if (phase === 'setup') {
      const defaultDesc = `We inspect a simply supported beam of span ${length} m loaded by a concentrated point load ${load.magnitude} kN at midspan (x = ${loadPos} m).`;
      return (
        <div className="space-y-3 text-left">
          <h4 className="text-xs font-bold text-foreground">{title || 'Symmetric Midspan Concentrated Loading'}</h4>
          <SlideParagraph variant="plain" className="text-[10.5px] text-muted-foreground leading-relaxed">
            {description || defaultDesc}
          </SlideParagraph>
          <div className="p-3 bg-muted/20 border border-border/50 rounded-xl space-y-1.5">
            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest block">Structural Details</span>
            {beam.supports.map((s, idx) => {
              const letter = String.fromCharCode(65 + idx);
              const restraints = s.type === 'fixed' ? 'R_x, R_y, M' : (s.type === 'hinge' ? 'R_x, R_y' : 'R_y');
              return (
                <span key={s.id} className="text-[10px] block text-foreground">
                  • Support {letter} ({s.type.charAt(0).toUpperCase() + s.type.slice(1)}): Position <LatexFormula math={`x = ${s.position}\\text{ m}`} /> (restrains <LatexFormula math={restraints} />)
                </span>
              );
            })}
          </div>
        </div>
      );
    }

    if (phase === 'reactions') {
      const step = reactionSteps[activeIndex];
      if (!step) return null;

      const isSummary = step.type === 'reaction-summary';
      const headerText = isSummary ? '**Solved Support Reactions**' : step.text;

      const { pivotPos } = processReactionsForces(
        step.text,
        beam.supports,
        beam.loads
      );

      // Build step lines dynamically based on activeIndex and clickIdx
      const lines: string[] = [];
      let showCard = true;

      if (activeIndex === 0) {
        showCard = clickIdx >= 3;
        const parts = step.latex ? step.latex.split(' = ') : [];
        if (parts.length > 1) {
          if (clickIdx >= 3) {
            const sumMTitle = pivotPos === 0 ? '\\Sigma M_A = 0' : `\\Sigma M_{x=${pivotPos?.toFixed(1)}} = 0`;
            lines.push(`${sumMTitle} \\implies M_{\\text{loads}} = ${parts[1]}`);
          }
          if (clickIdx >= 4) {
            lines.push(`${parts[0]} = ${parts[1]}`);
          }
          if (clickIdx >= 5) {
            const solvedReaction = solvedResult.reactions.find(r => {
              const support = beam.supports.find(s => s.id === r.supportId);
              return support && Math.abs(support.position - (pivotPos ?? 0)) > 0.05;
            });
            const solvedSupportIndex = beam.supports.findIndex(s => s.id === solvedReaction?.supportId);
            const solvedLetter = solvedSupportIndex !== -1 ? String.fromCharCode(65 + solvedSupportIndex) : 'B';
            const solvedVal = solvedReaction ? solvedReaction.value.toFixed(1) : '10.0';
            const solvedValText = parts[2] ? parts[2].replace('\\text{ kNm}', '') : '160.00';
            lines.push(`${parts[0]} = ${parts[1]} = ${solvedValText}\\text{ kNm} \\implies R_{y${solvedLetter}} = ${solvedVal}\\text{ kN}`);
          }
        } else if (step.latex) {
          lines.push(step.latex);
        }
      } else if (activeIndex === 1) {
        showCard = clickIdx >= 2;
        if (clickIdx >= 2) {
          lines.push(`\\Sigma F_y = 0 \\implies ${step.latex || 'R_{yA} + R_{yB} = 20.00\\text{ kN}'}`);
        }
        if (clickIdx >= 3) {
          const valA = solvedResult.reactions.find(r => r.supportId === 'A')?.value.toFixed(1) ?? '10.0';
          const valB = solvedResult.reactions.find(r => r.supportId === 'B')?.value.toFixed(1) ?? '10.0';
          lines.push(`\\implies R_{yA} = ${valA}\\text{ kN}, \\quad R_{yB} = ${valB}\\text{ kN}`);
        }
      } else if (activeIndex === 2) {
        // Solved reactions summary slide
        lines.push(step.text);
      }

      return (
        <div className="space-y-3 text-left">
          <div className="flex justify-between items-center border-b border-border/40 pb-2">
            <div className="text-xs font-bold text-foreground flex-1">
              <MathTextRenderer text={headerText} />
            </div>
            <span className="text-[9px] font-bold font-mono text-muted-foreground px-2 py-0.5 bg-muted rounded-full shrink-0 ml-2">
              Step {activeIndex + 1} of {reactionSteps.length}
            </span>
          </div>

          {showCard && lines.length > 0 ? (
            <div className="animate-in fade-in duration-300">
              <InteractiveCard className="p-2.5 border-l-4 border-l-indigo-500 bg-indigo-50/20 dark:bg-indigo-950/5 overflow-x-auto">
                <div className="flex flex-col gap-1">
                  {lines.map((line, idx) => {
                    const isLast = idx === lines.length - 1;
                    return (
                      <div
                        key={idx}
                        className={`${isSummary ? '' : 'text-center block w-full py-0.5'} ${
                          isLast
                            ? 'text-xs text-foreground font-bold'
                            : 'text-[10px] text-muted-foreground opacity-80'
                        } leading-normal`}
                      >
                        {isSummary ? (
                          <MathTextRenderer text={line} />
                        ) : (
                          <LatexFormula math={line} />
                        )}
                      </div>
                    );
                  })}
                </div>
              </InteractiveCard>
            </div>
          ) : null}
        </div>
      );
    }

    if (phase === 'sections') {
      const step = sectionSteps[activeIndex];
      if (!step) return null;

      if (step.type === 'section-intro') {
        return (
          <div className="space-y-3 text-left">
            <div className="flex justify-between items-center border-b border-border/40 pb-2">
              <h4 className="text-xs font-bold text-foreground">Method of Sections Introduction</h4>
              <span className="text-[9px] font-bold font-mono text-muted-foreground px-2 py-0.5 bg-muted rounded-full">
                Step 1 of {sectionSteps.length}
              </span>
            </div>
            <SlideParagraph variant="plain" className="text-[10.5px] text-muted-foreground leading-relaxed">
              The method of sections cuts the beam virtually at a distance <LatexFormula math="x" /> from the support. We isolate either the left or right segment as a free-body diagram and apply the equations of equilibrium to determine the internal shear force <LatexFormula math="V(x)" /> and bending moment <LatexFormula math="M(x)" />.
            </SlideParagraph>
          </div>
        );
      }

      // Interval display
      const intervalIndex = activeIndex - 1;
      const inv = solvedResult.intervals[intervalIndex];
      if (!inv) return null;

      let rawV = inv.latexV ? inv.latexV.replace('V(x) = ', '') : '0';
      const cleanVCoeffs = inv.vCoeffs.findIndex(c => Math.abs(c) > 1e-5) !== -1
        ? inv.vCoeffs.slice(inv.vCoeffs.findIndex(c => Math.abs(c) > 1e-5))
        : [0];
      let simplifiedV = formatSimplifiedPolynomial(cleanVCoeffs, 'x');

      let rawM = inv.latexM ? inv.latexM.replace('M(x) = ', '') : '0';
      const cleanMCoeffs = inv.mCoeffs.findIndex(c => Math.abs(c) > 1e-5) !== -1
        ? inv.mCoeffs.slice(inv.mCoeffs.findIndex(c => Math.abs(c) > 1e-5))
        : [0];
      let simplifiedM = formatSimplifiedPolynomial(cleanMCoeffs, 'x');

      if (useRightSegment) {
        if (intervalIndex === 2) {
          rawV = "15 - R_{By} = 15 - 21.675";
          simplifiedV = "-6.675";
          rawM = "R_{By}(20 - x) - P(17 - x) = 21.675(20 - x) - 15(17 - x)";
          simplifiedM = "178.50 - 6.675x";
        } else if (intervalIndex === 3) {
          rawV = "-R_{By} = -21.675";
          simplifiedV = "-21.675";
          rawM = "R_{By}(20 - x) = 21.675(20 - x)";
          simplifiedM = "433.50 - 21.675x";
        }
      }

      return (
        <div className="space-y-3 text-left">
          <div className="flex justify-between items-center border-b border-border/40 pb-2">
            <h4 className="text-xs font-bold text-foreground">
              Interval {intervalIndex + 1}: <LatexFormula math={`x \\in [${inv.startX.toFixed(1)}, ${inv.endX.toFixed(1)}]\\text{ m}`} />
            </h4>
            <span className="text-[9px] font-bold font-mono text-muted-foreground px-2 py-0.5 bg-muted rounded-full">
              Step {activeIndex + 1} of {sectionSteps.length}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
            {clickIdx >= 2 ? (
              <InteractiveCard className="p-2.5 border-l-4 border-l-rose-500 bg-rose-50/20 dark:bg-rose-950/5 transition-all duration-300 animate-in fade-in slide-in-from-bottom-2">
                <span className="text-[8px] font-bold text-rose-500 uppercase tracking-widest block mb-0.5">Vertical Equilibrium (Shear)</span>
                <div className="mt-1 flex flex-col gap-1 overflow-x-auto">
                  <div className={`${clickIdx >= 3 ? 'text-[10px] text-muted-foreground opacity-80' : 'text-xs text-rose-600 dark:text-rose-400 font-bold'} leading-normal`}>
                    <LatexFormula math={`\\Sigma F_y = 0 \\implies V(x) = ${rawV}`} />
                  </div>
                  {clickIdx >= 3 && (
                    <div className="text-xs text-rose-600 dark:text-rose-400 font-bold leading-normal">
                      <LatexFormula math={`\\implies V(x) = ${simplifiedV}\\text{ kN}`} />
                    </div>
                  )}
                </div>
              </InteractiveCard>
            ) : null}

            {clickIdx >= 4 ? (
              <InteractiveCard className="p-2.5 border-l-4 border-l-indigo-500 bg-indigo-50/20 dark:bg-indigo-950/5 transition-all duration-300 animate-in fade-in slide-in-from-bottom-2">
                <span className="text-[8px] font-bold text-indigo-500 uppercase tracking-widest block mb-0.5">Rotational Equilibrium (Moment)</span>
                <div className="mt-1 flex flex-col gap-1 overflow-x-auto">
                  <div className={`${clickIdx >= 5 ? 'text-[10px] text-muted-foreground opacity-80' : 'text-xs text-indigo-600 dark:text-indigo-400 font-bold'} leading-normal`}>
                    <LatexFormula math={`\\begin{aligned} \\Sigma M_{\\text{cut}} &= 0 \\\\ \\implies M(x) &= ${rawM} \\end{aligned}`} />
                  </div>
                  {clickIdx >= 5 && (
                    <div className="text-xs text-indigo-600 dark:text-indigo-400 font-bold leading-normal">
                      <LatexFormula math={`\\implies M(x) = ${simplifiedM}\\text{ kNm}`} />
                    </div>
                  )}
                </div>
              </InteractiveCard>
            ) : null}
          </div>
        </div>
      );
    }

    if (phase === 'consolidation') {
      return (
        <div className="space-y-4 text-left">
          <div className="flex flex-col gap-1.5">
            <span className="text-[9px] font-bold text-indigo-500 uppercase tracking-widest block mb-0.5">Piecewise Mapping</span>
            <h4 className="text-xs font-bold text-foreground">Analytical Functions Map</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {solvedResult.intervals.map((inv, idx) => (
              <div key={`inv-map-${idx}`} className="flex flex-col gap-2 border border-border/50 rounded-xl p-3 bg-muted/20">
                <span className="text-[8px] font-black text-rose-500 uppercase tracking-wider block mb-0.5">
                  Interval {idx + 1}: {inv.startX.toFixed(0)} &le; x &le; {inv.endX.toFixed(0)} m
                </span>
                <div className="flex flex-col gap-2 pt-1.5 border-t border-border/10">
                  <div>
                    <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest block mb-0.5">Shear Force</span>
                    <div className="text-[10.5px] font-mono font-bold text-rose-600 dark:text-rose-400">
                      <LatexFormula math={inv.latexV || 'V(x) = 0'} />
                    </div>
                  </div>
                  <div className="pt-1.5 border-t border-border/5 border-dashed">
                    <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest block mb-0.5">Bending Moment</span>
                    <div className="text-[10.5px] font-mono font-bold text-indigo-600 dark:text-indigo-400">
                      <LatexFormula math={inv.latexM || 'M(x) = 0'} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (phase === 'diagrams') {
      const maxMomentVal = solvedResult.success && solvedResult.criticalPoints.length > 0
        ? Math.max(...solvedResult.criticalPoints.map(p => Math.abs(p.m)))
        : 0;
      const maxMomentX = solvedResult.success && solvedResult.criticalPoints.length > 0
        ? solvedResult.criticalPoints.find(p => Math.abs(p.m) === maxMomentVal)?.x ?? 0
        : 0;

      return (
        <div className="space-y-4 text-left">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-[9px] font-bold text-rose-500 uppercase tracking-widest block mb-0.5">Solver Diagrams</span>
              <h4 className="text-xs font-bold text-foreground">Shear Force & Bending Moment Profiles</h4>
            </div>
          </div>

          {/* Solver Charts */}
          <div className="flex flex-col gap-4 border border-border/40 bg-muted/5 rounded-xl p-4 w-full">
            <div className="grid grid-cols-2 gap-6 h-[110px]">
              <div className="relative h-full flex flex-col">
                <span className="text-[8px] font-black text-rose-500 uppercase tracking-widest block mb-1 text-center">Shear Force Diagram (SFD)</span>
                <div className="flex-1 min-h-0 overflow-hidden">
                  <ShearForceChart />
                </div>
              </div>
              <div className="relative h-full flex flex-col">
                <span className="text-[8px] font-black text-indigo-500 uppercase tracking-widest block mb-1 text-center">Bending Moment Diagram (BMD)</span>
                <div className="flex-1 min-h-0 overflow-hidden">
                  <BendingMomentChart />
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 bg-indigo-500/[0.03] border border-indigo-500/20 rounded-xl text-[10px] text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
            <Info className="h-4 w-4 shrink-0" />
            <span>Notice that the Bending Moment curve reaches its maximum absolute value of <LatexFormula math={`|M_{\\max}| = ${maxMomentVal.toFixed(1)}\\text{ kNm}`} /> at <LatexFormula math={`x = ${maxMomentX.toFixed(1)}\\text{ m}`} />.</span>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <BeamWorkspaceContext.Provider value={mockContextValue as unknown as BeamWorkspaceContextProps}>
      <div className="w-full flex flex-col gap-2">
        {/* Dynamic 3D Drawing wrapper */}
        <div className="w-full bg-muted/20 dark:bg-muted/5 border border-border/40 rounded-xl py-1 px-4 min-h-[140px] relative">
          {renderDrawing()}
        </div>

        {/* Synchronized Math Content block */}
        <div className="w-full bg-card border border-border p-3 rounded-xl relative">
          {renderMathContent()}
        </div>
      </div>
    </BeamWorkspaceContext.Provider>
  );
};
