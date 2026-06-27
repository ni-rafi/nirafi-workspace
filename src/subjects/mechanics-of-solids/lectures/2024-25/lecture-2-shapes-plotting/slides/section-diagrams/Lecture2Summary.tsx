import React from 'react';
import { LectureSummaryLayout, type SummaryItem, type SummaryOutcome } from '@/shared/layouts/LectureSummaryLayout';
import { Award, Layers, BarChart2 } from 'lucide-react';

export const Lecture2Summary: React.FC = () => {
  const summaryItems: SummaryItem[] = [
    {
      title: 'Interval Partitioning',
      description: 'Define mathematical zones between loading boundaries, using left or right cuts to simplify equations.',
      icon: <Layers className="h-4.5 w-4.5" />
    },
    {
      title: 'Shape Mapping & Drawing',
      description: 'Map constant shear to linear moment, and linear shear to parabolic curves, drawing endpoints and propagation lines.',
      icon: <BarChart2 className="h-4.5 w-4.5" />
    },
    {
      title: 'Peak Moment Location',
      description: 'Locate coordinate x where V(x) = 0, calculating peak bending moment values for structural design checks.',
      icon: <Award className="h-4.5 w-4.5" />
    }
  ];

  const outcome: SummaryOutcome = {
    coCode: 'CO4 MAPPED',
    title: 'Determine Shear Force & Bending Moment',
    description: 'Determine the shear force and bending moment for determinate beams.',
    assessmentMetric: 'Your ability to construct shear force and bending moment diagrams from segment equations, locate zero-shear zones, and calculate peak bending moments.'
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

export default Lecture2Summary;
