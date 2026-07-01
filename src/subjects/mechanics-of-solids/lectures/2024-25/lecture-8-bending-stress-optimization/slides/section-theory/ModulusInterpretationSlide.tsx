import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, SlideBullet, SlideEquation } from '@/features/presentation/components/elements';
import { ShieldCheck } from 'lucide-react';

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
              {"Section Modulus (Z) directly quantifies a beam's flexural capacity independent of external forces."}
            </SlideParagraph>
          </div>
          <div className="space-y-2 my-2">
            <SlideBullet text="At a constant allowable stress, moment capacity is directly proportional to Z: M_allow = σ_allow * Z." />
            <SlideBullet text="Larger Z represents a stronger beam that can resist larger bending moments." />
            <SlideBullet text="Z has dimensions of Length³ (typically expressed in mm³ or m³)." />
          </div>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center h-full min-h-[250px] w-full text-[10px] font-mono leading-relaxed text-muted-foreground">
          <div className="p-4 bg-slate-900 border border-border/40 rounded-xl w-full text-left space-y-2.5">
            <h4 className="text-indigo-400 font-bold uppercase text-[9px]">Moment Capacity Formula</h4>
            <SlideEquation math="M_{\text{allow}} = \sigma_{\text{allow}} \cdot Z" />
            <p className="mt-2 text-[8px]">For two beams of equal weight and material, the one with the larger Z carries more load safely!</p>
          </div>
        </div>
      }
    />
  );
};

export default ModulusInterpretationSlide;
