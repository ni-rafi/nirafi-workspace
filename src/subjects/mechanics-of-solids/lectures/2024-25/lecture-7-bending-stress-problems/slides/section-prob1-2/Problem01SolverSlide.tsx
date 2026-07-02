import React from 'react';
import { ClickSyncedTabs, ClickHighlight } from '@/features/presentation/components/elements';
import { useClickStepsContext } from '@/features/presentation/context/ClickStepsContext';
import { getProblem1SolverItems } from './problem1SolverData';

export const Problem01SolverSlide: React.FC = () => {
  const { currentClick } = useClickStepsContext();
  const items = getProblem1SolverItems(currentClick);

  return (
    <>
      <ClickHighlight at={10} className="hidden">{' '}</ClickHighlight>
      <ClickHighlight at={11} className="hidden">{' '}</ClickHighlight>
      <ClickHighlight at={12} className="hidden">{' '}</ClickHighlight>
      <ClickSyncedTabs
        title="Step-by-Step Stress Calculation Solver"
        items={items}
        leftTitle="Solving Stress Components"
        rightTitle="Solver Output & Slice Visualizer"
        leftWidth="50%"
        visualizerHeight={185}
        clickToTabMap={[0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 3]}
        dense={true}
      />
    </>
  );
};

export default Problem01SolverSlide;
