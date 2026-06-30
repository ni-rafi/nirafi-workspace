import React from 'react';
import { LectureSummaryLayout, type SummaryItem, type SummaryOutcome } from '@/shared/layouts/LectureSummaryLayout';
import { Award, GitMerge, BarChart2 } from 'lucide-react';

export const Lecture5Summary: React.FC = () => {
  const summaryItems: SummaryItem[] = [
    {
      title: 'Segmental Gerber Analysis',
      description: 'Hinges split complex continuous beams into statically determinate segments. Solve starting with the floating segment.',
      icon: <GitMerge className="h-4.5 w-4.5" />
    },
    {
      title: 'Zero-Shear Sign Changes',
      description: 'Bending moment peaks occur at shear sign crossings (continuous zero-crossings or abrupt loading step jumps).',
      icon: <BarChart2 className="h-4.5 w-4.5" />
    },
    {
      title: 'Higher-Order Transformations',
      description: 'Linear loading (degree 1) yields parabolic shear (degree 2) and cubic moment diagrams (degree 3).',
      icon: <Award className="h-4.5 w-4.5" />
    }
  ];

  const outcome: SummaryOutcome = {
    coCode: 'CO4 MAPPED',
    title: 'Advanced Diagram Integration',
    description: 'Solve internal force and moment profiles for compound beams and trapezoidal loading structures.',
    assessmentMetric: 'Your ability to locate zero-shear crossings, calculate peak moments, and construct continuous SFD & BMD profiles.'
  };

  return (
    <LectureSummaryLayout
      title="Summary & Outcomes"
      summaryTitle="LECTURE SUMMARY"
      summaryItems={summaryItems}
      outcome={outcome}
    />
  );
};

export default Lecture5Summary;
