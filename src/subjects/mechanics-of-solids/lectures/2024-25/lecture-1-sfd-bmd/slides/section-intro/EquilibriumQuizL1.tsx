import React from 'react';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import { QuizCardOrchestrator } from '@/features/quiz';
import { parameterResolver } from '@/features/quiz/utils/parameterResolver';
import { LatexFormula } from '@/features/presentation/components/elements';

export const EquilibriumQuizL1: React.FC = () => {
  const questionText = React.useMemo(() => {
    const qFn = (reg: string) => {
      const pVal = parameterResolver.resolve(
        { formula: '16.0 + [last digit] * 1.0', resolve: (r) => (16.0 + parameterResolver.getLastDigit(r) * 1.0).toFixed(1) },
        reg
      );
      return (
        <span>
          For a symmetric, simply supported beam of total span 8.0m with a single point load at its center, if the point load is <LatexFormula math={`P = ${pVal}\\text{ kN}`} />, calculate the vertical reaction at the left support (<LatexFormula math="R_{Ay}" />) in kN. Round your final answer to exactly 3 decimal places.
        </span>
      );
    };
    return Object.assign(qFn, {
      formula: 'For a symmetric, simply supported beam of total span 8.0m with a single point load at its center, if the point load is P = (16.0 + [last digit] × 1.0) kN, calculate the vertical reaction at the left support (R_Ay) in kN. Round your final answer to exactly 3 decimal places.'
    });
  }, []);

  return (
    <FullWidthLayout title="Prerequisite Check: Static Equilibrium">
      <div className="w-full max-w-[720px] mx-auto mt-6">
        <QuizCardOrchestrator
          quizId="mos_2024_lec1_q1"
          questionText={questionText}
          quizType="numeric-input"
          defaultDuration={60}
          defaultBuffer={10}
        />
      </div>
    </FullWidthLayout>
  );
};

export default EquilibriumQuizL1;
