import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, SlideBullet } from '@/features/presentation/components/elements';
import { Eye } from 'lucide-react';

export const Step4PlotSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Step 4: Plotting the Stress distribution"
      leftWidth="50%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-4 text-left select-text">
          <div>
            <div className="flex items-center space-x-1.5 text-indigo-500 font-bold text-[10px] uppercase mb-1">
              <Eye className="h-4.5 w-4.5" />
              <span>Stress Gradient Plot</span>
            </div>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground leading-relaxed">
              {"The stress varies linearly across the depth, peaking at the top and bottom fibers, and passing through zero at the neutral axis."}
            </SlideParagraph>
          </div>
          <div className="space-y-2 my-2">
            <SlideBullet text="Top Fiber: Compression stress = -40 MPa." />
            <SlideBullet text="Neutral Axis (y = 0): Bending stress = 0 MPa." />
            <SlideBullet text="Bottom Fiber: Tension stress = +40 MPa." />
          </div>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center h-full min-h-[250px] w-full">
          <svg viewBox="0 0 160 140" className="w-[140px] h-[120px] overflow-visible">
            {/* Baseline */}
            <line x1={80} y1={20} x2={80} y2={120} stroke="var(--border)" strokeWidth={1.5} />
            {/* Stress line */}
            <line x1={45} y1={20} x2={115} y2={120} stroke="var(--primary)" strokeWidth={1.8} />
            
            {/* Shaded regions */}
            <polygon points="80,20 45,20 80,70" fill="#ef4444" fillOpacity={0.12} />
            <polygon points="80,120 115,120 80,70" fill="#10b981" fillOpacity={0.12} />

            {/* Labels */}
            <text x={42} y={23} textAnchor="end" className="fill-red-500 text-[8px] font-mono font-bold">-40 MPa (C)</text>
            <text x={118} y={123} className="fill-emerald-500 text-[8px] font-mono font-bold">+40 MPa (T)</text>
            <line x1={35} y1={70} x2={125} y2={70} stroke="var(--destructive)" strokeWidth={0.8} strokeDasharray="3,1" opacity={0.6} />
            <text x={128} y={73} className="fill-destructive text-[8px] font-bold">N.A.</text>
          </svg>
        </div>
      }
    />
  );
};

export default Step4PlotSlide;
