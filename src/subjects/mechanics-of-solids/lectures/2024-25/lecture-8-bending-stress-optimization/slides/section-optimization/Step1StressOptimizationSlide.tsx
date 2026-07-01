import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, SlideBullet, SlideEquation } from '@/features/presentation/components/elements';
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
            <SlideBullet text="At a distance x: Moment M(x) = P * x." />
            <SlideBullet text="Depth: h(x) = h_0 + k * x." />
            <SlideBullet text="Section Modulus Z(x) = b * h(x)² / 6." />
          </div>
          <div className="my-1.5">
            <SlideEquation math="\sigma(x) = \frac{M(x)}{Z(x)} = \frac{6 \cdot P \cdot x}{b \cdot (h_0 + k \cdot x)^2}" />
          </div>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center h-full min-h-[250px] w-full text-[10px] font-mono leading-relaxed text-muted-foreground">
          <div className="p-4 bg-slate-900 border border-border/40 rounded-xl w-full text-left space-y-2">
            <h4 className="text-indigo-400 font-bold uppercase text-[9px] mb-1">Variables</h4>
            <p>• P = 15,000 N</p>
            <p>• b = 100 mm</p>
            <p>• h0 = 150 mm</p>
            <p>• k = 0.1</p>
            <p>This gives stress as a pure single-variable equation of x.</p>
          </div>
        </div>
      }
    />
  );
};

export default Step1StressOptimizationSlide;
