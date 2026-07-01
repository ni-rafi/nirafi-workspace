import React from 'react';

export const ShearFlowDerivationDrawing: React.FC = () => {
  const width = 360;
  const height = 220;

  // Isometric projections
  const centerX = 175;
  const centerY = 110;
  
  // proj(x, y, z) where:
  // x is width (transverse left-up, 150 deg)
  // z is length (longitudinal right-up, 30 deg)
  // y is vertical (upward positive)
  const proj = (x: number, y: number, z: number) => {
    const sx = centerX + (z - x) * 0.866;
    const sy = centerY + (z + x) * 0.5 - y;
    return `${sx.toFixed(1)},${sy.toFixed(1)}`;
  };

  // Top Flange Block y-offset (exploded slightly upwards to show interface gap)
  const flangeYShift = 20;

  return (
    <div className="flex justify-center border border-border/30 bg-muted/5 rounded-2xl p-4 max-w-[450px] mx-auto w-full shadow-inner">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full aspect-[1.64] overflow-visible">
        {/* Grids / Ground Plane reference */}
        <path
          d={`M ${proj(-60, -55, 0)} L ${proj(60, -55, 0)} L ${proj(60, -55, 120)} L ${proj(-60, -55, 120)} Z`}
          className="fill-muted/5 stroke-border/20"
          strokeWidth={0.8}
        />

        {/* BOTTOM BLOCK (Web) */}
        <g id="web-block">
          {/* Back Hidden Face (dashed) */}
          <path
            d={`M ${proj(-15, -45, 0)} L ${proj(-15, 15, 0)}`}
            className="stroke-muted-foreground/30"
            strokeDasharray="2,2"
            strokeWidth={1}
          />
          <path
            d={`M ${proj(-15, -45, 0)} L ${proj(15, -45, 0)}`}
            className="stroke-muted-foreground/30"
            strokeDasharray="2,2"
            strokeWidth={1}
          />

          {/* Left Side Face */}
          <path
            d={`M ${proj(-15, -45, 0)} L ${proj(-15, -45, 120)} L ${proj(-15, 15, 120)} L ${proj(-15, 15, 0)} Z`}
            className="fill-sky-500/10 stroke-foreground/70"
            strokeWidth={1}
          />

          {/* Bottom Face */}
          <path
            d={`M ${proj(-15, -45, 120)} L ${proj(15, -45, 120)} L ${proj(15, -45, 0)} L ${proj(-15, -45, 0)} Z`}
            className="fill-sky-500/5 stroke-foreground/70"
            strokeWidth={1}
          />

          {/* Right Side Face */}
          <path
            d={`M ${proj(15, -45, 0)} L ${proj(15, -45, 120)} L ${proj(15, 15, 120)} L ${proj(15, 15, 0)} Z`}
            className="fill-sky-500/20 stroke-foreground"
            strokeWidth={1}
          />

          {/* Front Web Face (z = 120) */}
          <path
            d={`M ${proj(-15, -45, 120)} L ${proj(15, -45, 120)} L ${proj(15, 15, 120)} L ${proj(-15, 15, 120)} Z`}
            className="fill-sky-500/15 stroke-foreground"
            strokeWidth={1.2}
          />

          {/* Top Interface Face (where glue/shear acts) */}
          <path
            d={`M ${proj(-15, 15, 0)} L ${proj(15, 15, 0)} L ${proj(15, 15, 120)} L ${proj(-15, 15, 120)} Z`}
            className="fill-amber-500/10 stroke-amber-500/80 stroke-dasharray-[3,3]"
            strokeWidth={1.2}
          />
        </g>

        {/* Shear Flow Arrow on Web (acting in +z direction along top face) */}
        <g id="shear-force-web">
          {/* Longitudinal Shear Force on web */}
          <line
            x1={proj(0, 15, 40).split(',')[0]}
            y1={proj(0, 15, 40).split(',')[1]}
            x2={proj(0, 15, 90).split(',')[0]}
            y2={proj(0, 15, 90).split(',')[1]}
            className="stroke-red-500"
            strokeWidth={2}
            markerEnd="url(#arrow-red)"
          />
          <text
            x={proj(10, 20, 65).split(',')[0]}
            y={proj(10, 20, 65).split(',')[1]}
            className="fill-red-500 text-[9px] font-mono font-bold"
          >
            F_shear
          </text>
        </g>

        {/* EXPLODED INTERFACE GAP INDICATOR */}
        <g id="interface-connector" opacity={0.6}>
          {/* Vertical dashed alignment lines between blocks */}
          <line
            x1={proj(-15, 15, 120).split(',')[0]}
            y1={proj(-15, 15, 120).split(',')[1]}
            x2={proj(-15, 15 + flangeYShift, 120).split(',')[0]}
            y2={proj(-15, 15 + flangeYShift, 120).split(',')[1]}
            className="stroke-amber-500"
            strokeWidth={1}
            strokeDasharray="2,2"
          />
          <line
            x1={proj(15, 15, 120).split(',')[0]}
            y1={proj(15, 15, 120).split(',')[1]}
            x2={proj(15, 15 + flangeYShift, 120).split(',')[0]}
            y2={proj(15, 15 + flangeYShift, 120).split(',')[1]}
            className="stroke-amber-500"
            strokeWidth={1}
            strokeDasharray="2,2"
          />
          <line
            x1={proj(15, 15, 0).split(',')[0]}
            y1={proj(15, 15, 0).split(',')[1]}
            x2={proj(15, 15 + flangeYShift, 0).split(',')[0]}
            y2={proj(15, 15 + flangeYShift, 0).split(',')[1]}
            className="stroke-amber-500"
            strokeWidth={1}
            strokeDasharray="2,2"
          />
        </g>

        {/* TOP BLOCK (Flange) - Shifted vertically by flangeYShift */}
        <g id="flange-block">
          {/* Bottom face of flange (sliding interface under surface) */}
          <path
            d={`M ${proj(-45, 15 + flangeYShift, 0)} L ${proj(45, 15 + flangeYShift, 0)} L ${proj(45, 15 + flangeYShift, 120)} L ${proj(-45, 15 + flangeYShift, 120)} Z`}
            className="fill-indigo-500/5 stroke-foreground/40"
            strokeWidth={0.8}
          />
          
          {/* Contact width mapping (corresponds to web width b below) */}
          <path
            d={`M ${proj(-15, 15 + flangeYShift, 0)} L ${proj(15, 15 + flangeYShift, 0)} L ${proj(15, 15 + flangeYShift, 120)} L ${proj(-15, 15 + flangeYShift, 120)} Z`}
            className="fill-amber-500/10 stroke-amber-500/50"
            strokeWidth={1}
            strokeDasharray="2,1"
          />

          {/* Left Side Face */}
          <path
            d={`M ${proj(-45, 15 + flangeYShift, 0)} L ${proj(-45, 15 + flangeYShift, 120)} L ${proj(-45, 35 + flangeYShift, 120)} L ${proj(-45, 35 + flangeYShift, 0)} Z`}
            className="fill-indigo-500/10 stroke-foreground/70"
            strokeWidth={1}
          />

          {/* Right Side Face */}
          <path
            d={`M ${proj(45, 15 + flangeYShift, 0)} L ${proj(45, 15 + flangeYShift, 120)} L ${proj(45, 35 + flangeYShift, 120)} L ${proj(45, 35 + flangeYShift, 0)} Z`}
            className="fill-indigo-500/25 stroke-foreground"
            strokeWidth={1}
          />

          {/* Front Flange Face (z = 120) */}
          <path
            d={`M ${proj(-45, 15 + flangeYShift, 120)} L ${proj(45, 15 + flangeYShift, 120)} L ${proj(45, 35 + flangeYShift, 120)} L ${proj(-45, 35 + flangeYShift, 120)} Z`}
            className="fill-indigo-500/20 stroke-foreground"
            strokeWidth={1.2}
          />

          {/* Top Face */}
          <path
            d={`M ${proj(-45, 35 + flangeYShift, 0)} L ${proj(45, 35 + flangeYShift, 0)} L ${proj(45, 35 + flangeYShift, 120)} L ${proj(-45, 35 + flangeYShift, 120)} Z`}
            className="fill-indigo-500/15 stroke-foreground"
            strokeWidth={1}
          />

          {/* Longitudinal Shear Force reaction on flange (acting in -z direction) */}
          <g id="shear-reaction-flange">
            <line
              x1={proj(0, 15 + flangeYShift, 80).split(',')[0]}
              y1={proj(0, 15 + flangeYShift, 80).split(',')[1]}
              x2={proj(0, 15 + flangeYShift, 30).split(',')[0]}
              y2={proj(0, 15 + flangeYShift, 30).split(',')[1]}
              className="stroke-red-500"
              strokeWidth={2}
              markerEnd="url(#arrow-red)"
            />
            <text
              x={proj(-22, 10 + flangeYShift, 50).split(',')[0]}
              y={proj(-22, 10 + flangeYShift, 50).split(',')[1]}
              className="fill-red-500 text-[9px] font-mono font-bold"
            >
              F_shear'
            </text>
          </g>

          {/* Highlighted Delta Z slice (tracking unit length dx = 1 mm) */}
          <g id="delta-z-slice">
            {/* Outline band around the flange */}
            <path
              d={`M ${proj(-45, 15 + flangeYShift, 50)} L ${proj(45, 15 + flangeYShift, 50)} L ${proj(45, 35 + flangeYShift, 50)} L ${proj(-45, 35 + flangeYShift, 50)} Z`}
              className="fill-none stroke-amber-500/80"
              strokeWidth={1.2}
              strokeDasharray="2,2"
            />
            <path
              d={`M ${proj(-45, 15 + flangeYShift, 70)} L ${proj(45, 15 + flangeYShift, 70)} L ${proj(45, 35 + flangeYShift, 70)} L ${proj(-45, 35 + flangeYShift, 70)} Z`}
              className="fill-none stroke-amber-500/80"
              strokeWidth={1.2}
              strokeDasharray="2,2"
            />
            {/* Colored side stripe showing unit length dx */}
            <path
              d={`M ${proj(45, 15 + flangeYShift, 50)} L ${proj(45, 15 + flangeYShift, 70)} L ${proj(45, 35 + flangeYShift, 70)} L ${proj(45, 35 + flangeYShift, 50)} Z`}
              className="fill-amber-500/20 stroke-amber-500"
              strokeWidth={1}
            />
            
            {/* Dimension lines for dx */}
            <line
              x1={proj(50, 15 + flangeYShift, 50).split(',')[0]}
              y1={proj(50, 15 + flangeYShift, 50).split(',')[1]}
              x2={proj(50, 15 + flangeYShift, 70).split(',')[0]}
              y2={proj(50, 15 + flangeYShift, 70).split(',')[1]}
              className="stroke-amber-500"
              strokeWidth={0.8}
            />
            <line
              x1={proj(47, 15 + flangeYShift, 50).split(',')[0]}
              y1={proj(47, 15 + flangeYShift, 50).split(',')[1]}
              x2={proj(53, 15 + flangeYShift, 50).split(',')[0]}
              y2={proj(53, 15 + flangeYShift, 50).split(',')[1]}
              className="stroke-amber-500"
              strokeWidth={0.8}
            />
            <line
              x1={proj(47, 15 + flangeYShift, 70).split(',')[0]}
              y1={proj(47, 15 + flangeYShift, 70).split(',')[1]}
              x2={proj(53, 15 + flangeYShift, 70).split(',')[0]}
              y2={proj(53, 15 + flangeYShift, 70).split(',')[1]}
              className="stroke-amber-500"
              strokeWidth={0.8}
            />
            <text
              x={proj(65, 12 + flangeYShift, 60).split(',')[0]}
              y={proj(65, 12 + flangeYShift, 60).split(',')[1]}
              className="fill-amber-600 dark:fill-amber-400 text-[8px] font-mono font-bold"
              textAnchor="start"
            >
              Δx = 1 mm
            </text>
          </g>
        </g>

        {/* Callouts / Texts on diagram */}
        <g id="diagram-labels">
          <text
            x={proj(-50, 25 + flangeYShift, 120).split(',')[0]}
            y={proj(-50, 25 + flangeYShift, 120).split(',')[1]}
            className="fill-indigo-600 dark:fill-indigo-400 text-[9px] font-bold"
            textAnchor="end"
          >
            Top Flange Block
          </text>
          <text
            x={proj(-22, -15, 120).split(',')[0]}
            y={proj(-22, -15, 120).split(',')[1]}
            className="fill-sky-600 dark:fill-sky-400 text-[9px] font-bold"
            textAnchor="end"
          >
            Bottom Web Block
          </text>
          <text
            x={proj(0, 15 + flangeYShift / 2, 0).split(',')[0]}
            y={proj(0, 15 + flangeYShift / 2, 0).split(',')[1]}
            className="fill-amber-600 dark:fill-amber-400 text-[9px] font-bold"
            textAnchor="middle"
          >
            Shearing Interface
          </text>
        </g>

        {/* SVG Markers definitions */}
        <defs>
          <marker
            id="arrow-red"
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto-start-reverse"
          >
            <path d="M 0 1.5 L 10 5 L 0 8.5 Z" className="fill-red-500" />
          </marker>
        </defs>
      </svg>
    </div>
  );
};

export default ShearFlowDerivationDrawing;
