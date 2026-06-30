import { IBeam } from '@/subjects/mechanics-of-solids/cores/sfd-bmd/types';

export const problem1Config: IBeam = {
  length: 7.5,
  supports: [
    { id: 'A', type: 'fixed', position: 0 },
    { id: 'C', type: 'roller', position: 7.5 }
  ],
  releases: [
    { id: 'B', type: 'hinge', position: 4.5 }
  ],
  loads: [
    { id: 'w1', type: 'uvl', startPosition: 0, endPosition: 4.5, startMagnitude: 0, endMagnitude: 3 },
    { id: 'P1', type: 'point', position: 6.0, magnitude: 15 }
  ]
};

export const problem2Config: IBeam = {
  length: 6.0,
  supports: [
    { id: 'A', type: 'hinge', position: 0 },
    { id: 'B', type: 'roller', position: 6.0 }
  ],
  releases: [],
  loads: [
    { id: 'w2', type: 'uvl', startPosition: 0, endPosition: 6.0, startMagnitude: 2.0, endMagnitude: 0.8 }
  ]
};

export const problem3Config: IBeam = {
  length: 12.0,
  supports: [
    { id: 'A', type: 'hinge', position: 0 },
    { id: 'C', type: 'roller', position: 8.0 },
    { id: 'D', type: 'roller', position: 12.0 }
  ],
  releases: [
    { id: 'B', type: 'hinge', position: 6.0 }
  ],
  loads: [
    { id: 'w3', type: 'uvl', startPosition: 0, endPosition: 6.0, startMagnitude: 6.0, endMagnitude: 0 },
    { id: 'P3', type: 'point', position: 6.0, magnitude: 6 },
    { id: 'w4', type: 'udl', startPosition: 8.0, endPosition: 12.0, magnitude: 8 }
  ]
};
