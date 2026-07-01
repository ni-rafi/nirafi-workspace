import React from 'react';

interface BuiltUpFastenersDrawingProps {
  spacing: number; // in inches
}

export const BuiltUpFastenersDrawing: React.FC<BuiltUpFastenersDrawingProps> = ({ spacing }) => {
  const width = 320;
  const height = 180;

  // Scaling: 1 inch = 6 pixels (T-beam is 6" wide, 8" deep web, 2" thick web, 2" thick flange)
  const scale = 5.0; 

  // Left Cross Section coords
  const csX = 55;
  const csY = 35;
  const flangeW = 6.0 * scale; // 30px
  const flangeH = 2.0 * scale; // 10px
  const webW = 2.0 * scale;    // 10px
  const webH = 8.0 * scale;    // 40px

  const interfaceY = csY + flangeH; // y=45

  // Right Side view coords
  const sideX = 145;
  const sideY = csY;
  const sideW = 160;
  
  // Dynamic nails spacing calculation
  // scale spacing (inches) to pixels. Let's map 1 inch to 10 pixels.
  const pxSpacing = Math.max(15, spacing * 10);
  const nails: number[] = [];
  let nailX = sideX + 15;
  while (nailX < sideX + sideW - 10) {
    nails.push(nailX);
    nailX += pxSpacing;
  }

  return (
    <div className="flex justify-center border border-border/30 bg-muted/5 rounded-2xl p-4 max-w-[450px] mx-auto w-full shadow-inner">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full aspect-[1.78] overflow-visible">
        {/* LEFT: Cross-Section */}
        <g>
          {/* Top Flange */}
          <rect
            x={csX - flangeW / 2}
            y={csY}
            width={flangeW}
            height={flangeH}
            className="fill-muted/20 stroke-foreground"
            strokeWidth={1.2}
          />
          {/* Vertical Web */}
          <rect
            x={csX - webW / 2}
            y={csY + flangeH}
            width={webW}
            height={webH}
            className="fill-muted/20 stroke-foreground"
            strokeWidth={1.2}
          />

          {/* Interface line (horizontal shearing interface) */}
          <line
            x1={csX - webW / 2}
            y1={interfaceY}
            x2={csX + webW / 2}
            y2={interfaceY}
            className="stroke-amber-500"
            strokeWidth={2}
          />
          
          {/* Shear flow arrows (force trying to slide flange from web) */}
          {/* Horizontal shear flow vectors on the flange bottom */}
          <line x1={csX - webW / 2} y1={interfaceY - 3} x2={csX - flangeW / 2 + 5} y2={interfaceY - 3} className="stroke-rose-400" strokeWidth={0.8} />
          <polygon points={`${csX - flangeW / 2 + 5},${interfaceY - 3} ${csX - flangeW / 2 + 9},${interfaceY - 4.5} ${csX - flangeW / 2 + 9},${interfaceY - 1.5}`} className="fill-rose-400" />

          <line x1={csX + webW / 2} y1={interfaceY - 3} x2={csX + flangeW / 2 - 5} y2={interfaceY - 3} className="stroke-rose-400" strokeWidth={0.8} />
          <polygon points={`${csX + flangeW / 2 - 5},${interfaceY - 3} ${csX + flangeW / 2 - 9},${interfaceY - 4.5} ${csX + flangeW / 2 - 9},${interfaceY - 1.5}`} className="fill-rose-400" />

          {/* Vertical nail in cross section */}
          <line x1={csX} y1={csY - 5} x2={csX} y2={interfaceY + 12} className="stroke-indigo-400" strokeWidth={1.5} />
          <line x1={csX - 3} y1={csY - 5} x2={csX + 3} y2={csY - 5} className="stroke-indigo-400" strokeWidth={1.5} /> {/* nail head */}

          <text x={csX} y={height - 20} className="fill-foreground text-[8px] font-mono font-bold" textAnchor="middle">
            Cross-Section
          </text>
          <text x={csX + 22} y={interfaceY + 2} className="fill-amber-500 text-[8px] font-bold">
            Interface
          </text>
        </g>

        {/* Separator */}
        <line x1={125} y1={20} x2={125} y2={160} className="stroke-border/30" strokeWidth={0.8} strokeDasharray="3,1" />

        {/* RIGHT: Side Elevation */}
        <g>
          {/* Flange Side view */}
          <rect
            x={sideX}
            y={sideY}
            width={sideW}
            height={flangeH}
            className="fill-muted/20 stroke-foreground"
            strokeWidth={1}
          />
          {/* Web Side view */}
          <rect
            x={sideX}
            y={sideY + flangeH}
            width={sideW}
            height={webH}
            className="fill-muted/20 stroke-foreground"
            strokeWidth={1}
            opacity={0.6}
          />

          {/* Shear flow interface line */}
          <line
            x1={sideX}
            y1={interfaceY}
            x2={sideX + sideW}
            y2={interfaceY}
            className="stroke-amber-500"
            strokeWidth={1.5}
          />

          {/* Dynamically spaced nails */}
          {nails.map((nx, idx) => (
            <g key={`nail-${idx}`} className="transition-all duration-300">
              {/* Nail Shaft */}
              <line x1={nx} y1={sideY - 3} x2={nx} y2={interfaceY + 12} className="stroke-indigo-500" strokeWidth={1.5} />
              {/* Nail Head */}
              <line x1={nx - 3} y1={sideY - 3} x2={nx + 3} y2={sideY - 3} className="stroke-indigo-500" strokeWidth={1.5} />
            </g>
          ))}

          {/* Spacing Dimension Lines */}
          {nails.length >= 2 && (
            <g className="transition-all duration-300">
              <line x1={nails[0]} y1={sideY - 14} x2={nails[1]} y2={sideY - 14} className="stroke-indigo-400" strokeWidth={0.8} />
              <line x1={nails[0]} y1={sideY - 18} x2={nails[0]} y2={sideY - 10} className="stroke-indigo-400" strokeWidth={0.8} />
              <line x1={nails[1]} y1={sideY - 18} x2={nails[1]} y2={sideY - 10} className="stroke-indigo-400" strokeWidth={0.8} />
              <text
                x={(nails[0]! + nails[1]!) / 2}
                y={sideY - 20}
                className="fill-indigo-500 text-[9px] font-mono font-black"
                textAnchor="middle"
              >
                s = {spacing.toFixed(1)} in.
              </text>
            </g>
          )}

          <text x={sideX + sideW / 2} y={height - 20} className="fill-foreground text-[8px] font-mono font-bold" textAnchor="middle">
            Side Elevation (Nail Spacing)
          </text>
        </g>
      </svg>
    </div>
  );
};
export default BuiltUpFastenersDrawing;
