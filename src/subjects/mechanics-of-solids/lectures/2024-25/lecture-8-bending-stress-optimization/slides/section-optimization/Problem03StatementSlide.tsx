import { SlideParagraph, SlideBullet, InteractiveCard, LatexFormula } from '@/features/presentation/components/elements';
import { HelpCircle } from 'lucide-react';
import TwoColumnLayout from '@/shared/layouts/TwoColumnLayout';

export const Problem03StatementSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Problem 03: Tapered Cantilever Optimization"
      leftWidth="55%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-4 text-left select-text">
          <div>
            <div className="flex items-center space-x-1.5 text-indigo-500 font-bold text-[10px] uppercase mb-1">
              <HelpCircle className="h-4.5 w-4.5" />
              <span>Non-Prismatic Sizing</span>
            </div>
            <SlideParagraph variant="plain" className="text-xs text-foreground font-semibold leading-relaxed">
              {"A cantilever beam of constant width "}
              <LatexFormula math="b = 100\text{ mm}" />
              {" has a depth varying linearly from "}
              <LatexFormula math="h_0 = 150\text{ mm}" />
              {" at the free end to 350 mm at the fixed wall (span length "}
              <LatexFormula math="L = 2.0\text{ m}" />
              {"). If the beam carries a concentrated load "}
              <LatexFormula math="P" />
              {" at the free end, determine the location of the maximum bending stress along the beam axis."}
            </SlideParagraph>
          </div>
          <div className="space-y-1.5 my-1 text-[11px] text-left">
            <SlideBullet text={<span>Width (<LatexFormula math="b" />) = 100 mm</span>} revealAt={1} />
            <SlideBullet text={<span>End depth (<LatexFormula math="h_0" />) = 150 mm, Wall depth = 350 mm.</span>} revealAt={2} />
            <SlideBullet text={<span>Depth variation: <LatexFormula math="h(x) = h_0 + k \cdot x = 150 + 0.1 \cdot x" />.</span>} revealAt={3} />
            <SlideBullet text={<span>Taper rate: <LatexFormula math="k = (350 - 150) / 2000 = 0.1" />.</span>} revealAt={4} />
          </div>
        </div>
      }
      rightContent={
        <div className="flex flex-col justify-center h-full w-full">
          <InteractiveCard title="Intuition Trap" variant="default" spacing="space-y-3">
            <SlideParagraph className="text-xs leading-relaxed text-muted-foreground">
              {"Bending moment is zero at the free end and peaks at the wall ("}
              <LatexFormula math="M_{\max} = P \cdot L" />
              {")."}
            </SlideParagraph>
            <SlideParagraph className="text-xs leading-relaxed text-muted-foreground">
              {"However, the Section Modulus "}
              <LatexFormula math="Z(x)" />
              {" also increases quadratically as the beam thickens ("}
              <LatexFormula math="Z \propto h^2" />
              {")."}
            </SlideParagraph>
            <SlideParagraph className="text-xs leading-relaxed text-amber-500 font-bold">
              {"Will stress peak at the wall or elsewhere?"}
            </SlideParagraph>
          </InteractiveCard>
        </div>
      }
    />
  );
};

export default Problem03StatementSlide;
