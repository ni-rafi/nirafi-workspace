import { serializeSections } from '@/features/presentation/utils/serializeSections';
import * as setup from './slides/section-setup';
import * as equations from './slides/section-equations';
import * as shapeMapping from './slides/section-shape-mapping';
import * as diagrams from './slides/section-diagrams';

const serialized = serializeSections([
  setup,
  equations,
  shapeMapping,
  diagrams,
]);

export const slides = serialized.slides;
export const slideMetadata = serialized.slideMetadata;
