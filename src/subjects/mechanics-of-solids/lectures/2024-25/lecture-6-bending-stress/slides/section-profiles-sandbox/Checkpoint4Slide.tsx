import React from 'react';
import { QuizCardOrchestrator } from '@/features/quiz';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import { parameterResolver } from '@/features/quiz/utils/parameterResolver';

export const Checkpoint4Slide: React.FC = () => {
  const M_param = parameterResolver.lastDigit(20.0, 1.0, ' kNm');
  const bf_param = parameterResolver.lastDigit(120, 5, ' mm');

  const questionObj = {
    formula: `Calculate the maximum bending stress (MPa) for a T-beam section with a flange width bf = ${bf_param.formula}, thickness tf = 20 mm, web height hw = 100 mm, web thickness tw = 20 mm under bending moment M = ${M_param.formula}.`,
    resolve: (reg: string) => {
      const M_val = M_param.resolve(reg);
      const bf_val = bf_param.resolve(reg);
      return `Calculate the maximum bending stress (MPa) for a T-beam section with a flange width bf = ${bf_val}, thickness tf = 20 mm, web height hw = 100 mm, web thickness tw = 20 mm under bending moment M = ${M_val}.`;
    }
  };

  return (
    <FullWidthLayout title="Checkpoint 4: Advanced Section Stress Calculation" bgVariant="default">
      <div className="w-full max-w-2xl mx-auto py-2">
        <QuizCardOrchestrator
          quizId="mos_2024_lec6_q4"
          questionText={questionObj}
          quizType="numeric-input"
        />
      </div>
    </FullWidthLayout>
  );
};

export default Checkpoint4Slide;
