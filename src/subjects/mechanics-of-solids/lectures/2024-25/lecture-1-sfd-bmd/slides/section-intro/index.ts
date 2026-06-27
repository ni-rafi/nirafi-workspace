import { CoverSlide } from './CoverSlide';
import { Lecture1References } from './Lecture1References';
import { CourseObjectivesReferences } from './CourseObjectivesReferences';
import { StaticEquilibriumCheck } from './StaticEquilibriumCheck';
import { EquilibriumQuizL1 } from './EquilibriumQuizL1';

export const slides = {
  1: CoverSlide,
  2: Lecture1References,
  3: CourseObjectivesReferences,
  4: StaticEquilibriumCheck,
  5: EquilibriumQuizL1,
};

export const sectionMetadata = {
  1: { title: 'Shear Force & Bending Moment Diagrams', type: 'Cover Slide', section: 'Introduction' },
  2: { title: 'References', type: 'Concept Details', section: 'Introduction' },
  3: { title: 'Course Objectives', type: 'Concept Details', section: 'Introduction' },
  4: { title: 'Static Equilibrium Prerequisite Check', type: 'Live Sandbox', section: 'Introduction' },
  5: { title: 'Checkpoint 1: Static Equilibrium Check', type: 'Concept Details', section: 'Introduction' },
};
