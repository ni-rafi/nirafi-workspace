import Problem01Divider from './Problem01Divider';
import Problem01Statement from './Problem01Statement';
import Problem01Solver from './Problem01Solver';
import Problem01SummaryPlot from './Problem01SummaryPlot';
import Checkpoint2Slide from './Checkpoint2Slide';

export const slides = {
  1: Problem01Divider,
  2: Problem01Statement,
  3: Problem01Solver,
  4: Problem01SummaryPlot,
  5: Checkpoint2Slide,
};

export const sectionMetadata = {
  1: { title: 'Problem 1 Divider', type: 'Topic Divider', section: 'Problem 1' },
  2: { title: 'Problem Statement & Section Geometry', type: 'Concept Details', section: 'Problem 1' },
  3: { title: 'Numerical Solver Step-by-Step', type: 'Concept Details', section: 'Problem 1' },
  4: { title: 'Compiled Numerical Stress Profile', type: 'Concept Details', section: 'Problem 1' },
  5: { title: 'Checkpoint 2', type: 'Checkpoint', section: 'Problem 1' },
};
