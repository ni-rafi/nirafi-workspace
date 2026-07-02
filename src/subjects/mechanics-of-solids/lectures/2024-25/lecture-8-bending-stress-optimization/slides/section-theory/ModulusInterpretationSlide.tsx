import { SlideParagraph, SlideBullet, SlideEquation, LatexFormula, InteractiveCard } from '@/features/presentation/components/elements';
import { ShieldCheck } from 'lucide-react';
import TwoColumnLayout from '@/shared/layouts/TwoColumnLayout';

export const ModulusInterpretationSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Physical Interpretation of Z"
      leftWidth="55%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-4 text-left select-text">
          <div>
            <div className="flex items-center space-x-1.5 text-indigo-500 font-bold text-[10px] uppercase mb-1">
              <ShieldCheck className="h-4.5 w-4.5" />
              <span>Section Strength Indicator</span>
            </div>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground leading-relaxed">
              {"Section Modulus ("}
              <LatexFormula math="Z" />
              {") directly quantifies a beam's flexural capacity independent of external forces."}
            </SlideParagraph>
          </div>
          <div className="space-y-2 my-2">
            <SlideBullet text={<span>At a constant allowable stress, moment capacity is directly proportional to <LatexFormula math="Z" />: <LatexFormula math="M_{\text{allow}} = \sigma_{\text{allow}} \cdot Z" />.</span>} revealAt={1} />
            <SlideBullet text={<span>Larger <LatexFormula math="Z" /> represents a stronger beam that can resist larger bending moments.</span>} revealAt={2} />
            <SlideBullet text={<span><LatexFormula math="Z" /> has dimensions of Length<LatexFormula math="^3" /> (typically expressed in <LatexFormula math="\text{mm}^3" /> or <LatexFormula math="\text{m}^3" />).</span>} revealAt={3} />
          </div>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center h-full min-h-[250px] w-full text-[10px] font-mono leading-relaxed text-muted-foreground">
          <InteractiveCard title="Moment Capacity Formula" className="w-full text-left">
            <div className="space-y-2 text-xs text-foreground font-mono">
              <SlideEquation math="M_{\text{allow}} = \sigma_{\text{allow}} \cdot Z" />
              <p className="mt-2 text-[9px] leading-relaxed text-muted-foreground">For two beams of equal weight and material, the one with the larger <LatexFormula math="Z" /> carries more load safely!</p>
            </div>
          </InteractiveCard>
        </div>
      }
    />
  );
};

export default ModulusInterpretationSlide;
