import { LectureSummarySlide } from './LectureSummarySlide';
import { OutroSlide } from './OutroSlide';

export const slides = {
  1: LectureSummarySlide,
  2: OutroSlide,
};

export const sectionMetadata = {
  1: { title: 'Lecture Takeaways & Course Outcomes', type: 'Concept Details', section: 'Summary & Outro' },
  2: { title: 'Thank You / Q&A', type: 'Thank You Slide', section: 'Summary & Outro' },
};
