import React from 'react';
import { SlideProps } from '@/features/presentation/components/slides/SlideRenderer';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { TopicDividerLayout } from '@/shared/layouts/TopicDividerLayout';
import { LectureThankYou } from '@/shared/layouts/LectureThankYou';
import { useUrlSyncedState } from '@/features/presentation/hooks/useUrlSyncedState';
import { useClickStepsContext } from '@/features/presentation/context/ClickStepsContext';
import {
  LatexFormula,
  SlideBullet,
  ClickHighlight,
  ClickReveal
} from '@/features/presentation/components/elements';
import { Layers, Compass, Eye, Info } from 'lucide-react';
import { SFDBmdService } from '@/subjects/mechanics-of-solids/cores/sfd-bmd/sfdBmdService';
import { IBeam } from '@/subjects/mechanics-of-solids/cores/sfd-bmd/types';
import {
  ShearConventionDrawing,
  BendingMomentConventionDrawing,
  BeamLoadingSandboxDrawing,
  DiagramCoincidenceDrawing,
  VirtualCutDrawing
} from '@/subjects/mechanics-of-solids/features/sfd-bmd/components/drawings';

/**
 * Slide 7: Section Divider - Mapping Sign Conventions
 */
export const Slide7: React.FC<SlideProps> = (props) => (
  <TopicDividerLayout
    {...props}
    topicNumber="Topic 03"
    title="Sign Conventions & Loading Scenarios"
    subtitle="Mathematical conventions for shear and bending moment across isolated segments"
  />
);

/**
 * Slide 8: The Shear Force Sign Convention
 */
export const Slide8: React.FC = () => {
  const clickContext = useClickStepsContext();
  const { currentClick, setClick } = clickContext;
  const [activeSide, setActiveSide] = useUrlSyncedState<'left' | 'right'>('sfd_bmd_l1_shear_side', 'left');

  React.useEffect(() => {
    if (currentClick !== undefined) {
      setActiveSide(currentClick <= 1 ? 'left' : 'right');
    }
  }, [currentClick, setActiveSide]);

  const toggleSide = (side: 'left' | 'right') => {
    setActiveSide(side);
    setClick(side === 'left' ? 1 : 2);
  };

  const activeStep = Math.min(currentClick, 2);

  return (
    <TwoColumnLayout
      title="Shear Sign Convention"
      leftWidth="55%"
      leftContent={
        <div className="bg-muted/30 rounded-xl p-5 flex flex-col justify-between h-full min-h-[280px] border border-border/50">
          <div>
            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest block mb-0.5">Physical Segment Isolation</span>
            <h4 className="text-xs font-bold text-foreground">Reference Frame: Cut Face Action</h4>
            <p className="text-[10px] text-muted-foreground mt-1 leading-normal">
              Internal shear force direction is defined relative to the side of the cut we choose to inspect. Use next/prev stepping to view:
            </p>
          </div>
          <div className="my-4 flex justify-center">
            <ShearConventionDrawing activeStep={activeStep} activeSegment={activeSide} onSegmentClick={toggleSide} />
          </div>
          <div className="p-3 bg-indigo-500/[0.03] border border-indigo-500/20 rounded-xl text-[10px] text-indigo-600 dark:text-indigo-400 leading-normal">
            <strong>Rule of Thumb:</strong> If the shearing action rotates the segment in a **clockwise** direction, it is positive.
          </div>
        </div>
      }
      rightContent={
        <div className="flex flex-col justify-between h-full gap-4 text-left">
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <Compass className="h-4.5 w-4.5 text-indigo-500" />
              <span>Shear Sign Criteria</span>
            </h4>
            <div className="space-y-2">
              <ClickReveal at={1} preset="none">
                <div className={`p-3 rounded-xl border transition-all ${activeSide === 'left' ? 'bg-indigo-50/40 border-indigo-200 dark:bg-indigo-950/10' : 'opacity-55 bg-slate-50 dark:bg-slate-900/40'}`}>
                  <span className="text-[9px] font-bold text-indigo-500 uppercase tracking-widest block mb-0.5">Left-Hand Segment</span>
                  <p className="text-[10px] text-muted-foreground leading-normal">
                    A shear force pointing <strong>downward</strong> on the right-hand cut face of a left segment is positive (+ve).
                  </p>
                </div>
              </ClickReveal>
              <ClickReveal at={2} preset="none">
                <div className={`p-3 rounded-xl border transition-all ${activeSide === 'right' ? 'bg-indigo-50/40 border-indigo-200 dark:bg-indigo-950/10' : 'opacity-55 bg-slate-50 dark:bg-slate-900/40'}`}>
                  <span className="text-[9px] font-bold text-indigo-500 uppercase tracking-widest block mb-0.5">Right-Hand Segment</span>
                  <p className="text-[10px] text-muted-foreground leading-normal">
                    A shear force pointing <strong>upward</strong> on the left-hand cut face of a right segment is positive (+ve).
                  </p>
                </div>
              </ClickReveal>
            </div>
          </div>
          <div className="p-3 bg-indigo-500/[0.03] border border-indigo-500/20 rounded-xl text-[10px] text-indigo-600 dark:text-indigo-400 leading-normal">
            <strong>Rule of Thumb:</strong> If the shearing action rotates the segment in a **clockwise** direction, it is positive.
          </div>
        </div>
      }
    />
  );
};

