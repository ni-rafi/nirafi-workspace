import React from 'react';
import { SlideList, LatexFormula } from '@/features/presentation/components/elements';
import { ExpandableDrawing } from '@/shared/components';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';

export const Problem01StatementSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Problem 01: Statement & Inputs"
      leftWidth="55%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-4 text-left select-text">
          <SlideList
            title="Problem Prompt"
            description="A rectangular beam 60 mm wide and 150 mm deep is simply supported over a span of 4 metres. If the beam is subjected to a uniformly distributed load of 4.5 kN/m, find the maximum bending stress induced in the beam and sketch the bending stress distribution."
            revealMode="each-click"
            items={[
              { text: <span>Width (<LatexFormula math="b" />) = 60 mm</span>, revealAt: 1 },
              { text: <span>Depth (<LatexFormula math="h" />) = 150 mm</span>, revealAt: 2 },
              { text: <span>Span (<LatexFormula math="L" />) = 4 m</span>, revealAt: 3 },
              { text: <span>UDL (<LatexFormula math="w" />) = 4.5 kN/m</span>, revealAt: 4 },
            ]}
          />
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center h-full min-h-[250px] w-full">
          <ExpandableDrawing title="Beam Cross-Section Profile" description="Displays the 60mm x 150mm rectangular cross-section displaying centroid and neutral axis.">
            <svg viewBox="0 0 160 160" className="w-[120px] h-[120px] overflow-visible">
              <rect x={45} y={30} width={70} height={100} fill="rgba(99, 102, 241, 0.08)" stroke="var(--foreground)" strokeWidth={1.5} />
              <line x1={45} y1={140} x2={115} y2={140} stroke="var(--muted-foreground)" strokeWidth={0.8} />
              <text x={80} y={150} textAnchor="middle" className="fill-muted-foreground text-[8px] font-bold">b = 60 mm</text>
              <line x1={30} y1={30} x2={30} y2={130} stroke="var(--muted-foreground)" strokeWidth={0.8} />
              <text x={20} y={83} textAnchor="middle" className="fill-muted-foreground text-[8px] font-bold">h = 150 mm</text>
              <circle cx={80} cy={80} r={2} fill="var(--destructive)" />
              <line x1={40} y1={80} x2={120} y2={80} stroke="var(--destructive)" strokeWidth={1} strokeDasharray="3,1" opacity={0.6} />
              <text x={125} y={83} className="fill-destructive text-[8px] font-bold">N.A.</text>
            </svg>
          </ExpandableDrawing>
        </div>
      }
    />
  );
};

export default Problem01StatementSlide;
