import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, SlideBullet, SlideEquation } from '@/features/presentation/components/elements';
import { Settings } from 'lucide-react';

export const Step2ParametricSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Step 2: Parametric Inertia Expression"
      leftWidth="55%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-4 text-left select-text">
          <div>
            <div className="flex items-center space-x-1.5 text-indigo-500 font-bold text-[10px] uppercase mb-1">
              <Settings className="h-4.5 w-4.5" />
              <span>Parametric Geometry</span>
            </div>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground leading-relaxed">
              {"Formulate the section properties as a function of the unknown depth variable h."}
            </SlideParagraph>
          </div>
          <div className="space-y-2 my-2">
            <SlideBullet text="Width (b) = 60 mm" />
            <SlideBullet text="Depth (h) is left as variable" />
          </div>
          <div className="space-y-1">
            <SlideEquation math="I_{xx} = \frac{b \cdot h^3}{12}" />
            <SlideEquation math="I_{xx} = \frac{60 \cdot h^3}{12} = 5 \cdot h^3\text{ mm}^4" />
          </div>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center h-full min-h-[250px] w-full text-[10px] font-mono leading-relaxed text-muted-foreground">
          <div className="p-4 bg-slate-900 border border-border/40 rounded-xl w-full text-left space-y-1">
            <h4 className="text-indigo-400 font-bold uppercase text-[9px] mb-2">Section Properties (mm)</h4>
            <p>• Width b = 60</p>
            <p>• Height = h</p>
            <p>• y_max = h / 2</p>
            <p className="text-emerald-400 font-bold">I_xx = 5 · h³</p>
          </div>
        </div>
      }
    />
  );
};

export default Step2ParametricSlide;
