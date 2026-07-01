import React from 'react';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import { LatexFormula, ClickReveal, InteractiveCard } from '@/features/presentation/components/elements';
import { useClickStepsContext } from '@/features/presentation/context/ClickStepsContext';

export const PartialPlotL2: React.FC = () => {
  const { currentClick } = useClickStepsContext();
  const step = currentClick ?? 0; // 0: Seg 1, 1: Seg 2, 2: Seg 3, 3: Seg 4

  // Mapping x: [0, 20] -> [50, 410]
  const getSvgX = (x: number) => 50 + x * 18;

  // Exact coordinates for BMD parabola (Interval 2: 5m to 12m)
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

  const segmentData = [
    {
      title: "Segment 1 (0 to 5 m)",
      span: "0 ≤ x < 5 m",
      vEq: "V(x) = +14.325\\text{ kN}",
      mEq: "M(x) = 14.325x\\text{ kNm}",
      vShape: "Constant (Degree 0) → Horizontal Line",
      mShape: "Linear (Degree 1) → Sloped Straight Line",
      vValues: "V(0) = +14.33\\text{ kN}, \\quad V(5) = +14.33\\text{ kN}",
      mValues: "M(0) = 0, \\quad M(5) = +71.63\\text{ kNm}",
    },
    {
      title: "Segment 2 (5 to 12 m)",
      span: "5 ≤ x < 12 m",
      vEq: "V(x) = 14.325 - 3(x - 5)",
      mEq: "M(x) = 71.625 + 14.325(x - 5) - 1.5(x - 5)^2",
      vShape: "Linear (Degree 1) → Sloped Straight Line",
      mShape: "Quadratic (Degree 2) → Parabolic Curve",
      vValues: "V(5) = +14.33\\text{ kN}, \\quad V(12) = -6.68\\text{ kN}",
      mValues: "M(5) = +71.63, \\; M(9.78)_{\\text{peak}} = +105.86, \\; M(12) = +98.43\\text{ kNm}",
      extra: "Shear crosses zero at x = 9.775 m, creating the peak moment."
    },
    {
      title: "Segment 3 (12 to 17 m)",
      span: "12 ≤ x < 17 m",
      vEq: "V(x) = -6.675\\text{ kN}",
      mEq: "M(x) = 98.425 - 6.675(x - 12)",
      vShape: "Constant (Degree 0) → Horizontal Line",
      mShape: "Linear (Degree 1) → Sloped Straight Line",
      vValues: "V(12) = -6.68\\text{ kN}, \\quad V(17) = -6.68\\text{ kN}",
      mValues: "M(12) = +98.43\\text{ kNm}, \\quad M(17) = +65.05\\text{ kNm}",
    },
    {
      title: "Segment 4 (17 to 20 m)",
      span: "17 ≤ x ≤ 20 m",
      vEq: "V(x) = -21.675\\text{ kN}",
      mEq: "M(x) = 65.05 - 21.675(x - 17)",
      vShape: "Constant (Degree 0) → Horizontal Line",
      mShape: "Linear (Degree 1) → Sloped Straight Line",
      vValues: "V(17) = -21.68\\text{ kN}, \\quad V(20) = -21.68\\text{ kN}",
      mValues: "M(17) = +65.05\\text{ kNm}, \\quad M(20) = 0",
    }
  ];

  const activeData = segmentData[step]!;

  return (
    <FullWidthLayout
      title={<span>SFD and BMD Progressive Segment Plotting</span>}
    >
      <div className="w-full h-full grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch select-none animate-in fade-in duration-300 text-left">
        {/* Left Column: Aligned SFD & BMD SVGs */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center p-3 border border-border/50 bg-muted/20 dark:bg-slate-900/10 rounded-xl min-h-[300px]">
          <svg className="w-full max-w-[460px] h-[250px] overflow-visible" viewBox="0 0 460 250">
            {/* Horizontal Zero baselines */}
            <line x1="30" y1="60" x2="430" y2="60" className="stroke-slate-400/80 dark:stroke-slate-600/80" strokeWidth="1.5" />
            <line x1="30" y1="180" x2="430" y2="180" className="stroke-slate-400/80 dark:stroke-slate-600/80" strokeWidth="1.5" />
            
            {/* Ticks and grid lines */}
            {[0, 5, 12, 17, 20].map((m) => (
              <g key={`tick-${m}`}>
                <line x1={getSvgX(m)} y1="56" x2={getSvgX(m)} y2="64" className="stroke-slate-400 dark:stroke-slate-650" />
                <line x1={getSvgX(m)} y1="176" x2={getSvgX(m)} y2="184" className="stroke-slate-400 dark:stroke-slate-650" />
                <line x1={getSvgX(m)} y1="64" x2={getSvgX(m)} y2="176" className="stroke-slate-200/30 dark:stroke-slate-800/30 stroke-dash-2" strokeDasharray="2 2" />
                <text x={getSvgX(m)} y="74" textAnchor="middle" className="text-[7.5px] fill-muted-foreground font-mono">{m}m</text>
              </g>
            ))}

            {/* ==================== 1. SFD DRAWING (Progressive) ==================== */}
            <g>
              {/* Completed background dotted trail */}
              <path
                d={`M 50,60 L 50,35 L 140,35 L 266,72 L 356,72 L 356,98 L 410,98 L 410,60`}
                fill="none"
                className="stroke-slate-300 dark:stroke-slate-700 stroke-dash-2"
                strokeWidth="1.2"
                strokeDasharray="2 2"
              />

              {/* Segment 1 */}
              {step >= 0 && (
                <path
                  d={`M 50,60 L 50,35 L 140,35`}
                  fill="none"
                  className={step === 0 ? "stroke-rose-500 stroke-[3.5px]" : "stroke-rose-500/60"}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              )}
              {/* Segment 2 */}
              {step >= 1 && (
                <path
                  d={`M 140,35 L 266,72`}
                  fill="none"
                  className={step === 1 ? "stroke-rose-500 stroke-[3.5px]" : "stroke-rose-500/60"}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              )}
              {/* Segment 3 */}
              {step >= 2 && (
                <path
                  d={`M 266,72 L 356,72`}
                  fill="none"
                  className={step === 2 ? "stroke-rose-500 stroke-[3.5px]" : "stroke-rose-500/60"}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              )}
              {/* Segment 4 */}
              {step >= 3 && (
                <path
                  d={`M 356,72 L 356,98 L 410,98 L 410,60`}
                  fill="none"
                  className={step === 3 ? "stroke-rose-500 stroke-[3.5px]" : "stroke-rose-500/60"}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              )}

              {/* Progressive text reveal */}
              {step >= 0 && <text x="95" y="27" textAnchor="middle" className="text-[8px] font-bold fill-rose-600 dark:fill-rose-400 font-mono">+14.33 kN</text>}
              {step >= 1 && <text x="266" y="83" textAnchor="middle" className="text-[8px] font-bold fill-rose-600 dark:fill-rose-400 font-mono">-6.68 kN</text>}
              {step >= 3 && <text x="383" y="109" textAnchor="middle" className="text-[8px] font-bold fill-rose-600 dark:fill-rose-400 font-mono">-21.68 kN</text>}
              <text x="435" y="63" className="text-[8.5px] font-bold fill-rose-500 font-mono">V (kN)</text>
            </g>

            {/* ==================== 2. BMD DRAWING (Progressive) ==================== */}
            <g>
              {/* Background dotted trail of complete diagram */}
              <path
                d={`M 50,180 L 140,140 ${getBmdSeg2Path().replace('M ', 'L ')} L 356,144 L 410,180`}
                fill="none"
                className="stroke-slate-350 dark:stroke-slate-700 stroke-dash-2"
                strokeWidth="1.2"
                strokeDasharray="2 2"
              />

              {/* Segment 1 */}
              {step >= 0 && (
                <>
                  <line x1="50" y1="180" x2="140" y2="140" className={step === 0 ? "stroke-indigo-500 stroke-[3.5px]" : "stroke-indigo-500/60"} strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx="140" cy="140" r="3" className="fill-indigo-500 stroke-white dark:stroke-slate-900" strokeWidth="1" />
                  <text x="140" y="131" textAnchor="middle" className="text-[8px] font-bold fill-indigo-600 dark:fill-indigo-400 font-mono">71.63</text>
                </>
              )}
              {/* Segment 2 (Parabolic curve) */}
              {step >= 1 && (
                <>
                  <path d={getBmdSeg2Path()} fill="none" className={step === 1 ? "stroke-indigo-500 stroke-[3.5px]" : "stroke-indigo-500/60"} strokeWidth="2.5" />
                  <circle cx="226" cy="121" r="3.5" className="fill-amber-500 stroke-white dark:stroke-slate-900" strokeWidth="1" />
                  <text x="226" y="112" textAnchor="middle" className="text-[8px] font-bold fill-amber-500 font-mono">105.86 (M_max)</text>
                  
                  <circle cx="266" cy="125" r="3" className="fill-indigo-500 stroke-white dark:stroke-slate-900" strokeWidth="1" />
                  <text x="272" y="134" textAnchor="middle" className="text-[8px] font-bold fill-indigo-600 dark:fill-indigo-400 font-mono">98.43</text>
                </>
              )}
              {/* Segment 3 */}
              {step >= 2 && (
                <>
                  <line x1="266" y1="125" x2="356" y2="144" className={step === 2 ? "stroke-indigo-500 stroke-[3.5px]" : "stroke-indigo-500/60"} strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx="356" cy="144" r="3" className="fill-indigo-500 stroke-white dark:stroke-slate-900" strokeWidth="1" />
                  <text x="356" y="136" textAnchor="middle" className="text-[8px] font-bold fill-indigo-600 dark:fill-indigo-400 font-mono">65.05</text>
                </>
              )}
              {/* Segment 4 */}
              {step >= 3 && (
                <>
                  <line x1="356" y1="144" x2="410" y2="180" className={step === 3 ? "stroke-indigo-500 stroke-[3.5px]" : "stroke-indigo-500/60"} strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx="410" cy="180" r="3" className="fill-indigo-500 stroke-white dark:stroke-slate-900" strokeWidth="1" />
                  <text x="410" y="191" textAnchor="middle" className="text-[8px] font-bold fill-indigo-600 dark:fill-indigo-400 font-mono">0</text>
                </>
              )}

              <text x="435" y="183" className="text-[8.5px] font-bold fill-indigo-500 font-mono">M (kNm)</text>
            </g>
          </svg>
        </div>

        {/* Right Column: Explanations & Segment Data Cards */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-2 text-left">
          <div>
            <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest block mb-0.5">Plotting Workbook</span>
            <h3 className="text-base font-bold text-foreground">{activeData.title}</h3>
            <span className="inline-block mt-0.5 text-[10px] font-bold px-2 py-0.5 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-full font-mono">
              Domain: {activeData.span}
            </span>
          </div>

          <div className="space-y-1.5 flex-1 flex flex-col justify-center">
            {/* Shear plotting card */}
            <InteractiveCard spacing="space-y-1" className="py-1.5 px-2.5 border-l-4 border-l-rose-500 bg-rose-50/20 dark:bg-rose-950/5 animate-in fade-in slide-in-from-right-2 duration-300">
              <span className="text-[8px] font-bold text-rose-500 uppercase tracking-wider block">1. SFD Plotting (Shear)</span>
              <div className="text-xs font-mono font-bold text-foreground overflow-x-auto max-w-full scrollbar-none">
                <LatexFormula math={activeData.vEq} />
              </div>
              <p className="text-[10px] text-muted-foreground leading-snug">
                <strong>Shape:</strong> {activeData.vShape}
              </p>
              <div className="text-[10px] font-mono text-rose-600 dark:text-rose-400 font-semibold pt-1 border-t border-rose-500/10 overflow-x-auto max-w-full scrollbar-none">
                <LatexFormula math={activeData.vValues} />
              </div>
            </InteractiveCard>

            {/* Moment plotting card */}
            <InteractiveCard spacing="space-y-1" className="py-1.5 px-2.5 border-l-4 border-l-indigo-500 bg-indigo-50/20 dark:bg-indigo-950/5 animate-in fade-in slide-in-from-right-2 duration-300">
              <span className="text-[8px] font-bold text-indigo-500 uppercase tracking-wider block">2. BMD Plotting (Moment)</span>
              <div className="text-xs font-mono font-bold text-foreground overflow-x-auto max-w-full scrollbar-none">
                <LatexFormula math={activeData.mEq} />
              </div>
              <p className="text-[10px] text-muted-foreground leading-snug">
                <strong>Shape:</strong> {activeData.mShape}
              </p>
              <div className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 font-semibold pt-1 border-t border-indigo-500/10 overflow-x-auto max-w-full scrollbar-none">
                <LatexFormula math={activeData.mValues} />
              </div>
              {activeData.extra && (
                <p className="text-[9.5px] text-amber-500 font-medium leading-normal pt-1 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                  {activeData.extra}
                </p>
              )}
            </InteractiveCard>
          </div>

          <div className="bg-indigo-500/[0.02] border border-indigo-500/10 p-2 rounded-xl text-[9px] leading-normal font-mono text-center">
            {step < 3 ? "Click Next to plot the next segment..." : "All segments successfully plotted!"}
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

export default PartialPlotL2;
