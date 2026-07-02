import { serializeSections } from '@/features/presentation/utils/serializeSections';
import * as intro from './section-intro';
import * as q1 from './section-q1';
import * as q2 from './section-q2';
import * as q3 from './section-q3';
import * as q4 from './section-q4';
import * as q5 from './section-q5';
import * as q6 from './section-q6';

const serialized = serializeSections([
  intro,
  q1,
  q2,
  q3,
  q4,
  q5,
  q6,
]);

export const slides = serialized.slides;
export const slideMetadata = serialized.slideMetadata;
