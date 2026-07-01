import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, SlideBullet, SlideEquation } from '@/features/presentation/components/elements';
import { Sparkles, Info } from 'lucide-react';

export const SimilarTriangleSolutionSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Deformation Solution: Linear Strain"
      leftWidth="50%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-4 text-left select-text">
          <div>
            <div className="flex items-center space-x-1.5 text-indigo-500 font-bold text-[10px] uppercase mb-1">
              <Sparkles className="h-4.5 w-4.5" />
              <span>Algebraic Reduction</span>
            </div>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground leading-relaxed">
              We simplify the fractional strain expression by canceling common terms ($d\theta$):
            </SlideParagraph>
          </div>
          <div className="space-y-2 my-2">
            <SlideBullet text="Numerator: (R - y)dθ - R dθ = -y dθ" />
            <SlideBullet text="Denominator: R dθ" />
            <SlideBullet text="Strain result: ε = -y / R" />
            <SlideBullet text="Magnitude: ε = y / R (strain is proportional to y)." />
          </div>
          <div className="p-3 bg-indigo-500/[0.03] border border-indigo-500/20 rounded-xl text-[9px] text-indigo-600 dark:text-indigo-400 leading-normal flex items-start gap-1.5">
            <Info className="h-4 w-4 shrink-0 mt-0.5" />
            <span><strong>Physical Insight:</strong> Strain varies linearly across the beam depth. It is zero at the Neutral Axis (y = 0) and maximum at the extreme fibers.</span>
          </div>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-5 flex flex-col items-center justify-center h-full min-h-[260px] text-center">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-6">Simplification Steps</span>
          <div className="space-y-6 w-full">
            <div className="p-4 bg-background border border-border/40 rounded-xl">
              <span className="text-[9px] font-mono text-muted-foreground block mb-2">Strain Fraction:</span>
              <SlideEquation math="\varepsilon = \frac{R d\theta - y d\theta - R d\theta}{R d\theta}" />
            </div>
            <div className="p-4 bg-background border border-border/40 rounded-xl">
              <span className="text-[9px] font-mono text-muted-foreground block mb-2">Final Normal Strain Equation:</span>
              <SlideEquation math="\varepsilon = \frac{y}{R}" />
            </div>
          </div>
        </div>
      }
    />
  );
};

export default SimilarTriangleSolutionSlide;
