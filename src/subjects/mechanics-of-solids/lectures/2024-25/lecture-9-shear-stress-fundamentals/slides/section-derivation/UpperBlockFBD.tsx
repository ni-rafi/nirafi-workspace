import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, SlideCallout } from '@/features/presentation/components/elements';
import { ShearDerivationDrawing } from '@/subjects/mechanics-of-solids/features/stress/components/diagrams/ShearDerivationDrawing';

export const UpperBlockFBD: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Free Body of the Upper Block"
      leftWidth="50%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-3 text-left">
          <div>
            <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest block mb-1">
              Derivation Phase 3: FBD Isolation
            </span>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground">
              By removing the bottom portion, we can study the isolated upper sub-block above height y₁.
            </SlideParagraph>
          </div>

          <div className="space-y-2 text-xs text-muted-foreground">
            <p>
              This block has the following boundary faces:
            </p>
            <ul className="list-disc pl-4 space-y-1">
              <li>Left vertical face: pushed by normal stresses σ_C.</li>
              <li>Right vertical face: pushed by normal stresses σ_d.</li>
              <li>Top face: free boundary (no stress).</li>
              <li>Bottom cut plane: horizontal interface at height y₁.</li>
            </ul>
          </div>

          <SlideCallout variant="warning" className="py-2 px-3 text-[10px]">
            Since M_d &gt; M_C, the right face is pushed harder than the left face (σ_d &gt; σ_C). There is a net horizontal force pushing the block.
          </SlideCallout>
        </div>
      }
      rightContent={
        <div className="flex flex-col items-center justify-center h-full">
          <ShearDerivationDrawing currentStep={3} />
          <p className="text-[10.5px] text-muted-foreground mt-2 font-mono">
            Step 3: Isolated Upper Sub-Block
          </p>
        </div>
      }
    />
  );
};

export default UpperBlockFBD;
