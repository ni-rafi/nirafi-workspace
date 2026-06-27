import React from 'react';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import { AnalyticalProblemSolverVisualizer } from '@/subjects/mechanics-of-solids/features/sfd-bmd/components/breakdowns/AnalyticalProblemSolverVisualizer';
import { beamConfig } from '../../beamConfig';

export const ProblemSetupL2: React.FC = () => {
  return (
    <FullWidthLayout
      title={<span>Problem 2 Setup</span>}
    >
      <AnalyticalProblemSolverVisualizer beam={beamConfig} phase="setup" />
    </FullWidthLayout>
  );
};

export default ProblemSetupL2;
