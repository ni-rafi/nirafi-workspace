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
      title="Question 2: Cantilever Beam SFD & BMD"
      leftContent={
        <div className="flex flex-col gap-4 text-left">
          <p className="text-sm font-semibold leading-relaxed text-foreground">
            Draw the shear and bending moment diagrams for the cantilever beam shown. Also, draw the qualitative elastic deflection diagram.
          </p>
          <div className="p-3 bg-muted/30 border border-border/40 rounded-xl text-xs space-y-1.5 font-medium">
            <div className="font-bold text-primary mb-1">Beam Parameters:</div>
            <div>• Point loads: <span className="font-bold">P₁ = 8.0 kN</span> at x = 2m, <span className="font-bold">P₂ = 3.0 kN</span> at B (x = 4m)</div>
            <div>• Support conditions: Fixed support at A (x = 0)</div>
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
      const p1Val = parameterResolver.resolve(
        { formula: '8.0 + [last digit] * 0.4', resolve: (r) => (8.0 + parameterResolver.getLastDigit(r) * 0.4).toFixed(1) },
        reg
      );
      const p2Val = parameterResolver.resolve(
        { formula: '3.0 + [last digit] * 0.2', resolve: (r) => (3.0 + parameterResolver.getLastDigit(r) * 0.2).toFixed(1) },
        reg
      );
      return (
        <span>
          {"For the cantilever beam in Question 2, if \\(P_1 = "}{p1Val}{"\\text{ kN}\\) and \\(P_2 = "}{p2Val}{"\\text{ kN}\\), calculate the magnitude of the support reaction moment \\(M_A\\) at fixed support A in kN·m. Round your final answer to exactly 3 decimal places."}
        </span>
      );
    };
    return Object.assign(qFn, {
      formula: 'For the cantilever beam in Question 2, if P1 = (8.0 + [last digit] * 0.4) kN and P2 = (3.0 + [last digit] * 0.2) kN, calculate the magnitude of the support reaction moment M_A at fixed support A in kN·m. Round your final answer to exactly 3 decimal places.'
    });
  }, []);

  return (
    <FullWidthLayout title="Question 2 Checkpoint: Reaction Moment at A">
      <div className="w-full max-w-[720px] mx-auto mt-6 font-sans">
        <QuizCardOrchestrator
          quizId="mos_2024_tut2_q2"
          questionText={questionText}
          quizType="numeric-input"
        />
      </div>
    </FullWidthLayout>
  );
};
