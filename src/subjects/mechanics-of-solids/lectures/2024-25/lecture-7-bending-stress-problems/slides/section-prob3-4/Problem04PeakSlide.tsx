import React from 'react';
import { SlideList, LatexFormula, InteractiveCard } from '@/features/presentation/components/elements';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';

export const Problem04PeakSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Problem 04: Isolating Competing Moment Peaks"
      leftWidth="50%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-4 text-left select-text">
          <SlideList
            title="Design Envelope Demands"
            description="From the BMD, we extract the maximum positive (sagging) and negative (hogging) moment peaks to establish governing parameters."
            revealMode="each-click"
            items={[
              { text: <span>Max Positive Moment: occurs in span A-B, <LatexFormula math="+108\text{ kip}\cdot\text{ft}" />. Top fibers in compression, bottom in tension.</span>, revealAt: 1 },
              { text: <span>Max Negative Moment: occurs at support B, <LatexFormula math="-48\text{ kip}\cdot\text{ft}" />. Top fibers in tension, bottom in compression.</span>, revealAt: 2 },
            ]}
          />
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center h-full min-h-[250px] w-full text-[10px] font-mono leading-relaxed text-muted-foreground">
          <InteractiveCard title="Critical Moment Values" className="w-full text-left">
            <div className="space-y-3 text-xs text-foreground font-mono">
              <div>
                <p className="text-emerald-500 font-bold">M_max (Positive) = +108 kip&middot;ft</p>
                <p className="text-muted-foreground text-[8px] mt-0.5">= 108,000 lb&middot;ft = 1,296,000 lb&middot;in</p>
              </div>
              <div>
                <p className="text-emerald-500 font-bold">M_max (Negative) = -48 kip&middot;ft</p>
                <p className="text-muted-foreground text-[8px] mt-0.5">= 48,000 lb&middot;ft = 576,000 lb&middot;in</p>
              </div>
            </div>
          </InteractiveCard>
        </div>
      }
    />
  );
};

export default Problem04PeakSlide;
