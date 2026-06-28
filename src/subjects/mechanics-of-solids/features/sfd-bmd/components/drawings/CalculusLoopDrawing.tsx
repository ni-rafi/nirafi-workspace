import React from 'react';
import { LatexFormula } from '@/features/presentation/components/elements';

export interface ICalculusLoopDrawingProps {
  tabIndex: number;
  currentClick: number;
  isScrollOrBlog: boolean;
}

export const CalculusLoopDrawing: React.FC<ICalculusLoopDrawingProps> = ({
  tabIndex,
  currentClick,
  isScrollOrBlog,
}) => {
  // Determine highlights based on currentClick step
  const showInt1 = tabIndex === 1 && (isScrollOrBlog || currentClick >= 1);
  const showInt2 = tabIndex === 1 && (isScrollOrBlog || currentClick >= 2);
  const showDiff1 = tabIndex === 2 && (isScrollOrBlog || currentClick >= 3);
  const showDiff2 = tabIndex === 2 && (isScrollOrBlog || currentClick >= 4);
  const showDblInt = tabIndex === 3 && (isScrollOrBlog || currentClick >= 5);
  const showDblDiff = tabIndex === 3 && (isScrollOrBlog || currentClick >= 6);

  // Boxes coloring logic
  const colorW = tabIndex === 0 || (tabIndex === 1) || (tabIndex === 2 && showDiff2) || (tabIndex === 3 && showDblInt);
  const colorV = (tabIndex === 1 && showInt1) || (tabIndex === 2 && showDiff1);
  const colorM = (tabIndex === 1 && showInt2) || (tabIndex === 2) || (tabIndex === 3 && showDblDiff);

  return (
    <svg className="w-full aspect-[2/1] max-h-[145px] overflow-visible" viewBox="0 0 300 150">
      <defs>
        <marker id="arrow-emerald" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#10b981" />
        </marker>
        <marker id="arrow-blue" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#3b82f6" />
        </marker>
        <marker id="arrow-violet" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#8b5cf6" />
        </marker>
        <marker id="arrow-rose" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#f43f5e" />
        </marker>
        <marker id="arrow-grey" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" className="fill-slate-350 dark:fill-slate-750" />
        </marker>
      </defs>

      {/* 1. LOAD BOX - w(x) */}
      <rect x="5" y="25" width="70" height="24" rx="4" className={`transition-colors duration-300 stroke-[1.5] ${colorW ? 'fill-red-500/10 stroke-red-500' : 'fill-slate-500/5 stroke-slate-400/50'}`} />
      <foreignObject x="5" y="27" width="70" height="20">
        <div className="text-center font-mono font-bold text-[9.5px] text-foreground leading-normal flex items-center justify-center h-full">
          <LatexFormula math="w(x)" />
        </div>
      </foreignObject>
      <text x="40" y="59" textAnchor="middle" className="text-[7px] font-bold fill-muted-foreground/85 font-mono">Distributed Load</text>

      {/* 2. SHEAR BOX - V(x) */}
      <rect x="115" y="105" width="70" height="24" rx="4" className={`transition-colors duration-300 stroke-[1.5] ${colorV ? 'fill-emerald-500/10 stroke-emerald-500' : 'fill-slate-500/5 stroke-slate-400/50'}`} />
      <foreignObject x="115" y="107" width="70" height="20">
        <div className="text-center font-mono font-bold text-[9.5px] text-foreground leading-normal flex items-center justify-center h-full">
          <LatexFormula math="V(x)" />
        </div>
      </foreignObject>
      <text x="150" y="139" textAnchor="middle" className="text-[7px] font-bold fill-muted-foreground/85 font-mono">Shear Force</text>

      {/* 3. MOMENT BOX - M(x) */}
      <rect x="225" y="25" width="70" height="24" rx="4" className={`transition-colors duration-300 stroke-[1.5] ${colorM ? 'fill-blue-500/10 stroke-blue-500' : 'fill-slate-500/5 stroke-slate-400/50'}`} />
      <foreignObject x="225" y="27" width="70" height="20">
        <div className="text-center font-mono font-bold text-[9.5px] text-foreground leading-normal flex items-center justify-center h-full">
          <LatexFormula math="M(x)" />
        </div>
      </foreignObject>
      <text x="260" y="59" textAnchor="middle" className="text-[7px] font-bold fill-muted-foreground/85 font-mono">Bending Moment</text>

      {/* --- CONNECTING ARROWS --- */}

      {/* Load to Shear (Integration - Outer Left) */}
      {(tabIndex === 0 || tabIndex === 1) && (
        <>
          <path d="M 38 60 Q 60 92 108 108" fill="none" strokeWidth="2.2" className={`transition-colors duration-300 ${showInt1 ? 'stroke-emerald-500' : 'stroke-slate-300/40 dark:stroke-slate-800/40'}`} markerEnd={`url(#${showInt1 ? 'arrow-emerald' : 'arrow-grey'})`} />
          <foreignObject x="20" y="86" width="40" height="20">
            <div className={`text-[8.5px] font-bold text-center leading-none ${showInt1 ? 'text-emerald-500 font-extrabold' : 'text-muted-foreground/40'}`}>
              <LatexFormula math="-\int dx" />
            </div>
          </foreignObject>
        </>
      )}

      {/* Shear to Moment (Integration - Outer Right) */}
      {(tabIndex === 0 || tabIndex === 1) && (
        <>
          <path d="M 192 108 Q 240 92 262 60" fill="none" strokeWidth="2.2" className={`transition-colors duration-300 ${showInt2 ? 'stroke-blue-500' : 'stroke-slate-300/40 dark:stroke-slate-800/40'}`} markerEnd={`url(#${showInt2 ? 'arrow-blue' : 'arrow-grey'})`} />
          <foreignObject x="240" y="86" width="40" height="20">
            <div className={`text-[8.5px] font-bold text-center leading-none ${showInt2 ? 'text-blue-500 font-extrabold' : 'text-muted-foreground/40'}`}>
              <LatexFormula math="\int dx" />
            </div>
          </foreignObject>
        </>
      )}

      {/* Load to Moment (Double Integration - Top Straight Arrow) */}
      {(tabIndex === 0 || tabIndex === 3) && (
        <>
          <path d="M 80 31 L 220 31" fill="none" strokeWidth="2.2" className={`transition-colors duration-300 ${showDblInt ? 'stroke-violet-500' : 'stroke-slate-300/40 dark:stroke-slate-800/40'}`} markerEnd={`url(#${showDblInt ? 'arrow-violet' : 'arrow-grey'})`} />
          <foreignObject x="130" y="16" width="40" height="15">
            <div className={`text-[8px] font-bold text-center leading-none ${showDblInt ? 'text-violet-500 font-extrabold' : 'text-muted-foreground/40'}`}>
              <LatexFormula math="-\iint dx^2" />
            </div>
          </foreignObject>
        </>
      )}

      {/* Moment to Shear (Differentiation - Inner Right) */}
      {(tabIndex === 0 || tabIndex === 2) && (
        <>
          <path d="M 252 60 Q 230 88 192 106" fill="none" strokeWidth="1.6" className={`transition-colors duration-300 ${showDiff1 ? 'stroke-emerald-600' : 'stroke-slate-300/30 dark:stroke-slate-800/30'}`} strokeDasharray="3,2" markerEnd={`url(#${showDiff1 ? 'arrow-emerald' : 'arrow-grey'})`} />
          <foreignObject x="190" y="84" width="30" height="15">
            <div className={`text-[8px] font-mono text-center leading-none ${showDiff1 ? 'text-emerald-600 font-bold' : 'text-muted-foreground/35'}`}>
              <LatexFormula math="d/dx" />
            </div>
          </foreignObject>
        </>
      )}

      {/* Shear to Load (Differentiation - Inner Left) */}
      {(tabIndex === 0 || tabIndex === 2) && (
        <>
          <path d="M 108 106 Q 70 88 48 60" fill="none" strokeWidth="1.6" className={`transition-colors duration-300 ${showDiff2 ? 'stroke-rose-500' : 'stroke-slate-300/30 dark:stroke-slate-800/30'}`} strokeDasharray="3,2" markerEnd={`url(#${showDiff2 ? 'arrow-rose' : 'arrow-grey'})`} />
          <foreignObject x="80" y="84" width="30" height="15">
            <div className={`text-[8px] font-mono text-center leading-none ${showDiff2 ? 'text-rose-500 font-bold' : 'text-muted-foreground/35'}`}>
              <LatexFormula math="-d/dx" />
            </div>
          </foreignObject>
        </>
      )}

      {/* Moment to Load (Double Differentiation - Bottom Straight Arrow) */}
      {(tabIndex === 0 || tabIndex === 3) && (
        <>
          <path d="M 220 43 L 80 43" fill="none" strokeWidth="1.6" className={`transition-colors duration-300 ${showDblDiff ? 'stroke-rose-600' : 'stroke-slate-300/30 dark:stroke-slate-800/30'}`} strokeDasharray="3,2" markerEnd={`url(#${showDblDiff ? 'arrow-rose' : 'arrow-grey'})`} />
          <foreignObject x="125" y="47" width="50" height="15">
            <div className={`text-[8px] font-mono text-center leading-none ${showDblDiff ? 'text-rose-600 font-bold' : 'text-muted-foreground/45'}`}>
              <LatexFormula math="-d^2/dx^2" />
            </div>
          </foreignObject>
        </>
      )}
    </svg>
  );
};
