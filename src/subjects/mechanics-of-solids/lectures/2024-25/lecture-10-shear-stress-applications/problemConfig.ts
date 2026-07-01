import { ICrossSection } from '@/subjects/mechanics-of-solids/cores/stress/stress.interface';
import { IBeam } from '@/subjects/mechanics-of-solids/cores/sfd-bmd/types';

export const problem2Config = {
  shape: {
    type: 'i-beam' as const,
    width: 0.1,                  // top flange width (100mm)
    widthBottom: 0.2,            // bottom flange width (200mm)
    height: 0.3,                 // total height (300mm)
    thicknessFlange: 0.05,       // top flange thickness (50mm)
    thicknessFlangeBottom: 0.05, // bottom flange thickness (50mm)
    thicknessWeb: 0.05,          // web thickness (50mm)
  } satisfies ICrossSection,
  V: 100000, // 100 kN in Newtons
};

export const problem3Config = {
  beam: {
    length: 3,
    supports: [
      { id: 's1', type: 'hinge' as const, position: 0 },
      { id: 's2', type: 'roller' as const, position: 3 },
    ],
    releases: [],
    loads: [
      { id: 'l1', type: 'udl' as const, startPosition: 0, endPosition: 3, magnitude: 10 },
    ],
  } satisfies IBeam,
  h_mm: 300,
  tau_allow: 1.0, // 1.0 MPa
};
