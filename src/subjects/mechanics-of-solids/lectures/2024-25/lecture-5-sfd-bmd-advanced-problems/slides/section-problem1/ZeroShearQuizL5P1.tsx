import React from 'react';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import { QuizCardOrchestrator } from '@/features/quiz';
import { parameterResolver } from '@/features/quiz/utils/parameterResolver';

export const ZeroShearQuizL5P1: React.FC = () => {
  const questionText = React.useMemo(() => {
    const qFn = (reg: string) => {
      const v1Val = parameterResolver.resolve(
        { formula: '12.0 + [last digit] * 0.4', resolve: (r) => (12.0 + parameterResolver.getLastDigit(r) * 0.4).toFixed(1) },
        reg
      );
      return (
        <span>
          {"For a UDL segment of total span \\(5.0\\text{ m}\\), if the starting positive shear force is \\(V_1 = "}{v1Val}{"\\text{ kN}\\) and the uniform load intensity is \\(w = 3.0\\text{ kN/m}\\), calculate the zero-shear crossing distance \\(x\\) from the starting boundary in meters. Round your final answer to exactly 3 decimal places."}
        </span>
      );
    };
    return Object.assign(qFn, {
      formula: 'For a UDL segment of total span 5.0m, if the starting positive shear force is V1 = (12.0 + [last digit] × 0.4) kN and the uniform load intensity is w = 3.0 kN/m, calculate the zero-shear crossing distance x from the starting boundary in meters. Round your final answer to exactly 3 decimal places.'
    });
  }, []);

  return (
    <FullWidthLayout title="Problem 1: Zero-Shear Crossing Quiz">
      <div className="w-full max-w-[720px] mx-auto mt-6 font-sans">
        <QuizCardOrchestrator
          quizId="mos_2024_lec5_q1"
          questionText={questionText}
          quizType="numeric-input"
          defaultDuration={120}
          defaultBuffer={20}
        />
      </div>
    </FullWidthLayout>
  );
};

export default ZeroShearQuizL5P1;