/**
 * Slide 9: Sagging vs. Hogging (Bending Moment Sign Convention)
 */
export const Slide9: React.FC = () => {
  const { currentClick } = useClickStepsContext();

  return (
    <TwoColumnLayout
      title="Bending Sign Convention"
      leftWidth="50%"
      leftContent={
        <div className="bg-emerald-50/40 dark:bg-emerald-950/5 border border-emerald-200/50 rounded-xl p-5 flex flex-col justify-between h-full min-h-[280px]">
          <div>
            <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block mb-0.5">Positive Bending Moment</span>
            <h4 className="text-xs font-bold text-foreground">Sagging (+ve Moment)</h4>
            <ClickReveal at={1} preset="none">
              <p className="text-[10px] text-muted-foreground mt-1 leading-normal">
                Concave curvature (smiley shape). Top fibers are compressed, bottom fibers are in tension.
              </p>
            </ClickReveal>
          </div>
          <div className="my-4 flex justify-center">
            <BendingMomentConventionDrawing variant="sagging" isBent={currentClick >= 1} />
          </div>
          <ClickReveal at={1} preset="none">
            <div className="text-[9px] font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 px-2 py-1.5 rounded text-center flex items-center justify-center gap-1">
              <LatexFormula math={"\\\\Sigma M_{\\\\text{cut}} \\\\implies \\\\text{smiley profile } \\\\smile"} />
            </div>
          </ClickReveal>
        </div>
      }
      rightContent={
        <div className="bg-rose-50/40 dark:bg-rose-950/5 border border-rose-200/50 rounded-xl p-5 flex flex-col justify-between h-full min-h-[280px]">
          <div>
            <span className="text-[9px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-widest block mb-0.5">Negative Bending Moment</span>
            <h4 className="text-xs font-bold text-foreground">Hogging (-ve Moment)</h4>
            <ClickReveal at={2} preset="none">
              <p className="text-[10px] text-muted-foreground mt-1 leading-normal">
                Convex curvature (frown shape). Top fibers are in tension, bottom fibers are compressed.
              </p>
            </ClickReveal>
          </div>
          <div className="my-4 flex justify-center">
            <BendingMomentConventionDrawing variant="hogging" isBent={currentClick >= 2} />
          </div>
          <ClickReveal at={2} preset="none">
            <div className="text-[9px] font-mono text-rose-700 dark:text-rose-400 bg-rose-500/10 px-2 py-1.5 rounded text-center flex items-center justify-center gap-1">
              <LatexFormula math={"\\\\Sigma M_{\\\\text{cut}} \\\\implies \\\\text{frowning profile } \\\\frown"} />
            </div>
          </ClickReveal>
        </div>
      }
    />
  );
};

