import React from 'react';
import { SlideParagraph, SlideList, LatexFormula, ClickHighlight } from '@/features/presentation/components/elements';
import { DerivationDrawing } from './drawings/DerivationDrawing';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';

export const BeamSegmentSetupSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Infinitesimal Beam Segment (dx) Setup"
      leftWidth="50%"
      leftContent={
        <div className="flex flex-col justify-between h-full gap-4 text-left select-text">
          <SlideList
            title="Reference Coordinates"
            description="We isolate a tiny segment of a horizontal, straight beam under moments:"
            revealMode="each-click"
            items={[
              {
                text: (
                  <span>
                    {"The segment has length "}
                    <LatexFormula math="dx" />
                    {", bounded by plane cross-sections "}
                    <LatexFormula math="AB" />
                    {" and "}
                    <LatexFormula math="CD" />
                    {"."}
                  </span>
                ),
                revealAt: 1,
              },
              {
                text: (
                  <span>
                    <LatexFormula math="RS" />
                    {" represents the Neutral Axis (NA) layer."}
                  </span>
                ),
                revealAt: 2,
              },
              {
                text: (
                  <span>
                    {"We select an arbitrary fiber layer "}
                    <LatexFormula math="PQ" />
                    {" at a vertical distance "}
                    <LatexFormula math="y" />
                    {" above the Neutral Axis."}
                  </span>
                ),
                revealAt: 3,
              },
            ]}
          />
          <SlideParagraph variant="info" className="text-[10px] my-1">
            <span>
              Before loading, fiber length <LatexFormula math="PQ" /> is exactly equal to NA length <LatexFormula math="RS" />:
            </span>
            <div className="mt-1 font-mono font-bold text-[10px] text-center text-indigo-500">
              <ClickHighlight at={4} variant="paint">
                <LatexFormula math="PQ = RS = dx" />
              </ClickHighlight>
            </div>
          </SlideParagraph>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-5 flex flex-col items-center justify-center h-full min-h-[260px]">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-4">Straight Segment dx</span>
          <DerivationDrawing mode="straight" />
        </div>
      }
    />
  );
};

export default BeamSegmentSetupSlide;
