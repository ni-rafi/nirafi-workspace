import { PlotSegment1L2 } from './PlotSegment1L2';
import { PlotSegment2L2 } from './PlotSegment2L2';
import { PlotSegment3L2 } from './PlotSegment3L2';
import { PlotSegment4L2 } from './PlotSegment4L2';
import { CalculusLinkL2 } from './CalculusLinkL2';
import { ZeroShearLocL2 } from './ZeroShearLocL2';
import { ZeroShearQuizL2 } from './ZeroShearQuizL2';
import { DiagramOutputL2 } from './DiagramOutputL2';
import { Lecture2Summary } from './Lecture2Summary';
import { ConclusionL2 } from './ConclusionL2';

export const slides = {
  1: PlotSegment1L2,
  2: PlotSegment2L2,
  3: CalculusLinkL2,
  4: ZeroShearLocL2,
  5: ZeroShearQuizL2,
  6: PlotSegment3L2,
  7: PlotSegment4L2,
  8: DiagramOutputL2,
  9: Lecture2Summary,
  10: ConclusionL2,
};

export const sectionMetadata = {
  1: { title: 'Plotting Segment 1 (0 to 5m)', type: 'Concept Details', section: 'Diagram Plotting' },
  2: { title: 'Plotting Segment 2 (5 to 12m)', type: 'Concept Details', section: 'Diagram Plotting' },
  3: { title: 'The Calculus Link: Peak Moment', type: 'Concept Details', section: 'Diagram Plotting' },
  4: { title: 'Locating the Zero Shear Coordinate', type: 'Concept Details', section: 'Diagram Plotting' },
  5: { title: 'Checkpoint 4: Zero Shear Quiz', type: 'Concept Details', section: 'Diagram Plotting' },
  6: { title: 'Plotting Segment 3 (12 to 17m)', type: 'Concept Details', section: 'Diagram Plotting' },
  7: { title: 'Plotting Segment 4 (17 to 20m)', type: 'Concept Details', section: 'Diagram Plotting' },
  8: { title: 'SFD & BMD Final Solved Diagrams', type: 'Concept Details', section: 'Diagram Plotting' },
  9: { title: 'Summary & Outcomes', type: 'Concept Details', section: 'Conclusion' },
  10: { title: 'Shapes & Edge-Point Plotting Conclusion', type: 'Cover Slide', section: 'Conclusion' },
};
