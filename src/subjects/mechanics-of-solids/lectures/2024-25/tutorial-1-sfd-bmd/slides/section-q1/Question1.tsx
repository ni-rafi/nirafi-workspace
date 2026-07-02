import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import { GraphicalProblemSolverVisualizer } from '@/subjects/mechanics-of-solids/features/sfd-bmd/components/breakdowns/GraphicalProblemSolverVisualizer';
import { QuizCardOrchestrator } from '@/features/quiz';
import { parameterResolver } from '@/features/quiz/utils/parameterResolver';
import { question1Config } from '../../beamConfig';

export const Question1Statement: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Question 1: Compound Beam SFD & BMD"
      leftContent={
        <div className="flex flex-col gap-4 text-left">
          <p className="text-sm font-semibold leading-relaxed text-foreground">
            Draw the shear and bending moment diagrams for the compound beam shown.
          </p>
          <div className="p-3 bg-muted/30 border border-border/40 rounded-xl text-xs space-y-1.5 font-medium">
            <div className="font-bold text-primary mb-1">Beam Parameters:</div>
            <div>• Uniformly distributed load: <span className="font-bold">w = 3.0 kN/m</span> on span A-C</div>
            <div>• Point load: <span className="font-bold">P = 5.0 kN</span> at x = 7.5m</div>
            <div>• Support conditions: Pin at A, roller at B, internal hinge at C, and roller at D</div>
          </div>
        </div>
      }
      rightContent={
        <div className="w-full h-[280px]">
          <GraphicalProblemSolverVisualizer beam={question1Config} stepIndex={0} />
        </div>
      }
    />
  );
};

export const Question1Checkpoint: React.FC = () => {
  const questionText = React.useMemo(() => {
    const qFn = (reg: string) => {
      const wVal = parameterResolver.resolve(
        { formula: '3.0 + [last digit] * 0.2', resolve: (r) => (3.0 + parameterResolver.getLastDigit(r) * 0.2).toFixed(1) },
        reg
      );
      const pVal = parameterResolver.resolve(
        { formula: '5.0 + [last digit] * 0.5', resolve: (r) => (5.0 + parameterResolver.getLastDigit(r) * 0.5).toFixed(1) },
        reg
      );
      return (
        <span>
          {"For the compound beam in Question 1, if the distributed load is \\(w = "}{wVal}{"\\text{ kN/m}\\) and the concentrated load is \\(P = "}{pVal}{"\\text{ kN}\\), calculate the vertical reaction force \\(R_B\\) at support B in kN. Round your final answer to exactly 3 decimal places."}
        </span>
      );
    };
    return Object.assign(qFn, {
      formula: 'For the compound beam in Question 1, if the distributed load is w = (3.0 + [last digit] * 0.2) kN/m and the concentrated load is P = (5.0 + [last digit] * 0.5) kN, calculate the vertical reaction force R_B at support B in kN. Round your final answer to exactly 3 decimal places.'
    });
  }, []);

  return (
    <FullWidthLayout title="Question 1 Checkpoint: Reaction at B">
      <div className="w-full max-w-[720px] mx-auto mt-6 font-sans">
        <QuizCardOrchestrator
          quizId="mos_2024_tut1_q1"
          questionText={questionText}
          quizType="numeric-input"
        />
      </div>
    </FullWidthLayout>
  );
};
