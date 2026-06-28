import React from 'react';
import { ClickReveal, LatexFormula } from '@/features/presentation/components/elements';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { useClickStepsContext } from '@/features/presentation/context/ClickStepsContext';

interface SimilarTrianglesRatioViewProps {
  v1: number;
  v2: number;
  L_seg: number;
  x0: number;
  totalX: number;
}

const SimilarTrianglesRatioView: React.FC<SimilarTrianglesRatioViewProps> = ({
  v1,
  v2,
  L_seg,
  x0,
  totalX,
}) => {
  const clickContext = useClickStepsContext();
  const clickIdx = clickContext?.currentClick ?? 0;

  return (
    <TwoColumnLayout
      title="Solving Zero-Crossing: Method 2 (Similar Triangles)"
      leftWidth="55%"
      leftContent={
        <div className="flex h-full w-full items-center justify-center p-8 select-none font-sans">
          <svg className="w-full max-w-2xl h-[300px] overflow-visible" viewBox="0 0 340 170">
            <line x1={20} y1={90} x2={320} y2={90} className="stroke-slate-400/40 dark:stroke-slate-600" strokeWidth={1.2} />
            
            {/* Triangle 1: Positive shear triangle */}
            <g className="transition-all duration-500 opacity-100">
              <polygon points="40,30 220,90 40,90" className="fill-emerald-500/10 stroke-emerald-500" strokeWidth="1.5" />
              <text x={35} y={64} textAnchor="end" className="text-[10.5px] font-black fill-emerald-600 dark:fill-emerald-400 font-sans">
                {v1.toFixed(3)}
              </text>
            </g>

            {/* Triangle 2: Negative shear triangle (revealed on clickIdx >= 1) */}
            <g className={`transition-all duration-500 ${clickIdx >= 1 ? 'opacity-100' : 'opacity-0'}`}>
              <polygon points="300,120 220,90 300,90" className="fill-rose-500/10 stroke-rose-500" strokeWidth="1.5" />
              <text x={305} y={110} textAnchor="start" className="text-[10.5px] font-black fill-rose-600 dark:fill-rose-455 font-sans">
                {v2.toFixed(3)}
              </text>
            </g>

            {/* Dimensions: x0 and L_seg - x0 (revealed on clickIdx >= 2) */}
            <g className={`transition-all duration-500 ${clickIdx >= 2 ? 'opacity-100' : 'opacity-0'}`}>
              <text x={130} y={104} textAnchor="middle" className="text-[10px] font-bold fill-indigo-500 font-sans">
                x<tspan dy="2.5" fontSize="7.5px">0</tspan>
              </text>
              <text x={260} y={104} textAnchor="middle" className="text-[10px] font-bold fill-indigo-500 font-sans">
                {L_seg.toFixed(1)} - x<tspan dy="2.5" fontSize="7.5px">0</tspan>
              </text>
            </g>
          </svg>
        </div>
      }
      rightContent={
        <div className="flex flex-col gap-2.5 justify-center h-full text-left font-sans font-medium">
          <div className="space-y-1">
            <span className="text-[9px] font-black text-indigo-500 uppercase tracking-widest block font-mono">Method 2: Similar Triangles</span>
            <h4 className="text-sm font-extrabold text-foreground font-sans">Geometric Similar Triangle Ratio</h4>
          </div>

          <div className="text-[11px] text-muted-foreground bg-muted/15 border border-border/30 rounded-xl p-2.5 space-y-2 select-text font-sans">
            <div>
              <span className="font-bold text-foreground block mb-0.5">1. Ratio Setup:</span>
              <LatexFormula math={`\\frac{${v1.toFixed(3)}}{x_0} = \\frac{${v2.toFixed(3)}}{${L_seg.toFixed(1)} - x_0}`} />
            </div>
            <ClickReveal at={1}>
              <div className="border-t border-border/25 pt-2">
                <span className="font-bold text-foreground block mb-0.5">2. Cross Multiplication:</span>
                <LatexFormula math={`${v1.toFixed(3)}(${L_seg.toFixed(1)} - x_0) = ${v2.toFixed(3)} \\cdot x_0`} />
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
            <div className="border-t border-border/25 pt-1.5 text-[9.5px] font-bold text-indigo-500/90 leading-normal">
              ★ Note: This shortcut is only applicable for constant UDL segments (linear shear line).
            </div>
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
) => {
  return (
    <SimilarTrianglesRatioView
      v1={v1}
      v2={v2}
      L_seg={L_seg}
      x0={x0}
      totalX={totalX}
    />
  );
};
