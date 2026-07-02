import React from 'react';
import { SlideList, SlideEquation, LatexFormula, ClickReveal, ClickHighlight, InteractiveCard } from '@/features/presentation/components/elements';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';

export const Step2InertiaSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Step 2: Cross-Section Inertia Evaluation (I)"
      leftWidth="55%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-4 text-left select-text">
          <SlideList
            title="Cross-Section Stiffness"
            description="Evaluate the centroidal moment of inertia using standard rectangular parameters."
            revealMode="each-click"
            items={[
              { text: <span>Width (<LatexFormula math="b" />) = 60 mm</span>, revealAt: 1 },
              { text: <span>Depth (<LatexFormula math="h" />) = 150 mm</span>, revealAt: 2 },
            ]}
          />
          <div className="space-y-1 text-left">
            <ClickReveal at={3} preset="fade">
              <SlideEquation math="I_{xx} = \frac{b \cdot h^3}{12}" />
            </ClickReveal>
            <ClickReveal at={4} preset="fade">
              <ClickHighlight at={5} variant="paint" className="block rounded-lg p-1">
                <SlideEquation math="I_{xx} = \frac{60 \cdot 150^3}{12} = 16.875 \times 10^6\text{ mm}^4" />
              </ClickHighlight>
            </ClickReveal>
          </div>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center h-full min-h-[250px] w-full text-[10px] font-mono leading-relaxed text-muted-foreground">
          <InteractiveCard title="Geometric Constants" className="w-full text-left">
            <div className="space-y-2 text-xs text-foreground font-mono">
              <p>• Area <LatexFormula math="A = 9,000\text{ mm}^2" /></p>
              <p>• Centroid <LatexFormula math="\bar{y} = h/2 = 75\text{ mm}" /></p>
              <p>• Inertia <LatexFormula math="I_{xx} = 16.875 \times 10^6\text{ mm}^4" /></p>
            </div>
          </InteractiveCard>
        </div>
      }
    />
  );
};

export default Step2InertiaSlide;
