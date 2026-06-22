import React from 'react';
import { SlideProps } from '@/features/presentation/components/slides/SlideRenderer';

import { Slide1, Slide2, Slide3, Slide4 } from './slides/OverviewSlides';
import { Slide5, Slide6, Slide7 } from './slides/RccSlides';
import { Slide8, Slide9, Slide10 } from './slides/MasonrySlides';
import { Slide11, Slide12, Slide13 } from './slides/DeductionSlides';
import { Slide14, Slide15, Slide16 } from './slides/FinishSlides';
import { Slide17, Slide18, Slide19 } from './slides/StudioSlides';

import { LectureThankYou } from '@/shared/layouts/LectureThankYou';

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
  18: Slide18,
  19: Slide19,
  20: (props) => <LectureThankYou {...props} />,
};

export const slideMetadata: Record<
  number,
  import('@/features/presentation/components/slides/SlideRenderer').SlideMetadata
> = {
  1: { title: 'Superstructure Overview', type: 'Cover Slide', section: 'Introduction' },
  2: { title: 'Defining Superstructure', type: 'Concept Details', section: 'Introduction' },
  3: { title: 'Grids & Load Paths', type: 'Concept Details', section: 'Introduction' },
  4: { title: 'Units of Measurement', type: 'Concept Details', section: 'Introduction' },
  5: { title: 'RCC Columns Net Height', type: 'Concept Details', section: 'RCC Frame' },
  6: { title: 'RCC Beams Clear Span', type: 'Concept Details', section: 'RCC Frame' },
  7: { title: 'RCC Slabs & Projections', type: 'Concept Details', section: 'RCC Frame' },
  8: { title: 'DPC Surface Area & Omissions', type: 'Concept Details', section: 'Masonry & Barriers' },
  9: { title: 'Masonry Height Corrections', type: 'Concept Details', section: 'Masonry & Barriers' },
  10: { title: 'Parapet Walls Detail', type: 'Concept Details', section: 'Masonry & Barriers' },
  11: { title: 'Opening Deduction Protocol', type: 'Concept Details', section: 'Opening Deductions' },
  12: { title: 'Lintel Bearings & Embedment', type: 'Concept Details', section: 'Opening Deductions' },
  13: { title: 'Woodwork & Shutters Segregation', type: 'Concept Details', section: 'Opening Deductions' },
  14: { title: 'Internal Plastering & Floor Area', type: 'Concept Details', section: 'Finishing Works' },
  15: { title: 'Plastering Voids Thresholds', type: 'Concept Details', section: 'Finishing Works' },
  16: { title: 'Skirting Linear Tracking', type: 'Concept Details', section: 'Finishing Works' },
  17: { title: 'Measurement Ledger Setup', type: 'Concept Details', section: 'Studio Practice' },
  18: { title: 'Team Task Allocation', type: 'Concept Details', section: 'Studio Practice' },
  19: { title: 'Lab Report Requirements', type: 'Concept Details', section: 'Studio Practice' },
  20: { title: 'Conclusion', type: 'Thank You Slide', section: 'Conclusion' },
};
