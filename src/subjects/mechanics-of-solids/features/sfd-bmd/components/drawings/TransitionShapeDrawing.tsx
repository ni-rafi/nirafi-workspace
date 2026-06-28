import React from 'react';

export interface ITransitionShapeDrawingProps {
  type: 'concave-down-quadratic' | 'concave-up-quadratic' | 'concave-down-cubic' | 'concave-up-cubic';
  label: string;
}

export const TransitionShapeDrawing: React.FC<ITransitionShapeDrawingProps> = ({ type, label }) => {
  return (
    <svg className="w-[220px] h-[105px] overflow-visible" viewBox="0 0 100 70">
      <rect x="0" y="0" width="100" height="55" rx="6" className="fill-card stroke-border" strokeWidth="1" />
      <line x1="10" y1="45" x2="90" y2="45" className="stroke-muted-foreground/30" strokeWidth="1" strokeDasharray="2 2" />
      
      {type === 'concave-down-quadratic' && (
        <>
          <path d="M 15 45 Q 50 10 85 45 Z" className="fill-indigo-500/10 stroke-none" />
          <path d="M 15 45 Q 50 10 85 45" className="fill-none stroke-indigo-500" strokeWidth="2" />
        </>
      )}

      {type === 'concave-up-quadratic' && (
        <>
          <path d="M 15 45 Q 50 45 85 10 L 85 45 Z" className="fill-orange-500/10 stroke-none" />
          <path d="M 15 45 Q 50 45 85 10" className="fill-none stroke-orange-500" strokeWidth="2" />
        </>
      )}

      {type === 'concave-down-cubic' && (
        <>
          <path d="M 15 45 C 35 43 55 10 85 10 L 85 45 Z" className="fill-indigo-500/10 stroke-none" />
          <path d="M 15 45 C 35 43 55 10 85 10" className="fill-none stroke-indigo-500" strokeWidth="2" />
        </>
      )}

      {type === 'concave-up-cubic' && (
        <>
          <path d="M 15 45 C 45 45 65 35 85 10 L 85 45 Z" className="fill-orange-500/10 stroke-none" />
          <path d="M 15 45 C 45 45 65 35 85 10" className="fill-none stroke-orange-500" strokeWidth="2" />
        </>
      )}

      <text x="50" y="66" textAnchor="middle" className="text-[10px] font-bold fill-foreground">{label}</text>
    </svg>
  );
};
