export type SupportType = 'roller' | 'hinge' | 'fixed';
export type ReleaseType = 'hinge' | 'roller';
export type LoadType = 'point' | 'udl' | 'uvl' | 'moment';

export interface ISupport {
  id: string;
  type: SupportType;
  position: number; // distance from left end in meters
}

export interface IInternalRelease {
  id: string;
  type: ReleaseType;
  position: number; // distance from left end in meters
}

export interface ILoad {
  id: string;
  type: LoadType;
  position?: number; // for point and moment
  startPosition?: number; // for UDL and UVL
  endPosition?: number; // for UDL and UVL
  magnitude?: number; // for point (kN), UDL (kN/m), moment (kNm)
  startMagnitude?: number; // for UVL (kN/m)
  endMagnitude?: number; // for UVL (kN/m)
}

export interface IBeam {
  length: number; // in meters
  supports: ISupport[];
  releases: IInternalRelease[];
  loads: ILoad[];
}

export interface IReaction {
  supportId: string;
  type: 'R_y' | 'R_x' | 'M';
  value: number; // positive is upwards for force, clockwise for moment
}

export interface IDOIResult {
  doi: number;
  reactionsCount: number;
  conditionsCount: number;
  isDeterminate: boolean;
  isIndeterminate: boolean;
  isUnstable: boolean;
  explanationSteps: string[];
}

export interface IIntervalEquation {
  startX: number;
  endX: number;
  // Shear equation: V(x) = a*x^2 + b*x + c
  vCoeffs: [number, number, number]; // [a, b, c]
  // Moment equation: M(x) = a*x^3 + b*x^2 + c*x + d
  mCoeffs: [number, number, number, number]; // [a, b, c, d]
  latexV: string;
  latexM: string;
}

export interface ICriticalPoint {
  x: number;
  v: number;
  m: number;
  isLocalMaxMinM: boolean;
  label?: string;
}

export interface ISolverOutput {
  success: boolean;
  doiResult: IDOIResult;
  reactions: IReaction[];
  intervals: IIntervalEquation[];
  criticalPoints: ICriticalPoint[];
  reactionSteps: string[];
  sectionSteps: string[];
  graphicalSteps: string[];
}
