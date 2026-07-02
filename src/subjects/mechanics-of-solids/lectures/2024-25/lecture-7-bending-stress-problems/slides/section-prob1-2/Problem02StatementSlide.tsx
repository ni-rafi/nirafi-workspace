import React from 'react';
import { SlideParagraph, SlideList, LatexFormula, InteractiveCard } from '@/features/presentation/components/elements';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';

export const Problem02StatementSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Problem 02: Design Sizing Statement"
      leftWidth="55%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-4 text-left select-text">
          <SlideList
            title="Design Optimization Problem"
            description="A rectangular beam 60 mm wide is simply supported over a span of 5 metres. If the beam is subjected to a uniformly distributed load of 4 kN/m, find the required depth of the beam if the maximum stress is not to exceed 35 MPa in compression and 45 MPa in tension."
            revealMode="each-click"
            items={[
              { text: <span>Width (<LatexFormula math="b" />) = 60 mm</span>, revealAt: 1 },
              { text: <span>Span (<LatexFormula math="L" />) = 5 m</span>, revealAt: 2 },
              { text: <span>UDL (<LatexFormula math="w" />) = 4 kN/m</span>, revealAt: 3 },
              { text: <span>Stress limits: Compression <LatexFormula math="\sigma_c \le 35\text{ MPa}" />, Tension <LatexFormula math="\sigma_t \le 45\text{ MPa}" /></span>, revealAt: 4 },
            ]}
          />
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center h-full min-h-[250px] w-full text-[10px] text-muted-foreground leading-relaxed">
          <InteractiveCard title="Unknown parameters" className="w-full text-left">
            <div className="space-y-2 text-xs font-mono text-foreground">
              <p className="text-amber-500 font-bold">• Depth <LatexFormula math="h = ?" /></p>
              <SlideParagraph variant="info" className="text-[10px] mt-2 leading-normal">
                {"We must express cross-section properties in terms of h, and solve using the governing boundary condition."}
              </SlideParagraph>
            </div>
          </InteractiveCard>
        </div>
      }
    />
  );
};

export default Problem02StatementSlide;
