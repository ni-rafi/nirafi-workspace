import React from 'react';
import { ClickSyncedTabs } from '@/features/presentation/components/elements/ClickSyncedTabs';
import { useClickStepsContext } from '@/features/presentation/context/ClickStepsContext';
import { getProblem3SolverItems } from './problem3SolverData';

export const Problem03SolverSlide: React.FC = () => {
  const { currentClick } = useClickStepsContext();
  const items = getProblem3SolverItems(currentClick);

  return (
    <ClickSyncedTabs
      title="Problem 03: Orientation & Inversion Capacity Analysis"
      items={items}
      leftTitle="Solving Asymmetric Capacities"
      rightTitle="Solver Output & Dynamic View"
      leftWidth="52%"
      visualizerHeight={185}
      clickToTabMap={[0, 0, 0, 1, 1, 1]}
      dense={true}
    />
  );
};

export default Problem03SolverSlide;
