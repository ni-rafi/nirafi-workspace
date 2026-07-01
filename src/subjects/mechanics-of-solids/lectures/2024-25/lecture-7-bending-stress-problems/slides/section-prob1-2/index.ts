import { Problem01DividerSlide } from './Problem01DividerSlide';
import { Problem01StatementSlide } from './Problem01StatementSlide';
import { Step1MomentSlide } from './Step1MomentSlide';
import { Step2InertiaSlide } from './Step2InertiaSlide';
import { Step3FlexureSlide } from './Step3FlexureSlide';
import { Step4PlotSlide } from './Step4PlotSlide';
import { Problem02DividerSlide } from './Problem02DividerSlide';
import { Problem02StatementSlide } from './Problem02StatementSlide';
import { Step1EvaluationSlide } from './Step1EvaluationSlide';
import { Step2ParametricSlide } from './Step2ParametricSlide';
import { Step3SizingSlide } from './Step3SizingSlide';
import { Checkpoint3Slide } from './Checkpoint3Slide';

export const slides = {
  1: Problem01DividerSlide,
  2: Problem01StatementSlide,
  3: Step1MomentSlide,
  4: Step2InertiaSlide,
  5: Step3FlexureSlide,
  6: Step4PlotSlide,
  7: Problem02DividerSlide,
  8: Problem02StatementSlide,
  9: Step1EvaluationSlide,
  10: Step2ParametricSlide,
  11: Step3SizingSlide,
  12: Checkpoint3Slide,
};

export const sectionMetadata = {
  1: { title: 'Problem 01 Divider', type: 'Section Divider', section: 'Problem 01' },
  2: { title: 'Problem 01 Statement & Inputs', type: 'Concept Details', section: 'Problem 01' },
  3: { title: 'Step 1: External Moment Evaluation', type: 'Concept Details', section: 'Problem 01' },
  4: { title: 'Step 2: Cross-Section Inertia Evaluation', type: 'Concept Details', section: 'Problem 01' },
  5: { title: 'Step 3: Flexure Formula Evaluation', type: 'Concept Details', section: 'Problem 01' },
  6: { title: 'Step 4: Plotting the Linear Distribution Profile', type: 'Concept Details', section: 'Problem 01' },
  7: { title: 'Problem 02 Divider', type: 'Section Divider', section: 'Problem 02' },
  8: { title: 'Problem 02 Statement & Design Criteria', type: 'Concept Details', section: 'Problem 02' },
  9: { title: 'Step 1: External Moment Evaluation', type: 'Concept Details', section: 'Problem 02' },
  10: { title: 'Step 2: Parametric Inertia Expression', type: 'Concept Details', section: 'Problem 02' },
  11: { title: 'Step 3: Sizing via Governing Boundary Evaluation', type: 'Concept Details', section: 'Problem 02' },
  12: { title: 'Checkpoint 3: Rectangular Beam Depth Sizing', type: 'Checkpoint Quiz', section: 'Problem 02', quizId: 'mos_2024_lec7_q3' },
};
