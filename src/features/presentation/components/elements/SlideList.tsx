import React, { useContext, useEffect, useState, useId } from 'react';
import { SlideBullet } from './SlideBullet';
import { PresentationContext } from '../../context/PresentationContext';
import { useClickStepsContext } from '../../context/ClickStepsContext';

interface SlideListProps {
  title?: string;
  description?: string;
  items: Array<{
    title?: React.ReactNode;
    text: React.ReactNode;
    revealAt?: number | string;
    revealPreset?: 'fade' | 'fade-in' | 'up' | 'down' | 'scale' | 'none';
    icon?: React.ReactNode;
  }>;
  variant?: 'default' | 'plain';
  className?: string;
  revealMode?: 'each-click' | 'all-click' | 'auto-stagger' | 'none';
  delayMs?: number;
  revealAt?: number | string;
  revealPreset?: 'fade' | 'fade-in' | 'up' | 'down' | 'scale' | 'none';
}

export const SlideList: React.FC<SlideListProps> = ({
  title,
  description,
  items,
  variant = 'default',
  className = '',
  revealMode = 'each-click',
  delayMs = 200,
  revealAt,
  revealPreset = 'fade-in',
}) => {
  const presentation = useContext(PresentationContext);
  const isBlog = presentation?.viewMode === 'blog';
  const { registerClick, deregisterClick } = useClickStepsContext();
  const id = useId();
  const [listStep, setListStep] = useState<number | null>(null);

  // Register a single click step at the list level if performing group reveals (all-click or auto-stagger)
  useEffect(() => {
    if (!isBlog && (revealMode === 'all-click' || revealMode === 'auto-stagger')) {
      const step = registerClick(id, revealAt ?? '+1');
      setListStep(step);
      return () => {
        deregisterClick(id);
      };
    }
  }, [id, revealMode, revealAt, registerClick, deregisterClick, isBlog]);

  let listClasses = '';
  if (isBlog) {
    if (variant === 'plain') {
      listClasses = `space-y-3 text-left ${className}`;
    } else {
      listClasses = `border-l-4 border-primary pl-4 py-1.5 text-muted-foreground my-4 font-medium space-y-3 text-left ${className}`;
    }
  } else {
    if (variant === 'plain') {
      listClasses = `space-y-3 text-left ${className}`;
    } else {
      listClasses = `relative p-5 md:p-6 bg-muted/60 dark:bg-muted/20 border-l-[6px] border-primary rounded-r-xl text-foreground font-medium space-y-3 text-left before:absolute before:top-0 before:left-[-6px] before:w-10 before:h-[6px] before:bg-primary after:absolute after:bottom-0 after:left-[-6px] after:w-10 after:h-[6px] after:bg-primary ${className}`;
    }
  }

  return (
    <ul className={listClasses}>
      {title && (
        <li className={`list-none mb-3 font-extrabold text-xs md:text-sm tracking-wide select-none ${
          (variant === 'plain' || isBlog) ? 'text-primary' : 'text-primary border-b border-border/40 pb-1.5 uppercase'
        }`}>
          {title}
        </li>
      )}
      {description && (
        <li className="list-none mb-3 text-xs md:text-sm text-foreground/90 font-medium leading-relaxed select-text">
          {description}
        </li>
      )}
      {items.map((item, idx) => {
        let bulletRevealAt: number | string | undefined = undefined;
        let bulletStyle: React.CSSProperties | undefined = undefined;

        if (!isBlog) {
          if (revealMode === 'each-click') {
            bulletRevealAt = item.revealAt ?? '+1';
          } else if (revealMode === 'all-click') {
            bulletRevealAt = listStep ?? undefined;
          } else if (revealMode === 'auto-stagger') {
            bulletRevealAt = listStep ?? undefined;
            bulletStyle = {
              transitionDelay: `${idx * delayMs}ms`,
            };
          }
        }

        return (
          <SlideBullet
            key={idx}
            title={item.title}
            text={item.text}
            revealAt={bulletRevealAt}
            revealPreset={item.revealPreset ?? revealPreset}
            icon={item.icon}
            style={bulletStyle}
          />
        );
      })}
    </ul>
  );
};

export default SlideList;

