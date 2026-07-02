import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import { GraphicalProblemSolverVisualizer } from '@/subjects/mechanics-of-solids/features/sfd-bmd/components/breakdowns/GraphicalProblemSolverVisualizer';
import { QuizCardOrchestrator } from '@/features/quiz';
import { parameterResolver } from '@/features/quiz/utils/parameterResolver';
import { question4Config } from '../../beamConfig';

export const Question4Statement: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Question 4: Fixed-Right Cantilever Beam"
      leftContent={
        <div className="flex flex-col gap-4 text-left">
          <p className="text-sm font-semibold leading-relaxed text-foreground">
            Draw the shear and bending moment diagrams for the cantilever beam shown. Also, draw the qualitative elastic deflection diagram.
          </p>
          <div className="p-3 bg-muted/30 border border-border/40 rounded-xl text-xs space-y-1.5 font-medium">
            <div className="font-bold text-primary mb-1">Beam Parameters:</div>
            <div>• Uniformly distributed load: <span className="font-bold">w = 5.0 kN/m</span> from x = 0 to 2m</div>
            <div>• Concentrated moment: <span className="font-bold">M = 60.0 kN·m</span> (clockwise) at x = 4m</div>
            <div>• Support conditions: Fixed support at B (x = 5m)</div>
          </div>
        </div>
      }
      rightContent={
        <div className="w-full h-[280px]">
          <GraphicalProblemSolverVisualizer beam={question4Config} stepIndex={0} />
        </div>
      }
    />
  );
};

export const Question4Checkpoint: React.FC = () => {
  const questionText = React.useMemo(() => {
    const qFn = (reg: string) => {
      const wVal = parameterResolver.resolve(
        { formula: '5.0 + [last digit] * 0.5', resolve: (r) => (5.0 + parameterResolver.getLastDigit(r) * 0.5).toFixed(1) },
        reg
      );
      const mVal = parameterResolver.resolve(
        { formula: '60.0 + [last digit] * 6.0', resolve: (r) => (60.0 + parameterResolver.getLastDigit(r) * 6.0).toFixed(1) },
        reg
      );
      return (
        <span>
          {"For the cantilever beam in Question 4, if \\(w = "}{wVal}{"\\text{ kN/m}\\) and the concentrated moment is \\(M = "}{mVal}{"\\text{ kN·m}\\), calculate the magnitude of the support reaction moment \\(M_B\\) at fixed support B in kN·m. Round your final answer to exactly 3 decimal places."}
        </span>
      );
    };
    return Object.assign(qFn, {
      formula: 'For the cantilever beam in Question 4, if w = (5.0 + [last digit] * 0.5) kN/m and the concentrated moment is M = (60.0 + [last digit] * 6.0) kN·m, calculate the magnitude of the support reaction moment M_B at fixed support B in kN·m. Round your final answer to exactly 3 decimal places.'
    });
  }, []);

  return (
    <FullWidthLayout title="Question 4 Checkpoint: Reaction Moment at B">
      <div className="w-full max-w-[720px] mx-auto mt-6 font-sans">
        <QuizCardOrchestrator
          quizId="mos_2024_tut2_q4"
          questionText={questionText}
          quizType="numeric-input"
        />
      </div>
    </FullWidthLayout>
  );
};
