import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, SlideBullet, InteractiveCard, LatexFormula } from '@/features/presentation/components/elements';
import { HelpCircle } from 'lucide-react';

export const Problem03StatementSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Problem 03: Tapered Cantilever Optimization"
      leftWidth="55%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-4 text-left select-text">
          <div>
            <div className="flex items-center space-x-1.5 text-indigo-500 font-bold text-[10px] uppercase mb-1">
              <HelpCircle className="h-4.5 w-4.5" />
              <span>Non-Prismatic Sizing</span>
            </div>
            <SlideParagraph variant="plain" className="text-xs text-foreground font-semibold leading-relaxed">
              {"A cantilever beam of constant width b = 100 mm has a depth varying linearly from h_0 = 150 mm at the free end to 350 mm at the fixed wall (span length L = 2.0 m). If the beam carries a concentrated load P at the free end, determine the location of the maximum bending stress along the beam axis."}
            </SlideParagraph>
          </div>
          <div className="space-y-1.5 my-1 text-[11px]">
            <SlideBullet text="Width (b) = 100 mm" />
            <SlideBullet text="End depth (h_0) = 150 mm, Wall depth = 350 mm." />
            <SlideBullet text="Depth variation: h(x) = h_0 + k * x = 150 + 0.1 * x." />
            <SlideBullet text="Taper rate: k = (350 - 150) / 2000 = 0.1." />
          </div>
        </div>
      }
      rightContent={
        <div className="flex flex-col justify-center h-full w-full">
          <InteractiveCard title="Intuition Trap" variant="default" spacing="space-y-3">
            <SlideParagraph className="text-xs leading-relaxed text-muted-foreground">
              {"Bending moment is zero at the free end and peaks at the wall ("}
              <LatexFormula math="M_{\max} = P \cdot L" />
              {")."}
            </SlideParagraph>
            <SlideParagraph className="text-xs leading-relaxed text-muted-foreground">
              {"However, the Section Modulus "}
              <LatexFormula math="Z(x)" />
              {" also increases quadratically as the beam thickens ("}
              <LatexFormula math="Z \propto h^2" />
              {")."}
            </SlideParagraph>
            <SlideParagraph className="text-xs leading-relaxed text-amber-500 font-bold">
              {"Will stress peak at the wall or elsewhere?"}
            </SlideParagraph>
          </InteractiveCard>
        </div>
      }
    />
  );
};

export default Problem03StatementSlide;
