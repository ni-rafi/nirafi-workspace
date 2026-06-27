import { CoverSlide } from './CoverSlide';
import { CourseObjectivesReferences } from './CourseObjectivesReferences';
import { StaticEquilibriumCheck } from './StaticEquilibriumCheck';
import { EquilibriumQuizL1 } from './EquilibriumQuizL1';

export const slides = {
  1: CoverSlide,
  2: CourseObjectivesReferences,
  3: StaticEquilibriumCheck,
  4: EquilibriumQuizL1,
};

export const sectionMetadata = {
  1: { title: 'Shear Force & Bending Moment Diagrams', type: 'Cover Slide', section: 'Introduction' },
  2: { title: 'Course Objectives & References', type: 'Concept Details', section: 'Introduction' },
  3: { title: 'Static Equilibrium Prerequisite Check', type: 'Live Sandbox', section: 'Introduction' },
  4: { title: 'Checkpoint 1: Static Equilibrium Check', type: 'Concept Details', section: 'Introduction' },
};
