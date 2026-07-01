import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, SlideBullet } from '@/features/presentation/components/elements';
import { HelpCircle } from 'lucide-react';

export const SquareVsRectangleSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Optimization: Square vs Rectangle"
      leftWidth="55%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-4 text-left select-text">
          <div>
            <div className="flex items-center space-x-1.5 text-indigo-500 font-bold text-[10px] uppercase mb-1">
              <HelpCircle className="h-4.5 w-4.5" />
              <span>Sessional Challenge</span>
            </div>
            <SlideParagraph variant="plain" className="text-xs text-foreground font-semibold leading-relaxed">
              {"Prove that a rectangular section of a beam is stronger than a square section of the same cross-sectional area."}
            </SlideParagraph>
          </div>
          <div className="space-y-2 my-2">
            <SlideBullet text="Area (Material Cost/Weight) is kept constant." />
            <SlideBullet text="Bending occurs about the horizontal neutral axis." />
            <SlideBullet text="Target: show that distributing material vertically increases Section Modulus Z." />
          </div>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center h-full min-h-[250px] w-full text-[10px] font-mono leading-relaxed text-muted-foreground">
          <div className="p-4 bg-slate-900 border border-border/40 rounded-xl w-full text-left space-y-2">
            <h4 className="text-indigo-400 font-bold uppercase text-[9px]">Sizing Variables</h4>
            <p>• Square Side: a</p>
            <p>• Rect Width: b</p>
            <p>• Rect Depth: d (where d &gt; a &gt; b)</p>
            <p>• Constant Area: A = a² = b · d</p>
          </div>
        </div>
      }
    />
  );
};

export default SquareVsRectangleSlide;
