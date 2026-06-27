import { Divider } from './Divider';
import { ShearSignConvention } from './ShearSignConvention';
import { BendingMomentSignConvention } from './BendingMomentSignConvention';
import { SignConventionQuizL1 } from './SignConventionQuizL1';

export const slides = {
  1: Divider,
  2: ShearSignConvention,
  3: BendingMomentSignConvention,
  4: SignConventionQuizL1,
};

export const sectionMetadata = {
  1: { title: 'Sign Conventions Divider', type: 'Cover Slide', section: 'Sign Conventions' },
  2: { title: 'The Shear Force Sign Convention', type: 'Live Sandbox', section: 'Sign Conventions' },
  3: { title: 'Bending Moment Sign Convention', type: 'Concept Details', section: 'Sign Conventions' },
  4: { title: 'Checkpoint 2: Sign Conventions Quiz', type: 'Concept Details', section: 'Sign Conventions' },
};
