import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, LatexFormula, SlideCallout, ClickReveal, ClickHighlight } from '@/features/presentation/components/elements';
import { useClickStepsContext } from '@/features/presentation/context/ClickStepsContext';
import { ShearDerivationDrawing } from './drawings/ShearDerivationDrawing';

export const EquilibriumProof: React.FC = () => {
  const { currentClick } = useClickStepsContext();
  
  // Maps presentation click step to the drawing's step progression dynamically
  const drawingStep = currentClick === 0 ? 2 : currentClick === 1 ? 3 : currentClick === 2 ? 4 : 5;

  return (
    <TwoColumnLayout
      title="Formulating the Horizontal Equilibrium Proof"
      leftWidth="55%"
      leftContent={
        <div className="flex flex-col h-full justify-start gap-2.5 text-left">
          <div>
            <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest block mb-1">
              Mathematical Derivation Steps
            </span>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground">
              Substitute the flexural normal stress formula <LatexFormula math="\sigma = \frac{M \cdot y}{I}" /> into the horizontal force balance relation to solve the shear force discrepancy:
            </SlideParagraph>
          </div>

          <div className="space-y-2 font-sans text-[11px] leading-relaxed text-muted-foreground">
            {/* Step 1 */}
            <div>
              <SlideParagraph variant="plain" className="font-bold text-foreground text-[11px] mb-0.5">
                Step 1: Force balance along plane
              </SlideParagraph>
              <div className="my-1 py-1 text-center bg-muted/30 border border-border/40 rounded">
                <LatexFormula math="\Delta H = \int_{A'} \sigma_d \, dA - \int_{A'} \sigma_C \, dA = \int_{A'} (\sigma_d - \sigma_C) \, dA" />
              </div>
            </div>

            {/* Step 2 */}
            <ClickReveal at={1}>
              <div>
                <SlideParagraph variant="plain" className="font-bold text-foreground text-[11px] mb-0.5">
                  Step 2: Substitute flexure stress (<LatexFormula math="\sigma_d" /> at <LatexFormula math="M_C + \Delta M" />)
                </SlideParagraph>
                <div className="my-1 py-1 text-center bg-muted/30 border border-border/40 rounded">
                  <LatexFormula math="\Delta H = \int_{A'} \left( \frac{(M_C + \Delta M)y}{I} - \frac{M_C \, y}{I} \right) dA = \int_{A'} \frac{\Delta M \cdot y}{I} \, dA" />
                </div>
              </div>
            </ClickReveal>

            {/* Step 3 */}
            <ClickReveal at={2}>
              <div>
                <SlideParagraph variant="plain" className="font-bold text-foreground text-[11px] mb-0.5">
                  Step 3: Extract constants from integral
                </SlideParagraph>
                <div className="my-1 py-1 text-center bg-muted/30 border border-border/40 rounded">
                  <LatexFormula math="\Delta H = \frac{\Delta M}{I} \int_{A'} y \, dA" />
                </div>
              </div>
            </ClickReveal>

            {/* Step 4 */}
            <ClickReveal at={3}>
              <div>
                <SlideParagraph variant="plain" className="font-bold text-foreground text-[11px] mb-0.5">
                  Step 4: Substitute First Moment Q and differential relation <LatexFormula math="\Delta M = V \cdot \Delta x" />
                </SlideParagraph>
                <div className="my-1.5 py-1.5 text-center bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 rounded font-bold">
                  <ClickHighlight variant="paint" at={4} className="inline-block font-extrabold text-[11px]">
                    <LatexFormula math="\Delta H = \frac{V \cdot Q}{I} \cdot \Delta x" />
                  </ClickHighlight>
                </div>
              </div>
            </ClickReveal>
          </div>
        </div>
      }
      rightContent={
        <div className="flex flex-col h-full justify-start gap-3 text-left w-full">
          {/* FBD Drawing */}
          <div className="bg-muted/30 border border-border/50 rounded-xl p-3 flex flex-col items-center justify-center min-h-[160px] w-full">
            <ShearDerivationDrawing currentStep={drawingStep} />
            <SlideParagraph variant="plain" className="text-[9px] text-muted-foreground mt-1 font-mono text-center">
              Sub-Block Force Balance FBD (Step {drawingStep})
            </SlideParagraph>
          </div>

          {/* Callout shifted to the right column to balance layouts */}
          <ClickReveal at={3}>
            <SlideCallout variant="info" className="py-2 px-3 text-[10px] w-full">
              Moment change rate drives horizontal shear: <LatexFormula math="\frac{dM}{dx} = V" />.
            </SlideCallout>
          </ClickReveal>
        </div>
      }
    />
  );
};

export default EquilibriumProof;
