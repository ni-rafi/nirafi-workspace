import { Problem05DividerSlide } from './Problem05DividerSlide';
import { Problem05StatementSlide } from './Problem05StatementSlide';
import { Problem05SolverSlide } from './Problem05SolverSlide';
import { Problem05SandboxSlide } from './Problem05SandboxSlide';
import { Checkpoint5Slide } from './Checkpoint5Slide';

export const slides = {
  1: Problem05DividerSlide,
  2: Problem05StatementSlide,
  3: Problem05SolverSlide,
  4: Problem05SandboxSlide,
  5: Checkpoint5Slide,
};

export const sectionMetadata = {
  1: { title: 'Problem 05 Divider', type: 'Section Divider', section: 'Problem 05' },
  2: { title: 'Problem 05 Statement & Reinforcement Layout', type: 'Concept Details', section: 'Problem 05' },
  3: { title: 'Step-by-Step Retrofitting Sizer & Capacity Solver', type: 'Concept Details', section: 'Problem 05' },
  4: { title: 'Symmetrical Retrofit Sandbox & Capacity Optimization', type: 'Interactive Sandbox', section: 'Problem 05' },
  5: { title: 'Checkpoint 5: Retrofitted Load Capacity Increase', type: 'Checkpoint Quiz', section: 'Problem 05', quizId: 'mos_2024_lec7_q5' },
};
