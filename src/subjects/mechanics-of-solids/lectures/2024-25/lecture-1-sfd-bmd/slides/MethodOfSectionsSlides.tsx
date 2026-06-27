import React from 'react';
import { SlideProps } from '@/features/presentation/components/slides/SlideRenderer';
import { TopicDividerLayout } from '@/shared/layouts/TopicDividerLayout';
import { LectureThankYou } from '@/shared/layouts/LectureThankYou';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import { AnalyticalProblemSolverVisualizer } from '@/subjects/mechanics-of-solids/features/sfd-bmd/components/breakdowns/AnalyticalProblemSolverVisualizer';

/**
 * Common Beam Configuration JSON definition
 */
const beamConfig = {
  length: 16,
  supports: [
    { id: 'A', type: 'hinge' as const, position: 0 },
    { id: 'B', type: 'roller' as const, position: 16 }
  ],
  releases: [],
  loads: [
    { id: 'P', type: 'point' as const, position: 8, magnitude: 20 }
  ],
  eiSegments: [{ id: 'ei-1', startPosition: 0, endPosition: 16, E: 200, I: 100 }]
};

/**
 * Slide 17: Section Divider - Internal Equations Method
 */
export const Slide17: React.FC<SlideProps> = (props) => (
  <TopicDividerLayout
    {...props}
    topicNumber="Topic 04"
    title="Analytical Calculations: The Method of Sections"
    subtitle="Surfacing internal equations V(x) and M(x) by executing virtual cuts"
  />
);

/**
 * Slide 18: Problem 1 Setup
 */
export const Slide18: React.FC = () => {
  return (
    <FullWidthLayout
      title={<span>Method of Sections - Problem Setup</span>}
    >
      <AnalyticalProblemSolverVisualizer beam={beamConfig} phase="setup" />
    </FullWidthLayout>
  );
};

/**
 * Slide 19: Support Reaction Moment Equilibrium (Step 1)
 */
export const Slide19: React.FC<SlideProps> = () => {
  return (
    <FullWidthLayout
      title={<span>Support Reactions - Moment about Support A</span>}
    >
      <AnalyticalProblemSolverVisualizer beam={beamConfig} phase="reactions" stepIndex={0} />
      
      {/* 5-step reveals (Pivot/Reactions -> Load Arm -> Load Moment -> Reaction Arm/Eq -> Solved Value) */}
      <ClickReveal at={1} preset="none"><div className="hidden" /></ClickReveal>
      <ClickReveal at={2} preset="none"><div className="hidden" /></ClickReveal>
      <ClickReveal at={3} preset="none"><div className="hidden" /></ClickReveal>
      <ClickReveal at={4} preset="none"><div className="hidden" /></ClickReveal>
      <ClickReveal at={5} preset="none"><div className="hidden" /></ClickReveal>
    </FullWidthLayout>
  );
};

/**
 * Slide 20: Support Reaction Vertical equilibrium (Step 2)
 */
export const Slide20: React.FC<SlideProps> = () => {
  return (
    <FullWidthLayout
      title={<span>Support Reactions - Vertical Force Summation</span>}
    >
      <AnalyticalProblemSolverVisualizer beam={beamConfig} phase="reactions" stepIndex={1} />
      
      {/* 3-step reveals (Reactions/Load -> Equation LHS=RHS -> Solved values summary) */}
      <ClickReveal at={1} preset="none"><div className="hidden" /></ClickReveal>
      <ClickReveal at={2} preset="none"><div className="hidden" /></ClickReveal>
      <ClickReveal at={3} preset="none"><div className="hidden" /></ClickReveal>
    </FullWidthLayout>
  );
};

/**
 * Slide 21: Support Reactions Solved (Step 3)
 */
export const Slide21: React.FC = () => {
  return (
    <FullWidthLayout
      title={<span>Support Reactions Solved</span>}
    >
      <AnalyticalProblemSolverVisualizer beam={beamConfig} phase="reactions" stepIndex={2} />
    </FullWidthLayout>
  );
};

/**
 * Slide 22: Zone 1 Analysis (0 <= x < 8m) (Step 2 of Sections)
 */
import { ClickReveal } from '@/features/presentation/components/elements';

const SectionsSlidesManager: React.FC<SlideProps> = ({ slideNo }) => {
  const isInterval2 = slideNo === 23;
  const stepIndex = isInterval2 ? 2 : 1;
  const title = isInterval2 
    ? <span>Section Method - Interval 2 (8 &le; x &le; 16 m)</span>
    : <span>Section Method - Interval 1 (0 &le; x &le; 8 m)</span>;

  return (
    <FullWidthLayout title={title}>
      <AnalyticalProblemSolverVisualizer beam={beamConfig} phase="sections" stepIndex={stepIndex} />
      
      {/* 5-step click reveals (Cut -> Shear Arm/Label -> Shear Card -> Moment Arc/Label -> Moment Card) */}
      <ClickReveal at={1} preset="none"><div className="hidden" /></ClickReveal>
      <ClickReveal at={2} preset="none"><div className="hidden" /></ClickReveal>
      <ClickReveal at={3} preset="none"><div className="hidden" /></ClickReveal>
      <ClickReveal at={4} preset="none"><div className="hidden" /></ClickReveal>
      <ClickReveal at={5} preset="none"><div className="hidden" /></ClickReveal>
    </FullWidthLayout>
  );
};

export const Slide22 = SectionsSlidesManager;
export const Slide23 = SectionsSlidesManager;

/**
 * Slide 24: Piecewise Consolidation & Diagram Preview
 */
export const Slide24: React.FC = () => {
  return (
    <FullWidthLayout
      title={<span>Differential Relationships - Consolidation</span>}
    >
      <AnalyticalProblemSolverVisualizer beam={beamConfig} phase="consolidation" />
    </FullWidthLayout>
  );
};

/**
 * Slide 25: Shear Force & Bending Moment Diagrams
 */
export const Slide25: React.FC = () => {
  return (
    <FullWidthLayout
      title={<span>Shear Force & Bending Moment Diagrams</span>}
    >
      <AnalyticalProblemSolverVisualizer beam={beamConfig} phase="diagrams" />
    </FullWidthLayout>
  );
};

/**
 * Slide 26: Concluding Slide
 */
export const Slide26: React.FC<SlideProps> = (props) => (
  <LectureThankYou
    {...props}
    subtitle="Questions on Course Syllabus & Loading Matrix?"
  />
);
