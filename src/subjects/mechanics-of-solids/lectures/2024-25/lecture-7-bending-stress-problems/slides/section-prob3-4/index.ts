import { Problem03DividerSlide } from './Problem03DividerSlide';
import { Problem03StatementSlide } from './Problem03StatementSlide';
import { Problem03StandardSlide } from './Problem03StandardSlide';
import { Problem03InversionSlide } from './Problem03InversionSlide';
import { Problem04DividerSlide } from './Problem04DividerSlide';
import { Problem04StatementSlide } from './Problem04StatementSlide';
import { Problem04PeakSlide } from './Problem04PeakSlide';
import { Checkpoint4Slide } from './Checkpoint4Slide';

export const slides = {
  1: Problem03DividerSlide,
  2: Problem03StatementSlide,
  3: Problem03StandardSlide,
  4: Problem03InversionSlide,
  5: Problem04DividerSlide,
  6: Problem04StatementSlide,
  7: Problem04PeakSlide,
  8: Checkpoint4Slide,
};

export const sectionMetadata = {
  1: { title: 'Problem 03 Divider', type: 'Section Divider', section: 'Problem 03 & 04' },
  2: { title: 'Problem 03 Statement & Complex Geometry Layout', type: 'Concept Details', section: 'Problem 03 & 04' },
  3: { title: 'Standard Orientation Capacity Analysis', type: 'Concept Details', section: 'Problem 03 & 04' },
  4: { title: 'Extended Analysis: Section Inversion Optimization', type: 'Concept Details', section: 'Problem 03 & 04' },
  5: { title: 'Problem 04 Divider', type: 'Section Divider', section: 'Problem 03 & 04' },
  6: { title: 'Problem 04 Configuration & Multi-Span Load Profiles', type: 'Concept Details', section: 'Problem 03 & 04' },
  7: { title: 'Isolating Competing Moment Demand Parameters', type: 'Concept Details', section: 'Problem 03 & 04' },
  8: { title: 'Checkpoint 4: Asymmetric Moment Capacity Sizing', type: 'Checkpoint Quiz', section: 'Problem 03 & 04', quizId: 'mos_2024_lec7_q4' },
};
