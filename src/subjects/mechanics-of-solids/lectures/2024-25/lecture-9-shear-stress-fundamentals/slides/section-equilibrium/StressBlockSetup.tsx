import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, SlideCallout } from '@/features/presentation/components/elements';
import { StressElementBlock } from '@/subjects/mechanics-of-solids/features/stress/components/diagrams/StressElementBlock';

export const StressBlockSetup: React.FC = () => {
  const zeroState = { sigmaX: 0, sigmaY: 0, tauXY: 0 };

  return (
    <TwoColumnLayout
      title="Elemental Stress Block Setup"
      leftWidth="55%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-3 text-left">
          <div>
            <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest block mb-1">
              Microscopic Continuum Analysis
            </span>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground">
              To analyze localized internal stresses, we isolate a tiny differential material block (stress element) at a specific coordinate location in our structural body.
            </SlideParagraph>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold text-foreground">The 2D Stress Element representation:</h4>
            <ul className="list-disc pl-4 text-xs text-muted-foreground space-y-1">
              <li>Represents an infinitesimal square particle in a solid.</li>
              <li>Faces are oriented perpendicular to the coordinate axes.</li>
              <li>Used to track normal stresses (σ) and shearing stresses (τ) acting on each face.</li>
            </ul>
          </div>

          <SlideCallout variant="info" className="py-2 px-3 text-[10px]">
            In statics, this block is in perfect equilibrium. Let's apply external transverse loading to see what stresses develop.
          </SlideCallout>
        </div>
      }
      rightContent={
        <div className="flex flex-col items-center justify-center h-full">
          <StressElementBlock state={zeroState} thetaRad={0} />
          <p className="text-[10.5px] text-muted-foreground mt-2 font-mono">
            Unstressed 2D Element Block
          </p>
        </div>
      }
    />
  );
};

export default StressBlockSetup;
