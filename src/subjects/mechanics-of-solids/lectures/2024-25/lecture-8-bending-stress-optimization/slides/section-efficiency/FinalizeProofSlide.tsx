import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, SlideBullet, SlideEquation } from '@/features/presentation/components/elements';
import { ShieldCheck } from 'lucide-react';

export const FinalizeProofSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Finalizing the Proof (Z_rect > Z_sq)"
      leftWidth="55%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-4 text-left select-text">
          <div>
            <div className="flex items-center space-x-1.5 text-indigo-500 font-bold text-[10px] uppercase mb-1">
              <ShieldCheck className="h-4.5 w-4.5" />
              <span>Bending Efficiency Proof</span>
            </div>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground leading-relaxed">
              {"Evaluate the ratio of the Section Moduli for rectangular and square shapes."}
            </SlideParagraph>
          </div>
          <div className="space-y-2 my-2">
            <SlideBullet text="Section Modulus of Square: Z_sq = a³ / 6" />
            <SlideBullet text="Section Modulus of Rectangle: Z_rect = b · d² / 6" />
            <SlideBullet text="Substitute b = a² / d: Z_rect = (a²/d) · d² / 6 = a² · d / 6" />
          </div>
          <div className="space-y-1 my-1">
            <SlideEquation math="\frac{Z_{\text{rect}}}{Z_{\text{sq}}} = \frac{d}{a}" />
          </div>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center h-full min-h-[250px] w-full text-[10px] font-mono leading-relaxed text-muted-foreground">
          <div className="p-4 bg-slate-900 border border-border/40 rounded-xl w-full text-left space-y-2.5">
            <h4 className="text-indigo-400 font-bold uppercase text-[9px]">Proof Conclusion</h4>
            <p>Since depth d &gt; side a for a deep rectangular section:</p>
            <p className="text-emerald-400 font-bold">Z_rect / Z_sq &gt; 1</p>
            <p className="text-emerald-400 font-bold">Z_rect &gt; Z_sq</p>
            <p>Hence, a rectangular section is stronger than a square of equal area!</p>
          </div>
        </div>
      }
    />
  );
};

export default FinalizeProofSlide;
