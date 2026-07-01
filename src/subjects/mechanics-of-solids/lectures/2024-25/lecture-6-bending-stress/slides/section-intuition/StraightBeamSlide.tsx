import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, SlideBullet } from '@/features/presentation/components/elements';
import { BeamDeformationDrawing } from './drawings/BeamDeformationDrawing';
import { Layout } from 'lucide-react';

export const StraightBeamSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Undeformed Beam Reference"
      leftWidth="50%"
      leftContent={
        <div className="flex flex-col justify-between h-full gap-4 text-left select-text">
          <div>
            <div className="flex items-center space-x-1.5 text-indigo-500 font-bold text-[10px] uppercase mb-1">
              <Layout className="h-4.5 w-4.5" />
              <span>Beam Element</span>
            </div>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground leading-relaxed">
              We now apply this spring intuition to a solid structural beam element.
            </SlideParagraph>
          </div>
          <div className="space-y-2 my-2">
            <SlideBullet text="Initially, the beam is straight and horizontal." />
            <SlideBullet text="The Neutral Axis (NA) is at the center of gravity (centroid) of the cross section." />
            <SlideBullet text="Before any load is applied, all internal normal stresses are exactly zero." />
          </div>
          <div className="p-3 bg-muted/20 border border-border/50 rounded-xl text-[9px] text-muted-foreground leading-normal">
            Let's see how this horizontal reference line transforms under positive sagging moments.
          </div>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-5 flex flex-col items-center justify-center h-full min-h-[260px]">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-4">Straight Beam Reference</span>
          <BeamDeformationDrawing mode="straight" />
        </div>
      }
    />
  );
};

export default StraightBeamSlide;
