import React from 'react';

interface MorphingBackgroundProps {
  variant?: 'default' | 'calculation' | 'gallery' | 'cover';
}

// CSS `d` property path strings — must use path('...') syntax for CSS transitions
const PATHS: Record<string, string> = {
  calculation: "path('M0,0 L100,0 L100,100 L0,85 Z')",
  gallery: "path('M0,0 L100,0 L90,100 L10,100 Z')",
  cover: "path('M0,0 L100,0 L100,100 L0,100 Z')",
  default: "path('M0,0 L100,0 L100,90 L0,100 Z')",
};

const FILLS: Record<string, string> = {
  calculation: 'rgba(59, 130, 246, 0.08)',
  gallery: 'rgba(139, 92, 246, 0.08)',
  cover: 'rgba(245, 158, 11, 0.08)',
  default: 'rgba(16, 185, 129, 0.08)',
};

/**
 * MorphingBackground renders an SVG shape that smoothly morphs between slide variants.
 *
 * The CSS `d` property (set via style) enables native CSS transitions on SVG path data.
 * The `d` HTML attribute alone is NOT animatable by CSS — it must be a CSS property.
 * Both paths share the same M/L/Z command count so interpolation is seamless.
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
        <path
          style={{
            // Set via CSS property so the browser can interpolate between values
            d: PATHS[key],
            fill: FILLS[key],
            transition: 'd 300ms ease-in-out, fill 300ms ease-in-out',
          }}
        />
      </svg>
    </div>
  );
};

export default MorphingBackground;
