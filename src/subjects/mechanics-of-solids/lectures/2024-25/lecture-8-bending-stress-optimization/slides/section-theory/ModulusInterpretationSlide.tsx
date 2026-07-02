import React from 'react';
import { SlideList, SlideEquation, LatexFormula, InteractiveCard } from '@/features/presentation/components/elements';
import TwoColumnLayout from '@/shared/layouts/TwoColumnLayout';

export const ModulusInterpretationSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Physical Interpretation of Z"
      leftWidth="55%"
      leftContent={
        <div className="flex flex-col gap-4 text-left select-text">
          <SlideList
            title="Section Strength Indicator"
            description={
              <span>
                Section Modulus (<LatexFormula math="Z" />) directly quantifies a beam's flexural capacity independent of external forces.
              </span>
            }
            revealMode="each-click"
            items={[
              { text: <span>At a constant allowable stress, moment capacity is directly proportional to <LatexFormula math="Z" />: <LatexFormula math="M_{\text{allow}} = \sigma_{\text{allow}} \cdot Z" />.</span>, revealAt: 1 },
              { text: <span>Larger <LatexFormula math="Z" /> represents a stronger beam that can resist larger bending moments.</span>, revealAt: 2 },
              { text: <span><LatexFormula math="Z" /> has dimensions of Length³ (typically expressed in <LatexFormula math="\text{mm}^3" /> or <LatexFormula math="\text{m}^3" />).</span>, revealAt: 3 },
            ]}
          />
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center h-full min-h-[250px] w-full text-[10px] font-mono leading-relaxed text-muted-foreground">
          <InteractiveCard title="Moment Capacity Formula" className="w-full text-left">
            <div className="space-y-2 text-xs text-foreground font-mono">
              <SlideEquation math="M_{\text{allow}} = \sigma_{\text{allow}} \cdot Z" />
              <p className="mt-2 text-[10px] leading-relaxed text-muted-foreground">For two beams of equal weight and material, the one with the larger <LatexFormula math="Z" /> carries more load safely!</p>
            </div>
          </InteractiveCard>
        </div>
      }
    />
  );
};

export default ModulusInterpretationSlide;
