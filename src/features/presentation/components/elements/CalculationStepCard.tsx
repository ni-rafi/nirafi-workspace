import React, { useContext } from 'react';
import { PresentationContext } from '../../context/PresentationContext';
import { ClickReveal } from './ClickReveal';
import { LatexFormula } from './LatexFormula';

interface CalculationStepCardProps {
  /** The step number or prefix, e.g. 1 or "Step 1" */
  step?: number | string;
  /** The descriptive title of the calculation step */
  title: string;
  /** Main explanation text/content */
  description?: React.ReactNode;
  /** Optional LaTeX equation to render dynamically */
  formula?: string;
  /** Optional click reveal step sequence number */
  revealAt?: number | string;
  /** Custom wrapper classes */
  className?: string;
  /** Highlight style variant */
  highlight?: boolean;
  /** Children content if not using formula string */
  children?: React.ReactNode;
}

export const CalculationStepCard: React.FC<CalculationStepCardProps> = ({
  step,
  title,
  description,
  formula,
  revealAt,
  className = '',
  highlight = false,
  children,
}) => {
  const presentation = useContext(PresentationContext);
  const isBlog = presentation?.viewMode === 'blog';

  const cardContent = (
    <div
      className={`border p-3.5 rounded-xl transition-all shadow-xs ${
        highlight
          ? 'border-primary/45 bg-primary/5 dark:bg-primary/10'
          : isBlog
          ? 'bg-transparent border-border/30 shadow-none'
          : 'bg-muted/10 border-border/40 hover:bg-muted/15'
      } ${className}`}
    >
      <span className="font-extrabold text-foreground block mb-1 uppercase text-[10px] tracking-wider text-primary select-none">
        {step !== undefined ? `Step ${step}: ` : ''}{title}
      </span>
      {description && (
        <span className="text-xs md:text-sm text-muted-foreground leading-relaxed block select-text">
          {description}
        </span>
      )}
      {formula && (
        <div className="mt-1.5 font-semibold text-primary overflow-x-auto">
          <LatexFormula math={formula} />
        </div>
      )}
      {children && <div className="mt-1.5">{children}</div>}
    </div>
  );

  if (revealAt !== undefined && !isBlog) {
    return <ClickReveal at={revealAt}>{cardContent}</ClickReveal>;
  }

  return cardContent;
};

export default CalculationStepCard;
