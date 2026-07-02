import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, SlideCallout, LatexFormula, SlideList, ClickReveal, ClickHighlight } from '@/features/presentation/components/elements';
import { useClickStepsContext } from '@/features/presentation/context/ClickStepsContext';
import { ShearFlowDerivationDrawing } from './drawings/ShearFlowDerivationDrawing';

export const ShearFlowDerivation: React.FC = () => {
  const { currentClick } = useClickStepsContext();

  const explanationItems = [
    { text: <span>Shear stress <LatexFormula math="\tau" /> is force per unit area. Multiplying by width <LatexFormula math="b" /> yields the force per unit length along the longitudinal axis.</span> },
    { text: <span>The statical moment <LatexFormula math="Q" /> is calculated for the isolated flange block above the cutting interface.</span> }
  ];

  return (
    <TwoColumnLayout
      title="The Mechanics of Shear Flow (q)"
      leftWidth="48%"
      leftContent={
        <div className="flex flex-col h-full justify-start gap-3.5 text-left select-text">
          <div>
            <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest block mb-1">
              Plank sliding & interface forces
            </span>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground">
              When separate wooden planks are stacked and loaded in bending, they slide past each other along contact surfaces. To lock them into a single rigid beam, fasteners or glue must resist this sliding.
            </SlideParagraph>
          </div>

          <div className="space-y-3 text-[11px] text-muted-foreground">
            <div>
              <SlideParagraph variant="plain" className="font-bold text-foreground text-[11px] mb-0.5">
                Mathematical Derivation:
              </SlideParagraph>
              <SlideParagraph variant="plain" className="text-xs text-muted-foreground mb-1">
                Shear flow <LatexFormula math="q" /> is the shear stress integrated across width <LatexFormula math="b" />, giving force per unit length:
              </SlideParagraph>
              <ClickReveal at={1}>
                <div className="py-2 text-center bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-indigo-500 font-extrabold text-[12px]">
                  <ClickHighlight variant="paint" at={2} className="inline-block font-extrabold text-[12px]">
                    <LatexFormula math="q = \tau \cdot b = \left(\frac{V \cdot Q}{I \cdot b}\right) \cdot b = \frac{V \cdot Q}{I}" />
                  </ClickHighlight>
                </div>
              </ClickReveal>
            </div>
          </div>

          <SlideCallout variant="info" className="py-2 px-3 text-[10px] w-full">
            <strong>Deck of Cards Analogy:</strong> An un-glued stack bends with relative slip, creating a jagged edge. Gluing them halts slip. Shear flow <LatexFormula math="q" /> is the force per millimeter the glue must withstand.
          </SlideCallout>
        </div>
      }
      rightContent={
        <div className="flex flex-col h-full justify-start gap-3 text-left w-full select-text">
          <ShearFlowDerivationDrawing currentClick={currentClick} />

          {/* Explanation parameters below diagram on right column */}
          <ClickReveal at={3}>
            <div className="space-y-1.5 w-full">
              <SlideParagraph variant="plain" className="font-bold text-foreground text-[11px] uppercase tracking-wider">
                Why width b cancels:
              </SlideParagraph>
              <SlideList items={explanationItems} revealMode="none" />
            </div>
          </ClickReveal>
        </div>
      }
    />
  );
};

export default ShearFlowDerivation;
