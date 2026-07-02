import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideList, SlideParagraph, LatexFormula } from '@/features/presentation/components/elements';
import { ExpandableDrawing } from '@/shared/components';

export const StructuralMappingSlide: React.FC = () => {
  const width = 360;
  const height = 150;
  const paddingY = 20;
  const chartH = 110;

  return (
    <TwoColumnLayout
      title="Dual Stress Distributions: Sagging vs Hogging"
      leftWidth="45%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-4 text-left select-text">
          <SlideList
            title="Sessional Generalization"
            description="Bending stress distributions invert when the sign of the bending moment (curvature) changes."
            revealMode="each-click"
            items={[
              { text: <span>Sagging (Positive Moment: <LatexFormula math="+M" />): Compression at the top, Tension at the bottom.</span>, revealAt: 1 },
              { text: <span>Hogging (Negative Moment: <LatexFormula math="-M" />): Tension at the top, Compression at the bottom.</span>, revealAt: 2 },
              { text: "The Neutral Axis remains the stress transition line in both states.", revealAt: 3 },
            ]}
          />
          <SlideParagraph variant="info" className="text-[10px] my-1">
            {"Always check the sign of the bending moment at the target cross-section before drawing your stress fields!"}
          </SlideParagraph>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center h-full min-h-[260px] w-full">
          <ExpandableDrawing title="Sagging vs Hogging Stress Distributions" description="Bending stress profiles under positive moment (sagging) and negative moment (hogging), showing the compression and tension inversions.">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-[320px] overflow-visible">
              {/* 1. Sagging drawing (Left half) */}
              <g transform="translate(10, 0)">
                <text x={70} y={12} textAnchor="middle" className="fill-muted-foreground text-[10px] font-bold">Sagging (+M)</text>
                <line x1={70} y1={paddingY} x2={70} y2={paddingY + chartH} stroke="var(--border)" strokeWidth={1.2} />
                <line x1={40} y1={paddingY} x2={100} y2={paddingY + chartH} stroke="var(--primary)" strokeWidth={1.5} />
                {/* Top compression (-ve) */}
                <polygon points="70,20 40,20 70,75" fill="#ef4444" fillOpacity={0.12} />
                <text x={38} y={23} textAnchor="end" className="fill-red-500 text-[8px] font-mono font-bold">-σ_c</text>
                {/* Bottom tension (+ve) */}
                <polygon points="70,130 100,130 70,75" fill="#10b981" fillOpacity={0.12} />
                <text x={102} y={133} className="fill-emerald-500 text-[8px] font-mono font-bold">+σ_t</text>
                <line x1={30} y1={75} x2={110} y2={75} stroke="var(--destructive)" strokeWidth={0.8} strokeDasharray="3,1" opacity={0.6} />
                <text x={70} y={145} textAnchor="middle" className="fill-muted-foreground text-[8px] font-bold">Compression on Top</text>
              </g>

              {/* 2. Hogging drawing (Right half) */}
              <g transform="translate(190, 0)">
                <text x={70} y={12} textAnchor="middle" className="fill-muted-foreground text-[10px] font-bold">Hogging (-M)</text>
                <line x1={70} y1={paddingY} x2={70} y2={paddingY + chartH} stroke="var(--border)" strokeWidth={1.2} />
                <line x1={100} y1={paddingY} x2={40} y2={paddingY + chartH} stroke="var(--primary)" strokeWidth={1.5} />
                {/* Top tension (+ve) */}
                <polygon points="70,20 100,20 70,75" fill="#10b981" fillOpacity={0.12} />
                <text x={102} y={23} className="fill-emerald-500 text-[8px] font-mono font-bold">+σ_t</text>
                {/* Bottom compression (-ve) */}
                <polygon points="70,130 40,130 70,75" fill="#ef4444" fillOpacity={0.12} />
                <text x={38} y={133} textAnchor="end" className="fill-red-500 text-[8px] font-mono font-bold">-σ_c</text>
                <line x1={30} y1={75} x2={110} y2={75} stroke="var(--destructive)" strokeWidth={0.8} strokeDasharray="3,1" opacity={0.6} />
                <text x={70} y={145} textAnchor="middle" className="fill-muted-foreground text-[8px] font-bold">Tension on Top</text>
              </g>
            </svg>
          </ExpandableDrawing>
        </div>
      }
    />
  );
};

export default StructuralMappingSlide;
