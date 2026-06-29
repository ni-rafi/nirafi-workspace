import React from 'react';
import { LectureSummaryLayout, type SummaryItem, type SummaryOutcome } from '@/shared/layouts/LectureSummaryLayout';
import { Award, Layers, BarChart2 } from 'lucide-react';

export const Lecture4Summary: React.FC = () => {
  const summaryItems: SummaryItem[] = [
    {
      title: 'External Moments & Bracket Resolution',
      description: 'Eccentric loads generate equivalent concentrated force-plus-couple configurations on the beam axis.',
      icon: <Layers className="h-4.5 w-4.5" />
    },
    {
      title: 'Inclined Forces & Internal Hinges',
      description: 'Hinges introduce localized bending moment release (M = 0) allowing static segmentation of compound structures.',
      icon: <BarChart2 className="h-4.5 w-4.5" />
    },
    {
      title: 'Elastic Wave Profiles & Load Diagrams',
      description: 'Bending moment signs dictate boundary curvature sagging/hogging shapes, and inverse SFDs resolve original loads.',
      icon: <Award className="h-4.5 w-4.5" />
    }
  ];

  const outcome: SummaryOutcome = {
    coCode: 'CO4 MAPPED',
    title: 'Advanced Beam Load Analysis',
    description: 'Solve multi-span beams under eccentric, inclined, and hinge-released load configurations.',
    assessmentMetric: 'Your ability to isolate hinge boundary segments, resolve equivalent moments, and map elastic curvature diagrams.'
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

export default Lecture4Summary;
