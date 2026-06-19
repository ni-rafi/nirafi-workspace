import React, { useState, useEffect, useRef } from 'react';
import NumberFlow from '@number-flow/react';
import { cn } from '@/lib/utils';

interface AnimatedCountProps {
  value: number;
  className?: string;
  animateEntrance?: boolean;
}

export const AnimatedCount: React.FC<AnimatedCountProps> = ({ 
  value, 
  className,
  animateEntrance = true
}) => {
  const [ready, setReady] = useState(
    () => typeof customElements !== 'undefined' && Boolean(customElements.get('number-flow-react'))
  );

  const introStartedRef = useRef(false);
  const [flowValue, setFlowValue] = useState(() => 
    animateEntrance ? 0 : value
  );

  useEffect(() => {
    if (ready) return;
    let cancelled = false;
    customElements.whenDefined('number-flow-react').then(() => {
      if (!cancelled) {
        setReady(true);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [ready]);

  useEffect(() => {
    if (!animateEntrance) {
      setFlowValue(value);
      return;
    }

    if (!introStartedRef.current) {
      introStartedRef.current = true;
      setFlowValue(0);
      let innerRaf = 0;
      const outerRaf = requestAnimationFrame(() => {
        innerRaf = requestAnimationFrame(() => setFlowValue(value));
      });
      return () => {
        cancelAnimationFrame(outerRaf);
        cancelAnimationFrame(innerRaf);
        introStartedRef.current = false;
      };
    }

    setFlowValue(value);
  }, [animateEntrance, value]);

  if (!ready) {
    return <span className={cn('tabular-nums font-mono', className)}>{flowValue}</span>;
  }

  return (
    <NumberFlow
      value={flowValue}
      className={cn('tabular-nums font-mono', className)}
    />
  );
};

