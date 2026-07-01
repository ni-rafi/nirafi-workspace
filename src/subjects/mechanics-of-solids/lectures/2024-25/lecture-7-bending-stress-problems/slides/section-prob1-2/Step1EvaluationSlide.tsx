import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, SlideBullet, SlideEquation } from '@/features/presentation/components/elements';
import { Activity } from 'lucide-react';

export const Step1EvaluationSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Step 1: External Moment Evaluation"
      leftWidth="55%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-4 text-left select-text">
          <div>
            <div className="flex items-center space-x-1.5 text-indigo-500 font-bold text-[10px] uppercase mb-1">
              <Activity className="h-4.5 w-4.5" />
              <span>External Moment Demand</span>
            </div>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground leading-relaxed">
              {"Evaluate maximum bending moment under simply supported UDL conditions."}
            </SlideParagraph>
          </div>
          <div className="space-y-2 my-2">
            <SlideBullet text="Load (w) = 4 kN/m" />
            <SlideBullet text="Span (L) = 5 m" />
          </div>
          <div className="space-y-1">
            <SlideEquation math="M = \frac{w \cdot L^2}{8}" />
            <SlideEquation math="M = \frac{4 \cdot 5^2}{8} = 12.5\text{ kN}\cdot\text{m} = 12.5 \times 10^6\text{ N}\cdot\text{mm}" />
          </div>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center h-full min-h-[250px] w-full text-[10px] font-mono leading-relaxed text-muted-foreground">
          <div className="p-4 bg-slate-900 border border-border/40 rounded-xl w-full text-left space-y-1">
            <h4 className="text-indigo-400 font-bold uppercase text-[9px] mb-2">Demand Parameters</h4>
            <p>• Span length: 5.0m</p>
            <p>• w = 4.0 kN/m</p>
            <p className="text-emerald-400 font-bold">M_max = 12.5 kNm</p>
            <p className="text-emerald-400 font-bold">M_max = 12.5 × 10⁶ Nmm</p>
          </div>
        </div>
      }
    />
  );
};

export default Step1EvaluationSlide;
