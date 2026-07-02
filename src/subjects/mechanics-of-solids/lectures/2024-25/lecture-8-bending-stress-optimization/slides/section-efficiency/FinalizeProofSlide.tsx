import React from 'react';
import { SlideList, SlideEquation, LatexFormula, ClickReveal, ClickHighlight, InteractiveCard } from '@/features/presentation/components/elements';
import TwoColumnLayout from '@/shared/layouts/TwoColumnLayout';

export const FinalizeProofSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Finalizing the Proof (Z_rect > Z_sq)"
      leftWidth="55%"
      leftContent={
        <div className="flex flex-col gap-4 text-left select-text">
          <SlideList
            title="Bending Efficiency Proof"
            description={
              <span>
                Evaluate the ratio of the Section Moduli for rectangular and square shapes of equal area.
              </span>
            }
            revealMode="each-click"
            items={[
              { text: <span>Section Modulus of Square: <LatexFormula math="Z_{\text{sq}} = a^3 / 6" /></span>, revealAt: 1 },
              { text: <span>Section Modulus of Rectangle: <LatexFormula math="Z_{\text{rect}} = b \cdot d^2 / 6" /></span>, revealAt: 2 },
              { text: <span>Substitute <LatexFormula math="b = a^2 / d" />: <LatexFormula math="Z_{\text{rect}} = \left(\frac{a^2}{d}\right) \cdot \frac{d^2}{6} = \frac{a^2 \cdot d}{6}" /></span>, revealAt: 3 },
            ]}
          />
          <div className="space-y-1.5 my-1 text-left">
            <ClickReveal at={4} preset="fade">
              <ClickHighlight at={4} variant="rect" className="block">
                <SlideEquation math="\frac{Z_{\text{rect}}}{Z_{\text{sq}}} = \frac{d}{a}" />
              </ClickHighlight>
            </ClickReveal>
          </div>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center h-full min-h-[250px] w-full text-[10px] font-mono leading-relaxed text-muted-foreground">
          <ClickReveal at={5} preset="fade" className="w-full">
            <InteractiveCard title="Proof Conclusion" className="w-full text-left">
              <div className="space-y-2 text-xs text-foreground font-mono">
                <p>Since depth <LatexFormula math="d > a" /> for a deep rectangular section:</p>
                <p className="text-emerald-500 font-bold text-sm"><LatexFormula math="\frac{Z_{\text{rect}}}{Z_{\text{sq}}} > 1" /></p>
                <p className="text-emerald-500 font-bold text-sm"><LatexFormula math="Z_{\text{rect}} > Z_{\text{sq}}" /></p>
                <p className="text-muted-foreground text-[10.5px] leading-normal mt-2">Hence, a rectangular section is stronger than a square of equal area!</p>
              </div>
            </InteractiveCard>
          </ClickReveal>
        </div>
      }
    />
  );
};

export default FinalizeProofSlide;
