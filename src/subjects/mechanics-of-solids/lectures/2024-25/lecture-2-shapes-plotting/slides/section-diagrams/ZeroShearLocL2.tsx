import React from 'react';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import { LatexFormula, SlideParagraph, ClickReveal, SlideBullet } from '@/features/presentation/components/elements';

export const ZeroShearLocL2: React.FC = () => {
  return (
    <FullWidthLayout
      title={<span>Locating the Zero Shear Coordinate</span>}
    >
      <div className="w-full h-full grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch select-none animate-in fade-in duration-300 text-left">
        {/* Left Column: Mathematical derivation steps */}
        <div className="lg:col-span-7 flex flex-col justify-center p-4 border border-border/50 bg-muted/20 dark:bg-slate-900/10 rounded-xl min-h-[220px] space-y-3">
          <span className="text-[10px] font-bold text-rose-500 uppercase tracking-widest block mb-0.5">Solving for V(x) = 0</span>
          
          <div className="bg-background border border-border/60 rounded-xl p-3 flex flex-col gap-2 font-mono">
            <span className="text-[9px] text-muted-foreground uppercase">1. Segment Equation (Zone 2: 5m &le; x &le; 12m)</span>
            <div className="text-xs font-black text-foreground">
              <LatexFormula math="V(x) = 14.325 - 3(x - 5)" />
            </div>
          </div>

          <ClickReveal at={1}>
            <div className="bg-background border border-border/60 rounded-xl p-3 flex flex-col gap-2 font-mono animate-in fade-in duration-300">
              <span className="text-[9px] text-indigo-500 uppercase font-bold">2. Set Shear to Zero</span>
              <div className="text-xs font-black text-indigo-600 dark:text-indigo-400">
                <LatexFormula math="14.325 - 3(x - 5) = 0 \implies 3(x - 5) = 14.325" />
              </div>
            </div>
          </ClickReveal>

          <ClickReveal at={2}>
            <div className="bg-background border border-border/60 rounded-xl p-3 flex flex-col gap-2 font-mono animate-in fade-in duration-300">
              <span className="text-[9px] text-emerald-500 uppercase font-bold">3. Solve for Local Distance (x')</span>
              <div className="text-xs font-black text-emerald-600 dark:text-emerald-400">
                <LatexFormula math="x - 5 = \frac{14.325}{3} = 4.775\text{ m}" />
              </div>
            </div>
          </ClickReveal>

          <ClickReveal at={3}>
            <div className="bg-emerald-500/10 dark:bg-emerald-950/15 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 font-bold shadow-xs p-3 rounded-lg text-xs text-center font-mono flex justify-between animate-in fade-in zoom-in-95 duration-250">
              <span>Peak Bending Moment Position:</span>
              <LatexFormula math="x_{\text{peak}} = 9.775\text{ m}" />
            </div>
          </ClickReveal>
        </div>

        {/* Right Column: Key Explanations */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-3 text-left">
          <div>
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-0.5">Calculus Solver</span>
            <h4 className="text-sm font-bold text-foreground">Solving the Linear Domain</h4>
            <SlideParagraph variant="plain" className="text-[10.5px] text-muted-foreground leading-normal mt-1">
              <span>The UDL force of <LatexFormula math="3\text{ kN/m}" /> reduces the shear linearly by <LatexFormula math="3\text{ kN}" /> every meter.</span>
            </SlideParagraph>
          </div>

          <div className="border border-border/40 p-4 bg-muted/10 rounded-xl space-y-2">
            <div className="text-[10px] text-muted-foreground leading-relaxed space-y-2">
              <SlideBullet icon={<span className="text-indigo-500 font-bold font-mono">•</span>}>
                <span>Shear starts at <LatexFormula math="+14.325\text{ kN}" /> at the boundary (<LatexFormula math="x = 5\text{ m}" />)</span>
              </SlideBullet>
              <SlideBullet icon={<span className="text-indigo-500 font-bold font-mono">•</span>}>
                <span>It takes exactly <LatexFormula math="4.775\text{ m}" /> of UDL span to completely cancel out this initial shear force.</span>
              </SlideBullet>
              <SlideBullet icon={<span className="text-indigo-500 font-bold font-mono">•</span>}>
                <span>So the shear crosses zero at a global position of <LatexFormula math="x = 9.775\text{ m}" />.</span>
              </SlideBullet>
            </div>
          </div>

          <div className="bg-indigo-500/[0.02] border border-indigo-500/10 p-2.5 rounded-xl text-[9.5px] leading-normal font-mono text-center">
            Next: Calculating maximum moment & plotting the final diagrams
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

export default ZeroShearLocL2;
