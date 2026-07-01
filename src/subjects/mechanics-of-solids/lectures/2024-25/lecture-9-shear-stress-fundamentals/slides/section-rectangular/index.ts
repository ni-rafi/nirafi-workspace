import RectangularDivider from './RectangularDivider';
import RectangleGeometryFrame from './RectangleGeometryFrame';
import ParameterBaseline from './ParameterBaseline';
import ParabolicProof from './ParabolicProof';
import AverageShearBaseline from './AverageShearBaseline';
import PlottingCurveBuilder from './PlottingCurveBuilder';
import RectangularCriterion from './RectangularCriterion';

export const slides = {
  1: RectangularDivider,
  2: RectangleGeometryFrame,
  3: ParameterBaseline,
  4: ParabolicProof,
  5: AverageShearBaseline,
  6: PlottingCurveBuilder,
  7: RectangularCriterion,
};

export const sectionMetadata = {
  1: { title: 'Rectangular Divider', type: 'Topic Divider', section: 'Rectangular' },
  2: { title: 'Geometry Coordinate Frame', type: 'Concept Details', section: 'Rectangular' },
  3: { title: 'Constituent Parameters', type: 'Concept Details', section: 'Rectangular' },
  4: { title: 'Parabolic proof derivation', type: 'Concept Details', section: 'Rectangular' },
  5: { title: 'Average uniform stress', type: 'Concept Details', section: 'Rectangular' },
  6: { title: 'Plotting curve builder', type: 'Interactive Chart', section: 'Rectangular' },
  7: { title: 'Rectangular shear criterion', type: 'Concept Details', section: 'Rectangular' },
};
