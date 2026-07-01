import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, SlideBullet, SlideEquation } from '@/features/presentation/components/elements';
import { Activity } from 'lucide-react';

export const Step1MomentSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Step 1: External Moment Evaluation (M)"
      leftWidth="55%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-4 text-left select-text">
          <div>
            <div className="flex items-center space-x-1.5 text-indigo-500 font-bold text-[10px] uppercase mb-1">
              <Activity className="h-4.5 w-4.5" />
              <span>External Loading Demands</span>
            </div>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground leading-relaxed">
              {"Evaluate the peak bending moment by referencing the simply supported UDL configuration."}
            </SlideParagraph>
          </div>
          <div className="space-y-2 my-2">
            <SlideBullet text="Load (w) = 4.5 kN/m" />
            <SlideBullet text="Length (L) = 4 m" />
            <SlideBullet text="Max Moment occurs at center (x = 2m)" />
          </div>
          <div className="space-y-1">
            <SlideEquation math="M_{\max} = \frac{w \cdot L^2}{8}" />
            <SlideEquation math="M_{\max} = \frac{4.5 \cdot 4^2}{8} = 9\text{ kN}\cdot\text{m} = 9 \times 10^6\text{ N}\cdot\text{mm}" />
          </div>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center h-full min-h-[250px] w-full text-[10px] font-mono leading-relaxed text-muted-foreground">
          <div className="p-4 bg-slate-900 border border-border/40 rounded-xl w-full text-left space-y-2">
            <h4 className="text-indigo-400 font-bold uppercase text-[9px]">Unit Consistency Warning</h4>
            <p>Always scale kNm to Nmm for compatibility with material parameters (MPa = N/mm²):</p>
            <p className="text-emerald-400 font-bold">1 kNm = 10⁶ Nmm</p>
            <p className="text-emerald-400 font-bold">9 kNm = 9 × 10⁶ Nmm</p>
          </div>
        </div>
      }
    />
  );
};

export default Step1MomentSlide;
