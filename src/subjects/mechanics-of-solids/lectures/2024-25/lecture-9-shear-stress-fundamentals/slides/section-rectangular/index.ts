import RectangularDivider from './RectangularDivider';
import RectangularShearDistribution from './RectangularShearDistribution';
import ParabolicProof from './ParabolicProof';
import GeometricGallery from './GeometricGallery';

export const slides = {
  1: RectangularDivider,
  2: RectangularShearDistribution,
  3: ParabolicProof,
  4: GeometricGallery,
};

export const sectionMetadata = {
  1: { title: 'Rectangular Divider', type: 'Topic Divider', section: 'Rectangular' },
  2: { title: 'Shear stress in rectangular section', type: 'Concept Details', section: 'Rectangular' },
  3: { title: 'Parabolic proof derivation', type: 'Concept Details', section: 'Rectangular' },
  4: { title: 'Geometric Oddities Gallery', type: 'Concept Details', section: 'Rectangular' },
};
