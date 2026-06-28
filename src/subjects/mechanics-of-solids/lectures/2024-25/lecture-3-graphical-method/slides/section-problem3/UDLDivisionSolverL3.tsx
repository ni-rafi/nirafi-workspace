import React from 'react';
import { GraphicalProblemSolverVisualizer } from '@/subjects/mechanics-of-solids/features/sfd-bmd/components/breakdowns/GraphicalProblemSolverVisualizer';
import { ClickReveal } from '@/features/presentation/components/elements';
import { beamConfig } from '../../beamConfig';

export const UDLDivisionSolverL3: React.FC = () => (
  <>
    <ClickReveal at={1} className="hidden">{' '}</ClickReveal>
    <ClickReveal at={2} className="hidden">{' '}</ClickReveal>
    <GraphicalProblemSolverVisualizer beam={beamConfig} stepIndex={15} />
  </>
);
