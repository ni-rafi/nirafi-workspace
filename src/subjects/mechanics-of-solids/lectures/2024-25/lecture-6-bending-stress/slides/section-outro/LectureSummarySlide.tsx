import { LectureSummaryLayout, type SummaryItem, type SummaryOutcome } from '@/shared/layouts/LectureSummaryLayout';
import { LatexFormula } from '@/features/presentation/components/elements';
import { CheckCircle2 } from 'lucide-react';

export const LectureSummarySlide: React.FC = () => {
  const summaryItems: SummaryItem[] = [
    {
      title: 'Bending Theory & Assumptions',
      description: 'Understanding pure bending and the Euler-Bernoulli assumptions (plane sections remain plane).',
      icon: <CheckCircle2 className="h-4.5 w-4.5 text-indigo-500" />
    },
    {
      title: 'The Flexure Formula',
      description: <span>Deriving and applying the core stress equation: <LatexFormula math="\sigma = \frac{M \cdot y}{I}" />.</span>,
      icon: <CheckCircle2 className="h-4.5 w-4.5 text-indigo-500" />
    },
    {
      title: 'Section Modulus (Z)',
      description: <span>Defining shape efficiency with <LatexFormula math="Z = \frac{I}{y_{\max}}" />, where max bending stress <LatexFormula math="\sigma_{\max} = \frac{M}{Z}" />.</span>,
      icon: <CheckCircle2 className="h-4.5 w-4.5 text-indigo-500" />
    },
    {
      title: 'Stress Gradient Distributions',
      description: 'Drawing symmetric and composite beam stress profiles (compression vs tension zones).',
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
