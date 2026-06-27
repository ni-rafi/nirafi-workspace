import { Divider } from './Divider';
import { ShearSignConvention } from './ShearSignConvention';
import { BendingMomentSignConvention } from './BendingMomentSignConvention';
import { SignConventionQuizL1 } from './SignConventionQuizL1';

export const slides = {
  12: Divider,
  13: ShearSignConvention,
  14: BendingMomentSignConvention,
  15: SignConventionQuizL1,
};

export const sectionMetadata = {
  12: { title: 'Sign Conventions Divider', type: 'Cover Slide', section: 'Sign Conventions' },
  13: { title: 'The Shear Force Sign Convention', type: 'Live Sandbox', section: 'Sign Conventions' },
  14: { title: 'Bending Moment Sign Convention', type: 'Concept Details', section: 'Sign Conventions' },
  15: { title: 'Checkpoint 2: Sign Conventions Quiz', type: 'Concept Details', section: 'Sign Conventions' },
};
