import { ModulusDefinitionSlide } from './ModulusDefinitionSlide';
import { ModulusInterpretationSlide } from './ModulusInterpretationSlide';
import { Checkpoint1Slide } from './Checkpoint1Slide';

export const slides = {
  1: ModulusDefinitionSlide,
  2: ModulusInterpretationSlide,
  3: Checkpoint1Slide,
};

export const sectionMetadata = {
  1: { title: 'Mathematical Definition of Z', type: 'Concept Details', section: 'Section Modulus Theory' },
  2: { title: 'Physical Interpretation of Section Modulus', type: 'Concept Details', section: 'Section Modulus Theory' },
  3: { title: 'Checkpoint 1: Section Modulus Theory', type: 'Checkpoint Quiz', section: 'Section Modulus Theory', quizId: 'mos_2024_lec8_q1' },
};
