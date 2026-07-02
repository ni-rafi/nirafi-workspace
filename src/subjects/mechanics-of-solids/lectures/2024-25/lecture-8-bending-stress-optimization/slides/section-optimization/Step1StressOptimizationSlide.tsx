import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, SlideBullet, SlideEquation, LatexFormula, ClickReveal, ClickHighlight, InteractiveCard } from '@/features/presentation/components/elements';
import { Settings } from 'lucide-react';

export const Step1StressOptimizationSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Step 1: Stress-x Equation Setup"
      leftWidth="55%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-4 text-left select-text">
          <div>
            <div className="flex items-center space-x-1.5 text-indigo-500 font-bold text-[10px] uppercase mb-1">
              <Settings className="h-4.5 w-4.5" />
              <span>Stress Gradient Function</span>
            </div>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground leading-relaxed">
              {"Formulate normal bending stress as a function of the axial coordinate x from the free end."}
            </SlideParagraph>
          </div>
          <div className="space-y-1.5 my-1.5 text-[11px]">
            <SlideBullet
              text={
                <span>
                  At a distance <LatexFormula math="x" />: Moment <LatexFormula math="M(x) = P \cdot x" />.
                </span>
              }
              revealAt={1}
            />
            <SlideBullet
              text={
                <span>
                  Depth: <LatexFormula math="h(x) = h_0 + k \cdot x" />.
                </span>
              }
              revealAt={2}
            />
            <SlideBullet
              text={
                <span>
                  Section Modulus <LatexFormula math="Z(x) = \frac{b \cdot h(x)^2}{6}" />.
                </span>
              }
              revealAt={3}
            />
          </div>
          <ClickReveal at={4} preset="fade">
            <div className="my-1.5 p-3 bg-background border border-border/40 rounded-xl">
              <ClickHighlight at={5} variant="paint" className="block rounded-lg p-1">
                <SlideEquation math="\sigma(x) = \frac{M(x)}{Z(x)} = \frac{6 \cdot P \cdot x}{b \cdot (h_0 + k \cdot x)^2}" />
              </ClickHighlight>
            </div>
          </ClickReveal>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center h-full min-h-[250px] w-full text-[10px] font-mono leading-relaxed text-muted-foreground">
          <InteractiveCard title="System Variables" className="w-full text-left">
            <div className="space-y-1 text-xs text-foreground">
              <p>• Load: <LatexFormula math="P = 15\text{ kN}" /></p>
              <p>• Width: <LatexFormula math="b = 100\text{ mm}" /></p>
              <p>• Initial Depth: <LatexFormula math="h_0 = 150\text{ mm}" /></p>
              <p>• Taper Slope: <LatexFormula math="k = 0.1" /></p>
              <SlideParagraph variant="info" className="text-[10px] mt-3 leading-normal">
                {"This gives bending stress as a pure single-variable function of x."}
              </SlideParagraph>
            </div>
          </InteractiveCard>
        </div>
      }
    />
  );
};

export default Step1StressOptimizationSlide;
