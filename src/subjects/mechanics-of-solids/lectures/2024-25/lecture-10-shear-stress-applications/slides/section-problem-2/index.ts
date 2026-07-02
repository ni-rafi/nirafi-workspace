import Problem02Statement from './Problem02Statement';
import Problem02JunctionMarker from './Problem02JunctionMarker';
import Problem02SolverPart1 from './Problem02SolverPart1';
import Problem02SolverPart2 from './Problem02SolverPart2';
import Problem02SummaryPlot from './Problem02SummaryPlot';
import Checkpoint3Slide from './Checkpoint3Slide';

export const slides = {
  1: Problem02Statement,
  2: Problem02JunctionMarker,
  3: Problem02SolverPart1,
  4: Problem02SolverPart2,
  5: Problem02SummaryPlot,
  6: Checkpoint3Slide,
};

export const sectionMetadata = {
  1: { title: 'Problem 02 Statement', type: 'Concept Details', section: 'Problem 02' },
  2: { title: 'Approaching Flange-to-Web Junction', type: 'Concept Details', section: 'Problem 02' },
  3: { title: 'Upper Section Solver (Steps 1-4)', type: 'Concept Details', section: 'Problem 02' },
  4: { title: 'Lower Section Solver (Steps 5-6)', type: 'Concept Details', section: 'Problem 02' },
  5: { title: 'Asymmetric I-Beam Stress Profile', type: 'Concept Details', section: 'Problem 02' },
  6: { title: 'Checkpoint 3', type: 'Checkpoint', section: 'Problem 02' },
};
