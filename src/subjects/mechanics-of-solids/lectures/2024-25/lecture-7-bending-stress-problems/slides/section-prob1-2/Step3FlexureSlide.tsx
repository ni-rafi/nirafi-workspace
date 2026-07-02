import React from 'react';
import { SlideList, SlideEquation, LatexFormula, ClickReveal, ClickHighlight, InteractiveCard } from '@/features/presentation/components/elements';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';

export const Step3FlexureSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Step 3: Flexure Formula Evaluation (σ)"
      leftWidth="55%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-4 text-left select-text">
          <SlideList
            title="Stress Solution"
            description="Evaluate the maximum normal bending stresses at the outermost fibers."
            revealMode="each-click"
            items={[
              { text: <span>Distance to extreme fiber (<LatexFormula math="y_{\max}" />) = <LatexFormula math="h/2 = 75\text{ mm}" /></span>, revealAt: 1 },
              { text: <span>Moment (<LatexFormula math="M" />) = <LatexFormula math="9 \times 10^6\text{ Nmm}" /></span>, revealAt: 2 },
              { text: <span>Inertia (<LatexFormula math="I_{xx}" />) = <LatexFormula math="16.875 \times 10^6\text{ mm}^4" /></span>, revealAt: 3 },
            ]}
          />
          <div className="space-y-1 text-left">
            <ClickReveal at={4} preset="fade">
              <SlideEquation math="\sigma_{\max} = \frac{M \cdot y_{\max}}{I}" />
            </ClickReveal>
            <ClickReveal at={5} preset="fade">
              <ClickHighlight at={6} variant="paint" className="block rounded-lg p-1">
                <SlideEquation math="\sigma_{\max} = \frac{9 \times 10^6 \times 75}{16.875 \times 10^6} = 40\text{ N/mm}^2 = 40\text{ MPa}" />
              </ClickHighlight>
            </ClickReveal>
          </div>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center h-full min-h-[250px] w-full text-[10px] font-mono leading-relaxed text-muted-foreground">
          <InteractiveCard title="Material Limits Check" className="w-full text-left">
            <div className="space-y-2 text-xs text-foreground font-mono">
              <p>• Output Stress: 40 MPa</p>
              <p>• Top fiber (compression): -40 MPa</p>
              <p>• Bottom fiber (tension): +40 MPa</p>
            </div>
          </InteractiveCard>
        </div>
      }
    />
  );
};

export default Step3FlexureSlide;
