import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, SlideBullet } from '@/features/presentation/components/elements';
import { DerivationDrawing } from './drawings/DerivationDrawing';
import { Columns } from 'lucide-react';

export const ComparativeSynthesisSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Comparative Synthesis"
      leftWidth="45%"
      leftContent={
        <div className="flex flex-col justify-between h-full gap-4 text-left select-text">
          <div>
            <div className="flex items-center space-x-1.5 text-indigo-500 font-bold text-[10px] uppercase mb-1">
              <Columns className="h-4.5 w-4.5" />
              <span>Comparative Tracking</span>
            </div>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground leading-relaxed">
              Let's track how fiber layers map from straight to bent states:
            </SlideParagraph>
          </div>
          <div className="space-y-2 my-2">
            <SlideBullet text="Neutral Axis: RS (straight) maps to R'S' (bent). Length remains constant: RS = R'S' = dx." />
            <SlideBullet text="Fiber at height y: PQ (straight) maps to P'Q' (bent). Length changes: PQ = dx → P'Q' = (R - y) dθ." />
          </div>
          <div className="p-3 bg-indigo-500/[0.03] border border-indigo-500/20 rounded-xl text-[9px] text-indigo-600 dark:text-indigo-400 leading-normal font-medium">
            This geometric change in fiber length directly yields the normal strain formulation.
          </div>
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
