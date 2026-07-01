import { Problem01DividerSlide } from './Problem01DividerSlide';
import { Problem01TimberSlide } from './Problem01TimberSlide';
import { Step1ConstraintSlide } from './Step1ConstraintSlide';
import { Step2CalculusSlide } from './Step2CalculusSlide';
import { Problem02DividerSlide } from './Problem02DividerSlide';
import { Problem02CastIronSlide } from './Problem02CastIronSlide';
import { Step1CentroidSlide } from './Step1CentroidSlide';
import { Step2InertiaSlide } from './Step2InertiaSlide';
import { Checkpoint3Slide } from './Checkpoint3Slide';
import { HomeworkSlide } from './HomeworkSlide';
import { OutroSlide } from './OutroSlide';

export const slides = {
  1: Problem01DividerSlide,
  2: Problem01TimberSlide,
  3: Step1ConstraintSlide,
  4: Step2CalculusSlide,
  5: Problem02DividerSlide,
  6: Problem02CastIronSlide,
  7: Step1CentroidSlide,
  8: Step2InertiaSlide,
  9: Checkpoint3Slide,
  10: HomeworkSlide,
  11: OutroSlide,
};

export const sectionMetadata = {
  1: { title: 'Problem 01 Divider', type: 'Section Divider', section: 'Sizing Optimization' },
  2: { title: 'Problem 01 Circular Log Sizing', type: 'Concept Details', section: 'Sizing Optimization' },
  3: { title: 'Step 1: Geometric Constraint Setup', type: 'Concept Details', section: 'Sizing Optimization' },
  4: { title: 'Step 2: Calculus Sizing Optimization', type: 'Concept Details', section: 'Sizing Optimization' },
  5: { title: 'Problem 02 Divider', type: 'Section Divider', section: 'Sizing Optimization' },
  6: { title: 'Problem 02 Asymmetric Limits & Cast Iron', type: 'Concept Details', section: 'Sizing Optimization' },
  7: { title: 'Step 1: Locating the Asymmetric Neutral Axis', type: 'Concept Details', section: 'Sizing Optimization' },
  8: { title: 'Step 2: Capacity Evaluation under Dual Limits', type: 'Concept Details', section: 'Sizing Optimization' },
  9: { title: 'Checkpoint 3: Asymmetric Flanged Load Capacity', type: 'Checkpoint Quiz', section: 'Sizing Optimization', quizId: 'mos_2024_lec8_q3' },
  10: { title: 'Independent Homework Assignment & Guidelines', type: 'Concept Details', section: 'Summary & Outro' },
  11: { title: 'Outro / Q&A Slide', type: 'Thank You Slide', section: 'Summary & Outro' },
};
