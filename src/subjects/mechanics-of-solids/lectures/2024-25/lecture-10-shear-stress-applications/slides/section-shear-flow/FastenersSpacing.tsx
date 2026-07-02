import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, SlideCallout, LatexFormula, SlideList } from '@/features/presentation/components/elements';
import { useClickStepsContext } from '@/features/presentation/context/ClickStepsContext';
import { BuiltUpFastenersDrawing } from './drawings/BuiltUpFastenersDrawing';

export const FastenersSpacing: React.FC = () => {
  const { currentClick } = useClickStepsContext();

  return (
    <TwoColumnLayout
      title="Sizing Fastener Spacing"
      leftWidth="55%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-3 text-left">
          <div>
            <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest block mb-1">
              Discrete Connectors
            </span>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground">
              Nails, bolts, or screws are placed at discrete intervals (spacing s) along the beam longitudinal axis to resist the continuous shear flow.
            </SlideParagraph>
          </div>

          <div className="space-y-2 text-xs text-muted-foreground">
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground">
              Let:
            </SlideParagraph>
            <SlideList
              items={[
                { text: 'F_nail = allowable shear force capacity of a single fastener.' },
                { text: 'n = number of fasteners acting in a transverse row at any cross-section.' },
                { text: 's = longitudinal spacing interval between fastener rows.' }
              ]}
            />
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground">
              The resisting shear capacity per unit length is n · F_nail / s. For equilibrium:
            </SlideParagraph>
            <div className="py-2 text-center bg-indigo-500/10 rounded-xl border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 font-extrabold text-xs">
              <LatexFormula math="s \\le \\frac{n \\cdot F_{\\text{nail}}}{q} = \\frac{n \\cdot F_{\\text{nail}} \\cdot I}{V \\cdot Q}" />
            </div>
          </div>

          <SlideCallout variant="success" className="py-2 px-3 text-[10px]">
            <strong>Sizing Limit:</strong> If the calculated spacing s is larger than the limit, the nails will fail in shear, causing the flange to tear off the web.
          </SlideCallout>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center h-full min-h-[250px]">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-2">Discrete Fastener Pitch (s)</span>
          <BuiltUpFastenersDrawing spacing={80} currentClick={currentClick} />
        </div>
      }
    />
  );
};

export default FastenersSpacing;
