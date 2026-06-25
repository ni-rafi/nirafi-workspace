import React from 'react';
import { SlideProps } from '@/features/presentation/components/slides/SlideRenderer';

// 1. Roadway Geometry Slides
import {
  Slide1,
  Slide2,
  Slide3,
  Slide4,
  Slide5,
  Slide6 as GeoSlide6
} from './slides/RoadwayGeometrySlides';

// 2. Core Methods Slides
import {
  Slide6 as MethodSlide6,
  Slide7 as MethodSlide7,
  Slide8 as MethodSlide8,
  Slide9 as MethodSlide9,
  Slide16 as MethodSlide16,
  Slide17 as MethodSlide17
} from './slides/EarthworkMethodsSlides';

// 3. Longitudinal Gradients Slides (New!)
import {
  GradientsDividerSlide,
  LongitudinalGradientsSlide1,
  LongitudinalGradientsSlide2
} from './slides/LongitudinalGradientsSlides';

// 4. Soil Volumetrics Slides
import {
  Slide7 as SoilSlide7,
  Slide8 as SoilSlide8,
  Slide9 as SoilSlide9,
  Slide10 as SoilSlide10,
  Slide11 as SoilSlide11,
  Slide12 as SoilSlide12
} from './slides/SoilVolumetricsSlides';

// 5. Protection and Billing Slides (New!)
import {
  TurfingSlide,
  BoxCuttingSlide
} from './slides/ProtectionAndBillingSlides';

// 6. Area Grid Method Slides (New!)
import {
  GridMethodDividerSlide,
  GridMethodSlide1,
  GridMethodSlide2,
  GridMethodInteractiveSlide
} from './slides/AreaGridMethodSlides';

// 7. PWD Rate Analysis, Directives, and Quizzes Slides
import {
  Slide13 as PwdSlide13,
  Slide14 as PwdSlide14,
  SubmissionDirectivesSlide,
  QuizzesDividerSlide,
  Slide15 as PwdSlide15,
  Slide16 as PwdSlide16,
  GradientFLQuizSlide,
  GridCellVolumeQuizSlide,
  Slide17 as PwdSlide17
} from './slides/PWDRateAnalysisRulesAndQuizzes';

export const slides: Record<number, React.ComponentType<SlideProps>> = {
  1: Slide1,
  2: Slide2,
  3: Slide3,
  4: Slide4,
  5: Slide5,
  6: MethodSlide6,
  7: MethodSlide7,
  8: MethodSlide8,
  9: MethodSlide9,
  10: GeoSlide6,
  11: GradientsDividerSlide,
  12: LongitudinalGradientsSlide1,
  13: LongitudinalGradientsSlide2,
  14: SoilSlide7,
  15: SoilSlide8,
  16: SoilSlide9,
  17: TurfingSlide,
  18: SoilSlide10,
  19: SoilSlide11,
  20: MethodSlide16,
  21: MethodSlide17,
  22: SoilSlide12,
  23: BoxCuttingSlide,
  24: GridMethodDividerSlide,
  25: GridMethodSlide1,
  26: GridMethodSlide2,
  27: GridMethodInteractiveSlide,
  28: PwdSlide13,
  29: PwdSlide14,
  30: SubmissionDirectivesSlide,
  31: QuizzesDividerSlide,
  32: PwdSlide15,
  33: PwdSlide16,
  34: GradientFLQuizSlide,
  35: GridCellVolumeQuizSlide,
  36: PwdSlide17,
};

export const slideMetadata: Record<
  number,
  import('@/features/presentation/components/slides/SlideRenderer').SlideMetadata
