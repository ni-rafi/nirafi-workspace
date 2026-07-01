import type { SessionMetadata } from '@/config/lectures';

export const sessionMetadata: SessionMetadata = {
  usnCode: '2025-2',
  session: '2023-24',
  topics: [
    {
      id: 'intro',
      title: 'Course Overview & Introduction',
      ccId: 'fundamentals',
    },
    {
      id: 'substructure',
      title: 'Estimation of Building Structure: Substructure',
      ccId: 'building-estimation',
    },
    {
      id: 'superstructure',
      title: 'Estimation of Building Structure: Superstructure',
      ccId: 'building-estimation',
    },
    {
      id: 'reinforcement',
      title: 'Estimation of Steel & RCC Elements',
      ccId: 'building-estimation',
    },
    {
      id: 'steel-element',
      title: 'Detail Estimation of Steel Structure',
      ccId: 'building-estimation',
    },
    {
      id: 'plumbing',
      title: 'Estimation of Plumbing and Drainage System',
      ccId: 'building-estimation',
    },
    {
      id: 'reservoir',
      title: 'Estimation of Water Reservoir and Septic Tank',
      ccId: 'building-estimation',
    },
    {
      id: 'roadway-earth',
      title: 'Estimation of Roadway: Earthwork',
      ccId: 'roadway',
    },
    {
      id: 'roadway',
      title: 'Estimation of Roadway: Pavements',
      ccId: 'roadway',
    },
    {
      id: 'budgeting',
      title: 'Contractor Progress Payments & Project Budgeting',
      ccId: 'building-estimation',
    },
  ],
};
