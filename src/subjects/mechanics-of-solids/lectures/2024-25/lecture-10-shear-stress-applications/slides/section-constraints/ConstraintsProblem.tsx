import React from 'react';
import { ClickSyncedTabs } from '@/features/presentation/components/elements/ClickSyncedTabs';
import { useClickStepsContext } from '@/features/presentation/context/ClickStepsContext';
import { getConstraintsSolverItems } from './constraintsSolverData';

export const ConstraintsProblem: React.FC = () => {
  const { currentClick } = useClickStepsContext();
  const items = getConstraintsSolverItems(currentClick);

  return (
    <ClickSyncedTabs
      title="Interdependent Bending-Shear Optimization"
      items={items}
      leftTitle="Bending-Shear Stress Optimization"
      rightTitle="Solver Output & Slice Visualizer"
      leftWidth="40%"
      visualizerHeight={220}
      clickToTabMap={[0, 0, 1, 1]}
      dense={true}
    />
  );
};

export default ConstraintsProblem;
