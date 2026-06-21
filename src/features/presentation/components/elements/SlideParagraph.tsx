import React, { useContext, useEffect, useState, useId } from 'react';
import { ClickReveal } from './ClickReveal';
import { PresentationContext } from '../../context/PresentationContext';
import { useClickStepsContext } from '../../context/ClickStepsContext';

export interface SlideElementProps {
  revealAt?: number | string;
  revealPreset?: 'fade' | 'fade-in' | 'up' | 'down' | 'scale' | 'none';
  className?: string;
}

interface SlideParagraphProps extends SlideElementProps {
  title?: string;
  text?: React.ReactNode;
  children?: React.ReactNode;
  paragraphs?: Array<React.ReactNode | string>;
  revealMode?: 'each-click' | 'all-click' | 'auto-stagger' | 'none';
  delayMs?: number;
  variant?: 'info' | 'warning' | 'error' | 'success' | 'callout' | 'plain' | 'default';
}

export const SlideParagraph: React.FC<SlideParagraphProps> = ({
  title,
  text,
  children,
  paragraphs,
  revealAt,
  revealPreset = 'fade-in',
  revealMode = 'none',
  delayMs = 200,
  variant = 'default',
  className = '',
}) => {
  const presentation = useContext(PresentationContext);
  const isBlog = presentation?.viewMode === 'blog';
  const { registerClick, deregisterClick } = useClickStepsContext();
  const id = useId();
  const [listStep, setListStep] = useState<number | null>(null);

  // Register a click step if auto-stagger is configured at the parent container level
  useEffect(() => {
    if (!isBlog && revealMode === 'auto-stagger') {
      const step = registerClick(id, revealAt ?? '+1');
      setListStep(step);
      return () => {
        deregisterClick(id);
      };
    }
  }, [id, revealMode, revealAt, registerClick, deregisterClick, isBlog]);

  let variantClasses = '';
  if (isBlog) {
    if (variant === 'info') {
      variantClasses = 'p-3 pl-4 border-l-2 border-blue-500 text-blue-700 dark:text-blue-300 bg-transparent';
    } else if (variant === 'warning') {
      variantClasses = 'p-3 pl-4 border-l-2 border-amber-500 text-amber-700 dark:text-amber-300 bg-transparent';
    } else if (variant === 'error') {
      variantClasses = 'p-3 pl-4 border-l-2 border-red-500 text-red-700 dark:text-red-300 bg-transparent';
    } else if (variant === 'success') {
      variantClasses = 'p-3 pl-4 border-l-2 border-emerald-500 text-emerald-700 dark:text-emerald-300 bg-transparent';
    } else if (variant === 'callout') {
      variantClasses = 'p-3 pl-4 border-l-2 border-primary text-foreground bg-transparent';
    } else if (variant === 'plain') {
      variantClasses = 'text-muted-foreground';
    } else {
      variantClasses = 'border-l-4 border-primary pl-4 py-1.5 text-muted-foreground my-4 font-medium';
    }
  } else {
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
    } else if (variant === 'plain') {
      variantClasses = 'text-muted-foreground';
    } else {
      variantClasses = 'relative p-5 md:p-6 bg-muted/60 dark:bg-muted/20 border-l-[6px] border-primary rounded-r-xl text-foreground font-medium before:absolute before:top-0 before:left-[-6px] before:w-10 before:h-[6px] before:bg-primary after:absolute after:bottom-0 after:left-[-6px] after:w-10 after:h-[6px] after:bg-primary';
    }
  }

  const isCard = !isBlog && variant !== 'plain' && variant !== 'info' && variant !== 'warning' && variant !== 'error' && variant !== 'success';

  // Resolve paragraphs array from props or children
  const paragraphsArray = paragraphs || (text ? [text] : React.Children.toArray(children));

  const resolvedParagraphs = paragraphsArray.map((p, idx) => {
    let pRevealAt: number | string | undefined = undefined;
    let pStyle: React.CSSProperties | undefined = undefined;

    if (!isBlog) {
      if (revealMode === 'each-click') {
        pRevealAt = idx === 0 ? (revealAt ?? '+1') : '+1';
      } else if (revealMode === 'auto-stagger') {
        pRevealAt = listStep ?? undefined;
        pStyle = {
          transitionDelay: `${idx * delayMs}ms`,
        };
      }
    }

    return {
      node: p,
      revealAt: pRevealAt,
      style: pStyle,
    };
  });

  const cardContent = (
    <div className={`text-xs md:text-sm leading-relaxed select-text ${variantClasses} ${className}`}>
      {title && (
        <div className={`font-extrabold text-xs md:text-sm text-primary tracking-wide mb-3 select-none ${
          isCard ? 'border-b border-border/40 pb-1.5 uppercase' : ''
        }`}>
          {title}
        </div>
      )}
      <div className={`${title ? 'mt-1' : ''} text-foreground/90 font-medium space-y-3`}>
        {resolvedParagraphs.map((item, idx) => {
          if (item.revealAt !== undefined) {
            return (
              <ClickReveal
                key={idx}
                at={item.revealAt}
                preset={revealPreset}
                style={item.style}
              >
                {item.node}
              </ClickReveal>
            );
          }
          return (
            <div key={idx} style={item.style}>
              {item.node}
            </div>
          );
        })}
      </div>
    </div>
  );

  // If revealMode is 'all-click' or we explicitly have revealAt, wrap in ClickReveal
  if (!isBlog && (revealMode === 'all-click' || revealAt !== undefined)) {
    return (
      <ClickReveal at={revealAt ?? '+1'} preset={revealPreset}>
        {cardContent}
      </ClickReveal>
    );
  }

  return cardContent;
};

export default SlideParagraph;
