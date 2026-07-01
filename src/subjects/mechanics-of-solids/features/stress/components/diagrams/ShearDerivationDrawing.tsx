import React from 'react';

interface ShearDerivationDrawingProps {
  currentStep: number;
}

export const ShearDerivationDrawing: React.FC<ShearDerivationDrawingProps> = ({ currentStep }) => {
  const width = 320;
  const height = 200;
  
  // Coordinates
  const beamX = 60;
  const beamY = 40;
  const beamW = 160;
  const beamH = 100;
  const naY = beamY + beamH / 2; // Neutral Axis at y=90
  const cutY = beamY + 30;       // Horizontal cut at y_1 (y=70, 20px above NA)

  return (
    <div className="flex justify-center border border-border/30 bg-muted/5 rounded-2xl p-4 max-w-[400px] mx-auto w-full shadow-inner">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full aspect-[1.6] overflow-visible">
        {/* Step 1: Base Beam segment */}
        <g opacity={currentStep >= 3 ? 0.3 : 1} className="transition-opacity duration-300">
          {/* Beam body */}
          <rect
            x={beamX}
            y={beamY}
            width={beamW}
            height={beamH}
            className="fill-muted/20 stroke-foreground"
            strokeWidth={1.5}
            strokeDasharray={currentStep >= 3 ? "2,2" : "none"}
          />
          {/* Neutral Axis */}
          <line
            x1={beamX - 15}
            y1={naY}
            x2={beamX + beamW + 15}
            y2={naY}
            className="stroke-destructive"
            strokeWidth={1.2}
            strokeDasharray="4,2"
          />
          <text
            x={beamX + beamW + 20}
            y={naY + 3}
            className="fill-destructive text-[11px] font-mono font-extrabold"
          >
            N.A.
          </text>
        </g>

        {/* Step 2: Splitting plane at height y_1 */}
        {currentStep >= 2 && (
          <g className="animate-fadeIn">
            {/* Cut line */}
            <line
              x1={beamX - 5}
              y1={cutY}
              x2={beamX + beamW + 5}
              y2={cutY}
              className="stroke-indigo-500"
              strokeWidth={1.5}
              strokeDasharray="3,1"
            />
            {/* Height dimension y_1 */}
            <line x1={beamX + 20} y1={naY} x2={beamX + 20} y2={cutY} className="stroke-indigo-400" strokeWidth={1} />
            <polygon points={`${beamX + 20},${cutY} ${beamX + 18},${cutY + 4} ${beamX + 22},${cutY + 4}`} className="fill-indigo-400" />
            <polygon points={`${beamX + 20},${naY} ${beamX + 18},${naY - 4} ${beamX + 22},${naY - 4}`} className="fill-indigo-400" />
            <text x={beamX + 25} y={(naY + cutY) / 2 + 3} className="fill-indigo-500 text-[10px] font-mono font-bold">
              y₁
            </text>
          </g>
        )}

        {/* Step 3: Isolated Upper block (drawn solid when isolated) */}
        {currentStep >= 3 && (
          <g className="animate-fadeIn">
            {/* Isolated Block */}
            <rect
              x={beamX}
              y={beamY}
              width={beamW}
              height={cutY - beamY}
              className="fill-indigo-500/10 stroke-indigo-500"
              strokeWidth={2}
            />
            
            {/* Boundary label */}
            <text x={beamX + beamW / 2} y={beamY + 18} textAnchor="middle" className="fill-indigo-400 text-[11px] font-bold">
              Isolated Upper Block
            </text>
          </g>
        )}

        {/* Step 4: Normal stress force profiles (unequal bending) */}
        {currentStep >= 4 && (
          <g className="animate-fadeIn">
            {/* Left face forces: sigma_C (smaller pushing right) */}
            <path
              d={`M ${beamX - 25} ${beamY} L ${beamX} ${beamY} L ${beamX} ${cutY} L ${beamX - 10} ${cutY} Z`}
              fill="rgba(59, 130, 246, 0.15)"
              stroke="#3b82f6"
              strokeWidth={1}
            />
            {/* Stress arrows left */}
            {[0, 0.5, 1].map((f, i) => {
              const y = beamY + f * (cutY - beamY);
              const len = 25 - f * 15;
              return (
                <g key={`l-${i}`}>
                  <line x1={beamX - len} y1={y} x2={beamX} y2={y} stroke="#3b82f6" strokeWidth={1} />
                  <polygon points={`${beamX},${y} ${beamX - 3},${y - 2} ${beamX - 3},${y + 2}`} fill="#3b82f6" />
                </g>
              );
            })}
            <text x={beamX - 30} y={beamY - 4} textAnchor="end" className="fill-blue-500 text-[11px] font-mono font-bold">
              σ_C
            </text>

            {/* Right face forces: sigma_D (larger pushing left) */}
            <path
              d={`M ${beamX + beamW + 40} ${beamY} L ${beamX + beamW} ${beamY} L ${beamX + beamW} ${cutY} L ${beamX + beamW + 15} ${cutY} Z`}
              fill="rgba(239, 68, 68, 0.15)"
              stroke="#ef4444"
              strokeWidth={1}
            />
            {/* Stress arrows right */}
            {[0, 0.5, 1].map((f, i) => {
              const y = beamY + f * (cutY - beamY);
              const len = 40 - f * 25;
              return (
                <g key={`r-${i}`}>
                  <line x1={beamX + beamW + len} y1={y} x2={beamX + beamW} y2={y} stroke="#ef4444" strokeWidth={1} />
                  <polygon points={`${beamX + beamW},${y} ${beamX + beamW + 3},${y - 2} ${beamX + beamW + 3},${y + 2}`} fill="#ef4444" />
                </g>
              );
            })}
            <text x={beamX + beamW + 45} y={beamY - 4} textAnchor="start" className="fill-red-500 text-[11px] font-mono font-bold">
              σ_d
            </text>
            <text x={beamX + beamW + 45} y={beamY + 10} textAnchor="start" className="fill-muted-foreground text-[9px] font-mono">
              (σ_d &gt; σ_C)
            </text>
          </g>
        )}

        {/* Step 5: Resisting horizontal shear force arrow Delta H */}
        {currentStep >= 5 && (
          <g className="animate-fadeIn">
            {/* Delta H arrow pointing left along the cut plane */}
            <line
              x1={beamX + beamW - 20}
              y1={cutY + 8}
              x2={beamX + 20}
              y2={cutY + 8}
              className="stroke-emerald-500"
              strokeWidth={2.5}
              strokeLinecap="round"
            />
            <polygon
              points={`${beamX + 20},${cutY + 8} ${beamX + 27},${cutY + 5} ${beamX + 27},${cutY + 11}`}
              className="fill-emerald-500"
            />
            <text
              x={beamX + beamW / 2}
              y={cutY + 22}
              textAnchor="middle"
              className="fill-emerald-400 text-[11px] font-mono font-black"
            >
              ΔH (Resisting Shear Force)
            </text>
          </g>
        )}

        {/* Dimension for dx */}
        <g className="stroke-muted-foreground/40" strokeWidth={0.8}>
          <line x1={beamX} y1={beamY + beamH + 5} x2={beamX} y2={beamY + beamH + 20} strokeDasharray="1,1" />
          <line x1={beamX + beamW} y1={beamY + beamH + 5} x2={beamX + beamW} y2={beamY + beamH + 20} strokeDasharray="1,1" />
          <line x1={beamX} y1={beamY + beamH + 15} x2={beamX + beamW} y2={beamY + beamH + 15} />
        </g>
        {/* Dimension ticks for dx */}
        <line x1={beamX - 3} y1={beamY + beamH + 18} x2={beamX + 3} y2={beamY + beamH + 12} className="stroke-muted-foreground" strokeWidth={1} />
        <line x1={beamX + beamW - 3} y1={beamY + beamH + 18} x2={beamX + beamW + 3} y2={beamY + beamH + 12} className="stroke-muted-foreground" strokeWidth={1} />
        <text
          x={beamX + beamW / 2}
          y={beamY + beamH + 28}
          textAnchor="middle"
          className="fill-muted-foreground text-[11px] font-mono"
        >
          Δx
        </text>
      </svg>
    </div>
  );
};
