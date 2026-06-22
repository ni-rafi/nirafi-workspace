import React, { useState, useEffect, useContext } from 'react';
import { PresentationContext } from '../../context/PresentationContext';

interface ParameterInputCardProps {
  label: string;
  value: number;
  unit: string;
  onChange: (val: number) => void;
  min?: number;
  max?: number;
  className?: string;
  variant?: 'row' | 'square' | 'compact';
}

export const ParameterInputCard: React.FC<ParameterInputCardProps> = ({
  label,
  value,
  unit,
  onChange,
  min = 0,
  max = 999999,
  className = '',
  variant = 'row',
}) => {
  const presentation = useContext(PresentationContext);
  const isBlog = presentation?.viewMode === 'blog';

  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value.toString());

  // Keep internal input value in sync when external value changes
  useEffect(() => {
    setInputValue(value.toString());
  }, [value]);

  const handleSave = () => {
    setIsEditing(false);
    const parsed = parseFloat(inputValue);
    if (!isNaN(parsed)) {
      const clamped = Math.min(max, Math.max(min, parsed));
      onChange(clamped);
    } else {
      setInputValue(value.toString());
    }
  };

  const isSquare = variant === 'square';
  const isCompact = variant === 'compact';

  if (isEditing) {
    if (isCompact) {
      return (
        <div
          className={`p-2 border border-primary rounded-lg bg-card flex flex-col justify-center items-center text-center shadow-md ${className}`}
        >
          <span className="text-[9px] font-bold uppercase tracking-wider text-primary mb-1 select-none">
            {label}
          </span>
          <div className="flex items-center gap-1.5 w-full justify-center">
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onBlur={handleSave}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSave();
              }}
              autoFocus
              className="w-16 text-center bg-background border border-border/60 rounded px-1.5 py-0.5 text-primary text-base font-extrabold font-mono focus:outline-none focus:ring-1 focus:ring-primary/50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <span className="text-[10px] text-muted-foreground/80 font-semibold select-none">{unit}</span>
          </div>
        </div>
      );
    }

    if (isSquare) {
      return (
        <div
          className={`flex flex-col justify-between p-5 rounded-3xl border border-primary bg-card shadow-lg aspect-square min-w-[130px] transition-all ${className}`}
        >
          {/* Top Row */}
          <div className="flex items-center justify-between w-full">
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full select-none">
              {unit}
            </span>
          </div>

          {/* Center Input */}
          <div className="my-2 w-full">
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onBlur={handleSave}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSave();
              }}
              autoFocus
              className="w-full text-left font-sans text-3xl font-extrabold text-foreground bg-muted/80 p-1.5 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>

          {/* Bottom Label */}
          <div className="text-left w-full text-muted-foreground text-xs font-sans font-medium select-none">
            {label}
          </div>
        </div>
      );
    }

    return (
      <div className={`flex items-center justify-between p-3.5 rounded-xl border border-primary bg-card shadow-xs ${className}`}>
        <span className="text-muted-foreground text-xs font-sans select-none">{label}</span>
        <div className="flex items-center gap-1.5">
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={handleSave}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSave();
            }}
            autoFocus
            className="w-20 text-right font-mono text-xs font-bold text-foreground bg-muted/80 px-2 py-1 rounded border border-border focus:outline-none focus:ring-1 focus:ring-primary/50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <span className="text-xs font-bold text-muted-foreground select-none">{unit}</span>
          <button
            onClick={handleSave}
            className="text-primary hover:text-primary/80 p-1 rounded hover:bg-primary/10 transition-all"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  if (isCompact) {
    return (
      <div
        onClick={() => setIsEditing(true)}
        className={`group p-2 border border-border/30 rounded-lg transition-all cursor-pointer bg-card/65 hover:bg-muted/10 hover:border-primary/50 flex flex-col justify-center items-center text-center shadow-xs relative ${className}`}
      >
        {/* Edit indicator icon */}
        <div className="absolute top-1.5 right-1.5 opacity-40 group-hover:opacity-100 transition-opacity text-muted-foreground group-hover:text-primary p-0.5 rounded">
          <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </div>

        <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider mb-0.5 select-none group-hover:text-primary transition-colors pr-2">
          {label}
        </span>
        <span className="text-lg font-extrabold text-primary flex items-center gap-1 select-all">
          {value} <span className="text-[10px] text-muted-foreground/80 font-semibold select-none">{unit}</span>
        </span>
      </div>
    );
  }

  if (isSquare) {
    return (
      <div
        onClick={() => setIsEditing(true)}
        className={`group flex flex-col justify-between p-5 rounded-3xl border transition-all cursor-pointer aspect-square min-w-[130px] shadow-xs relative ${
          isBlog
            ? 'bg-transparent border-border/30 hover:border-primary/40'
            : 'bg-card border-border/60 hover:bg-muted/10 hover:border-primary/50 hover:shadow-md'
        } ${className}`}
      >
        {/* Top Row */}
        <div className="flex items-center justify-between w-full">
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground bg-muted px-2 py-0.5 rounded-full select-none">
            {unit}
          </span>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity text-primary p-0.5 rounded bg-primary/10">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </div>
        </div>

        {/* Center Value */}
        <div className="my-2 text-left w-full">
          <span className="font-sans text-4xl font-extrabold text-foreground tracking-tight select-none">
            {value}
          </span>
        </div>

        {/* Bottom Label */}
        <div className="text-left w-full text-muted-foreground text-xs font-sans font-medium leading-snug select-none group-hover:text-foreground transition-colors">
          {label}
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => setIsEditing(true)}
      className={`flex items-center justify-between p-3.5 rounded-xl border transition-all cursor-pointer shadow-xs ${
        isBlog
          ? 'bg-transparent border-border/30 hover:border-primary/30'
          : 'bg-card border-border/60 hover:bg-muted/10 hover:border-primary/40'
      } ${className}`}
    >
      <span className="text-muted-foreground text-xs font-sans select-none">{label}</span>
      <span className="font-mono font-bold text-foreground bg-muted/80 px-2.5 py-1 rounded text-xs flex items-center gap-1.5">
        {value} {unit}
        <svg className="w-3 h-3 text-muted-foreground/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      </span>
    </div>
  );
};

export default ParameterInputCard;
