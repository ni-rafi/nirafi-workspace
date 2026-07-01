import { Problem05DividerSlide } from './Problem05DividerSlide';
import { Problem05StatementSlide } from './Problem05StatementSlide';
import { Step1CombinedInertiaSlide } from './Step1CombinedInertiaSlide';
import { Step2CapacitySlide } from './Step2CapacitySlide';
import { Checkpoint5Slide } from './Checkpoint5Slide';

export const slides = {
  1: Problem05DividerSlide,
  2: Problem05StatementSlide,
  3: Step1CombinedInertiaSlide,
  4: Step2CapacitySlide,
  5: Checkpoint5Slide,
};

export const sectionMetadata = {
  1: { title: 'Problem 05 Divider', type: 'Section Divider', section: 'Problem 05' },
  2: { title: 'Problem 05 Statement & Reinforcement Layout', type: 'Concept Details', section: 'Problem 05' },
  3: { title: 'Step 1: Composite Section Inertia (I_comp)', type: 'Concept Details', section: 'Problem 05' },
  4: { title: 'Step 2: Capacity Evaluation & Sizing', type: 'Concept Details', section: 'Problem 05' },
  5: { title: 'Checkpoint 5: Retrofitted Load Capacity Increase', type: 'Checkpoint Quiz', section: 'Problem 05', quizId: 'mos_2024_lec7_q5' },
};
