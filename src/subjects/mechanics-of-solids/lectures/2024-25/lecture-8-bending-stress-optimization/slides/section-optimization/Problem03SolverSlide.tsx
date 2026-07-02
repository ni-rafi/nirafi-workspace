import React from 'react';
import { ClickSyncedTabs } from '@/features/presentation/components/elements/ClickSyncedTabs';
import { useClickStepsContext } from '@/features/presentation/context/ClickStepsContext';
import { getProblem3SolverItems } from './problem3SolverData';

export const Problem03SolverSlide: React.FC = () => {
  const { currentClick } = useClickStepsContext();
  const items = getProblem3SolverItems(currentClick);

  return (
    <ClickSyncedTabs
      title="Step-by-Step Taper Sizing & Calculus Optimization"
      items={items}
      leftTitle="Taper Proportions & Stress Setup"
      rightTitle="Solver Output & Stress Location"
      leftWidth="52%"
      visualizerHeight={185}
      clickToTabMap={[0, 0, 0, 1, 1, 1]}
      dense={true}
    />
  );
};

export default Problem03SolverSlide;
