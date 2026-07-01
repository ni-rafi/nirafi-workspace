import React from 'react';
import { QuizCardOrchestrator } from '@/features/quiz';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import { parameterResolver } from '@/features/quiz/utils/parameterResolver';

export const Checkpoint3Slide: React.FC = () => {
  const M_param = parameterResolver.lastDigit(10.0, 1.0, ' kNm');
  const questionObj = {
    formula: `Calculate the maximum bending stress (MPa) for a rectangular beam with width b = 100 mm, height h = 200 mm under a bending moment M = ${M_param.formula}.`,
    resolve: (reg: string) => {
      const val = M_param.resolve(reg);
      return `Calculate the maximum bending stress (MPa) for a rectangular beam with width b = 100 mm, height h = 200 mm under a bending moment M = ${val}.`;
    }
  };

  return (
    <FullWidthLayout title="Checkpoint 3: Bending Stress Calculation" bgVariant="default">
      <div className="w-full max-w-2xl mx-auto py-2">
        <QuizCardOrchestrator
          quizId="mos_2024_lec6_q3"
          questionText={questionObj}
          quizType="numeric-input"
        />
      </div>
    </FullWidthLayout>
  );
};

export default Checkpoint3Slide;
