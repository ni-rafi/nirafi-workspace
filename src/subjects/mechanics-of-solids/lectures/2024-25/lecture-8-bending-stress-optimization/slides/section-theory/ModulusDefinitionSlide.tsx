import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, SlideBullet, SlideEquation } from '@/features/presentation/components/elements';
import { Settings } from 'lucide-react';

export const ModulusDefinitionSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Mathematical Definition of Z"
      leftWidth="55%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-4 text-left select-text">
          <div>
            <div className="flex items-center space-x-1.5 text-indigo-500 font-bold text-[10px] uppercase mb-1">
              <Settings className="h-4.5 w-4.5" />
              <span>Section Parameterization</span>
            </div>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground leading-relaxed">
              {"By separating the material geometry properties from the external load moment M, we define a single shape parameter: the Section Modulus (Z)."}
            </SlideParagraph>
          </div>
          <div className="space-y-2 my-2">
            <SlideBullet text="Start with the peak flexure formula: σ_max = M * y_max / I." />
            <SlideBullet text="Rearrange terms: σ_max = M / (I / y_max)." />
            <SlideBullet text="Define Section Modulus (Z) as: Z = I / y_max." />
            <SlideBullet text="Yields simplified stress formula: σ_max = M / Z." />
          </div>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center h-full min-h-[250px] w-full text-center">
          <div className="space-y-4 w-full">
            <SlideEquation math="\sigma_{\max} = \frac{M \cdot y_{\max}}{I}" />
            <div className="text-indigo-400 font-bold text-[10px] font-mono">⇓ Rearranging terms</div>
            <SlideEquation math="Z = \frac{I}{y_{\max}}" />
            <div className="text-indigo-400 font-bold text-[10px] font-mono">⇓ Yields</div>
            <SlideEquation math="\sigma_{\max} = \frac{M}{Z}" />
          </div>
        </div>
      }
    />
  );
};

export default ModulusDefinitionSlide;
