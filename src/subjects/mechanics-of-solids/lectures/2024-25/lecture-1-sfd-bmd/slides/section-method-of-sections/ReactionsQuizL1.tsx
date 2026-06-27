import React from 'react';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import { QuizCardOrchestrator } from '@/features/quiz';
import { parameterResolver } from '@/features/quiz/utils/parameterResolver';
import { LatexFormula } from '@/features/presentation/components/elements';

export const ReactionsQuizL1: React.FC = () => {
  const questionText = React.useMemo(() => {
    const qFn = (reg: string) => {
      const pVal = parameterResolver.resolve(
        { formula: '15.0 + [last digit] * 0.5', resolve: (r) => (15.0 + parameterResolver.getLastDigit(r) * 0.5).toFixed(1) },
        reg
      );
      return (
        <span>
          For Problem 1 (span length = 16m), if the center point load changes to <LatexFormula math={`P = ${pVal}\\text{ kN}`} />, calculate the vertical reaction at the left support (<LatexFormula math="R_{Ay}" />) in kN. Round your final answer to exactly 3 decimal places.
        </span>
      );
    };
    return Object.assign(qFn, {
      formula: 'For Problem 1 (span length = 16m), if the center point load changes to P = (15.0 + [last digit] × 0.5) kN, calculate the vertical reaction at the left support (R_Ay) in kN. Round your final answer to exactly 3 decimal places.'
    });
  }, []);

  return (
    <FullWidthLayout title="Problem 1 Support Reactions Checkpoint">
      <div className="w-full max-w-[720px] mx-auto mt-6">
        <QuizCardOrchestrator
          quizId="mos_2024_lec1_q3"
          questionText={questionText}
          quizType="numeric-input"
          defaultDuration={120}
          defaultBuffer={10}
        />
      </div>
    </FullWidthLayout>
  );
};

export default ReactionsQuizL1;
