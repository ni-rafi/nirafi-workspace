import React from 'react';

export const StressBalanceScaleDrawing: React.FC = () => {
  const width = 360;
  const height = 180;

  return (
    <div className="flex justify-center border border-border/30 bg-muted/5 rounded-2xl p-4 max-w-[450px] mx-auto w-full shadow-inner">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full aspect-[2.0] overflow-visible">
        {/* Neutral Axis reference lines spanning across panels */}
        <line x1={20} y1={90} x2={110} y2={90} className="stroke-muted-foreground/30 stroke-dasharray-[2,2]" strokeWidth={0.8} />
        <line x1={250} y1={90} x2={340} y2={90} className="stroke-muted-foreground/30 stroke-dasharray-[2,2]" strokeWidth={0.8} />

        {/* LEFT PANEL: Bending Stress Profile (Sigma) */}
        <g id="bending-profile">
          {/* Title */}
          <text x={65} y={25} className="fill-indigo-500 text-[9px] font-bold" textAnchor="middle">
            Normal Bending Stress (σ)
          </text>
          
          {/* Beam Profile Face (2D side view) */}
          <rect x={55} y={40} width={20} height={100} className="fill-muted/20 stroke-foreground/40" strokeWidth={0.8} />
          
          {/* Reference vertical axis */}
          <line x1={65} y1={35} x2={65} y2={145} className="stroke-foreground/80" strokeWidth={1} />
          
          {/* Stress linear slope */}
          <line x1={35} y1={40} x2={95} y2={140} className="stroke-indigo-500" strokeWidth={1.5} />
          
          {/* Tension / Compression Arrows */}
          {/* Top tension arrows */}
          <line x1={65} y1={50} x2={85} y2={50} className="stroke-indigo-400" strokeWidth={0.8} markerEnd="url(#arrow-indigo)" />
          <line x1={65} y1={65} x2={75} y2={65} className="stroke-indigo-400" strokeWidth={0.8} markerEnd="url(#arrow-indigo)" />
          {/* Bottom compression arrows */}
          <line x1={65} y1={130} x2={45} y2={130} className="stroke-indigo-400" strokeWidth={0.8} markerEnd="url(#arrow-indigo)" />
          <line x1={65} y1={115} x2={55} y2={115} className="stroke-indigo-400" strokeWidth={0.8} markerEnd="url(#arrow-indigo)" />
          
          {/* Labels */}
          <text x={95} y={45} className="fill-indigo-600 dark:fill-indigo-400 text-[8px] font-mono font-bold">
            σ_max
          </text>
          <text x={30} y={145} className="fill-indigo-600 dark:fill-indigo-400 text-[8px] font-mono font-bold">
            -σ_max
          </text>
          <text x={65} y={155} className="fill-muted-foreground text-[7px] font-mono" textAnchor="middle">
            Fixed Support Section
          </text>
        </g>

        {/* CENTER PANEL: Balance Scale */}
        <g id="balance-scale">
          {/* Fulcrum (Base Triangle) */}
          <polygon points="180,120 173,140 187,140" className="fill-muted stroke-foreground" strokeWidth={1} />
          
          {/* Main vertical support column */}
          <line x1={180} y1={85} x2={180} y2={135} className="stroke-foreground" strokeWidth={2} />
          
          {/* Horizontal balance beam */}
          <line x1={140} y1={85} x2={220} y2={85} className="stroke-foreground" strokeWidth={2.5} />
          
          {/* Left hanging strings & pan */}
          <line x1={140} y1={85} x2={130} y2={115} className="stroke-foreground/60" strokeWidth={0.8} />
          <line x1={140} y1={85} x2={150} y2={115} className="stroke-foreground/60" strokeWidth={0.8} />
          <line x1={130} y1={115} x2={150} y2={115} className="stroke-foreground" strokeWidth={1.5} />
          {/* Left Weight (σ_max) */}
          <rect x={133} y={100} width={14} height={15} rx={2} className="fill-indigo-500/20 stroke-indigo-500" strokeWidth={1.2} />
          <text x={140} y={110} className="fill-indigo-600 dark:fill-indigo-400 text-[7px] font-black font-mono" textAnchor="middle">
            σ_max
          </text>

          {/* Right hanging strings & pan */}
          <line x1={220} y1={85} x2={210} y2={115} className="stroke-foreground/60" strokeWidth={0.8} />
          <line x1={220} y1={85} x2={230} y2={115} className="stroke-foreground/60" strokeWidth={0.8} />
          <line x1={210} y1={115} x2={230} y2={115} className="stroke-foreground" strokeWidth={1.5} />
          {/* Right Weight (4 * τ_max) */}
          <rect x={213} y={100} width={14} height={15} rx={2} className="fill-rose-500/20 stroke-rose-500" strokeWidth={1.2} />
          <text x={220} y={110} className="fill-rose-600 dark:fill-rose-400 text-[7px] font-black font-mono" textAnchor="middle">
            4τ_max
          </text>

          {/* Balance Scale Title / Status */}
          <text x={180} y={75} className="fill-green-600 dark:fill-green-400 text-[8px] font-mono font-bold" textAnchor="middle">
            σ_max = 4τ_max
          </text>
          <text x={180} y={152} className="fill-muted-foreground text-[8px] font-bold" textAnchor="middle">
            Balanced Design
          </text>
        </g>

        {/* RIGHT PANEL: Shear Stress Profile (Tau) */}
        <g id="shear-profile">
          {/* Title */}
          <text x={295} y={25} className="fill-rose-500 text-[9px] font-bold" textAnchor="middle">
            Transverse Shear Stress (τ)
          </text>

          {/* Beam Profile Face (2D side view) */}
          <rect x={285} y={40} width={20} height={100} className="fill-muted/20 stroke-foreground/40" strokeWidth={0.8} />

          {/* Reference vertical axis */}
          <line x1={295} y1={35} x2={295} y2={145} className="stroke-foreground/80" strokeWidth={1} />

          {/* Stress parabolic curve peaking at neutral axis (y = 90) */}
          {/* Peak at x = 295 + 30 = 325, y = 90 */}
          {/* Ends at x = 295, y = 40 and y = 140 */}
          <path
            d="M 295,40 Q 325,90 295,140"
            className="fill-none stroke-rose-500"
            strokeWidth={1.5}
          />

          {/* Shear Stress arrows */}
          <line x1={295} y1={90} x2={323} y2={90} className="stroke-rose-400" strokeWidth={0.8} markerEnd="url(#arrow-rose)" />
          <line x1={295} y1={65} x2={313} y2={65} className="stroke-rose-400" strokeWidth={0.8} markerEnd="url(#arrow-rose)" />
          <line x1={295} y1={115} x2={313} y2={115} className="stroke-rose-400" strokeWidth={0.8} markerEnd="url(#arrow-rose)" />
          
          {/* Labels */}
          <text x={328} y={93} className="fill-rose-600 dark:fill-rose-400 text-[8px] font-mono font-bold" textAnchor="start">
            τ_max
          </text>
          <text x={295} y={155} className="fill-muted-foreground text-[7px] font-mono" textAnchor="middle">
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
    </div>
  );
};

export default StressBalanceScaleDrawing;
