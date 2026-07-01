import { HookesLawIntegrationSlide } from './HookesLawIntegrationSlide';
import { ForceMomentSetupSlide } from './ForceMomentSetupSlide';
import { MomentOfInertiaSlide } from './MomentOfInertiaSlide';
import { FlexureFormulaSlide } from './FlexureFormulaSlide';
import { SectionModulusSlide } from './SectionModulusSlide';
import { Checkpoint3Slide } from './Checkpoint3Slide';

export const slides = {
  1: HookesLawIntegrationSlide,
  2: ForceMomentSetupSlide,
  3: MomentOfInertiaSlide,
  4: FlexureFormulaSlide,
  5: SectionModulusSlide,
  6: Checkpoint3Slide,
};

export const sectionMetadata = {
  1: { title: 'Hooke’s Law Integration', type: 'Concept Details', section: 'Flexure Theory' },
  2: { title: 'Differential Force & Moment Setup', type: 'Concept Details', section: 'Flexure Theory' },
  3: { title: 'Introduction of Moment of Inertia (I)', type: 'Concept Details', section: 'Flexure Theory' },
  4: { title: 'The Flexure Formula', type: 'Concept Details', section: 'Flexure Theory' },
  5: { title: 'Section Modulus (Z) Definition', type: 'Concept Details', section: 'Flexure Theory' },
  6: { title: 'Checkpoint 3: Bending Stress Calculation', type: 'Checkpoint Quiz', section: 'Flexure Theory', quizId: 'mos_2024_lec6_q3' },
};
