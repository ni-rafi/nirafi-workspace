import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, SlideBullet } from '@/features/presentation/components/elements';
import { SpringDrawing } from './drawings/SpringDrawing';
import { Eye } from 'lucide-react';

export const IsolatedBoundariesSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Isolated Parallel Boundaries"
      leftWidth="50%"
      leftContent={
        <div className="flex flex-col justify-between h-full gap-4 text-left select-text">
          <div>
            <div className="flex items-center space-x-1.5 text-indigo-500 font-bold text-[10px] uppercase mb-1">
              <Eye className="h-4.5 w-4.5" />
              <span>Geometric Isolation</span>
            </div>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground leading-relaxed">
              By removing the spring coils, we isolate the boundaries to focus purely on the geometric outlines.
            </SlideParagraph>
          </div>
          <div className="space-y-2 my-2">
            <SlideBullet text="The orange parallel lines represent plane cross-sections of a beam." />
            <SlideBullet text="Before bending, the distance between boundaries is uniform at all heights." />
            <SlideBullet text="No normal strains are present in this undeformed condition." />
          </div>
          <div className="p-3 bg-muted/20 border border-border/50 rounded-xl text-[9px] text-muted-foreground leading-normal">
            Now, let's watch these plane lines rotate when we bend the spring quadrant.
          </div>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-5 flex flex-col items-center justify-center h-full min-h-[260px]">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-4">Isolated Boundaries</span>
          <SpringDrawing mode="boundaries-only" />
        </div>
      }
    />
  );
};

export default IsolatedBoundariesSlide;
