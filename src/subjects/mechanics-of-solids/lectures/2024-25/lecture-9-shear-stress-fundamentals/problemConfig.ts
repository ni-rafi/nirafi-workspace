import { ICrossSection } from '@/subjects/mechanics-of-solids/cores/stress/stress.interface';

export const problem1Config = {
  shape: {
    type: 'rectangular' as const,
    width: 0.1,  // 100 mm in meters
    height: 0.3, // 300 mm in meters
  } satisfies ICrossSection,
  V: 60000, // 60 kN in Newtons
};
