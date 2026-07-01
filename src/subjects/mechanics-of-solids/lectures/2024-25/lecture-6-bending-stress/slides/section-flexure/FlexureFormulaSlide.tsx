import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, SlideBullet, SlideEquation } from '@/features/presentation/components/elements';
import { Sparkles, Star } from 'lucide-react';

export const FlexureFormulaSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="The Flexure Formula"
      leftWidth="50%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-4 text-left select-text">
          <div>
            <div className="flex items-center space-x-1.5 text-indigo-500 font-bold text-[10px] uppercase mb-1">
              <Sparkles className="h-4.5 w-4.5" />
              <span>Synthesis of Bending Theory</span>
            </div>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground leading-relaxed">
              We compile both our mechanical and geometric expressions:
            </SlideParagraph>
          </div>
          <div className="space-y-2 my-2">
            <SlideBullet text="From stress analysis: E / R = σ / y" />
            <SlideBullet text="From moment integration: E / R = M / I" />
            <SlideBullet text="Equating the two: σ / y = M / I" />
            <SlideBullet text="Solve for bending stress: σ = (M * y) / I" />
          </div>
          <div className="p-3 bg-emerald-500/[0.03] border border-emerald-500/20 rounded-xl text-[9px] text-emerald-600 dark:text-emerald-400 leading-normal flex items-start gap-1.5 font-medium">
            <Star className="h-4.5 w-4.5 text-emerald-500 shrink-0 mt-0.5" />
            <span>This is the fundamental flexure formula. It calculates normal bending stresses anywhere on the beam's cross-section.</span>
          </div>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-5 flex flex-col items-center justify-center h-full min-h-[260px] text-center">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-6">Governing Bending Equation</span>
          <div className="space-y-6 w-full">
            <div className="p-4 bg-background border border-border/40 rounded-xl">
              <span className="text-[9px] font-mono text-muted-foreground block mb-2">Flexure Equalities:</span>
              <SlideEquation math="\frac{\sigma}{y} = \frac{M}{I} = \frac{E}{R}" />
            </div>
            <div className="p-4 bg-primary/10 border-2 border-primary rounded-xl">
              <span className="text-[10px] font-bold text-primary block mb-2">Bending Stress (σ):</span>
              <SlideEquation math="\sigma = \frac{M \cdot y}{I}" />
            </div>
          </div>
        </div>
      }
    />
  );
};

export default FlexureFormulaSlide;
