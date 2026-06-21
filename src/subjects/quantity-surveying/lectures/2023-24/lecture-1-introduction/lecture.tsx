import React from 'react';
import { SlideProps } from '@/features/presentation/components/slides/SlideRenderer';

import { Slide1, Slide2, Slide3, Slide4 } from './slides/IndustrySlides';
import { Slide5, Slide6, Slide7, Slide8 } from './slides/BangladeshContextSlides';
import { Slide9, Slide10, Slide11, Slide12, Slide13 } from './slides/WorkedExampleSlides';
import { Slide14, Slide15, Slide16, Slide17, Slide18 } from './slides/EstimatingFundamentalsSlides';
import { Slide19, Slide20, Slide21, Slide22, Slide23 as BoQSlide23 } from './slides/BoQSlides';
import { Slide23 as MeasurementSlide23, Slide24 as MeasurementSlide24, Slide25 as MeasurementSlide25 } from './slides/MeasurementSlides';
import { Slide26 as MeasurementSlide26 } from './slides/ConventionsSlides';
import {
  Slide27 as CalcSlide27,
  Slide28 as CalcSlide28,
  Slide29 as CalcSlide29,
  Slide30 as CalcSlide30,
  Slide31 as CalcSlide31,
  Slide32 as CalcSlide32,
  Slide33 as CalcSlide33,
  Slide34 as CalcSlide34,
  Slide35 as CalcSlide35
} from './slides/MaterialCalculationsSlides';

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
  20: Slide20,
  21: Slide21,
  22: Slide22,
  23: BoQSlide23,
  24: MeasurementSlide23,
  25: MeasurementSlide24,
  26: MeasurementSlide25,
  27: MeasurementSlide26,
  28: CalcSlide27,
  29: CalcSlide28,
  30: CalcSlide29,
  31: CalcSlide30,
  32: CalcSlide31,
  33: CalcSlide32,
  34: CalcSlide33,
  35: CalcSlide34,
  36: CalcSlide35,
};

export const slideMetadata: Record<number, import('@/features/presentation/components/slides/SlideRenderer').SlideMetadata> = {
  1: { title: 'Quantity Surveyor Role', type: 'Cover Slide', section: 'Introduction' },
  2: { title: 'Modern Surveyor', type: 'Concept Details', section: 'Introduction' },
  3: { title: 'Industry Roles', type: 'Concept Details', section: 'Introduction' },
  4: { title: 'Measurement Rules', type: 'Concept Details', section: 'Introduction' },
  5: { title: 'Bangladesh Context', type: 'Cover Slide', section: 'Bangladesh Context' },
  6: { title: 'PWD SoR Framework', type: 'Concept Details', section: 'Bangladesh Context' },
  7: { title: 'Standards & Conversions', type: 'Concept Details', section: 'Bangladesh Context' },
  8: { title: 'Measurement Book Layout', type: 'Spreadsheet View', section: 'Bangladesh Context' },
  9: { title: 'Sessional Footing Example', type: 'Concept Details', section: 'Footing Example' },
  10: { title: 'Sand Cushion Realities', type: 'Concept Details', section: 'Footing Example' },
  11: { title: 'Footing Math Computations', type: 'Concept Details', section: 'Footing Example' },
  12: { title: 'Footing MB Ledger', type: 'Spreadsheet View', section: 'Footing Example' },
  13: { title: 'MB Precision Rules', type: 'Concept Details', section: 'Footing Example' },
  14: { title: 'Estimating Cover', type: 'Cover Slide', section: 'Estimating Theory' },
  15: { title: 'Definition & Objectives', type: 'Concept Details', section: 'Estimating Theory' },
  16: { title: 'Estimate Classifications', type: 'Concept Details', section: 'Estimating Theory' },
  17: { title: 'Study of Drawings Protocol', type: 'Concept Details', section: 'Estimating Theory' },
  18: { title: 'Role of Specifications', type: 'Concept Details', section: 'Estimating Theory' },
  19: { title: 'BoQ Cover', type: 'Cover Slide', section: 'Bill of Quantities' },
  20: { title: 'BoQ Origin & Purpose', type: 'Concept Details', section: 'Bill of Quantities' },
  21: { title: 'BoQ Anatomy & Criteria', type: 'Concept Details', section: 'Bill of Quantities' },
  22: { title: 'BoQ Worked Example', type: 'Spreadsheet View', section: 'Bill of Quantities' },
  23: { title: 'BoQ Strategic Advantages', type: 'Concept Details', section: 'Bill of Quantities' },
  24: { title: 'Dimensions Cover', type: 'Cover Slide', section: 'Measurement Rules' },
  25: { title: 'Units of Measurement', type: 'Concept Details', section: 'Measurement Rules' },
  26: { title: 'Dimension Paper Columns', type: 'Concept Details', section: 'Measurement Rules' },
  27: { title: 'Booking Conventions', type: 'Concept Details', section: 'Measurement Rules' },
  28: { title: 'Calculations Cover', type: 'Cover Slide', section: 'Material Take-off' },
  29: { title: 'Wet-to-Dry Multiplier', type: 'Concept Details', section: 'Material Take-off' },
  30: { title: 'Mortar & Concrete Mixes', type: 'Concept Details', section: 'Material Take-off' },
  31: { title: 'RCC Take-off Volumetric Flow', type: 'Concept Details', section: 'Material Take-off' },
  32: { title: 'RCC Take-off Walkthrough', type: 'Concept Details', section: 'Material Take-off' },
  33: { title: 'RCC Volume Sandbox', type: 'Live Sandbox', section: 'Material Take-off' },
  34: { title: 'Brickwork & Mortar Math', type: 'Concept Details', section: 'Material Take-off' },
  35: { title: 'Estimation Quiz Checkpoint', type: 'Quiz Slide', section: 'Quiz', quizId: 'qs_2023_lec1_quiz1', quizVisibilityMode: 'stealth' },
  36: { title: 'Session Summary', type: 'Thank You Slide', section: 'Conclusion' },
};
