import React from 'react';
import { LatexFormula } from './LatexFormula';
import { ArrowRight } from 'lucide-react';

export interface FormulaStep {
  /** Short label, e.g. "General Form", "Substitution", "Result" */
  label: string;
  /** LaTeX string for this step */
  formula: string;
  /** Optional highlight accent on this step's row */
  highlight?: boolean;
}

interface FormulaBreakdownProps {
  /** Title displayed above the breakdown */
  title?: string;
  steps: FormulaStep[];
  className?: string;
}

/**
 * FormulaBreakdown renders a vertical step-by-step LaTeX formula flow.
 * Each step shows a label, an arrow, and the rendered LaTeX expression.
 * Designed to be reusable across slides, docs, and interactive demos.
 */
export const FormulaBreakdown: React.FC<FormulaBreakdownProps> = ({
  title,
  steps,
  className = '',
}) => {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {title && (
        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1 select-none">
          {title}
        </p>
      )}
      {steps.map((step, idx) => (
        <div
          key={idx}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all ${
            step.highlight
              ? 'border-primary/40 bg-primary/5 shadow-sm'
              : 'border-border/40 bg-muted/20'
          }`}
        >
          <span className="text-[10px] font-mono text-muted-foreground w-24 shrink-0 select-none">
            {step.label}
          </span>
          <ArrowRight className="h-3 w-3 text-muted-foreground/50 shrink-0" />
          <div className="overflow-x-auto text-sm leading-none">
            <LatexFormula math={step.formula} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FormulaBreakdown;