/**
 * Slide 10: Multi-Load Beam Scenario Sandbox
 */
export const Slide10: React.FC = () => {
  const { currentClick } = useClickStepsContext();

  const showPointLoad = currentClick >= 1;
  const showUdl = currentClick >= 2;

  // Dynamically calculate reactions based on user toggle states
  const supports = [
    { id: 'A', type: 'hinge' as const, position: 0 },
    { id: 'B', type: 'roller' as const, position: 8 }
  ];
  
  const loads = [];
  if (showPointLoad) {
    loads.push({ id: 'P', type: 'point' as const, position: 8 / 3, magnitude: 20 });
  }
  if (showUdl) {
    loads.push({ id: 'w', type: 'udl' as const, startPosition: 0, endPosition: 8, magnitude: 5 });
  }

  const beam: IBeam = {
    length: 8,
    supports,
    releases: [],
    loads
  };

  const solver = new SFDBmdService();
  const solved = solver.solve(beam);
  const rxnA = solved.reactions.find(r => r.supportId === 'A' && r.type === 'R_y')?.value;
  const rxnB = solved.reactions.find(r => r.supportId === 'B' && r.type === 'R_y')?.value;

  const reactionALabel = rxnA !== undefined && rxnA !== 0 ? `${rxnA.toFixed(1)} kN` : undefined;
  const reactionBLabel = rxnB !== undefined && rxnB !== 0 ? `${rxnB.toFixed(1)} kN` : undefined;

  return (
    <TwoColumnLayout
      title="Beam Loading Sandbox"
      leftWidth="55%"
      leftContent={
        <div className="bg-slate-50 dark:bg-slate-900/40 rounded-xl p-5 text-foreground flex flex-col justify-between h-full min-h-[280px] border border-border/80 shadow-xs">
          <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Preview Loaded State</span>
          
          <BeamLoadingSandboxDrawing
            showPointLoad={showPointLoad}
            showUdl={showUdl}
            reactionA={reactionALabel}
            reactionB={reactionBLabel}
          />
          
          <div className="bg-muted p-2 rounded text-[10px] text-muted-foreground text-center font-mono">
            Active Loading: {!showPointLoad && !showUdl ? 'None (Unloaded)' : ''}{showPointLoad && !showUdl ? 'Point Load (P)' : ''}{showPointLoad && showUdl ? 'Point Load (P) + UDL (w)' : ''}
          </div>
        </div>
      }
      rightContent={
        <div className="flex flex-col justify-between h-full gap-4 text-left">
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
              <Eye className="h-4.5 w-4.5 text-indigo-500" />
              <span>Load Configuration Panel</span>
            </h4>
            <div className="space-y-3">
              <ClickHighlight at={1} className="hidden">{' '}</ClickHighlight>
              <ClickHighlight at={2} className="hidden">{' '}</ClickHighlight>
              
              <div className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-350 bg-card/55 select-none ${showPointLoad ? 'border-amber-500/30 bg-amber-500/[0.02]' : 'border-border opacity-60'}`}>
                <input type="checkbox" checked={showPointLoad} readOnly className="rounded border-slate-300 text-amber-500 focus:ring-amber-500 h-4 w-4" />
                <div>
                  <span className="text-xs font-bold text-foreground">Concentrated Point Load (P) [Step 1]</span>
                  <p className="text-[10px] text-muted-foreground leading-snug">Renders high-intensity vertical force at a single coordinate.</p>
                </div>
              </div>
              <div className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-350 bg-card/55 select-none ${showUdl ? 'border-rose-500/30 bg-rose-500/[0.02]' : 'border-border opacity-60'}`}>
                <input type="checkbox" checked={showUdl} readOnly className="rounded border-slate-300 text-rose-500 focus:ring-rose-500 h-4 w-4" />
                <div>
                  <span className="text-xs font-bold text-foreground">Uniformly Distributed Load (w) [Step 2]</span>
                  <p className="text-[10px] text-muted-foreground leading-snug">Renders standard pressure load distributed evenly along the span.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-3 bg-muted/40 border border-border/50 rounded-xl text-[10px] text-muted-foreground">
            <strong>Lecturer Note:</strong> Press [Next] or Space to add loads sequentially prior to drawing sections.
          </div>
        </div>
      }
    />
  );
};

