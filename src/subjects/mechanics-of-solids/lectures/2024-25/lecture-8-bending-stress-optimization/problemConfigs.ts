import { ICrossSection } from '@/subjects/mechanics-of-solids/cores/stress/stress.interface';

export interface IProblemConfig {
  beam: {
    length?: number; // in meters
    supports?: Array<{ id: string; type: 'fixed' | 'roller' | 'pin'; position: number }>;
    loads?: Array<{
      id: string;
      type: 'udl' | 'point';
      startPosition?: number;
      endPosition?: number;
      position?: number;
      magnitude: number;
    }>;
  };
  section: ICrossSection;
  limits?: {
    tension: number; // in Pa
    compression: number; // in Pa
  };
}

export const problemConfigs: Record<string, IProblemConfig> = {
  problem1: {
    beam: {}, // Pure geometric optimization
    section: {
      type: 'circular',
      diameter: 0.3, // 300 mm log diameter D
    },
  },
  problem2: {
    beam: {
      length: 6.0,
      supports: [
        { id: 'A', type: 'pin', position: 0.0 },
        { id: 'B', type: 'roller', position: 6.0 },
      ],
    },
    section: {
      type: 'i-beam',
      width: 0.08,                // top flange bf = 80mm
      height: 0.26,               // total depth d = 260mm
      thicknessFlange: 0.02,       // top flange tf = 20mm
      thicknessWeb: 0.02,          // web tw = 20mm
      widthBottom: 0.16,          // bottom flange bf_bottom = 160mm
      thicknessFlangeBottom: 0.04, // bottom flange tf_bottom = 40mm
    },
    limits: {
      tension: 30e6,      // 30 MPa
      compression: 90e6,  // 90 MPa
    },
  },
};
