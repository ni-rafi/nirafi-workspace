import React from 'react';
import { SlideProps } from '@/features/presentation/components/slides/SlideRenderer';

import { Slide1, Slide1B, Slide2, Slide3, Slide3B, Slide3C } from './slides/OverviewSlides';
import { Slide4, Slide5, Slide5B, Slide5C, Slide6 } from './slides/MechanicsSlides';
import { Slide7, Slide8, Slide8B, Slide8C, Slide9 } from './slides/DetailingSlides';
import { Slide16B, Slide16C, Slide16D, Slide16E } from './slides/SlabSlides';
import { Slide16F, Slide16G, Slide16H } from './slides/StaircaseSlides';
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
  17: Slide16B,
  18: Slide16C,
  19: Slide16D,
  20: Slide16E,
  21: Slide16F,
  22: Slide16G,
  23: Slide16H,
  24: Slide10,
  25: Slide11,
  26: Slide11B,
  27: Slide11C,
  28: Slide12,
  29: (props) => <LectureThankYou {...props} />,
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
  17: { title: 'Slab Reinforcement Rules', type: 'Concept Details', section: 'Element Detailing' },
  18: { title: 'Slab Bar Counting Math', type: 'Concept Details', section: 'Element Detailing' },
  19: { title: 'Slab Bar Spacing Sandbox', type: 'Live Sandbox', section: 'Element Detailing' },
  20: { title: 'Slab Hooks & Cranks Geometry', type: 'Concept Details', section: 'Element Detailing' },
  21: { title: 'Staircase Concrete Volume', type: 'Concept Details', section: 'Element Detailing' },
  22: { title: 'Staircase Volume Sandbox', type: 'Live Sandbox', section: 'Element Detailing' },
  23: { title: 'Staircase Reinforcement Detailing', type: 'Concept Details', section: 'Element Detailing' },
  24: { title: 'Tonnage & BoQ Integration', type: 'Cover Slide', section: 'Tonnage & BoQ' },
  25: { title: 'Rebar Weight Conversion', type: 'Concept Details', section: 'Tonnage & BoQ' },
  26: { title: 'Weight Converter Sandbox', type: 'Live Sandbox', section: 'Tonnage & BoQ' },
  27: { title: 'Weight Tonnage Quiz', type: 'Concept Details', section: 'Tonnage & BoQ' },
  28: { title: 'Allowances & Lab Report 4', type: 'Concept Details', section: 'Tonnage & BoQ' },
  29: { title: 'Conclusion', type: 'Thank You Slide', section: 'Conclusion' },
};
