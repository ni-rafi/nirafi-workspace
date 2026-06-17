import React, { useMemo } from 'react';

export interface UseMorphingStyleProps {
  d: string;
  duration?: number;
  easing?: string;
  animateProps?: string[];
}

/**
 * Custom hook to generate style attributes for SVG path morphing.
 * Converts standard SVG path strings into CSS path('...') format and
 * creates the transition rule.
 */
export function useMorphingStyle({
  d,
  duration = 300,
  easing = 'ease-in-out',
  animateProps = ['fill'],
}: UseMorphingStyleProps) {
  return useMemo(() => {
    if (!d) return {};
    const trimmed = d.trim();
    // Normalize path strings to ensure they are wrapped inside CSS path(...)
    const formattedD = trimmed.startsWith('path(') 
      ? trimmed 
      : `path('${trimmed.replace(/^['"]|['"]$/g, '')}')`;
    
    const transition = [
      `d ${duration}ms ${easing}`,
      ...animateProps.map((prop) => `${prop} ${duration}ms ${easing}`),
    ].join(', ');

    return {
      d: formattedD,
      transition,
    };
  }, [d, duration, easing, animateProps]);
}

export interface MorphingPathProps extends Omit<React.SVGProps<SVGPathElement>, 'd'> {
  d: string;
  duration?: number;
  easing?: string;
  animateProps?: string[];
}

/**
 * MorphingPath is a reusable SVG path element that transitions smoothly
 * between different path values using the CSS `d` property.
 */
export const MorphingPath = React.forwardRef<SVGPathElement, MorphingPathProps>(
  (
    {
      d,
      duration = 300,
      easing = 'ease-in-out',
      animateProps = ['fill'],
      style,
      ...props
    },
    ref
  ) => {
    const morphingStyle = useMorphingStyle({ d, duration, easing, animateProps });

    return (
      <path
        ref={ref}
        style={{
          ...morphingStyle,
          ...style,
        }}
        {...props}
      />
    );
  }
);

MorphingPath.displayName = 'MorphingPath';
