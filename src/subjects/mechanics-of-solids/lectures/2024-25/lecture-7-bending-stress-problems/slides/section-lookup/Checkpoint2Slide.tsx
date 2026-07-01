import React from 'react';
import { QuizCardOrchestrator } from '@/features/quiz';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';

export const Checkpoint2Slide: React.FC = () => {
  return (
    <FullWidthLayout title="Checkpoint 2: Peak Moment lookup" bgVariant="default">
      <div className="w-full max-w-2xl mx-auto py-4">
        <QuizCardOrchestrator
          quizId="mos_2024_lec7_q2"
          questionText="What is the maximum bending moment (M_max) for a simply supported beam of length L carrying a uniformly distributed load w?"
          quizType="multiple-choice"
          options={[
            'w * L^2 / 4',
            'w * L^2 / 8',
            'w * L^2 / 12',
            'w * L / 8',
          ]}
        />
      </div>
    </FullWidthLayout>
  );
};

export default Checkpoint2Slide;
