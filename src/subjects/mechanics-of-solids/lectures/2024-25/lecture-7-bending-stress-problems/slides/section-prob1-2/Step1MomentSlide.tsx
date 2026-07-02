import React from 'react';
import { SlideList, SlideEquation, LatexFormula, ClickReveal, ClickHighlight, InteractiveCard } from '@/features/presentation/components/elements';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';

export const Step1MomentSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Step 1: External Moment Evaluation (M)"
      leftWidth="55%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-4 text-left select-text">
          <SlideList
            title="External Loading Demands"
            description="Evaluate the peak bending moment by referencing the simply supported UDL configuration."
            revealMode="each-click"
            items={[
              { text: <span>Load (<LatexFormula math="w" />) = 4.5 kN/m</span>, revealAt: 1 },
              { text: <span>Length (<LatexFormula math="L" />) = 4 m</span>, revealAt: 2 },
              { text: <span>Max Moment occurs at center (<LatexFormula math="x = 2\text{ m}" />)</span>, revealAt: 3 },
            ]}
          />
          <div className="space-y-1 text-left">
            <ClickReveal at={4} preset="fade">
              <SlideEquation math="M_{\max} = \frac{w \cdot L^2}{8}" />
            </ClickReveal>
            <ClickReveal at={5} preset="fade">
              <ClickHighlight at={6} variant="paint" className="block rounded-lg p-1">
                <SlideEquation math="M_{\max} = \frac{4.5 \cdot 4^2}{8} = 9\text{ kN}\cdot\text{m} = 9 \times 10^6\text{ N}\cdot\text{mm}" />
              </ClickHighlight>
            </ClickReveal>
          </div>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center h-full min-h-[250px] w-full text-[10px] font-mono leading-relaxed text-muted-foreground">
          <InteractiveCard title="Unit Consistency Warning" className="w-full text-left">
            <div className="space-y-2 text-xs text-foreground font-mono">
              <p>Always scale kNm to Nmm for compatibility with material parameters (MPa = N/mm²):</p>
              <p className="text-emerald-500 font-bold">1 kNm = <LatexFormula math="10^6" /> Nmm</p>
              <p className="text-emerald-500 font-bold">9 kNm = <LatexFormula math="9 \times 10^6" /> Nmm</p>
            </div>
          </InteractiveCard>
        </div>
      }
    />
  );
};

export default Step1MomentSlide;
