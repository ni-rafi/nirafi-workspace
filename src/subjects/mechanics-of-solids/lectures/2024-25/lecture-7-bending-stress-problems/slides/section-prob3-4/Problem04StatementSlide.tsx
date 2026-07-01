import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, SlideBullet } from '@/features/presentation/components/elements';
import { MultiSpanBMD } from './drawings/MultiSpanBMD';
import { HelpCircle } from 'lucide-react';

export const Problem04StatementSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Problem 04: Multi-Span Configuration"
      leftWidth="45%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-4 text-left select-text">
          <div>
            <div className="flex items-center space-x-1.5 text-indigo-500 font-bold text-[10px] uppercase mb-1">
              <HelpCircle className="h-4.5 w-4.5" />
              <span>Complex Loading Demands</span>
            </div>
            <SlideParagraph variant="plain" className="text-xs text-foreground font-semibold leading-relaxed">
              {"An overhanging beam system is subjected to concentrated point loads and a UDL. To size this beam, we must identify the critical positive (sagging) and negative (hogging) moment peaks."}
            </SlideParagraph>
          </div>
          <div className="space-y-1.5 my-1">
            <SlideBullet text="Span A-B: 12 ft length with 20 kips point load at midspan." />
            <SlideBullet text="Overhang B-C: 4 ft length with 12 kips point load at free end C." />
            <SlideBullet text="UDL: 1.5 kips/ft across the entire 16 ft length." />
          </div>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center h-full min-h-[250px] w-full">
          <MultiSpanBMD />
        </div>
      }
    />
  );
};

export default Problem04StatementSlide;
