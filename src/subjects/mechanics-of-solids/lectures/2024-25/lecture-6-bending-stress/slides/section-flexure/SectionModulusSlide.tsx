import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, SlideBullet, SlideEquation } from '@/features/presentation/components/elements';
import { Settings, Info } from 'lucide-react';

export const SectionModulusSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Section Modulus (Z)"
      leftWidth="50%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-4 text-left select-text">
          <div>
            <div className="flex items-center space-x-1.5 text-indigo-500 font-bold text-[10px] uppercase mb-1">
              <Settings className="h-4.5 w-4.5" />
              <span>Section Properties</span>
            </div>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground leading-relaxed">
              Maximum bending stress occurs at the furthest distance (y_max) from the Neutral Axis.
            </SlideParagraph>
          </div>
          <div className="space-y-2 my-2">
            <SlideBullet text="Maximum Stress formula: σ_max = (M * y_max) / I" />
            <SlideBullet text="Rearrange terms: σ_max = M / (I / y_max)" />
            <SlideBullet text="Define Section Modulus (Z): Z = I / y_max" />
            <SlideBullet text="Simplified maximum stress: σ_max = M / Z" />
          </div>
          <div className="p-3 bg-indigo-500/[0.03] border border-indigo-500/20 rounded-xl text-[9px] text-indigo-600 dark:text-indigo-400 leading-normal flex items-start gap-1.5 font-semibold">
            <Info className="h-4 w-4 shrink-0 mt-0.5" />
            <span>For rectangular section (b x h): I = b h³ / 12, y_max = h / 2 → Z = b h² / 6.</span>
          </div>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-5 flex flex-col items-center justify-center h-full min-h-[260px] text-center">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-6">Section Modulus Definition</span>
          <div className="space-y-6 w-full">
            <div className="p-4 bg-background border border-border/40 rounded-xl">
              <span className="text-[9px] font-mono text-muted-foreground block mb-2">Section Modulus (Z):</span>
              <SlideEquation math="Z = \frac{I}{y_{\max}}" />
            </div>
            <div className="p-4 bg-primary/10 border-2 border-primary rounded-xl">
              <span className="text-[10px] font-bold text-primary block mb-2">Maximum Stress (σ_max):</span>
              <SlideEquation math="\sigma_{\max} = \frac{M}{Z}" />
            </div>
          </div>
        </div>
      }
    />
  );
};

export default SectionModulusSlide;
