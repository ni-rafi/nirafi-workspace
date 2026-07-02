import React from 'react';
import { ClickSyncedTabs } from '@/features/presentation/components/elements/ClickSyncedTabs';
import { useClickStepsContext } from '@/features/presentation/context/ClickStepsContext';
import { getCompoundSectionSolverItems } from './compoundSectionSolverData';

export const CompoundSectionSlide: React.FC = () => {
  const { currentClick } = useClickStepsContext();
  const items = getCompoundSectionSolverItems(currentClick);

  return (
    <ClickSyncedTabs
      title="Compound Asymmetric Section Profile Frame"
      items={items}
      leftTitle="Centroid & Inertia Steps"
      rightTitle="Component Visualizer & Highlights"
      leftWidth="50%"
      visualizerHeight={250}
      clickToTabMap={[0, 0, 0, 1, 1, 1, 2, 2, 3, 3, 3, 4, 4, 4]}
      dense={true}
    />
  );
};

export default CompoundSectionSlide;
