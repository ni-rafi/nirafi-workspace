import React from 'react';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import { QuizCardOrchestrator } from '@/features/quiz';
import { parameterResolver } from '@/features/quiz/utils/parameterResolver';
import { LatexFormula } from '@/features/presentation/components/elements';

export const InternalForcesQuizL1: React.FC = () => {
  const questionText = React.useMemo(() => {
    const qFn = (reg: string) => {
      const raVal = parameterResolver.resolve(
        { formula: '10.0 + [last digit] * 0.5', resolve: (r) => (10.0 + parameterResolver.getLastDigit(r) * 0.5).toFixed(1) },
        reg
      );
      return (
        <span>
          Using the method of sections for Interval 1 (<LatexFormula math="0 \le x < 8\text{ m}" />) where the shear force is constant at <LatexFormula math="V(x) = R_{Ay}" />, calculate the bending moment <LatexFormula math="M" /> (kNm) at coordinate <LatexFormula math="x = 4\text{ m}" /> if the left support reaction is <LatexFormula math={`R_{Ay} = ${raVal}\\text{ kN}`} />. Round your final answer to exactly 3 decimal places.
        </span>
      );
    };
    return Object.assign(qFn, {
      formula: 'Using the method of sections for Interval 1 (0 <= x < 8m) where the shear force is constant at V(x) = R_Ay, calculate the bending moment M (kNm) at coordinate x = 4m if the left support reaction is R_Ay = (10.0 + [last digit] × 0.5) kN. Round your final answer to exactly 3 decimal places.'
    });
  }, []);

  return (
    <FullWidthLayout title="Method of Sections Bending Moment Checkpoint">
      <div className="w-full max-w-[720px] mx-auto mt-6">
        <QuizCardOrchestrator
          quizId="mos_2024_lec1_q4"
          questionText={questionText}
          quizType="numeric-input"
          defaultDuration={120}
          defaultBuffer={10}
        />
      </div>
    </FullWidthLayout>
  );
};

export default InternalForcesQuizL1;