/**
 * Slide 11: Load-Shear-Moment Differential Relationships
 */
export const Slide11: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Differential Calculus Relationships"
      leftWidth="50%"
      leftContent={
        <div className="flex flex-col gap-4 text-left">
          <div>
            <div className="flex items-center gap-1.5 text-indigo-500 font-bold text-xs uppercase mb-1">
              <Layers className="h-4.5 w-4.5" />
              <span>Calculus Connections</span>
            </div>
            <p className="text-xs text-muted-foreground">Mathematical differentials linking Load (w), Shear (V), and Moment (M).</p>
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-card border border-border/60 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-foreground">Shear Slope & Load</span>
                <p className="text-[10px] text-muted-foreground leading-snug">The rate of change of shear is negative load intensity.</p>
              </div>
              <span className="font-mono text-xs font-bold text-primary"><LatexFormula math={"\\\\frac{dV}{dx} = -w"} /></span>
            </div>
            <div className="p-3 bg-card border border-border/60 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-foreground">Moment Slope & Shear</span>
                <p className="text-[10px] text-muted-foreground leading-snug">The rate of change of bending moment is the shear force.</p>
              </div>
              <span className="font-mono text-xs font-bold text-primary"><LatexFormula math={"\\\\frac{dM}{dx} = V"} /></span>
            </div>
          </div>
        </div>
      }
      rightContent={
        <div className="bg-slate-50/50 dark:bg-muted/5 border border-border/50 rounded-xl p-4 flex flex-col justify-between h-full min-h-[220px] text-left">
          <div>
            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Slope Relationships</span>
            <h4 className="text-xs font-bold text-foreground mt-1">Impact on Diagram Geometry</h4>
          </div>
          <div className="space-y-2 mt-2">
            <SlideBullet icon={<span className="text-primary font-bold">•</span>}>
              <strong>Point Load:</strong> Shear is constant (horizontal), Moment is linear (sloped straight line).
            </SlideBullet>
            <SlideBullet icon={<span className="text-primary font-bold">•</span>}>
              <strong>UDL:</strong> Shear is linear (sloped line), Moment is quadratic (parabola curve).
            </SlideBullet>
          </div>
          <div className="p-2.5 rounded-xl border border-indigo-500/20 bg-indigo-500/[0.03] text-[10px] text-indigo-600 dark:text-indigo-400 leading-normal mt-2">
            Integration maps area changes directly to diagram shifts.
          </div>
        </div>
      }
    />
  );
};

/**
 * Slide 12: Visualizing SFD/BMD Curve Slopes & Key Points
 */
export const Slide12: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Visualizing Diagram Key Points"
      leftWidth="55%"
      leftContent={
        <div className="bg-slate-50 dark:bg-slate-900/40 rounded-xl p-5 text-foreground flex flex-col justify-between h-full min-h-[280px] border border-border/80 shadow-xs">
          <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Diagram Coincidence</span>
          <div className="my-auto flex flex-col items-center py-4">
            <DiagramCoincidenceDrawing />
          </div>
        </div>
      }
      rightContent={
        <div className="flex flex-col justify-between h-full gap-4 text-left">
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
              <Info className="h-4.5 w-4.5 text-indigo-500" />
              <span>Diagram Slope Rules</span>
            </h4>
            <div className="space-y-2 text-[10px] text-muted-foreground leading-normal">
              <SlideBullet icon={<span className="text-rose-500 font-bold font-mono">1</span>}>
                <span>Shear Crosses Zero (V = 0): Bending moment curve has flat slope (dM/dx = 0), indicating local maximum bending stress.</span>
              </SlideBullet>
              <SlideBullet icon={<span className="text-indigo-500 font-bold font-mono">2</span>}>
                <span>{"Positive Shear (V > 0): Bending moment curve goes up (positive slope)."}</span>
              </SlideBullet>
              <SlideBullet icon={<span className="text-indigo-500 font-bold font-mono">3</span>}>
                <span>{"Negative Shear (V < 0): Bending moment curve goes down (negative slope)."}</span>
              </SlideBullet>
            </div>
          </div>
        </div>
      }
    />
  );
};

