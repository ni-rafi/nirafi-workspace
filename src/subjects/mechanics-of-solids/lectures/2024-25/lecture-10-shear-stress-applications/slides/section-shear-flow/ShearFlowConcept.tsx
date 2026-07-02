import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, SlideCallout, LatexFormula, SlideList } from '@/features/presentation/components/elements';
import { BuiltUpFastenersDrawing } from './drawings/BuiltUpFastenersDrawing';

export const ShearFlowConcept: React.FC = () => {
  const propertiesList = [
    { text: <span>Units: Force per unit length (<LatexFormula math="\text{N/m}" /> or <LatexFormula math="\text{kN/m}" />).</span> },
    { text: <span><LatexFormula math="Q" /> is calculated for the connected flange block being secured.</span> },
    { text: <span>Notice that width <LatexFormula math="b" /> is absent, as we integrate across the contact width.</span> }
  ];

  return (
    <TwoColumnLayout
      title="The Concept of Shear Flow (q)"
      leftWidth="48%"
      leftContent={
        <div className="flex flex-col h-full justify-start gap-3.5 text-left select-text">
          <div>
            <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest block mb-1">
              Horizontal interface flow
            </span>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground">
              In built-up beams made of multiple connected components, horizontal shear stress acts along the contact interfaces to prevent them from sliding past each other.
            </SlideParagraph>
          </div>

          <div className="space-y-3 text-[11px] text-muted-foreground">
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground">
              Rather than tracking localized stress (<LatexFormula math="\tau" />), we measure the total horizontal shear force acting per unit length of the beam. This is <strong>Shear Flow</strong> (<LatexFormula math="q" />):
            </SlideParagraph>
            <div className="py-2 text-center bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-indigo-500 font-extrabold text-[12px]">
              <LatexFormula math="q = \tau \cdot b = \frac{V \cdot Q}{I}" />
            </div>
          </div>

          <SlideCallout variant="info" className="py-2 px-3 text-[10px] w-full">
            Shear flow represents the continuous sliding force that must be resisted by connectors like nails, screws, bolts, or glue.
          </SlideCallout>
        </div>
      }
      rightContent={
        <div className="flex flex-col h-full justify-start gap-3 text-left w-full select-text">
          <BuiltUpFastenersDrawing spacing={60} currentClick={0} />

          {/* Properties list below diagram */}
          <div className="space-y-1.5 w-full">
            <SlideParagraph variant="plain" className="font-bold text-foreground text-[11px] uppercase tracking-wider">
              Properties of Shear Flow:
            </SlideParagraph>
            <SlideList items={propertiesList} revealMode="none" />
          </div>
        </div>
      }
    />
  );
};

export default ShearFlowConcept;
