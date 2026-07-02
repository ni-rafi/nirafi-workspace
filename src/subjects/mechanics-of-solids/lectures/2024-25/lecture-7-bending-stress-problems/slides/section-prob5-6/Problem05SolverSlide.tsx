import React from 'react';
import { ClickSyncedTabs } from '@/features/presentation/components/elements/ClickSyncedTabs';
import { useClickStepsContext } from '@/features/presentation/context/ClickStepsContext';
import { getProblem5SolverItems } from './problem5SolverData';

export const Problem05SolverSlide: React.FC = () => {
  const { currentClick } = useClickStepsContext();
  const items = getProblem5SolverItems(currentClick);

  return (
    <ClickSyncedTabs
      title="Problem 05: Composite Section Capacity Solver"
      items={items}
      leftTitle="Reinforcement Property Evaluations"
      rightTitle="Composite Output Visualizer"
      leftWidth="52%"
      visualizerHeight={185}
      clickToTabMap={[0, 0, 0, 1, 1, 1]}
      dense={true}
    />
  );
};

export default Problem05SolverSlide;
