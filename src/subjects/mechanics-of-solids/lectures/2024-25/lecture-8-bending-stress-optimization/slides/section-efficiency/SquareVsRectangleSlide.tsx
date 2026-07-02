import { SlideList, LatexFormula, InteractiveCard } from '@/features/presentation/components/elements';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';

export const SquareVsRectangleSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Optimization: Square vs Rectangle"
      leftWidth="55%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-4 text-left select-text">
          <SlideList
            title="Sessional Challenge"
            description="Prove that a rectangular section of a beam is stronger than a square section of the same cross-sectional area."
            revealMode="each-click"
            items={[
              { text: "Area (Material Cost/Weight) is kept constant.", revealAt: 1 },
              { text: "Bending occurs about the horizontal neutral axis.", revealAt: 2 },
              { text: <span>Target: show that distributing material vertically increases Section Modulus <LatexFormula math="Z" />.</span>, revealAt: 3 },
            ]}
          />
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center h-full min-h-[250px] w-full text-[10px] font-mono leading-relaxed text-muted-foreground">
          <InteractiveCard title="Sizing Variables" className="w-full text-left">
            <div className="space-y-2 text-xs text-foreground font-mono">
              <p>• Square Side: <LatexFormula math="a" /></p>
              <p>• Rect Width: <LatexFormula math="b" /></p>
              <p>• Rect Depth: <LatexFormula math="d" /> (where <LatexFormula math="d > a > b" />)</p>
              <p>• Constant Area: <LatexFormula math="A = a^2 = b \cdot d" /></p>
            </div>
          </InteractiveCard>
        </div>
      }
    />
  );
};

export default SquareVsRectangleSlide;
