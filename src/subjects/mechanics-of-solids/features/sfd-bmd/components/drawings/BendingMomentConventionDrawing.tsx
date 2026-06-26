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
              d="M 12 15 Q 3 24 12 33"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M 88 15 Q 97 24 88 33"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <text x="50" y="58" textAnchor="middle" className="text-[11px] font-bold font-mono fill-emerald-600 dark:fill-emerald-400">
              Compression (Top)
            </text>
          </g>
        ) : (
          <g className={`transition-opacity duration-700 ${isBent ? 'opacity-100' : 'opacity-0'}`}>
            <path
              d="M 12 43 Q 3 34 12 25"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M 88 43 Q 97 34 88 25"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
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
