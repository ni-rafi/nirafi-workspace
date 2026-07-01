import StressBlockSetup from './StressBlockSetup';
import PrimaryShearStress from './PrimaryShearStress';
import RotationalDilemma from './RotationalDilemma';
import ComplementaryShearTheorem from './ComplementaryShearTheorem';
import Checkpoint1Slide from './Checkpoint1Slide';
import BeamTransitionDivider from './BeamTransitionDivider';

export const slides = {
  1: StressBlockSetup,
  2: PrimaryShearStress,
  3: RotationalDilemma,
  4: ComplementaryShearTheorem,
  5: Checkpoint1Slide,
  6: BeamTransitionDivider,
};

export const sectionMetadata = {
  1: { title: 'Stress Element Setup', type: 'Concept Details', section: 'Equilibrium' },
  2: { title: 'Primary Shear Stress', type: 'Concept Details', section: 'Equilibrium' },
  3: { title: 'Rotational Dilemma', type: 'Concept Details', section: 'Equilibrium' },
  4: { title: 'Complementary Shear Theorem', type: 'Concept Details', section: 'Equilibrium' },
  5: { title: 'Checkpoint 1', type: 'Checkpoint', section: 'Equilibrium' },
  6: { title: 'Beam Transition Divider', type: 'Topic Divider', section: 'Equilibrium' },
};
