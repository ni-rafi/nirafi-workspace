import { SlideParagraph, SlideBullet, SlideEquation, LatexFormula, ClickReveal, ClickHighlight, InteractiveCard } from '@/features/presentation/components/elements';
import { Settings } from 'lucide-react';
import TwoColumnLayout from '@/shared/layouts/TwoColumnLayout';

export const ProofAreaConstantSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Proof Setup: Area Constant"
      leftWidth="55%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-4 text-left select-text">
          <div>
            <div className="flex items-center space-x-1.5 text-indigo-500 font-bold text-[10px] uppercase mb-1">
              <Settings className="h-4.5 w-4.5" />
              <span>Mathematical constraints</span>
            </div>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground leading-relaxed">
              {"Formulate the width "}
              <LatexFormula math="b" />
              {" of the rectangular section in terms of the square side length "}
              <LatexFormula math="a" />
              {" and depth "}
              <LatexFormula math="d" />
              {"."}
            </SlideParagraph>
          </div>
          <div className="space-y-2 my-2">
            <SlideBullet text={<span>Area of Square = <LatexFormula math="a^2" /></span>} revealAt={1} />
            <SlideBullet text={<span>Area of Rectangle = <LatexFormula math="b \cdot d" /></span>} revealAt={2} />
            <SlideBullet text={<span>Set Areas equal: <LatexFormula math="a^2 = b \cdot d" /></span>} revealAt={3} />
          </div>
          <div className="space-y-1 my-1 text-left">
            <ClickReveal at={4} preset="fade">
              <ClickHighlight at={5} variant="paint" className="block rounded-lg p-1">
                <SlideEquation math="b = \frac{a^2}{d}" />
              </ClickHighlight>
            </ClickReveal>
          </div>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center h-full min-h-[250px] w-full text-[10px] font-mono leading-relaxed text-muted-foreground">
          <InteractiveCard title="Area Equilibrium" className="w-full text-left">
            <div className="space-y-2 text-xs text-foreground font-mono">
              <p className="text-emerald-500 font-bold">A = <LatexFormula math="a^2 = b \cdot d" /></p>
              <p className="text-muted-foreground text-[10px] leading-normal mt-2">Width <LatexFormula math="b" /> is inversely proportional to depth <LatexFormula math="d" /> for constant area constraint!</p>
            </div>
          </InteractiveCard>
        </div>
      }
    />
  );
};

export default ProofAreaConstantSlide;
