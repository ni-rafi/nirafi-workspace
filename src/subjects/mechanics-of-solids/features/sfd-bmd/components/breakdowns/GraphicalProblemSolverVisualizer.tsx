import React, { useContext, useState, useEffect } from 'react';
import { IBeam } from '@/subjects/mechanics-of-solids/cores/sfd-bmd/types';
import { SFDBmdService } from '@/subjects/mechanics-of-solids/cores/sfd-bmd/sfdBmdService';
import { PresentationContext } from '@/features/presentation/context/PresentationContext';
import { useClickStepsContext } from '@/features/presentation/context/ClickStepsContext';
import { getLastStep, setLastStep } from './persistentStepStore';
import { GraphicalStackedDiagrams } from './visualizer/GraphicalStackedDiagrams';
import { StepContentPanel } from './visualizer/StepContentPanel';

export interface GraphicalProblemSolverVisualizerProps {
  beam: IBeam;
  stepIndex: number;
}

export const GraphicalProblemSolverVisualizer: React.FC<GraphicalProblemSolverVisualizerProps> = ({
  beam,
  stepIndex,
}) => {
  const solver = React.useMemo(() => new SFDBmdService(), []);
  const solverResult = React.useMemo(() => solver.solve(beam), [solver, beam]);
  const presentation = useContext(PresentationContext);
  const clickContext = useClickStepsContext();
  
  const viewMode = presentation?.viewMode || 'present';
  const isScrollOrBlog = viewMode === 'scroll' || viewMode === 'blog';
  const currentClick = clickContext?.currentClick ?? 0;
  const clickIdx = isScrollOrBlog ? 99 : currentClick;

  const [displayedStep, setDisplayedStep] = useState<number>(() => {
    if (isScrollOrBlog) return stepIndex;
    const lastStep = getLastStep();
    if (Math.abs(lastStep - stepIndex) <= 1) {
      return lastStep;
    }
    return stepIndex;
  });

  useEffect(() => {
    if (isScrollOrBlog) {
      setDisplayedStep(stepIndex);
      return;
    }

    const lastStep = getLastStep();
    if (Math.abs(lastStep - stepIndex) > 1) {
      setDisplayedStep(stepIndex);
      setLastStep(stepIndex);
      return;
    }

    if (stepIndex < displayedStep) {
      setDisplayedStep(stepIndex);
      setLastStep(stepIndex);
      return;
    }

    const timer = setTimeout(() => {
      setDisplayedStep(stepIndex);
      setLastStep(stepIndex);
    }, 150);

    return () => {
      clearTimeout(timer);
    };
  }, [stepIndex, isScrollOrBlog]);

  if (!solverResult.success) {
    return (
      <div className="p-4 text-red-500 border border-red-500/20 bg-red-500/5 rounded-xl text-xs font-mono">
        Solver failed to compute reactions. Please verify your beam loading configurations.
      </div>
    );
  }

  // Determine pairing mode
  let pairing: 'beam' | 'beam-sfd' | 'sfd-bmd' | 'all' = 'beam';
  if (stepIndex >= 0 && stepIndex <= 2) {
    pairing = 'beam';
  } else if (stepIndex >= 3 && stepIndex <= 18) {
    pairing = 'beam-sfd';
  } else if ((stepIndex >= 19 && stepIndex <= 23) || (stepIndex >= 25 && stepIndex <= 31)) {
    pairing = 'sfd-bmd';
  } else {
    pairing = 'all';
  }

  const diagram = (
    <GraphicalStackedDiagrams
      pairing={pairing}
      stepIndex={stepIndex}
      displayedStep={displayedStep}
      clickIdx={clickIdx}
      beam={beam}
      solverResult={solverResult}
    />
  );

  return (
    <div className="w-full h-full select-none animate-in fade-in duration-300">
      <StepContentPanel
        stepIndex={stepIndex}
        clickIdx={clickIdx}
        diagram={diagram}
        beam={beam}
        solverResult={solverResult}
      />
    </div>
  );
};

export default GraphicalProblemSolverVisualizer;
