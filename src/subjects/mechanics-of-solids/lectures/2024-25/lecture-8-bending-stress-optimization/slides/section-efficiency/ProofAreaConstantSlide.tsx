import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, SlideBullet, SlideEquation } from '@/features/presentation/components/elements';
import { Settings } from 'lucide-react';

export const ProofAreaConstantSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Proof Setup: Area Constant"
      leftWidth="55%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-4 text-left select-text">
          <div>
            <div className="flex items-center space-x-1.5 text-indigo-500 font-bold text-[10px] uppercase mb-1">
              <Settings className="h-4.5 w-4.5" />
              <span>Mathematical constraints</span>
            </div>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground leading-relaxed">
              {"Formulate the width b of the rectangular section in terms of the square side length a and depth d."}
            </SlideParagraph>
          </div>
          <div className="space-y-2 my-2">
            <SlideBullet text="Area of Square = a²" />
            <SlideBullet text="Area of Rectangle = b · d" />
            <SlideBullet text="Set Areas equal: a² = b · d" />
          </div>
          <div className="space-y-1 my-1">
            <SlideEquation math="b = \frac{a^2}{d}" />
          </div>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center h-full min-h-[250px] w-full text-[10px] font-mono leading-relaxed text-muted-foreground">
          <div className="p-4 bg-slate-900 border border-border/40 rounded-xl w-full text-left space-y-2">
            <h4 className="text-indigo-400 font-bold uppercase text-[9px] mb-2">Area Equilibrium</h4>
            <p className="text-emerald-400 font-bold">A = a² = b · d</p>
            <p>Width b is inversely proportional to depth d for constant area constraint!</p>
          </div>
        </div>
      }
    />
  );
};

export default ProofAreaConstantSlide;
