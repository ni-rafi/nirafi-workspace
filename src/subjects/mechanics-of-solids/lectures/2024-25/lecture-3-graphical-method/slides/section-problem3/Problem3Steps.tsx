import React from 'react';
import { GraphicalProblemSolverVisualizer } from '@/subjects/mechanics-of-solids/features/sfd-bmd/components/breakdowns/GraphicalProblemSolverVisualizer';
import { ClickReveal } from '@/features/presentation/components/elements';
import { beamConfig } from '../../beamConfig';

export const Problem3Step0: React.FC = () => <GraphicalProblemSolverVisualizer beam={beamConfig} stepIndex={0} />;

export const Problem3Step1: React.FC = () => (
  <>
    <ClickReveal at={1} className="hidden">{' '}</ClickReveal>
    <ClickReveal at={2} className="hidden">{' '}</ClickReveal>
    <ClickReveal at={3} className="hidden">{' '}</ClickReveal>
    <GraphicalProblemSolverVisualizer beam={beamConfig} stepIndex={1} />
  </>
);

export const Problem3Step2: React.FC = () => (
  <>
    <ClickReveal at={1} className="hidden">{' '}</ClickReveal>
    <ClickReveal at={2} className="hidden">{' '}</ClickReveal>
    <ClickReveal at={3} className="hidden">{' '}</ClickReveal>
    <ClickReveal at={4} className="hidden">{' '}</ClickReveal>
    <GraphicalProblemSolverVisualizer beam={beamConfig} stepIndex={2} />
  </>
);

// SFD Node A Jump
export const Problem3Step3: React.FC = () => (
  <>
    <ClickReveal at={1} className="hidden">{' '}</ClickReveal>
    <ClickReveal at={2} className="hidden">{' '}</ClickReveal>
    <ClickReveal at={3} className="hidden">{' '}</ClickReveal>
    <GraphicalProblemSolverVisualizer beam={beamConfig} stepIndex={3} />
  </>
);

// SFD Segment A-C Integration
export const Problem3Step4: React.FC = () => (
  <>
    <ClickReveal at={1} className="hidden">{' '}</ClickReveal>
    <ClickReveal at={2} className="hidden">{' '}</ClickReveal>
    <ClickReveal at={3} className="hidden">{' '}</ClickReveal>
    <GraphicalProblemSolverVisualizer beam={beamConfig} stepIndex={4} />
  </>
);

// SFD Node C Check
export const Problem3Step5: React.FC = () => (
  <>
    <ClickReveal at={1} className="hidden">{' '}</ClickReveal>
    <ClickReveal at={2} className="hidden">{' '}</ClickReveal>
    <GraphicalProblemSolverVisualizer beam={beamConfig} stepIndex={5} />
  </>
);

// SFD Segment C-D Integration
export const Problem3Step6: React.FC = () => (
  <>
    <ClickReveal at={1} className="hidden">{' '}</ClickReveal>
    <ClickReveal at={2} className="hidden">{' '}</ClickReveal>
    <ClickReveal at={3} className="hidden">{' '}</ClickReveal>
    <GraphicalProblemSolverVisualizer beam={beamConfig} stepIndex={6} />
  </>
);

// SFD Node D Check
export const Problem3Step7: React.FC = () => (
  <>
    <ClickReveal at={1} className="hidden">{' '}</ClickReveal>
    <ClickReveal at={2} className="hidden">{' '}</ClickReveal>
    <GraphicalProblemSolverVisualizer beam={beamConfig} stepIndex={7} />
  </>
);

// SFD Segment D-E Integration
export const Problem3Step8: React.FC = () => (
  <>
    <ClickReveal at={1} className="hidden">{' '}</ClickReveal>
    <ClickReveal at={2} className="hidden">{' '}</ClickReveal>
    <ClickReveal at={3} className="hidden">{' '}</ClickReveal>
    <GraphicalProblemSolverVisualizer beam={beamConfig} stepIndex={8} />
  </>
);

