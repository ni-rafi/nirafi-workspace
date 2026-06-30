import { serializeSections } from '@/features/presentation/utils/serializeSections';
import * as intro from './slides/section-intro';
import * as equations from './slides/section-equations';
import * as problem1 from './slides/section-problem1';
import * as problem2 from './slides/section-problem2';
import * as problem3 from './slides/section-problem3';
import * as summary from './slides/section-summary';

const serialized = serializeSections([
  intro,
  equations,
  problem1,
  problem2,
  problem3,
  summary,
]);

export const slides = serialized.slides;
export const slideMetadata = serialized.slideMetadata;
