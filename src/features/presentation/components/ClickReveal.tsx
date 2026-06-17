import React, { useId, useEffect, useState } from 'react';
import { useClickStepsContext } from '../context/ClickStepsContext';

interface ClickRevealProps {
  children: React.ReactNode;
  /** Activation timing offset (absolute index e.g. 2 or relative step e.g. "+1") */
  at?: number | string;
  /** If true, hides the content after the step instead of revealing it */
  hide?: boolean;
  /** Built-in animation preset style */
  preset?: 'fade' | 'fade-in' | 'up' | 'down' | 'scale' | 'none';
  className?: string;
}

/**
 * ClickReveal controls sub-element visibility on slides, revealing or hiding content
 * at specific presentation click intervals.
 */
export const ClickReveal: React.FC<ClickRevealProps> = ({
  children,
  at = '+1',
  hide = false,
  preset = 'fade-in',
  className = '',
}) => {
  const id = useId();
  const { currentClick, registerClick, deregisterClick } = useClickStepsContext();
  const [activationStep, setActivationStep] = useState<number | null>(null);

  // Register click threshold on mount
  useEffect(() => {
    const step = registerClick(id, at);
    setActivationStep(step);

    return () => {
      deregisterClick(id);
    };
  }, [id, at, registerClick, deregisterClick]);

  // If not yet registered/initialized, hide the element initially to prevent flash
  if (activationStep === null) {
    return <div className="opacity-0 pointer-events-none">{children}</div>;
  }

  // Determine active visibility based on click step and hide modifier
  const isVisible = hide ? currentClick < activationStep : currentClick >= activationStep;

  // Build Tailwind/CSS class strings
  const animationClass = preset !== 'none' ? `slidev-vclick-anim-${preset}` : '';
  const hiddenClass = !isVisible ? 'slidev-vclick-hidden' : '';

  return (
    <div
      className={`slidev-vclick-target ${animationClass} ${hiddenClass} ${className}`}
      data-click-reveal
      data-step={activationStep}
    >
      {children}
    </div>
  );
};

export default ClickReveal;