// SFD Node E Jump
export const Problem3Step9: React.FC = () => (
  <>
    <ClickReveal at={1} className="hidden">{' '}</ClickReveal>
    <ClickReveal at={2} className="hidden">{' '}</ClickReveal>
    <ClickReveal at={3} className="hidden">{' '}</ClickReveal>
    <GraphicalProblemSolverVisualizer beam={beamConfig} stepIndex={9} />
  </>
);

// SFD Segment E-B Integration
export const Problem3Step10: React.FC = () => (
  <>
    <ClickReveal at={1} className="hidden">{' '}</ClickReveal>
    <ClickReveal at={2} className="hidden">{' '}</ClickReveal>
    <ClickReveal at={3} className="hidden">{' '}</ClickReveal>
    <GraphicalProblemSolverVisualizer beam={beamConfig} stepIndex={10} />
  </>
);

// SFD Node B Jump
export const Problem3Step11: React.FC = () => (
  <>
    <ClickReveal at={1} className="hidden">{' '}</ClickReveal>
    <ClickReveal at={2} className="hidden">{' '}</ClickReveal>
    <ClickReveal at={3} className="hidden">{' '}</ClickReveal>
    <GraphicalProblemSolverVisualizer beam={beamConfig} stepIndex={11} />
  </>
);

// Zero-Shear explanation
export const Problem3Step12: React.FC = () => <GraphicalProblemSolverVisualizer beam={beamConfig} stepIndex={12} />;

// Solving Zero-Crossing: Method 1 (Section Method)
export const Problem3Step13: React.FC = () => (
  <>
    <ClickReveal at={1} className="hidden">{' '}</ClickReveal>
    <ClickReveal at={2} className="hidden">{' '}</ClickReveal>
    <GraphicalProblemSolverVisualizer beam={beamConfig} stepIndex={13} />
  </>
);

// Solving Zero-Crossing: Method 2 (Similar Triangles)
export const Problem3Step14: React.FC = () => (
  <>
    <ClickReveal at={1} className="hidden">{' '}</ClickReveal>
    <ClickReveal at={2} className="hidden">{' '}</ClickReveal>
    <ClickReveal at={3} className="hidden">{' '}</ClickReveal>
    <GraphicalProblemSolverVisualizer beam={beamConfig} stepIndex={14} />
  </>
);

// Solving Zero-Crossing: Method 3 (UDL Division)
export const Problem3Step15: React.FC = () => (
  <>
    <ClickReveal at={1} className="hidden">{' '}</ClickReveal>
    <ClickReveal at={2} className="hidden">{' '}</ClickReveal>
    <GraphicalProblemSolverVisualizer beam={beamConfig} stepIndex={15} />
  </>
);

// BMD Node A Check
export const Problem3Step16: React.FC = () => (
  <>
    <ClickReveal at={1} className="hidden">{' '}</ClickReveal>
    <ClickReveal at={2} className="hidden">{' '}</ClickReveal>
    <GraphicalProblemSolverVisualizer beam={beamConfig} stepIndex={19} />
  </>
);

// BMD Segment A-C Integration
export const Problem3Step17: React.FC = () => (
  <>
    <ClickReveal at={1} className="hidden">{' '}</ClickReveal>
    <ClickReveal at={2} className="hidden">{' '}</ClickReveal>
    <ClickReveal at={3} className="hidden">{' '}</ClickReveal>
    <GraphicalProblemSolverVisualizer beam={beamConfig} stepIndex={20} />
  </>
);

// BMD Node C Check
export const Problem3Step18: React.FC = () => (
  <>
    <ClickReveal at={1} className="hidden">{' '}</ClickReveal>
    <ClickReveal at={2} className="hidden">{' '}</ClickReveal>
    <GraphicalProblemSolverVisualizer beam={beamConfig} stepIndex={21} />
  </>
);

