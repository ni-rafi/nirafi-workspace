import React from 'react';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import { AnalyticalProblemSolverVisualizer } from '@/subjects/mechanics-of-solids/features/sfd-bmd/components/breakdowns/AnalyticalProblemSolverVisualizer';
import { beamConfig } from '../../beamConfig';

export const ReactionsSolvedL2: React.FC = () => {
  return (
    <FullWidthLayout
      title={<span>Support Reactions Solved</span>}
    >
      <AnalyticalProblemSolverVisualizer beam={beamConfig} phase="reactions" stepIndex={2} />
    </FullWidthLayout>
  );
};

export default ReactionsSolvedL2;
