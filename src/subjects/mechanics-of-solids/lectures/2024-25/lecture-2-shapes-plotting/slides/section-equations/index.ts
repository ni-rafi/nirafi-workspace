import { Interval1L2 } from './Interval1L2';
import { Interval2L2 } from './Interval2L2';
import { Interval3L2 } from './Interval3L2';
import { Interval4L2 } from './Interval4L2';
import { SectionsQuizL2 } from './SectionsQuizL2';

export const slides = {
  1: Interval1L2,
  2: Interval2L2,
  3: Interval3L2,
  4: Interval4L2,
  5: SectionsQuizL2,
};

export const sectionMetadata = {
  1: { title: 'Section Method - Interval 1 (0 <= x <= 5 m)', type: 'Concept Details', section: 'Segment Equations' },
  2: { title: 'Section Method - Interval 2 (5 <= x <= 12 m)', type: 'Concept Details', section: 'Segment Equations' },
  3: { title: 'Section Method - Interval 3 (12 <= x <= 17 m)', type: 'Concept Details', section: 'Segment Equations' },
  4: { title: 'Section Method - Interval 4 (17 <= x <= 20 m)', type: 'Concept Details', section: 'Segment Equations' },
  5: { title: 'Checkpoint 2: Segment Relations Quiz', type: 'Concept Details', section: 'Segment Equations' },
};
