import { LinearStressDistributionSlide } from './LinearStressDistributionSlide';
import { StructuralMappingSlide } from './StructuralMappingSlide';
import { BeamSectionSandboxSlide } from './BeamSectionSandboxSlide';
import { BendingStressEnvelopeSlide } from './BendingStressEnvelopeSlide';
import { CompositeBeamsSandboxSlide } from './CompositeBeamsSandboxSlide';
import { Checkpoint4Slide } from './Checkpoint4Slide';

export const slides = {
  1: LinearStressDistributionSlide,
  2: StructuralMappingSlide,
  3: BeamSectionSandboxSlide,
  4: BendingStressEnvelopeSlide,
  5: CompositeBeamsSandboxSlide,
  6: Checkpoint4Slide,
};

export const sectionMetadata = {
  1: { title: 'Linear Stress Distribution Diagram', type: 'Concept Details', section: 'Stress Profiles & Sandboxes' },
  2: { title: 'Comprehensive Structural Mapping', type: 'Concept Details', section: 'Stress Profiles & Sandboxes' },
  3: { title: 'Beam Section Sandbox', type: 'Live Sandbox', section: 'Stress Profiles & Sandboxes' },
  4: { title: 'Bending Stress Envelope Sandbox', type: 'Live Sandbox', section: 'Stress Profiles & Sandboxes' },
  5: { title: 'Composite Beams Sandbox', type: 'Live Sandbox', section: 'Stress Profiles & Sandboxes' },
  6: { title: 'Checkpoint 4: Advanced Bending Stress', type: 'Checkpoint Quiz', section: 'Stress Profiles & Sandboxes', quizId: 'mos_2024_lec6_q4' },
};
