import React from 'react';
import { SlideProps } from '@/features/presentation/components/slides/SlideRenderer';
import {
  Slide1,
  Slide2,
  Slide3,
  Slide4,
  Slide5,
  Slide6
} from './slides/PavementSlides';
import {
  Slide7,
  Slide8,
  Slide9,
  Slide10
} from './slides/RetainingWallSlides';
import {
  Slide11,
  Slide12,
  Slide13,
  Slide14
} from './slides/CulvertSlides';
import {
  Slide15,
  Slide16,
  Slide17
} from './slides/RulesAndQuizzes';

export const slides: Record<number, React.ComponentType<SlideProps>> = {
  1: Slide1,
  2: Slide2,
  3: Slide3,
  4: Slide4,
  5: Slide5,
  6: Slide6,
  7: Slide7,
  8: Slide8,
  9: Slide9,
  10: Slide10,
  11: Slide11,
  12: Slide12,
  13: Slide13,
  14: Slide14,
  15: Slide15,
  16: Slide16,
  17: Slide17,
};

export const slideMetadata: Record<
  number,
  import('@/features/presentation/components/slides/SlideRenderer').SlideMetadata
> = {
  1: { title: 'Estimation of Roadway: Pavements, Retaining Wall & Culvert', type: 'Cover Slide', section: 'Introduction' },
  2: { title: 'Flexible Road Pavements Divider', type: 'Cover Slide', section: 'Flexible Road Pavements' },
  3: { title: 'Pavement Stratification', type: 'Concept Details', section: 'Flexible Road Pavements' },
  4: { title: 'Volumetric Layering Rule & Compaction', type: 'Concept Details', section: 'Flexible Road Pavements' },
  5: { title: 'Bituminous Carpeting & Seal Coat', type: 'Concept Details', section: 'Flexible Road Pavements' },
  6: { title: 'Pavement Volumetric Sandbox', type: 'Live Sandbox', section: 'Flexible Road Pavements' },
  7: { title: 'Retaining Wall Divider', type: 'Cover Slide', section: 'Retaining Wall' },
  8: { title: 'Retaining Wall Geometry', type: 'Concept Details', section: 'Retaining Wall' },
  9: { title: 'Drainage Systems & Backfill', type: 'Concept Details', section: 'Retaining Wall' },
  10: { title: 'Retaining Wall Sandbox', type: 'Live Sandbox', section: 'Retaining Wall' },
  11: { title: 'Box & Pipe Culverts Divider', type: 'Cover Slide', section: 'Box & Pipe Culverts' },
  12: { title: 'RCC Box Culvert & Void Deductions', type: 'Concept Details', section: 'Box & Pipe Culverts' },
  13: { title: 'Hume Pipe Culverts & Cradle Bedding', type: 'Concept Details', section: 'Box & Pipe Culverts' },
  14: { title: 'Culvert Quantity Sandbox', type: 'Live Sandbox', section: 'Box & Pipe Culverts' },
  15: { title: 'Pavement Volume Checkpoint', type: 'Concept Details', section: 'Quizzes', quizId: 'qs_2023_lec9_q1' },
  16: { title: 'Culvert Concrete Checkpoint', type: 'Concept Details', section: 'Quizzes', quizId: 'qs_2023_lec9_q2' },
  17: { title: 'Conclusion', type: 'Thank You Slide', section: 'Conclusion' },
};
