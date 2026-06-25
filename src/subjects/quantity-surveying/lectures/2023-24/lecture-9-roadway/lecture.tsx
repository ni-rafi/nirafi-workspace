import React from 'react';
import { SlideProps } from '@/features/presentation/components/slides/SlideRenderer';
import { TopicDividerLayout } from '@/shared/layouts/TopicDividerLayout';
import {
  Slide1,
  Slide2 as PavementDivSlide,
  Slide3 as PavementStratSlide,
  Slide4 as PavementCompactionSlide,
  Slide5 as PavementBitumenSlide,
  Slide6 as PavementSandboxSlide
} from './slides/PavementSlides';
import {
  SlidePavementHBB,
  SlidePavementBitumenProtocols,
  SlidePavementCompaction
} from './slides/PavementExecutionSlides';
import {
  SlideRetainingWallDivider,
  SlideRetainingWallClassifications,
  SlideRetainingWallAnatomy,
  SlideRetainingWallGeometry,
  SlideRetainingWallDrainage,
  SlideRetainingWallSandbox
} from './slides/RetainingWallSlides';
import {
  Slide11 as WallRebarSlide,
  Slide14 as CulvertTypeLimitSlide,
  Slide15 as SlabAnatomySlide,
  Slide16 as SlabBearingSlide,
  Slide17 as CulvertRebarSlide
} from './slides/SlabCulvertAndWallBBS';
import {
  Slide11 as CulvertDivSlide,
  Slide12 as BoxCulvertSlide,
  Slide13 as HumePipeSlide,
  Slide14 as CulvertSandboxSlide
} from './slides/CulvertSlides';
import {
  SlideCulvertTypologies,
  SlideCulvertFoundationSoling
} from './slides/CulvertTypesSlides';
import {
  Slide15 as QuizSlide15,
  Slide16 as QuizSlide16,
  SlideQuiz3,
  SlideQuiz4,
  SlideLabDirectives,
  Slide17 as ConclusionSlide17
} from './slides/RulesAndQuizzes';

const FoundationDivider: React.FC = () => (
  <TopicDividerLayout
    topicNumber="04"
    title="Culvert Foundation Measurement Rules"
    description="Subgrade Stabilization, Brick Flat Soling Take-off, and Material Estimations"
  />
);

const DirectivesDivider: React.FC = () => (
  <TopicDividerLayout
    topicNumber="05"
    title="Lab Directives & Interactive Checkpoints"
    description="Submission Rules, Course Outcome Alignment, and Parameterized Concept Quizzes"
  />
);

export const slides: Record<number, React.ComponentType<SlideProps>> = {
  1: Slide1,
  2: PavementDivSlide,
  3: PavementStratSlide,
  4: PavementCompactionSlide,
  5: PavementBitumenSlide,
  6: PavementSandboxSlide,
  7: SlidePavementHBB,
  8: SlidePavementBitumenProtocols,
  9: SlidePavementCompaction,
  10: SlideRetainingWallDivider,
  11: SlideRetainingWallClassifications,
  12: SlideRetainingWallAnatomy,
  13: SlideRetainingWallGeometry,
  14: SlideRetainingWallDrainage,
  15: WallRebarSlide,
  16: SlideRetainingWallSandbox,
  17: CulvertDivSlide,
  18: CulvertTypeLimitSlide,
  19: SlideCulvertTypologies,
  20: SlabAnatomySlide,
  21: SlabBearingSlide,
  22: CulvertRebarSlide,
  23: BoxCulvertSlide,
  24: HumePipeSlide,
  25: CulvertSandboxSlide,
  26: FoundationDivider,
  27: SlideCulvertFoundationSoling,
  28: DirectivesDivider,
  29: SlideLabDirectives,
  30: QuizSlide15,
  31: QuizSlide16,
  32: SlideQuiz3,
  33: SlideQuiz4,
  34: ConclusionSlide17,
};

export const slideMetadata: Record<
  number,
  import('@/features/presentation/components/slides/SlideRenderer').SlideMetadata
