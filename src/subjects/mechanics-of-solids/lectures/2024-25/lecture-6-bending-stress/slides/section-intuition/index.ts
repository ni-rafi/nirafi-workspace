import { PhysicalFailureSlide } from './PhysicalFailureSlide';
import { HandBendingSlide } from './HandBendingSlide';
import { SpringDiagramSlide } from './SpringDiagramSlide';
import { StraightSpringSlide } from './StraightSpringSlide';
import { IsolatedBoundariesSlide } from './IsolatedBoundariesSlide';
import { BentSpringSlide } from './BentSpringSlide';
import { StressFieldAnalysisSlide } from './StressFieldAnalysisSlide';
import { StraightBeamSlide } from './StraightBeamSlide';
import { SaggingBeamSlide } from './SaggingBeamSlide';
import { HoggingBeamSlide } from './HoggingBeamSlide';
import { Checkpoint1Slide } from './Checkpoint1Slide';

export const slides = {
  1: PhysicalFailureSlide,
  2: HandBendingSlide,
  3: SpringDiagramSlide,
  4: StraightSpringSlide,
  5: IsolatedBoundariesSlide,
  6: BentSpringSlide,
  7: StressFieldAnalysisSlide,
  8: StraightBeamSlide,
  9: SaggingBeamSlide,
  10: HoggingBeamSlide,
  11: Checkpoint1Slide,
};

export const sectionMetadata = {
  1: { title: 'Physical Failure Samples (Wood Beams)', type: 'Concept Details', section: 'Intuition' },
  2: { title: 'Hand-bending Example (Spaghetti/Stick)', type: 'Concept Details', section: 'Intuition' },
  3: { title: 'Diagram of a Lateral Bending Spring', type: 'Concept Details', section: 'Intuition' },
  4: { title: 'Straight Reference Spring', type: 'Concept Details', section: 'Intuition' },
  5: { title: 'Isolated Straight Boundaries', type: 'Concept Details', section: 'Intuition' },
  6: { title: 'Bent Coil Spring with Guidelines', type: 'Concept Details', section: 'Intuition' },
  7: { title: 'Text-Based Stress Field Analysis', type: 'Concept Details', section: 'Intuition' },
  8: { title: 'Straight Beam Element', type: 'Concept Details', section: 'Intuition' },
  9: { title: 'Sagging Curved Beam (Positive Curvature)', type: 'Concept Details', section: 'Intuition' },
  10: { title: 'Hogging Curved Beam (Negative Curvature)', type: 'Concept Details', section: 'Intuition' },
  11: { title: 'Checkpoint 1: Stress States in Bending', type: 'Checkpoint Quiz', section: 'Intuition', quizId: 'mos_2024_lec6_q1' },
};
