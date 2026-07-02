import React from 'react';
import { ExpandableDrawing } from '@/shared/components';

interface TimberBeamDesignDrawingProps {
  currentClick?: number;
}

export const TimberBeamDesignDrawing: React.FC<TimberBeamDesignDrawingProps> = ({ currentClick = 0 }) => {
  const width = 320;
  const height = 180;

  // Left Side: Loading and diagrams
  const startX = 20;
  const endX = 165;
  const midX = (startX + endX) / 2; // ~92.5

  // Y levels
  const beamY = 30;
  const sfdY = 85;
  const bmdY = 140;

  return (
    <ExpandableDrawing
      title="Timber Beam Design Profile"
      description="Structural loading elevation of the timber beam showing Span L=20ft, concentrated point load P, UDL w, corresponding SFD/BMD analysis, and cross-section parameters with unknown depth d."
      className="max-w-[450px] mx-auto w-full"
    >
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full aspect-[1.78] overflow-visible">
        {/* LEFT: Beam Loading Profile */}
        <g>
          {/* Beam Line */}
          <line x1={startX} y1={beamY} x2={endX} y2={beamY} className="stroke-foreground" strokeWidth={2} />
          
          {/* Supports */}
          <polygon points={`${startX},${beamY} ${startX - 4},${beamY + 6} ${startX + 4},${beamY + 6}`} className="fill-muted-foreground stroke-none" />
          <line x1={startX - 6} y1={beamY + 6} x2={startX + 6} y2={beamY + 6} className="stroke-muted-foreground" strokeWidth={1} />
          <text x={startX} y={beamY + 16} className="fill-muted-foreground text-[11px] font-mono" textAnchor="middle">A</text>

          <polygon points={`${endX},${beamY} ${endX - 4},${beamY + 6} ${endX + 4},${beamY + 6}`} className="fill-muted-foreground stroke-none" />
          <line x1={endX - 6} y1={beamY + 6} x2={endX + 6} y2={beamY + 6} className="stroke-muted-foreground" strokeWidth={1} />
          <circle cx={endX - 2} cy={beamY + 7.5} r={1.2} className="fill-muted-foreground stroke-none" />
          <circle cx={endX + 2} cy={beamY + 7.5} r={1.2} className="fill-muted-foreground stroke-none" />
          <text x={endX} y={beamY + 16} className="fill-muted-foreground text-[11px] font-mono" textAnchor="middle">B</text>

          {/* Concentrated Load at center */}
          <line x1={midX} y1={beamY - 18} x2={midX} y2={beamY} className="stroke-rose-500" strokeWidth={1.5} />
          <polygon points={`${midX},${beamY} ${midX - 2.5},${beamY - 5} ${midX + 2.5},${beamY - 5}`} className="fill-rose-500" />
          <text x={midX} y={beamY - 21} className="fill-rose-500 text-[11px] font-mono font-bold" textAnchor="middle">
            P
          </text>

          {/* UDL (Uniform Load) */}
          <path
            d={`M ${startX} ${beamY - 6} Q ${startX + 10} ${beamY - 12} ${startX + 20} ${beamY - 6}
                Q ${startX + 30} ${beamY - 12} ${startX + 40} ${beamY - 6}
                Q ${startX + 50} ${beamY - 12} ${startX + 60} ${beamY - 6}
                Q ${startX + 70} ${beamY - 12} ${startX + 80} ${beamY - 6}
                Q ${startX + 90} ${beamY - 12} ${startX + 100} ${beamY - 6}
                Q ${startX + 110} ${beamY - 12} ${startX + 120} ${beamY - 6}
                Q ${startX + 130} ${beamY - 12} ${startX + 140} ${beamY - 6}
                Q ${startX + 150} ${beamY - 12} ${endX} ${beamY - 6}`}
            className="fill-none stroke-blue-400"
            strokeWidth={0.8}
          />
          <text x={startX + 30} y={beamY - 14} className="fill-blue-500 text-[11px] font-mono" textAnchor="middle">
            w
          </text>

          {/* Span Dimension (20 ft) */}
          <line x1={startX} y1={beamY - 25} x2={endX} y2={beamY - 25} className="stroke-muted-foreground/30" strokeWidth={0.6} />
          <text x={midX} y={beamY - 28} className="fill-muted-foreground text-[11px] font-mono" textAnchor="middle">
            L = 20 ft
          </text>
        </g>

        {/* LEFT: Shear Force Diagram (SFD) (revealed at step 1+) */}
        <g opacity={currentClick >= 1 ? 1 : 0.05} className="transition-opacity duration-300">
          <line x1={startX} y1={sfdY} x2={endX} y2={sfdY} className="stroke-border" strokeWidth={0.8} />
          <path
            d={`M ${startX} ${sfdY} L ${startX} ${sfdY - 15} L ${midX} ${sfdY - 8} L ${midX} ${sfdY + 12} L ${endX} ${sfdY + 5} L ${endX} ${sfdY}`}
            fill="rgba(59, 130, 246, 0.08)"
            className="stroke-blue-500"
            strokeWidth={1}
          />
          <text x={startX + 10} y={sfdY - 18} className="fill-blue-500 text-[11px] font-mono font-bold">
            +V_max
          </text>
          <text x={endX - 10} y={sfdY + 20} className="fill-blue-500 text-[11px] font-mono font-bold" textAnchor="end">
            -V_max
          </text>
          <text x={startX - 15} y={sfdY + 3.5} className="fill-muted-foreground text-[11px] font-mono font-bold">SFD</text>
        </g>

        {/* LEFT: Bending Moment Diagram (BMD) (revealed at step 2+) */}
        <g opacity={currentClick >= 2 ? 1 : 0.05} className="transition-opacity duration-300">
          <line x1={startX} y1={bmdY} x2={endX} y2={bmdY} className="stroke-border" strokeWidth={0.8} />
          <path
            d={`M ${startX} ${bmdY} Q ${startX + 35} ${bmdY - 22} ${midX} ${bmdY - 25} Q ${endX - 35} ${bmdY - 22} ${endX} ${bmdY}`}
            fill="rgba(245, 158, 11, 0.08)"
            className="stroke-amber-500"
            strokeWidth={1}
          />
          <text x={midX} y={bmdY - 29} className="fill-amber-500 text-[11px] font-mono font-bold" textAnchor="middle">
            M_max
          </text>
          <text x={startX - 15} y={bmdY + 3.5} className="fill-muted-foreground text-[11px] font-mono font-bold">BMD</text>
        </g>

        {/* RIGHT: Cross-Section (revealed at step 3+) */}
        <g opacity={currentClick >= 3 ? 1 : 0.05} className="transition-opacity duration-300">
          <line x1={200} y1={15} x2={200} y2={165} className="stroke-border/40" strokeWidth={1} strokeDasharray="3,1" />

          {/* Rectangular timber cross-section */}
          <rect x={235} y={45} width={45} height={90} className="fill-muted/20 stroke-foreground" strokeWidth={1.5} />

          {/* Width Dimension */}
          <line x1={235} y1={40} x2={280} y2={40} className="stroke-muted-foreground/40" strokeWidth={0.8} />
          <line x1={235} y1={37} x2={235} y2={43} className="stroke-muted-foreground/60" strokeWidth={1} />
          <line x1={280} y1={37} x2={280} y2={43} className="stroke-muted-foreground/60" strokeWidth={1} />
          <text x={257.5} y={32} className="fill-foreground text-[11px] font-mono font-bold" textAnchor="middle">
            10 in.
          </text>

          {/* Depth Dimension */}
          <line x1={288} y1={45} x2={288} y2={135} className="stroke-muted-foreground/40" strokeWidth={0.8} />
          <line x1={285} y1={45} x2={291} y2={45} className="stroke-muted-foreground/60" strokeWidth={1} />
          <line x1={285} y1={135} x2={291} y2={135} className="stroke-muted-foreground/60" strokeWidth={1} />
          <text x={295} y={93.5} className="fill-amber-500 text-[11px] font-mono font-black" textAnchor="start">
            d = ?
          </text>

          {/* Material Label */}
          <text x={257.5} y={150} className="fill-muted-foreground text-[11px] font-mono font-bold" textAnchor="middle">
            Timber Grade
          </text>
        </g>
      </svg>
    </ExpandableDrawing>
  );
};

export default TimberBeamDesignDrawing;
