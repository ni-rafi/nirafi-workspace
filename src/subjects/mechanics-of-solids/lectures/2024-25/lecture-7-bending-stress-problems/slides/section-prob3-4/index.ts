import { Problem03DividerSlide } from './Problem03DividerSlide';
import { Problem03StatementSlide } from './Problem03StatementSlide';
import { Problem03SolverSlide } from './Problem03SolverSlide';
import { Problem03SandboxSlide } from './Problem03SandboxSlide';
import { Problem04DividerSlide } from './Problem04DividerSlide';
import { Problem04StatementSlide } from './Problem04StatementSlide';
import { Problem04SolverSlide } from './Problem04SolverSlide';
import { Checkpoint4Slide } from './Checkpoint4Slide';

export const slides = {
  1: Problem03DividerSlide,
  2: Problem03StatementSlide,
  3: Problem03SolverSlide,
  4: Problem03SandboxSlide,
  5: Problem04DividerSlide,
  6: Problem04StatementSlide,
  7: Problem04SolverSlide,
  8: Checkpoint4Slide,
};

export const sectionMetadata = {
  1: { title: 'Problem 03 Divider', type: 'Section Divider', section: 'Problem 03 & 04' },
  2: { title: 'Problem 03 Statement & Complex Geometry Layout', type: 'Concept Details', section: 'Problem 03 & 04' },
  3: { title: 'Orientation & Inversion Capacity Analysis', type: 'Concept Details', section: 'Problem 03 & 04' },
  4: { title: 'Orientation & Inversion Sandbox', type: 'Interactive Sandbox', section: 'Problem 03 & 04' },
  5: { title: 'Problem 04 Divider', type: 'Section Divider', section: 'Problem 03 & 04' },
  6: { title: 'Problem 04 Configuration & Multi-Span Load Profiles', type: 'Concept Details', section: 'Problem 03 & 04' },
  7: { title: 'Step-by-Step Continuous Beam Solver', type: 'Concept Details', section: 'Problem 03 & 04' },
  8: { title: 'Checkpoint 4: Asymmetric Moment Capacity Sizing', type: 'Checkpoint Quiz', section: 'Problem 03 & 04', quizId: 'mos_2024_lec7_q4' },
};
