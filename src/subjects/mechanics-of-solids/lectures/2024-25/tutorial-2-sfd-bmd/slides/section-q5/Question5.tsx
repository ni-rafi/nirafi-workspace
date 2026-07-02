import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import { GraphicalProblemSolverVisualizer } from '@/subjects/mechanics-of-solids/features/sfd-bmd/components/breakdowns/GraphicalProblemSolverVisualizer';
import { QuizCardOrchestrator } from '@/features/quiz';
import { parameterResolver } from '@/features/quiz/utils/parameterResolver';
import { question5Config } from '../../beamConfig';

export const Question5Statement: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Question 5: Triangular & Point Load Beam"
      leftContent={
        <div className="flex flex-col gap-4 text-left font-sans">
          <p className="text-sm font-semibold leading-relaxed text-foreground">
            Draw the shear and bending moment diagrams for the beam shown. Also, draw the qualitative elastic deflection diagram of the beam.
          </p>
          <div className="p-3 bg-muted/30 border border-border/40 rounded-xl text-xs space-y-1.5 font-medium">
            <div className="font-bold text-primary mb-1">Beam Parameters:</div>
            <div>• Triangular load: starts at 0, peaks at <span className="font-bold">w = 6.0 kN/m</span> at x = 3m</div>
            <div>• Point load: <span className="font-bold">P = 6.0 kN</span> at x = 4.5m</div>
            <div>• Support conditions: Pin at A (x = 0), roller at B (x = 6m)</div>
          </div>
        </div>
      }
      rightContent={
        <div className="w-full h-[280px]">
          <GraphicalProblemSolverVisualizer beam={question5Config} stepIndex={0} />
        </div>
      }
    />
  );
};

export const Question5Checkpoint: React.FC = () => {
  const questionText = React.useMemo(() => {
    const qFn = (reg: string) => {
      const wVal = parameterResolver.resolve(
        { formula: '6.0 + [last digit] * 0.6', resolve: (r) => (6.0 + parameterResolver.getLastDigit(r) * 0.6).toFixed(1) },
        reg
      );
      const pVal = parameterResolver.resolve(
        { formula: '6.0 + [last digit] * 0.6', resolve: (r) => (6.0 + parameterResolver.getLastDigit(r) * 0.6).toFixed(1) },
        reg
      );
      return (
        <span>
          {"For the beam in Question 5, if the peak of the triangular load is \\(w = "}{wVal}{"\\text{ kN/m}\\) and the concentrated load is \\(P = "}{pVal}{"\\text{ kN}\\), calculate the vertical reaction force \\(R_B\\) at support B in kN. Round your final answer to exactly 3 decimal places."}
        </span>
      );
    };
    return Object.assign(qFn, {
      formula: 'For the beam in Question 5, if the peak of the triangular load is w = (6.0 + [last digit] * 0.6) kN/m and the concentrated load is P = (6.0 + [last digit] * 0.6) kN, calculate the vertical reaction force R_B at support B in kN. Round your final answer to exactly 3 decimal places.'
    });
  }, []);

  return (
    <FullWidthLayout title="Question 5 Checkpoint: Reaction at B">
      <div className="w-full max-w-[720px] mx-auto mt-6 font-sans">
        <QuizCardOrchestrator
          quizId="mos_2024_tut2_q5"
          questionText={questionText}
          quizType="numeric-input"
        />
      </div>
    </FullWidthLayout>
  );
};
