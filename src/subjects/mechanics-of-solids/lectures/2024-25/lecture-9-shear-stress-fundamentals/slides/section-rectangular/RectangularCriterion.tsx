import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, SlideCallout, LatexFormula, SlideList } from '@/features/presentation/components/elements';
import { RectangularShearPlotting } from './drawings/RectangularShearPlotting';

export const RectangularCriterion: React.FC = () => {
  return (
    <TwoColumnLayout
      title="The Rectangular Shear Criterion"
      leftWidth="55%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-3 text-left">
          <div>
            <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest block mb-1">
              Critical Design Standard
            </span>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground">
              By setting y = 0 (Neutral Axis) in the rectangular stress equation, the parabolic curve reaches its maximum peak value τ_max.
            </SlideParagraph>
          </div>

          <div className="space-y-2 text-xs text-muted-foreground">
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground">
              Substituting the maximum boundary gives:
            </SlideParagraph>
            <div className="py-2 text-center bg-indigo-500/10 rounded-xl border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 font-extrabold text-sm">
              <LatexFormula math="\tau_{\max} = \frac{3}{2} \cdot \frac{V}{A} = 1.5 \cdot \tau_{\text{avg}}" />
            </div>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground">
              This is the **Rectangular Shear Criterion**:
            </SlideParagraph>
            <SlideList
              items={[
                { text: 'The maximum shear stress inside a solid rectangular beam occurs along the central Neutral Axis line.' },
                { text: 'This peak is always exactly **1.5 times (150%)** greater than the simple average uniform stress approximation.' }
              ]}
            />
          </div>

          <SlideCallout variant="success" className="py-2 px-3 text-[10px]">
            <strong>Engineering Rule of Thumb:</strong> When sizing rectangular beams, always design for τ_max = 1.5 * τ_avg to ensure safety.
          </SlideCallout>
        </div>
      }
      rightContent={
        <div className="flex flex-col items-center justify-center h-full">
          <RectangularShearPlotting plotStep={5} />
          <SlideParagraph variant="plain" className="text-[10.5px] text-muted-foreground mt-2 font-mono">
            Maximum Stress Peak: τ_max = 1.5 * τ_avg
          </SlideParagraph>
        </div>
      }
    />
  );
};

export default RectangularCriterion;
