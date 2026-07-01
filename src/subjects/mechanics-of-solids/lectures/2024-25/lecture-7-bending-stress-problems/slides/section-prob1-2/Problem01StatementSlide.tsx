import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, SlideBullet } from '@/features/presentation/components/elements';
import { HelpCircle } from 'lucide-react';

export const Problem01StatementSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Problem 01: Statement & Inputs"
      leftWidth="55%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-4 text-left select-text">
          <div>
            <div className="flex items-center space-x-1.5 text-indigo-500 font-bold text-[10px] uppercase mb-1">
              <HelpCircle className="h-4.5 w-4.5" />
              <span>Problem Prompt</span>
            </div>
            <SlideParagraph variant="plain" className="text-xs text-foreground font-semibold leading-relaxed">
              {"A rectangular beam 60 mm wide and 150 mm deep is simply supported over a span of 4 metres. If the beam is subjected to a uniformly distributed load of 4.5 kN/m, find the maximum bending stress induced in the beam and sketch the bending stress distribution."}
            </SlideParagraph>
          </div>
          <div className="space-y-1 my-1">
            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest block mb-0.5">Identified Inputs</span>
            <SlideBullet text="Width (b) = 60 mm" />
            <SlideBullet text="Depth (h) = 150 mm" />
            <SlideBullet text="Span (L) = 4 m" />
            <SlideBullet text="UDL (w) = 4.5 kN/m" />
          </div>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center h-full min-h-[250px] w-full">
          <svg viewBox="0 0 160 160" className="w-[140px] h-[140px] overflow-visible">
            <rect x={45} y={30} width={70} height={100} fill="rgba(99, 102, 241, 0.08)" stroke="var(--foreground)" strokeWidth={1.5} />
            <line x1={45} y1={140} x2={115} y2={140} stroke="var(--muted-foreground)" strokeWidth={0.8} />
            <text x={80} y={150} textAnchor="middle" className="fill-muted-foreground text-[8px] font-bold">b = 60 mm</text>
            <line x1={30} y1={30} x2={30} y2={130} stroke="var(--muted-foreground)" strokeWidth={0.8} />
            <text x={20} y={83} textAnchor="middle" className="fill-muted-foreground text-[8px] font-bold">h = 150 mm</text>
            <circle cx={80} cy={80} r={2} fill="var(--destructive)" />
            <line x1={40} y1={80} x2={120} y2={80} stroke="var(--destructive)" strokeWidth={1} strokeDasharray="3,1" opacity={0.6} />
            <text x={125} y={83} className="fill-destructive text-[8px] font-bold">N.A.</text>
          </svg>
        </div>
      }
    />
  );
};

export default Problem01StatementSlide;
