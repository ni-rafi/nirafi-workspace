import { IBeam } from '@/subjects/mechanics-of-solids/cores/sfd-bmd/types';

export const question1Config: IBeam = {
  length: 9.0,
  supports: [
    { id: 'A', type: 'hinge', position: 0 },
    { id: 'B', type: 'roller', position: 3.0 },
    { id: 'D', type: 'roller', position: 9.0 }
  ],
  releases: [
    { id: 'C', type: 'hinge', position: 6.0 }
  ],
  loads: [
    { id: 'w1', type: 'udl', startPosition: 0, endPosition: 6.0, magnitude: 3.0 },
    { id: 'P1', type: 'point', position: 7.5, magnitude: 5.0 }
  ]
};

export const question2Config: IBeam = {
  length: 6.0,
  supports: [
    { id: 'A', type: 'hinge', position: 0 },
    { id: 'B', type: 'roller', position: 6.0 }
  ],
  releases: [],
  loads: [
    { id: 'P1', type: 'point', position: 2.0, magnitude: 10.0 },
    { id: 'P2', type: 'point', position: 4.0, magnitude: 10.0 },
    { id: 'M1', type: 'moment', position: 6.0, magnitude: -15.0 } // Negative moment is clockwise reaction-balancing load
  ]
};
