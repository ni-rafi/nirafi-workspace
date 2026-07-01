import { TitleSlide } from './TitleSlide';
import { PrerequisitesSlide } from './PrerequisitesSlide';
import { ReferencesSlide } from './ReferencesSlide';
import { TopicIntroDivider } from './TopicIntroDivider';

export const slides = {
  1: TitleSlide,
  2: PrerequisitesSlide,
  3: ReferencesSlide,
  4: TopicIntroDivider,
};

export const sectionMetadata = {
  1: { title: 'Bending Stress in Beams', type: 'Cover Slide', section: 'Introduction' },
  2: { title: 'Prerequisites', type: 'Concept Details', section: 'Introduction' },
  3: { title: 'References', type: 'Concept Details', section: 'Introduction' },
  4: { title: 'Topic Introduction', type: 'Topic Divider', section: 'Introduction' },
};
