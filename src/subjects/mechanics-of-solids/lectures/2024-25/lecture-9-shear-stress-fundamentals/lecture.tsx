import { serializeSections } from '@/features/presentation/utils/serializeSections';
import * as intro from './slides/section-intro';
import * as equilibrium from './slides/section-equilibrium';
import * as derivation from './slides/section-derivation';
import * as rectangular from './slides/section-rectangular';
import * as problem1 from './slides/section-problem-1';
import * as outro from './slides/section-outro';

const serialized = serializeSections([
  intro,
  equilibrium,
  derivation,
  rectangular,
  problem1,
  outro,
]);

export const slides = serialized.slides;
export const slideMetadata = serialized.slideMetadata;
