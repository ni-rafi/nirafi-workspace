import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, LatexFormula, SlideCallout, ClickReveal, ClickHighlight } from '@/features/presentation/components/elements';
import { RectangularShearPlotting } from './drawings/RectangularShearPlotting';

export const ParabolicProof: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Deriving the Parabolic Stress Equation"
      leftWidth="55%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-3 text-left">
          <div>
            <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest block mb-1">
              Algebraic Substitution & Proof
            </span>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground">
              Compute the statical moment of area <LatexFormula math="Q" /> and substitute it into the flexural shear stress equation to prove the parabolic variation:
            </SlideParagraph>
          </div>

          <div className="space-y-3 font-sans text-[11px] leading-relaxed text-muted-foreground">
            {/* Step 1 */}
            <div>
              <SlideParagraph variant="plain" className="font-bold text-foreground text-[11px] mb-0.5">
                Step 1: Formulate the statical moment Q
              </SlideParagraph>
              <div className="my-1 py-1 text-center bg-muted/30 border border-border/40 rounded">
                <LatexFormula math="Q = \bar{y}' \cdot A' = \left[ \frac{1}{2}\left(\frac{h}{2} + y\right) \right] \cdot \left[ b\left(\frac{h}{2} - y\right) \right] = \frac{b}{2}\left( \frac{h^2}{4} - y^2 \right)" />
              </div>
            </div>

            {/* Step 2 */}
            <ClickReveal at={1}>
              <div>
                <SlideParagraph variant="plain" className="font-bold text-foreground text-[11px] mb-0.5">
                  Step 2: Substitute Q into the shear formula
                </SlideParagraph>
                <div className="my-1 py-1 text-center bg-muted/30 border border-border/40 rounded">
                  <LatexFormula math="\tau = \frac{V \cdot \left[ \frac{b}{2}\left( \frac{h^2}{4} - y^2 \right) \right]}{I \cdot b} = \frac{V}{2I}\left( \frac{h^2}{4} - y^2 \right)" />
                </div>
              </div>
            </ClickReveal>

            {/* Step 3 */}
            <ClickReveal at={2}>
              <div>
                <SlideParagraph variant="plain" className="font-bold text-foreground text-[11px] mb-0.5">
                  Step 3: Rearrange using Section Area (<LatexFormula math="A = b \cdot h" />) and Moment of Inertia (<LatexFormula math="I = \frac{bh^3}{12}" />)
                </SlideParagraph>
                <div className="my-1.5 py-1.5 text-center bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 rounded font-bold">
                  <ClickHighlight variant="paint" at={3} className="inline-block font-extrabold text-[11px]">
                    <LatexFormula math="\tau = \frac{3}{2} \cdot \frac{V}{A} \left( 1 - \frac{y^2}{(h/2)^2} \right)" />
                  </ClickHighlight>
                </div>
              </div>
            </ClickReveal>
          </div>

          <SlideCallout variant="info" className="py-2 px-3 text-[10px]">
            Because the coordinate height <LatexFormula math="y" /> is squared and negative (<LatexFormula math="-y^2" />), the shear stress profile is a downward-opening parabola.
          </SlideCallout>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center h-full min-h-[250px]">
          <RectangularShearPlotting plotStep={5} />
          <SlideParagraph variant="plain" className="text-[10px] text-muted-foreground mt-2 font-mono text-center">
            Parabolic Distribution Profile
          </SlideParagraph>
        </div>
      }
    />
  );
};

export default ParabolicProof;
