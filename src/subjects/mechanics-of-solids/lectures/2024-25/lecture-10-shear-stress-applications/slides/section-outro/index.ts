import HomeworkSlide from './HomeworkSlide';
import LectureSummarySlide from './LectureSummarySlide';
import OutroSlide from './OutroSlide';

export const slides = {
  1: HomeworkSlide,
  2: LectureSummarySlide,
  3: OutroSlide,
};

export const sectionMetadata = {
  1: { title: 'Homework and Practice Problems', type: 'Outro', section: 'Outro' },
  2: { title: 'Lecture Summary Takeaways', type: 'Outro', section: 'Outro' },
  3: { title: 'Closing Slide', type: 'Outro', section: 'Outro' },
};
