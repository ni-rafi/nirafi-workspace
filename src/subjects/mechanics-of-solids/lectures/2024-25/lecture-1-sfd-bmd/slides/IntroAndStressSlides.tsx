import React from 'react';
import { SlideProps } from '@/features/presentation/components/slides/SlideRenderer';
import { LectureCover } from '@/shared/layouts/LectureCover';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { TopicDividerLayout } from '@/shared/layouts/TopicDividerLayout';
import { HighlightableList } from '@/features/outline/components/HighlightableList';
import { ReferenceBooksList } from '@/features/outline/components/ReferenceBooksList';
import { useClickStepsContext } from '@/features/presentation/context/ClickStepsContext';
import {
  InteractiveCard,
  LatexFormula,
  SlideBullet,
  ClickSyncedTabs,
  ClickHighlight,
  ClickReveal
} from '@/features/presentation/components/elements';
import { BookOpen, Layers, Bookmark, Info } from 'lucide-react';
import { SFDBmdService } from '@/subjects/mechanics-of-solids/cores/sfd-bmd/sfdBmdService';
import { IBeam } from '@/subjects/mechanics-of-solids/cores/sfd-bmd/types';
import { StaticEquilibriumDrawing } from '@/subjects/mechanics-of-solids/features/sfd-bmd/components/drawings/StaticEquilibriumDrawing';

/**
 * Slide 1: Cover Slide
 */
export const Slide1: React.FC<SlideProps> = (props) => (
  <LectureCover {...props} />
);

/**
 * Slide 2: Course Outcomes & Reference Materials
 */
export const Slide2: React.FC = () => {
  const outcomes = [
    { id: 4, description: 'Determine the shear force and bending moment for determinate beams.' },
    { id: 5, description: 'Determine the shear stress and bending stress of determinate beams of different shapes.' }
  ];

  const references = [
    {
      id: 1,
      title: 'Strength of Materials',
      author: 'Ferdinand L. Singer & Andrew Pytel',
      edition: '4th Edition',
      publisher: 'Harper & Row / UBS Publishers',
    },
    {
      id: 2,
      title: 'Mechanics of Materials',
      author: 'R.C. Hibbeler',
      edition: '10th Edition',
      publisher: 'Pearson',
    }
  ];

  return (
    <TwoColumnLayout
      title="Course Objectives & References"
      leftWidth="45%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-4">
          <div>
            <div className="flex items-center space-x-1.5 text-indigo-500 font-bold text-xs uppercase mb-1">
              <Layers className="h-4.5 w-4.5" />
              <span>Learning Roadmap</span>
            </div>
            <p className="text-xs text-muted-foreground">Active sessional targets for this session.</p>
          </div>
          <div className="flex-1">
            <HighlightableList
              items={outcomes}
              highlightedIds={[4, 5]}
              listTitle="Expected Capabilities:"
              highlightLabel="Session Focus"
            />
          </div>
          <div className="bg-slate-50 dark:bg-muted/10 p-2.5 rounded-xl border border-border/60 text-[10px] text-muted-foreground flex items-center gap-1.5">
            <Bookmark className="h-3.5 w-3.5 text-indigo-500 shrink-0" />
            <span>Syllabus CEE 0732 2131 Section 5 and 6 details.</span>
          </div>
        </div>
      }
      rightContent={
        <div className="flex flex-col h-full justify-between gap-4">
          <div>
            <div className="flex items-center space-x-1.5 text-slate-500 font-bold text-xs uppercase mb-1">
              <BookOpen className="h-4.5 w-4.5" />
              <span>Recommended Books</span>
            </div>
            <p className="text-xs text-muted-foreground">Prescribed readings & reference homework bases.</p>
          </div>
          <div className="flex-1 bg-slate-50/50 dark:bg-muted/5 p-4 rounded-xl border border-border/50">
            <ReferenceBooksList references={references} />
          </div>
        </div>
      }
    />
  );
};

/**
 * Slide 3: Prerequisite Check: Basics of Statics
 */
