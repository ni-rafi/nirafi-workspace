import React from 'react';
import { LatexFormula } from './LatexFormula';
import { ClickReveal } from './ClickReveal';
import { SlideElementProps } from './SlideParagraph';

interface SlideEquationProps extends SlideElementProps {
  math: string;
  block?: boolean;
  label?: string;
}

export const SlideEquation: React.FC<SlideEquationProps> = ({
  math,
  block = false,
  label,
  revealAt,
  revealPreset,
  className = '',
}) => {
  const content = (
    <div className={`my-3 flex flex-col items-center justify-center p-4 bg-primary/5 border-l-2 border-primary rounded-xl transition-all duration-300 hover:shadow-md ${className}`}>
      {label && (
        <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider mb-2">
          {label}
        </span>
      )}
      <LatexFormula math={math} block={block} />
    </div>
  );

  if (revealAt !== undefined) {
    return <ClickReveal at={revealAt} preset={revealPreset}>{content}</ClickReveal>;
  }

  return content;
};

export default SlideEquation;
