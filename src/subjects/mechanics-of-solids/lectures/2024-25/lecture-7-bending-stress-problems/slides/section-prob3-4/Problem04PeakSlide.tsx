import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, SlideBullet } from '@/features/presentation/components/elements';
import { ShieldCheck } from 'lucide-react';

export const Problem04PeakSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Problem 04: Isolating Competing Moment Peaks"
      leftWidth="50%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-4 text-left select-text">
          <div>
            <div className="flex items-center space-x-1.5 text-indigo-500 font-bold text-[10px] uppercase mb-1">
              <ShieldCheck className="h-4.5 w-4.5" />
              <span>Design envelope demands</span>
            </div>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground leading-relaxed">
              {"From the BMD, we extract the maximum positive (sagging) and negative (hogging) moment peaks to establish governing parameters."}
            </SlideParagraph>
          </div>
          <div className="space-y-2 my-2">
            <SlideBullet text="Max Positive Moment: occurs in span A-B, +108 kip·ft. Top fibers in compression, bottom in tension." />
            <SlideBullet text="Max Negative Moment: occurs at support B, -48 kip·ft. Top fibers in tension, bottom in compression." />
          </div>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center h-full min-h-[250px] w-full text-[10px] font-mono leading-relaxed text-muted-foreground">
          <div className="p-4 bg-slate-900 border border-border/40 rounded-xl w-full text-left space-y-3">
            <h4 className="text-indigo-400 font-bold uppercase text-[9px]">Critical Moment Values</h4>
            <div>
              <p className="text-emerald-400 font-bold">M_max (Positive) = +108 kip·ft</p>
              <p className="text-muted-foreground text-[8px] mt-0.5">= 108,000 lb·ft = 1,296,000 lb·in</p>
            </div>
            <div>
              <p className="text-emerald-400 font-bold">M_max (Negative) = -48 kip·ft</p>
              <p className="text-muted-foreground text-[8px] mt-0.5">= 48,000 lb·ft = 576,000 lb·in</p>
            </div>
          </div>
        </div>
      }
    />
  );
};

export default Problem04PeakSlide;
