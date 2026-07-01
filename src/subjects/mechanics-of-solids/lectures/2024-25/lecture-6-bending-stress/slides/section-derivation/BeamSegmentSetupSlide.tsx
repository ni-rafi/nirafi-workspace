import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, SlideBullet } from '@/features/presentation/components/elements';
import { DerivationDrawing } from './drawings/DerivationDrawing';
import { Settings } from 'lucide-react';

export const BeamSegmentSetupSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Infinitesimal Beam Segment (dx) Setup"
      leftWidth="50%"
      leftContent={
        <div className="flex flex-col justify-between h-full gap-4 text-left select-text">
          <div>
            <div className="flex items-center space-x-1.5 text-indigo-500 font-bold text-[10px] uppercase mb-1">
              <Settings className="h-4.5 w-4.5" />
              <span>Reference Coordinates</span>
            </div>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground leading-relaxed">
              We isolate a tiny segment of a horizontal, straight beam under moments:
            </SlideParagraph>
          </div>
          <div className="space-y-2 my-2">
            <SlideBullet text="The segment has length dx, bounded by plane cross-sections AB and CD." />
            <SlideBullet text="RS represents the Neutral Axis (NA) layer." />
            <SlideBullet text="We select an arbitrary fiber layer PQ at a vertical distance y above the Neutral Axis." />
          </div>
          <div className="p-3 bg-muted/20 border border-border/50 rounded-xl text-[9px] text-muted-foreground leading-normal">
            Before loading, fiber length PQ is exactly equal to NA length RS:
            <div className="mt-1 font-mono font-bold text-[10px] text-center text-indigo-500">
              PQ = RS = dx
            </div>
          </div>
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
