import React from 'react';
import { LectureSummaryLayout, type SummaryItem, type SummaryOutcome } from '@/shared/layouts/LectureSummaryLayout';
import { LatexFormula } from '@/features/presentation/components/elements';
import { CheckCircle2 } from 'lucide-react';

export const LectureSummarySlide: React.FC = () => {
  const summaryItems: SummaryItem[] = [
    {
      title: 'Physical Meaning of Z',
      description: <span>Quantifying shape efficiency relative to the neutral axis: allowable capacity <LatexFormula math="M_{\text{allow}} = \sigma_{\text{allow}} \cdot Z" />.</span>,
      icon: <CheckCircle2 className="h-4.5 w-4.5 text-indigo-500" />
    },
    {
      title: 'Shape Efficiency Rankings',
      description: <span>For constant cross-sectional area: Circle (lowest) <LatexFormula math="\rightarrow" /> Square (+18%) <LatexFormula math="\rightarrow" /> Deep Rectangles (+50% to +100% capacity).</span>,
      icon: <CheckCircle2 className="h-4.5 w-4.5 text-indigo-500" />
    },
    {
      title: 'Asymmetric Stress limits',
      description: 'Designing sizing capacity for materials with dual tension/compression thresholds using shifted centroid neutral axes.',
      icon: <CheckCircle2 className="h-4.5 w-4.5 text-indigo-500" />
    },
    {
      title: 'Tapered Beam optimization',
      description: <span>Locating the critical bending stress coordinates for non-prismatic members by evaluating <LatexFormula math="d\sigma/dx = 0" />.</span>,
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
