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
import { Conclusion } from './Conclusion';

export const slides = {
  19: Divider,
  20: SixStepProtocol,
  21: LeftSegmentFBD,
  22: RightSegmentVerification,
  23: WhyFunctionsNotNumbers,
  24: DiscontinuityTriggers,
  25: PiecewiseIntervalPartition,
  26: ZoneOneFBD,
  27: MomentArmPrinciple,
  28: ProblemSetup,
  29: ReactionsStep1,
  30: ReactionsStep2,
  31: ReactionsSolved,
  32: ReactionsQuizL1,
  33: Interval1Analysis,
  34: Interval2Analysis,
  35: InternalForcesQuizL1,
  36: Consolidation,
  37: ManualSFDPlotting,
  38: ManualBMDPlotting,
  39: DiagramOutput,
  40: Conclusion,
};

export const sectionMetadata = {
  19: { title: 'Analytical Calculations: The Method of Sections', type: 'Cover Slide', section: 'Section Method' },
  20: { title: 'The 6-Step Protocol', type: 'Concept Details', section: 'Section Method' },
  21: { title: 'Left-Segment Static Solution', type: 'Concept Details', section: 'Section Method' },
  22: { title: 'Right-Segment Verification', type: 'Concept Details', section: 'Section Method' },
  23: { title: 'Continuous Diagrams & Functions', type: 'Concept Details', section: 'Section Method' },
  24: { title: 'Locational Discontinuities & Triggers', type: 'Concept Details', section: 'Section Method' },
  25: { title: 'Interval Partitioning & Piecewise Boundaries', type: 'Concept Details', section: 'Section Method' },
  26: { title: 'Constructing Equation 1 (Zone 1)', type: 'Concept Details', section: 'Section Method' },
  27: { title: 'The Moment Arm Principle', type: 'Concept Details', section: 'Section Method' },
  28: { title: 'Problem 1 Setup', type: 'Concept Details', section: 'Section Method' },
  29: { title: 'Support Reactions - Moment about Support A', type: 'Concept Details', section: 'Section Method' },
  30: { title: 'Support Reactions - Vertical Force Summation', type: 'Concept Details', section: 'Section Method' },
  31: { title: 'Support Reactions Solved', type: 'Concept Details', section: 'Section Method' },
  32: { title: 'Checkpoint 3: Support Reactions Quiz', type: 'Concept Details', section: 'Section Method' },
  33: { title: 'Section Method - Interval 1 (0 <= x <= 8 m)', type: 'Concept Details', section: 'Section Method' },
  34: { title: 'Section Method - Interval 2 (8 <= x <= 16 m)', type: 'Concept Details', section: 'Section Method' },
  35: { title: 'Checkpoint 4: Internal Bending Moment Quiz', type: 'Concept Details', section: 'Section Method' },
  36: { title: 'Equations Consolidation', type: 'Concept Details', section: 'Section Method' },
  37: { title: 'Plotting SFD from Equations', type: 'Concept Details', section: 'Section Method' },
  38: { title: 'Plotting BMD from Equations', type: 'Concept Details', section: 'Section Method' },
  39: { title: 'SFD & BMD Final Solved Diagrams', type: 'Concept Details', section: 'Section Method' },
  40: { title: 'Method of Sections Conclusion', type: 'Cover Slide', section: 'Conclusion' },
};