/**
 * Slide 13: Section Divider - Internal Equations Method
 */
export const Slide13: React.FC<SlideProps> = (props) => (
  <TopicDividerLayout
    {...props}
    topicNumber="Topic 04"
    title="Analytical Calculations: The Method of Sections"
    subtitle="Surfacing internal equations V(x) and M(x) by executing virtual cuts"
  />
);

/**
 * Slide 14: Executing The Virtual Cut (Sectioning at distance x)
 */
export const Slide14: React.FC = () => {
  const beam: IBeam = {
    length: 8,
    supports: [
      { id: 'A', type: 'hinge' as const, position: 0 },
      { id: 'B', type: 'roller' as const, position: 8 }
    ],
    releases: [],
    loads: [
      { id: 'load-1', type: 'point' as const, position: 4, magnitude: 20 }
    ]
  };

  const solver = new SFDBmdService();
  const solvedBeam = solver.solve(beam);
  const reactionA = solvedBeam.reactions.find(r => r.supportId === 'A' && r.type === 'R_y')?.value ?? 10;

  return (
    <TwoColumnLayout
      title="Executing the Virtual Cut"
      leftWidth="55%"
      leftContent={
        <div className="bg-slate-50 dark:bg-slate-900/40 rounded-xl p-5 text-foreground flex flex-col justify-between h-full min-h-[300px] border border-border/80 shadow-xs">
          <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Sectioning Free Body Diagram (FBD)</span>
          
          <VirtualCutDrawing
            reactionForceValue={`R_A = ${reactionA} kN`}
            shearForceLabel="V(x)"
            bendingMomentLabel="M(x)"
            distanceLabel="Distance x"
          />
          
          <div className="bg-muted p-2.5 rounded-lg border border-border/50 text-[10px] text-muted-foreground text-center font-mono flex items-center justify-center gap-2">
            <span>Equations:</span>
            <LatexFormula math={`V(x) = R_A = ${reactionA}\\\\text{ kN}`} />
            <span>,</span>
            <LatexFormula math={`M(x) = R_A \\\\cdot x = ${reactionA}x\\\\text{ kNm}`} />
          </div>
        </div>
      }
      rightContent={
        <div className="flex flex-col justify-between h-full gap-4 text-left">
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
              <Eye className="h-4.5 w-4.5 text-indigo-500" />
              <span>Sectioning Sequence</span>
            </h4>
            <div className="space-y-2 text-[10px] text-muted-foreground leading-normal">
              <SlideBullet icon={<span className="text-rose-500 font-bold font-mono">1</span>}>
                <strong>Cut the Span:</strong> Slice the beam virtually at a coordinate distance $x$ from the support origin.
              </SlideBullet>
              <SlideBullet icon={<span className="text-rose-500 font-bold font-mono">2</span>}>
                <strong>Expose Actions:</strong> Expose the internal shear force $V(x)$ and internal bending moment $M(x)$ vectors on the cut face.
              </SlideBullet>
              <SlideBullet icon={<span className="text-rose-500 font-bold font-mono">3</span>}>
                <strong>Apply equilibrium:</strong> Sum vertical forces and take moments at the cut section to solve for $V(x)$ and $M(x)$.
              </SlideBullet>
            </div>
          </div>
        </div>
      }
    />
  );
};

/**
 * Slide 15: Concluding Slide
 */
export const Slide15: React.FC<SlideProps> = (props) => (
  <LectureThankYou
    {...props}
    subtitle="Questions on Course Syllabus & Loading Matrix?"
  />
);
