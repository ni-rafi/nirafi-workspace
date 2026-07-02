import { IBeam } from '@/subjects/mechanics-of-solids/cores/sfd-bmd/types';

export const question1Config: IBeam = {
  length: 8.0,
  supports: [
    { id: 'A', type: 'roller', position: 2.0 },
    { id: 'B', type: 'roller', position: 6.0 }
  ],
  releases: [],
  loads: [
    { id: 'w1', type: 'udl', startPosition: 0, endPosition: 2.0, magnitude: 12.0 },
    { id: 'M1', type: 'moment', position: 4.0, magnitude: -24.0 },
    { id: 'P1', type: 'point', position: 8.0, magnitude: 12.0 }
  ]
};

export const question2Config: IBeam = {
  length: 4.0,
  supports: [
    { id: 'A', type: 'fixed', position: 0 }
  ],
  releases: [],
  loads: [
    { id: 'P1', type: 'point', position: 2.0, magnitude: 8.0 },
    { id: 'P2', type: 'point', position: 4.0, magnitude: 3.0 }
  ]
};

export const question4Config: IBeam = {
  length: 5.0,
  supports: [
    { id: 'B', type: 'fixed', position: 5.0 }
  ],
  releases: [],
  loads: [
    { id: 'w1', type: 'udl', startPosition: 0, endPosition: 2.0, magnitude: 5.0 },
    { id: 'M1', type: 'moment', position: 4.0, magnitude: -60.0 }
  ]
};

export const question5Config: IBeam = {
  length: 6.0,
  supports: [
    { id: 'A', type: 'hinge', position: 0 },
    { id: 'B', type: 'roller', position: 6.0 }
  ],
  releases: [],
  loads: [
    { id: 'w1', type: 'uvl', startPosition: 0, endPosition: 3.0, startMagnitude: 0, endMagnitude: 6.0 },
    { id: 'P1', type: 'point', position: 4.5, magnitude: 6.0 }
  ]
};
