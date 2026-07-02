import React from 'react';
import { ExpandableDrawing } from '@/shared/components';

interface BuiltUpFastenersDrawingProps {
  spacing: number; 
  currentClick?: number;
  unit?: 'in' | 'mm';
}

export const BuiltUpFastenersDrawing: React.FC<BuiltUpFastenersDrawingProps> = ({ spacing, currentClick = 0, unit = 'in' }) => {
  const width = 320;
  const height = 135;

  const scale = 5.0; 

  const csX = 55;
  const csY = 35;
  const flangeW = 6.0 * scale; 
  const flangeH = 2.0 * scale; 
  const webW = 2.0 * scale;    
  const webH = 8.0 * scale;    

  const interfaceY = csY + flangeH; 

  const sideX = 145;
  const sideY = csY;
  const sideW = 160;
  
  // Calculate pixel spacing based on unit to keep nails within the drawing bounds
  let pxSpacing = 60;
  let labelText = '';

  if (unit === 'mm') {
    // Map millimeter spacing (clamped to 10-250 for rendering) to pixels (20 to 115)
    pxSpacing = 20 + (Math.min(250, Math.max(10, spacing)) - 10) * (95 / 240);
    labelText = `mm`;
  } else {
    // Support default inch behavior (inputs like 60/80 or 6.0/8.0)
    const val = spacing > 15 ? spacing / 10 : spacing;
    pxSpacing = val * 10;
    labelText = `in.`;
  }

  const nails: number[] = [];
  let nailX = sideX + 15;
  while (nailX < sideX + sideW - 10) {
    nails.push(nailX);
    nailX += pxSpacing;
  }

  return (
    <ExpandableDrawing
      title="Built-up Fastener Spacing Layout"
      description="Cross-section and side elevation of a built-up T-beam showing the shear flow interface line and dynamically spaced nails at pitch s."
      className="max-w-[450px] mx-auto w-full"
    >
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full aspect-[2.37] overflow-visible">
        {/* LEFT: Cross-Section */}
        <g>
          <rect
            x={csX - flangeW / 2}
            y={csY}
            width={flangeW}
            height={flangeH}
            className="fill-muted/20 stroke-foreground"
            strokeWidth={1.2}
          />
          <rect
            x={csX - webW / 2}
            y={csY + flangeH}
            width={webW}
            height={webH}
            className="fill-muted/20 stroke-foreground"
            strokeWidth={1.2}
          />

          <line
            x1={csX - webW / 2}
            y1={interfaceY}
            x2={csX + webW / 2}
            y2={interfaceY}
            className="stroke-amber-500"
            strokeWidth={2}
          />
          
          <line x1={csX - webW / 2} y1={interfaceY - 3} x2={csX - flangeW / 2 + 5} y2={interfaceY - 3} className="stroke-rose-400" strokeWidth={0.8} />
          <polygon points={`${csX - flangeW / 2 + 5},${interfaceY - 3} ${csX - flangeW / 2 + 9},${interfaceY - 4.5} ${csX - flangeW / 2 + 9},${interfaceY - 1.5}`} className="fill-rose-400" />

          <line x1={csX + webW / 2} y1={interfaceY - 3} x2={csX + flangeW / 2 - 5} y2={interfaceY - 3} className="stroke-rose-400" strokeWidth={0.8} />
          <polygon points={`${csX + flangeW / 2 - 5},${interfaceY - 3} ${csX + flangeW / 2 - 9},${interfaceY - 4.5} ${csX + flangeW / 2 - 9},${interfaceY - 1.5}`} className="fill-rose-400" />

          {/* Vertical nail in cross section (revealed at step 1+) */}
          <g opacity={currentClick >= 1 ? 1 : 0.05} className="transition-opacity duration-300">
            <line x1={csX} y1={csY - 5} x2={csX} y2={interfaceY + 12} className="stroke-indigo-400" strokeWidth={1.5} />
            <line x1={csX - 3} y1={csY - 5} x2={csX + 3} y2={csY - 5} className="stroke-indigo-400" strokeWidth={1.5} />
          </g>

          <text x={csX} y={height - 18} className="fill-foreground text-[11px] font-mono font-bold" textAnchor="middle">
            Cross-Section
          </text>
          <text x={csX + 22} y={interfaceY + 2} className="fill-amber-500 text-[11px] font-bold">
            Interface
          </text>
        </g>

        {/* Separator */}
        <line x1={125} y1={20} x2={125} y2={120} className="stroke-border/30" strokeWidth={0.8} strokeDasharray="3,1" />

        {/* RIGHT: Side Elevation */}
        <g>
          <rect
            x={sideX}
            y={sideY}
            width={sideW}
            height={flangeH}
            className="fill-muted/20 stroke-foreground"
            strokeWidth={1}
          />
          <rect
            x={sideX}
            y={sideY + flangeH}
            width={sideW}
            height={webH}
            className="fill-muted/20 stroke-foreground"
            strokeWidth={1}
            opacity={0.6}
          />

          <line
            x1={sideX}
            y1={interfaceY}
            x2={sideX + sideW}
            y2={interfaceY}
            className="stroke-amber-500"
            strokeWidth={1.5}
          />

          {/* Dynamically spaced nails (revealed at step 1+) */}
          <g opacity={currentClick >= 1 ? 1 : 0.05} className="transition-opacity duration-300">
            {nails.map((nx, idx) => (
              <g key={`nail-${idx}`}>
                <line x1={nx} y1={sideY - 3} x2={nx} y2={interfaceY + 12} className="stroke-indigo-500" strokeWidth={1.5} />
                <line x1={nx - 3} y1={sideY - 3} x2={nx + 3} y2={sideY - 3} className="stroke-indigo-500" strokeWidth={1.5} />
              </g>
            ))}

            {/* Spacing Dimension Lines */}
            {nails.length >= 2 && (
              <g>
                <line x1={nails[0]} y1={sideY - 14} x2={nails[1]} y2={sideY - 14} className="stroke-indigo-400" strokeWidth={0.8} />
                <line x1={nails[0]} y1={sideY - 18} x2={nails[0]} y2={sideY - 10} className="stroke-indigo-400" strokeWidth={0.8} />
                <line x1={nails[1]} y1={sideY - 18} x2={nails[1]} y2={sideY - 10} className="stroke-indigo-400" strokeWidth={0.8} />
                <text
                  x={(nails[0]! + nails[1]!) / 2}
                  y={sideY - 20}
                  className="fill-indigo-500 text-[10px] font-sans font-bold"
                  textAnchor="middle"
                >
                  <tspan fontStyle="italic">s</tspan> = {unit === 'mm' ? spacing.toFixed(1) : (spacing > 15 ? spacing / 10 : spacing).toFixed(1)} {labelText}
                </text>
              </g>
            )}
          </g>

          <text x={sideX + sideW / 2} y={height - 18} className="fill-foreground text-[11px] font-mono font-bold" textAnchor="middle">
            Side Elevation (Nail Spacing)
          </text>
        </g>
      </svg>
    </ExpandableDrawing>
  );
};

export default BuiltUpFastenersDrawing;
