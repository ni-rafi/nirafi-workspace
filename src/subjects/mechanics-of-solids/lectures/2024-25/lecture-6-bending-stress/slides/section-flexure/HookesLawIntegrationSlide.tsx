import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, SlideBullet, SlideEquation } from '@/features/presentation/components/elements';
import { ShieldCheck, Info } from 'lucide-react';

export const HookesLawIntegrationSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Hooke's Law Integration"
      leftWidth="50%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-4 text-left select-text">
          <div>
            <div className="flex items-center space-x-1.5 text-indigo-500 font-bold text-[10px] uppercase mb-1">
              <ShieldCheck className="h-4.5 w-4.5" />
              <span>Hooke's Law Connection</span>
            </div>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground leading-relaxed">
              We now transition from kinematics (deformations) to mechanics (stresses) using Hooke's Law.
            </SlideParagraph>
          </div>
          <div className="space-y-2 my-2">
            <SlideBullet text="Hooke's Law states: normal stress σ = ε E, where E is Young's Modulus." />
            <SlideBullet text="Substitute the kinematic strain relation ε = y / R into Hooke's Law." />
            <SlideBullet text="This yields the stress relation: σ = (y / R) E." />
            <SlideBullet text="Rearranging gives: σ / y = E / R." />
          </div>
          <div className="p-3 bg-indigo-500/[0.03] border border-indigo-500/20 rounded-xl text-[9px] text-indigo-600 dark:text-indigo-400 leading-normal flex items-start gap-1.5">
            <Info className="h-4 w-4 shrink-0 mt-0.5" />
            <span>Since E and R are constant along a given beam segment cross-section, the ratio σ/y is constant, proving stress varies linearly with y.</span>
          </div>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-5 flex flex-col items-center justify-center h-full min-h-[260px] text-center">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-6">First Flexure Equality</span>
          <div className="space-y-6 w-full">
            <div className="p-4 bg-background border border-border/40 rounded-xl">
              <span className="text-[9px] font-mono text-muted-foreground block mb-2">Integrating Hooke's Law:</span>
              <SlideEquation math="\sigma = \varepsilon \cdot E" />
            </div>
            <div className="p-4 bg-background border border-border/40 rounded-xl">
              <span className="text-[9px] font-mono text-muted-foreground block mb-2">Stress-to-Deformation Relation:</span>
              <SlideEquation math="\frac{\sigma}{y} = \frac{E}{R}" />
            </div>
          </div>
        </div>
      }
    />
  );
};

export default HookesLawIntegrationSlide;
