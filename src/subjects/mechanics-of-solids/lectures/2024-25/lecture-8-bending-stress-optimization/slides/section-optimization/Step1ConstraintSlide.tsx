import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, SlideBullet, SlideEquation } from '@/features/presentation/components/elements';
import { Settings } from 'lucide-react';

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
              {"Link width b, depth d, and circular diameter D to reduce variables."}
            </SlideParagraph>
          </div>
          <div className="space-y-2 my-2">
            <SlideBullet text="From Pythagorean theorem on inscribed diagonal: b² + d² = D²." />
            <SlideBullet text="Isolate depth squared: d² = D² - b²." />
            <SlideBullet text="Express Section Modulus Z: Z = (b · d²) / 6." />
          </div>
          <div className="space-y-1 my-1">
            <SlideEquation math="Z = \frac{b \cdot (D^2 - b^2)}{6}" />
          </div>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center h-full min-h-[250px] w-full text-[10px] font-mono leading-relaxed text-muted-foreground">
          <div className="p-4 bg-slate-900 border border-border/40 rounded-xl w-full text-left space-y-2.5">
            <h4 className="text-indigo-400 font-bold uppercase text-[9px] mb-1">Single Variable Equation</h4>
            <p>By substituting d²:</p>
            <p className="text-emerald-400 font-bold">Z = 1/6 · (b·D² - b³)</p>
            <p>Now we have Z as a pure function of width b, ready for single-variable calculus optimization!</p>
          </div>
        </div>
      }
    />
  );
};

export default Step1ConstraintSlide;
