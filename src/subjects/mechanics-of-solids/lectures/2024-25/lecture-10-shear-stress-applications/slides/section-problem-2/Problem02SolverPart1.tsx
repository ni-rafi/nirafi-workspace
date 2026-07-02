import React from 'react';
import { ClickSyncedTabs } from '@/features/presentation/components/elements/ClickSyncedTabs';
import { useClickStepsContext } from '@/features/presentation/context/ClickStepsContext';
// Let's import from problem2SolverData
import { getProblem2Part1Items as getItems } from './problem2SolverData';

export const Problem02SolverPart1: React.FC = () => {
  const { currentClick } = useClickStepsContext();
  const items = getItems(currentClick);

  return (
    <ClickSyncedTabs
      title="Step-by-Step Upper Section Solver"
      items={items}
      leftTitle="Solving Shear Stresses in Upper Section"
      rightTitle="Solver Output & Slice Visualizer"
      leftWidth="48%"
      visualizerHeight={195}
      clickToTabMap={[0, 0, 1, 1, 2, 2, 3, 3, 4, 4]}
      dense={true}
    />
  );
};

export default Problem02SolverPart1;
