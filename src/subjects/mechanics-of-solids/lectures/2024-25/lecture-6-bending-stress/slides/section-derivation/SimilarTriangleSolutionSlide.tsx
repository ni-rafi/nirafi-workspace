import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, SlideList, SlideEquation, LatexFormula, ClickReveal, ClickHighlight } from '@/features/presentation/components/elements';

export const SimilarTriangleSolutionSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Deformation Solution: Linear Strain"
      leftWidth="50%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-4 text-left select-text">
          <SlideList
            title="Algebraic Reduction"
            description={
              <span>
                {"We simplify the fractional strain expression by canceling common terms ("}
                <LatexFormula math="d\theta" />
                {"):"}
              </span>
            }
            revealMode="each-click"
            items={[
              {
                text: (
                  <span>
                    {"Numerator: "}
                    <LatexFormula math="(R - y) \, d\theta - R \, d\theta = -y \, d\theta" />
                  </span>
                ),
                revealAt: 1,
              },
              {
                text: (
                  <span>
                    {"Denominator: "}
                    <LatexFormula math="R \, d\theta" />
                  </span>
                ),
                revealAt: 2,
              },
              {
                text: (
                  <span>
                    {"Strain result: "}
                    <LatexFormula math="\varepsilon = -\frac{y}{R}" />
                  </span>
                ),
                revealAt: 3,
              },
              {
                text: (
                  <span>
                    {"Magnitude: "}
                    <LatexFormula math="\varepsilon = \frac{y}{R}" />
                    {" (strain is proportional to "}
                    <LatexFormula math="y" />
                    {")"}
                  </span>
                ),
                revealAt: 4,
              },
            ]}
          />
          <SlideParagraph variant="info" className="text-[10px] my-1">
            <strong>Physical Insight:</strong> Strain varies linearly across the beam depth. It is zero at the Neutral Axis (<LatexFormula math="y = 0" />) and maximum at the extreme fibers.
          </SlideParagraph>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-5 flex flex-col items-center justify-center h-full min-h-[260px] text-center">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-6">Simplification Steps</span>
          <div className="space-y-6 w-full text-left">
            <ClickReveal at={5} preset="fade">
              <div className="p-4 bg-background border border-border/40 rounded-xl">
                <span className="text-[9px] font-mono text-muted-foreground block mb-2">Strain Fraction:</span>
                <SlideEquation math="\varepsilon = \frac{R \, d\theta - y \, d\theta - R \, d\theta}{R \, d\theta}" />
              </div>
            </ClickReveal>
            <ClickReveal at={6} preset="fade">
              <div className="p-4 bg-background border border-border/40 rounded-xl">
                <span className="text-[9px] font-mono text-muted-foreground block mb-2">Final Normal Strain Equation:</span>
                <ClickHighlight at={7} variant="rect" className="block">
                  <SlideEquation math="\varepsilon = \frac{y}{R}" />
                </ClickHighlight>
              </div>
            </ClickReveal>
          </div>
        </div>
      }
    />
  );
};

export default SimilarTriangleSolutionSlide;
