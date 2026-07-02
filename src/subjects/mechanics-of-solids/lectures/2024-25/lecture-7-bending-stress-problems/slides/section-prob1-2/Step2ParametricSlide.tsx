import React from 'react';
import { SlideList, SlideEquation, LatexFormula, ClickReveal, ClickHighlight, InteractiveCard } from '@/features/presentation/components/elements';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';

export const Step2ParametricSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Step 2: Parametric Inertia Expression"
      leftWidth="55%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-4 text-left select-text">
          <SlideList
            title="Parametric Geometry"
            description="Formulate the section properties as a function of the unknown depth variable h."
            revealMode="each-click"
            items={[
              { text: <span>Width (<LatexFormula math="b" />) = 60 mm</span>, revealAt: 1 },
              { text: <span>Depth (<LatexFormula math="h" />) is left as variable</span>, revealAt: 2 },
            ]}
          />
          <div className="space-y-1 text-left">
            <ClickReveal at={3} preset="fade">
              <SlideEquation math="I_{xx} = \frac{b \cdot h^3}{12}" />
            </ClickReveal>
            <ClickReveal at={4} preset="fade">
              <ClickHighlight at={5} variant="paint" className="block rounded-lg p-1">
                <SlideEquation math="I_{xx} = \frac{60 \cdot h^3}{12} = 5 \cdot h^3\text{ mm}^4" />
              </ClickHighlight>
            </ClickReveal>
          </div>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center h-full min-h-[250px] w-full text-[10px] font-mono leading-relaxed text-muted-foreground">
          <InteractiveCard title="Section Properties (mm)" className="w-full text-left">
            <div className="space-y-1.5 text-xs text-foreground font-mono">
              <p>• Width <LatexFormula math="b = 60" /></p>
              <p>• Height = <LatexFormula math="h" /></p>
              <p>• <LatexFormula math="y_{\max} = h / 2" /></p>
              <p className="text-emerald-500 font-bold">I_xx = 5 &middot; <LatexFormula math="h^3" /></p>
            </div>
          </InteractiveCard>
        </div>
      }
    />
  );
};

export default Step2ParametricSlide;
