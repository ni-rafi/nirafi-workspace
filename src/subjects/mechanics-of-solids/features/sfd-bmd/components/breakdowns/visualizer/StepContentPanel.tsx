import React from 'react';
import { renderSfdStep } from './sfdStepContents';
import { renderBmdStep } from './bmdStepContents';
import { renderGeneralStep } from './generalStepContents';

interface StepContentPanelProps {
  stepIndex: number;
  clickIdx: number;
  diagram: React.ReactNode;
}

export const StepContentPanel: React.FC<StepContentPanelProps> = ({
  stepIndex,
  clickIdx,
  diagram,
}) => {
  if (stepIndex >= 3 && stepIndex <= 11) {
    return <>{renderSfdStep({ stepIndex, clickIdx, diagram })}</>;
  }

  if (stepIndex >= 14 && stepIndex <= 24) {
    return <>{renderBmdStep({ stepIndex, clickIdx, diagram })}</>;
  }

  return <>{renderGeneralStep({ stepIndex, clickIdx, diagram })}</>;
};
export default StepContentPanel;
