import { RectangularAxisSlide } from './RectangularAxisSlide';
import { ParallelAxisSlide } from './ParallelAxisSlide';
import { CompoundSectionSlide } from './CompoundSectionSlide';
import { CentroidAnimationSlide } from './CentroidAnimationSlide';
import { InertiaAssemblySlide } from './InertiaAssemblySlide';
import { GeometrySummarySlide } from './GeometrySummarySlide';
import { Checkpoint1Slide } from './Checkpoint1Slide';

export const slides = {
  1: RectangularAxisSlide,
  2: ParallelAxisSlide,
  3: CompoundSectionSlide,
  4: CentroidAnimationSlide,
  5: InertiaAssemblySlide,
  6: GeometrySummarySlide,
  7: Checkpoint1Slide,
};

export const sectionMetadata = {
  1: { title: 'Standard Rectangular Axis Inertia', type: 'Concept Details', section: 'Area Moment of Inertia' },
  2: { title: 'The Parallel Axis Theorem', type: 'Concept Details', section: 'Area Moment of Inertia' },
  3: { title: 'Compound Asymmetric Section Profile Frame', type: 'Concept Details', section: 'Area Moment of Inertia' },
  4: { title: 'Component Centroidal Mapping & Global Centroid', type: 'Concept Details', section: 'Area Moment of Inertia' },
  5: { title: 'Total Global Inertia Assembly', type: 'Concept Details', section: 'Area Moment of Inertia' },
  6: { title: 'Consolidated Area Properties Summary', type: 'Concept Details', section: 'Area Moment of Inertia' },
  7: { title: 'Checkpoint 1: Parallel Axis Theorem', type: 'Checkpoint Quiz', section: 'Area Moment of Inertia', quizId: 'mos_2024_lec7_q1' },
};
