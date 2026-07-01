import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, SlideBullet, SlideEquation } from '@/features/presentation/components/elements';
import { Binary, Info } from 'lucide-react';

export const StrainDefinitionSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Normal Strain Definition"
      leftWidth="50%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-4 text-left select-text">
          <div>
            <div className="flex items-center space-x-1.5 text-indigo-500 font-bold text-[10px] uppercase mb-1">
              <Binary className="h-4.5 w-4.5" />
              <span>Mathematical Definition</span>
            </div>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground leading-relaxed">
              Normal strain (ε) represents the fractional change in length of a material fiber layer.
            </SlideParagraph>
          </div>
          <div className="space-y-2 my-2">
            <SlideBullet text="Original Length: L_0 = PQ = dx = R dθ" />
            <SlideBullet text="Final Length: L = P'Q' = (R - y) dθ" />
            <SlideBullet text="Change in Length: δL = P'Q' - PQ" />
          </div>
          <div className="p-3 bg-indigo-500/[0.03] border border-indigo-500/20 rounded-xl text-[9px] text-indigo-600 dark:text-indigo-400 leading-normal flex items-start gap-1.5">
            <Info className="h-4 w-4 shrink-0 mt-0.5" />
            <span>Next, we will substitute these geometric relationships into our strain definition.</span>
          </div>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-5 flex flex-col items-center justify-center h-full min-h-[260px] text-center">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-6">Strain Formulation</span>
          <div className="space-y-6 w-full">
            <div className="p-4 bg-background border border-border/40 rounded-xl">
              <span className="text-[9px] font-mono text-muted-foreground block mb-2">Base Equation:</span>
              <SlideEquation math="\varepsilon = \frac{\delta L}{L_0} = \frac{P'Q' - PQ}{PQ}" />
            </div>
            <div className="p-4 bg-background border border-border/40 rounded-xl">
              <span className="text-[9px] font-mono text-muted-foreground block mb-2">Substituting Geometric Outlines:</span>
              <SlideEquation math="\varepsilon = \frac{(R - y) d\theta - R d\theta}{R d\theta}" />
            </div>
          </div>
        </div>
      }
    />
  );
};

export default StrainDefinitionSlide;
