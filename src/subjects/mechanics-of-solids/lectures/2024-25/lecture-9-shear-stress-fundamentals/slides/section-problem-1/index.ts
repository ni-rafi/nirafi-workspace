import Problem01Divider from './Problem01Divider';
import Problem01Statement from './Problem01Statement';
import Problem01Constants from './Problem01Constants';
import Problem01BoundaryCheck from './Problem01BoundaryCheck';
import Problem01WebCheck from './Problem01WebCheck';
import Problem01SymmetryCheck from './Problem01SymmetryCheck';
import Problem01NeutralAxis from './Problem01NeutralAxis';
import Problem01SummaryPlot from './Problem01SummaryPlot';
import Checkpoint2Slide from './Checkpoint2Slide';

export const slides = {
  1: Problem01Divider,
  2: Problem01Statement,
  3: Problem01Constants,
  4: Problem01BoundaryCheck,
  5: Problem01WebCheck,
  6: Problem01SymmetryCheck,
  7: Problem01NeutralAxis,
  8: Problem01SummaryPlot,
  9: Checkpoint2Slide,
};

export const sectionMetadata = {
  1: { title: 'Problem 01 Divider', type: 'Topic Divider', section: 'Problem 01' },
  2: { title: 'Problem Statement & Dimensions', type: 'Concept Details', section: 'Problem 01' },
  3: { title: 'Combined Multiplier Setup', type: 'Concept Details', section: 'Problem 01' },
  4: { title: 'Outer Boundary Check y = ±150mm', type: 'Concept Details', section: 'Problem 01' },
  5: { title: 'Intermediate Fiber Check y = +75mm', type: 'Concept Details', section: 'Problem 01' },
  6: { title: 'Symmetry Verification y = -75mm', type: 'Concept Details', section: 'Problem 01' },
  7: { title: 'Max Stress at Neutral Axis y = 0', type: 'Concept Details', section: 'Problem 01' },
  8: { title: 'Compiled Stress Profile Summary', type: 'Concept Details', section: 'Problem 01' },
  9: { title: 'Checkpoint 2', type: 'Checkpoint', section: 'Problem 01' },
};
