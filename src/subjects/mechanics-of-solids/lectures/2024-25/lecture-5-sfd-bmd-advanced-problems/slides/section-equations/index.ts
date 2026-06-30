import { EquationsDivider } from './EquationsDivider';
import { EquationConstantLinear } from './EquationConstantLinear';
import { EquationParabolicCubic } from './EquationParabolicCubic';
import { EquationSpandrels } from './EquationSpandrels';
import { EquationBasicShapes } from './EquationBasicShapes';

export const slides = {
  1: EquationsDivider,
  2: EquationConstantLinear,
  3: EquationParabolicCubic,
  4: EquationBasicShapes,
  5: EquationSpandrels,
};

export const sectionMetadata = {
  1: { title: 'Equations Section Divider', type: 'Section Divider', section: 'Equation Reference' },
  2: { title: 'Constant and Linear Equations', type: 'Concept Details', section: 'Equation Reference' },
  3: { title: 'Parabolic and Cubic Equations', type: 'Concept Details', section: 'Equation Reference' },
  4: { title: 'Table 7.1 Basic Shapes', type: 'Concept Details', section: 'Equation Reference' },
  5: { title: 'Advanced Spandrels Properties', type: 'Concept Details', section: 'Equation Reference' },
};
