export const beamConfig = {
  length: 4.45,
  supports: [
    { id: 'A', type: 'fixed' as const, position: 0 },
    { id: 'B', type: 'roller' as const, position: 4.45 }
  ],
  releases: [
    { id: 'E', type: 'hinge' as const, position: 3.45 }
  ],
  loads: [
    { id: 'w', type: 'udl' as const, startPosition: 0, endPosition: 3.45, magnitude: 2 },
    { id: 'P', type: 'point' as const, position: 3.95, magnitude: 5 }
  ],
  eiSegments: [{ id: 'ei-1', startPosition: 0, endPosition: 4.45, E: 200, I: 100 }]
};
