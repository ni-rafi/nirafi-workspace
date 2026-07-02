import React from 'react';
import { LectureSummaryLayout, type SummaryItem, type SummaryOutcome } from '@/shared/layouts/LectureSummaryLayout';
import { LatexFormula } from '@/features/presentation/components/elements';
import { CheckCircle2 } from 'lucide-react';

export const LectureSummarySlide: React.FC = () => {
  const summaryItems: SummaryItem[] = [
    {
      title: 'Centroid Calculations',
      description: <span>Locating the neutral axis for asymmetric cross-sections using first moment of area: <LatexFormula math="\bar{y} = \frac{\sum A_i \cdot y_i}{\sum A_i}" />.</span>,
      icon: <CheckCircle2 className="h-4.5 w-4.5 text-indigo-500" />
    },
    {
      title: 'Parallel Axis Theorem',
      description: <span>Transferring moment of inertia of individual components to the centroidal axis: <LatexFormula math="I = I_g + A \cdot d^2" />.</span>,
      icon: <CheckCircle2 className="h-4.5 w-4.5 text-indigo-500" />
    },
    {
      title: 'Sessional Capacity Solver',
      description: <span>Calculating allowable bending moment limits for beams with asymmetric material thresholds.</span>,
      icon: <CheckCircle2 className="h-4.5 w-4.5 text-indigo-500" />
    },
    {
      title: 'Composite Sections',
      description: 'Transforming reinforced sections (e.g. wood with steel plates) using modular ratio E-factors to find composite inertia.',
      icon: <CheckCircle2 className="h-4.5 w-4.5 text-indigo-500" />
    }
  ];

  const outcome: SummaryOutcome = {
    coCode: 'CO 5 MAPPED',
    title: 'Bending Stress Analysis',
    description: 'Determine the shear stress and bending stress of determinate beams of different shapes.',
    assessmentMetric: 'Assignments and mid-term assessments will evaluate bending stress calculations.'
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
