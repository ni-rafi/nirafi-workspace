import { LookupDividerSlide } from './LookupDividerSlide';
import { LookupTableSlide } from './LookupTableSlide';
import { Checkpoint2Slide } from './Checkpoint2Slide';

export const slides = {
  1: LookupDividerSlide,
  2: LookupTableSlide,
  3: Checkpoint2Slide,
};

export const sectionMetadata = {
  1: { title: 'Maximum Bending Moment Divider', type: 'Section Divider', section: 'Maximum Bending Moment' },
  2: { title: 'Standard Beam Configuration Lookup Table', type: 'Concept Details', section: 'Maximum Bending Moment' },
  3: { title: 'Checkpoint 2: Peak Moment Formula', type: 'Checkpoint Quiz', section: 'Maximum Bending Moment', quizId: 'mos_2024_lec7_q2' },
};
