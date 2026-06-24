import React from 'react';
import { SlideProps } from '@/features/presentation/components/slides/SlideRenderer';

import { Slide1, Slide2, Slide3 } from './slides/PrinciplesSlides';
import { Slide1 as EstSlide1, Slide2 as EstSlide2, Slide3 as EstSlide3 } from './slides/EstimatesSlides';
import { Slide1 as WallSlide1, Slide2 as WallSlide2, Slide3 as WallSlide3, Slide4 as WallSlide4 } from './slides/WallMeasurementSlides';
import { Slide3 as EarthworkDivider, Slide4 as CentreLineDeduction, Slide5 as FieldRealities, Slide6 as SoilBulking, Slide6B as SoilBulkingSandbox } from './slides/EarthworkSlides';
import { Slide7 as BfsBedding, Slide7B as BfsSandbox, Slide8 as LeanCc, Slide8B as LeanCcSandbox, Slide9 as RccFooting } from './slides/ConcreteSlides';
import {
  Slide9 as FootingWorkedExample,
  Slide10 as SandCushionRealities,
  Slide11 as FootingMath,
  Slide12 as FootingLedger,
  Slide13 as FootingPrecision
} from './slides/WorkedExampleSlides';
import {
  Slide10_Anatomy as SteppedMasonryAnatomy,
  Slide10_Breakdown as SteppedMasonryBreakdown,
  Slide10_Ledger as SteppedMasonryLedger,
  Slide11 as DpcDeduction,
  Slide12 as DpmSlab
} from './slides/FoundationMasonrySlides';
import { Slide13 as DimensionAnatomy, Slide14 as AddDeduct, Slide15 as ClassSummary } from './slides/StudioPracticeSlides';

import { LectureThankYou } from '@/shared/layouts/LectureThankYou';

export const slides: Record<number, React.ComponentType<SlideProps>> = {
  1: Slide1,
  2: EstSlide1,
  3: EstSlide2,
  4: EstSlide3,
  5: Slide2,
  6: Slide3,
  7: EarthworkDivider,
  8: WallSlide1,
  9: WallSlide2,
  10: WallSlide3,
  11: WallSlide4,
  12: CentreLineDeduction,
  13: FieldRealities,
  14: SoilBulking,
  15: SoilBulkingSandbox,
  16: BfsBedding,
  17: BfsSandbox,
  18: LeanCc,
  19: LeanCcSandbox,
  20: RccFooting,
  21: FootingWorkedExample,
  22: SandCushionRealities,
  23: FootingMath,
  24: FootingLedger,
  25: FootingPrecision,
  26: SteppedMasonryAnatomy,
  27: SteppedMasonryBreakdown,
  28: SteppedMasonryLedger,
  29: DpcDeduction,
  30: DpmSlab,
  31: DimensionAnatomy,
  32: AddDeduct,
  33: ClassSummary,
  34: (props) => <LectureThankYou {...props} />,
};

export const slideMetadata: Record<
  number,
  import('@/features/presentation/components/slides/SlideRenderer').SlideMetadata
> = {
  1: { title: 'Substructure Estimation', type: 'Cover Slide', section: 'Introduction' },
  2: { title: 'Types of Estimates', type: 'Concept Details', section: 'Introduction' },
  3: { title: 'Defining the Core Estimate Types', type: 'Concept Details', section: 'Introduction' },
  4: { title: 'Estimates for Project Variations', type: 'Concept Details', section: 'Introduction' },
  5: { title: 'Principles of Measurement', type: 'Concept Details', section: 'Introduction' },
  6: { title: 'Measurement Sandbox', type: 'Live Sandbox', section: 'Introduction' },
  7: { title: 'Earthwork Divider', type: 'Cover Slide', section: 'Earthwork' },
  8: { title: 'Methods of Taking Out Quantities', type: 'Concept Details', section: 'Earthwork' },
  9: { title: 'Long Wall - Short Wall Method (Out-to-Out & In-to-In)', type: 'Concept Details', section: 'Earthwork' },
  10: { title: 'The Center Line Method & Junctions', type: 'Concept Details', section: 'Earthwork' },
  11: { title: 'Partly Center Line and Partly Cross Wall Method', type: 'Concept Details', section: 'Earthwork' },
  12: { title: 'Centre Line Deductions', type: 'Concept Details', section: 'Earthwork' },
  13: { title: 'Field Realities & Dewatering', type: 'Concept Details', section: 'Earthwork' },
  14: { title: 'Soil Bulking & Backfill', type: 'Concept Details', section: 'Earthwork' },
  15: { title: 'Soil Bulking Sandbox', type: 'Live Sandbox', section: 'Earthwork' },
  16: { title: 'Brick Flat Soling (BFS)', type: 'Concept Details', section: 'Concrete Bedding' },
  17: { title: 'BFS Take-off Sandbox', type: 'Live Sandbox', section: 'Concrete Bedding' },
  18: { title: 'Lean Concrete Base', type: 'Concept Details', section: 'Concrete Bedding' },
  19: { title: 'Lean CC Volume Sandbox', type: 'Live Sandbox', section: 'Concrete Bedding' },
  20: { title: 'Reinforced concrete Footing', type: 'Concept Details', section: 'Concrete Bedding' },
  21: { title: 'Sessional Footing Example', type: 'Concept Details', section: 'Concrete Bedding' },
  22: { title: 'Sand Cushion Realities', type: 'Concept Details', section: 'Concrete Bedding' },
  23: { title: 'Footing Math Computations', type: 'Concept Details', section: 'Concrete Bedding' },
  24: { title: 'Footing MB Ledger', type: 'Spreadsheet View', section: 'Concrete Bedding' },
  25: { title: 'MB Precision Rules', type: 'Concept Details', section: 'Concrete Bedding' },
  26: { title: 'Stepped Masonry Foundation Profile', type: 'Concept Details', section: 'Foundation Masonry' },
  27: { title: 'Measurement Rules for Stepped Footings', type: 'Concept Details', section: 'Foundation Masonry' },
  28: { title: 'Ledger Entry: Brickwork in Foundation (up to GL)', type: 'Spreadsheet View', section: 'Foundation Masonry' },
  29: { title: 'DPC Door Deductions', type: 'Concept Details', section: 'Foundation Masonry' },
  30: { title: 'Damp-Proof Membrane (DPM)', type: 'Concept Details', section: 'Foundation Masonry' },
  31: { title: 'Dimension Paper Layout', type: 'Spreadsheet View', section: 'Studio Practice' },
  32: { title: 'Add & Deduct Notations', type: 'Concept Details', section: 'Studio Practice' },
  33: { title: 'Class 2 Summary', type: 'Concept Details', section: 'Studio Practice' },
  34: { title: 'Conclusion', type: 'Thank You Slide', section: 'Conclusion' },
};