> = {
  1: { title: 'Roadway Earthwork Estimation', type: 'Cover Slide', section: 'Introduction' },
  2: { title: 'Roadway Geometric Mechanics', type: 'Cover Slide', section: 'Geometry' },
  3: { title: 'Roadway Cross-Section Anatomy', type: 'Concept Details', section: 'Geometry' },
  4: { title: 'Cross-Section Area Sandbox', type: 'Live Sandbox', section: 'Geometry' },
  5: { title: 'Earthwork Mathematical Triad', type: 'Concept Details', section: 'Geometry' },
  6: { title: 'Core Methods for Earthwork Computation', type: 'Concept Details', section: 'Geometry' },
  7: { title: 'Mid-Section Method Formula', type: 'Concept Details', section: 'Geometry' },
  8: { title: 'Trapezoidal Method Formula', type: 'Concept Details', section: 'Geometry' },
  9: { title: 'Prismoidal Formula (Simpson\'s Rule)', type: 'Concept Details', section: 'Geometry' },
  10: { title: 'Longitudinal Profile Sandbox', type: 'Live Sandbox', section: 'Geometry' },
  11: { title: 'Longitudinal Gradients & Formation Levels', type: 'Cover Slide', section: 'Gradients' },
  12: { title: 'Longitudinal Slopes & Gradients', type: 'Concept Details', section: 'Gradients' },
  13: { title: 'Calculating FL at Chainage Stations', type: 'Concept Details', section: 'Gradients' },
  14: { title: 'Soil Volumetrics & Compaction', type: 'Cover Slide', section: 'Soil Volumetrics' },
  15: { title: 'Volumetric States of Soil', type: 'Concept Details', section: 'Soil Volumetrics' },
  16: { title: 'Compaction & Bulking Sandbox', type: 'Live Sandbox', section: 'Soil Volumetrics' },
  17: { title: 'Embankment Protection: Turfing', type: 'Concept Details', section: 'Soil Volumetrics' },
  18: { title: 'PWD Rate Analysis Standards', type: 'Cover Slide', section: 'PWD Standards' },
  19: { title: 'PWD Haulage Controls: Lead & Lift Rules', type: 'Concept Details', section: 'PWD Standards' },
  20: { title: 'Structuring the Earthwork Computation Table', type: 'Concept Details', section: 'PWD Standards' },
  21: { title: 'Ledger Adjustments for Advanced Methods', type: 'Concept Details', section: 'PWD Standards' },
  22: { title: 'PWD Tabular Earthwork Spreadsheet', type: 'Live Sandbox', section: 'PWD Standards' },
  23: { title: 'Earthwork in Box Cutting (PWD Item 24.2)', type: 'Concept Details', section: 'PWD Standards' },
  24: { title: 'Area Excavations (Spot Level/Grid Method)', type: 'Cover Slide', section: 'Grid Method' },
  25: { title: 'Area Excavations & Spot Levels', type: 'Concept Details', section: 'Grid Method' },
  26: { title: 'Grid Cell Volume Calculation Formula', type: 'Concept Details', section: 'Grid Method' },
  27: { title: 'Spot Levels & Grid Cell Modeling', type: 'Concept Details', section: 'Grid Method' },
  28: { title: 'Studio Directive & Measurement Rules', type: 'Cover Slide', section: 'Measurement Rules' },
  29: { title: 'Trades Segregation & Measurement Rules', type: 'Concept Details', section: 'Measurement Rules' },
  30: { title: 'Lab Report 8 Submission Directives', type: 'Concept Details', section: 'Measurement Rules' },
  31: { title: 'Interactive Checkpoints', type: 'Cover Slide', section: 'Quizzes' },
  32: { title: 'Roadway Cross-Section Area Quiz', type: 'Concept Details', section: 'Quizzes', quizId: 'qs_2023_lec8_q1' },
  33: { title: 'Compacted Embankment Soil Volume Quiz', type: 'Concept Details', section: 'Quizzes', quizId: 'qs_2023_lec8_q2' },
  34: { title: 'Roadway Gradient FL Checkpoint Quiz', type: 'Concept Details', section: 'Quizzes', quizId: 'qs_2023_lec8_q3' },
  35: { title: 'Grid Cell Volume Checkpoint Quiz', type: 'Concept Details', section: 'Quizzes', quizId: 'qs_2023_lec8_q4' },
  36: { title: 'Conclusion', type: 'Thank You Slide', section: 'Conclusion' },
};
