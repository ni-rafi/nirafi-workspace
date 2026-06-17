import React from 'react';
import { MorphingPath } from './MorphingPath';

interface MorphingBackgroundProps {
  variant?: 'default' | 'calculation' | 'gallery' | 'cover';
}

// Clean raw SVG path data — the MorphingPath component handles wrapping it in path('...') for CSS transitions
const PATHS: Record<string, string> = {
  calculation: 'M0,0 L100,0 L100,100 L0,85 Z',
  gallery: 'M0,0 L100,0 L90,100 L10,100 Z',
  cover: 'M0,0 L100,0 L100,100 L0,100 Z',
  default: 'M0,0 L100,0 L100,90 L0,100 Z',
};

const FILLS: Record<string, string> = {
  calculation: 'rgba(59, 130, 246, 0.08)',
  gallery: 'rgba(139, 92, 246, 0.08)',
  cover: 'rgba(245, 158, 11, 0.08)',
  default: 'rgba(16, 185, 129, 0.08)',
};

/**
 * MorphingBackground renders an SVG shape that smoothly morphs between slide variants.
 * Uses the reusable MorphingPath component under the hood.
 */
export const MorphingBackground: React.FC<MorphingBackgroundProps> = ({ variant = 'default' }) => {
  const key = variant in PATHS ? variant : 'default';

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
      <svg
        className="w-full h-full object-cover"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <MorphingPath
          d={PATHS[key]!}
          fill={FILLS[key]}
          duration={300}
          easing="ease-in-out"
          animateProps={['fill']}
        />
      </svg>
    </div>
  );
};

export default MorphingBackground;
