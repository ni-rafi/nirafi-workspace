import { ComparisonDividerSlide } from './ComparisonDividerSlide';
import { SquareVsRectangleSlide } from './SquareVsRectangleSlide';
import { ProofAreaConstantSlide } from './ProofAreaConstantSlide';
import { FinalizeProofSlide } from './FinalizeProofSlide';
import { CircularModulusSlide } from './CircularModulusSlide';
import { SquareVsCircleSlide } from './SquareVsCircleSlide';
import { Checkpoint2Slide } from './Checkpoint2Slide';

export const slides = {
  1: ComparisonDividerSlide,
  2: SquareVsRectangleSlide,
  3: ProofAreaConstantSlide,
  4: FinalizeProofSlide,
  5: CircularModulusSlide,
  6: SquareVsCircleSlide,
  7: Checkpoint2Slide,
};

export const sectionMetadata = {
  1: { title: 'Comparison of Sections Divider', type: 'Section Divider', section: 'Comparison of Sections' },
  2: { title: 'Optimization Challenge: Square vs Rectangle', type: 'Concept Details', section: 'Comparison of Sections' },
  3: { title: 'Mathematical Proof Setup: Area Constant', type: 'Concept Details', section: 'Comparison of Sections' },
  4: { title: 'Finalizing the Proof', type: 'Concept Details', section: 'Comparison of Sections' },
  5: { title: 'Circular Modulus Expression', type: 'Concept Details', section: 'Comparison of Sections' },
  6: { title: 'Optimization Proof: Square vs Circle', type: 'Concept Details', section: 'Comparison of Sections' },
  7: { title: 'Checkpoint 2: Bending Efficiency Comparisons', type: 'Checkpoint Quiz', section: 'Comparison of Sections', quizId: 'mos_2024_lec8_q2' },
};
