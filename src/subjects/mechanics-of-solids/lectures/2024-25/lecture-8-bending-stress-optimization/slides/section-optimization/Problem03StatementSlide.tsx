import React from 'react';
import { SlideList, InteractiveCard, LatexFormula } from '@/features/presentation/components/elements';
import TwoColumnLayout from '@/shared/layouts/TwoColumnLayout';

export const Problem03StatementSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Problem 03: Tapered Cantilever Optimization"
      leftWidth="55%"
      leftContent={
        <div className="flex flex-col gap-4 text-left select-text">
          <SlideList
            title="Non-Prismatic Sizing Challenge"
            description={
              <span>
                A cantilever beam of constant width <LatexFormula math="b = 100\text{ mm}" /> has a depth varying linearly from <LatexFormula math="h_0 = 150\text{ mm}" /> at the free end to 350 mm at the fixed wall (span length <LatexFormula math="L = 2.0\text{ m}" />). If the beam carries a concentrated load <LatexFormula math="P" /> at the free end, determine the location of the maximum bending stress along the beam axis.
              </span>
            }
            revealMode="each-click"
            items={[
              { text: <span>Width (<LatexFormula math="b" />) = 100 mm</span>, revealAt: 1 },
              { text: <span>End depth (<LatexFormula math="h_0" />) = 150 mm, Wall depth = 350 mm.</span>, revealAt: 2 },
              { text: <span>Depth variation: <LatexFormula math="h(x) = h_0 + k \cdot x = 150 + 0.1 \cdot x" />.</span>, revealAt: 3 },
              { text: <span>Taper rate: <LatexFormula math="k = (350 - 150) / 2000 = 0.1" />.</span>, revealAt: 4 },
            ]}
          />
        </div>
      }
      rightContent={
        <div className="flex flex-col justify-center h-full w-full">
          <InteractiveCard title="Intuition Trap" variant="default" spacing="space-y-3">
            <div className="text-xs leading-relaxed text-muted-foreground space-y-2">
              <p>
                {"Bending moment is zero at the free end and peaks at the wall ("}
                <LatexFormula math="M_{\max} = P \cdot L" />
                {")."}
              </p>
              <p>
                {"However, the Section Modulus "}
                <LatexFormula math="Z(x)" />
                {" also increases quadratically as the beam thickens ("}
                <LatexFormula math="Z \propto h^2" />
                {")."}
              </p>
              <p className="text-amber-500 font-bold">
                {"Will stress peak at the wall or elsewhere?"}
              </p>
            </div>
          </InteractiveCard>
        </div>
      }
    />
  );
};

export default Problem03StatementSlide;
