import React from 'react';
import { GraphicalProblemSolverVisualizer } from '@/subjects/mechanics-of-solids/features/sfd-bmd/components/breakdowns/GraphicalProblemSolverVisualizer';
import { ClickReveal } from '@/features/presentation/components/elements';
import { IBeam } from '@/subjects/mechanics-of-solids/cores/sfd-bmd/types';

interface ProblemSolverStepProps {
  beam: IBeam;
  stepIndex: number;
  clickRevealCount: number;
}

export const ProblemSolverStep: React.FC<ProblemSolverStepProps> = ({
  beam,
  stepIndex,
  clickRevealCount,
}) => {
  return (
    <>
      {Array.from({ length: clickRevealCount }).map((_, idx) => (
        <ClickReveal key={idx} at={idx + 1} className="hidden">{' '}</ClickReveal>
      ))}
      <GraphicalProblemSolverVisualizer beam={beam} stepIndex={stepIndex} />
    </>
  );
};

export default ProblemSolverStep;
