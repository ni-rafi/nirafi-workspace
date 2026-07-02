import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, SlideCallout, LatexFormula, SlideList } from '@/features/presentation/components/elements';
import { BuiltUpFastenersDrawing } from './drawings/BuiltUpFastenersDrawing';

export const ShearFlowConcept: React.FC = () => {
  return (
    <TwoColumnLayout
      title="The Concept of Shear Flow (q)"
      leftWidth="55%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-3 text-left">
          <div>
            <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest block mb-1">
              Horizontal interface flow
            </span>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground">
              In built-up beams made of multiple connected components, horizontal shear stress acts along the contact interfaces to prevent them from sliding past each other.
            </SlideParagraph>
          </div>

          <div className="space-y-2 text-xs text-muted-foreground">
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground">
              Rather than tracking localized stress (τ), we measure the total horizontal shear force acting per unit length of the beam. This is **Shear Flow** (q):
            </SlideParagraph>
            <div className="py-2 text-center bg-indigo-500/10 rounded-xl border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 font-extrabold text-xs">
              <LatexFormula math="q = \\tau \\cdot b = \\frac{V \\cdot Q}{I}" />
            </div>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground">
              **Properties of Shear Flow:**
            </SlideParagraph>
            <SlideList
              items={[
                { text: 'Units: Force per unit length (N/m or kN/m).' },
                { text: "Q is calculated for the connected flange block being secured." },
                { text: 'Notice that width b is absent, as we integrate across the contact width.' }
              ]}
            />
          </div>

          <SlideCallout variant="info" className="py-2 px-3 text-[10px]">
            Shear flow represents the continuous sliding force that must be resisted by connectors like nails, screws, bolts, or glue.
          </SlideCallout>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center h-full min-h-[250px]">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-2">Built-Up T-Section Interface</span>
          <BuiltUpFastenersDrawing spacing={60} currentClick={0} />
        </div>
      }
    />
  );
};

export default ShearFlowConcept;
