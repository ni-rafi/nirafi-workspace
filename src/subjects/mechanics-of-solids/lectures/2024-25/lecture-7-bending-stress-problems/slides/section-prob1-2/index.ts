import { Problem01DividerSlide } from './Problem01DividerSlide';
import { Problem01StatementSlide } from './Problem01StatementSlide';
import { Problem01SolverSlide } from './Problem01SolverSlide';
import { Problem02DividerSlide } from './Problem02DividerSlide';
import { Problem02StatementSlide } from './Problem02StatementSlide';
import { Problem02SolverSlide } from './Problem02SolverSlide';
import { Problem02SandboxSlide } from './Problem02SandboxSlide';
import { Checkpoint3Slide } from './Checkpoint3Slide';

export const slides = {
  1: Problem01DividerSlide,
  2: Problem01StatementSlide,
  3: Problem01SolverSlide,
  4: Problem02DividerSlide,
  5: Problem02StatementSlide,
  6: Problem02SolverSlide,
  7: Problem02SandboxSlide,
  8: Checkpoint3Slide,
};

export const sectionMetadata = {
  1: { title: 'Problem 01 Divider', type: 'Section Divider', section: 'Problem 01' },
  2: { title: 'Problem 01 Statement & Inputs', type: 'Concept Details', section: 'Problem 01' },
  3: { title: 'Step-by-Step Bending Stress Solver', type: 'Concept Details', section: 'Problem 01' },
  4: { title: 'Problem 02 Divider', type: 'Section Divider', section: 'Problem 02' },
  5: { title: 'Problem 02 Statement & Design Criteria', type: 'Concept Details', section: 'Problem 02' },
  6: { title: 'Step-by-Step Design Sizing Solver', type: 'Concept Details', section: 'Problem 02' },
  7: { title: 'Design Sizing Sandbox & Exploration', type: 'Interactive Sandbox', section: 'Problem 02' },
  8: { title: 'Checkpoint 3: Rectangular Beam Depth Sizing', type: 'Checkpoint Quiz', section: 'Problem 02', quizId: 'mos_2024_lec7_q3' },
};
