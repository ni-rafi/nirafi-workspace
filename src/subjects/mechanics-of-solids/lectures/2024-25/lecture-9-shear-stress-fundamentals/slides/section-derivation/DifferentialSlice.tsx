import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, SlideCallout } from '@/features/presentation/components/elements';
import { ShearDerivationDrawing } from './drawings/ShearDerivationDrawing';

export const DifferentialSlice: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Infinitesimal Beam Slice"
      leftWidth="50%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-3 text-left">
          <div>
            <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest block mb-1">
              Derivation Phase 1: Section Isolation
            </span>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground">
              To derive the flexural shear stress formula, we isolate a tiny differential length dx from a loaded beam.
            </SlideParagraph>
          </div>

          <div className="space-y-2 text-xs text-muted-foreground">
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground">
              On the left face (plane C), the beam has a bending moment M_C, creating normal bending stresses:
            </SlideParagraph>
            <div className="font-mono text-center text-foreground py-1 bg-muted/20 border border-border/40 rounded">
              σ_C = M_C * y / I
            </div>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground">
              Because the bending moment varies along the beam span (dM/dx ≠ 0), the bending moment on the right face (plane D) is different: M_d = M_C + ΔM.
            </SlideParagraph>
          </div>

          <SlideCallout variant="info" className="py-2 px-3 text-[10px]">
            This change in bending moment creates unequal normal stress distributions on either side of our differential slice.
          </SlideCallout>
        </div>
      }
      rightContent={
        <div className="flex flex-col items-center justify-center h-full">
          <ShearDerivationDrawing currentStep={1} />
          <SlideParagraph variant="plain" className="text-[10.5px] text-muted-foreground mt-2 font-mono">
            Step 1: Infinitesimal Segment dx
          </SlideParagraph>
        </div>
      }
    />
  );
};

export default DifferentialSlice;
