import { serializeSections } from '@/features/presentation/utils/serializeSections';
import * as intro from './slides/section-intro';
import * as externalMoment from './slides/section-external-moment';
import * as inclinedForce from './slides/section-inclined-force';
import * as internalHinge from './slides/section-internal-hinge';
import * as elasticDiagram from './slides/section-elastic-diagram';
import * as loadDiagram from './slides/section-load-diagram';
import * as summary from './slides/section-summary';

const serialized = serializeSections([
  intro,
  externalMoment,
  inclinedForce,
  internalHinge,
  elasticDiagram,
  loadDiagram,
  summary,
]);

export const slides = serialized.slides;
export const slideMetadata = serialized.slideMetadata;
