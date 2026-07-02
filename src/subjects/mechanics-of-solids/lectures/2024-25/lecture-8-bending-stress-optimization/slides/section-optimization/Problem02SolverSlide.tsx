import React from 'react';
import { ClickSyncedTabs } from '@/features/presentation/components/elements/ClickSyncedTabs';
import { useClickStepsContext } from '@/features/presentation/context/ClickStepsContext';
import { getProblem2SolverItems } from './problem2SolverData';

export const Problem02SolverSlide: React.FC = () => {
  const { currentClick } = useClickStepsContext();
  const items = getProblem2SolverItems(currentClick);

  return (
    <ClickSyncedTabs
      title="Step-by-Step Capacity Evaluation & Limits Check"
      items={items}
      leftTitle="Section Geometry & Capacity Setup"
      rightTitle="Solver Output & Proportions"
      leftWidth="52%"
      visualizerHeight={185}
      clickToTabMap={[0, 0, 0, 1, 1, 1]}
      dense={true}
    />
  );
};

export default Problem02SolverSlide;
