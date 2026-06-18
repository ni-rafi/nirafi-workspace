import React, { useContext } from 'react';
import { PresentationContext } from '../../context/PresentationContext';

interface ParameterSliderProps {
  label: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  step?: number;
  onChange: (val: number) => void;
  displayValue?: string;
  /** Show an editable numeric input field. Default: false */
  showInput?: boolean;
  /** Show the range slider. Default: true */
  showSlider?: boolean;
  className?: string;
}

export const ParameterSlider: React.FC<ParameterSliderProps> = ({
  label,
  value,
  unit,
  min,
  max,
  step = 1,
  onChange,
  displayValue,
  showInput = false,
  showSlider = true,
  className = '',
}) => {
  const presentation = useContext(PresentationContext);
  const isBlog = presentation?.viewMode === 'blog';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsed = parseFloat(e.target.value);
    if (!isNaN(parsed)) {
      const clamped = Math.min(max, Math.max(min, parsed));
      onChange(clamped);
    }
  };

  return (
    <div className={`flex flex-col gap-1.5 p-3 rounded-xl border transition-all ${
      isBlog ? 'bg-transparent border-border/30 shadow-none' : 'bg-card border-border/60 shadow-xs'
    } ${className}`}>
      <label className="text-muted-foreground font-sans text-xs flex justify-between items-center select-none gap-2">
        <span>{label}</span>
        {showInput ? (
          <div className="flex items-center gap-1">
            <input
              type="number"
              min={min}
              max={max}
              step={step}
              value={value}
              onChange={handleInputChange}
              className="w-16 text-right font-mono text-[11px] font-bold text-foreground bg-muted/80 px-1.5 py-0.5 rounded border border-border/60 focus:outline-none focus:ring-1 focus:ring-primary/50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <span className="text-[10px] text-muted-foreground">{unit}</span>
          </div>
        ) : (
          <span className="font-bold text-foreground bg-muted/80 px-1.5 py-0.5 rounded text-[11px]">
            {displayValue !== undefined ? displayValue : `${value}${unit}`}
          </span>
        )}
      </label>
      {showSlider && (
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="w-full accent-primary cursor-pointer"
        />
      )}
    </div>
  );
};

export default ParameterSlider;
