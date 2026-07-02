import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideList } from '@/features/presentation/components/elements';
import { MultiSpanBMD } from './drawings/MultiSpanBMD';

export const Problem04StatementSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Problem 04: Multi-Span Configuration"
      leftWidth="45%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-4 text-left select-text">
          <SlideList
            title="Complex Loading Demands"
            description="An overhanging beam system is subjected to concentrated point loads and a UDL. To size this beam, we must identify the critical positive (sagging) and negative (hogging) moment peaks."
            revealMode="each-click"
            items={[
              { text: "Span A-B: 12 ft length with 20 kips point load at midspan.", revealAt: 1 },
              { text: "Overhang B-C: 4 ft length with 12 kips point load at free end C.", revealAt: 2 },
              { text: "UDL: 1.5 kips/ft across the entire 16 ft length.", revealAt: 3 },
            ]}
          />
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
