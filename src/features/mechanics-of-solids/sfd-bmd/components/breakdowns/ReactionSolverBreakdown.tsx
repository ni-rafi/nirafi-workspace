import React from 'react';
import { useBeamEngine } from '../../hooks/useBeamEngine';
import { MathTextRenderer } from './DOIBreakdown';

export const ReactionSolverBreakdown: React.FC = () => {
  const { solverResult } = useBeamEngine();

  if (!solverResult.success) {
    return (
      <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-4 text-xs text-destructive">
        {solverResult.reactionSteps[solverResult.reactionSteps.length - 1]}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border bg-card/30 p-5 backdrop-blur-md">
      <div className="border-b border-border/60 pb-3">
        <h3 className="text-sm font-semibold text-primary">Support Reaction Calculations</h3>
        <p className="text-[10px] text-muted-foreground">Solving global equilibrium equations and equations of condition</p>
      </div>

      <div className="flex flex-col gap-3 text-xs text-foreground/80">
        {solverResult.reactionSteps.map((step, idx) => (
          <div key={idx} className="flex flex-col gap-1 border-l-2 border-primary/20 pl-3.5 py-1">
            <MathTextRenderer text={step} />
          </div>
        ))}
      </div>
    </div>
  );
};