// BMD Segment C-to-Peak Integration (Prediction)
export const Problem3Step19: React.FC = () => (
  <>
    <ClickReveal at={1} className="hidden">{' '}</ClickReveal>
    <ClickReveal at={2} className="hidden">{' '}</ClickReveal>
    <ClickReveal at={3} className="hidden">{' '}</ClickReveal>
    <GraphicalProblemSolverVisualizer beam={beamConfig} stepIndex={22} />
  </>
);

// Pedagogical Slide 2: Segment C-to-Peak Curvature Application
export const Problem3Pedagogical2: React.FC = () => (
  <>
    <ClickReveal at={1} className="hidden">{' '}</ClickReveal>
    <ClickReveal at={2} className="hidden">{' '}</ClickReveal>
    <ClickReveal at={3} className="hidden">{' '}</ClickReveal>
    <GraphicalProblemSolverVisualizer beam={beamConfig} stepIndex={23} />
  </>
);

// Pedagogical Slide 1: Slope-Moment Circle
export const Problem3Pedagogical1: React.FC = () => (
  <>
    <ClickReveal at={1} className="hidden">{' '}</ClickReveal>
    <GraphicalProblemSolverVisualizer beam={beamConfig} stepIndex={24} />
  </>
);


// BMD Peak Moment Check
export const Problem3Step20: React.FC = () => (
  <>
    <ClickReveal at={1} className="hidden">{' '}</ClickReveal>
    <ClickReveal at={2} className="hidden">{' '}</ClickReveal>
    <GraphicalProblemSolverVisualizer beam={beamConfig} stepIndex={25} />
  </>
);

// BMD Segment Peak-to-D Integration
export const Problem3Step21: React.FC = () => (
  <>
    <ClickReveal at={1} className="hidden">{' '}</ClickReveal>
    <ClickReveal at={2} className="hidden">{' '}</ClickReveal>
    <ClickReveal at={3} className="hidden">{' '}</ClickReveal>
    <GraphicalProblemSolverVisualizer beam={beamConfig} stepIndex={26} />
  </>
);

// BMD Node D Check
export const Problem3Step22: React.FC = () => (
  <>
    <ClickReveal at={1} className="hidden">{' '}</ClickReveal>
    <ClickReveal at={2} className="hidden">{' '}</ClickReveal>
    <GraphicalProblemSolverVisualizer beam={beamConfig} stepIndex={27} />
  </>
);

// BMD Segment D-E Integration
export const Problem3Step23: React.FC = () => (
  <>
    <ClickReveal at={1} className="hidden">{' '}</ClickReveal>
    <ClickReveal at={2} className="hidden">{' '}</ClickReveal>
    <ClickReveal at={3} className="hidden">{' '}</ClickReveal>
    <GraphicalProblemSolverVisualizer beam={beamConfig} stepIndex={28} />
  </>
);

// BMD Node E Check
export const Problem3Step24: React.FC = () => (
  <>
    <ClickReveal at={1} className="hidden">{' '}</ClickReveal>
    <ClickReveal at={2} className="hidden">{' '}</ClickReveal>
    <GraphicalProblemSolverVisualizer beam={beamConfig} stepIndex={29} />
  </>
);

// BMD Segment E-B Integration
export const Problem3Step25: React.FC = () => (
  <>
    <ClickReveal at={1} className="hidden">{' '}</ClickReveal>
    <ClickReveal at={2} className="hidden">{' '}</ClickReveal>
    <ClickReveal at={3} className="hidden">{' '}</ClickReveal>
    <GraphicalProblemSolverVisualizer beam={beamConfig} stepIndex={30} />
  </>
);

// BMD Node B Check
export const Problem3Step26: React.FC = () => (
  <>
    <ClickReveal at={1} className="hidden">{' '}</ClickReveal>
    <ClickReveal at={2} className="hidden">{' '}</ClickReveal>
    <GraphicalProblemSolverVisualizer beam={beamConfig} stepIndex={31} />
  </>
);

// Solved Diagrams Recap
export const Problem3Step27: React.FC = () => <GraphicalProblemSolverVisualizer beam={beamConfig} stepIndex={32} />;
