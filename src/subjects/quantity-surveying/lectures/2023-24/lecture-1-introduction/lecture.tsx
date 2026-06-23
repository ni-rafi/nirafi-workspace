import React from 'react';
import { SlideProps } from '@/features/presentation/components/slides/SlideRenderer';

import { Slide1, Slide2, Slide3, Slide4 } from './slides/IndustrySlides';
import { Slide5, Slide6, Slide8 } from './slides/BangladeshContextSlides';
import { Slide14, Slide15, Slide16, Slide17, Slide18 } from './slides/EstimatingFundamentalsSlides';
import { Slide19, Slide20, Slide21, Slide22, Slide23 as BoQSlide23 } from './slides/BoQSlides';
import { Slide23 as MeasurementSlide23, Slide24 as MeasurementSlide24, Slide25 as MeasurementSlide25 } from './slides/MeasurementSlides';
import { Slide26 as MeasurementSlide26 } from './slides/ConventionsSlides';
import {
  Slide27 as CalcSlide27,
  Slide28 as CalcSlide28,
  Slide28b as CalcSlide28b,
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
  7: Slide8,
  8: Slide14,
  9: Slide15,
  10: Slide16,
  11: Slide17,
  12: Slide18,
  13: Slide19,
  14: Slide20,
  15: Slide21,
  16: Slide22,
  17: BoQSlide23,
  18: MeasurementSlide23,
  19: MeasurementSlide24,
  20: MeasurementSlide25,
  21: MeasurementSlide26,
  22: CalcSlide27,
  23: CalcSlide28,
  24: CalcSlide28b,
  25: CalcSlide29,
  26: CalcSlide30,
  27: CalcSlide31,
  28: CalcSlide32,
  29: CalcSlide33,
  30: CalcSlide34,
  31: CalcSlide35,
};

export const slideMetadata: Record<number, import('@/features/presentation/components/slides/SlideRenderer').SlideMetadata> = {
  1: { title: 'Quantity Surveyor Role', type: 'Cover Slide', section: 'Introduction' },
  2: { title: 'Modern Surveyor', type: 'Concept Details', section: 'Introduction' },
  3: { title: 'Industry Roles', type: 'Concept Details', section: 'Introduction' },
  4: { title: 'Measurement Rules', type: 'Concept Details', section: 'Introduction' },
  5: { title: 'Bangladesh Context', type: 'Cover Slide', section: 'Bangladesh Context' },
  6: { title: 'PWD SoR Framework', type: 'Concept Details', section: 'Bangladesh Context' },
  7: { title: 'Measurement Book Layout', type: 'Spreadsheet View', section: 'Bangladesh Context' },
  8: { title: 'Estimating Cover', type: 'Cover Slide', section: 'Estimating Theory' },
  9: { title: 'Definition & Objectives', type: 'Concept Details', section: 'Estimating Theory' },
  10: { title: 'Estimate Classifications', type: 'Concept Details', section: 'Estimating Theory' },
  11: { title: 'Study of Drawings Protocol', type: 'Concept Details', section: 'Estimating Theory' },
  12: { title: 'Role of Specifications', type: 'Concept Details', section: 'Estimating Theory' },
  13: { title: 'BoQ Cover', type: 'Cover Slide', section: 'Bill of Quantities' },
  14: { title: 'BoQ Origin & Purpose', type: 'Concept Details', section: 'Bill of Quantities' },
  15: { title: 'BoQ Anatomy & Criteria', type: 'Concept Details', section: 'Bill of Quantities' },
  16: { title: 'BoQ Worked Example', type: 'Spreadsheet View', section: 'Bill of Quantities' },
  17: { title: 'BoQ Strategic Advantages', type: 'Concept Details', section: 'Bill of Quantities' },
  18: { title: 'Dimensions Cover', type: 'Cover Slide', section: 'Measurement Rules' },
  19: { title: 'Units of Measurement', type: 'Concept Details', section: 'Measurement Rules' },
  20: { title: 'Dimension Paper Columns', type: 'Concept Details', section: 'Measurement Rules' },
  21: { title: 'Booking Conventions', type: 'Concept Details', section: 'Measurement Rules' },
  22: { title: 'Calculations Cover', type: 'Cover Slide', section: 'Material Take-off' },
  23: { title: 'Wet-to-Dry Multiplier', type: 'Concept Details', section: 'Material Take-off' },
  24: { title: 'Cement Volumetric & Mass Standard', type: 'Concept Details', section: 'Material Take-off' },
  25: { title: 'Mortar & Concrete Mixes', type: 'Concept Details', section: 'Material Take-off' },
  26: { title: 'RCC Take-off Volumetric Flow', type: 'Concept Details', section: 'Material Take-off' },
  27: { title: 'RCC Take-off Walkthrough', type: 'Concept Details', section: 'Material Take-off' },
  28: { title: 'RCC Volume Sandbox', type: 'Live Sandbox', section: 'Material Take-off' },
  29: { title: 'Brickwork & Mortar Math', type: 'Concept Details', section: 'Material Take-off' },
  30: { title: 'Estimation Quiz Checkpoint', type: 'Quiz Slide', section: 'Quiz', quizId: 'qs_2023_lec1_quiz1', quizVisibilityMode: 'stealth' },
  31: { title: 'Session Summary', type: 'Thank You Slide', section: 'Conclusion' },
};
