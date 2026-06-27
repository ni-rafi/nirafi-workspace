import React from 'react';

interface BendingMomentConventionDrawingProps {
  variant?: 'sagging' | 'hogging';
  isBent?: boolean;
}

export const BendingMomentConventionDrawing: React.FC<BendingMomentConventionDrawingProps> = ({
  variant = 'sagging',
  isBent = false,
}) => {
  const isSagging = variant === 'sagging';
  const colorClass = isSagging ? 'text-emerald-500' : 'text-rose-500';

  // Morph path data based on straight vs. bent states
  // Flat beam represents y=30 coordinate
  // Sagging bends down to y=42 in middle
  // Hogging bends up to y=18 in middle
  const beamPath = isBent
    ? isSagging
      ? 'M 10 20 Q 50 42 90 20'
      : 'M 10 40 Q 50 18 90 40'
    : 'M 10 30 Q 50 30 90 30';

  const dashedPath = isBent
    ? isSagging
      ? 'M 5 30 Q 50 52 95 30'
      : 'M 5 30 Q 50 8 95 30'
    : 'M 5 40 Q 50 40 95 40';

  return (
    <div className="w-full flex justify-center py-4 select-none">
      <svg className={`w-40 h-24 overflow-visible ${colorClass}`} viewBox="0 0 100 60">
        {/* Main beam curve morph path */}
        <path
          d={beamPath}
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
          className="transition-all duration-700 ease-in-out"
        />

        {/* Lower/Upper reference line morph path */}
        <path
          d={dashedPath}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="3 3"
          className="transition-all duration-700 ease-in-out"
        />

        {/* Moment rotational indicators (fade in when bent) */}
        {isSagging ? (
          <g className={`transition-opacity duration-700 ${isBent ? 'opacity-100' : 'opacity-0'}`}>
            <path
              d="M 2 15 Q -7 24 2 33"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Left arrowhead pointing right/clockwise */}
            <path
              d="M -3 15 L 2 15 L 2 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M 98 15 Q 107 24 98 33"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Right arrowhead pointing left/counter-clockwise */}
            <path
              d="M 103 15 L 98 15 L 98 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <text x="50" y="58" textAnchor="middle" className="text-[11px] font-bold font-mono fill-emerald-600 dark:fill-emerald-400">
              Compression (Top)
            </text>
          </g>
        ) : (
          <g className={`transition-opacity duration-700 ${isBent ? 'opacity-100' : 'opacity-0'}`}>
            <path
              d="M 2 43 Q -7 34 2 25"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Left arrowhead pointing right/counter-clockwise */}
            <path
              d="M -3 43 L 2 43 L 2 38"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M 98 43 Q 107 34 98 25"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Right arrowhead pointing left/clockwise */}
            <path
              d="M 103 43 L 98 43 L 98 38"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <text x="50" y="58" textAnchor="middle" className="text-[11px] font-bold font-mono fill-rose-600 dark:fill-rose-400">
              Tension (Top)
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};
