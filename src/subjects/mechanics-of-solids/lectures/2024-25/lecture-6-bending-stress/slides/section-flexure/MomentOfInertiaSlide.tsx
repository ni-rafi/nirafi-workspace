import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, SlideBullet, SlideEquation } from '@/features/presentation/components/elements';
import { Settings, Info } from 'lucide-react';

export const MomentOfInertiaSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Resisting Moment & Moment of Inertia"
      leftWidth="50%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-4 text-left select-text">
          <div>
            <div className="flex items-center space-x-1.5 text-indigo-500 font-bold text-[10px] uppercase mb-1">
              <Settings className="h-4.5 w-4.5" />
              <span>Resisting Moment Integral</span>
            </div>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground leading-relaxed">
              We integrate the differential resisting moments over the entire cross-section area A:
            </SlideParagraph>
          </div>
          <div className="space-y-2 my-2">
            <SlideBullet text="Total Moment M = ∫ dM = ∫ (E / R) y² dA" />
            <SlideBullet text="Since E and R are constant, they pull outside the integral: M = (E / R) ∫ y² dA" />
            <SlideBullet text="The term ∫ y² dA is a geometric property of the shape, known as the Moment of Inertia (I)." />
          </div>
          <div className="p-3 bg-indigo-500/[0.03] border border-indigo-500/20 rounded-xl text-[9px] text-indigo-600 dark:text-indigo-400 leading-normal flex items-start gap-1.5">
            <Info className="h-4 w-4 shrink-0 mt-0.5" />
            <span>Moment of Inertia (I) measures a shape's resistance to rotational bending. Units: mm⁴ or m⁴.</span>
          </div>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-5 flex flex-col items-center justify-center h-full min-h-[260px] text-center">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-6">Integrating total Moment</span>
          <div className="space-y-6 w-full">
            <div className="p-4 bg-background border border-border/40 rounded-xl">
              <span className="text-[9px] font-mono text-muted-foreground block mb-2">Resisting Moment:</span>
              <SlideEquation math="M = \frac{E}{R} \int y^2 dA" />
            </div>
            <div className="p-4 bg-background border border-border/40 rounded-xl">
              <span className="text-[9px] font-mono text-muted-foreground block mb-2">Substituting I = ∫ y² dA:</span>
              <SlideEquation math="M = \frac{E}{R} \cdot I \implies \frac{M}{I} = \frac{E}{R}" />
            </div>
          </div>
        </div>
      }
    />
  );
};

export default MomentOfInertiaSlide;
