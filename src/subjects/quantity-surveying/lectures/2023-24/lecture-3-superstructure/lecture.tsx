import React from 'react';
import { SlideProps } from '@/features/presentation/components/slides/SlideRenderer';

import { Slide1, Slide2, Slide3, Slide4 } from './slides/OverviewSlides';
import { Slide1 as EstSlide1, Slide2 as EstSlide2, Slide3 as EstSlide3, Slide4 as EstSlide4, Slide5 as EstSlide5 } from './slides/ConceptualSlides';
import { Slide1 as SpecSlide1, Slide2 as SpecSlide2, Slide3 as SpecSlide3 } from './slides/SpecificationsSlides';
import { Slide5, Slide6, Slide7 } from './slides/RccSlides';
import { Slide8, Slide9, Slide10 } from './slides/MasonrySlides';
import { Slide11, Slide12, Slide13 } from './slides/DeductionSlides';
import { Slide14, Slide15, Slide16 } from './slides/FinishSlides';
import { Slide17, Slide18, Slide19 } from './slides/StudioSlides';

import { LectureThankYou } from '@/shared/layouts/LectureThankYou';

export const slides: Record<number, React.ComponentType<SlideProps>> = {
  1: Slide1, // Overview Cover
  2: EstSlide1, // Types of Construction Estimates
  3: EstSlide2, // Approximate Estimating Methods
  4: EstSlide3, // The Cubical Contents Method & Cost Modeler
  5: EstSlide4, // Methods of Taking Out Quantities
  6: EstSlide5, // Navigating Long Walls & Center Lines
  7: Slide2, // Defining Superstructure
  8: Slide3, // Grids & Load Paths
  9: Slide4, // Units of Measurement
  10: Slide5, // RCC Columns Net Height
  11: Slide6, // RCC Beams Clear Span
  12: Slide7, // RCC Slabs & Projections
  13: Slide8, // DPC Surface Area & Omissions
  14: Slide9, // Masonry Height Corrections
  15: Slide10, // Parapet Walls Detail
  16: Slide11, // Opening Deduction Protocol
  17: Slide12, // Lintel Bearings & Embedment
  18: Slide13, // Woodwork & Shutters Segregation
  19: Slide14, // Internal Plastering & Floor Area
  20: Slide15, // Plastering Voids Thresholds
  21: Slide16, // Skirting Linear Tracking
  22: SpecSlide1, // Analysis of Rates (AoR) Fundamentals
  23: SpecSlide2, // Volumetric Shrinkage Sandbox
  24: SpecSlide3, // Governing Quality and Cost: Specifications
  25: Slide17, // Measurement Ledger Setup
  26: Slide18, // Team Task Allocation
  27: Slide19, // Lab Report Requirements
  28: (props) => <LectureThankYou {...props} />, // Conclusion
};

export const slideMetadata: Record<
  number,
  import('@/features/presentation/components/slides/SlideRenderer').SlideMetadata
> = {
  1: { title: 'Superstructure Overview', type: 'Cover Slide', section: 'Introduction' },
  2: { title: 'Types of Construction Estimates', type: 'Concept Details', section: 'Introduction' },
  3: { title: 'Approximate Estimating Methods', type: 'Concept Details', section: 'Introduction' },
  4: { title: 'The Cubical Contents Method & Cost Modeler', type: 'Live Sandbox', section: 'Introduction' },
  5: { title: 'Methods of Taking Out Quantities', type: 'Concept Details', section: 'Introduction' },
  6: { title: 'Navigating Long Walls & Center Lines', type: 'Concept Details', section: 'Introduction' },
  7: { title: 'Defining Superstructure', type: 'Concept Details', section: 'Introduction' },
  8: { title: 'Grids & Load Paths', type: 'Concept Details', section: 'Introduction' },
  9: { title: 'Units of Measurement', type: 'Concept Details', section: 'Introduction' },
  10: { title: 'RCC Columns Net Height', type: 'Concept Details', section: 'RCC Frame' },
  11: { title: 'RCC Beams Clear Span', type: 'Concept Details', section: 'RCC Frame' },
  12: { title: 'RCC Slabs & Projections', type: 'Concept Details', section: 'RCC Frame' },
  13: { title: 'DPC Surface Area & Omissions', type: 'Concept Details', section: 'Masonry & Barriers' },
  14: { title: 'Masonry Height Corrections', type: 'Concept Details', section: 'Masonry & Barriers' },
  15: { title: 'Parapet Walls Detail', type: 'Concept Details', section: 'Masonry & Barriers' },
  16: { title: 'Opening Deduction Protocol', type: 'Concept Details', section: 'Opening Deductions' },
  17: { title: 'Lintel Bearings & Embedment', type: 'Concept Details', section: 'Opening Deductions' },
  18: { title: 'Woodwork & Shutters Segregation', type: 'Concept Details', section: 'Opening Deductions' },
  19: { title: 'Internal Plastering & Floor Area', type: 'Concept Details', section: 'Finishing Works' },
  20: { title: 'Plastering Voids Thresholds', type: 'Concept Details', section: 'Finishing Works' },
  21: { title: 'Skirting Linear Tracking', type: 'Concept Details', section: 'Finishing Works' },
  22: { title: 'Analysis of Rates (AoR) Fundamentals', type: 'Concept Details', section: 'Specifications & Material Rates' },
  23: { title: 'Volumetric Shrinkage Sandbox', type: 'Live Sandbox', section: 'Specifications & Material Rates' },
  24: { title: 'Governing Quality and Cost: Specifications', type: 'Concept Details', section: 'Specifications & Material Rates' },
  25: { title: 'Measurement Ledger Setup', type: 'Concept Details', section: 'Studio Practice' },
  26: { title: 'Team Task Allocation', type: 'Concept Details', section: 'Studio Practice' },
  27: { title: 'Lab Report Requirements', type: 'Concept Details', section: 'Studio Practice' },
  28: { title: 'Conclusion', type: 'Thank You Slide', section: 'Conclusion' },
};
