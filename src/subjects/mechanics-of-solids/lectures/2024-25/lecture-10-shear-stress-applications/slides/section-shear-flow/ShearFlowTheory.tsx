import React from 'react';
import { ClickSyncedTabs } from '@/features/presentation/components/elements/ClickSyncedTabs';
import { useClickStepsContext } from '@/features/presentation/context/ClickStepsContext';
import { getShearFlowTheoryItems } from './shearFlowTheoryData';

export const ShearFlowTheory: React.FC = () => {
  const { currentClick } = useClickStepsContext();
  const items = getShearFlowTheoryItems(currentClick);

  return (
    <ClickSyncedTabs
      title="Shear Flow & Fastener Spacing Theory"
      items={items}
      leftTitle="The Mechanics of Shear Flow"
      rightTitle="Solver Output & Slice Visualizer"
      leftWidth="48%"
      visualizerHeight={220}
      clickToTabMap={[0, 1, 1, 2, 2]}
      dense={true}
    />
  );
};

export default ShearFlowTheory;
