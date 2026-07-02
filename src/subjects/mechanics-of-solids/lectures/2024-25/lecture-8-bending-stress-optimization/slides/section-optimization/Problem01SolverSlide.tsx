import React from 'react';
import { ClickSyncedTabs } from '@/features/presentation/components/elements/ClickSyncedTabs';
import { useClickStepsContext } from '@/features/presentation/context/ClickStepsContext';
import { getProblem1SolverItems } from './problem1SolverData';

export const Problem01SolverSlide: React.FC = () => {
  const { currentClick } = useClickStepsContext();
  const items = getProblem1SolverItems(currentClick);

  return (
    <ClickSyncedTabs
      title="Step-by-Step Strength Optimization Solver"
      items={items}
      leftTitle="Log Proportions & Calculus Setup"
      rightTitle="Solver Output & Proportions"
      leftWidth="52%"
      visualizerHeight={185}
      clickToTabMap={[0, 0, 0, 1, 1, 1, 2, 2, 2]}
      dense={true}
    />
  );
};

export default Problem01SolverSlide;
