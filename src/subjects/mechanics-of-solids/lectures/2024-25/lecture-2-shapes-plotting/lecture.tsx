import * as setup from './slides/section-setup';
import * as equations from './slides/section-equations';
import * as shapeMapping from './slides/section-shape-mapping';
import * as diagrams from './slides/section-diagrams';

export const slides = {
  ...setup.slides,
  ...equations.slides,
  ...shapeMapping.slides,
  ...diagrams.slides,
};

export const slideMetadata = {
  ...setup.sectionMetadata,
  ...equations.sectionMetadata,
  ...shapeMapping.sectionMetadata,
  ...diagrams.sectionMetadata,
};
