import React from 'react';
import { LatexFormula } from '@/features/presentation/components/elements/LatexFormula';

// Inner component to render inline math
const MathTextInnerNoBold: React.FC<{ text: string }> = ({ text }) => {
  const mathParts = text.split(/(\$.*?\$)/g);
  return (
    <>
      {mathParts.map((part, idx) => {
        if (part.startsWith('$') && part.endsWith('$')) {
          return <LatexFormula key={idx} math={part.slice(1, -1)} />;
        }
        return part;
      })}
    </>
  );
};

// Helper to render bold text and inline math hierarchically
const MathTextInner: React.FC<{ text: string }> = ({ text }) => {
  const boldParts = text.split(/(\*\*.*?\*\*)/g);
  return (
    <>
      {boldParts.map((part, idx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          const innerText = part.slice(2, -2);
          return (
            <strong key={idx} className="font-bold text-foreground">
              <MathTextInnerNoBold text={innerText} />
            </strong>
          );
        }
        return <MathTextInnerNoBold key={idx} text={part} />;
      })}
    </>
  );
};

// Lightweight markdown and latex text parser with multi-line support
export const MathTextRenderer: React.FC<{ text: string }> = ({ text }) => {
  const preprocess = (str: string) => {
    let res = str.replace(/\\\[/g, '$$$$').replace(/\\\]/g, '$$$$');
    res = res.replace(/\\\(/g, '$').replace(/\\\)/g, '$');
    return res;
  };

  const preprocessed = preprocess(text);
  const lines = preprocessed.split('\n');

  return (
    <div className="space-y-1 text-left w-full">
      {lines.map((line, lineIdx) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={lineIdx} className="h-1.5" />;

        if (trimmed.startsWith('$$') && trimmed.endsWith('$$')) {
          const math = trimmed.slice(2, -2);
          return <LatexFormula key={lineIdx} math={math} block />;
        }

        if (trimmed.startsWith('### ')) {
          const content = trimmed.slice(4);
          return (
            <h3 key={lineIdx} className="text-sm font-semibold text-primary mt-2 mb-1 border-b border-border/30 pb-1">
              <MathTextInner text={content} />
            </h3>
          );
        }
        if (trimmed.startsWith('#### ')) {
          const content = trimmed.slice(5);
          return (
            <h4 key={lineIdx} className="text-xs font-bold text-foreground mt-2 mb-1">
              <MathTextInner text={content} />
            </h4>
          );
        }

        if (trimmed.startsWith('- ')) {
          const content = trimmed.slice(2);
          return (
            <div key={lineIdx} className="flex items-start gap-2 pl-3 py-0.5 bg-muted/5 rounded-r-md">
              <span className="text-primary mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" />
              <span className="leading-relaxed text-xs text-foreground/80">
                <MathTextInner text={content} />
              </span>
            </div>
          );
        }

        const blocks = trimmed.split('$$');
        return (
          <div key={lineIdx} className="math-text-block leading-relaxed py-0.5 text-xs text-foreground/80">
            {blocks.map((block, idx) => {
              if (idx % 2 === 1) {
                return <LatexFormula key={idx} math={block} block />;
              }
              return <MathTextInner key={idx} text={block} />;
            })}
          </div>
        );
      })}
    </div>
  );
};
