import { LoadDiagramDivider } from './LoadDiagramDivider';
import { LoadDiagramRelations } from './LoadDiagramRelations';
import { LoadDiagramReconstruction } from './LoadDiagramReconstruction';

export const slides = {
  1: LoadDiagramDivider,
  2: LoadDiagramRelations,
  3: LoadDiagramReconstruction,
};

export const sectionMetadata = {
  1: { title: 'Load Diagram Section Intro', type: 'Section Divider', section: 'Load Diagram' },
  2: { title: 'Differential Load-Shear-Moment Relations', type: 'Concept Details', section: 'Load Diagram' },
  3: { title: 'Diagram Reconstruction Principles', type: 'Concept Details', section: 'Load Diagram' },
};
