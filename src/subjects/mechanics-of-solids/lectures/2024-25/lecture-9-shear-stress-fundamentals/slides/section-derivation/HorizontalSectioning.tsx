import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, SlideCallout, SlideList } from '@/features/presentation/components/elements';
import { ShearDerivationDrawing } from './drawings/ShearDerivationDrawing';

export const HorizontalSectioning: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Longitudinal Sub-Sectioning"
      leftWidth="50%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-3 text-left">
          <div>
            <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest block mb-1">
              Derivation Phase 2: Slicing Plane
            </span>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground">
              To observe the shear stress at a particular fiber depth, we introduce a horizontal cutting plane parallel to the Neutral Axis at height y₁.
            </SlideParagraph>
          </div>

          <div className="space-y-2 text-xs text-muted-foreground">
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground">
              This splits our segment vertically:
            </SlideParagraph>
            <SlideList
              items={[
                { text: 'An upper sub-block above height y₁ (ranging from y₁ to the top fiber y_max).' },
                { text: 'A lower portion below height y₁.' }
              ]}
            />
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground">
              We will isolate the **upper block** and evaluate its horizontal equilibrium.
            </SlideParagraph>
          </div>

          <SlideCallout variant="info" className="py-2 px-3 text-[10px]">
            The horizontal cutting plane at y₁ is where horizontal shear stresses act to prevent the fibers from sliding past each other.
          </SlideCallout>
        </div>
      }
      rightContent={
        <div className="flex flex-col items-center justify-center h-full">
          <ShearDerivationDrawing currentStep={2} />
          <SlideParagraph variant="plain" className="text-[10.5px] text-muted-foreground mt-2 font-mono">
            Step 2: Splitting Plane at y₁ Above N.A.
          </SlideParagraph>
        </div>
      }
    />
  );
};

export default HorizontalSectioning;
