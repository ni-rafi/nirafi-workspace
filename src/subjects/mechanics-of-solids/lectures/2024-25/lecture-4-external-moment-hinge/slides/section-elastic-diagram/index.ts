import { ElasticDiagramDivider } from './ElasticDiagramDivider';
import { ElasticCurveExplanation } from './ElasticCurveExplanation';
import { ElasticCurveSegmentedExplanation } from './ElasticCurveSegmentedExplanation';
import { ElasticCurveSandbox } from './ElasticCurveSandbox';

export const slides = {
  1: ElasticDiagramDivider,
  2: ElasticCurveExplanation,
  3: ElasticCurveSegmentedExplanation,
  4: ElasticCurveSandbox,
};

export const sectionMetadata = {
  1: { title: 'Elastic Diagram Section Intro', type: 'Section Divider', section: 'Elastic Diagram' },
  2: { title: 'Elastic Deformed Shape Analysis', type: 'Concept Details', section: 'Elastic Diagram' },
  3: { title: 'Segment-by-Segment Elastic Deflection', type: 'Concept Details', section: 'Elastic Diagram' },
  4: { title: 'Elastic Curve Sandbox simulation', type: 'Concept Details', section: 'Elastic Diagram' },
};
