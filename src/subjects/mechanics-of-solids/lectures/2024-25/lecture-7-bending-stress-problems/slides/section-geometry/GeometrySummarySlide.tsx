import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, SlideEquation } from '@/features/presentation/components/elements';
import { ShieldCheck } from 'lucide-react';

export const GeometrySummarySlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Consolidated Area Properties Summary"
      leftWidth="50%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-4 text-left select-text">
          <div>
            <div className="flex items-center space-x-1.5 text-indigo-500 font-bold text-[10px] uppercase mb-1">
              <ShieldCheck className="h-4.5 w-4.5" />
              <span>Reference Sheet</span>
            </div>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground leading-relaxed">
              Before applying the flexure stress formula, resolve these two geometric steps in sequence.
            </SlideParagraph>
          </div>
          <div className="space-y-3 my-2">
            <div>
              <span className="text-[10px] font-bold text-foreground block mb-1">Step 1: Centroid Location</span>
              <SlideEquation math="\bar{y} = \frac{\sum A_i \cdot y_i}{\sum A_i}" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-foreground block mb-1">Step 2: Moment of Inertia</span>
              <SlideEquation math="I_{xx} = \sum (I_{gi} + A_i \cdot d_i^2)" />
            </div>
          </div>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center h-full min-h-[250px] w-full text-[10px] text-muted-foreground leading-relaxed font-mono">
          <div className="p-4 bg-slate-900 border border-border/40 rounded-xl space-y-2.5 w-full">
            <h4 className="text-indigo-400 font-bold uppercase text-[9px] tracking-wider mb-2">Calculated Constants</h4>
            <p>• Segment 1 Centroid: y1 = 275 mm</p>
            <p>• Segment 2 Centroid: y2 = 150 mm</p>
            <p>• Segment 3 Centroid: y3 = 25 mm</p>
            <hr className="border-border/25 my-1" />
            <p>• Global NA: y_bar = 125.0 mm</p>
            <p>• Global Inertia: I_xx = 255.20 × 10⁶ mm⁴</p>
          </div>
        </div>
      }
    />
  );
};

export default GeometrySummarySlide;
