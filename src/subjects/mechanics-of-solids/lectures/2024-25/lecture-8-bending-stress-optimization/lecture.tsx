import { serializeSections } from '@/features/presentation/utils/serializeSections';
import * as intro from './slides/section-intro';
import * as theory from './slides/section-theory';
import * as efficiency from './slides/section-efficiency';
import * as optimization from './slides/section-optimization';

const serialized = serializeSections([
  intro,
  theory,
  efficiency,
  optimization,
]);

export const slides = serialized.slides;
export const slideMetadata = serialized.slideMetadata;
