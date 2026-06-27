import { Divider } from './Divider';
import { SixStepProtocol } from './SixStepProtocol';
import { LeftSegmentFBD } from './LeftSegmentFBD';
import { RightSegmentVerification } from './RightSegmentVerification';
import { WhyFunctionsNotNumbers } from './WhyFunctionsNotNumbers';
import { DiscontinuityTriggers } from './DiscontinuityTriggers';
import { PiecewiseIntervalPartition } from './PiecewiseIntervalPartition';
import { ZoneOneFBD } from './ZoneOneFBD';
import { MomentArmPrinciple } from './MomentArmPrinciple';
import { ProblemSetup } from './ProblemSetup';
import { ReactionsStep1 } from './ReactionsStep1';
import { ReactionsStep2 } from './ReactionsStep2';
import { ReactionsSolved } from './ReactionsSolved';
import { ReactionsQuizL1 } from './ReactionsQuizL1';
import { Interval1Analysis } from './Interval1Analysis';
import { Interval2Analysis } from './Interval2Analysis';
import { InternalForcesQuizL1 } from './InternalForcesQuizL1';
import { Consolidation } from './Consolidation';
import { ManualSFDPlotting } from './ManualSFDPlotting';
import { ManualBMDPlotting } from './ManualBMDPlotting';
import { DiagramOutput } from './DiagramOutput';
import { Lecture1Summary } from './Lecture1Summary';
import { Conclusion } from './Conclusion';

export const slides = {
  1: Divider,
  2: SixStepProtocol,
  3: LeftSegmentFBD,
  4: RightSegmentVerification,
  5: WhyFunctionsNotNumbers,
  6: DiscontinuityTriggers,
  7: PiecewiseIntervalPartition,
  8: ZoneOneFBD,
  9: MomentArmPrinciple,
  10: ProblemSetup,
  11: ReactionsStep1,
  12: ReactionsStep2,
  13: ReactionsSolved,
  14: ReactionsQuizL1,
  15: Interval1Analysis,
  16: Interval2Analysis,
  17: InternalForcesQuizL1,
  18: Consolidation,
  19: ManualSFDPlotting,
  20: ManualBMDPlotting,
  21: DiagramOutput,
  22: Lecture1Summary,
  23: Conclusion,
};

export const sectionMetadata = {
  1: { title: 'Analytical Calculations: The Method of Sections', type: 'Cover Slide', section: 'Section Method' },
  2: { title: 'The 6-Step Protocol', type: 'Concept Details', section: 'Section Method' },
  3: { title: 'Left-Segment Static Solution', type: 'Concept Details', section: 'Section Method' },
  4: { title: 'Right-Segment Verification', type: 'Concept Details', section: 'Section Method' },
  5: { title: 'Continuous Diagrams & Functions', type: 'Concept Details', section: 'Section Method' },
  6: { title: 'Locational Discontinuities & Triggers', type: 'Concept Details', section: 'Section Method' },
  7: { title: 'Interval Partitioning & Piecewise Boundaries', type: 'Concept Details', section: 'Section Method' },
  8: { title: 'Constructing Equation 1 (Zone 1)', type: 'Concept Details', section: 'Section Method' },
  9: { title: 'The Moment Arm Principle', type: 'Concept Details', section: 'Section Method' },
  10: { title: 'Problem 1 Setup', type: 'Concept Details', section: 'Section Method' },
  11: { title: 'Support Reactions - Moment about Support A', type: 'Concept Details', section: 'Section Method' },
  12: { title: 'Support Reactions - Vertical Force Summation', type: 'Concept Details', section: 'Section Method' },
  13: { title: 'Support Reactions Solved', type: 'Concept Details', section: 'Section Method' },
  14: { title: 'Checkpoint 3: Support Reactions Quiz', type: 'Concept Details', section: 'Section Method' },
  15: { title: 'Section Method - Interval 1 (0 <= x <= 8 m)', type: 'Concept Details', section: 'Section Method' },
  16: { title: 'Section Method - Interval 2 (8 <= x <= 16 m)', type: 'Concept Details', section: 'Section Method' },
  17: { title: 'Checkpoint 4: Internal Bending Moment Quiz', type: 'Concept Details', section: 'Section Method' },
  18: { title: 'Equations Consolidation', type: 'Concept Details', section: 'Section Method' },
  19: { title: 'Plotting SFD from Equations', type: 'Concept Details', section: 'Section Method' },
  20: { title: 'Plotting BMD from Equations', type: 'Concept Details', section: 'Section Method' },
  21: { title: 'SFD & BMD Final Solved Diagrams', type: 'Concept Details', section: 'Section Method' },
  22: { title: 'Summary & Outcomes', type: 'Concept Details', section: 'Conclusion' },
  23: { title: 'Method of Sections Conclusion', type: 'Cover Slide', section: 'Conclusion' },
};
