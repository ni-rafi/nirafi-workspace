import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import { GraphicalProblemSolverVisualizer } from '@/subjects/mechanics-of-solids/features/sfd-bmd/components/breakdowns/GraphicalProblemSolverVisualizer';
import { QuizCardOrchestrator } from '@/features/quiz';
import { parameterResolver } from '@/features/quiz/utils/parameterResolver';
import { question2Config } from '../../beamConfig';

export const Question2Statement: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Question 2: Compound Beam SFD & BMD"
      leftContent={
        <div className="flex flex-col gap-4 text-left">
          <p className="text-sm font-semibold leading-relaxed text-foreground">
            Draw the shear and bending moment diagrams for the compound beam shown.
          </p>
          <div className="p-3 bg-muted/30 border border-border/40 rounded-xl text-xs space-y-1.5 font-medium">
            <div className="font-bold text-primary mb-1">Beam Parameters:</div>
            <div>• Point loads: <span className="font-bold">P = 10.0 kN</span> at x = 2m and x = 4m</div>
            <div>• Concentrated moment: <span className="font-bold">M = 15.0 kN·m</span> (clockwise) at support B (x = 6m)</div>
            <div>• Support conditions: Pin at A, roller at B</div>
          </div>
        </div>
      }
      rightContent={
        <div className="w-full h-[280px]">
          <GraphicalProblemSolverVisualizer beam={question2Config} stepIndex={0} />
        </div>
      }
    />
  );
};

export const Question2Checkpoint: React.FC = () => {
  const questionText = React.useMemo(() => {
    const qFn = (reg: string) => {
      const pVal = parameterResolver.resolve(
        { formula: '10.0 + [last digit] * 0.5', resolve: (r) => (10.0 + parameterResolver.getLastDigit(r) * 0.5).toFixed(1) },
        reg
      );
      const mVal = parameterResolver.resolve(
        { formula: '15.0 + [last digit] * 1.0', resolve: (r) => (15.0 + parameterResolver.getLastDigit(r) * 1.0).toFixed(1) },
        reg
      );
      return (
        <span>
          {"For the beam in Question 2, if each point load is \\(P = "}{pVal}{"\\text{ kN}\\) and the concentrated moment is \\(M = "}{mVal}{"\\text{ kN·m}\\), calculate the vertical reaction force \\(R_B\\) at support B in kN. Round your final answer to exactly 3 decimal places."}
        </span>
      );
    };
    return Object.assign(qFn, {
      formula: 'For the beam in Question 2, if each point load is P = (10.0 + [last digit] * 0.5) kN and the concentrated moment is M = (15.0 + [last digit] * 1.0) kN·m, calculate the vertical reaction force R_B at support B in kN. Round your final answer to exactly 3 decimal places.'
    });
  }, []);

  return (
    <FullWidthLayout title="Question 2 Checkpoint: Reaction at B">
      <div className="w-full max-w-[720px] mx-auto mt-6 font-sans">
        <QuizCardOrchestrator
          quizId="mos_2024_tut1_q2"
          questionText={questionText}
          quizType="numeric-input"
        />
      </div>
    </FullWidthLayout>
  );
};