> = {
  1: { title: 'Estimation of Roadway: Pavements, Retaining Wall & Culvert', type: 'Cover Slide', section: 'Introduction' },
  2: { title: 'Flexible Road Pavements Divider', type: 'Cover Slide', section: 'Flexible Road Pavements' },
  3: { title: 'Pavement Stratification', type: 'Concept Details', section: 'Flexible Road Pavements' },
  4: { title: 'Volumetric Layering Rule & Compaction', type: 'Concept Details', section: 'Flexible Road Pavements' },
  5: { title: 'Bituminous Carpeting & Seal Coat', type: 'Concept Details', section: 'Flexible Road Pavements' },
  6: { title: 'Pavement Volumetric Sandbox', type: 'Live Sandbox', section: 'Flexible Road Pavements' },
  7: { title: 'Herring Bone Bond (HBB) Pavements', type: 'Concept Details', section: 'Flexible Road Pavements' },
  8: { title: 'Bituminous Carpeting Protocols', type: 'Concept Details', section: 'Flexible Road Pavements' },
  9: { title: 'Base Layer Compaction Metrics', type: 'Concept Details', section: 'Flexible Road Pavements' },
  10: { title: 'Retaining Wall Divider', type: 'Cover Slide', section: 'Retaining Wall' },
  11: { title: 'Classification of Retaining Walls', type: 'Concept Details', section: 'Retaining Wall' },
  12: { title: 'Anatomy of a Cantilever Retaining Wall', type: 'Concept Details', section: 'Retaining Wall' },
  13: { title: 'Retaining Wall Geometry', type: 'Concept Details', section: 'Retaining Wall' },
  14: { title: 'Drainage Systems & Backfill', type: 'Concept Details', section: 'Retaining Wall' },
  15: { title: 'Retaining Wall Reinforcement', type: 'Concept Details', section: 'Retaining Wall' },
  16: { title: 'Retaining Wall Sandbox', type: 'Live Sandbox', section: 'Retaining Wall' },
  17: { title: 'Box & Pipe Culverts Divider', type: 'Cover Slide', section: 'Box & Pipe Culverts' },
  18: { title: 'Culvert Classifications & Limits', type: 'Concept Details', section: 'Box & Pipe Culverts' },
  19: { title: 'Specialized Culvert Typologies', type: 'Concept Details', section: 'Box & Pipe Culverts' },
  20: { title: 'Anatomy of an RCC Slab Culvert', type: 'Concept Details', section: 'Box & Pipe Culverts' },
  21: { title: 'The Slab Bearing Deduction Rule', type: 'Concept Details', section: 'Box & Pipe Culverts' },
  22: { title: 'Slab Culvert BBS Spacing Nuances', type: 'Concept Details', section: 'Box & Pipe Culverts' },
  23: { title: 'RCC Box Culvert & Void Deductions', type: 'Concept Details', section: 'Box & Pipe Culverts' },
  24: { title: 'Hume Pipe Culverts & Cradle Bedding', type: 'Concept Details', section: 'Box & Pipe Culverts' },
  25: { title: 'Culvert Quantity Sandbox', type: 'Live Sandbox', section: 'Box & Pipe Culverts' },
  26: { title: 'Culvert Foundation Divider', type: 'Cover Slide', section: 'Box & Pipe Culverts' },
  27: { title: 'Culvert Abutment Foundation & Soling', type: 'Concept Details', section: 'Box & Pipe Culverts' },
  28: { title: 'Lab Directives & Interactive Checkpoints Divider', type: 'Cover Slide', section: 'Quizzes' },
  29: { title: 'Lab Report 9 Submission Directives', type: 'Concept Details', section: 'Quizzes' },
  30: { title: 'Pavement Volume Checkpoint', type: 'Concept Details', section: 'Quizzes', quizId: 'qs_2023_lec9_q1' },
  31: { title: 'Culvert Concrete Checkpoint', type: 'Concept Details', section: 'Quizzes', quizId: 'qs_2023_lec9_q2' },
  32: { title: 'Retaining Wall Stem Concrete Checkpoint', type: 'Concept Details', section: 'Quizzes', quizId: 'qs_2023_lec9_q3' },
  33: { title: 'Culvert Abutment Soling Area Checkpoint', type: 'Concept Details', section: 'Quizzes', quizId: 'qs_2023_lec9_q4' },
  34: { title: 'Conclusion', type: 'Thank You Slide', section: 'Conclusion' },
};
