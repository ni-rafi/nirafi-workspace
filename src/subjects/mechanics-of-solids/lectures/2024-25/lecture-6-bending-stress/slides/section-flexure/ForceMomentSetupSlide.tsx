import React from 'react';
import { SlideParagraph, SlideList, LatexFormula } from '@/features/presentation/components/elements';
import { CrossSectionElementDrawing } from './drawings/CrossSectionElementDrawing';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';

export const ForceMomentSetupSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Differential Force & Resisting Moment"
      leftWidth="50%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-4 text-left select-text">
          <SlideList
            title="Cross-Section Analysis"
            description={
              <span>
                {"We look at an elemental area strip "}
                <LatexFormula math="dA" />
                {" of the cross section at a distance "}
                <LatexFormula math="y" />
                {" from the Neutral Axis."}
              </span>
            }
            revealMode="each-click"
            items={[
              {
                text: (
                  <span>
                    {"Differential force on strip "}
                    <LatexFormula math="dA" />
                    {": "}
                    <LatexFormula math="dF = \sigma \, dA = \frac{E}{R} y \, dA" />
                  </span>
                ),
                revealAt: 1,
              },
              {
                text: (
                  <span>
                    {"Differential resisting moment: "}
                    <LatexFormula math="dM = dF \cdot y = \frac{E}{R} y^2 \, dA" />
                  </span>
                ),
                revealAt: 2,
              },
              {
                text: (
                  <span>
                    {"To find the total resisting moment "}
                    <LatexFormula math="M" />, we must integrate these moments across the entire area.
                  </span>
                ),
                revealAt: 3,
              },
            ]}
          />
          <SlideParagraph variant="info" className="text-[10px] my-1">
            {"Resisting Moment M equals the externally applied bending moment in static equilibrium."}
          </SlideParagraph>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center h-full min-h-[260px]">
          <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest block mb-2">Differential Area Strip</span>
          <CrossSectionElementDrawing />
        </div>
      }
    />
  );
};

export default ForceMomentSetupSlide;
