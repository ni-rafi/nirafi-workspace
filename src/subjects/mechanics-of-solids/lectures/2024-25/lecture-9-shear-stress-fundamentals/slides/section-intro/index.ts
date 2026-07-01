import TitleSlide from './TitleSlide';
import ReferencesSlide from './ReferencesSlide';
import PrerequisitesSlide from './PrerequisitesSlide';
import TopicIntroDivider from './TopicIntroDivider';
import PunchingShearCaseStudy from './PunchingShearCaseStudy';

export const slides = {
  1: TitleSlide,
  2: ReferencesSlide,
  3: PrerequisitesSlide,
  4: TopicIntroDivider,
  5: PunchingShearCaseStudy,
};

export const sectionMetadata = {
  1: { title: 'Title Cover', type: 'Title', section: 'Introduction' },
  2: { title: 'References', type: 'References', section: 'Introduction' },
  3: { title: 'Prerequisites', type: 'Concept Details', section: 'Introduction' },
  4: { title: 'Topic Introduction', type: 'Topic Divider', section: 'Introduction' },
  5: { title: 'Punching Shear Case Study', type: 'Case Study', section: 'Introduction' },
};
