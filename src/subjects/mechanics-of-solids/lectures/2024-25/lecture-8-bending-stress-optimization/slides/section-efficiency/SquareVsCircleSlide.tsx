import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, SlideBullet, SlideEquation } from '@/features/presentation/components/elements';
import { ShapeEfficiencyComparison } from './drawings/ShapeEfficiencyComparison';
import { HelpCircle } from 'lucide-react';

export const SquareVsCircleSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Optimization: Square vs Circle"
      leftWidth="40%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-4 text-left select-text">
          <div>
            <div className="flex items-center space-x-1.5 text-indigo-500 font-bold text-[10px] uppercase mb-1">
              <HelpCircle className="h-4.5 w-4.5" />
              <span>Efficiency Ratios</span>
            </div>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground leading-relaxed">
              {"For equal areas, a square is structurally more efficient in bending than a circle."}
            </SlideParagraph>
          </div>
          <div className="space-y-1.5 my-1 text-[11px]">
            <SlideBullet text="Set Area: a² = π · d² / 4." />
            <SlideBullet text="Solve dia: d = 2a / √π." />
            <SlideBullet text="Substitute to find Z ratio:" />
            <SlideEquation math="\frac{Z_{\text{sq}}}{Z_{\text{circle}}} \approx 1.18" />
            <SlideBullet text="Square has 18% greater capacity!" />
          </div>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center h-full min-h-[250px] w-full">
          <ShapeEfficiencyComparison />
        </div>
      }
    />
  );
};

export default SquareVsCircleSlide;
