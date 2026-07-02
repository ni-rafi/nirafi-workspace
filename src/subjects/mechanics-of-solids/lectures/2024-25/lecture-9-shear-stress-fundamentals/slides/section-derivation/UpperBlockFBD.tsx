import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, SlideCallout, SlideList } from '@/features/presentation/components/elements';
import { ShearDerivationDrawing } from './drawings/ShearDerivationDrawing';

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
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground">
              This block has the following boundary faces:
            </SlideParagraph>
            <SlideList
              items={[
                { text: 'Left vertical face: pushed by normal stresses σ_C.' },
                { text: 'Right vertical face: pushed by normal stresses σ_d.' },
                { text: 'Top face: free boundary (no stress).' },
                { text: 'Bottom cut plane: horizontal interface at height y₁.' }
              ]}
            />
          </div>

          <SlideCallout variant="warning" className="py-2 px-3 text-[10px]">
            Since M_d &gt; M_C, the right face is pushed harder than the left face (σ_d &gt; σ_C). There is a net horizontal force pushing the block.
          </SlideCallout>
        </div>
      }
      rightContent={
        <div className="flex flex-col items-center justify-center h-full">
          <ShearDerivationDrawing currentStep={3} />
          <SlideParagraph variant="plain" className="text-[10.5px] text-muted-foreground mt-2 font-mono">
            Step 3: Isolated Upper Sub-Block
          </SlideParagraph>
        </div>
      }
    />
  );
};

export default UpperBlockFBD;
