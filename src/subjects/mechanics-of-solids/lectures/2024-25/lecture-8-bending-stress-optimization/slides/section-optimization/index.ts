import { Problem01DividerSlide } from './Problem01DividerSlide';
import { Problem01TimberSlide } from './Problem01TimberSlide';
import { Problem01SolverSlide } from './Problem01SolverSlide';
import { Problem01SandboxSlide } from './Problem01SandboxSlide';
import { Problem02DividerSlide } from './Problem02DividerSlide';
import { Problem02CastIronSlide } from './Problem02CastIronSlide';
import { Problem02SolverSlide } from './Problem02SolverSlide';
import { Problem02SandboxSlide } from './Problem02SandboxSlide';
import { Checkpoint3Slide } from './Checkpoint3Slide';
import { Problem03DividerSlide } from './Problem03DividerSlide';
import { Problem03StatementSlide } from './Problem03StatementSlide';
import { Problem03SolverSlide } from './Problem03SolverSlide';
import { Problem03SandboxSlide } from './Problem03SandboxSlide';
import { Checkpoint4Slide } from './Checkpoint4Slide';
import { HomeworkSlide } from './HomeworkSlide';
import { OutroSlide } from './OutroSlide';

export const slides = {
  1: Problem01DividerSlide,
  2: Problem01TimberSlide,
  3: Problem01SolverSlide,
  4: Problem01SandboxSlide,
  5: Problem02DividerSlide,
  6: Problem02CastIronSlide,
  7: Problem02SolverSlide,
  8: Problem02SandboxSlide,
  9: Checkpoint3Slide,
  10: Problem03DividerSlide,
  11: Problem03StatementSlide,
  12: Problem03SolverSlide,
  13: Problem03SandboxSlide,
  14: Checkpoint4Slide,
  15: HomeworkSlide,
  16: OutroSlide,
};

export const sectionMetadata = {
  1: { title: 'Problem 01 Divider', type: 'Section Divider', section: 'Sizing Optimization' },
  2: { title: 'Problem 01 Circular Log Sizing', type: 'Concept Details', section: 'Sizing Optimization' },
  3: { title: 'Step-by-Step Strength Optimization Solver', type: 'Concept Details', section: 'Sizing Optimization' },
  4: { title: 'Timber Log Optimization Sandbox', type: 'Interactive Sandbox', section: 'Sizing Optimization' },
  5: { title: 'Problem 02 Divider', type: 'Section Divider', section: 'Sizing Optimization' },
  6: { title: 'Problem 02 Asymmetric Limits & Cast Iron', type: 'Concept Details', section: 'Sizing Optimization' },
  7: { title: 'Step-by-Step Capacity Evaluation & Limits Check', type: 'Concept Details', section: 'Sizing Optimization' },
  8: { title: 'Asymmetric Material Limits Sandbox', type: 'Interactive Sandbox', section: 'Sizing Optimization' },
  9: { title: 'Checkpoint 3: Asymmetric Flanged Load Capacity', type: 'Checkpoint Quiz', section: 'Sizing Optimization', quizId: 'mos_2024_lec8_q3' },
  10: { title: 'Problem 03 Divider', type: 'Section Divider', section: 'Sizing Optimization' },
  11: { title: 'Problem 03 Tapered Cantilever Optimization', type: 'Concept Details', section: 'Sizing Optimization' },
  12: { title: 'Step-by-Step Taper Sizing & Calculus Optimization', type: 'Concept Details', section: 'Sizing Optimization' },
  13: { title: 'Tapered Cantilever Optimization Sandbox', type: 'Interactive Sandbox', section: 'Sizing Optimization' },
  14: { title: 'Checkpoint 4: Tapered Beam Peak Stress Location', type: 'Checkpoint Quiz', section: 'Sizing Optimization', quizId: 'mos_2024_lec8_q4' },
  15: { title: 'Independent Homework Assignment & Guidelines', type: 'Concept Details', section: 'Summary & Outro' },
  16: { title: 'Outro / Q&A Slide', type: 'Thank You Slide', section: 'Summary & Outro' },
};
