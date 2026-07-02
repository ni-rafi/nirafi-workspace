import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, SlideCallout, LatexFormula, SlideList, ClickReveal, ClickHighlight } from '@/features/presentation/components/elements';
import { ExpandableDrawing } from '@/shared/components';

export const GoverningStressFormula: React.FC = () => {
  const variableDefinitions = [
    { text: <span><LatexFormula math="V" /> = applied internal shear force at the section</span> },
    { text: <span><LatexFormula math="Q" /> = statical moment of area above/below the cut (<LatexFormula math="Q = \int y \, dA" />)</span> },
    { text: <span><LatexFormula math="I" /> = moment of inertia of the entire cross-section</span> },
    { text: <span><LatexFormula math="b" /> = width of the cross-section at the cutting plane level</span> }
  ];

  return (
    <TwoColumnLayout
      title="The Flexural Shear Formula"
      leftWidth="55%"
      leftContent={
        <div className="flex flex-col h-full justify-start gap-3.5 text-left">
          <div>
            <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest block mb-1">
              Finalizing stress relation
            </span>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground">
              To convert the horizontal force <LatexFormula math="\Delta H" /> to shearing stress <LatexFormula math="\tau" />, we divide the force by the longitudinal shearing area <LatexFormula math="\Delta a = b \cdot \Delta x" />:
            </SlideParagraph>
          </div>

          <div className="space-y-3 text-[11px] text-muted-foreground">
            <div>
              <SlideParagraph variant="plain" className="font-bold text-foreground text-[11px] mb-0.5">
                Average Shearing Stress on Cut Plane:
              </SlideParagraph>
              <div className="py-1.5 text-center bg-muted/30 border border-border/40 rounded">
                <LatexFormula math="\tau = \frac{\Delta H}{\Delta a} = \frac{\Delta H}{b \cdot \Delta x}" />
              </div>
            </div>

            <ClickReveal at={1}>
              <div className="space-y-1.5">
                <SlideParagraph variant="plain" className="font-bold text-foreground text-[11px] mb-0.5">
                  Substitute <LatexFormula math="\Delta H = \frac{V \cdot Q}{I} \cdot \Delta x" />:
                </SlideParagraph>
                <div className="py-2.5 text-center bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-indigo-500 font-extrabold text-[12px]">
                  <ClickHighlight variant="paint" at={2} className="inline-block font-extrabold text-[12px]">
                    <LatexFormula math="\tau = \frac{V \cdot Q}{I \cdot b}" />
                  </ClickHighlight>
                </div>
              </div>
            </ClickReveal>
          </div>

          <SlideCallout variant="info" className="py-2 px-3 text-[10px] w-full">
            Shear stress <LatexFormula math="\tau" /> acts both horizontally along the cut and vertically due to complementary shear!
          </SlideCallout>
        </div>
      }
      rightContent={
        <div className="flex flex-col h-full justify-start gap-3 text-left w-full">
          {/* Schematic block drawing */}
          <div className="bg-muted/30 border border-border/50 rounded-xl p-3 flex flex-col items-center justify-center min-h-[160px] w-full">
            <ExpandableDrawing
              title="Longitudinal Shearing Area"
              description="3D block illustrating the shear force ΔH acting across the longitudinal shear interface area dA = b * dx."
              className="max-w-[280px] mx-auto w-full"
            >
              <svg viewBox="0 0 160 140" className="w-full h-full overflow-visible">
                <g transform="translate(20, 20)">
                  <polygon points="20,80 90,80 120,60 50,60" fill="rgba(16, 185, 129, 0.15)" stroke="#10b981" strokeWidth={1} strokeDasharray="3,1" />
                  <line x1={50} y1={60} x2={50} y2={20} stroke="var(--muted-foreground)" strokeWidth={0.8} strokeDasharray="3,3" opacity={0.5} />
                  <line x1={50} y1={20} x2={120} y2={20} stroke="var(--muted-foreground)" strokeWidth={0.8} strokeDasharray="3,3" opacity={0.5} />
                  <line x1={50} y1={20} x2={20} y2={40} stroke="var(--muted-foreground)" strokeWidth={0.8} strokeDasharray="3,3" opacity={0.5} />
                  <polygon points="20,40 90,40 120,20 120,60 90,80 20,80" fill="none" stroke="currentColor" strokeWidth={1.2} />
                  <line x1={90} y1={40} x2={90} y2={80} stroke="currentColor" strokeWidth={1.2} />
                  <line x1={90} y1={40} x2={120} y2={20} stroke="currentColor" strokeWidth={1.2} />
                  <line x1={20} y1={40} x2={20} y2={80} stroke="currentColor" strokeWidth={1.2} />
                  <line x1={-10} y1={70} x2={35} y2={70} className="stroke-indigo-500" strokeWidth={2} />
                  <polygon points="35,70 30,67 30,73" fill="var(--indigo-500)" className="fill-indigo-500" />
                  <text x={10} y={63} className="fill-indigo-500 text-[9px] font-mono font-bold">ΔH</text>
                  <line x1={20} y1={88} x2={90} y2={88} stroke="currentColor" strokeWidth={0.6} />
                  <text x={55} y={97} className="fill-muted-foreground text-[8px] font-mono" textAnchor="middle">Δx</text>
                  <line x1={96} y1={82} x2={124} y2={64} stroke="currentColor" strokeWidth={0.6} />
                  <text x={115} y={80} className="fill-muted-foreground text-[8px] font-mono" textAnchor="middle">b</text>
                  <text x={65} y={70} className="fill-emerald-500 text-[8px] font-mono font-bold" textAnchor="middle">Area = b * Δx</text>
                </g>
              </svg>
            </ExpandableDrawing>
            <SlideParagraph variant="plain" className="text-[9px] text-muted-foreground mt-1 font-mono text-center">
              Longitudinal Shear Interface (b * Δx)
            </SlideParagraph>
          </div>

          {/* Parameters list below drawing on the right column */}
          <ClickReveal at={3}>
            <div className="space-y-1.5 text-[11px] text-muted-foreground w-full">
              <SlideParagraph variant="plain" className="font-bold text-foreground text-[11px]">
                Formula Parameters:
              </SlideParagraph>
              <SlideList items={variableDefinitions} revealMode="none" />
            </div>
          </ClickReveal>
        </div>
      }
    />
  );
};

export default GoverningStressFormula;
