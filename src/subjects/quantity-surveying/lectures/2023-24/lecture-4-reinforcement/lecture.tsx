import React from 'react';
import { SlideProps } from '@/features/presentation/components/slides/SlideRenderer';

import { Slide1, Slide1B, Slide2, Slide3, Slide3B, Slide3C } from './slides/OverviewSlides';
import { Slide4, Slide5, Slide5B, Slide5C, Slide6 } from './slides/MechanicsSlides';
import { Slide7, Slide8, Slide8B, Slide8C, Slide9 } from './slides/DetailingSlides';
import { Slide10, Slide11, Slide11B, Slide11C, Slide12 } from './slides/TonnageSlides';

import { LectureThankYou } from '@/shared/layouts/LectureThankYou';

export const slides: Record<number, React.ComponentType<SlideProps>> = {
  1: Slide1,
  2: Slide1B,
  3: Slide2,
  4: Slide3,
  5: Slide3B,
  6: Slide3C,
  7: Slide4,
  8: Slide5,
  9: Slide5B,
  10: Slide5C,
  11: Slide6,
  12: Slide7,
  13: Slide8,
  14: Slide8B,
  15: Slide8C,
  16: Slide9,
  17: Slide10,
  18: Slide11,
  19: Slide11B,
  20: Slide11C,
  21: Slide12,
  22: (props) => <LectureThankYou {...props} />,
};

export const slideMetadata: Record<
  number,
  import('@/features/presentation/components/slides/SlideRenderer').SlideMetadata
> = {
  1: { title: 'Steel Reinforcement Intro', type: 'Cover Slide', section: 'Introduction' },
  2: { title: 'Section 1 Cover', type: 'Cover Slide', section: 'Introduction' },
  3: { title: 'Rebar Nomenclature & Grades', type: 'Concept Details', section: 'Introduction' },
  4: { title: 'Clear Cover Rules', type: 'Concept Details', section: 'Introduction' },
  5: { title: 'Clear Cover Sandbox', type: 'Live Sandbox', section: 'Introduction' },
  6: { title: 'Clear Cover Quiz', type: 'Concept Details', section: 'Introduction' },
  7: { title: 'BBS Mechanics & Geometry', type: 'Cover Slide', section: 'BBS Mechanics' },
  8: { title: 'Hooks & Cranked Bars', type: 'Concept Details', section: 'BBS Mechanics' },
  9: { title: 'Hooks & Cranks Sandbox', type: 'Live Sandbox', section: 'BBS Mechanics' },
  10: { title: 'Hooks & Cranks Quiz', type: 'Concept Details', section: 'BBS Mechanics' },
  11: { title: 'Splice Geometry & Lapping', type: 'Concept Details', section: 'BBS Mechanics' },
  12: { title: 'Structural Element Detailing', type: 'Cover Slide', section: 'Element Detailing' },
  13: { title: 'Detailing Beams & Columns', type: 'Concept Details', section: 'Element Detailing' },
  14: { title: 'Stirrup Spacing Sandbox', type: 'Live Sandbox', section: 'Element Detailing' },
  15: { title: 'Stirrups Count Quiz', type: 'Concept Details', section: 'Element Detailing' },
  16: { title: 'Floor Slab Detailing', type: 'Concept Details', section: 'Element Detailing' },
  17: { title: 'Tonnage & BoQ Integration', type: 'Cover Slide', section: 'Tonnage & BoQ' },
  18: { title: 'Rebar Weight Conversion', type: 'Concept Details', section: 'Tonnage & BoQ' },
  19: { title: 'Weight Converter Sandbox', type: 'Live Sandbox', section: 'Tonnage & BoQ' },
  20: { title: 'Weight Tonnage Quiz', type: 'Concept Details', section: 'Tonnage & BoQ' },
  21: { title: 'Allowances & Lab Report 4', type: 'Concept Details', section: 'Tonnage & BoQ' },
  22: { title: 'Conclusion', type: 'Thank You Slide', section: 'Conclusion' },
};
