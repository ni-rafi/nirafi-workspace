import React from 'react';
import { SlideParagraph, SlideList, SlideEquation, LatexFormula, ClickReveal, ClickHighlight } from '@/features/presentation/components/elements';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';

export const HookesLawIntegrationSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Hooke's Law Integration"
      leftWidth="50%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-4 text-left select-text">
          <SlideList
            title="Hooke's Law Connection"
            description="We now transition from kinematics (deformations) to mechanics (stresses) using Hooke's Law."
            revealMode="each-click"
            items={[
              {
                text: (
                  <span>
                    {"Hooke's Law states: normal stress "}
                    <LatexFormula math="\sigma = \varepsilon \cdot E" />
                    {", where "}
                    <LatexFormula math="E" />
                    {" is Young's Modulus."}
                  </span>
                ),
                revealAt: 1,
              },
              {
                text: (
                  <span>
                    {"Substitute the kinematic strain relation "}
                    <LatexFormula math="\varepsilon = \frac{y}{R}" />
                    {" into Hooke's Law."}
                  </span>
                ),
                revealAt: 2,
              },
              {
                text: (
                  <span>
                    {"This yields the stress relation: "}
                    <LatexFormula math="\sigma = \left(\frac{y}{R}\right) E" />
                    {"."}
                  </span>
                ),
                revealAt: 3,
              },
              {
                text: (
                  <span>
                    {"Rearranging gives the stress ratio: "}
                    <LatexFormula math="\frac{\sigma}{y} = \frac{E}{R}" />
                    {"."}
                  </span>
                ),
                revealAt: 4,
              },
            ]}
          />
          <SlideParagraph variant="info" className="text-[10px] my-1">
            <span>
              Since <LatexFormula math="E" /> and <LatexFormula math="R" /> are constant along a given beam segment cross-section, the ratio <LatexFormula math="\sigma/y" /> is constant, proving stress varies linearly with <LatexFormula math="y" />.
            </span>
          </SlideParagraph>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-5 flex flex-col items-center justify-center h-full min-h-[260px] text-center">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-6">First Flexure Equality</span>
          <div className="space-y-6 w-full text-left">
            <ClickReveal at={5} preset="fade">
              <div className="p-4 bg-background border border-border/40 rounded-xl">
                <span className="text-[9px] font-mono text-muted-foreground block mb-2">Integrating Hooke's Law:</span>
                <SlideEquation math="\sigma = \varepsilon \cdot E" />
              </div>
            </ClickReveal>
            <ClickReveal at={6} preset="fade">
              <div className="p-4 bg-background border border-border/40 rounded-xl">
                <span className="text-[9px] font-mono text-muted-foreground block mb-2">Stress-to-Deformation Relation:</span>
                <ClickHighlight at={7} variant="paint" className="block rounded-lg p-1">
                  <SlideEquation math="\frac{\sigma}{y} = \frac{E}{R}" />
                </ClickHighlight>
              </div>
            </ClickReveal>
          </div>
        </div>
      }
    />
  );
};

export default HookesLawIntegrationSlide;
