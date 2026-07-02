import VisualDerivationSteps from './VisualDerivationSteps';
import EquilibriumProof from './EquilibriumProof';
import GoverningStressFormula from './GoverningStressFormula';

export const slides = {
  1: VisualDerivationSteps,
  2: EquilibriumProof,
  3: GoverningStressFormula,
};

export const sectionMetadata = {
  1: { title: 'Shear Derivation Model', type: 'Concept Details', section: 'Derivation' },
  2: { title: 'KaTeX Equilibrium Proof', type: 'KaTeX Proof', section: 'Derivation' },
  3: { title: 'Governing Flexural Shear Formula', type: 'Concept Details', section: 'Derivation' },
};
