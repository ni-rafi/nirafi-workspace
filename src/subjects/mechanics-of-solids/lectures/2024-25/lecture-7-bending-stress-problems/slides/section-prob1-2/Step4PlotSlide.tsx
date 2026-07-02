import React from 'react';
import { SlideList, LatexFormula } from '@/features/presentation/components/elements';
import { ExpandableDrawing } from '@/shared/components';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';

export const Step4PlotSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Step 4: Plotting the Stress distribution"
      leftWidth="50%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-4 text-left select-text">
          <SlideList
            title="Stress Gradient Plot"
            description="The stress varies linearly across the depth, peaking at the top and bottom fibers, and passing through zero at the neutral axis."
            revealMode="each-click"
            items={[
              { text: <span>Top Fiber: Compression stress = <LatexFormula math="-40\text{ MPa}" />.</span>, revealAt: 1 },
              { text: <span>Neutral Axis (<LatexFormula math="y = 0" />): Bending stress = 0 MPa.</span>, revealAt: 2 },
              { text: <span>Bottom Fiber: Tension stress = <LatexFormula math="+40\text{ MPa}" />.</span>, revealAt: 3 },
            ]}
          />
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center h-full min-h-[250px] w-full">
          <ExpandableDrawing title="Stress Distribution Gradient" description="Plot demonstrating linear variation of bending stress across the beam depth: max compression on the top fiber, zero at the neutral axis, and max tension on the bottom fiber.">
            <svg viewBox="0 0 160 140" className="w-[120px] h-[100px] overflow-visible">
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
          </ExpandableDrawing>
        </div>
      }
    />
  );
};

export default Step4PlotSlide;
