import React from 'react';
import { SlideList, SlideEquation, LatexFormula, ClickReveal, ClickHighlight, InteractiveCard } from '@/features/presentation/components/elements';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';

export const Step1EvaluationSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Step 1: External Moment Evaluation"
      leftWidth="55%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-4 text-left select-text">
          <SlideList
            title="External Moment Demand"
            description="Evaluate maximum bending moment under simply supported UDL conditions."
            revealMode="each-click"
            items={[
              { text: <span>Load (<LatexFormula math="w" />) = 4 kN/m</span>, revealAt: 1 },
              { text: <span>Span (<LatexFormula math="L" />) = 5 m</span>, revealAt: 2 },
            ]}
          />
          <div className="space-y-1 text-left">
            <ClickReveal at={3} preset="fade">
              <SlideEquation math="M = \frac{w \cdot L^2}{8}" />
            </ClickReveal>
            <ClickReveal at={4} preset="fade">
              <ClickHighlight at={5} variant="paint" className="block rounded-lg p-1">
                <SlideEquation math="M = \frac{4 \cdot 5^2}{8} = 12.5\text{ kN}\cdot\text{m} = 12.5 \times 10^6\text{ N}\cdot\text{mm}" />
              </ClickHighlight>
            </ClickReveal>
          </div>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center h-full min-h-[250px] w-full text-[10px] font-mono leading-relaxed text-muted-foreground">
          <InteractiveCard title="Demand Parameters" className="w-full text-left">
            <div className="space-y-1.5 text-xs text-foreground font-mono">
              <p>• Span length: 5.0 m</p>
              <p>• UDL (<LatexFormula math="w" />): 4.0 kN/m</p>
              <p className="text-emerald-500 font-bold">M_max = 12.5 kNm</p>
              <p className="text-emerald-500 font-bold">M_max = 12.5 × <LatexFormula math="10^6" /> Nmm</p>
            </div>
          </InteractiveCard>
        </div>
      }
    />
  );
};

export default Step1EvaluationSlide;
