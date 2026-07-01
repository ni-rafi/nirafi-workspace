import React from 'react';
import { QuizCardOrchestrator } from '@/features/quiz';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';

export const Checkpoint1Slide: React.FC = () => {
  return (
    <FullWidthLayout title="Checkpoint 1: Section Modulus Dimensions" bgVariant="default">
      <div className="w-full max-w-2xl mx-auto py-4">
        <QuizCardOrchestrator
          quizId="mos_2024_lec8_q1"
          questionText="What are the typical dimensions/units of Section Modulus (Z) in SI units?"
          quizType="multiple-choice"
          options={[
            'm² (or mm²)',
            'm³ (or mm³)',
            'm⁴ (or mm⁴)',
            'm (or mm)',
          ]}
        />
      </div>
    </FullWidthLayout>
  );
};

export default Checkpoint1Slide;
