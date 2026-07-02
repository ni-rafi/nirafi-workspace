import React from 'react';
import { SlideParagraph, SlideList, SlideEquation, LatexFormula, ClickReveal, ClickHighlight } from '@/features/presentation/components/elements';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';

export const MomentOfInertiaSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Resisting Moment & Moment of Inertia"
      leftWidth="50%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-4 text-left select-text">
          <SlideList
            title="Resisting Moment Integral"
            description={
              <span>
                {"We integrate the differential resisting moments over the entire cross-section area "}
                <LatexFormula math="A" />
                {":"}
              </span>
            }
            revealMode="each-click"
            items={[
              {
                text: (
                  <span>
                    {"Total Moment: "}
                    <LatexFormula math="M = \int dM = \int \frac{E}{R} y^2 \, dA" />
                    {"."}
                  </span>
                ),
                revealAt: 1,
              },
              {
                text: (
                  <span>
                    {"Since "}
                    <LatexFormula math="E" />
                    {" and "}
                    <LatexFormula math="R" />
                    {" are constant, they pull outside the integral: "}
                    <LatexFormula math="M = \frac{E}{R} \int y^2 \, dA" />
                    {"."}
                  </span>
                ),
                revealAt: 2,
              },
              {
                text: (
                  <span>
                    {"The term "}
                    <LatexFormula math="\int y^2 \, dA" />
                    {" is a geometric property of the shape, known as the Moment of Inertia ("}
                    <LatexFormula math="I" />
                    {")."}
                  </span>
                ),
                revealAt: 3,
              },
            ]}
          />
          <SlideParagraph variant="info" className="text-[10px] my-1">
            <span>
              Moment of Inertia (<LatexFormula math="I" />) measures a shape's resistance to rotational bending. Units: <LatexFormula math="\text{mm}^4" /> or <LatexFormula math="\text{m}^4" />.
            </span>
          </SlideParagraph>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-5 flex flex-col items-center justify-center h-full min-h-[260px] text-center">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-6">Integrating total Moment</span>
          <div className="space-y-6 w-full text-left">
            <ClickReveal at={4} preset="fade">
              <div className="p-4 bg-background border border-border/40 rounded-xl">
                <span className="text-[9px] font-mono text-muted-foreground block mb-2">Resisting Moment:</span>
                <SlideEquation math="M = \frac{E}{R} \int y^2 \, dA" />
              </div>
            </ClickReveal>
            <ClickReveal at={5} preset="fade">
              <div className="p-4 bg-background border border-border/40 rounded-xl">
                <span className="text-[9px] font-mono text-muted-foreground block mb-2">Substituting <LatexFormula math="I = \int y^2 dA" />:</span>
                <ClickHighlight at={6} variant="paint" className="block rounded-lg p-1">
                  <SlideEquation math="M = \frac{E}{R} \cdot I \implies \frac{M}{I} = \frac{E}{R}" />
                </ClickHighlight>
              </div>
            </ClickReveal>
          </div>
        </div>
      }
    />
  );
};

export default MomentOfInertiaSlide;
