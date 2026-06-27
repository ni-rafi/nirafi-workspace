import React from 'react';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import { QuizCardOrchestrator } from '@/features/quiz';
import { LatexFormula } from '@/features/presentation/components/elements';

export const SignConventionQuizL1: React.FC = () => {
  return (
    <FullWidthLayout title="Sign Conventions Checkpoint Quiz">
      <div className="w-full max-w-[720px] mx-auto mt-6">
        <QuizCardOrchestrator
          quizId="mos_2024_lec1_q2"
          questionText={
            <span>
              According to the standard sign convention used in this course, what internal actions represent positive shear force <LatexFormula math="V" /> and positive bending moment <LatexFormula math="M" /> on a left-segment FBD cut?
            </span>
          }
          quizType="multiple-choice"
          options={[
            "Shear force pointing downward, Bending moment bending counter-clockwise (sagging)",
            "Shear force pointing upward, Bending moment bending clockwise (hogging)",
            "Shear force pointing downward, Bending moment bending clockwise (hogging)",
            "Shear force pointing upward, Bending moment bending counter-clockwise (sagging)"
          ]}
          defaultDuration={60}
          defaultBuffer={10}
        />
      </div>
    </FullWidthLayout>
  );
};

export default SignConventionQuizL1;
