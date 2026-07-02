import React from 'react';
import { ClickSyncedTabs, type ClickSyncedTabItem } from '@/features/presentation/components/elements/ClickSyncedTabs';
import { LatexFormula, SlideParagraph, ClickHighlight } from '@/features/presentation/components/elements';
import { ShearDerivationDrawing } from './drawings/ShearDerivationDrawing';

export const VisualDerivationSteps: React.FC = () => {
  const items: ClickSyncedTabItem[] = [
    {
      title: '1. Segment Isolation',
      badge: 'Length dx',
      badgeVariant: 'primary',
      description: 'Isolate a differential segment from the loaded beam.',
      rightContent: (
        <div className="flex flex-col items-center justify-start gap-2 w-full text-left">
          <ShearDerivationDrawing currentStep={1} />
          <div className="text-[11px] leading-relaxed text-muted-foreground w-full px-1">
            <SlideParagraph variant="plain" className="text-[11px] font-bold text-foreground mb-1">
              Differential Segment Isolation:
            </SlideParagraph>
            <span className="space-y-1 block text-muted-foreground">
              • <strong>Isolate Segment</strong>: Slice a tiny length <LatexFormula math="\Delta x" /> from a loaded beam.
              <br />
              • <strong>Moment Gradient</strong>: Since bending moments vary (<LatexFormula math="dM/dx \neq 0" />), faces experience different moment values: <LatexFormula math="M_C" /> (left) and <LatexFormula math="M_d = M_C + \Delta M" /> (right).
            </span>
          </div>
        </div>
      )
    },
    {
      title: '2. Slicing Plane',
      badge: 'Longitudinal Cut',
      badgeVariant: 'warning',
      description: 'Introduce a longitudinal cut parallel to the Neutral Axis.',
      rightContent: (
        <div className="flex flex-col items-center justify-start gap-2 w-full text-left">
          <ShearDerivationDrawing currentStep={2} />
          <div className="text-[11px] leading-relaxed text-muted-foreground w-full px-1">
            <SlideParagraph variant="plain" className="text-[11px] font-bold text-foreground mb-1">
              Longitudinal Sectioning:
            </SlideParagraph>
            <span className="space-y-1 block text-muted-foreground">
              • <strong>Cut Depth</strong>: Introduce a cutting plane parallel to the Neutral Axis at height <LatexFormula math="y_1" />.
              <br />
              • <strong>Block Separation</strong>: This plane splits our segment into an upper block and a lower portion to expose internal shear stresses.
            </span>
          </div>
        </div>
      )
    },
    {
      title: '3. Upper Block FBD',
      badge: 'FBD Isolation',
      badgeVariant: 'error',
      description: 'Isolate the upper sub-block above height coordinate.',
      rightContent: (
        <div className="flex flex-col items-center justify-start gap-2 w-full text-left">
          <ShearDerivationDrawing currentStep={3} />
          <div className="text-[11px] leading-relaxed text-muted-foreground w-full px-1">
            <SlideParagraph variant="plain" className="text-[11px] font-bold text-foreground mb-1">
              Upper Block Isolation:
            </SlideParagraph>
            <span className="space-y-1 block text-muted-foreground">
              • <strong>Isolate Sub-Block</strong>: Evaluate the FBD of the block portion above the cutting height <LatexFormula math="y_1" />.
              <br />
              • <strong>Stress Imbalance</strong>: Because the right face has a larger moment (<LatexFormula math="M_d > M_C" />), normal bending stresses on the right face (<LatexFormula math="\sigma_d" />) exceed those on the left face (<LatexFormula math="\sigma_C" />).
            </span>
          </div>
        </div>
      )
    },
    {
      title: '4. Stresses to Forces',
      badge: 'Force Integrals',
      badgeVariant: 'info',
      description: 'Integrate the side normal stresses over the sub-area.',
      rightContent: (
        <div className="flex flex-col items-center justify-start gap-2 w-full text-left">
          <ShearDerivationDrawing currentStep={4} />
          <div className="text-[11px] leading-relaxed text-muted-foreground w-full px-1">
            <SlideParagraph variant="plain" className="text-[11px] font-bold text-foreground mb-1">
              Stresses to Forces Integration:
            </SlideParagraph>
            <span className="space-y-1 block text-muted-foreground">
              • <strong>Force Element</strong>: Normal force on element <LatexFormula math="dA" /> is <LatexFormula math="dF = \sigma \cdot dA" />.
              <br />
              • <strong>Left Face Push</strong>: <LatexFormula math="F_C = \int_{A'} \sigma_C \, dA = \int_{A'} \frac{M_C \cdot y}{I} \, dA" />.
              <br />
              • <strong>Right Face Push</strong>: <ClickHighlight variant="paint" at={4} className="inline-block font-bold"><LatexFormula math="F_d = \int_{A'} \sigma_d \, dA = \int_{A'} \frac{(M_C + \Delta M)y}{I} \, dA" /></ClickHighlight>.
            </span>
          </div>
        </div>
      )
    },
    {
      title: '5. Horizontal Equilibrium',
      badge: 'Shear Force ΔH',
      badgeVariant: 'success',
      description: 'Formulate horizontal shear force to balance stresses.',
      rightContent: (
        <div className="flex flex-col items-center justify-start gap-2 w-full text-left">
          <ShearDerivationDrawing currentStep={5} />
          <div className="text-[11px] leading-relaxed text-muted-foreground w-full px-1">
            <SlideParagraph variant="plain" className="text-[11px] font-bold text-foreground mb-1">
              Horizontal Equilibrium:
            </SlideParagraph>
            <span className="space-y-1.5 block text-muted-foreground">
              • <strong>Force Discrepancy</strong>: The difference between pushing forces (<LatexFormula math="F_d - F_C" />) must be balanced to satisfy <LatexFormula math="\sum F_x = 0" />.
              <br />
              • <strong>Resisting Shear</strong>: A horizontal shear force <LatexFormula math="\Delta H" /> must develop along the cut:
              <span className="block font-mono text-[10px] text-foreground bg-muted/40 p-1.5 rounded text-center my-1">
                <ClickHighlight variant="paint" at={6} className="inline-block font-extrabold text-emerald-500">
                  <LatexFormula math="\Delta H = F_d - F_C = \int_{A'} \frac{\Delta M \cdot y}{I} \, dA" />
                </ClickHighlight>
              </span>
            </span>
          </div>
        </div>
      )
    }
  ];

  return (
    <ClickSyncedTabs
      title="Shear Derivation Model"
      items={items}
      leftTitle="Beam Segment Isolation & Force Balance"
      rightTitle="Mechanical Derivation Details"
      leftWidth="48%"
      clickToTabMap={[0, 1, 2, 3, 3, 4, 4]}
    />
  );
};

export default VisualDerivationSteps;
