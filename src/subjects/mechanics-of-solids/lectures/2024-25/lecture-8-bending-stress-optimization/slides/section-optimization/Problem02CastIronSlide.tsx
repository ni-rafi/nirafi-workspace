import React from 'react';
import { SlideList, LatexFormula, InteractiveCard } from '@/features/presentation/components/elements';
import TwoColumnLayout from '@/shared/layouts/TwoColumnLayout';

export const Problem02CastIronSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Problem 02: Asymmetric limits"
      leftWidth="55%"
      leftContent={
        <div className="flex flex-col gap-4 text-left select-text">
          <SlideList
            title="Cast Iron Beam Design"
            description="A cast iron beam section is an I-section with top flange 80x20mm, bottom flange 160x40mm and web 20x200mm. If the tensile stress is not to exceed 30 MPa and compressive stress 90 MPa, find the maximum uniformly distributed load the beam can carry over a simply supported span of 6m."
            revealMode="each-click"
            items={[
              { text: <span>Symmetric span <LatexFormula math="L = 6\text{ m}" /> simply supported.</span>, revealAt: 1 },
              { text: <span>Unsymmetric I-section creates different fiber distances <LatexFormula math="y_{\text{top}}" /> and <LatexFormula math="y_{\text{bottom}}" />.</span>, revealAt: 2 },
              { text: <span>Cast Iron has asymmetric limits: <LatexFormula math="\sigma_t \le 30\text{ MPa}" />, <LatexFormula math="\sigma_c \le 90\text{ MPa}" />.</span>, revealAt: 3 },
            ]}
          />
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
