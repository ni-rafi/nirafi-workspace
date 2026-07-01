import { TitleSlide } from './TitleSlide';
import { PrerequisitesSlide } from './PrerequisitesSlide';
import { ReferencesSlide } from './ReferencesSlide';
import { TopicDivider } from './TopicDivider';

export const slides = {
  1: TitleSlide,
  2: PrerequisitesSlide,
  3: ReferencesSlide,
  4: TopicDivider,
};

export const sectionMetadata = {
  1: { title: 'Cover Page', type: 'Cover', section: 'Introduction' },
  2: { title: 'Prerequisites Checklist', type: 'Prerequisites', section: 'Introduction' },
  3: { title: 'Literature References', type: 'References', section: 'Introduction' },
  4: { title: 'Topic Divider: Section Modulus & Shape Optimization', type: 'Section Divider', section: 'Introduction' },
};
