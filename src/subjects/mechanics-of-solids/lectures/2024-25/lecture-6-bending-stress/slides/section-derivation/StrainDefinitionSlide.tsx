import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, SlideList, SlideEquation, LatexFormula, ClickHighlight, ClickReveal } from '@/features/presentation/components/elements';

export const StrainDefinitionSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Normal Strain Definition"
      leftWidth="50%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-4 text-left select-text">
          <SlideList
            title="Mathematical Definition"
            description={
              <span>
                {"Normal strain ("}
                <LatexFormula math="\varepsilon" />
                {") represents the fractional change in length of a material fiber layer."}
              </span>
            }
            revealMode="each-click"
            items={[
              {
                text: (
                  <span>
                    {"Original Length: "}
                    <LatexFormula math="L_0 = PQ = dx = R \, d\theta" />
                  </span>
                ),
                revealAt: 1,
              },
              {
                text: (
                  <span>
                    {"Final Length: "}
                    <LatexFormula math="L = P'Q' = (R - y) \, d\theta" />
                  </span>
                ),
                revealAt: 2,
              },
              {
                text: (
                  <span>
                    {"Change in Length: "}
                    <LatexFormula math="\delta L = P'Q' - PQ" />
                  </span>
                ),
                revealAt: 3,
              },
            ]}
          />
          <SlideParagraph variant="info" className="text-[10px] my-1">
            {"Next, we will substitute these geometric relationships into our strain definition."}
          </SlideParagraph>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-5 flex flex-col items-center justify-center h-full min-h-[260px] text-center">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-6">Strain Formulation</span>
          <div className="space-y-6 w-full text-left">
            <ClickReveal at={4} preset="fade">
              <div className="p-4 bg-background border border-border/40 rounded-xl">
                <span className="text-[9px] font-mono text-muted-foreground block mb-2">Base Equation:</span>
                <SlideEquation math="\varepsilon = \frac{\delta L}{L_0} = \frac{P'Q' - PQ}{PQ}" />
              </div>
            </ClickReveal>
            <ClickReveal at={5} preset="fade">
              <div className="p-4 bg-background border border-border/40 rounded-xl">
                <span className="text-[9px] font-mono text-muted-foreground block mb-2">Substituting Geometric Outlines:</span>
                <ClickHighlight at={6} variant="paint" className="block rounded-lg p-1">
                  <SlideEquation math="\varepsilon = \frac{(R - y) d\theta - R d\theta}{R d\theta}" />
                </ClickHighlight>
              </div>
            </ClickReveal>
          </div>
        </div>
      }
    />
  );
};

export default StrainDefinitionSlide;
