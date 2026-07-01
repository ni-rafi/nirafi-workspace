import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, SlideBullet } from '@/features/presentation/components/elements';
import { DerivationDrawing } from './drawings/DerivationDrawing';
import { Compass } from 'lucide-react';

export const BentArcGeometrySlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Bent Arc Geometry"
      leftWidth="50%"
      leftContent={
        <div className="flex flex-col justify-between h-full gap-4 text-left select-text">
          <div>
            <div className="flex items-center space-x-1.5 text-indigo-500 font-bold text-[10px] uppercase mb-1">
              <Compass className="h-4.5 w-4.5" />
              <span>Deformed Geometry</span>
            </div>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground leading-relaxed">
              When moments curl the beam segment, it deforms into an arc of a circle centered at O.
            </SlideParagraph>
          </div>
          <div className="space-y-2 my-2">
            <SlideBullet text="Planar faces AB and CD rotate to form angle dθ (converging at O)." />
            <SlideBullet text="R is the Radius of Curvature measured directly to the Neutral Axis (R'S')." />
            <SlideBullet text="Since NA has zero strain, R'S' remains equal to original length dx: R'S' = R dθ = dx." />
          </div>
          <div className="p-3 bg-muted/20 border border-border/50 rounded-xl text-[9px] text-muted-foreground leading-normal">
            The radius to fiber P'Q' is:
            <div className="mt-1 font-mono font-bold text-[10px] text-center text-indigo-500">
              Radius_fiber = R - y
            </div>
          </div>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-5 flex flex-col items-center justify-center h-full min-h-[260px]">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-4">Bent Arc Geometry</span>
          <DerivationDrawing mode="bent" />
        </div>
      }
    />
  );
};

export default BentArcGeometrySlide;
