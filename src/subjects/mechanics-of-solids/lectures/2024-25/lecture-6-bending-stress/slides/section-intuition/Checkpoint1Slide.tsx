import React from 'react';
import { QuizCardOrchestrator } from '@/features/quiz';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';

export const Checkpoint1Slide: React.FC = () => {
  const optionsList = [
    'Top fibers are in compression, bottom fibers are in tension.',
    'Top fibers are in tension, bottom fibers are in compression.',
    'Both top and bottom fibers are in compression.',
    'Both top and bottom fibers are in tension.'
  ];

  return (
    <FullWidthLayout title="Checkpoint 1: Stress States in Bending" bgVariant="default">
      <div className="w-full max-w-2xl mx-auto py-2">
        <QuizCardOrchestrator
          quizId="mos_2024_lec6_q1"
          questionText="Under positive sagging curvature, what stress state is induced at the top and bottom fibers of the beam?"
          quizType="multiple-choice"
          options={optionsList}
        />
      </div>
    </FullWidthLayout>
  );
};

export default Checkpoint1Slide;
