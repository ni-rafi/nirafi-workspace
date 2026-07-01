import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, SlideCallout } from '@/features/presentation/components/elements';

export const AverageShearBaseline: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Average Uniform Shear Stress"
      leftWidth="55%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-3 text-left">
          <div>
            <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest block mb-1">
              Engineering Approximation
            </span>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground">
              In simplified design calculations, engineers often assume that shear stress is distributed uniformly across the entire cross-section area.
            </SlideParagraph>
          </div>

          <div className="space-y-2 text-xs text-muted-foreground">
            <p>
              This average shear stress baseline is defined as:
            </p>
            <div className="bg-rose-500/5 p-3 rounded-xl border border-rose-500/20 text-center font-mono font-bold text-xs text-rose-500">
              τ_avg = V / A = V / (b * h)
            </div>
            <p>
              While simple to calculate, this assumption assumes a constant uniform stress field. It does not account for localized structural variation.
            </p>
          </div>

          <SlideCallout variant="warning" className="py-2 px-3 text-[10px]">
            <strong>Sizing Underestimation:</strong> Using only τ_avg in design is highly unsafe, as it severely underestimates the actual peak stress inside the member.
          </SlideCallout>
        </div>
      }
      rightContent={
        <div className="flex flex-col items-center justify-center h-full">
          {/* Custom SVG showing only average stress block */}
          <div className="flex justify-center border border-border/30 bg-muted/5 rounded-2xl p-4 max-w-[280px] mx-auto w-full shadow-inner">
            <svg viewBox="0 0 300 150" className="w-full h-full aspect-[2.0] overflow-visible">
              {/* Rectangle section */}
              <rect x="40" y="25" width="50" height="100" className="fill-muted/20 stroke-foreground" strokeWidth={1.5} />
              
              {/* Separator line */}
              <line x1="125" y1="15" x2="125" y2="135" className="stroke-border/40" strokeWidth={1} strokeDasharray="3,1" />

              {/* Zero Baseline */}
              <line x1="180" y1="15" x2="180" y2="135" className="stroke-border" strokeWidth={1.2} />
              <text x="180" y="12" textAnchor="middle" className="fill-muted-foreground text-[8px] font-mono">0</text>

              {/* Uniform stress block in pink */}
              <rect
                x="180"
                y="25"
                width="45"
                height="100"
                fill="rgba(244, 63, 94, 0.08)"
                stroke="#f43f5e"
                strokeWidth={1.5}
                strokeDasharray="2,2"
              />
              <text x="230" y="79" className="fill-rose-500 text-[10px] font-mono font-bold" textAnchor="start">
                τ_avg
              </text>
            </svg>
          </div>
          <p className="text-[10.5px] text-muted-foreground mt-2 font-mono">
            Assumed Uniform Stress Distribution
          </p>
        </div>
      }
    />
  );
};

export default AverageShearBaseline;
