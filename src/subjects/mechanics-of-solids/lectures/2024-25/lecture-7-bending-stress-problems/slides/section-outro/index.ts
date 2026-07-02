import { LectureSummarySlide } from './LectureSummarySlide';
import { HomeworkSlide } from './HomeworkSlide';
import { OutroSlide } from './OutroSlide';

export const slides = {
  1: LectureSummarySlide,
  2: HomeworkSlide,
  3: OutroSlide,
};

export const sectionMetadata = {
  1: { title: 'Lecture Takeaways & Course Outcomes', type: 'Concept Details', section: 'Summary & Outro' },
  2: { title: 'Independent Homework Assignment & Guidelines', type: 'Concept Details', section: 'Summary & Outro' },
  3: { title: 'Outro / Q&A Slide', type: 'Thank You Slide', section: 'Summary & Outro' },
};
