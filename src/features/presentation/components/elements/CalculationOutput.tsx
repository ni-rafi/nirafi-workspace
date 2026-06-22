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
      <div className={`flex flex-col items-center justify-center p-3 border rounded-lg text-center transition-all ${
        isBlog ? 'bg-transparent border-border/30 shadow-none' : 'bg-card/65 border-border/30 shadow-xs hover:shadow-xs'
      } ${className}`}>
        <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider mb-0.5 select-none">
          {title}
        </span>
        <span className="text-lg font-extrabold text-primary select-all">
          {value} {unit && <span className="text-[10px] text-muted-foreground/80 font-semibold select-none">{unit}</span>}
        </span>
        {subtitle && (
          <span className="text-[9px] text-muted-foreground/75 mt-0.5 select-none">
            {subtitle}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center h-full p-6 border rounded-xl transition-all ${
      isBlog ? 'bg-transparent border-border/50 shadow-none' : 'bg-card border-border/60 shadow-xs hover:shadow-md'
    } ${className}`}>
      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1 select-none">
        {title}
      </span>
      <span className="text-2xl sm:text-3xl font-extrabold text-primary select-all">
        {value} {unit}
      </span>
      {subtitle && (
        <span className="text-[10px] text-muted-foreground/80 mt-1 select-none">
          {subtitle}
        </span>
      )}
    </div>
  );
};

export default CalculationOutput;
