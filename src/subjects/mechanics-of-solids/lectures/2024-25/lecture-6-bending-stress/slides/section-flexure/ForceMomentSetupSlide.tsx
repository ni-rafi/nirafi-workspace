import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, SlideBullet } from '@/features/presentation/components/elements';
import { CrossSectionElementDrawing } from './drawings/CrossSectionElementDrawing';
import { ShieldCheck } from 'lucide-react';

export const ForceMomentSetupSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Differential Force & Resisting Moment"
      leftWidth="50%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-4 text-left select-text">
          <div>
            <div className="flex items-center space-x-1.5 text-indigo-500 font-bold text-[10px] uppercase mb-1">
              <ShieldCheck className="h-4.5 w-4.5" />
              <span>Cross-Section Analysis</span>
            </div>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground leading-relaxed">
              We look at an elemental area strip dA of the cross section at a distance y from the Neutral Axis.
            </SlideParagraph>
          </div>
          <div className="space-y-2 my-2">
            <SlideBullet text="Differential force on strip dA: dF = σ dA = (E / R) y dA" />
            <SlideBullet text="Differential resisting moment: dM = dF * y = (E / R) y² dA" />
            <SlideBullet text="To find the total resisting moment M, we must integrate these moments across the entire area." />
          </div>
          <div className="p-3 bg-indigo-500/[0.03] border border-indigo-500/20 rounded-xl text-[9px] text-indigo-600 dark:text-indigo-400 leading-normal font-semibold">
            Resisting Moment M equals the externally applied bending moment in static equilibrium.
          </div>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center h-full min-h-[260px]">
          <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest block mb-2">Differential Area Strip</span>
          <CrossSectionElementDrawing />
        </div>
      }
    />
  );
};

export default ForceMomentSetupSlide;
