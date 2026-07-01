import React from 'react';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import { LatexFormula, ClickReveal, InteractiveCard, SlideParagraph } from '@/features/presentation/components/elements';
import { useClickStepsContext } from '@/features/presentation/context/ClickStepsContext';

export const VerifyRelationshipsL2: React.FC = () => {
  const { currentClick } = useClickStepsContext();
  const step = currentClick ?? 0;

  return (
    <FullWidthLayout
      title={<span>Verification of Differential Relations: Segment by Segment</span>}
    >
      <div className="w-full h-full flex flex-col justify-start gap-3 p-4 text-left select-text">
        <div>
          <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest block mb-0.5">Mathematical Verification</span>
          <h2 className="text-sm font-bold text-foreground">Derivatives Check: <LatexFormula math="dM/dx = V" /> and <LatexFormula math="dV/dx = -w" /></h2>
          <SlideParagraph variant="plain" className="text-[10px] text-muted-foreground leading-normal mt-0.5">
            Verify how the analytical equations derived for each interval satisfy the fundamental differential relations.
          </SlideParagraph>
        </div>

        {/* 2x2 Grid for the 4 Segments */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3 mt-1">
          {/* Segment 1 */}
          <InteractiveCard spacing="space-y-1" className="py-1.5 px-2.5 border-l-4 border-l-indigo-500 bg-muted/10">
            <div className="flex justify-between items-center border-b border-border/40 pb-1">
              <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase">Segment 1 (0 to 5 m)</span>
              <span className="text-[9px] font-mono text-muted-foreground">Domain: 0 ≤ x &lt; 5 m</span>
            </div>
            
            <div className="grid grid-cols-3 gap-1.5 text-[9.5px] py-1 border-b border-border/10 font-mono text-center items-stretch">
              <div className={`p-1 rounded-lg border transition-all duration-300 flex flex-col justify-between ${
                step === 2 
                  ? 'bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/25 font-bold scale-[1.02]' 
                  : 'border-transparent text-muted-foreground'
              }`}>
                <span className="text-[7.5px] uppercase tracking-wider block opacity-80 mb-0.5">Load w(x)</span>
                <div className="flex-1 flex items-center justify-center">
                  <LatexFormula math="0" />
                </div>
              </div>
              <div className={`p-1 rounded-lg border transition-all duration-300 flex flex-col justify-between ${
                (step === 1 || step === 2)
                  ? `${step === 1 ? 'bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border-indigo-500/25' : 'bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/25'} font-bold scale-[1.02]`
                  : 'border-transparent text-muted-foreground'
              }`}>
                <span className="text-[7.5px] uppercase tracking-wider block opacity-80 mb-0.5">Shear V(x)</span>
                <div className="flex-1 flex items-center justify-center overflow-x-auto max-w-full scrollbar-none">
                  <LatexFormula math="+14.325\text{ kN}" />
                </div>
              </div>
              <div className={`p-1 rounded-lg border transition-all duration-300 flex flex-col justify-between ${
                step === 1
                  ? 'bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border-indigo-500/25 font-bold scale-[1.02]'
                  : 'border-transparent text-muted-foreground'
              }`}>
                <span className="text-[7.5px] uppercase tracking-wider block opacity-80 mb-0.5">Moment M(x)</span>
                <div className="flex-1 flex items-center justify-center overflow-x-auto max-w-full scrollbar-none">
                  <LatexFormula math="14.325x" />
                </div>
              </div>
            </div>

            <div className="space-y-1 pt-1 font-mono text-[9px] leading-relaxed">
              <ClickReveal at={1}>
                <div className="flex items-center justify-between text-indigo-600 dark:text-indigo-400 bg-indigo-50/20 dark:bg-indigo-950/5 px-2 py-0.5 rounded border border-indigo-500/10">
                  <span>Moment Derivative:</span>
                  <div className="overflow-x-auto max-w-full scrollbar-none">
                    <LatexFormula math="\frac{dM}{dx} = \frac{d}{dx}(14.325x) = 14.325 = V" />
                  </div>
                </div>
              </ClickReveal>
              <ClickReveal at={2}>
                <div className="flex items-center justify-between text-rose-600 dark:text-rose-400 bg-rose-50/20 dark:bg-rose-950/5 px-2 py-0.5 rounded border border-rose-500/10">
                  <span>Shear Derivative:</span>
                  <div className="overflow-x-auto max-w-full scrollbar-none">
                    <LatexFormula math="\frac{dV}{dx} = \frac{d}{dx}(14.325) = 0 = -w" />
                  </div>
                </div>
              </ClickReveal>
            </div>
          </InteractiveCard>

          {/* Segment 2 */}
          <InteractiveCard spacing="space-y-1" className="py-1.5 px-2.5 border-l-4 border-l-rose-500 bg-muted/10">
            <div className="flex justify-between items-center border-b border-border/40 pb-1">
              <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 uppercase">Segment 2 (5 to 12 m)</span>
              <span className="text-[9px] font-mono text-muted-foreground">Domain: 5 ≤ x &lt; 12 m</span>
            </div>
            
            <div className="grid grid-cols-3 gap-1.5 text-[9.5px] py-1 border-b border-border/10 font-mono text-center items-stretch">
              <div className={`p-1 rounded-lg border transition-all duration-300 flex flex-col justify-between ${
                step === 4 
                  ? 'bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/25 font-bold scale-[1.02]' 
                  : 'border-transparent text-muted-foreground'
              }`}>
                <span className="text-[7.5px] uppercase tracking-wider block opacity-80 mb-0.5">Load w(x)</span>
                <div className="flex-1 flex items-center justify-center">
                  <LatexFormula math="3\text{ kN/m}" />
                </div>
              </div>
              <div className={`p-1 rounded-lg border transition-all duration-300 flex flex-col justify-between ${
                (step === 3 || step === 4)
                  ? `${step === 3 ? 'bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border-indigo-500/25' : 'bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/25'} font-bold scale-[1.02]`
                  : 'border-transparent text-muted-foreground'
              }`}>
                <span className="text-[7.5px] uppercase tracking-wider block opacity-80 mb-0.5">Shear V(x)</span>
                <div className="flex-1 flex items-center justify-center overflow-x-auto max-w-full scrollbar-none">
                  <LatexFormula math="14.325 - 3(x-5)" />
                </div>
              </div>
              <div className={`p-1 rounded-lg border transition-all duration-300 flex flex-col justify-between ${
                step === 3
                  ? 'bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border-indigo-500/25 font-bold scale-[1.02]'
                  : 'border-transparent text-muted-foreground'
              }`}>
                <span className="text-[7.5px] uppercase tracking-wider block opacity-80 mb-0.5">Moment M(x)</span>
                <div className="flex-1 flex items-center justify-center overflow-x-auto max-w-full scrollbar-none">
                  <LatexFormula math="71.63 + 14.33(x-5) - 1.5(x-5)^2" />
                </div>
              </div>
            </div>

            <div className="space-y-1 pt-1 font-mono text-[9px] leading-relaxed">
              <ClickReveal at={3}>
                <div className="flex items-center justify-between text-indigo-600 dark:text-indigo-400 bg-indigo-50/20 dark:bg-indigo-950/5 px-2 py-0.5 rounded border border-indigo-500/10">
                  <span>Moment Derivative:</span>
                  <div className="overflow-x-auto max-w-full scrollbar-none">
                    <LatexFormula math="14.325 - 3(x-5) = V" />
                  </div>
                </div>
              </ClickReveal>
              <ClickReveal at={4}>
                <div className="flex items-center justify-between text-rose-600 dark:text-rose-400 bg-rose-50/20 dark:bg-rose-950/5 px-2 py-0.5 rounded border border-rose-500/10">
                  <span>Shear Derivative:</span>
                  <div className="overflow-x-auto max-w-full scrollbar-none">
                    <LatexFormula math="\frac{dV}{dx} = \frac{d}{dx}(29.325 - 3x) = -3 = -w" />
                  </div>
                </div>
              </ClickReveal>
            </div>
          </InteractiveCard>

          {/* Segment 3 */}
          <InteractiveCard spacing="space-y-1" className="py-1.5 px-2.5 border-l-4 border-l-emerald-500 bg-muted/10">
            <div className="flex justify-between items-center border-b border-border/40 pb-1">
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase">Segment 3 (12 to 17 m)</span>
              <span className="text-[9px] font-mono text-muted-foreground">Domain: 12 ≤ x &lt; 17 m</span>
            </div>
            
            <div className="grid grid-cols-3 gap-1.5 text-[9.5px] py-1 border-b border-border/10 font-mono text-center items-stretch">
              <div className={`p-1 rounded-lg border transition-all duration-300 flex flex-col justify-between ${
                step === 6 
                  ? 'bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/25 font-bold scale-[1.02]' 
                  : 'border-transparent text-muted-foreground'
              }`}>
                <span className="text-[7.5px] uppercase tracking-wider block opacity-80 mb-0.5">Load w(x)</span>
                <div className="flex-1 flex items-center justify-center">
                  <LatexFormula math="0" />
                </div>
              </div>
              <div className={`p-1 rounded-lg border transition-all duration-300 flex flex-col justify-between ${
                (step === 5 || step === 6)
                  ? `${step === 5 ? 'bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border-indigo-500/25' : 'bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/25'} font-bold scale-[1.02]`
                  : 'border-transparent text-muted-foreground'
              }`}>
                <span className="text-[7.5px] uppercase tracking-wider block opacity-80 mb-0.5">Shear V(x)</span>
                <div className="flex-1 flex items-center justify-center overflow-x-auto max-w-full scrollbar-none">
                  <LatexFormula math="-6.675\text{ kN}" />
                </div>
              </div>
              <div className={`p-1 rounded-lg border transition-all duration-300 flex flex-col justify-between ${
                step === 5
                  ? 'bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border-indigo-500/25 font-bold scale-[1.02]'
                  : 'border-transparent text-muted-foreground'
              }`}>
                <span className="text-[7.5px] uppercase tracking-wider block opacity-80 mb-0.5">Moment M(x)</span>
                <div className="flex-1 flex items-center justify-center overflow-x-auto max-w-full scrollbar-none">
                  <LatexFormula math="98.43 - 6.68(x-12)" />
                </div>
              </div>
            </div>

            <div className="space-y-1 pt-1 font-mono text-[9px] leading-relaxed">
              <ClickReveal at={5}>
                <div className="flex items-center justify-between text-indigo-600 dark:text-indigo-400 bg-indigo-50/20 dark:bg-indigo-950/5 px-2 py-0.5 rounded border border-indigo-500/10">
                  <span>Moment Derivative:</span>
                  <div className="overflow-x-auto max-w-full scrollbar-none">
                    <LatexFormula math="\frac{dM}{dx} = \frac{d}{dx}[M] = -6.675 = V" />
                  </div>
                </div>
              </ClickReveal>
              <ClickReveal at={6}>
                <div className="flex items-center justify-between text-rose-600 dark:text-rose-400 bg-rose-50/20 dark:bg-rose-950/5 px-2 py-0.5 rounded border border-rose-500/10">
                  <span>Shear Derivative:</span>
                  <div className="overflow-x-auto max-w-full scrollbar-none">
                    <LatexFormula math="\frac{dV}{dx} = \frac{d}{dx}(-6.675) = 0 = -w" />
                  </div>
                </div>
              </ClickReveal>
            </div>
          </InteractiveCard>

          {/* Segment 4 */}
          <InteractiveCard spacing="space-y-1" className="py-1.5 px-2.5 border-l-4 border-l-amber-500 bg-muted/10">
            <div className="flex justify-between items-center border-b border-border/40 pb-1">
              <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase">Segment 4 (17 to 20 m)</span>
              <span className="text-[9px] font-mono text-muted-foreground">Domain: 17 ≤ x ≤ 20 m</span>
            </div>
            
            <div className="grid grid-cols-3 gap-1.5 text-[9.5px] py-1 border-b border-border/10 font-mono text-center items-stretch">
              <div className={`p-1 rounded-lg border transition-all duration-300 flex flex-col justify-between ${
                step === 8 
                  ? 'bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/25 font-bold scale-[1.02]' 
                  : 'border-transparent text-muted-foreground'
              }`}>
                <span className="text-[7.5px] uppercase tracking-wider block opacity-80 mb-0.5">Load w(x)</span>
                <div className="flex-1 flex items-center justify-center">
                  <LatexFormula math="0" />
                </div>
              </div>
              <div className={`p-1 rounded-lg border transition-all duration-300 flex flex-col justify-between ${
                (step === 7 || step === 8)
                  ? `${step === 7 ? 'bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border-indigo-500/25' : 'bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/25'} font-bold scale-[1.02]`
                  : 'border-transparent text-muted-foreground'
              }`}>
                <span className="text-[7.5px] uppercase tracking-wider block opacity-80 mb-0.5">Shear V(x)</span>
                <div className="flex-1 flex items-center justify-center overflow-x-auto max-w-full scrollbar-none">
                  <LatexFormula math="-21.675\text{ kN}" />
                </div>
              </div>
              <div className={`p-1 rounded-lg border transition-all duration-300 flex flex-col justify-between ${
                step === 7
                  ? 'bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border-indigo-500/25 font-bold scale-[1.02]'
                  : 'border-transparent text-muted-foreground'
              }`}>
                <span className="text-[7.5px] uppercase tracking-wider block opacity-80 mb-0.5">Moment M(x)</span>
                <div className="flex-1 flex items-center justify-center overflow-x-auto max-w-full scrollbar-none">
                  <LatexFormula math="65.05 - 21.68(x-17)" />
                </div>
              </div>
            </div>

            <div className="space-y-1 pt-1 font-mono text-[9px] leading-relaxed">
              <ClickReveal at={7}>
                <div className="flex items-center justify-between text-indigo-600 dark:text-indigo-400 bg-indigo-50/20 dark:bg-indigo-950/5 px-2 py-0.5 rounded border border-indigo-500/10">
                  <span>Moment Derivative:</span>
                  <div className="overflow-x-auto max-w-full scrollbar-none">
                    <LatexFormula math="\frac{dM}{dx} = \frac{d}{dx}[M] = -21.675 = V" />
                  </div>
                </div>
              </ClickReveal>
              <ClickReveal at={8}>
                <div className="flex items-center justify-between text-rose-600 dark:text-rose-400 bg-rose-50/20 dark:bg-rose-950/5 px-2 py-0.5 rounded border border-rose-500/10">
                  <span>Shear Derivative:</span>
                  <div className="overflow-x-auto max-w-full scrollbar-none">
                    <LatexFormula math="\frac{dV}{dx} = \frac{d}{dx}(-21.675) = 0 = -w" />
                  </div>
                </div>
              </ClickReveal>
            </div>
          </InteractiveCard>
        </div>
      </div>

      {/* Clicks registration */}
      <ClickReveal at={1} preset="none"><div className="hidden" /></ClickReveal>
      <ClickReveal at={2} preset="none"><div className="hidden" /></ClickReveal>
      <ClickReveal at={3} preset="none"><div className="hidden" /></ClickReveal>
      <ClickReveal at={4} preset="none"><div className="hidden" /></ClickReveal>
      <ClickReveal at={5} preset="none"><div className="hidden" /></ClickReveal>
      <ClickReveal at={6} preset="none"><div className="hidden" /></ClickReveal>
      <ClickReveal at={7} preset="none"><div className="hidden" /></ClickReveal>
      <ClickReveal at={8} preset="none"><div className="hidden" /></ClickReveal>
    </FullWidthLayout>
  );
};

export default VerifyRelationshipsL2;
