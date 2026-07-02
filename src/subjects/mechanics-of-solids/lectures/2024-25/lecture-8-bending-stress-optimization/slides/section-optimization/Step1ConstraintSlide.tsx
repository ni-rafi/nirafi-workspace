import { SlideParagraph, SlideBullet, SlideEquation, LatexFormula, ClickReveal, ClickHighlight, InteractiveCard } from '@/features/presentation/components/elements';
import { Settings } from 'lucide-react';
import TwoColumnLayout from '@/shared/layouts/TwoColumnLayout';

export const Step1ConstraintSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Step 1: Geometric Constraint Setup"
      leftWidth="55%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-4 text-left select-text">
          <div>
            <div className="flex items-center space-x-1.5 text-indigo-500 font-bold text-[10px] uppercase mb-1">
              <Settings className="h-4.5 w-4.5" />
              <span>Right-Triangle Geometry</span>
            </div>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground leading-relaxed">
              {"Link width "}
              <LatexFormula math="b" />
              {", depth "}
              <LatexFormula math="d" />
              {", and circular diameter "}
              <LatexFormula math="D" />
              {" to reduce variables."}
            </SlideParagraph>
          </div>
          <div className="space-y-2 my-2">
            <SlideBullet text={<span>From Pythagorean theorem on inscribed diagonal: <LatexFormula math="b^2 + d^2 = D^2" />.</span>} revealAt={1} />
            <SlideBullet text={<span>Isolate depth squared: <LatexFormula math="d^2 = D^2 - b^2" />.</span>} revealAt={2} />
            <SlideBullet text={<span>Express Section Modulus <LatexFormula math="Z" />: <LatexFormula math="Z = \frac{b \cdot d^2}{6}" />.</span>} revealAt={3} />
          </div>
          <div className="space-y-1 my-1 text-left">
            <ClickReveal at={4} preset="fade">
              <ClickHighlight at={5} variant="paint" className="block rounded-lg p-1">
                <SlideEquation math="Z = \frac{b \cdot (D^2 - b^2)}{6}" />
              </ClickHighlight>
            </ClickReveal>
          </div>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center h-full min-h-[250px] w-full text-[10px] font-mono leading-relaxed text-muted-foreground">
          <InteractiveCard title="Single Variable Equation" className="w-full text-left">
            <div className="space-y-2 text-xs text-foreground font-mono">
              <p>By substituting <LatexFormula math="d^2" />:</p>
              <p className="text-emerald-500 font-bold"><LatexFormula math="Z = \frac{1}{6} (b \cdot D^2 - b^3)" /></p>
              <p className="text-muted-foreground text-[10px] leading-normal mt-2">Now we have <LatexFormula math="Z" /> as a pure function of width <LatexFormula math="b" />, ready for single-variable calculus optimization!</p>
            </div>
          </InteractiveCard>
        </div>
      }
    />
  );
};

export default Step1ConstraintSlide;
