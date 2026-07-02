import React from 'react';
import { SlideList, SlideEquation, LatexFormula, ClickReveal, ClickHighlight } from '@/features/presentation/components/elements';
import TwoColumnLayout from '@/shared/layouts/TwoColumnLayout';

export const ModulusDefinitionSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Mathematical Definition of Z"
      leftWidth="55%"
      leftContent={
        <div className="flex flex-col gap-4 text-left select-text">
          <SlideList
            title="Section Parameterization"
            description={
              <span>
                By separating the material geometry properties from the external load moment <LatexFormula math="M" />, we define a single shape parameter: the Section Modulus (<LatexFormula math="Z" />).
              </span>
            }
            revealMode="each-click"
            items={[
              { text: <span>Start with the peak flexure formula: <LatexFormula math="\sigma_{\max} = \frac{M \cdot y_{\max}}{I}" />.</span>, revealAt: 1 },
              { text: <span>Rearrange terms: <LatexFormula math="\sigma_{\max} = \frac{M}{I / y_{\max}}" />.</span>, revealAt: 2 },
              { text: <span>Define Section Modulus (<LatexFormula math="Z" />) as: <LatexFormula math="Z = \frac{I}{y_{\max}}" />.</span>, revealAt: 3 },
              { text: <span>Yields simplified stress formula: <LatexFormula math="\sigma_{\max} = \frac{M}{Z}" />.</span>, revealAt: 4 },
            ]}
          />
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center h-full min-h-[250px] w-full text-center select-text">
          <div className="space-y-4 w-full text-left">
            <ClickReveal at={1} preset="fade">
              <div className="p-3.5 bg-background border border-border/40 rounded-xl">
                <span className="text-[9px] font-mono text-muted-foreground block mb-1.5">Peak Flexure Formula:</span>
                <SlideEquation math="\sigma_{\max} = \frac{M \cdot y_{\max}}{I}" />
              </div>
            </ClickReveal>
            <ClickReveal at={2} preset="fade">
              <div className="p-3.5 bg-background border border-border/40 rounded-xl">
                <span className="text-[9px] font-mono text-muted-foreground block mb-1.5">Rearranging terms:</span>
                <SlideEquation math="Z = \frac{I}{y_{\max}}" />
              </div>
            </ClickReveal>
            <ClickReveal at={3} preset="fade">
              <span className="text-indigo-500 dark:text-indigo-400 font-bold text-[10px] font-mono text-center block">⇓ Yields</span>
            </ClickReveal>
            <ClickReveal at={4} preset="fade">
              <div className="p-3.5 bg-background border border-border/40 rounded-xl">
                <span className="text-[9px] font-mono text-muted-foreground block mb-1.5">Simplified Flexure stress:</span>
                <ClickHighlight at={4} variant="rect" className="block">
                  <SlideEquation math="\sigma_{\max} = \frac{M}{Z}" />
                </ClickHighlight>
              </div>
            </ClickReveal>
          </div>
        </div>
      }
    />
  );
};

export default ModulusDefinitionSlide;
