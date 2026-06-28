import { ClickReveal, LatexFormula, DimensionLine } from '@/features/presentation/components/elements';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';

export const renderSectionMethodSolver = (
  v1: number,
  w: number,
  startX: number,
  totalX: number,
) => {
  return (
    <TwoColumnLayout
      title="Solving Zero-Crossing: Method 1 (Section Method)"
      leftWidth="55%"
      leftContent={
        <div className="flex h-full w-full items-center justify-center p-6 select-none font-sans">
          <svg className="w-full max-w-2xl h-[280px] overflow-visible" viewBox="0 0 340 170">
            {/* Ground reference baseline */}
            <line x1="20" y1="125" x2="320" y2="125" className="stroke-slate-200 dark:stroke-slate-800/40" strokeWidth="1" strokeDasharray="3 3" />
            {/* Cut beam body */}
            <rect x="40" y="85" width="220" height="10" className="fill-slate-200 dark:fill-slate-850 stroke-slate-450 dark:stroke-slate-700" strokeWidth="1.2" rx="2" />
            {/* Pinned support at A */}
            <polygon points="35,103 45,103 40,95" className="fill-slate-400 dark:fill-slate-500" />
            {/* Support reaction vector */}
            <path d="M 40,125 L 40,99 M 37,105 L 40,99 L 43,105" fill="none" className="stroke-emerald-500" strokeWidth="1.8" />
            <text x="45" y="118" className="text-[8.5px] font-extrabold fill-emerald-600 dark:fill-emerald-400 font-sans">
              R<tspan dy="2.5" fontSize="6px">yA</tspan><tspan dy="-2.5"> = {v1.toFixed(3)} kN</tspan>
            </text>

            {/* UDL load representation starting at x = 5 (x=120) to cut end (x=260) */}
            <rect x="120" y="62" width="140" height="23" className="fill-amber-500/15 stroke-amber-500/25" strokeWidth="0.8" />
            {/* UDL arrows */}
            {Array.from({ length: 6 }).map((_, i) => {
              const arrowX = 120 + i * 27;
              return (
                <path key={i} d={`M ${arrowX},62 L ${arrowX},85 M ${arrowX - 2.5},79 L ${arrowX},85 L ${arrowX + 2.5},79`} fill="none" className="stroke-amber-500/60" strokeWidth="0.8" />
              );
            })}
            <text x="190" y="54" textAnchor="middle" className="text-[9px] font-bold fill-amber-600 dark:fill-amber-400">w = {w.toFixed(1)} kN/m</text>

            {/* Dimension lines */}
            {/* Total cut length x (from x=40 to x=260) */}
            <DimensionLine x1={40} y1={142} x2={260} y2={142} label="x (Total position)" color="#6366f1" className="text-[9px]" />
            {/* UDL length x - startX (from x=120 to x=260) */}
            <DimensionLine x1={120} y1={25} x2={260} y2={25} label={`x - ${startX.toFixed(1)}`} color="#6366f1" className="text-[9px]" />
            {/* Start of UDL offset (from x=40 to x=120) */}
            <DimensionLine x1={40} y1={25} x2={120} y2={25} label={`${startX.toFixed(1)}m`} color="#94a3b8" className="text-[9px] opacity-70" />

            {/* Shear force V = 0 at the cut right end (x=260) */}
            <path d="M 260,82 L 260,108 M 257.5,102 L 260,108 L 262.5,102" fill="none" className="stroke-rose-500" strokeWidth="1.8" />
            <text x="265" y="102" className="text-[9.5px] font-black fill-rose-600 dark:fill-rose-455 font-sans">V = 0</text>
          </svg>
        </div>
      }
      rightContent={
        <div className="flex flex-col gap-2.5 justify-center h-full text-left font-sans font-medium">
          <div className="space-y-1">
            <span className="text-[9px] font-black text-indigo-500 uppercase tracking-widest block font-mono">Method 1: Section Method</span>
            <h4 className="text-sm font-extrabold text-foreground font-sans">Algebraic Equilibrium Solution</h4>
          </div>

          <div className="text-[11px] text-muted-foreground bg-muted/15 border border-border/30 rounded-xl p-2.5 space-y-2 select-text font-sans">
            <div>
              <span className="font-bold text-foreground block mb-0.5">1. Formulate Section cut V(x):</span>
              Cut the beam at distance <LatexFormula math="x" /> inside the UDL zone (between {startX.toFixed(1)}m and 12m) and set shear force to zero:
              <div className="mt-1 text-indigo-500 font-semibold font-mono">
                <LatexFormula math={`V(x) = R_{yA} - w \\cdot (x - ${startX.toFixed(1)}) = 0`} />
              </div>
            </div>
            <ClickReveal at={1}>
              <div className="border-t border-border/25 pt-2">
                <span className="font-bold text-foreground block mb-0.5">2. Substitute Values:</span>
                <LatexFormula math={`${v1.toFixed(3)} - ${w.toFixed(1)} \\cdot (x - ${startX.toFixed(1)}) = 0`} />
              </div>
            </ClickReveal>
            <ClickReveal at={2}>
              <div className="border-t border-border/25 pt-2">
                <span className="font-bold text-foreground block mb-0.5">3. Solve for position x:</span>
                <LatexFormula math={`${w.toFixed(1)}(x - ${startX.toFixed(1)}) = ${v1.toFixed(3)} \\implies x = ${totalX.toFixed(3)}\\text{ m}`} />
              </div>
            </ClickReveal>
            <div className="border-t border-border/25 pt-1.5 text-[9.5px] font-bold text-indigo-500/90 leading-normal">
              ★ Note: The Section Method is a general method that works for any load configurations.
            </div>
          </div>
        </div>
      }
    />
  );
};
