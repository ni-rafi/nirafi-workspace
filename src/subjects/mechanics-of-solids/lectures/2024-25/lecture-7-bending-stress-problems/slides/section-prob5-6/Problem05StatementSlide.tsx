import React from 'react';
import { SlideParagraph, SlideList, InteractiveCard, LatexFormula } from '@/features/presentation/components/elements';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';

export const Problem05StatementSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Problem 05: Cover-Plate Retrofitting"
      leftWidth="55%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-4 text-left select-text">
          <SlideList
            title="Diagnostic Reinforcement Challenge"
            description={
              <span>
                {"A baseline rolled steel joist has a depth of 240 mm and moment of inertia "}
                <LatexFormula math="I_{xx} = 120 \times 10^6\text{ mm}^4" />
                {". It is reinforced symmetrically by welding a cover plate 200 mm wide and 15 mm thick to both top and bottom flanges. Find the percentage increase in its allowable UDL load capacity over a simply supported span of 8 m if normal stress cannot exceed 140 MPa."}
              </span>
            }
            revealMode="each-click"
            items={[
              { text: <span>Baseline Core: <LatexFormula math="I_0 = 120 \times 10^6\text{ mm}^4" />, depth <LatexFormula math="d = 240\text{ mm}" />.</span>, revealAt: 1 },
              { text: <span>Cover Plates: <LatexFormula math="b_p = 200\text{ mm}" />, <LatexFormula math="t_p = 15\text{ mm}" />.</span>, revealAt: 2 },
              { text: <span>Bending limits: <LatexFormula math="\sigma_{\text{allow}} \le 140\text{ MPa}" />.</span>, revealAt: 3 },
            ]}
          />
        </div>
      }
      rightContent={
        <div className="flex flex-col justify-center h-full w-full">
          <InteractiveCard title="Consulting Context" variant="default" spacing="space-y-3">
            <SlideParagraph className="text-xs leading-relaxed text-muted-foreground">
              Welding steel plates to extreme flanges increases Inertia (<LatexFormula math="I" />) quadratically via parallel-axis transfer, but also increases the extreme fiber distance <LatexFormula math="y_{\max}" />.
            </SlideParagraph>
            <SlideParagraph className="text-xs leading-relaxed text-muted-foreground font-bold">
              We must analyze the resulting net Section Modulus (<LatexFormula math="Z" />) increase!
            </SlideParagraph>
          </InteractiveCard>
        </div>
      }
    />
  );
};

export default Problem05StatementSlide;
