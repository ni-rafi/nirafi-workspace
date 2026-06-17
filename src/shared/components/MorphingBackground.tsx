import React from 'react';

interface MorphingBackgroundProps {
  variant?: 'default' | 'calculation' | 'gallery' | 'cover';
}

/**
 * MorphingBackground renders an SVG shape that dynamically morphs between slide variants
 * using CSS view-transition-names and layout classes.
 */
export const MorphingBackground: React.FC<MorphingBackgroundProps> = ({ variant = 'default' }) => {
  const getSvgPath = () => {
    switch (variant) {
      case 'calculation':
        return 'M0,0 L100,0 L100,100 L0,85 Z'; // Angular sharp cut for computational slide focus
      case 'gallery':
        return 'M0,0 L100,0 L90,100 L10,100 Z'; // Symmetrical taper for grids and quizzes
      case 'cover':
        return 'M0,0 L100,0 L100,100 L0,100 Z'; // Full-frame coverage for title slides
      default:
        return 'M0,0 L100,0 L100,90 L0,100 Z'; // Smooth organic slant for theory slides
    }
  };

  const getFillColor = () => {
    switch (variant) {
      case 'calculation':
        return 'rgba(59, 130, 246, 0.08)'; // Subtle blue
      case 'gallery':
        return 'rgba(139, 92, 246, 0.08)'; // Subtle purple
      case 'cover':
        return 'rgba(245, 158, 11, 0.08)'; // Subtle amber
      default:
        return 'rgba(16, 185, 129, 0.08)'; // Subtle emerald green
    }
  };

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
      <svg
        className="w-full h-full object-cover transition-all duration-700"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ viewTransitionName: 'slide-bg-vector' }}
      >
        <path
          d={getSvgPath()}
          className="transition-all duration-700"
          fill={getFillColor()}
        />
      </svg>
    </div>
  );
};

export default MorphingBackground;
