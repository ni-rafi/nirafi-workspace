import DifferentialSlice from './DifferentialSlice';
import HorizontalSectioning from './HorizontalSectioning';
import UpperBlockFBD from './UpperBlockFBD';
import ForceConversion from './ForceConversion';
import ResistingHorizontalShear from './ResistingHorizontalShear';
import EquilibriumProof from './EquilibriumProof';
import GoverningStressFormula from './GoverningStressFormula';

export const slides = {
  1: DifferentialSlice,
  2: HorizontalSectioning,
  3: UpperBlockFBD,
  4: ForceConversion,
  5: ResistingHorizontalShear,
  6: EquilibriumProof,
  7: GoverningStressFormula,
};

export const sectionMetadata = {
  1: { title: 'Differential Slide Segment', type: 'Concept Details', section: 'Derivation' },
  2: { title: 'Longitudinal Sectioning', type: 'Concept Details', section: 'Derivation' },
  3: { title: 'Upper Block FBD', type: 'Concept Details', section: 'Derivation' },
  4: { title: 'Stresses to Forces', type: 'Concept Details', section: 'Derivation' },
  5: { title: 'Horizontal Resisting Force', type: 'Concept Details', section: 'Derivation' },
  6: { title: 'KaTeX Equilibrium Proof', type: 'KaTeX Proof', section: 'Derivation' },
  7: { title: 'Governing Flexural Shear Formula', type: 'Concept Details', section: 'Derivation' },
};
