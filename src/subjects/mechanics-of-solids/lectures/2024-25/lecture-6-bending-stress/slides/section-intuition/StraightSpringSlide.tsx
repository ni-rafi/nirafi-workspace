import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, SlideBullet } from '@/features/presentation/components/elements';
import { SpringDrawing } from './drawings/SpringDrawing';
import { Play } from 'lucide-react';

export const StraightSpringSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Straight Reference Spring"
      leftWidth="50%"
      leftContent={
        <div className="flex flex-col justify-between h-full gap-4 text-left select-text">
          <div>
            <div className="flex items-center space-x-1.5 text-indigo-500 font-bold text-[10px] uppercase mb-1">
              <Play className="h-4.5 w-4.5" />
              <span>Reference State</span>
            </div>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground leading-relaxed">
              We begin with a straight reference spring in its undeformed, zero-moment state.
            </SlideParagraph>
          </div>
          <div className="space-y-2 my-2">
            <SlideBullet text="All coils are uniform in length and spacing." />
            <SlideBullet text="Vertical boundaries (marked in orange) are perfectly straight and parallel." />
            <SlideBullet text="Every horizontal fiber layer has an identical original length." />
          </div>
          <div className="p-3 bg-muted/20 border border-border/50 rounded-xl text-[9px] text-muted-foreground leading-normal">
            Next, we will isolate these vertical boundaries to track how they rotate when moments are applied.
          </div>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-5 flex flex-col items-center justify-center h-full min-h-[260px]">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-4">Straight Reference State</span>
          <SpringDrawing mode="straight" />
        </div>
      }
    />
  );
};

export default StraightSpringSlide;
