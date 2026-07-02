import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, SlideCallout, LatexFormula, SlideList, ClickReveal, ClickHighlight } from '@/features/presentation/components/elements';
import { useClickStepsContext } from '@/features/presentation/context/ClickStepsContext';
import { BuiltUpFastenersDrawing } from './drawings/BuiltUpFastenersDrawing';

export const FastenersSpacing: React.FC = () => {
  const { currentClick } = useClickStepsContext();

  const parameterDefinitions = [
    { text: <span><LatexFormula math="F_{\text{nail}}" /> = allowable shear force capacity of a single fastener</span> },
    { text: <span><LatexFormula math="n" /> = number of fasteners acting in a transverse row at any cross-section</span> },
    { text: <span><LatexFormula math="s" /> = longitudinal spacing interval between fastener rows</span> }
  ];

  return (
    <TwoColumnLayout
      title="Sizing Fastener Spacing"
      leftWidth="48%"
      leftContent={
        <div className="flex flex-col h-full justify-start gap-3.5 text-left select-text">
          <div>
            <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest block mb-1">
              Discrete Connectors
            </span>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground">
              Nails, bolts, or screws are placed at discrete intervals (spacing <LatexFormula math="s" />) along the beam longitudinal axis to resist the continuous shear flow.
            </SlideParagraph>
          </div>

          <div className="space-y-2.5 text-[11px] text-muted-foreground">
            <SlideParagraph variant="plain" className="font-bold text-foreground text-[11px]">
              Connection Parameter Definitions:
            </SlideParagraph>
            <SlideList items={parameterDefinitions} revealMode="none" />
          </div>

          <SlideCallout variant="success" className="py-2 px-3 text-[10px] w-full">
            <strong>Sizing Limit:</strong> If the calculated spacing <LatexFormula math="s" /> is larger than the limit, the nails will fail in shear, causing the flange to tear off the web.
          </SlideCallout>
        </div>
      }
      rightContent={
        <div className="flex flex-col h-full justify-start gap-3 text-left w-full select-text">
          <BuiltUpFastenersDrawing spacing={80} currentClick={currentClick} />

          {/* Derivation spacing limits shown on click 1 below the drawing */}
          <ClickReveal at={1}>
            <div className="space-y-1.5 w-full">
              <SlideParagraph variant="plain" className="font-bold text-foreground text-[11px] uppercase tracking-wider">
                Resisting Shear Spacing Limit:
              </SlideParagraph>
              <div className="py-2 text-center bg-indigo-500/10 rounded-lg border border-indigo-500/20 text-indigo-500 font-extrabold text-[12px] w-full">
                <ClickHighlight variant="paint" at={2} className="inline-block font-extrabold text-[12px]">
                  <LatexFormula math="s \le \frac{n \cdot F_{\text{nail}}}{q} = \frac{n \cdot F_{\text{nail}} \cdot I}{V \cdot Q}" />
                </ClickHighlight>
              </div>
            </div>
          </ClickReveal>
        </div>
      }
    />
  );
};

export default FastenersSpacing;
