import React from 'react';
import { SlideParagraph, SlideList, LatexFormula } from '@/features/presentation/components/elements';
import { DerivationDrawing } from './drawings/DerivationDrawing';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';

export const ComparativeSynthesisSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Comparative Synthesis"
      leftWidth="45%"
      leftContent={
        <div className="flex flex-col justify-between h-full gap-4 text-left select-text">
          <SlideList
            title="Comparative Tracking"
            description="Let's track how fiber layers map from straight to bent states:"
            revealMode="each-click"
            items={[
              {
                text: (
                  <span>
                    {"Neutral Axis: "}
                    <LatexFormula math="RS" />
                    {" (straight) maps to "}
                    <LatexFormula math="R'S'" />
                    {" (bent). Length remains constant: "}
                    <LatexFormula math="RS = R'S' = dx" />
                    {"."}
                  </span>
                ),
                revealAt: 1,
              },
              {
                text: (
                  <span>
                    {"Fiber at height "}
                    <LatexFormula math="y" />
                    {": "}
                    <LatexFormula math="PQ" />
                    {" (straight) maps to "}
                    <LatexFormula math="P'Q'" />
                    {" (bent). Length changes: "}
                    <LatexFormula math="PQ = dx \rightarrow P'Q' = (R - y) \, d\theta" />
                    {"."}
                  </span>
                ),
                revealAt: 2,
              },
            ]}
          />
          <SlideParagraph variant="info" className="text-[10px] my-1">
            {"This geometric change in fiber length directly yields the normal strain formulation."}
          </SlideParagraph>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center h-full min-h-[260px]">
          <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest block mb-2">Straight vs Bent Element</span>
          <DerivationDrawing mode="both" />
        </div>
      }
    />
  );
};

export default ComparativeSynthesisSlide;
