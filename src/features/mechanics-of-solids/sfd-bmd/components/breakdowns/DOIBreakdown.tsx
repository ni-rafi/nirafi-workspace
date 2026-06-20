import React from 'react';
import { useBeamEngine } from '../../hooks/useBeamEngine';
import { LatexFormula } from '@/features/presentation/components/elements/LatexFormula';

// Helper to render bold text and inline math within a segment
const MathTextInner: React.FC<{ text: string }> = ({ text }) => {
  const inlines = text.split('$');
  return (
    <>
      {inlines.map((segment, sIdx) => {
        if (sIdx % 2 === 1) {
          // Inline KaTeX
          return <LatexFormula key={sIdx} math={segment} />;
        }

        // Even index - contains normal text with potential bold tags **bold**
        const bolds = segment.split('**');
        return (
          <span key={sIdx}>
            {bolds.map((boldText, bIdx) => {
              if (bIdx % 2 === 1) {
                return <strong key={bIdx} className="font-bold text-foreground">{boldText}</strong>;
              }
              return boldText;
            })}
          </span>
        );
      })}
    </>
  );
};

// A lightweight parser for rendering inline ($...$), block ($$...$$) KaTeX, bold tags (**), and list tags (-) in strings
export const MathTextRenderer: React.FC<{ text: string }> = ({ text }) => {
  const trimmed = text.trim();

  // 1. Check for LaTeX block format $$formula$$
  if (trimmed.startsWith('$$') && trimmed.endsWith('$$')) {
    const math = trimmed.slice(2, -2);
    return <LatexFormula math={math} block />;
  }

  // 2. Check for markdown headings
  if (trimmed.startsWith('### ')) {
    const content = trimmed.slice(4);
    return (
      <h3 className="text-sm font-semibold text-primary mt-4 mb-2 border-b border-border/30 pb-1">
        <MathTextInner text={content} />
      </h3>
    );
  }
  if (trimmed.startsWith('#### ')) {
    const content = trimmed.slice(5);
    return (
      <h4 className="text-xs font-bold text-foreground mt-3 mb-1">
        <MathTextInner text={content} />
      </h4>
    );
  }

  // 3. Check for list items
  if (trimmed.startsWith('- ')) {
    const content = trimmed.slice(2);
    return (
      <div className="flex items-start gap-2 pl-3 py-1 bg-muted/5 rounded-r-md">
        <span className="text-primary mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" />
        <span className="leading-relaxed text-xs text-foreground/80">
          <MathTextInner text={content} />
        </span>
      </div>
    );
  }

  // 4. Default plain paragraph
  const blocks = trimmed.split('$$');
  return (
    <div className="math-text-block leading-relaxed py-1">
      {blocks.map((block, idx) => {
        if (idx % 2 === 1) {
          return <LatexFormula key={idx} math={block} block />;
        }
        return <MathTextInner key={idx} text={block} />;
      })}
    </div>
  );
};

export const DOIBreakdown: React.FC = () => {
  const { solverResult } = useBeamEngine();

  const { explanationSteps, doi, isDeterminate, isUnstable } = solverResult.doiResult;

  let alertClass = 'border-emerald-500/20 bg-emerald-500/5 text-emerald-600';
  let alertTitle = 'Statically Determinate';
  if (isUnstable) {
    alertClass = 'border-destructive/20 bg-destructive/5 text-destructive';
    alertTitle = 'Statically Unstable';
  } else if (!isDeterminate) {
    alertClass = 'border-amber-500/20 bg-amber-500/5 text-amber-600';
    alertTitle = 'Statically Indeterminate';
  }

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border bg-card/30 p-5 backdrop-blur-md">
      <div className="flex items-center justify-between border-b border-border/60 pb-3">
        <h3 className="text-sm font-semibold text-primary">Degree of Static Indeterminacy (DOI)</h3>
        <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${alertClass}`}>
          {alertTitle} (DOI = {doi})
        </span>
      </div>

      <div className="flex flex-col gap-2.5 text-xs text-foreground/80">
        {explanationSteps.map((step, idx) => (
          <div key={idx} className="flex flex-col gap-1 border-l-2 border-primary/20 pl-3.5 py-1">
            <MathTextRenderer text={step} />
          </div>
        ))}
      </div>
    </div>
  );
};
