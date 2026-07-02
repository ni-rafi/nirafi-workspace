import { SlideParagraph, SlideBullet, LatexFormula, InteractiveCard } from '@/features/presentation/components/elements';
import { HelpCircle } from 'lucide-react';
import TwoColumnLayout from '@/shared/layouts/TwoColumnLayout';

export const Problem02CastIronSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Problem 02: Asymmetric limits"
      leftWidth="55%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-4 text-left select-text">
          <div>
            <div className="flex items-center space-x-1.5 text-indigo-500 font-bold text-[10px] uppercase mb-1">
              <HelpCircle className="h-4.5 w-4.5" />
              <span>Cast Iron Beam Design</span>
            </div>
            <SlideParagraph variant="plain" className="text-xs text-foreground font-semibold leading-relaxed">
              {"A cast iron beam section is an I-section with top flange 80x20mm, bottom flange 160x40mm and web 20x200mm. If the tensile stress is not to exceed 30 MPa and compressive stress 90 MPa, find the maximum uniformly distributed load the beam can carry over a simply supported span of 6m."}
            </SlideParagraph>
          </div>
          <div className="space-y-1.5 my-1.5">
            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest block mb-0.5">Key parameters</span>
            <SlideBullet text={<span>Symmetric span <LatexFormula math="L = 6\text{ m}" /> simply supported.</span>} revealAt={1} />
            <SlideBullet text={<span>Unsymmetric I-section creates different fiber distances <LatexFormula math="y_{\text{top}}" /> and <LatexFormula math="y_{\text{bottom}}" />.</span>} revealAt={2} />
            <SlideBullet text={<span>Cast Iron has asymmetric limits: <LatexFormula math="\sigma_t \le 30\text{ MPa}" />, <LatexFormula math="\sigma_c \le 90\text{ MPa}" />.</span>} revealAt={3} />
          </div>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center h-full min-h-[250px] w-full text-[10px] text-muted-foreground leading-relaxed">
          <InteractiveCard title="Challenge Context" className="w-full text-left">
            <div className="space-y-2 text-xs text-foreground font-mono">
              <p>Because the bottom flange is heavy, the centroid NA shifts downwards.</p>
              <p>Under positive bending (sagging):</p>
              <p className="text-amber-500 font-bold">• Bottom fibers: Tension (<LatexFormula math="\sigma_t" /> limit)</p>
              <p className="text-amber-500 font-bold">• Top fibers: Compression (<LatexFormula math="\sigma_c" /> limit)</p>
            </div>
          </InteractiveCard>
        </div>
      }
    />
  );
};

export default Problem02CastIronSlide;
