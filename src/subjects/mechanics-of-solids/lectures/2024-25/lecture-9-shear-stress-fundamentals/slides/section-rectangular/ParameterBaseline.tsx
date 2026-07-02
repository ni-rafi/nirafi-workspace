import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, SlideCallout, LatexFormula, SlideList } from '@/features/presentation/components/elements';
import { RectangularShearPlotting } from './drawings/RectangularShearPlotting';

export const ParameterBaseline: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Constituent Section Parameters"
      leftWidth="55%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-3 text-left">
          <div>
            <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest block mb-1">
              Parameters baseline
            </span>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground">
              We define the exact mathematical expressions for the constituent parameters of our rectangular section:
            </SlideParagraph>
          </div>

          <div className="space-y-2 text-xs text-muted-foreground">
            {/* Moment of Inertia */}
            <div>
              <span className="font-bold text-foreground">1. Moment of Inertia (I):</span>
              <div className="my-1 py-1 text-center bg-background rounded border border-border/20">
                <LatexFormula math="I = \frac{b \cdot h^3}{12}" />
              </div>
            </div>

            {/* Q parameters */}
            <div>
              <span className="font-bold text-foreground">2. Statical Moment (Q = ybar · A'):</span>
              <SlideList
                items={[
                  {
                    text: (
                      <div>
                        Area above height y:
                        <LatexFormula math="A' = b \left( \frac{h}{2} - y \right)" />
                      </div>
                    )
                  },
                  {
                    text: (
                      <div>
                        Centroid arm distance from N.A.:
                        <LatexFormula math="\bar{y} = y + \frac{1}{2}\left( \frac{h}{2} - y \right) = \frac{1}{2}\left( \frac{h}{2} + y \right)" />
                      </div>
                    )
                  }
                ]}
              />
            </div>
          </div>

          <SlideCallout variant="info" className="py-2 px-3 text-[10px]">
            Substituting these expressions into the flexural shear formula will give us the stress variation curve.
          </SlideCallout>
        </div>
      }
      rightContent={
        <div className="flex flex-col items-center justify-center h-full">
          <RectangularShearPlotting plotStep={1} />
          <SlideParagraph variant="plain" className="text-[10.5px] text-muted-foreground mt-2 font-mono">
            Isolating Sub-Area parameters
          </SlideParagraph>
        </div>
      }
    />
  );
};

export default ParameterBaseline;
