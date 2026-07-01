import { serializeSections } from '@/features/presentation/utils/serializeSections';
import * as intro from './slides/section-intro';
import * as intuition from './slides/section-intuition';
import * as derivation from './slides/section-derivation';
import * as flexure from './slides/section-flexure';
import * as profilesSandbox from './slides/section-profiles-sandbox';
import * as outro from './slides/section-outro';

const serialized = serializeSections([
  intro,
  intuition,
  derivation,
  flexure,
  profilesSandbox,
  outro,
]);

export const slides = serialized.slides;
export const slideMetadata = serialized.slideMetadata;
