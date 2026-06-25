import React from 'react';
import { SlideProps } from '@/features/presentation/components/slides/SlideRenderer';
import {
  Slide1,
  Slide2,
  Slide3 as OldSlide3,
  Slide4 as OldSlide4,
  Slide5 as OldSlide5,
  SlideBudgetCompDiv,
  SlideQuizzesDiv,
} from './slides/AbstractMarkupsSlides';
import {
  Slide3 as NewSlide3,
  Slide4 as NewSlide4,
  Slide5 as NewSlide5,
  Slide12 as NewSlide12,
} from './slides/SessionalProjectBudgetingSlides';
import {
  Slide8 as SafetySlide8,
  Slide9 as SafetySlide9,
  Slide10 as SafetySlide10,
  Slide11 as SafetySlide11,
} from './slides/SiteFacilitiesAndSafetySlides';
import {
  Slide13 as EstimateSlide13,
  Slide14 as EstimateSlide14,
  Slide15 as EstimateSlide15,
  Slide22 as EstimateSlide22,
} from './slides/CompleteEstimateSlides';
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
  Slide14 as OldSlide14,
} from './slides/ProjectDefenseAndFinalAccountability(Viva)';

export const slides: Record<number, React.ComponentType<SlideProps>> = {
  1:  Slide1,              // Cover: Lecture 10 title
  2:  SlideBudgetCompDiv, // §01 Divider: Budget Compilation
  3:  Slide2,             // Abstract of Costs Ledger Assembly
  4:  NewSlide3,          // Rate Analysis: Building the Unit Price
  5:  NewSlide4,          // Interactive Rate Ledger Sandbox
  6:  NewSlide5,          // Micro-Rate Additions
  7:  OldSlide3,          // Contractual Additions & Profit Allocations
  8:  OldSlide4,          // Statutory Deductions: NBR Split Matrix
  9:  SafetySlide8,       // Billing Site Facilities (PWD Ch.1)
  10: SafetySlide9,       // Key Administrative BoQ Items
  11: SafetySlide10,      // Mandatory Health & Safety Budgeting
  12: SafetySlide11,      // Itemizing Site Safety Structures
  13: NewSlide12,         // Laboratory Testing Budgets
  14: EstimateSlide13,    // Defining the Complete Estimate
  15: EstimateSlide14,    // Complete Estimate Cost Tree
  16: EstimateSlide15,    // Permitting Fees & Owner Costs
  17: OldSlide5,          // §02 Divider: Interim Progress Payments
  18: OldSlide6,          // Measurement Book Progress Abstract
  19: OldSlide7,          // Payment Deductions: Retainage & Advance Recovery
  20: OldSlide8,          // Progressive IPC Invoice Sandbox
  21: OldSlide9,          // §03 Divider: Project Defense & Final Accountability
  22: OldSlide10,         // Evaluating Project Budget Variance
  23: EstimateSlide22,    // Macro Budgeting Additions
  24: OldSlide11,         // The Final Technical Viva Voce
  25: SlideQuizzesDiv,    // §04 Divider: Quizzes & Assessment
  26: OldSlide12,         // IPC Checkpoint Quiz (qs_2023_lec10_q1)
  27: OldSlide14,         // Source VAT Quiz (qs_2023_lec10_q2)
  28: OldSlide13,         // Conclusion
};

export const slideMetadata: Record<
  number,
  import('@/features/presentation/components/slides/SlideRenderer').SlideMetadata
> = {
  1:  { title: 'Project Budgeting & Progress Payments', type: 'Title Slide', section: 'Introduction' },
  2:  { title: 'Budget Compilation', type: 'Cover Slide', section: 'Budget Compilation' },
  3:  { title: 'Abstract of Costs Ledger Assembly', type: 'Concept Details', section: 'Budget Compilation' },
  4:  { title: 'Rate Analysis: Building the Unit Price', type: 'Concept Details', section: 'Budget Compilation' },
  5:  { title: 'The 5 Components of a Unit Rate', type: 'Live Sandbox', section: 'Budget Compilation' },
  6:  { title: 'Micro-Rate Additions: Water Charges & Contingencies', type: 'Concept Details', section: 'Budget Compilation' },
  7:  { title: 'Contractual Additions & Profit Allocations', type: 'Concept Details', section: 'Budget Compilation' },
  8:  { title: 'Statutory Deductions: NBR Split Matrix', type: 'Concept Details', section: 'Budget Compilation' },
  9:  { title: 'Billing "Site Facilities" (PWD Chapter 1)', type: 'Concept Details', section: 'Budget Compilation' },
  10: { title: 'Key Administrative BoQ Items', type: 'Concept Details', section: 'Budget Compilation' },
  11: { title: 'Mandatory Health & Safety Budgeting', type: 'Concept Details', section: 'Budget Compilation' },
  12: { title: 'Itemizing Site Safety Structures', type: 'Concept Details', section: 'Budget Compilation' },
  13: { title: 'Laboratory Testing Budgets', type: 'Concept Details', section: 'Budget Compilation' },
  14: { title: 'Defining the Complete Estimate', type: 'Concept Details', section: 'Budget Compilation' },
  15: { title: 'The Complete Estimate Cost Tree', type: 'Live Sandbox', section: 'Budget Compilation' },
  16: { title: 'Permitting Fees & Owner Costs', type: 'Concept Details', section: 'Budget Compilation' },
  17: { title: 'Interim Progress Payments', type: 'Cover Slide', section: 'Progress Payments' },
  18: { title: 'The Measurement Book Progress Abstract', type: 'Concept Details', section: 'Progress Payments' },
  19: { title: 'Payment Deductions: Retainage & Advance Recovery', type: 'Concept Details', section: 'Progress Payments' },
  20: { title: 'Progressive IPC Invoice Sandbox', type: 'Live Sandbox', section: 'Progress Payments' },
  21: { title: 'Project Defense & Final Accountability', type: 'Cover Slide', section: 'Project Defense' },
  22: { title: 'Evaluating Project Budget Variance', type: 'Concept Details', section: 'Project Defense' },
  23: { title: 'Macro Budgeting Additions', type: 'Concept Details', section: 'Project Defense' },
  24: { title: 'The Final Technical Viva Voce', type: 'Concept Details', section: 'Project Defense' },
  25: { title: 'Quizzes & Assessment', type: 'Cover Slide', section: 'Quizzes' },
  26: { title: 'Progressive IPC Checkpoint Quiz', type: 'Concept Details', section: 'Quizzes', quizId: 'qs_2023_lec10_q1' },
  27: { title: 'Source VAT Checkpoint Quiz', type: 'Concept Details', section: 'Quizzes', quizId: 'qs_2023_lec10_q2' },
  28: { title: 'Conclusion', type: 'Thank You Slide', section: 'Conclusion' },
};
