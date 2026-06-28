import React from 'react';
import { renderDynamicStep } from './visualStepsBuilder';
import { IBeam, ISolverOutput } from '@/subjects/mechanics-of-solids/cores/sfd-bmd/types';

interface StepContentPanelProps {
  stepIndex: number;
  clickIdx: number;
  diagram: React.ReactNode;
  beam: IBeam;
  solverResult: ISolverOutput;
}

export const StepContentPanel: React.FC<StepContentPanelProps> = ({
  stepIndex,
  clickIdx,
  diagram,
  beam,
  solverResult,
}) => {
  return <>{renderDynamicStep(stepIndex, { clickIdx, diagram, beam, solverResult })}</>;
};
export default StepContentPanel;
