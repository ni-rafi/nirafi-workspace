import React from 'react';
import { SlideList, LatexFormula, ClickHighlight } from '@/features/presentation/components/elements';
import { ShapeEfficiencyComparison } from './drawings/ShapeEfficiencyComparison';
import { useClickStepsContext } from '@/features/presentation/context/ClickStepsContext';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';

export const SquareVsRectangleSlide: React.FC = () => {
  const { currentClick } = useClickStepsContext();

  return (
    <TwoColumnLayout
      title="Optimization: Square vs Rectangle"
      leftWidth="45%"
      leftContent={
        <div className="flex flex-col gap-4 text-left select-text">
          <ClickHighlight at={4} className="hidden">{' '}</ClickHighlight>
          <SlideList
            title="Sessional Challenge"
            description="Prove that a rectangular section of a beam is stronger than a square section of the same cross-sectional area."
            revealMode="each-click"
            items={[
              { text: "Area (Material Cost/Weight) is kept constant.", revealAt: 1 },
              { text: "Bending occurs about the horizontal neutral axis.", revealAt: 2 },
              { text: <span>Target: show that distributing material vertically increases Section Modulus <LatexFormula math="Z" />.</span>, revealAt: 3 },
              { text: "Conclusion: Deep rectangular sections yield significantly higher capacity (Z).", revealAt: 4 },
            ]}
          />
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center h-full min-h-[250px] w-full">
          <ShapeEfficiencyComparison click={currentClick} mode="rectangle" />
        </div>
      }
    />
  );
};

export default SquareVsRectangleSlide;
