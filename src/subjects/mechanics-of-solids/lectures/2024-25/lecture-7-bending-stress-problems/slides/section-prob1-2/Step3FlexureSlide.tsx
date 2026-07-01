import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, SlideBullet, SlideEquation } from '@/features/presentation/components/elements';
import { ShieldCheck } from 'lucide-react';

export const Step3FlexureSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Step 3: Flexure Formula Evaluation (σ)"
      leftWidth="55%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-4 text-left select-text">
          <div>
            <div className="flex items-center space-x-1.5 text-indigo-500 font-bold text-[10px] uppercase mb-1">
              <ShieldCheck className="h-4.5 w-4.5" />
              <span>Stress Solution</span>
            </div>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground leading-relaxed">
              {"Evaluate the maximum normal bending stresses at the outermost fibers."}
            </SlideParagraph>
          </div>
          <div className="space-y-2 my-2">
            <SlideBullet text="Distance to extreme fiber (y_max) = h/2 = 75 mm" />
            <SlideBullet text="Moment (M) = 9 × 10⁶ Nmm" />
            <SlideBullet text="Inertia (I_xx) = 16.875 × 10⁶ mm⁴" />
          </div>
          <div className="space-y-1">
            <SlideEquation math="\sigma_{\max} = \frac{M \cdot y_{\max}}{I}" />
            <SlideEquation math="\sigma_{\max} = \frac{9 \times 10^6 \times 75}{16.875 \times 10^6} = 40\text{ N/mm}^2 = 40\text{ MPa}" />
          </div>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center h-full min-h-[250px] w-full text-[10px] font-mono leading-relaxed text-muted-foreground">
          <div className="p-4 bg-slate-900 border border-border/40 rounded-xl w-full text-left space-y-2">
            <h4 className="text-indigo-400 font-bold uppercase text-[9px]">Material Limits Check</h4>
            <p>• Output Stress: 40 MPa</p>
            <p>• Top fiber (compression): -40 MPa</p>
            <p>• Bottom fiber (tension): +40 MPa</p>
          </div>
        </div>
      }
    />
  );
};

export default Step3FlexureSlide;
