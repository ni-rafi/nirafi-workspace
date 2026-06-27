import React from 'react';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import { ClickReveal } from '@/features/presentation/components/elements';
import { AnalyticalProblemSolverVisualizer } from '@/subjects/mechanics-of-solids/features/sfd-bmd/components/breakdowns/AnalyticalProblemSolverVisualizer';
import { beamConfig } from '../../beamConfig';

export const Interval4L2: React.FC = () => {
  return (
    <FullWidthLayout title={<span>Section Method - Interval 4 (17 &le; x &le; 20 m)</span>}>
      <AnalyticalProblemSolverVisualizer beam={beamConfig} phase="sections" stepIndex={4} useRightSegment={true} />
      
      {/* 5-step click reveals */}
      <ClickReveal at={1} preset="none"><div className="hidden" /></ClickReveal>
      <ClickReveal at={2} preset="none"><div className="hidden" /></ClickReveal>
      <ClickReveal at={3} preset="none"><div className="hidden" /></ClickReveal>
      <ClickReveal at={4} preset="none"><div className="hidden" /></ClickReveal>
      <ClickReveal at={5} preset="none"><div className="hidden" /></ClickReveal>
    </FullWidthLayout>
  );
};

export default Interval4L2;
