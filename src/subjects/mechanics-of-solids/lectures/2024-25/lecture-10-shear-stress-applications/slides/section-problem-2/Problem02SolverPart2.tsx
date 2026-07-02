import React from 'react';
import { ClickSyncedTabs } from '@/features/presentation/components/elements/ClickSyncedTabs';
import { useClickStepsContext } from '@/features/presentation/context/ClickStepsContext';
import { getProblem2Part2Items as getItems } from './problem2SolverData';

export const Problem02SolverPart2: React.FC = () => {
  const { currentClick } = useClickStepsContext();
  const items = getItems(currentClick);

  return (
    <ClickSyncedTabs
      title="Step-by-Step Lower Section Solver"
      items={items}
      leftTitle="Solving Shear Stresses in Lower Section"
      rightTitle="Solver Output & Slice Visualizer"
      leftWidth="48%"
      visualizerHeight={195}
      clickToTabMap={[0, 0, 1, 1, 2, 2]}
      dense={true}
    />
  );
};

export default Problem02SolverPart2;
