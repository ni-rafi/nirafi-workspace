import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, SlideCallout } from '@/features/presentation/components/elements';
import { ShearDerivationDrawing } from '@/subjects/mechanics-of-solids/features/stress/components/diagrams/ShearDerivationDrawing';

export const ForceConversion: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Converting Stresses to Forces"
      leftWidth="50%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-3 text-left">
          <div>
            <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest block mb-1">
              Derivation Phase 4: Pushing Forces
            </span>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground">
              To apply force equilibrium, we must translate the bending stress distributions acting on the vertical faces into integrated force vectors.
            </SlideParagraph>
          </div>

          <div className="space-y-2 text-xs text-muted-foreground">
            <p>
              For any differential area element dA on the cross-section, the force is:
            </p>
            <div className="font-mono text-center text-foreground py-1 bg-muted/20 border border-border/40 rounded">
              dF = σ * dA
            </div>
            <p>
              Integrating this over the shaded area A' (the area above y₁) gives:
            </p>
            <ul className="list-disc pl-4 space-y-1">
              <li>Left pushing force: F_C = ∫ σ_C dA</li>
              <li>Right pushing force: F_d = ∫ σ_d dA</li>
            </ul>
          </div>

          <SlideCallout variant="info" className="py-2 px-3 text-[10px]">
            Since σ_d &gt; σ_C, the right side pushes harder to the left than the left side pushes to the right.
          </SlideCallout>
        </div>
      }
      rightContent={
        <div className="flex flex-col items-center justify-center h-full">
          <ShearDerivationDrawing currentStep={4} />
          <p className="text-[10.5px] text-muted-foreground mt-2 font-mono">
            Step 4: Stress Distributions σ_C and σ_d
          </p>
        </div>
      }
    />
  );
};

export default ForceConversion;
