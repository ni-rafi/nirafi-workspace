import Problem02Statement from './Problem02Statement';
import Problem02Constants from './Problem02Constants';
import Problem02OuterBoundaries from './Problem02OuterBoundaries';
import Problem02FlangeCheck from './Problem02FlangeCheck';
import Problem02JunctionMarker from './Problem02JunctionMarker';
import Problem02JunctionWidths from './Problem02JunctionWidths';
import Problem02StepJump from './Problem02StepJump';
import Problem02LowerJunction from './Problem02LowerJunction';
import Problem02NeutralAxis from './Problem02NeutralAxis';
import Problem02SummaryPlot from './Problem02SummaryPlot';
import Checkpoint3Slide from './Checkpoint3Slide';

export const slides = {
  1: Problem02Statement,
  2: Problem02Constants,
  3: Problem02OuterBoundaries,
  4: Problem02FlangeCheck,
  5: Problem02JunctionMarker,
  6: Problem02JunctionWidths,
  7: Problem02StepJump,
  8: Problem02LowerJunction,
  9: Problem02NeutralAxis,
  10: Problem02SummaryPlot,
  11: Checkpoint3Slide,
};

export const sectionMetadata = {
  1: { title: 'Problem 02 Statement', type: 'Concept Details', section: 'Problem 02' },
  2: { title: 'Section Properties', type: 'Concept Details', section: 'Problem 02' },
  3: { title: 'Boundary Limits', type: 'Concept Details', section: 'Problem 02' },
  4: { title: 'Top Flange Stress', type: 'Concept Details', section: 'Problem 02' },
  5: { title: 'Junction Marker Warning', type: 'Concept Details', section: 'Problem 02' },
  6: { title: 'Junction Statical Moment', type: 'Concept Details', section: 'Problem 02' },
  7: { title: 'Top Junction Step Jump', type: 'Concept Details', section: 'Problem 02' },
  8: { title: 'Bottom Junction Step Jump', type: 'Concept Details', section: 'Problem 02' },
  9: { title: 'Peak Stress at Neutral Axis', type: 'Concept Details', section: 'Problem 02' },
  10: { title: 'Asymmetric I-Beam Stress Profile', type: 'Concept Details', section: 'Problem 02' },
  11: { title: 'Checkpoint 3', type: 'Checkpoint', section: 'Problem 02' },
};
