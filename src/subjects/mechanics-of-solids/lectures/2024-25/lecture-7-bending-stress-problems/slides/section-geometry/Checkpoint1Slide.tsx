import React from 'react';
import { QuizCardOrchestrator } from '@/features/quiz';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';

export const Checkpoint1Slide: React.FC = () => {
  return (
    <FullWidthLayout title="Checkpoint 1: Parallel Axis Theorem" bgVariant="default">
      <div className="w-full max-w-2xl mx-auto py-4">
        <QuizCardOrchestrator
          quizId="mos_2024_lec7_q1"
          questionText="What is the correct mathematical statement of the Parallel Axis Theorem?"
          quizType="multiple-choice"
          options={[
            'I = I_c + A * d',
            'I = I_c + A * d^2',
            'I = I_c - A * d^2',
            'I = A * d^2',
          ]}
        />
      </div>
    </FullWidthLayout>
  );
};

export default Checkpoint1Slide;
