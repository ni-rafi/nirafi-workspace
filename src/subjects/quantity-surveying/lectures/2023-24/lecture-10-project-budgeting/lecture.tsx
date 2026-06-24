import React from 'react';
import { SlideProps } from '@/features/presentation/components/slides/SlideRenderer';
import {
  Slide1,
  Slide2,
  Slide3 as OldSlide3,
  Slide4 as OldSlide4,
  Slide5 as OldSlide5,
} from './slides/AbstractMarkupsSlides';
import {
  Slide3 as NewSlide3,
  Slide4 as NewSlide4,
  Slide7 as NewSlide7,
  Slide8 as NewSlide8,
  Slide15 as NewSlide15,
} from './slides/SessionalProjectBudgetingSlides';
import {
  Slide6 as OldSlide6,
  Slide7 as OldSlide7,
  Slide8 as OldSlide8,
  Slide9 as OldSlide9,
} from './slides/InterimBillingSlides';
import {
  Slide10 as OldSlide10,
  Slide11 as OldSlide11,
  Slide12 as OldSlide12,
  Slide13 as OldSlide13,
} from './slides/ProjectDefenseAndFinalAccountability(Viva)';

export const slides: Record<number, React.ComponentType<SlideProps>> = {
  1: Slide1,
  2: Slide2,
  3: NewSlide3,
  4: NewSlide4,
  5: OldSlide3,
  6: OldSlide4,
  7: NewSlide7,
  8: NewSlide8,
  9: OldSlide5,
  10: OldSlide6,
  11: OldSlide7,
  12: OldSlide8,
  13: OldSlide9,
  14: OldSlide10,
  15: NewSlide15,
  16: OldSlide11,
  17: OldSlide12,
  18: OldSlide13,
};

export const slideMetadata: Record<
  number,
  import('@/features/presentation/components/slides/SlideRenderer').SlideMetadata
> = {
  1: { title: 'Project Budgeting & Progress Payments', type: 'Cover Slide', section: 'Introduction' },
  2: { title: 'Abstract of Costs Ledger Assembly', type: 'Concept Details', section: 'Budget Compilation' },
  3: { title: 'Rate Analysis: Building the Unit Price', type: 'Concept Details', section: 'Budget Compilation' },
  4: { title: 'The 5 Components of a Unit Rate', type: 'Live Sandbox', section: 'Budget Compilation' },
  5: { title: 'Contractual Additions & Profit Allocations', type: 'Concept Details', section: 'Budget Compilation' },
  6: { title: 'Statutory Deductions: NBR Split Matrix', type: 'Concept Details', section: 'Budget Compilation' },
  7: { title: 'Defining the Complete Estimate', type: 'Concept Details', section: 'Budget Compilation' },
  8: { title: 'The Complete Estimate Cost Tree', type: 'Live Sandbox', section: 'Budget Compilation' },
  9: { title: 'Interim Progress Payments', type: 'Cover Slide', section: 'Progress Payments' },
  10: { title: 'The Measurement Book Progress Abstract', type: 'Concept Details', section: 'Progress Payments' },
  11: { title: 'Payment Deductions: Retainage & Advance Recovery', type: 'Concept Details', section: 'Progress Payments' },
  12: { title: 'Progressive IPC Invoice Sandbox', type: 'Live Sandbox', section: 'Progress Payments' },
  13: { title: 'Project Defense & Final Accountability', type: 'Cover Slide', section: 'Project Defense' },
  14: { title: 'Evaluating Project Budget Variance', type: 'Concept Details', section: 'Project Defense' },
  15: { title: 'Macro Budgeting Additions', type: 'Concept Details', section: 'Project Defense' },
  16: { title: 'The Final Technical Viva Voce', type: 'Concept Details', section: 'Project Defense' },
  17: { title: 'Progressive IPC Checkpoint Quiz', type: 'Concept Details', section: 'Quizzes', quizId: 'qs_2023_lec10_q1' },
  18: { title: 'Conclusion', type: 'Thank You Slide', section: 'Conclusion' },
};
