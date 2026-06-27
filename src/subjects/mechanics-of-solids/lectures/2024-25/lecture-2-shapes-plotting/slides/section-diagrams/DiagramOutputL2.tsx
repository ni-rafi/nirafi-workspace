import React from 'react';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import { AnalyticalProblemSolverVisualizer } from '@/subjects/mechanics-of-solids/features/sfd-bmd/components/breakdowns/AnalyticalProblemSolverVisualizer';
import { beamConfig } from '../../beamConfig';

export const DiagramOutputL2: React.FC = () => {
  return (
    <FullWidthLayout
      title={<span>SFD & BMD Final Solved Diagrams</span>}
    >
      <AnalyticalProblemSolverVisualizer beam={beamConfig} phase="diagrams" />
    </FullWidthLayout>
  );
};

export default DiagramOutputL2;
