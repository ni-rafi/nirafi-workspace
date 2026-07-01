import { serializeSections } from '@/features/presentation/utils/serializeSections';
import * as intro from './slides/section-intro';
import * as geometry from './slides/section-geometry';
import * as lookup from './slides/section-lookup';
import * as prob12 from './slides/section-prob1-2';
import * as prob34 from './slides/section-prob3-4';
import * as prob56 from './slides/section-prob5-6';
import * as outro from './slides/section-outro';

const serialized = serializeSections([
  intro,
  geometry,
  lookup,
  prob12,
  prob34,
  prob56,
  outro,
]);

export const slides = serialized.slides;
export const slideMetadata = serialized.slideMetadata;
