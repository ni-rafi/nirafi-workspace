import React from 'react';
import { SlideParagraph, SlideList, SlideEquation, LatexFormula, ClickReveal, ClickHighlight } from '@/features/presentation/components/elements';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';

export const SectionModulusSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Section Modulus (Z)"
      leftWidth="50%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-4 text-left select-text">
          <SlideList
            title="Section Properties"
            description={
              <span>
                {"Maximum bending stress occurs at the furthest distance ("}
                <LatexFormula math="y_{\max}" />
                {") from the Neutral Axis."}
              </span>
            }
            revealMode="each-click"
            items={[
              {
                text: (
                  <span>
                    {"Maximum Stress formula: "}
                    <LatexFormula math="\sigma_{\max} = \frac{M \cdot y_{\max}}{I}" />
                    {"."}
                  </span>
                ),
                revealAt: 1,
              },
              {
                text: (
                  <span>
                    {"Rearrange terms: "}
                    <LatexFormula math="\sigma_{\max} = \frac{M}{I / y_{\max}}" />
                    {"."}
                  </span>
                ),
                revealAt: 2,
              },
              {
                text: (
                  <span>
                    {"Define Section Modulus ("}
                    <LatexFormula math="Z" />
                    {"): "}
                    <LatexFormula math="Z = \frac{I}{y_{\max}}" />
                    {"."}
                  </span>
                ),
                revealAt: 3,
              },
              {
                text: (
                  <span>
                    {"Simplified maximum stress: "}
                    <LatexFormula math="\sigma_{\max} = \frac{M}{Z}" />
                    {"."}
                  </span>
                ),
                revealAt: 4,
              },
            ]}
          />
          <SlideParagraph variant="info" className="text-[10px] my-1 font-semibold">
            <span>
              For rectangular section (<LatexFormula math="b \times h" />): <LatexFormula math="I = \frac{b \cdot h^3}{12}" />, <LatexFormula math="y_{\max} = \frac{h}{2} \implies Z = \frac{b \cdot h^2}{6}" />.
            </span>
          </SlideParagraph>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-5 flex flex-col items-center justify-center h-full min-h-[260px] text-center">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-6">Section Modulus Definition</span>
          <div className="space-y-6 w-full text-left">
            <ClickReveal at={5} preset="fade">
              <div className="p-4 bg-background border border-border/40 rounded-xl">
                <span className="text-[9px] font-mono text-muted-foreground block mb-2">Section Modulus (<LatexFormula math="Z" />):</span>
                <SlideEquation math="Z = \frac{I}{y_{\max}}" />
              </div>
            </ClickReveal>
            <ClickReveal at={6} preset="fade">
              <div className="p-4 bg-background border-2 border-primary rounded-xl">
                <span className="text-[10px] font-bold text-primary block mb-2">Maximum Stress (<LatexFormula math="\sigma_{\max}" />):</span>
                <ClickHighlight at={7} variant="rect" className="block">
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

export default SectionModulusSlide;
