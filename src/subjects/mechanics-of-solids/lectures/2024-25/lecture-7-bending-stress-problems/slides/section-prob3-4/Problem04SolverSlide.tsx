import React from 'react';
import { ClickSyncedTabs } from '@/features/presentation/components/elements/ClickSyncedTabs';
import { useClickStepsContext } from '@/features/presentation/context/ClickStepsContext';
import { getProblem4SolverItems } from './problem4SolverData';

export const Problem04SolverSlide: React.FC = () => {
  const { currentClick } = useClickStepsContext();
  const items = getProblem4SolverItems(currentClick);

  return (
    <ClickSyncedTabs
      title="Problem 04: Continuous Beam & Moment Solver"
      items={items}
      leftTitle="Beam Diagrams & Explanations"
      rightTitle="Continuous Loading Visualizer"
      leftWidth="50%"
      visualizerHeight={190}
      clickToTabMap={[0, 0, 0, 1, 1, 2, 2, 3, 3]}
      dense={true}
    />
  );
};

export default Problem04SolverSlide;
