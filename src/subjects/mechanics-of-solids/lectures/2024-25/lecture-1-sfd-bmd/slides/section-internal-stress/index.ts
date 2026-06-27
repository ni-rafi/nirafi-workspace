import { Divider } from './Divider';
import { SectioningInternalForces } from './SectioningInternalForces';
import { AnatomyOfInternalForces } from './AnatomyOfInternalForces';
import { BeamBendingSimplySupported } from './BeamBendingSimplySupported';
import { BeamBendingCantilever } from './BeamBendingCantilever';
import { ShearMechanicsSimplySupported } from './ShearMechanicsSimplySupported';
import { ShearMechanicsCantilever } from './ShearMechanicsCantilever';

export const slides = {
  1: Divider,
  2: SectioningInternalForces,
  3: AnatomyOfInternalForces,
  4: BeamBendingSimplySupported,
  5: BeamBendingCantilever,
  6: ShearMechanicsSimplySupported,
  7: ShearMechanicsCantilever,
};

export const sectionMetadata = {
  1: { title: 'Internal Forces & Structural Intuition', type: 'Cover Slide', section: 'Internal Stress' },
  2: { title: 'Sectioning & Internal Forces Expose', type: 'Concept Details', section: 'Internal Stress' },
  3: { title: 'The Anatomy of Internal Forces', type: 'Concept Details', section: 'Internal Stress' },
  4: { title: 'Bending Mechanics - Simply Supported Flexion', type: 'Concept Details', section: 'Internal Stress' },
  5: { title: 'Bending Mechanics - Cantilever Bending', type: 'Concept Details', section: 'Internal Stress' },
  6: { title: 'Shear Mechanics - Simply Supported Shear', type: 'Concept Details', section: 'Internal Stress' },
  7: { title: 'Shear Mechanics - Cantilever Shear', type: 'Concept Details', section: 'Internal Stress' },
};
