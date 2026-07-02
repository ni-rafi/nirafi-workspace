import React from 'react';
import { SlideParagraph, SlideList, LatexFormula, ClickHighlight } from '@/features/presentation/components/elements';
import { DerivationDrawing } from './drawings/DerivationDrawing';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';

export const BentArcGeometrySlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Bent Arc Geometry"
      leftWidth="50%"
      leftContent={
        <div className="flex flex-col justify-between h-full gap-4 text-left select-text">
          <SlideList
            title="Deformed Geometry"
            description={
              <span>
                {"When moments curl the beam segment, it deforms into an arc of a circle centered at "}
                <LatexFormula math="O" />
                {"."}
              </span>
            }
            revealMode="each-click"
            items={[
              {
                text: (
                  <span>
                    {"Planar faces "}
                    <LatexFormula math="AB" />
                    {" and "}
                    <LatexFormula math="CD" />
                    {" rotate to form angle "}
                    <LatexFormula math="d\theta" />
                    {" (converging at "}
                    <LatexFormula math="O" />
                    {")."}
                  </span>
                ),
                revealAt: 1,
              },
              {
                text: (
                  <span>
                    <LatexFormula math="R" />
                    {" is the Radius of Curvature measured directly to the Neutral Axis ("}
                    <LatexFormula math="R'S'" />
                    {")."}
                  </span>
                ),
                revealAt: 2,
              },
              {
                text: (
                  <span>
                    {"Since NA has zero strain, "}
                    <LatexFormula math="R'S'" />
                    {" remains equal to original length "}
                    <LatexFormula math="dx" />
                    {": "}
                    <LatexFormula math="R'S' = R \, d\theta = dx" />
                    {"."}
                  </span>
                ),
                revealAt: 3,
              },
            ]}
          />
          <SlideParagraph variant="info" className="text-[10px] my-1">
            <span>
              The radius to fiber <LatexFormula math="P'Q'" /> is:
            </span>
            <div className="mt-1 font-mono font-bold text-[10px] text-center text-indigo-500">
              <ClickHighlight at={4} variant="paint">
                <LatexFormula math="\text{Radius}_{\text{fiber}} = R - y" />
              </ClickHighlight>
            </div>
          </SlideParagraph>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-5 flex flex-col items-center justify-center h-full min-h-[260px]">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-4">Bent Arc Geometry</span>
          <DerivationDrawing mode="bent" />
        </div>
      }
    />
  );
};

export default BentArcGeometrySlide;
