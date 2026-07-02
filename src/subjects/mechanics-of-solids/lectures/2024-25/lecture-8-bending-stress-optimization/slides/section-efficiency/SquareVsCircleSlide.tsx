import React from 'react';
import { SlideList, SlideEquation, LatexFormula, ClickReveal } from '@/features/presentation/components/elements';
import { ShapeEfficiencyComparison } from './drawings/ShapeEfficiencyComparison';
import { useClickStepsContext } from '@/features/presentation/context/ClickStepsContext';
import TwoColumnLayout from '@/shared/layouts/TwoColumnLayout';

export const SquareVsCircleSlide: React.FC = () => {
  const { currentClick } = useClickStepsContext();

  return (
    <TwoColumnLayout
      title="Optimization: Square vs Circle"
      leftWidth="42%"
      leftContent={
        <div className="flex flex-col gap-4 text-left select-text">
          <SlideList
            title="Efficiency Ratios"
            description={
              <span>
                For equal areas, a square is structurally more efficient in bending than a circle.
              </span>
            }
            revealMode="each-click"
            items={[
              { text: <span>Set Area: <LatexFormula math="a^2 = \frac{\pi \cdot d^2}{4}" />.</span>, revealAt: 1 },
              { text: <span>Solve dia: <LatexFormula math="d = \frac{2a}{\sqrt{\pi}}" />.</span>, revealAt: 2 },
              { text: "Substitute to find Z ratio:", revealAt: 3 },
              { text: <ClickReveal at={4} preset="fade"><SlideEquation math="\frac{Z_{\text{sq}}}{Z_{\text{circle}}} \approx 1.18" /></ClickReveal>, revealAt: 4 },
              { text: "Square has 18% greater capacity!", revealAt: 5 },
            ]}
          />
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center h-full min-h-[250px] w-full">
          <ShapeEfficiencyComparison click={currentClick} mode="circle" />
        </div>
      }
    />
  );
};

export default SquareVsCircleSlide;
