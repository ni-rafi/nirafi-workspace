import React from 'react';
import { ClickReveal, LatexFormula } from '@/features/presentation/components/elements';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';

export const renderZeroShearBoundary = (
  diagram: React.ReactNode
) => {
  return (
    <TwoColumnLayout
      title="Zero-Shear Crossing Point"
      leftWidth="55%"
      leftContent={diagram}
      rightContent={
        <div className="flex flex-col gap-2.5 justify-center h-full text-left font-sans font-medium">
          <div className="space-y-1">
            <span className="text-[9px] font-bold text-rose-500 uppercase tracking-widest block font-mono">Zero-Shear Location Boundary</span>
            <h4 className="text-sm font-extrabold text-foreground font-sans">Why Zero-Shear Matters</h4>
          </div>

          <div className="text-[11px] text-muted-foreground bg-muted/15 border border-border/30 rounded-xl p-2.5 space-y-2 select-text font-sans">
            <div>
              <span className="font-bold text-foreground block mb-0.5">1. Zero-Shear Condition:</span>
              Bending moment reaches its extreme (peak) where the shear force crosses zero, since:
              <div className="mt-1.5 text-indigo-500 font-semibold font-mono">
                <LatexFormula math="\frac{dM}{dx} = V(x) = 0" />
              </div>
            </div>
            <ClickReveal at={1}>
              <div className="border-t border-border/25 pt-2">
                <span className="font-bold text-foreground block mb-0.5">2. Shear Crossing Location:</span>
                The shear line slopes downward across UDL zone and crosses the x-axis. We define distance <LatexFormula math="x_0" /> as the distance from start of UDL to this crossing point.
              </div>
            </ClickReveal>
          </div>
        </div>
      }
    />
  );
};

export const renderSimilarTrianglesRatio = (
  v1: number,
  v2: number,
  L_seg: number,
  x0: number,
  totalX: number,
  clickIdx: number
) => {
  return (
    <TwoColumnLayout
      title="Solving Zero-Crossing Position"
      leftWidth="55%"
      leftContent={
        <div className="flex h-full w-full items-center justify-center p-8 select-none font-sans">
          <svg className="w-full max-w-2xl h-[300px] overflow-visible" viewBox="0 0 340 170">
            <line x1="20" y1="90" x2="320" y2="90" className="stroke-slate-400/40 dark:stroke-slate-600" strokeWidth="1.2" />
            
            <g className="transition-all duration-500 opacity-100">
              <polygon points="40,30 220,90 40,90" className="fill-emerald-500/10 stroke-emerald-500" strokeWidth="1.5" />
              <foreignObject x="5" y="48" width="32" height="24">
                <div className="flex items-center justify-end text-[10.5px] font-black text-emerald-600 dark:text-emerald-400 font-sans">
                  <LatexFormula math={`${v1.toFixed(3)}`} />
                </div>
              </foreignObject>
            </g>

            <g className={`transition-all duration-500 ${clickIdx >= 1 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
              <polygon points="300,120 220,90 300,90" className="fill-rose-500/10 stroke-rose-500" strokeWidth="1.5" />
              <foreignObject x="305" y="98" width="30" height="24">
                <div className="flex items-center justify-start text-[10.5px] font-black text-rose-600 dark:text-rose-455 font-sans">
                  <LatexFormula math={`${v2.toFixed(3)}`} />
                </div>
              </foreignObject>
            </g>

            <g className={`transition-all duration-500 ${clickIdx >= 2 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
              <foreignObject x="100" y="94" width="60" height="24">
                <div className="flex items-center justify-center text-[10.5px] font-bold text-indigo-500 font-mono">
                  <LatexFormula math="x_0" />
                </div>
              </foreignObject>
              <foreignObject x="230" y="94" width="60" height="24">
                <div className="flex items-center justify-center text-[10.5px] font-bold text-indigo-500 font-mono">
                  <LatexFormula math={`${L_seg} - x_0`} />
                </div>
              </foreignObject>
            </g>
          </svg>
        </div>
      }
      rightContent={
        <div className="flex flex-col gap-2.5 justify-center h-full text-left font-sans font-medium">
          <div className="space-y-1">
            <span className="text-[9px] font-black text-indigo-500 uppercase tracking-widest block font-mono">Similar Triangles</span>
            <h4 className="text-sm font-extrabold text-foreground font-sans">Solving for x_0</h4>
          </div>

          <div className="text-[11px] text-muted-foreground bg-muted/15 border border-border/30 rounded-xl p-2.5 space-y-2 select-text font-sans">
            <div>
              <span className="font-bold text-foreground block mb-0.5">1. Ratio Setup:</span>
              <LatexFormula math={`\\frac{${v1.toFixed(3)}}{x_0} = \\frac{${v2.toFixed(3)}}{${L_seg} - x_0}`} />
            </div>
            <ClickReveal at={1}>
              <div className="border-t border-border/25 pt-2">
                <span className="font-bold text-foreground block mb-0.5">2. Cross Multiplication:</span>
                <LatexFormula math={`${v1.toFixed(3)}(${L_seg} - x_0) = ${v2.toFixed(3)} \\cdot x_0`} />
              </div>
            </ClickReveal>
            <ClickReveal at={2}>
              <div className="border-t border-border/25 pt-2">
                <span className="font-bold text-foreground block mb-0.5">3. Simplify & Group:</span>
                <LatexFormula math={`${(v1 * L_seg).toFixed(3)} = ${(v1 + v2).toFixed(3)} \\cdot x_0`} />
              </div>
            </ClickReveal>
            <ClickReveal at={3}>
              <div className="border-t border-border/25 pt-2">
                <span className="font-bold text-indigo-500 block mb-0.5 font-mono">4. Solve Position:</span>
                <LatexFormula math={`x_0 = ${x0.toFixed(3)}\\text{ m} \\implies \\text{Total } x = ${totalX.toFixed(3)}\\text{ m}`} />
              </div>
            </ClickReveal>
          </div>
        </div>
      }
    />
  );
};
