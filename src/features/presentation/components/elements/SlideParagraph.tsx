import React from 'react';
import { ClickReveal } from './ClickReveal';

export interface SlideElementProps {
  revealAt?: number | string;
  revealPreset?: 'fade' | 'fade-in' | 'up' | 'down' | 'scale' | 'none';
  className?: string;
}

interface SlideParagraphProps extends SlideElementProps {
  text?: string;
  children?: React.ReactNode;
  variant?: 'info' | 'warning' | 'error' | 'success' | 'callout' | 'default';
}

export const SlideParagraph: React.FC<SlideParagraphProps> = ({
  text,
  children,
  revealAt,
  revealPreset,
  variant = 'default',
  className = '',
}) => {
  let variantClasses = '';
  if (variant === 'info') {
    variantClasses = 'p-3 bg-blue-500/5 border-l-2 border-blue-500 rounded text-blue-700 dark:text-blue-300';
  } else if (variant === 'warning') {
    variantClasses = 'p-3 bg-amber-500/5 border-l-2 border-amber-500 rounded text-amber-700 dark:text-amber-300';
  } else if (variant === 'error') {
    variantClasses = 'p-3 bg-red-500/5 border-l-2 border-red-500 rounded text-red-700 dark:text-red-300';
  } else if (variant === 'success') {
    variantClasses = 'p-3 bg-emerald-500/5 border-l-2 border-emerald-500 rounded text-emerald-700 dark:text-emerald-300';
  } else if (variant === 'callout') {
    variantClasses = 'p-3 bg-primary/5 border-l-2 border-primary rounded text-foreground';
  } else {
    variantClasses = 'text-muted-foreground';
  }

  const content = (
    <p className={`text-xs md:text-sm leading-relaxed select-text ${variantClasses} ${className}`}>
      {text || children}
    </p>
  );

  if (revealAt !== undefined) {
    return <ClickReveal at={revealAt} preset={revealPreset}>{content}</ClickReveal>;
  }

  return content;
};

export default SlideParagraph;
