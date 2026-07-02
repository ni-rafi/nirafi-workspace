import React from 'react';
import { ExpandableDrawing } from '@/shared/components';

interface StressBalanceScaleDrawingProps {
  currentClick?: number;
}

export const StressBalanceScaleDrawing: React.FC<StressBalanceScaleDrawingProps> = ({ currentClick = 0 }) => {
  const width = 360;
  const height = 180;

  return (
    <ExpandableDrawing
      title="Bending vs Shear Stress Optimization"
      description="Comparing bending normal stress profile σ (max at extreme fibers) and transverse shear stress profile τ (max at neutral axis) balancing on a mechanical scale to solve design boundaries."
      className="max-w-[450px] mx-auto w-full"
    >
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full aspect-[2.0] overflow-visible">
        {/* Neutral Axis reference lines spanning across panels */}
        <line x1={20} y1={90} x2={110} y2={90} className="stroke-muted-foreground/30 stroke-dasharray-[2,2]" strokeWidth={0.8} />
        <line x1={250} y1={90} x2={340} y2={90} className="stroke-muted-foreground/30 stroke-dasharray-[2,2]" strokeWidth={0.8} />

        {/* LEFT PANEL: Bending Stress Profile (Sigma) */}
        <g id="bending-profile" opacity={currentClick === 0 || currentClick >= 2 ? 1 : 0.2} className="transition-opacity duration-300">
          <text x={65} y={25} className="fill-indigo-500 text-[11px] font-bold" textAnchor="middle">
            Normal Bending Stress (σ)
          </text>
          
          <rect x={55} y={40} width={20} height={100} className="fill-muted/20 stroke-foreground/40" strokeWidth={0.8} />
          <line x1={65} y1={35} x2={65} y2={145} className="stroke-foreground/80" strokeWidth={1} />
          <line x1={35} y1={40} x2={95} y2={140} className="stroke-indigo-500" strokeWidth={1.5} />
          
          <line x1={65} y1={50} x2={85} y2={50} className="stroke-indigo-400" strokeWidth={0.8} markerEnd="url(#arrow-indigo)" />
          <line x1={65} y1={65} x2={75} y2={65} className="stroke-indigo-400" strokeWidth={0.8} markerEnd="url(#arrow-indigo)" />
          <line x1={65} y1={130} x2={45} y2={130} className="stroke-indigo-400" strokeWidth={0.8} markerEnd="url(#arrow-indigo)" />
          <line x1={65} y1={115} x2={55} y2={115} className="stroke-indigo-400" strokeWidth={0.8} markerEnd="url(#arrow-indigo)" />
          
          <text x={95} y={45} className="fill-indigo-600 dark:fill-indigo-400 text-[11px] font-mono font-bold">
            σ_max
          </text>
          <text x={30} y={145} className="fill-indigo-600 dark:fill-indigo-400 text-[11px] font-mono font-bold">
            -σ_max
          </text>
          <text x={65} y={155} className="fill-muted-foreground text-[11px] font-mono" textAnchor="middle">
            Fixed Support Section
          </text>
        </g>

        {/* CENTER PANEL: Balance Scale (revealed at step 2+) */}
        <g id="balance-scale" opacity={currentClick >= 2 ? 1 : 0.05} className="transition-opacity duration-300">
          <polygon points="180,120 173,140 187,140" className="fill-muted stroke-foreground" strokeWidth={1} />
          <line x1={180} y1={85} x2={180} y2={135} className="stroke-foreground" strokeWidth={2} />
          <line x1={140} y1={85} x2={220} y2={85} className="stroke-foreground" strokeWidth={2.5} />
          
          <line x1={140} y1={85} x2={130} y2={115} className="stroke-foreground/60" strokeWidth={0.8} />
          <line x1={140} y1={85} x2={150} y2={115} className="stroke-foreground/60" strokeWidth={0.8} />
          <line x1={130} y1={115} x2={150} y2={115} className="stroke-foreground" strokeWidth={1.5} />
          
          <rect x={133} y={100} width={14} height={15} rx={2} className="fill-indigo-500/20 stroke-indigo-500" strokeWidth={1.2} />
          <text x={140} y={111} className="fill-indigo-600 dark:fill-indigo-400 text-[11px] font-black font-mono" textAnchor="middle">
            σ
          </text>

          <line x1={220} y1={85} x2={210} y2={115} className="stroke-foreground/60" strokeWidth={0.8} />
          <line x1={220} y1={85} x2={230} y2={115} className="stroke-foreground/60" strokeWidth={0.8} />
          <line x1={210} y1={115} x2={230} y2={115} className="stroke-foreground" strokeWidth={1.5} />
          
          <rect x={213} y={100} width={14} height={15} rx={2} className="fill-rose-500/20 stroke-rose-500" strokeWidth={1.2} />
          <text x={220} y={111} className="fill-rose-600 dark:fill-rose-400 text-[11px] font-black font-mono" textAnchor="middle">
            4τ
          </text>

          <text x={180} y={75} className="fill-green-600 dark:fill-green-400 text-[11px] font-mono font-bold" textAnchor="middle">
            σ_max = 4τ_max
          </text>
          <text x={180} y={152} className="fill-muted-foreground text-[11px] font-bold" textAnchor="middle">
            Balanced Design
          </text>
        </g>

        {/* RIGHT PANEL: Shear Stress Profile (Tau) */}
        <g id="shear-profile" opacity={currentClick === 1 || currentClick >= 2 ? 1 : 0.2} className="transition-opacity duration-300">
          <text x={295} y={25} className="fill-rose-500 text-[11px] font-bold" textAnchor="middle">
            Transverse Shear Stress (τ)
          </text>

          <rect x={285} y={40} width={20} height={100} className="fill-muted/20 stroke-foreground/40" strokeWidth={0.8} />
          <line x1={295} y1={35} x2={295} y2={145} className="stroke-foreground/80" strokeWidth={1} />
          <path d="M 295,40 Q 325,90 295,140" className="fill-none stroke-rose-500" strokeWidth={1.5} />

          <line x1={295} y1={90} x2={323} y2={90} className="stroke-rose-400" strokeWidth={0.8} markerEnd="url(#arrow-rose)" />
          <line x1={295} y1={65} x2={313} y2={65} className="stroke-rose-400" strokeWidth={0.8} markerEnd="url(#arrow-rose)" />
          <line x1={295} y1={115} x2={313} y2={115} className="stroke-rose-400" strokeWidth={0.8} markerEnd="url(#arrow-rose)" />
          
          <text x={328} y={93} className="fill-rose-600 dark:fill-rose-400 text-[11px] font-mono font-bold" textAnchor="start">
            τ_max
          </text>
          <text x={295} y={155} className="fill-muted-foreground text-[11px] font-mono" textAnchor="middle">
            Shear Parabola (Max at NA)
          </text>
        </g>

        {/* SVG Arrow Marker definitions */}
        <defs>
          <marker
            id="arrow-indigo"
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto-start-reverse"
          >
            <path d="M 0 2 L 8 5 L 0 8 Z" className="fill-indigo-400" />
          </marker>
          <marker
            id="arrow-rose"
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto-start-reverse"
          >
            <path d="M 0 2 L 8 5 L 0 8 Z" className="fill-rose-400" />
          </marker>
        </defs>
      </svg>
    </ExpandableDrawing>
  );
};

export default StressBalanceScaleDrawing;
