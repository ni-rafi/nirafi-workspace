import React from 'react';
import { IStructuralStep } from '../../../../cores/shared/types/step-protocol';
import { FemStepRenderer } from './FemStepRenderer';
import { DoiStepRenderer } from './DoiStepRenderer';
import { MatrixStepRenderer } from './MatrixStepRenderer';
import { MdmStepRenderer } from './MdmStepRenderer';
import { SdmStepRenderer } from './SdmStepRenderer';
import { ForceStepRenderer } from './ForceStepRenderer';

interface IndeterminateStepRendererProps {
  step: IStructuralStep;
}

export const IndeterminateStepRenderer: React.FC<IndeterminateStepRendererProps> = ({ step }) => {
  switch (step.type) {
    case 'CALCULATE_FEM':
      return <FemStepRenderer payload={step.payload} />;
    case 'DOI_KINEMATIC':
      return <DoiStepRenderer payload={step.payload} />;
    case 'MATRIX_SETUP':
      return <MatrixStepRenderer payload={step.payload} title="Global Stiffness Matrix Formulation" />;
    case 'MATRIX_INVERSION':
      return <MatrixStepRenderer payload={step.payload} title="Stiffness Matrix Inversion & Solution" />;
    case 'MDM_DF_SETUP':
    case 'MDM_CYCLE':
    case 'MDM_FINAL_MOMENTS':
      return <MdmStepRenderer type={step.type} payload={step.payload} />;
    case 'SDM_EQUATIONS_SETUP':
    case 'SDM_EQUILIBRIUM_SETUP':
      return <SdmStepRenderer type={step.type} payload={step.payload} />;
    case 'FORCE_PRIMARY_SETUP':
    case 'FORCE_COMPATIBILITY_SETUP':
      return <ForceStepRenderer type={step.type} payload={step.payload} />;
    default:
      return null;
  }
};
export default IndeterminateStepRenderer;
