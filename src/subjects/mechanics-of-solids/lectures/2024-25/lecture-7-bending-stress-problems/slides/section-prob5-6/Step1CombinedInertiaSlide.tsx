import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, SlideBullet, SlideEquation } from '@/features/presentation/components/elements';
import { Settings } from 'lucide-react';

export const Step1CombinedInertiaSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Step 1: Composite Section Inertia (I_comp)"
      leftWidth="55%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-4 text-left select-text">
          <div>
            <div className="flex items-center space-x-1.5 text-indigo-500 font-bold text-[10px] uppercase mb-1">
              <Settings className="h-4.5 w-4.5" />
              <span>Parallel Axis Transfer</span>
            </div>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground leading-relaxed">
              {"Evaluate the composite moment of inertia by adding the core inertia and the transfer contribution of both plates."}
            </SlideParagraph>
          </div>
          <div className="space-y-1.5 my-1.5 text-[11px]">
            <SlideBullet text="Plate Centroidal Transfer Distance: d = d_core/2 + t_p/2 = 120 + 7.5 = 127.5 mm." />
            <SlideBullet text="Plate own Inertia: I_p = b_p * t_p³ / 12 = 200 * 15³ / 12 = 56,250 mm⁴." />
            <SlideBullet text="Plate Area: A_p = 200 * 15 = 3,000 mm²." />
            <SlideBullet text="Transfer Inertia: A_p * d² = 3,000 * 127.5² = 48.825 × 10⁶ mm⁴." />
          </div>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center h-full min-h-[250px] w-full text-[10px] font-mono leading-relaxed text-muted-foreground">
          <div className="space-y-3 w-full text-center">
            <SlideEquation math="I_{\text{comp}} = I_{\text{core}} + 2 \cdot (I_p + A_p \cdot d^2)" />
            <SlideEquation math="I_{\text{comp}} = 120 \times 10^6 + 2 \cdot (0.056 \times 10^6 + 48.825 \times 10^6)" />
            <SlideEquation math="I_{\text{comp}} = 217.76 \times 10^6\text{ mm}^4" />
          </div>
        </div>
      }
    />
  );
};

export default Step1CombinedInertiaSlide;
