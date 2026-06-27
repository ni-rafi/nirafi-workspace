import React from 'react';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import { LatexFormula, InteractiveCard, ClickReveal } from '@/features/presentation/components/elements';
import { useClickStepsContext } from '@/features/presentation/context/ClickStepsContext';
import { motion } from 'motion/react';

export const PlotSegment3L2: React.FC = () => {
  const { currentClick } = useClickStepsContext();
  const step = currentClick ?? 0;
  const getSvgX = (x: number) => 50 + x * 18;

  const getBmdSeg2Path = () => {
    const pts: string[] = [];
    for (let i = 0; i <= 10; i++) {
      const t = i / 10;
      const xVal = 5 + (12 - 5) * t;
      const xPixel = getSvgX(xVal);
      const localX = xVal - 5;
      const mom = 71.625 + 14.325 * localX - 1.5 * localX * localX;
      const yPixel = 180 - mom * 0.558;
      pts.push(`${xPixel},${yPixel}`);
    }
    return "M " + pts.join(" L ");
  };

  return (
    <FullWidthLayout
      title={<span>Plotting Diagrams - Segment 3</span>}
    >
      <div className="w-full h-full grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch select-none animate-in fade-in duration-300 text-left">
        {/* Left Column: Aligned SFD & BMD SVGs */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center p-3 border border-border/50 bg-muted/20 dark:bg-slate-900/10 rounded-xl min-h-[300px]">
          <svg className="w-full max-w-[460px] h-[250px] overflow-visible" viewBox="0 0 460 250">
            <line x1="30" y1="60" x2="430" y2="60" className="stroke-slate-400/80 dark:stroke-slate-650/80" strokeWidth="1.5" />
            <line x1="30" y1="180" x2="430" y2="180" className="stroke-slate-400/80 dark:stroke-slate-650/80" strokeWidth="1.5" />
            
            {[0, 5, 12, 17, 20].map((m) => (
              <g key={`tick-${m}`}>
                <line x1={getSvgX(m)} y1="56" x2={getSvgX(m)} y2="64" className="stroke-slate-400 dark:stroke-slate-650" />
                <line x1={getSvgX(m)} y1="176" x2={getSvgX(m)} y2="184" className="stroke-slate-400 dark:stroke-slate-650" />
                <line x1={getSvgX(m)} y1="64" x2={getSvgX(m)} y2="176" className="stroke-slate-200/30 dark:stroke-slate-800/30 stroke-dash-2" strokeDasharray="2 2" />
                <text x={getSvgX(m)} y="74" textAnchor="middle" className="text-[7.5px] fill-muted-foreground font-mono">{m}m</text>
              </g>
            ))}

            {/* SFD */}
            <g>
              <path
                d={`M 50,60 L 50,35 L 140,35 L 266,72`}
                fill="none"
                className="stroke-rose-500/60"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <motion.path
                d={`M 266,72 L 356,72`}
                fill="none"
                className="stroke-rose-500 stroke-[3.5px]"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: step >= 3 ? 1 : 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
              <path
                d={`M 356,72 L 356,98 L 410,98 L 410,60`}
                fill="none"
                className="stroke-slate-300 dark:stroke-slate-700 stroke-dash-2"
                strokeWidth="1.2"
                strokeDasharray="2 2"
              />
              <text x="95" y="27" textAnchor="middle" className="text-[8px] font-bold fill-rose-600 dark:fill-rose-400 font-mono">+14.33 kN</text>
              <text x="266" y="83" textAnchor="middle" className="text-[8px] font-bold fill-rose-600 dark:fill-rose-400 font-mono">-6.68 kN</text>
              <circle cx="266" cy="72" r="3" className="fill-rose-500 stroke-white dark:stroke-slate-900" strokeWidth="1" />
              {step >= 2 && (
                <circle cx="356" cy="72" r="3" className="fill-rose-500 stroke-white dark:stroke-slate-900 animate-in zoom-in-50 duration-200" strokeWidth="1" />
              )}
              <text x="435" y="63" className="text-[8.5px] font-bold fill-rose-500 font-mono">V (kN)</text>
            </g>

            {/* BMD */}
            <g>
              <line x1="50" y1="180" x2="140" y2="140" className="stroke-indigo-500/60" strokeWidth="2.5" strokeLinecap="round" />
              <path d={getBmdSeg2Path()} fill="none" className="stroke-indigo-500/60" strokeWidth="2.5" />
              <motion.line
                x1={266}
                y1={125}
                x2={356}
                y2={144}
                className="stroke-indigo-500 stroke-[3.5px]"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: step >= 3 ? 1 : 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
              
              <circle cx="140" cy="140" r="3" className="fill-indigo-500 stroke-white dark:stroke-slate-900" strokeWidth="1" />
              <text x="140" y="131" textAnchor="middle" className="text-[8px] font-bold fill-indigo-600 dark:fill-indigo-400 font-mono">71.63</text>
              
              <circle cx="266" cy="125" r="3" className="fill-indigo-500 stroke-white dark:stroke-slate-900" strokeWidth="1" />
              <text x="266" y="117" textAnchor="middle" className="text-[8px] font-bold fill-indigo-600 dark:fill-indigo-400 font-mono">98.43</text>
              
              {step >= 2 && (
                <circle cx="356" cy="144" r="3" className="fill-indigo-500 stroke-white dark:stroke-slate-900 animate-in zoom-in-50 duration-200" strokeWidth="1" />
              )}
              {step >= 3 && (
                <text x="356" y="136" textAnchor="middle" className="text-[8px] font-bold fill-indigo-600 dark:fill-indigo-400 font-mono animate-in fade-in duration-300">65.05</text>
              )}

              {/* Dotted path trail for Segment 4 */}
              <line x1="356" y1="144" x2="410" y2="180" className="stroke-slate-350 dark:stroke-slate-700 stroke-dash-2" strokeWidth="1.2" strokeDasharray="2 2" />
              <text x="435" y="183" className="text-[8.5px] font-bold fill-indigo-500 font-mono">M (kNm)</text>
            </g>
          </svg>
        </div>

        {/* Right Column: Explanations */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-3 text-left">
          <div>
            <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest block mb-0.5">Plotting Workbook</span>
            <h3 className="text-base font-bold text-foreground">Segment 3 (12 to 17 m)</h3>
            <span className="inline-block mt-0.5 text-[10px] font-bold px-2 py-0.5 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-full font-mono">
              Domain: 12 ≤ x &lt; 17 m
            </span>
          </div>

          <div className="space-y-2.5 flex-1 flex flex-col justify-center">
            {/* Shear Card */}
            <InteractiveCard className="p-3 border-l-4 border-l-rose-500 bg-rose-50/20 dark:bg-rose-950/5 space-y-1">
              <span className="text-[8px] font-bold text-rose-500 uppercase tracking-wider block">1. SFD Plotting (Shear)</span>
              <div className="text-xs font-mono font-bold text-foreground">
                <LatexFormula math="V(x) = -6.675\text{ kN}" />
              </div>
              <ClickReveal at={1}>
                <p className="text-[10px] text-muted-foreground leading-snug">
                  <strong>Shape:</strong> Constant (Degree 0) → Horizontal Line
                </p>
              </ClickReveal>
              <ClickReveal at={2}>
                <div className="text-[10px] font-mono text-rose-600 dark:text-rose-400 font-semibold pt-1 border-t border-rose-500/10">
                  <LatexFormula math="V(12) = -6.68\text{ kN}, \quad V(17) = -6.68\text{ kN}" />
                </div>
              </ClickReveal>
            </InteractiveCard>

            {/* Moment Card */}
            <InteractiveCard className="p-3 border-l-4 border-l-indigo-500 bg-indigo-50/20 dark:bg-indigo-950/5 space-y-1">
              <span className="text-[8px] font-bold text-indigo-500 uppercase tracking-wider block">2. BMD Plotting (Moment)</span>
              <div className="text-xs font-mono font-bold text-foreground">
                <LatexFormula math="M(x) = 98.425 - 6.675(x - 12)\text{ kNm}" />
              </div>
              <ClickReveal at={1}>
                <p className="text-[10px] text-muted-foreground leading-snug">
                  <strong>Shape:</strong> Linear (Degree 1) → Sloped Straight Line
                </p>
              </ClickReveal>
              <ClickReveal at={2}>
                <div className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 font-semibold pt-1 border-t border-indigo-500/10">
                  <LatexFormula math="M(12) = +98.43\text{ kNm}, \quad M(17) = +65.05\text{ kNm}" />
                </div>
              </ClickReveal>
            </InteractiveCard>
          </div>
        </div>
      </div>

      {/* Clicks registration */}
      <ClickReveal at={1} preset="none"><div className="hidden" /></ClickReveal>
      <ClickReveal at={2} preset="none"><div className="hidden" /></ClickReveal>
      <ClickReveal at={3} preset="none"><div className="hidden" /></ClickReveal>
    </FullWidthLayout>
  );
};

export default PlotSegment3L2;
