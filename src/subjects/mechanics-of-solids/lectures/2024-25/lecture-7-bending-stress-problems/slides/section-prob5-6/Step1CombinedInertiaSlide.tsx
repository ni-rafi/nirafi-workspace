import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideList, SlideEquation, ClickReveal } from '@/features/presentation/components/elements';

export const Step1CombinedInertiaSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Step 1: Composite Section Inertia (I_comp)"
      leftWidth="55%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-4 text-left select-text">
          <SlideList
            title="Parallel Axis Transfer"
            description="Evaluate the composite moment of inertia by adding the core inertia and the transfer contribution of both plates."
            revealMode="each-click"
            items={[
              { text: "Plate Centroidal Transfer Distance: d = d_core/2 + t_p/2 = 120 + 7.5 = 127.5 mm.", revealAt: 1 },
              { text: "Plate own Inertia: I_p = b_p * t_p³ / 12 = 200 * 15³ / 12 = 56,250 mm⁴.", revealAt: 2 },
              { text: "Plate Area: A_p = 200 * 15 = 3,000 mm².", revealAt: 3 },
              { text: "Transfer Inertia: A_p * d² = 3,000 * 127.5² = 48.825 × 10⁶ mm⁴.", revealAt: 4 },
            ]}
          />
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center h-full min-h-[250px] w-full text-[10px] font-mono leading-relaxed text-muted-foreground">
          <div className="space-y-3 w-full text-center">
            <ClickReveal at={5} preset="fade">
              <SlideEquation math="I_{\text{comp}} = I_{\text{core}} + 2 \cdot (I_p + A_p \cdot d^2)" />
            </ClickReveal>
            <ClickReveal at={6} preset="fade">
              <SlideEquation math="I_{\text{comp}} = 120 \times 10^6 + 2 \cdot (0.056 \times 10^6 + 48.825 \times 10^6)" />
            </ClickReveal>
            <ClickReveal at={7} preset="fade">
              <SlideEquation math="I_{\text{comp}} = 217.76 \times 10^6\text{ mm}^4" />
            </ClickReveal>
          </div>
        </div>
      }
    />
  );
};

export default Step1CombinedInertiaSlide;
