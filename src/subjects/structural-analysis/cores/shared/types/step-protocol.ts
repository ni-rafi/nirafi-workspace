import { IAnalysisStep } from '@/cores/shared/types/step-protocol';

export type StepType = 
  | 'CALCULATE_FEM' 
  | 'MATRIX_SETUP' 
  | 'MATRIX_INVERSION' 
  | 'DOI_KINEMATIC'
  | 'MEMBER_STIFFNESS_SETUP';

export interface IFemPayload {
  memberId: string;
  loadType: 'POINT_CENTER' | 'POINT_ANY' | 'UDL_FULL' | 'UDL_PARTIAL' | 'SETTLEMENT';
  variables: {
    w?: number;
    P?: number;
    a?: number;
    b?: number;
    u?: number;
    v?: number;
    L: number;
    E?: number;
    I?: number;
    delta?: number;
  };
  results: {
    M_ab: number;
    M_ba: number;
  };
}

export interface IMemberStiffnessPayload {
  memberId: string;
  localMatrix: number[][];
  transformationMatrix: number[][];
  globalMatrix: number[][];
  dofMap: number[];
}

export interface IMatrixPayload {
  matrix: number[][];
  vectorF: number[];
  vectorD?: number[];
  labels?: string[];
}

export interface IDoiPayload {
  dki: number;
  nodesCount: number;
  restraintsCount: number;
  swayDegrees: number;
  rotationalDegrees: number;
  details: string[];
}

export type ICalculateFemStep = IAnalysisStep<'CALCULATE_FEM', IFemPayload>;
export type IMemberStiffnessStep = IAnalysisStep<'MEMBER_STIFFNESS_SETUP', IMemberStiffnessPayload>;
export type IMatrixSetupStep = IAnalysisStep<'MATRIX_SETUP', IMatrixPayload>;
export type IMatrixInversionStep = IAnalysisStep<'MATRIX_INVERSION', IMatrixPayload>;
export type IDoiKinematicStep = IAnalysisStep<'DOI_KINEMATIC', IDoiPayload>;

export type IStructuralStep = 
  | ICalculateFemStep 
  | IMemberStiffnessStep
  | IMatrixSetupStep 
  | IMatrixInversionStep 
  | IDoiKinematicStep;
