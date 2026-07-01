import React from 'react';
import { QuizCardOrchestrator } from '@/features/quiz';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';

export const Checkpoint1Slide: React.FC = () => {
  const optionsList = [
    'They are equal in magnitude.',
    'Vertical shear stress is twice the horizontal shear stress.',
    'Horizontal shear stress is twice the vertical shear stress.',
    'They are independent and completely unrelated.'
  ];

  return (
    <FullWidthLayout title="Checkpoint 1: Complementary Shear Stress" bgVariant="default">
      <div className="w-full max-w-2xl mx-auto py-2">
        <QuizCardOrchestrator
          quizId="mos_2024_lec9_q1"
          questionText="What is the mathematical relationship between the vertical transverse shear stress and the horizontal complementary shear stress at any point inside a structural beam?"
          quizType="multiple-choice"
          options={optionsList}
        />
      </div>
    </FullWidthLayout>
  );
};

export default Checkpoint1Slide;
