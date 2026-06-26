import React from 'react';

interface ShearConventionDrawingProps {
  activeStep?: number; // 0: straight, 1: left segment active, 2: right segment active
  activeSegment?: 'left' | 'right';
  onSegmentClick?: (segment: 'left' | 'right') => void;
}

export const ShearConventionDrawing: React.FC<ShearConventionDrawingProps> = ({
  activeStep = 0,
  activeSegment = 'left',
  onSegmentClick,
}) => {
  const isCut = activeStep > 0;
  const showLeftArrow = activeStep === 1;
  const showRightArrow = activeStep === 2;

  // CSS transforms for sliding shear deformation
  const leftTransform = isCut ? 'translate-y-[-10px]' : 'translate-y-0';
  const rightTransform = isCut ? 'translate-y-[10px]' : 'translate-y-0';

  return (
    <div className="w-full flex justify-center py-4 select-none">
      <svg className="w-full max-w-[320px] h-36 overflow-visible" viewBox="0 0 320 120">
        {/* Cut plane dashed line (only visible when cut) */}
        <line
          x1="160"
          y1="10"
          x2="160"
          y2="90"
          className={`stroke-rose-500/80 transition-opacity duration-500 ${isCut ? 'opacity-100' : 'opacity-0'}`}
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        {isCut && (
          <text
            x="160"
            y="6"
            textAnchor="middle"
            className="text-[10px] font-bold font-mono fill-rose-400 animate-pulse"
          >
            Cut Section
          </text>
        )}

        {/* Left Segment */}
        <g
          onClick={() => onSegmentClick?.('left')}
          className={`cursor-pointer transition-all duration-500 ${leftTransform} ${
            !isCut || activeSegment === 'left' ? 'opacity-100' : 'opacity-50'
          }`}
        >
          {/* Main beam segment */}
          <rect
            x="30"
            y="35"
            width="130"
            height="30"
            className="fill-slate-100 dark:fill-slate-800 stroke-slate-400 dark:stroke-slate-600 transition-colors duration-500"
            strokeWidth="2"
            rx="2"
          />
          {/* Reaction or support indicators (illustrative) */}
          <path d="M 45 65 L 38 75 L 52 75 Z" className="fill-slate-500" />
          <text
            x="95"
            y="54"
            textAnchor="middle"
            className="text-[11px] font-bold font-mono fill-slate-700 dark:fill-slate-300"
          >
            Left Segment
          </text>

          {/* Shear force pointing down on right cut face */}
          <g className={`transition-opacity duration-500 ${showLeftArrow ? 'opacity-100' : 'opacity-0'}`}>
            <path
              d="M165 30 L165 70 M165 70 L161 64 M165 70 L169 64"
              fill="none"
              className="stroke-emerald-500"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <text x="172" y="54" className="text-[11px] fill-emerald-500 font-bold font-mono">
              +V (Down)
            </text>
          </g>
        </g>

        {/* Right Segment */}
        <g
          onClick={() => onSegmentClick?.('right')}
          className={`cursor-pointer transition-all duration-500 ${rightTransform} ${
            !isCut || activeSegment === 'right' ? 'opacity-100' : 'opacity-50'
          }`}
        >
          {/* Main beam segment */}
          <rect
            x="160"
            y="35"
            width="130"
            height="30"
            className="fill-slate-100 dark:fill-slate-800 stroke-slate-400 dark:stroke-slate-600 transition-colors duration-500"
            strokeWidth="2"
            rx="2"
          />
          <path d="M 275 65 L 268 75 L 282 75 Z" className="fill-slate-500" />
          <circle cx="275" cy="77" r="1.5" className="fill-slate-500" />
          <text
            x="225"
            y="54"
            textAnchor="middle"
            className="text-[11px] font-bold font-mono fill-slate-700 dark:fill-slate-300"
          >
            Right Segment
          </text>

          {/* Shear force pointing up on left cut face */}
          <g className={`transition-opacity duration-500 ${showRightArrow ? 'opacity-100' : 'opacity-0'}`}>
            <path
              d="M155 70 L155 30 M155 30 L151 36 M155 30 L159 36"
              fill="none"
              className="stroke-emerald-500"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <text x="110" y="54" className="text-[11px] fill-emerald-500 font-bold font-mono">
              +V (Up)
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
};
