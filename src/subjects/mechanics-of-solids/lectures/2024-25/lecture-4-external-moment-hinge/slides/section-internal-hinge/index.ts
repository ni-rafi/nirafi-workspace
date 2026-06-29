import { InternalHingeDivider } from './InternalHingeDivider';
import { ReactionsStep1L4 } from './ReactionsStep1L4';
import { ReactionsStep2L4 } from './ReactionsStep2L4';
import { ReactionsSolvedL4 } from './ReactionsSolvedL4';

export const slides = {
  1: InternalHingeDivider,
  2: ReactionsStep1L4,
  3: ReactionsStep2L4,
  4: ReactionsSolvedL4,
};

export const sectionMetadata = {
  1: { title: 'Internal Hinge Section Intro', type: 'Section Divider', section: 'Internal Hinge' },
  2: { title: 'Right Span Equilibrium', type: 'Concept Details', section: 'Internal Hinge' },
  3: { title: 'Left Span Equilibrium', type: 'Concept Details', section: 'Internal Hinge' },
  4: { title: 'Solved Support Reactions Summary', type: 'Concept Details', section: 'Internal Hinge' },
};
