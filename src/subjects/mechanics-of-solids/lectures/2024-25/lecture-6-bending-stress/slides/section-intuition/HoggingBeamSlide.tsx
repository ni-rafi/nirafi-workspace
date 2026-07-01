import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, SlideBullet } from '@/features/presentation/components/elements';
import { BeamDeformationDrawing } from './drawings/BeamDeformationDrawing';
import { ArrowUp } from 'lucide-react';

export const HoggingBeamSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Negative Curvature (Hogging Beam)"
      leftWidth="50%"
      leftContent={
        <div className="flex flex-col justify-between h-full gap-4 text-left select-text">
          <div>
            <div className="flex items-center space-x-1.5 text-indigo-500 font-bold text-[10px] uppercase mb-1">
              <ArrowUp className="h-4.5 w-4.5" />
              <span>Hogging Curvature (-ve Moment)</span>
            </div>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground leading-relaxed">
              Under negative bending moments, the beam deforms upwards, creating a frown curvature.
            </SlideParagraph>
          </div>
          <div className="space-y-2 my-2">
            <SlideBullet text="Fibers above the Neutral Axis stretch (tensile stress)." />
            <SlideBullet text="Fibers below the Neutral Axis compress (contract)." />
            <SlideBullet text="The locations of tension and compression are completely reversed." />
          </div>
          <div className="p-3 bg-muted/20 border border-border/50 rounded-xl text-[9px] text-muted-foreground leading-normal">
            This occurs typically over column supports in continuous beams or in cantilever structures.
          </div>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-5 flex flex-col items-center justify-center h-full min-h-[260px]">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-4">Hogging Deformation</span>
          <BeamDeformationDrawing mode="hogging" />
        </div>
      }
    />
  );
};

export default HoggingBeamSlide;
