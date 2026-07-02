import { serializeSections } from '@/features/presentation/utils/serializeSections';
import * as intro from './section-intro';
import * as q1 from './section-q1';
import * as q2 from './section-q2';

const serialized = serializeSections([
  intro,
  q1,
  q2,
]);

export const slides = serialized.slides;
export const slideMetadata = serialized.slideMetadata;
