import React from 'react';
import { SlideParagraph, SlideList, SlideEquation, LatexFormula, ClickReveal, ClickHighlight } from '@/features/presentation/components/elements';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';

export const FlexureFormulaSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="The Flexure Formula"
      leftWidth="50%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-4 text-left select-text">
          <SlideList
            title="Synthesis of Bending Theory"
            description="We compile both our mechanical and geometric expressions:"
            revealMode="each-click"
            items={[
              {
                text: (
                  <span>
                    {"From stress analysis: "}
                    <LatexFormula math="E / R = \sigma / y" />
                  </span>
                ),
                revealAt: 1,
              },
              {
                text: (
                  <span>
                    {"From moment integration: "}
                    <LatexFormula math="E / R = M / I" />
                  </span>
                ),
                revealAt: 2,
              },
              {
                text: (
                  <span>
                    {"Equating the two: "}
                    <LatexFormula math="\sigma / y = M / I" />
                  </span>
                ),
                revealAt: 3,
              },
              {
                text: (
                  <span>
                    {"Solve for bending stress: "}
                    <LatexFormula math="\sigma = \frac{M \cdot y}{I}" />
                  </span>
                ),
                revealAt: 4,
              },
            ]}
          />
          <SlideParagraph variant="success" className="text-[10px] my-1 font-medium">
            {"This is the fundamental flexure formula. It calculates normal bending stresses anywhere on the beam's cross-section."}
          </SlideParagraph>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-5 flex flex-col items-center justify-center h-full min-h-[260px] text-center">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-6">Governing Bending Equation</span>
          <div className="space-y-6 w-full text-left">
            <ClickReveal at={5} preset="fade">
              <div className="p-4 bg-background border border-border/40 rounded-xl">
                <span className="text-[9px] font-mono text-muted-foreground block mb-2">Flexure Equalities:</span>
                <SlideEquation math="\frac{\sigma}{y} = \frac{M}{I} = \frac{E}{R}" />
              </div>
            </ClickReveal>
            <ClickReveal at={6} preset="fade">
              <div className="p-4 bg-background border-2 border-primary rounded-xl">
                <span className="text-[10px] font-bold text-primary block mb-2">Bending Stress (<LatexFormula math="\sigma" />):</span>
                <ClickHighlight at={7} variant="rect" className="block">
                  <SlideEquation math="\sigma = \frac{M \cdot y}{I}" />
                </ClickHighlight>
              </div>
            </ClickReveal>
          </div>
        </div>
      }
    />
  );
};

export default FlexureFormulaSlide;
