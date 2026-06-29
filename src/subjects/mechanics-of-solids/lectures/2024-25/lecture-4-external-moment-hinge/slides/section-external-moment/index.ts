import { ExternalMomentDivider } from './ExternalMomentDivider';
import { VerticalBracketIntro } from './VerticalBracketIntro';
import { VerticalBracketEquivalence } from './VerticalBracketEquivalence';
import { VerticalBracketSandbox } from './VerticalBracketSandbox';
import { HorizontalBracketExplanation } from './HorizontalBracketExplanation';

export const slides = {
  1: ExternalMomentDivider,
  2: VerticalBracketIntro,
  3: VerticalBracketEquivalence,
  4: VerticalBracketSandbox,
  5: HorizontalBracketExplanation,
};

export const sectionMetadata = {
  1: { title: 'External Moment Section Intro', type: 'Section Divider', section: 'External Moment' },
  2: { title: 'Vertical Bracket Analysis: Setup & Deflection', type: 'Concept Details', section: 'External Moment' },
  3: { title: 'Vertical Bracket Analysis: Equivalent System', type: 'Concept Details', section: 'External Moment' },
  4: { title: 'Vertical Bracket Sandbox simulation', type: 'Concept Details', section: 'External Moment' },
  5: { title: 'Horizontal Bracket Moment Analysis', type: 'Concept Details', section: 'External Moment' },
};
