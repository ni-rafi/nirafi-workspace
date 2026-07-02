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
      title="Question 1: Multi-Load Beam SFD & BMD"
      leftContent={
        <div className="flex flex-col gap-4 text-left">
          <p className="text-sm font-semibold leading-relaxed text-foreground">
            Draw the shear and bending moment diagrams for the beam shown. Also, draw the qualitative elastic deflection diagram.
          </p>
          <div className="p-3 bg-muted/30 border border-border/40 rounded-xl text-xs space-y-1.5 font-medium">
            <div className="font-bold text-primary mb-1">Beam Parameters:</div>
            <div>• Uniformly distributed load: <span className="font-bold">w = 12.0 kN/m</span> on cantilever span (x = 0 to 2m)</div>
            <div>• Concentrated moment: <span className="font-bold">M = 24.0 kN·m</span> (clockwise) at x = 4m</div>
            <div>• Point load: <span className="font-bold">P = 12.0 kN</span> at right end (x = 8m)</div>
            <div>• Support conditions: Roller at A (x = 2m), roller at B (x = 6m)</div>
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
        { formula: '12.0 + [last digit] * 0.5', resolve: (r) => (12.0 + parameterResolver.getLastDigit(r) * 0.5).toFixed(1) },
        reg
      );
      const mVal = parameterResolver.resolve(
        { formula: '24.0 + [last digit] * 2.0', resolve: (r) => (24.0 + parameterResolver.getLastDigit(r) * 2.0).toFixed(1) },
        reg
      );
      const pVal = parameterResolver.resolve(
        { formula: '12.0 + [last digit] * 1.0', resolve: (r) => (12.0 + parameterResolver.getLastDigit(r) * 1.0).toFixed(1) },
        reg
      );
      return (
        <span>
          {"For the beam in Question 1, if \\(w = "}{wVal}{"\\text{ kN/m}\\), \\(M = "}{mVal}{"\\text{ kN·m}\\) and \\(P = "}{pVal}{"\\text{ kN}\\), calculate the vertical reaction force \\(R_A\\) at support A in kN. Round your final answer to exactly 3 decimal places."}
        </span>
      );
    };
    return Object.assign(qFn, {
      formula: 'For the beam in Question 1, if w = (12.0 + [last digit] * 0.5) kN/m, M = (24.0 + [last digit] * 2.0) kN·m and P = (12.0 + [last digit] * 1.0) kN, calculate the vertical reaction force R_A at support A in kN. Round your final answer to exactly 3 decimal places.'
    });
  }, []);

  return (
    <FullWidthLayout title="Question 1 Checkpoint: Reaction at A">
      <div className="w-full max-w-[720px] mx-auto mt-6 font-sans">
        <QuizCardOrchestrator
          quizId="mos_2024_tut2_q1"
          questionText={questionText}
          quizType="numeric-input"
        />
      </div>
    </FullWidthLayout>
  );
};
