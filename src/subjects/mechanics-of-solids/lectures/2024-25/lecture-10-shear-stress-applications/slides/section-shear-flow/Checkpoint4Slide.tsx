import React from 'react';
import { QuizCardOrchestrator } from '@/features/quiz';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';

export const Checkpoint4Slide: React.FC = () => {
  return (
    <FullWidthLayout title="Checkpoint 4: Built-Up Section Fastener Spacing" bgVariant="default">
      <div className="w-full max-w-2xl mx-auto py-2">
        <QuizCardOrchestrator
          quizId="mos_2024_lec10_q2"
          questionText="Determine the maximum allowable nail spacing s (in mm) for a built-up T-beam section. The flange is 150 mm × 50 mm, the web is 50 mm × 150 mm, and it is secured with single nails (n = 1) of shear capacity F_nail = 3.0 kN. The section experiences a vertical shear force V = {V}, where V = 30.0 + [last digit of your registration number] × 2.0 kN. (Round to 3 decimal places)."
          quizType="numeric-input"
        />
      </div>
    </FullWidthLayout>
  );
};

export default Checkpoint4Slide;
