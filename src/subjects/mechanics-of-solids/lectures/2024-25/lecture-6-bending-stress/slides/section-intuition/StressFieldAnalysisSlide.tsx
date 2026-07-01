import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, SlideBullet } from '@/features/presentation/components/elements';
import { ArrowUpRight, ArrowDownLeft, ShieldAlert } from 'lucide-react';

export const StressFieldAnalysisSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Stress Field Mapping"
      leftWidth="50%"
      leftContent={
        <div className="flex flex-col justify-between h-full gap-4 text-left select-text">
          <div>
            <div className="flex items-center space-x-1.5 text-indigo-500 font-bold text-[10px] uppercase mb-1">
              <ShieldAlert className="h-4.5 w-4.5" />
              <span>Stress Classification</span>
            </div>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground leading-relaxed">
              Let's map the spring deformation to structural stress zones:
            </SlideParagraph>
          </div>
          <div className="space-y-2 my-2">
            <SlideBullet text="Outer Side: Larger radius, stretched fibers → Tensile Stress (+ve)" />
            <SlideBullet text="Inner Side: Smaller radius, compressed fibers → Compressive Stress (-ve)" />
            <SlideBullet text="Middle Zone: No change in length → Zero Stress (Neutral Axis)" />
          </div>
          <div className="p-3 bg-muted/20 border border-border/50 rounded-xl text-[9px] text-muted-foreground leading-normal">
            This stress variation creates a torque (internal bending moment) that resists the external loads.
          </div>
        </div>
      }
      rightContent={
        <div className="flex flex-col gap-3 justify-center h-full min-h-[260px] w-full">
          <div className="p-4 bg-emerald-500/[0.03] border border-emerald-500/20 rounded-xl flex items-start gap-2.5">
            <ArrowUpRight className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider block">Tensile Stress Field</span>
              <p className="text-[10px] text-muted-foreground mt-0.5 leading-normal">Developed in fibers that are forced to stretch. Corresponds to the outer curve profile.</p>
            </div>
          </div>

          <div className="p-4 bg-red-500/[0.03] border border-red-500/20 rounded-xl flex items-start gap-2.5">
            <ArrowDownLeft className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider block">Compressive Stress Field</span>
              <p className="text-[10px] text-muted-foreground mt-0.5 leading-normal">Developed in fibers that are forced to contract. Corresponds to the inner curve profile.</p>
            </div>
          </div>
        </div>
      }
    />
  );
};

export default StressFieldAnalysisSlide;
