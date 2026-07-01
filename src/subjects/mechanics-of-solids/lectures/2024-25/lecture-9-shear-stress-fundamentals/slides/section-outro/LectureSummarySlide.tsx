import React from 'react';
import { LectureSummaryLayout, type SummaryItem, type SummaryOutcome } from '@/shared/layouts/LectureSummaryLayout';
import { CheckCircle2 } from 'lucide-react';

export const LectureSummarySlide: React.FC = () => {
  const summaryItems: SummaryItem[] = [
    {
      title: 'Physical Failure & Complementary Shear',
      description: 'Understanding punching shear and proving equal shear stress on mutually perpendicular planes (τ_xy = τ_yx).',
      icon: <CheckCircle2 className="h-4.5 w-4.5 text-indigo-500" />
    },
    {
      title: 'The Flexural Shear Formula',
      description: 'Deriving and formulating the horizontal equilibrium shear equation: τ = (V * Q) / (I * b).',
      icon: <CheckCircle2 className="h-4.5 w-4.5 text-indigo-500" />
    },
    {
      title: 'Solid Rectangular Beams',
      description: 'Proving the parabolic stress variation and applying the rectangular criterion: τ_max = 1.5 * τ_avg.',
      icon: <CheckCircle2 className="h-4.5 w-4.5 text-indigo-500" />
    },
    {
      title: 'Numerical Stress Profiling',
      description: 'Calculating shear stress magnitudes at boundaries, intermediate fibers, and neutral axes for rectangular sections.',
      icon: <CheckCircle2 className="h-4.5 w-4.5 text-indigo-500" />
    }
  ];

  const outcome: SummaryOutcome = {
    coCode: 'CO 5 MAPPED',
    title: 'Shearing Stress Analysis',
    description: 'Determine the shear stress and bending stress of determinate beams of different shapes.',
    assessmentMetric: 'Homework assignments and exams will evaluate your capability to calculate shear stresses.'
  };

  return (
    <LectureSummaryLayout
      title="Lecture Summary"
      summaryTitle="Key Takeaways"
      summaryItems={summaryItems}
      outcome={outcome}
    />
  );
};

export default LectureSummarySlide;
