import { AssumptionsSlide } from './AssumptionsSlide';
import { BeamSegmentSetupSlide } from './BeamSegmentSetupSlide';
import { BentArcGeometrySlide } from './BentArcGeometrySlide';
import { ComparativeSynthesisSlide } from './ComparativeSynthesisSlide';
import { StrainDefinitionSlide } from './StrainDefinitionSlide';
import { SimilarTriangleSolutionSlide } from './SimilarTriangleSolutionSlide';
import { Checkpoint2Slide } from './Checkpoint2Slide';

export const slides = {
  1: AssumptionsSlide,
  2: BeamSegmentSetupSlide,
  3: BentArcGeometrySlide,
  4: ComparativeSynthesisSlide,
  5: StrainDefinitionSlide,
  6: SimilarTriangleSolutionSlide,
  7: Checkpoint2Slide,
};

export const sectionMetadata = {
  1: { title: 'Assumptions of Simple Bending', type: 'Concept Details', section: 'Derivation' },
  2: { title: 'Infinitesimal Beam Segment (dx) Setup', type: 'Concept Details', section: 'Derivation' },
  3: { title: 'Bent Arc Geometry', type: 'Concept Details', section: 'Derivation' },
  4: { title: 'Comparative Synthesis', type: 'Concept Details', section: 'Derivation' },
  5: { title: 'Strain Definition Equations', type: 'Concept Details', section: 'Derivation' },
  6: { title: 'Geometric Similar Triangle Solution', type: 'Concept Details', section: 'Derivation' },
  7: { title: 'Checkpoint 2: Kinematic Assumptions', type: 'Checkpoint Quiz', section: 'Derivation', quizId: 'mos_2024_lec6_q2' },
};
