import React from 'react';

export const DiagramCoincidenceDrawing: React.FC = () => {
  return (
    <div className="w-full flex justify-center py-4 select-none">
      <svg className="w-full max-w-[300px] h-32 overflow-visible" viewBox="0 0 300 120">
        {/* Shear Force Diagram passing zero */}
        <line x1="20" y1="30" x2="260" y2="30" className="stroke-slate-400 dark:stroke-slate-600" strokeWidth="1" />
        <path d="M 20 10 L 140 30 L 260 50" fill="none" className="stroke-rose-400" strokeWidth="2.5" />
        <circle cx="140" cy="30" r="4.5" className="fill-rose-500 animate-pulse" />
        <text x="148" y="24" className="text-[11px] font-bold font-mono fill-rose-400">V = 0</text>
        <text x="26" y="20" className="text-[11px] font-mono fill-slate-500 dark:fill-slate-400 uppercase">Shear (V)</text>

        {/* Connector line */}
        <line x1="140" y1="30" x2="140" y2="90" className="stroke-indigo-400/40" strokeWidth="1" strokeDasharray="3 3" />

        {/* Bending Moment Diagram peaking at Zero Shear */}
        <line x1="20" y1="100" x2="260" y2="100" className="stroke-slate-400 dark:stroke-slate-600" strokeWidth="1" />
        <path d="M 20 100 Q 140 70 260 100" fill="none" className="stroke-indigo-400" strokeWidth="2.5" />
        <circle cx="140" cy="70" r="4.5" className="fill-indigo-500 animate-pulse" />
        <text x="148" y="78" className="text-[11px] font-bold font-mono fill-indigo-400">M_max (Slope = 0)</text>
        <text x="26" y="112" className="text-[11px] font-mono fill-slate-500 dark:fill-slate-400 uppercase">Moment (M)</text>
      </svg>
    </div>
  );
};
