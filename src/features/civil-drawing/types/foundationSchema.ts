import { Point2D } from '../../building-drawing/types/geometry';

export interface PileRebarDetails {
  barDiameter: number; // in mm
  barCount: number;
  helixDiameter: number; // stirrups/helix in mm
  helixSpacing: number; // spacing in mm
}

export interface CapRebarDetails {
  bottomMeshDiameter: number; // in mm
  bottomMeshSpacing: number;  // in mm
  topMeshDiameter?: number;
  topMeshSpacing?: number;
  showTopMesh?: boolean;
  starterBarCount?: number;
  starterBarDiameter?: number; // L-bars
}

export interface SoilLayer {
  depth: number;      // thickness of layer in mm or meters
  label: string;      // e.g. "Soft Clay"
  colorClass: string; // CSS style class
}

export interface FoundationSpec {
  id: string;
  pileCount: number;
  pileDiameter: number; // D in mm
  pileDepth: number;    // shaft length in mm
  capWidth: number;     // B in mm
  capDepth: number;     // H in mm
  clearCover: number;   // clear cover in mm
  spacingFactor?: number; // e.g. 2.5 (spacing = 2.5 * pileDiameter)
  customPilePositions?: Point2D[]; // Optional coordinate override offsets
  pileRebar?: PileRebarDetails;
  capRebar?: CapRebarDetails;
  soilLayers: SoilLayer[];
}
