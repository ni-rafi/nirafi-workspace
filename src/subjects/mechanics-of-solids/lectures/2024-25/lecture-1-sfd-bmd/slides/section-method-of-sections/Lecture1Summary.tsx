import React from 'react';
import { LectureSummaryLayout, type SummaryItem, type SummaryOutcome } from '@/shared/layouts/LectureSummaryLayout';
import { BookOpen, HelpCircle, Compass } from 'lucide-react';

export const Lecture1Summary: React.FC = () => {
  const summaryItems: SummaryItem[] = [
    {
      title: 'Method of Sections',
      description: 'Isolate segment cuts to sum forces and moments, solving for internal shear V(x) and bending moment M(x) functions.',
      icon: <Compass className="h-4.5 w-4.5" />
    },
    {
      title: 'Sign Conventions',
      description: 'Maintain strict consistency (positive shear is downward on left cuts; positive moment causes sagging tension).',
      icon: <HelpCircle className="h-4.5 w-4.5" />
    },
    {
      title: 'Differential Relations',
      description: 'Leverage calculus links (dV/dx = -w and dM/dx = V) to cross-verify the slope and shape of the diagrams.',
      icon: <BookOpen className="h-4.5 w-4.5" />
    }
  ];

  const outcome: SummaryOutcome = {
    coCode: 'CO4 MAPPED',
    title: 'Determine Shear Force & Bending Moment',
    description: 'Determine the shear force and bending moment for determinate beams.',
    assessmentMetric: 'Your ability to partition spans, construct segment equilibrium equations, apply boundary conditions, and verify internal forces using right-segment cuts.'
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

export default Lecture1Summary;
