import React from 'react';
import { QuizCardOrchestrator } from '@/features/quiz';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';

export const Checkpoint2Slide: React.FC = () => {
  return (
    <FullWidthLayout title="Checkpoint 2: Rectangular Section Maximum Shear" bgVariant="default">
      <div className="w-full max-w-2xl mx-auto py-2">
        <QuizCardOrchestrator
          quizId="mos_2024_lec9_q2"
          questionText="Calculate the maximum shear stress (in MPa) developed in a solid rectangular beam section of width b = 100 mm and height h = 300 mm, if it is subjected to a vertical shear force V = {V}, where V = 50.0 + [last digit of your registration number] × 2.0 kN. (Round to 3 decimal places)."
          quizType="numeric-input"
        />
      </div>
    </FullWidthLayout>
  );
};

export default Checkpoint2Slide;
