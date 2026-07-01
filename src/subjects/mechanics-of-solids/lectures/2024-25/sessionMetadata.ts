import type { SessionMetadata } from '@/config/lectures';

export const sessionMetadata: SessionMetadata = {
  usnCode: '2026-1',
  session: '2024-25',
  topics: [
    {
      id: 'sfd-bmd',
      title: 'Shear Force & Bending Moment Diagrams',
      ccId: 'sfd-bmd',
    },
    {
      id: 'bending-stress',
      title: 'Bending Stress',
      ccId: 'bending-shear-stress',
    },
    {
      id: 'shearing-stress',
      title: 'Shearing Stress',
      ccId: 'bending-shear-stress',
    },
  ],
};
