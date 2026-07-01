import React from 'react';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import { LatexFormula, SlideParagraph, SlideBullet, ClickReveal } from '@/features/presentation/components/elements';

export const CalculusLinkL2: React.FC = () => {
  return (
    <FullWidthLayout
      title={<span>The Calculus Link: Maximum Moment & Zero Shear</span>}
    >
      <div className="w-full h-full grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch select-none animate-in fade-in duration-300 text-left">
        {/* Left Column: Interactive math graphic */}
        <div className="lg:col-span-6 flex flex-col justify-center p-4 border border-border/50 bg-muted/20 dark:bg-slate-900/10 rounded-xl min-h-[220px]">
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-bold text-rose-500 uppercase tracking-widest block mb-0.5">Differential Relationship</span>
            <div className="bg-background border border-border/60 rounded-xl p-4 flex items-center justify-center gap-4">
              <div className="text-center font-mono p-2 border border-border bg-muted/30 rounded-lg text-xs font-black min-w-[120px]">
                <LatexFormula math="V(x) = \frac{dM}{dx}" />
              </div>
              <span className="text-[10px] text-muted-foreground leading-snug">
                The shear force is the exact mathematical derivative (slope) of the bending moment function.
              </span>
            </div>

            <ClickReveal at={1}>
              <div className="bg-background border border-border/60 rounded-xl p-4 flex flex-col gap-2">
                <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider block">Finding the Peak of a Parabola:</span>
                <div className="text-[10px] text-foreground leading-relaxed space-y-1.5">
                  <p>
                    From calculus, a function reaches its local maximum/minimum where its first derivative equals zero:
                  </p>
                  <div className="text-center font-mono py-1 text-xs font-black text-rose-500">
                    <LatexFormula math="\frac{dM}{dx} = 0 \implies V(x) = 0" />
                  </div>
                  <p className="text-muted-foreground text-[9px]">
                    Thus, the peak bending moment occurs at the exact position along the span where the shear force diagram crosses the zero line.
                  </p>
                </div>
              </div>
            </ClickReveal>
          </div>
        </div>

        {/* Right Column: Key Takeaways */}
        <div className="lg:col-span-6 flex flex-col justify-start gap-4 text-left">
          <div>
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-0.5">Calculus Core</span>
            <h4 className="text-sm font-bold text-foreground">Why Does <LatexFormula math="V = 0" /> Mark the Peak?</h4>
            <SlideParagraph variant="plain" className="text-[10.5px] text-muted-foreground leading-normal mt-1">
              Since the shear force <LatexFormula math="V" /> is the slope of the moment diagram, the sign of <LatexFormula math="V" /> dictates the direction of the BMD curve.
            </SlideParagraph>
          </div>

          <ClickReveal at={2}>
            <div className="border border-border/40 p-4 bg-muted/10 rounded-xl space-y-2">
              <div className="text-[10px] text-muted-foreground leading-relaxed space-y-2">
                <SlideBullet icon={<span className="text-rose-500 font-bold font-mono">1</span>}>
                  <span><strong>Positive Shear (<LatexFormula math="V > 0" />):</strong> Moment slope is positive. Bending moment is rising.</span>
                </SlideBullet>
                <SlideBullet icon={<span className="text-emerald-500 font-bold font-mono">2</span>}>
                  <span><strong>Zero Shear (<LatexFormula math="V = 0" />):</strong> Moment slope is horizontal. Bending moment peaks.</span>
                </SlideBullet>
                <SlideBullet icon={<span className="text-indigo-500 font-bold font-mono">3</span>}>
                  <span><strong>Negative Shear (<LatexFormula math="V < 0" />):</strong> Moment slope is negative. Bending moment is falling.</span>
                </SlideBullet>
              </div>
            </div>
          </ClickReveal>
        </div>
      </div>

      {/* Clicks registration */}
      <ClickReveal at={1} preset="none"><div className="hidden" /></ClickReveal>
      <ClickReveal at={2} preset="none"><div className="hidden" /></ClickReveal>
    </FullWidthLayout>
  );
};

export default CalculusLinkL2;
