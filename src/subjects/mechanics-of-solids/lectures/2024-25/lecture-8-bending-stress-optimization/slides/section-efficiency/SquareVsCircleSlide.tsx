import { SlideParagraph, SlideBullet, SlideEquation, LatexFormula, ClickReveal } from '@/features/presentation/components/elements';
import { ShapeEfficiencyComparison } from './drawings/ShapeEfficiencyComparison';
import { HelpCircle } from 'lucide-react';
import TwoColumnLayout from '@/shared/layouts/TwoColumnLayout';

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
          <div className="space-y-1.5 my-1 text-[11px] text-left">
            <SlideBullet text={<span>Set Area: <LatexFormula math="a^2 = \frac{\pi \cdot d^2}{4}" />.</span>} revealAt={1} />
            <SlideBullet text={<span>Solve dia: <LatexFormula math="d = \frac{2a}{\sqrt{\pi}}" />.</span>} revealAt={2} />
            <SlideBullet text="Substitute to find Z ratio:" revealAt={3} />
            <ClickReveal at={4} preset="fade">
              <SlideEquation math="\frac{Z_{\text{sq}}}{Z_{\text{circle}}} \approx 1.18" />
            </ClickReveal>
            <SlideBullet text="Square has 18% greater capacity!" revealAt={5} />
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
