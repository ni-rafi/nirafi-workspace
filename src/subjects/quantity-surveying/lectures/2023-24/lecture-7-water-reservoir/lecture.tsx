import React from 'react';
import { SlideProps } from '@/features/presentation/components/slides/SlideRenderer';

import {
  Slide1,
  Slide2,
  Slide3,
  Slide4,
  Slide5,
  Slide6,
  Slide7 as ReservoirSlide7,
  Slide8 as ReservoirSlide8
} from './slides/ReservoirSlides';
import {
  Slide7 as BBSSlide7,
  Slide8 as BBSSlide8
} from './slides/ReservoirBBSSlides';
import {
  Slide9 as SepticSlide9,
  Slide10 as SepticSlide10,
  Slide11 as SepticSlide11,
  Slide12 as SepticSlide12
} from './slides/SepticTankSlides';
import {
  Slide13 as InspectionSlide13,
  Slide16 as SoakPitSlide16
} from './slides/InspectionPitSlides';
import {
  Slide13 as RulesSlide13,
  Slide14 as RulesSlide14,
  Slide15 as RulesSlide15,
  Slide16 as RulesSlide16,
  Slide17 as RulesSlide17
} from './slides/RulesAndQuizzes';
import {
  Slide19 as CostingSlide19,
  Slide20 as CostingSlide20
} from './slides/SepticCostingSlides';

export const slides: Record<number, React.ComponentType<SlideProps>> = {
  1: Slide1,
  2: Slide2,
  3: Slide3,
  4: Slide4,
  5: Slide5,
  6: Slide6,
  7: BBSSlide7,
  8: BBSSlide8,
  9: ReservoirSlide7,
  10: ReservoirSlide8,
  11: SepticSlide9,
  12: SepticSlide10,
  13: InspectionSlide13,
  14: SepticSlide11,
  15: SepticSlide12,
  16: SoakPitSlide16,
  17: RulesSlide13,
  18: RulesSlide14,
  19: CostingSlide19,
  20: CostingSlide20,
  21: RulesSlide15,
  22: RulesSlide16,
  23: RulesSlide17,
};

export const slideMetadata: Record<
  number,
  import('@/features/presentation/components/slides/SlideRenderer').SlideMetadata
> = {
  1: { title: 'Water Reservoir & Septic Tank', type: 'Cover Slide', section: 'Introduction' },
  2: { title: 'Water Reservoir divider', type: 'Cover Slide', section: 'Water Reservoir' },
  3: { title: 'Excavation Logistics & Shoring', type: 'Concept Details', section: 'Water Reservoir' },
  4: { title: 'Excavation Volume Sandbox', type: 'Live Sandbox', section: 'Water Reservoir' },
  5: { title: 'RCC Concrete Containment Shell', type: 'Concept Details', section: 'Water Reservoir' },
  6: { title: 'RCC Shell Volume Sandbox', type: 'Live Sandbox', section: 'Water Reservoir' },
  7: { title: 'Reservoir BBS Fundamentals', type: 'Concept Details', section: 'Water Reservoir' },
  8: { title: 'Calculating Reservoir Reinforcement', type: 'Concept Details', section: 'Water Reservoir' },
  9: { title: 'Waterproofing Admixtures & Finishes', type: 'Concept Details', section: 'Water Reservoir' },
  10: { title: 'Plaster Area & Chemical Sandbox', type: 'Live Sandbox', section: 'Water Reservoir' },
  11: { title: 'Septic Tank Divider', type: 'Cover Slide', section: 'Septic Tank' },
  12: { title: 'Septic Tank Anatomy & Take-offs', type: 'Concept Details', section: 'Septic Tank' },
  13: { title: 'Sanitary Junction: The Inspection Pit', type: 'Concept Details', section: 'Septic Tank' },
  14: { title: 'Soak Pit Filtration Structure', type: 'Concept Details', section: 'Septic Tank' },
  15: { title: 'Soak Pit Volume Sandbox', type: 'Live Sandbox', section: 'Septic Tank' },
  16: { title: 'Soak Pit Filtration Layers', type: 'Concept Details', section: 'Septic Tank' },
  17: { title: 'PWD SoR Divider', type: 'Cover Slide', section: 'PWD Measurement' },
  18: { title: 'Structural Trades vs. Plumbing Items', type: 'Concept Details', section: 'PWD Measurement' },
  19: { title: 'Septic Tank BoQ Assembly', type: 'Concept Details', section: 'PWD Measurement' },
  20: { title: 'Septic Tank Costing Ledger', type: 'Live Sandbox', section: 'PWD Measurement' },
  21: { title: 'Excavation Parameterized Checkpoint', type: 'Concept Details', section: 'Quizzes', quizId: 'qs_2023_lec7_q1' },
  22: { title: 'Soak Pit Loose Aggregate Checkpoint', type: 'Concept Details', section: 'Quizzes', quizId: 'qs_2023_lec7_q2' },
  23: { title: 'Conclusion', type: 'Thank You Slide', section: 'Conclusion' },
};
