import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, SlideBullet, SlideEquation } from '@/features/presentation/components/elements';
import { Settings } from 'lucide-react';

export const Step1CentroidSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Step 1: Locating the Asymmetric Neutral Axis"
      leftWidth="55%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-4 text-left select-text">
          <div>
            <div className="flex items-center space-x-1.5 text-indigo-500 font-bold text-[10px] uppercase mb-1">
              <Settings className="h-4.5 w-4.5" />
              <span>Centroid mapping</span>
            </div>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground leading-relaxed">
              {"Formulate centroid height y_bar from the bottom of the section."}
            </SlideParagraph>
          </div>
          <div className="space-y-1 my-1 text-[11px]">
            <SlideBullet text="Segment 1 (Bottom Flange): A1 = 160x40 = 6400, y1 = 20mm" />
            <SlideBullet text="Segment 2 (Web): A2 = 200x20 = 4000, y2 = 140mm" />
            <SlideBullet text="Segment 3 (Top Flange): A3 = 80x20 = 1600, y3 = 250mm" />
            <SlideBullet text="Total Area ΣA = 12,000 mm²" />
          </div>
          <div className="space-y-1">
            <SlideEquation math="\bar{y} = \frac{(6400 \times 20) + (4000 \times 140) + (1600 \times 250)}{12000}" />
            <SlideEquation math="\bar{y} = 87.11\text{ mm from bottom}" />
          </div>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center h-full min-h-[250px] w-full text-[10px] font-mono leading-relaxed text-muted-foreground">
          <div className="p-4 bg-slate-900 border border-border/40 rounded-xl w-full text-left space-y-2">
            <h4 className="text-indigo-400 font-bold uppercase text-[9px] mb-1">Centroid shift</h4>
            <p>• Total height = 260 mm</p>
            <p className="text-emerald-400 font-bold">y_bottom = 87.11 mm</p>
            <p className="text-emerald-400 font-bold">y_top = 172.89 mm</p>
            <p>Because the centroid NA lies closer to the heavy bottom flange, the top fibers have double the bending distance!</p>
          </div>
        </div>
      }
    />
  );
};

export default Step1CentroidSlide;
