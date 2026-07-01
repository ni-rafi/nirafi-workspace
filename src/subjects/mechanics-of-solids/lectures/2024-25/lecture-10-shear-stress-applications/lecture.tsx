import { serializeSections } from '@/features/presentation/utils/serializeSections';
import * as intro from './slides/section-intro';
import * as problem2 from './slides/section-problem-2';
import * as problem3 from './slides/section-problem-3';
import * as constraints from './slides/section-constraints';
import * as shearFlow from './slides/section-shear-flow';
import * as outro from './slides/section-outro';

const serialized = serializeSections([
  intro,
  problem2,
  problem3,
  constraints,
  shearFlow,
  outro,
]);

export const slides = serialized.slides;
export const slideMetadata = serialized.slideMetadata;
