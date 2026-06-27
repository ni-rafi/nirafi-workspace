import { CoverSlideL2 } from './CoverSlideL2';
import { Lecture2References } from './Lecture2References';
import { ProblemSetupL2 } from './ProblemSetupL2';
import { ReactionsStep1L2 } from './ReactionsStep1L2';
import { ReactionsStep2L2 } from './ReactionsStep2L2';
import { ReactionsSolvedL2 } from './ReactionsSolvedL2';
import { ReactionsQuizL2 } from './ReactionsQuizL2';
import { CuttingSectionsL2 } from './CuttingSectionsL2';

export const slides = {
  1: CoverSlideL2,
  2: Lecture2References,
  3: ProblemSetupL2,
  4: ReactionsStep1L2,
  5: ReactionsStep2L2,
  6: ReactionsSolvedL2,
  7: ReactionsQuizL2,
  8: CuttingSectionsL2,
};

export const sectionMetadata = {
  1: { title: 'Shapes & Edge-Point Plotting Cover', type: 'Cover Slide', section: 'Introduction' },
  2: { title: 'References', type: 'Concept Details', section: 'Introduction' },
  3: { title: 'Problem 2 Setup', type: 'Concept Details', section: 'Beam Setup' },
  4: { title: 'Moment Summation about A', type: 'Concept Details', section: 'Beam Setup' },
  5: { title: 'Vertical Force Summation', type: 'Concept Details', section: 'Beam Setup' },
  6: { title: 'Support Reactions Solved', type: 'Concept Details', section: 'Beam Setup' },
  7: { title: 'Checkpoint 1: Reactions Quiz', type: 'Concept Details', section: 'Beam Setup' },
  8: { title: 'Defining the Cutting Sections', type: 'Concept Details', section: 'Beam Setup' },
};
