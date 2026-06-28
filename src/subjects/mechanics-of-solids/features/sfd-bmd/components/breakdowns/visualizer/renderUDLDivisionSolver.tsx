import React from 'react';
import { ClickReveal, LatexFormula, DimensionLine } from '@/features/presentation/components/elements';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { useClickStepsContext } from '@/features/presentation/context/ClickStepsContext';

interface UDLDivisionSolverViewProps {
  v1: number;
  w: number;
  startX: number;
  x0: number;
  totalX: number;
}

const UDLDivisionSolverView: React.FC<UDLDivisionSolverViewProps> = ({
  v1,
  w,
  startX,
  x0,
  totalX,
}) => {
  const clickContext = useClickStepsContext();
  const clickIdx = clickContext?.currentClick ?? 0;

  return (
    <TwoColumnLayout
      title="Solving Zero-Crossing: Method 3 (UDL Division)"
      leftWidth="55%"
      leftContent={
        <div className="flex h-full w-full items-center justify-center p-6 select-none font-sans">
          <svg className="w-full max-w-2xl h-[280px] overflow-visible" viewBox="0 0 340 170">
            {/* Top segment: Beam body */}
            <rect x={60} y={35} width={220} height={8} className="fill-slate-200 dark:fill-slate-800 stroke-slate-400 dark:stroke-slate-650" strokeWidth={1} rx={1.5} />
            {/* UDL loads container */}
            <rect x={60} y={15} width={220} height={20} className="fill-amber-500/10 stroke-amber-500/20" strokeWidth={0.8} />
            {/* UDL arrows */}
            {Array.from({ length: 9 }).map((_, i) => {
              const arrowX = 60 + i * 27.5;
              return (
                <path key={i} d={`M ${arrowX},15 L ${arrowX},35 M ${arrowX-2.5},30 L ${arrowX},35 L ${arrowX+2.5},30`} fill="none" className="stroke-amber-500/60" strokeWidth="0.8" />
              );
            })}
            <text x={170} y={10} textAnchor="middle" className="text-[8.5px] font-bold fill-amber-600 dark:fill-amber-400">w = {w.toFixed(1)} kN/m</text>

            {/* Bottom segment: SFD baseline */}
            <line x1={40} y1={110} x2={300} y2={110} className="stroke-slate-400/40 dark:stroke-slate-600" strokeWidth={1.2} />
            {/* Shear line */}
            <line x1={60} y1={70} x2={280} y2={125} className="stroke-rose-500" strokeWidth={1.8} />
            
            {/* Shaded positive triangle */}
            <polygon points="60,70 211,110 60,110" className="fill-emerald-500/10 stroke-emerald-500/20" strokeWidth={0.5} />

            {/* Vertical projection lines */}
            <line x1={60} y1={35} x2={60} y2={110} className="stroke-slate-300 dark:stroke-slate-700/50" strokeWidth={1} strokeDasharray="3 3" />
            <line x1={211} y1={35} x2={211} y2={110} className="stroke-slate-300 dark:stroke-slate-700/50" strokeWidth={1} strokeDasharray="3 3" />

            {/* Vstart height label */}
            <text x={52} y={74} textAnchor="end" className="text-[10px] font-black fill-emerald-600 dark:fill-emerald-400 font-sans">
              V = {v1.toFixed(3)} kN
            </text>

            {/* Zero crossing label */}
            <text x={211} y={103} textAnchor="middle" className="text-[9px] font-black fill-rose-500 font-sans">
              V = 0
            </text>

            {/* Dimension line showing x0 = Vstart / w */}
            <g className={`transition-all duration-500 ${clickIdx >= 1 ? 'opacity-100' : 'opacity-0'}`}>
              <DimensionLine x1={60} y1={135} x2={211} y2={135} label={`x0 = ${x0.toFixed(3)}m`} color="#6366f1" className="text-[9px]" />
            </g>

            {/* Dimension line showing startX (offset to start of UDL) */}
            <g className={`transition-all duration-500 ${clickIdx >= 2 ? 'opacity-100' : 'opacity-0'}`}>
              <DimensionLine x1={15} y1={135} x2={60} y2={135} label={`${startX.toFixed(1)}m`} color="#94a3b8" className="text-[9px] opacity-75" />
            </g>
          </svg>
        </div>
      }
      rightContent={
        <div className="flex flex-col gap-2.5 justify-center h-full text-left font-sans font-medium">
          <div className="space-y-1 animate-in fade-in">
            <span className="text-[9px] font-black text-indigo-500 uppercase tracking-widest block font-mono">Method 3: UDL Division</span>
            <h4 className="text-sm font-extrabold text-foreground font-sans">Height/Slope Shortcut Ratio</h4>
          </div>

          <div className="text-[11px] text-muted-foreground bg-muted/15 border border-border/30 rounded-xl p-2.5 space-y-2 select-text font-sans animate-in fade-in">
            <div>
              <span className="font-bold text-foreground block mb-0.5">1. Formulate Slope Relationship:</span>
              The slope of the shear line is <LatexFormula math="-w" />. The distance from the start of the UDL to the zero-crossing is:
              <div className="mt-1 text-indigo-500 font-semibold font-mono">
                <LatexFormula math="x_0 = \frac{V_{\text{start}}}{w}" />
              </div>
            </div>
            <ClickReveal at={1}>
              <div className="border-t border-border/25 pt-2">
                <span className="font-bold text-foreground block mb-0.5">2. Divide Height by Load Intensity:</span>
                <LatexFormula math={`x_0 = \\frac{${v1.toFixed(3)}\\text{ kN}}{${w.toFixed(1)}\\text{ kN/m}} = ${x0.toFixed(3)}\\text{ m}`} />
              </div>
            </ClickReveal>
            <ClickReveal at={2}>
              <div className="border-t border-border/25 pt-2">
                <span className="font-bold text-foreground block mb-0.5">3. Calculate Total Position:</span>
                <LatexFormula math={`x = ${startX.toFixed(1)} + ${x0.toFixed(3)} = ${totalX.toFixed(3)}\\text{ m}`} />
              </div>
            </ClickReveal>
            <div className="border-t border-border/25 pt-1.5 text-[9.5px] font-bold text-indigo-500/90 leading-normal">
              ★ Note: This shortcut is only applicable for constant UDL segments (linear shear line).
            </div>
          </div>
        </div>
      }
    />
  );
};

export const renderUDLDivisionSolver = (
  v1: number,
  w: number,
  startX: number,
  x0: number,
  totalX: number,
) => {
  return (
    <UDLDivisionSolverView
      v1={v1}
      w={w}
      startX={startX}
      x0={x0}
      totalX={totalX}
    />
  );
};
