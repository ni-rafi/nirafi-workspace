import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, SlideCallout } from '@/features/presentation/components/elements';
import { ShearDerivationDrawing } from './drawings/ShearDerivationDrawing';

export const ResistingHorizontalShear: React.FC = () => {
  return (
    <TwoColumnLayout
      title="The Resisting Horizontal Shear Force"
      leftWidth="50%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-3 text-left">
          <div>
            <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest block mb-1">
              Derivation Phase 5: Shear Force (ΔH)
            </span>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground">
              To keep the isolated block in equilibrium (\(\sum F_x = 0\)), a resisting horizontal shear force (\(\Delta H\)) must develop along the horizontal cut plane.
            </SlideParagraph>
          </div>

          <div className="space-y-2 text-xs text-muted-foreground">
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground">
              This force acts along the longitudinal interface, resisting the sliding motion caused by the bending stress imbalance:
            </SlideParagraph>
            <div className="bg-muted/60 dark:bg-muted/20 p-2 rounded-xl border border-border/40 font-mono text-center text-xs text-emerald-600 dark:text-emerald-400">
              ∑ F_x = 0  ⇒  F_C + ΔH - F_d = 0
            </div>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground">
              Solving for the required resisting force:
            </SlideParagraph>
            <div className="font-mono text-center text-foreground py-1 bg-muted/20 border border-border/40 rounded">
              ΔH = F_d - F_C = ∫ (σ_d - σ_C) dA
            </div>
          </div>

          <SlideCallout variant="success" className="py-2 px-3 text-[10px]">
            This horizontal shear force represents the shearing resistance of the material fibers trying to prevent sliding.
          </SlideCallout>
        </div>
      }
      rightContent={
        <div className="flex flex-col items-center justify-center h-full">
          <ShearDerivationDrawing currentStep={5} />
          <SlideParagraph variant="plain" className="text-[10.5px] text-muted-foreground mt-2 font-mono">
            Step 5: Resisting Horizontal Force ΔH
          </SlideParagraph>
        </div>
      }
    />
  );
};

export default ResistingHorizontalShear;
