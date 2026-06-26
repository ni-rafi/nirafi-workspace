import React from 'react';

interface VirtualCutDrawingProps {
  reactionForceValue?: string | number;
  shearForceLabel?: string;
  bendingMomentLabel?: string;
  distanceLabel?: string;
}

export const VirtualCutDrawing: React.FC<VirtualCutDrawingProps> = ({
  reactionForceValue = 'R_A = 10 kN',
  shearForceLabel = 'V(x)',
  bendingMomentLabel = 'M(x)',
  distanceLabel = 'Distance x',
}) => {
  return (
    <div className="w-full flex justify-center py-4 select-none">
      <svg className="w-full max-w-[300px] h-32 overflow-visible" viewBox="0 0 300 120">
        {/* isolated cut block */}
        <rect
          x="15"
          y="40"
          width="130"
          height="40"
          className="fill-slate-100 dark:fill-slate-800 stroke-slate-400 dark:stroke-slate-600"
          strokeWidth="2"
          rx="3"
        />
        <line x1="145" y1="40" x2="145" y2="80" className="stroke-rose-500" strokeWidth="1.5" strokeDasharray="3 3" />
        <text x="145" y="32" textAnchor="middle" className="text-[11px] font-bold font-mono fill-rose-400">
          Virtual Slice at x
        </text>

        {/* Point load reaction */}
        <g className="text-indigo-400">
          <path d="M15 72 L15 48 M15 48 L12 52 M15 48 L18 52" fill="none" stroke="currentColor" strokeWidth="2" />
        </g>
        <text x="8" y="92" className="text-[11px] font-mono fill-slate-600 dark:fill-slate-300">
          {reactionForceValue}
        </text>

        {/* Internal shear arrow on cut face pointing down */}
        <g className="text-rose-400">
          <path d="M145 44 L145 76 M145 76 L141 70 M145 76 L149 70" fill="none" stroke="currentColor" strokeWidth="2.5" />
        </g>
        <text x="154" y="68" className="text-[11px] font-bold font-mono fill-rose-400">
          {shearForceLabel}
        </text>

        {/* Internal moment arrow counter-clockwise around cut centroid */}
        <path d="M 142 46 Q 160 52 142 66" fill="none" className="stroke-indigo-400" strokeWidth="2.5" />
        <path d="M 142 66 l 4 -4 M 142 66 l -1 -5" fill="none" className="stroke-indigo-400" strokeWidth="2" />
        <text x="154" y="50" className="text-[11px] font-bold font-mono fill-indigo-400">
          {bendingMomentLabel}
        </text>

        {/* dimension arrow x */}
        <g className="stroke-slate-400 dark:stroke-slate-600" strokeWidth="1">
          <line x1="15" y1="110" x2="145" y2="110" />
          <line x1="15" y1="106" x2="15" y2="114" />
          <line x1="145" y1="106" x2="145" y2="114" />
        </g>
        <text x="80" y="104" textAnchor="middle" className="text-[11px] font-mono fill-slate-500 dark:fill-slate-400">
          {distanceLabel}
        </text>
      </svg>
    </div>
  );
};
