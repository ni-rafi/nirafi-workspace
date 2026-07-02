import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, SlideCallout, LatexFormula, SlideList } from '@/features/presentation/components/elements';
import { useClickStepsContext } from '@/features/presentation/context/ClickStepsContext';
import { ShearFlowDerivationDrawing } from './drawings/ShearFlowDerivationDrawing';

export const ShearFlowDerivation: React.FC = () => {
  const { currentClick } = useClickStepsContext();

  return (
    <TwoColumnLayout
      title="The Mechanics of Shear Flow (q)"
      leftWidth="52%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-3 text-left">
          <div>
            <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest block mb-1">
              Plank sliding & interface forces
            </span>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground">
              When separate wooden planks are stacked and loaded in bending, they slide past each other along their flat contact surfaces. To lock them into a single rigid beam, a binder (glue or bolts) must resist this longitudinal sliding force.
            </SlideParagraph>
          </div>

          <div className="space-y-2 text-xs text-muted-foreground">
            <h4 className="font-bold text-foreground">Mathematical Derivation:</h4>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground">
              By definition, the shear flow \(q\) is the shear stress \(\tau\) integrated across the section width \(b\), giving force per unit length:
            </SlideParagraph>
            <div className="py-2 text-center bg-indigo-500/10 rounded-xl border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 font-extrabold text-xs">
              <LatexFormula math="q = \\tau \\cdot b = \\left(\\frac{V \\cdot Q}{I \\cdot b}\\right) \\cdot b = \\frac{V \\cdot Q}{I}" />
            </div>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground">
              **Why width b cancels:**
            </SlideParagraph>
            <SlideList
              items={[
                { text: 'Stress \\(\\tau\\) is force/area. Multiplying by width \\(b\\) converts it to force per unit length.' },
                { text: '\\(Q\\) is calculated for the isolated flange block above/below the cutting interface.' }
              ]}
            />
          </div>

          <SlideCallout variant="info" className="py-2 px-3 text-[10px]">
            <strong>Deck of Cards Analogy:</strong> An un-glued stack bends with relative slip, creating a jagged edge. Gluing them halts slip. Shear flow \(q\) is the force per millimeter that the glue line must withstand!
          </SlideCallout>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center h-full min-h-[250px]">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-2">Longitudinal Tearing Force</span>
          <ShearFlowDerivationDrawing currentClick={currentClick} />
        </div>
      }
    />
  );
};

export default ShearFlowDerivation;
