import { Point2D } from '../../building-drawing/types/geometry';

export interface EarthworkSpec {
  id: string;
  eglPoints: Point2D[];        // Surveyed existing ground level coordinate nodes (x, y)
  formationLevel: number;      // Target flat roadbed/trench base height (y)
  formationWidth: number;      // Width of the flat base carriage path
  sideSlopeCutRatio: number;   // Horizontal:Vertical ratio for cut side slopes (e.g. 1.5 for 1.5:1)
  sideSlopeFillRatio: number;  // Horizontal:Vertical ratio for fill side slopes (e.g. 2.0 for 2:1)
  workingSpaceAllowance?: number; // Side buffer width for foundation trenches (e.g. 500mm)
  isTrenchExcavation?: boolean; // Toggles vertical step trench outline vs. trapezoidal road cut/fill
}
