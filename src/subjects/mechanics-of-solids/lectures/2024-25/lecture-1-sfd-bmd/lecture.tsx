import { serializeSections } from '@/features/presentation/utils/serializeSections';
import * as intro from './slides/section-intro';
import * as internalStress from './slides/section-internal-stress';
import * as signConventions from './slides/section-sign-conventions';
import * as beamLoading from './slides/section-beam-loading';
import * as differentialCalculus from './slides/section-differential-calculus';
import * as methodOfSections from './slides/section-method-of-sections';

const serialized = serializeSections([
  intro,
  internalStress,
  signConventions,
  beamLoading,
  differentialCalculus,
  methodOfSections,
]);

export const slides = serialized.slides;
export const slideMetadata = serialized.slideMetadata;
