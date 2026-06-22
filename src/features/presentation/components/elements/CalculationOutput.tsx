import React, { useContext } from 'react';
import { PresentationContext } from '../../context/PresentationContext';

interface CalculationOutputProps {
  title: string;
  value: string | number;
  unit?: string;
  subtitle?: string;
  className?: string;
  variant?: 'default' | 'compact';
}

export const CalculationOutput: React.FC<CalculationOutputProps> = ({
  title,
  value,
  unit = '',
  subtitle,
  className = '',
  variant = 'default',
}) => {
  const presentation = useContext(PresentationContext);
  const isBlog = presentation?.viewMode === 'blog';

  const isCompact = variant === 'compact';

  if (isCompact) {
    return (
      <div className={`calc-output-container @container flex flex-col items-center justify-center p-3 border rounded-lg text-center transition-all ${
        isBlog ? 'bg-transparent border-border/30 shadow-none' : 'bg-card/65 border-border/30 shadow-xs hover:shadow-xs'
      } ${className}`}>
        <span className="calc-output-title text-[9px] font-bold text-muted-foreground uppercase tracking-wider mb-0.5 select-none">
          {title}
        </span>
        <span className="calc-output-value text-lg font-extrabold text-primary select-all">
          <span className="calc-output-val-num">{value}</span>
          {unit && (
            <span className="calc-output-val-unit text-[10px] text-muted-foreground/80 font-semibold select-none ml-0.5">
              {unit}
            </span>
          )}
        </span>
        {subtitle && (
          <span className="calc-output-subtitle text-[9px] text-muted-foreground/75 mt-0.5 select-none">
            {subtitle}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={`calc-output-container @container flex flex-col items-center justify-center h-full p-6 border rounded-xl transition-all ${
      isBlog ? 'bg-transparent border-border/50 shadow-none' : 'bg-card border-border/60 shadow-xs hover:shadow-md'
    } ${className}`}>
      <span className="calc-output-title text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1 select-none">
        {title}
      </span>
      <span className="calc-output-value text-2xl sm:text-3xl font-extrabold text-primary select-all">
        <span className="calc-output-val-num">{value}</span>
        {unit && (
          <span className="calc-output-val-unit text-sm font-semibold select-none ml-1">
            {unit}
          </span>
        )}
      </span>
      {subtitle && (
        <span className="calc-output-subtitle text-[10px] text-muted-foreground/80 mt-1 select-none">
          {subtitle}
        </span>
      )}
    </div>
  );
};

export default CalculationOutput;
