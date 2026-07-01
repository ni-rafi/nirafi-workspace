import React from 'react';
import { QuizCardOrchestrator } from '@/features/quiz';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import { parameterResolver } from '@/features/quiz/utils/parameterResolver';

export const Checkpoint3Slide: React.FC = () => {
  const w_param = parameterResolver.lastDigit(4.0, 0.2, ' kN/m');

  const questionObj = {
    formula: `Find the required depth of a rectangular beam (mm) having width b = 60 mm simply supported over a span of 5 m under UDL w = ${w_param.formula} if the maximum stress is not to exceed 35 MPa in compression and 45 MPa in tension.`,
    resolve: (reg: string) => {
      const w_val = w_param.resolve(reg);
      return `Find the required depth of a rectangular beam (mm) having width b = 60 mm simply supported over a span of 5 m under UDL w = ${w_val} if the maximum stress is not to exceed 35 MPa in compression and 45 MPa in tension.`;
    }
  };

  return (
    <FullWidthLayout title="Checkpoint 3: Rectangular Beam Depth Sizing" bgVariant="default">
      <div className="w-full max-w-2xl mx-auto py-2">
        <QuizCardOrchestrator
          quizId="mos_2024_lec7_q3"
          questionText={questionObj}
          quizType="numeric-input"
        />
      </div>
    </FullWidthLayout>
  );
};

export default Checkpoint3Slide;
