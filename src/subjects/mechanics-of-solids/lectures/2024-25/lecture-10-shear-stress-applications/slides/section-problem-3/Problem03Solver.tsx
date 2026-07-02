import React from 'react';
import { ClickSyncedTabs } from '@/features/presentation/components/elements/ClickSyncedTabs';
import { useClickStepsContext } from '@/features/presentation/context/ClickStepsContext';
import { getProblem3SolverItems } from './problem3SolverData';

export const Problem03Solver: React.FC = () => {
  const { currentClick } = useClickStepsContext();
  const items = getProblem3SolverItems(currentClick);

  return (
    <ClickSyncedTabs
      title="Step-by-Step Design Sizing Solver"
      items={items}
      leftTitle="Sizing Beam Width step-by-step"
      rightTitle="Solver Output & Slice Visualizer"
      leftWidth="48%"
      visualizerHeight={220}
      clickToTabMap={[0, 0, 1, 1, 2, 3, 3]}
      dense={true}
    />
  );
};

export default Problem03Solver;
