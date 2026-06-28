import React from 'react';
import { LatexFormula } from '@/features/presentation/components/elements';

export interface ISfdBmdRelationsDrawingProps {
  type: 'load-to-shear-int' | 'shear-to-moment-int' | 'load-to-moment-dbl-int' | 'moment-to-shear-diff' | 'shear-to-load-diff' | 'moment-to-load-dbl-diff';
}

export const SfdBmdRelationsDrawing: React.FC<ISfdBmdRelationsDrawingProps> = ({ type }) => {
  if (type === 'load-to-shear-int') {
    return (
      <svg className="w-full max-w-[340px] h-[160px] overflow-visible" viewBox="0 0 240 120">
        <defs>
          <marker id="arrow-emerald" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#10b981" />
          </marker>
        </defs>
        <line x1="20" y1="85" x2="220" y2="85" className="stroke-muted-foreground/30" strokeWidth="1" />
        {/* Load block */}
        <rect x="50" y="15" width="140" height="22" rx="4" className="fill-red-500/10 stroke-red-500" strokeWidth="1.5" />
        <foreignObject x="50" y="18" width="140" height="20">
          <div className="text-center font-mono font-bold text-[10px] text-rose-500 leading-none">
            <LatexFormula math="w(x) \text{ (UDL)}" />
          </div>
        </foreignObject>
        {/* Integration arrow */}
        <path d="M 120 43 L 120 62" fill="none" className="stroke-emerald-500" strokeWidth="2.5" strokeDasharray="3,3" markerEnd="url(#arrow-emerald)" />
        {/* Shear line */}
        <line x1="50" y1="85" x2="190" y2="105" className="stroke-emerald-500 stroke-[2.5]" strokeLinecap="round" />
        <foreignObject x="50" y="107" width="140" height="15">
          <div className="text-center font-mono font-bold text-[10px] text-emerald-600 dark:text-emerald-400 leading-none">
            <LatexFormula math="V_B - V_A = -\int_A^B w \, dx" />
          </div>
        </foreignObject>
      </svg>
    );
  }

  if (type === 'shear-to-moment-int') {
    return (
      <svg className="w-full max-w-[340px] h-[160px] overflow-visible" viewBox="0 0 240 120">
        <defs>
          <marker id="arrow-blue" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#3b82f6" />
          </marker>
        </defs>
        <line x1="20" y1="50" x2="220" y2="50" className="stroke-muted-foreground/30" strokeWidth="1" />
        {/* Shear line */}
        <line x1="50" y1="20" x2="190" y2="50" className="stroke-emerald-500 stroke-2" strokeLinecap="round" />
        <foreignObject x="50" y="8" width="140" height="15">
          <div className="text-center font-mono font-bold text-[10px] text-emerald-600 dark:text-emerald-400 leading-none">
            <LatexFormula math="V(x) \text{ (Shear)}" />
          </div>
        </foreignObject>
        {/* Integration arrow */}
        <path d="M 120 56 L 120 71" fill="none" className="stroke-blue-500" strokeWidth="2.5" strokeDasharray="3,3" markerEnd="url(#arrow-blue)" />
        {/* Moment curve */}
        <path d="M 50 95 Q 120 70 190 95" fill="none" className="stroke-blue-500 stroke-[2.5]" strokeLinecap="round" />
        <foreignObject x="50" y="103" width="140" height="15">
          <div className="text-center font-mono font-bold text-[10px] text-blue-600 dark:text-blue-400 leading-none">
            <LatexFormula math="M_B - M_A = \int_A^B V \, dx" />
          </div>
        </foreignObject>
      </svg>
    );
  }

  if (type === 'load-to-moment-dbl-int') {
    return (
      <svg className="w-full max-w-[340px] h-[140px] overflow-visible" viewBox="0 0 240 115">
        <defs>
          <marker id="arrow-violet" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#8b5cf6" />
          </marker>
        </defs>
        <line x1="20" y1="85" x2="220" y2="85" className="stroke-muted-foreground/30" strokeWidth="1" />
        {/* Load block */}
        <rect x="30" y="45" width="55" height="20" rx="4" className="fill-red-500/10 stroke-red-500" strokeWidth="1.5" />
        <foreignObject x="30" y="48" width="55" height="15">
          <div className="text-center font-mono font-bold text-[9px] text-rose-500 leading-none">
            <LatexFormula math="w(x)" />
          </div>
        </foreignObject>
        {/* Integration arrow */}
        <path d="M 95 55 Q 120 40 141 52.6" fill="none" className="stroke-violet-500" strokeWidth="2.5" strokeDasharray="3,3" markerEnd="url(#arrow-violet)" />
        {/* Moment curve */}
        <path d="M 155 75 Q 185 45 215 75" fill="none" className="stroke-blue-500 stroke-[2.5]" strokeLinecap="round" />
        <foreignObject x="155" y="87" width="60" height="15">
          <div className="text-center font-mono font-bold text-[9.5px] text-blue-600 dark:text-blue-400 leading-none">
            <LatexFormula math="M(x)" />
          </div>
        </foreignObject>
        {/* Centered Equation at Top */}
        <foreignObject x="20" y="5" width="200" height="22">
          <div className="text-center font-bold text-[11px] text-violet-500 leading-none">
            <LatexFormula math="\Delta M = -\iint w \, dx^2" />
          </div>
        </foreignObject>
      </svg>
    );
  }

  if (type === 'moment-to-shear-diff') {
    return (
      <svg className="w-full max-w-[340px] h-[160px] overflow-visible" viewBox="0 0 240 120">
        <defs>
          <marker id="arrow-indigo" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#6366f1" />
          </marker>
        </defs>
        <line x1="20" y1="85" x2="220" y2="85" className="stroke-muted-foreground/30" strokeWidth="1" />
        {/* Moment curve */}
        <path d="M 30 75 Q 80 20 130 75" fill="none" className="stroke-blue-500/30 stroke-1.5" />
        {/* Tangent line */}
        <line x1="35" y1="60" x2="95" y2="40" className="stroke-indigo-500 stroke-2" />
        <circle cx="65" cy="50" r="3.5" className="fill-indigo-500 stroke-indigo-650" strokeWidth="1" />
        <foreignObject x="40" y="8" width="80" height="20">
          <div className="text-center font-mono font-bold text-[9px] text-indigo-500 leading-none">
            <LatexFormula math="\text{Slope } \frac{dM}{dx}" />
          </div>
        </foreignObject>
        {/* Differentiation arrow */}
        <path d="M 125 45 L 152 45" fill="none" className="stroke-indigo-500" strokeWidth="2.5" strokeDasharray="3,3" markerEnd="url(#arrow-indigo)" />
        {/* Shear line segment */}
        <line x1="185" y1="85" x2="185" y2="35" className="stroke-emerald-500 stroke-[2.5]" strokeLinecap="round" />
        <foreignObject x="155" y="93" width="60" height="15">
          <div className="text-center font-mono font-bold text-[10px] text-emerald-600 dark:text-emerald-400 leading-none">
            <LatexFormula math="V(x)" />
          </div>
        </foreignObject>
      </svg>
    );
  }

  if (type === 'shear-to-load-diff') {
    return (
      <svg className="w-full max-w-[340px] h-[160px] overflow-visible" viewBox="0 0 240 120">
        <defs>
          <marker id="arrow-rose" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#f43f5e" />
          </marker>
        </defs>
        <line x1="20" y1="85" x2="220" y2="85" className="stroke-muted-foreground/30" strokeWidth="1" />
        {/* Shear line */}
        <line x1="30" y1="35" x2="120" y2="75" className="stroke-emerald-500/30 stroke-1.5" />
        {/* Tangent line */}
        <line x1="50" y1="44" x2="100" y2="66" className="stroke-red-500 stroke-2" />
        <foreignObject x="50" y="24" width="50" height="18">
          <div className="text-center font-mono font-bold text-[9.5px] text-red-500 leading-none">
            <LatexFormula math="\frac{dV}{dx}" />
          </div>
        </foreignObject>
        {/* Differentiation arrow */}
        <path d="M 125 50 L 152 50" fill="none" className="stroke-red-500" strokeWidth="2.5" strokeDasharray="3,3" markerEnd="url(#arrow-rose)" />
        {/* Load box */}
        <rect x="170" y="38" width="40" height="24" rx="4" className="fill-red-500/10 stroke-red-500" strokeWidth="1.5" />
        <foreignObject x="170" y="41" width="40" height="18">
          <div className="text-center font-mono font-bold text-[9px] text-rose-500 leading-none">
            <LatexFormula math="w(x)" />
          </div>
        </foreignObject>
        <foreignObject x="135" y="93" width="90" height="15">
          <div className="text-center font-mono font-bold text-[10px] text-rose-600 dark:text-rose-455 leading-none">
            <LatexFormula math="w(x) = -\frac{dV}{dx}" />
          </div>
        </foreignObject>
      </svg>
    );
  }

  if (type === 'moment-to-load-dbl-diff') {
    return (
      <svg className="w-full max-w-[340px] h-[140px] overflow-visible" viewBox="0 0 240 115">
        <defs>
          <marker id="arrow-violet" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#8b5cf6" />
          </marker>
        </defs>
        <line x1="20" y1="85" x2="220" y2="85" className="stroke-muted-foreground/30" strokeWidth="1" />
        {/* Moment curve */}
        <path d="M 30 75 Q 60 45 90 75" fill="none" className="stroke-blue-500 stroke-[2.5]" strokeLinecap="round" />
        <foreignObject x="30" y="87" width="60" height="15">
          <div className="text-center font-mono font-bold text-[9.5px] text-blue-600 dark:text-blue-400 leading-none">
            <LatexFormula math="M(x)" />
          </div>
        </foreignObject>
        {/* Differentiation arrow */}
        <path d="M 95 55 Q 120 40 141 52.6" fill="none" className="stroke-violet-500" strokeWidth="2.5" strokeDasharray="3,3" markerEnd="url(#arrow-violet)" />
        {/* Load box */}
        <rect x="155" y="45" width="55" height="20" rx="4" className="fill-red-500/10 stroke-red-500" strokeWidth="1.5" />
        <foreignObject x="155" y="48" width="55" height="15">
          <div className="text-center font-mono font-bold text-[9px] text-rose-500 leading-none">
            <LatexFormula math="w(x)" />
          </div>
        </foreignObject>
        {/* Centered Equation at Top */}
        <foreignObject x="20" y="5" width="200" height="22">
          <div className="text-center font-bold text-[11px] text-violet-500 leading-none">
            <LatexFormula math="w(x) = -\frac{d^2M}{dx^2}" />
          </div>
        </foreignObject>
      </svg>
    );
  }

  return null;
};
