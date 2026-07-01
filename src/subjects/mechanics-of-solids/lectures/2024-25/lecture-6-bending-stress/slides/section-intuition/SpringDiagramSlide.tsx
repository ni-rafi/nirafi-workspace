import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, SlideBullet } from '@/features/presentation/components/elements';
import { SpringDrawing } from './drawings/SpringDrawing';
import { HelpCircle } from 'lucide-react';

export const SpringDiagramSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Deformation of a Bending Spring"
      leftWidth="50%"
      leftContent={
        <div className="flex flex-col justify-between h-full gap-4 text-left select-text">
          <div>
            <div className="flex items-center space-x-1.5 text-indigo-500 font-bold text-[10px] uppercase mb-1">
              <HelpCircle className="h-4.5 w-4.5" />
              <span>Mechanical Analog</span>
            </div>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground leading-relaxed">
              To mathematically track these changes in fiber lengths, let's look at a spring model.
            </SlideParagraph>
          </div>
          <div className="space-y-2 my-2">
            <SlideBullet text="A spring under moments curls into a distinct arc shape." />
            <SlideBullet text="Coils on the outer boundary expand (stretched)." />
            <SlideBullet text="Coils on the inner boundary compress (contracted)." />
            <SlideBullet text="This serves as a visual scale to measure deformation." />
          </div>
          <div className="p-3 bg-muted/20 border border-border/50 rounded-xl text-[9px] text-muted-foreground leading-normal">
            We will trace the exact lengths of these straight and bent spring fibers to formulate strain.
          </div>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-5 flex flex-col items-center justify-center h-full min-h-[260px]">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-4">Lateral Bending Spring</span>
          <SpringDrawing mode="bent" />
        </div>
      }
    />
  );
};

export default SpringDiagramSlide;
