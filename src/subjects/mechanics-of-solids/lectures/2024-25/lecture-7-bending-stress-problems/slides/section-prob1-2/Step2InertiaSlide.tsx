import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, SlideBullet, SlideEquation } from '@/features/presentation/components/elements';
import { Settings } from 'lucide-react';

export const Step2InertiaSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Step 2: Cross-Section Inertia Evaluation (I)"
      leftWidth="55%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-4 text-left select-text">
          <div>
            <div className="flex items-center space-x-1.5 text-indigo-500 font-bold text-[10px] uppercase mb-1">
              <Settings className="h-4.5 w-4.5" />
              <span>Cross-Section stiffness</span>
            </div>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground leading-relaxed">
              {"Evaluate the centroidal moment of inertia using standard rectangular parameters."}
            </SlideParagraph>
          </div>
          <div className="space-y-2 my-2">
            <SlideBullet text="Width (b) = 60 mm" />
            <SlideBullet text="Depth (h) = 150 mm" />
          </div>
          <div className="space-y-1">
            <SlideEquation math="I_{xx} = \frac{b \cdot h^3}{12}" />
            <SlideEquation math="I_{xx} = \frac{60 \cdot 150^3}{12} = 16.875 \times 10^6\text{ mm}^4" />
          </div>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center h-full min-h-[250px] w-full text-[10px] font-mono leading-relaxed text-muted-foreground">
          <div className="p-4 bg-slate-900 border border-border/40 rounded-xl w-full text-left space-y-2">
            <h4 className="text-indigo-400 font-bold uppercase text-[9px]">Geometric Constants</h4>
            <p>• Area A = 9,000 mm²</p>
            <p>• centroid ybar = h/2 = 75 mm</p>
            <p>• Inertia I_xx = 16.875 × 10⁶ mm⁴</p>
          </div>
        </div>
      }
    />
  );
};

export default Step2InertiaSlide;
