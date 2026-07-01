import { ICrossSection } from '@/subjects/mechanics-of-solids/cores/stress/stress.interface';

export interface IProblemConfig {
  beam: {
    length?: number; // in meters (or feet)
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
    beam: {
      length: 4.0,
      supports: [
        { id: 'A', type: 'pin', position: 0.0 },
        { id: 'B', type: 'roller', position: 4.0 },
      ],
      loads: [
        { id: 'w', type: 'udl', startPosition: 0.0, endPosition: 4.0, magnitude: 4.5 },
      ],
    },
    section: {
      type: 'rectangular',
      width: 0.06,  // 60 mm
      height: 0.15, // 150 mm
    },
  },
  problem2: {
    beam: {
      length: 5.0,
      supports: [
        { id: 'A', type: 'pin', position: 0.0 },
        { id: 'B', type: 'roller', position: 5.0 },
      ],
      loads: [
        { id: 'w', type: 'udl', startPosition: 0.0, endPosition: 5.0, magnitude: 4.0 },
      ],
    },
    section: {
      type: 'rectangular',
      width: 0.06,  // 60 mm
    },
    limits: {
      compression: 35e6, // 35 MPa
      tension: 45e6,     // 45 MPa
    },
  },
  problem3: {
    beam: {}, // Pure section analysis under moment M
    section: {
      type: 'i-beam',
      width: 0.1,                 // top flange bf = 100mm
      height: 0.3,                // total depth h = 300mm
      thicknessFlange: 0.05,       // top flange tf = 50mm
      thicknessWeb: 0.05,          // web tw = 50mm
      widthBottom: 0.2,           // bottom flange bf_bottom = 200mm
      thicknessFlangeBottom: 0.05, // bottom flange tf_bottom = 50mm
    },
    limits: {
      tension: 40e6,
      compression: 40e6,
    },
  },
  problem4: {
    beam: {
      length: 16.0, // in feet
      loads: [
        { id: 'P1', type: 'point', position: 4.0, magnitude: 20 }, // 20 kips
        { id: 'P2', type: 'point', position: 12.0, magnitude: 12 }, // 12 kips
        { id: 'w', type: 'udl', startPosition: 0, endPosition: 16.0, magnitude: 1.5 }, // 1.5 kips/ft
      ],
    },
    section: {
      type: 'rectangular',
      width: 0.2, // dummy
      height: 0.3, // dummy
    },
  },
};
