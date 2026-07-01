import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, SlideBullet } from '@/features/presentation/components/elements';
import { SpringDrawing } from './drawings/SpringDrawing';
import { RotateCw } from 'lucide-react';

export const BentSpringSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Bent Spring & Guideline Lengths"
      leftWidth="50%"
      leftContent={
        <div className="flex flex-col justify-between h-full gap-4 text-left select-text">
          <div>
            <div className="flex items-center space-x-1.5 text-indigo-500 font-bold text-[10px] uppercase mb-1">
              <RotateCw className="h-4.5 w-4.5" />
              <span>Deformation Geometry</span>
            </div>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground leading-relaxed">
              When bent, the boundary lines are no longer parallel. They form concentric radial outlines.
            </SlideParagraph>
          </div>
          <div className="space-y-2 my-2">
            <SlideBullet text="The outer curved boundary (large radius) becomes visibly longer." />
            <SlideBullet text="The inner curved boundary (small radius) becomes visibly shorter." />
            <SlideBullet text="Somewhere in the middle, a layer must maintain its original length (Neutral Axis)." />
          </div>
          <div className="p-3 bg-muted/20 border border-border/50 rounded-xl text-[9px] text-muted-foreground leading-normal">
            This proves that fiber strain varies continuously from tension on one edge to compression on the other.
          </div>
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
