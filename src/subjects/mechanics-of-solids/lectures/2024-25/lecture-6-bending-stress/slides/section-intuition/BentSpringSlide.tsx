import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, SlideList } from '@/features/presentation/components/elements';
import { SpringDrawing } from './drawings/SpringDrawing';

export const BentSpringSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Bent Spring & Guideline Lengths"
      leftWidth="50%"
      leftContent={
        <div className="flex flex-col justify-between h-full gap-4 text-left select-text">
          <SlideList
            title="Deformation Geometry"
            description="When bent, the boundary lines are no longer parallel. They form concentric radial outlines."
            revealMode="each-click"
            items={[
              { text: "The outer curved boundary (large radius) becomes visibly longer.", revealAt: 1 },
              { text: "The inner curved boundary (small radius) becomes visibly shorter.", revealAt: 2 },
              { text: "Somewhere in the middle, a layer must maintain its original length (Neutral Axis).", revealAt: 3 },
            ]}
          />
          <SlideParagraph variant="info" className="text-[10px] my-1">
            {"This proves that fiber strain varies continuously from tension on one edge to compression on the other."}
          </SlideParagraph>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-5 flex flex-col items-center justify-center h-full min-h-[260px]">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-4">Bent State (Concentric Curves)</span>
          <SpringDrawing mode="bent" />
        </div>
      }
    />
  );
};

export default BentSpringSlide;
