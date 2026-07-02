import React from 'react';
import { LectureSummaryLayout, type SummaryItem, type SummaryOutcome } from '@/shared/layouts/LectureSummaryLayout';
import { CheckCircle2 } from 'lucide-react';
import { LatexFormula } from '@/features/presentation/components/elements';

export const LectureSummarySlide: React.FC = () => {
  const summaryItems: SummaryItem[] = [
    {
      title: 'Junction Step Discontinuity',
      description: 'Width changes at flange-web boundaries trigger sudden inverse jumps in shear stress fields.',
      icon: <CheckCircle2 className="h-4.5 w-4.5 text-indigo-500" />
    },
    {
      title: 'Asymmetric Section Calculations',
      description: 'Locating centroidal Neutral Axes and calculating moment of inertia to profile asymmetric flanged beams.',
      icon: <CheckCircle2 className="h-4.5 w-4.5 text-indigo-500" />
    },
    {
      title: 'Beam Sizing Optimization',
      description: 'Applying allowable shear limits and rectangular criteria to size structural timber dimensions.',
      icon: <CheckCircle2 className="h-4.5 w-4.5 text-indigo-500" />
    },
    {
      title: 'Shear Flow & Fasteners Spacing',
      description: <span>Calculating interface shear flow <LatexFormula math="q" /> and spacing connectors using the formula: <LatexFormula math="s \le \frac{n \cdot F_{\text{nail}}}{q}" />.</span>,
      icon: <CheckCircle2 className="h-4.5 w-4.5 text-indigo-500" />
    }
  ];

  const outcome: SummaryOutcome = {
    coCode: 'CO 5 MAPPED',
    title: 'Transverse Shear Design Applications',
    description: 'Determine the shear stress and bending stress of determinate beams of different shapes.',
    assessmentMetric: 'Sessional exams, assignments, and term tests will verify your capacity to design built-up members.'
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