export const Slide3: React.FC = () => {
  const { currentClick } = useClickStepsContext();

  const steps = [
    { title: 'Isolate the Free Body', desc: 'Replace physical pin/roller supports at endpoints with vertical reaction forces $R_A$ and $R_B$.' },
    { title: 'Sum Vertical Forces', desc: 'Verify equilibrium: $\\Sigma F_y = 0 \\implies R_A + R_B - 20\\text{ kN} = 0$.' },
    { title: 'Sum Rotational Moments', desc: 'Moment balance at A: $\\Sigma M_A = 0 \\implies R_B \\times 8\\text{m} - 20\\text{ kN} \\times 4\\text{m} = 0$.' }
  ];

  // Solve the beam reactions dynamically using SFDBmdService
  const beam: IBeam = {
    length: 8,
    supports: [
      { id: 'A', type: 'hinge', position: 0 },
      { id: 'B', type: 'roller', position: 8 }
    ],
    releases: [],
    loads: [
      { id: 'load-1', type: 'point', position: 4, magnitude: 20 }
    ]
  };

  const solver = new SFDBmdService();
  const solvedBeam = solver.solve(beam);
  const reactionA = solvedBeam.reactions.find(r => r.supportId === 'A' && r.type === 'R_y')?.value ?? 0;
  const reactionB = solvedBeam.reactions.find(r => r.supportId === 'B' && r.type === 'R_y')?.value ?? 0;

  const showReactions = currentClick >= 1;
  const reactionsSolved = currentClick >= 3;

  return (
    <TwoColumnLayout
      title="Prerequisite: Static Equilibrium"
      leftWidth="55%"
      leftContent={
        <div className="bg-slate-50 dark:bg-slate-900/40 rounded-xl p-5 text-foreground flex flex-col justify-between h-full min-h-[300px] border border-border/80 shadow-xs">
          <div className="flex justify-between items-center text-[10px] font-mono text-muted-foreground uppercase">
            <span>Beam Reaction Workspace</span>
          </div>

          <StaticEquilibriumDrawing
            length={beam.length}
            loadMagnitude={beam.loads[0]?.magnitude ?? 20}
            showReactions={showReactions}
            resolvedReactions={reactionsSolved}
            reactionAValue={reactionA}
            reactionBValue={reactionB}
          />

          <div className="bg-slate-100 dark:bg-slate-950 p-2.5 rounded-lg border border-border/60 text-[10px] text-muted-foreground flex justify-between">
            <span>Symmetric Beam (DOI = 0)</span>
            <span className="font-mono text-indigo-500 dark:text-indigo-400">Length = 8.0m</span>
          </div>
        </div>
      }
      rightContent={
        <div className="flex flex-col justify-between h-full gap-4 text-left">
          <div className="space-y-2">
            <div className="flex items-center gap-1 text-muted-foreground text-xs uppercase font-bold">
              <Bookmark className="h-4 w-4 text-indigo-500" />
              <span>Static Verification Step List</span>
            </div>
            <div className="space-y-2">
              {steps.map((step, idx) => {
                const stepNum = idx + 1;
                const isRevealed = currentClick >= stepNum;
                return (
                  <div key={idx} className={`p-3 rounded-xl border transition-all duration-350 ${isRevealed ? 'bg-indigo-50/50 border-indigo-200 dark:bg-indigo-950/10' : 'bg-slate-50 border-border/60 opacity-60'}`}>
                    {/* Register this click step with the provider */}
                    <ClickHighlight at={stepNum} className="hidden">{' '}</ClickHighlight>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" checked={isRevealed} readOnly className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 h-3.5 w-3.5" />
                      <h4 className={`text-xs font-bold ${isRevealed ? 'text-primary' : 'text-foreground'}`}>{step.title}</h4>
                    </div>
                    {isRevealed && (
                      <p className="text-[10px] text-muted-foreground mt-1 ml-5 leading-normal animate-in fade-in slide-in-from-top-1 duration-200" dangerouslySetInnerHTML={{ __html: step.desc }} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="pt-3 border-t border-border/40">
            {currentClick < 3 ? (
              <div className="text-[10px] text-muted-foreground italic text-center p-2">
                Press [Next] or Space to advance statics calculations...
              </div>
            ) : (
              <ClickReveal at={3} preset="none">
                <div className="bg-emerald-50/50 dark:bg-emerald-950/10 border border-emerald-200/60 p-3 rounded-xl text-[10px] text-emerald-800 dark:text-emerald-400 flex flex-col gap-1">
                  <span className="font-bold text-xs text-emerald-900 dark:text-emerald-300">Equilibrium Satisfied!</span>
                  <div className="flex items-center gap-1 flex-wrap">
                    <span>Reaction values resolved symmetrically:</span>
                    <LatexFormula math={`R_A = R_B = ${reactionA}\\text{ kN}`} />
                  </div>
                  <p className="mt-0.5">Ready to execute cut sections.</p>
                </div>
              </ClickReveal>
            )}
          </div>
        </div>
      }
    />
  );
};

/**
 * Slide 4: Section Divider - Internal Stress Signatures
 */
export const Slide4: React.FC<SlideProps> = (props) => (
  <TopicDividerLayout
    {...props}
    topicNumber="Topic 02"
    title="Internal Forces & Structural Intuition"
    subtitle="Emergence of internal action vectors and physical flexion bending behaviors"
  />
);

/**
 * Slide 5: The Anatomy of Internal Forces
 */
export const Slide5: React.FC = () => {
  const forceProfiles = [
    { symbol: 'P', name: 'Axial Force', desc: 'Longitudinal centroids tension or compression states.', formula: '\\sigma = P/A', bg: 'border-l-4 border-l-blue-500 bg-blue-50/20 dark:bg-blue-950/5' },
    { symbol: 'V', name: 'Shear Force', desc: 'Transverse slice actions operating along cut faces.', formula: '\\tau = VQ/Ib', bg: 'border-l-4 border-l-rose-500 bg-rose-50/20 dark:bg-rose-950/5' },
    { symbol: 'M', name: 'Bending Moment', desc: 'Rotational bending moments deforming frame elements.', formula: '\\sigma = My/I', bg: 'border-l-4 border-l-indigo-500 bg-indigo-50/20 dark:bg-indigo-950/5' },
    { symbol: 'T', name: 'Torque', desc: 'Torsional twist mechanics deforming member coordinates.', formula: '\\tau = Tr/J', bg: 'border-l-4 border-l-amber-500 bg-amber-50/20 dark:bg-amber-950/5' }
  ];

  return (
    <div className="w-full h-full flex flex-col gap-4 text-left p-12 bg-background select-text">
      <div>
        <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest block mb-1">Stress Signatures</span>
        <h2 className="text-xl font-bold tracking-tight text-foreground">The Anatomy of Internal Forces</h2>
        <p className="text-xs text-muted-foreground">Action vectors produced within a beam subject to external loading.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-auto">
        {forceProfiles.map((f, i) => (
          <InteractiveCard key={i} className={`p-4 flex flex-col justify-between min-h-[160px] ${f.bg}`}>
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-lg font-mono font-black text-foreground">{f.symbol}</span>
                <span className="text-[8px] font-semibold border rounded-full px-2 py-0.5 uppercase tracking-wide opacity-80">Profile</span>
              </div>
              <h4 className="text-xs font-bold text-foreground mb-1">{f.name}</h4>
              <p className="text-[10px] text-muted-foreground leading-normal">{f.desc}</p>
            </div>
            <div className="mt-3 pt-2 border-t border-border/50 font-mono text-[9px] text-muted-foreground flex justify-between">
              <span>Formula:</span>
              <span className="font-bold text-primary"><LatexFormula math={f.formula} /></span>
            </div>
          </InteractiveCard>
        ))}
      </div>
      <div className="p-3 bg-muted/40 border border-border/60 rounded-xl text-[10px] text-muted-foreground flex items-center gap-2">
        <Info className="h-4 w-4 text-indigo-500 shrink-0" />
        <span><strong>Key Focus:</strong> For typical beam load profiles, we prioritize tracking <strong>Shear Force (V)</strong> and <strong>Bending Moment (M)</strong>.</span>
      </div>
    </div>
  );
};

/**
 * Slide 6: Physical Phenomenon of Bending
 */
export const Slide6: React.FC = () => {
  const tabs = [
    {
      title: 'Structural Wood Flexion',
      description: 'Loaded simply-supported beam showing linear deformation profiles.',
      badge: 'Simply Supported',
      badgeColor: 'border-blue-500/30 text-blue-500 bg-blue-50/10',
      rightContent: (
        <div className="w-full flex flex-col gap-3 text-left">
          <h4 className="text-xs font-bold text-foreground">Deflection & Fiber Strains</h4>
          <p className="text-[10px] text-muted-foreground leading-normal">
            When downward loads flex a simple beam span, the element deflects into a concave curve.
          </p>
          <div className="flex flex-col gap-2 p-3 bg-background rounded-lg border border-border/50">
            <SlideBullet icon={<span className="text-rose-500 font-bold font-mono">1</span>}>
              <strong>Top Fibers:</strong> Experience shortening or <strong>Compression</strong>.
            </SlideBullet>
            <SlideBullet icon={<span className="text-emerald-500 font-bold font-mono">2</span>}>
              <strong>Bottom Fibers:</strong> Experience elongation or <strong>Tension</strong>.
            </SlideBullet>
          </div>
        </div>
      )
    },
    {
      title: 'Natural Foliage Cantilever',
      description: 'Palm trees bending away from high-velocity wind vectors.',
      badge: 'Fixed End',
      badgeColor: 'border-amber-500/30 text-amber-500 bg-amber-50/10',
      rightContent: (
        <div className="w-full flex flex-col gap-3 text-left">
          <h4 className="text-xs font-bold text-foreground">Fixed Interaction Moment</h4>
          <p className="text-[10px] text-muted-foreground leading-normal">
            A palm tree trunk acts as a cantilever beam, fixed at the ground. Wind load bends it away from the vertical.
          </p>
          <div className="flex flex-col gap-2 p-3 bg-background rounded-lg border border-border/50">
            <SlideBullet icon={<span className="text-indigo-500 font-bold font-mono">3</span>}>
              <strong>Free Tip:</strong> Translates and rotates with maximum curvature profiles.
            </SlideBullet>
            <SlideBullet icon={<span className="text-rose-500 font-bold font-mono">4</span>}>
              <strong>Fixed Base:</strong> Develops high support moment interactions to counter shearing failures.
            </SlideBullet>
          </div>
        </div>
      )
    }
  ];

  return (
    <ClickSyncedTabs
      title="Bending Mechanics"
      leftTitle="FLEXION KINEMATICS"
      rightTitle="STRUCTURAL OVERVIEW"
      leftWidth="48%"
      items={tabs}
    />
  );
};
