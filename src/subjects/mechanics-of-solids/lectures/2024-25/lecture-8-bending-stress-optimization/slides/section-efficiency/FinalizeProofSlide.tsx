import { SlideParagraph, SlideBullet, SlideEquation, LatexFormula, ClickReveal, ClickHighlight, InteractiveCard } from '@/features/presentation/components/elements';
import { ShieldCheck } from 'lucide-react';
import TwoColumnLayout from '@/shared/layouts/TwoColumnLayout';

export const FinalizeProofSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Finalizing the Proof (Z_rect > Z_sq)"
      leftWidth="55%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-4 text-left select-text">
          <div>
            <div className="flex items-center space-x-1.5 text-indigo-500 font-bold text-[10px] uppercase mb-1">
              <ShieldCheck className="h-4.5 w-4.5" />
              <span>Bending Efficiency Proof</span>
            </div>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground leading-relaxed">
              {"Evaluate the ratio of the Section Moduli for rectangular and square shapes."}
            </SlideParagraph>
          </div>
          <div className="space-y-2 my-2">
            <SlideBullet text={<span>Section Modulus of Square: <LatexFormula math="Z_{\text{sq}} = a^3 / 6" /></span>} revealAt={1} />
            <SlideBullet text={<span>Section Modulus of Rectangle: <LatexFormula math="Z_{\text{rect}} = b \cdot d^2 / 6" /></span>} revealAt={2} />
            <SlideBullet text={<span>Substitute <LatexFormula math="b = a^2 / d" />: <LatexFormula math="Z_{\text{rect}} = \left(\frac{a^2}{d}\right) \cdot \frac{d^2}{6} = \frac{a^2 \cdot d}{6}" /></span>} revealAt={3} />
          </div>
          <div className="space-y-1 my-1 text-left">
            <ClickReveal at={4} preset="fade">
              <ClickHighlight at={5} variant="paint" className="block rounded-lg p-1">
                <SlideEquation math="\frac{Z_{\text{rect}}}{Z_{\text{sq}}} = \frac{d}{a}" />
              </ClickHighlight>
            </ClickReveal>
          </div>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center h-full min-h-[250px] w-full text-[10px] font-mono leading-relaxed text-muted-foreground">
          <InteractiveCard title="Proof Conclusion" className="w-full text-left">
            <div className="space-y-2 text-xs text-foreground font-mono">
              <p>Since depth <LatexFormula math="d > a" /> for a deep rectangular section:</p>
              <p className="text-emerald-500 font-bold"><LatexFormula math="\frac{Z_{\text{rect}}}{Z_{\text{sq}}} > 1" /></p>
              <p className="text-emerald-500 font-bold"><LatexFormula math="Z_{\text{rect}} > Z_{\text{sq}}" /></p>
              <p className="text-muted-foreground text-[10px] leading-normal mt-2">Hence, a rectangular section is stronger than a square of equal area!</p>
            </div>
          </InteractiveCard>
        </div>
      }
    />
  );
};

export default FinalizeProofSlide;
