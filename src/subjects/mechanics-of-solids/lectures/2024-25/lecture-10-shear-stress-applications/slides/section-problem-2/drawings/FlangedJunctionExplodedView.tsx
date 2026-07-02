import React from 'react';
import { ExpandableDrawing } from '@/shared/components';
import { LatexFormula } from '@/features/presentation/components/elements';

interface FlangedJunctionExplodedViewProps {
  currentClick?: number;
}

export const FlangedJunctionExplodedView: React.FC<FlangedJunctionExplodedViewProps> = ({ currentClick = 0 }) => {
  const width = 300;
  const height = 180;

  const leftX = 65;
  const scale = 0.48; 
  const naY = 110;
  
  const topFlangeY1 = naY - 175 * scale;
  const topFlangeY2 = naY - 125 * scale;
  const botFlangeY1 = naY + 75 * scale;

  const expX = 215;

  // Separation shift values driven by currentClick >= 2
  const isSeparated = currentClick >= 2;
  const yShiftTop = isSeparated ? -16 : 0;
  const yShiftWeb = isSeparated ? 16 : 0;

  return (
    <ExpandableDrawing
      title="Flanged Section Junction Details"
      description="Exploded visual analysis at Point B (junction interface) showing the change in width from b_flange=100mm to b_web=50mm, and illustrating why shear stress jumps by 2x."
      className="max-w-[450px] mx-auto w-full"
    >
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full aspect-[1.67] overflow-visible">
        {/* Left Side: Asymmetric I-beam Section (Always visible) */}
        <g>
          <rect x={leftX - 50 * scale} y={topFlangeY1} width={100 * scale} height={50 * scale} className="fill-muted/20 stroke-foreground" strokeWidth={1} />
          <rect x={leftX - 25 * scale} y={topFlangeY2} width={50 * scale} height={200 * scale} className="fill-muted/20 stroke-foreground" strokeWidth={1} />
          <rect x={leftX - 100 * scale} y={botFlangeY1} width={200 * scale} height={50 * scale} className="fill-muted/20 stroke-foreground" strokeWidth={1} />

          <line x1={leftX - 60 * scale} y1={naY} x2={leftX + 110 * scale} y2={naY} className="stroke-destructive" strokeWidth={0.8} strokeDasharray="3,1" opacity={0.6} />
          <text x={leftX - 60 * scale - 4} y={naY + 3.5} className="fill-destructive text-[10px] font-mono font-bold" textAnchor="end">
            N.A.
          </text>

          <line x1={leftX - 65 * scale} y1={topFlangeY2} x2={leftX + 65 * scale} y2={topFlangeY2} className="stroke-blue-500" strokeWidth={1.5} />
          
          {/* Pulsing point B indicators with hardcoded transform origin to prevent drift */}
          <circle 
            cx={leftX} 
            cy={topFlangeY2} 
            r={3.5} 
            className="fill-blue-500 animate-ping" 
            style={{ transformOrigin: `${leftX}px ${topFlangeY2}px` }}
          />
          <circle cx={leftX} cy={topFlangeY2} r={2} className="fill-blue-500" />
          <text x={leftX + 65 * scale + 4} y={topFlangeY2 + 3} className="fill-blue-500 text-[10px] font-mono font-black">
            Point B
          </text>
        </g>

        {/* Right Side: Exploded Junction View (revealed at step 1+) */}
        {currentClick >= 1 && (
          <g className="animate-in fade-in duration-300">
            {/* Connection line & separation indicators (only when separated at step 2+) */}
            {isSeparated && (
              <g className="animate-in fade-in duration-500">
                <line
                  x1={expX}
                  y1={topFlangeY2 + yShiftTop}
                  x2={expX}
                  y2={topFlangeY2 + yShiftWeb}
                  className="stroke-muted-foreground/40"
                  strokeWidth={0.8}
                  strokeDasharray="2,2"
                />
                {/* Double sided arrow */}
                <polygon points={`${expX},${topFlangeY2 + yShiftWeb - 2} ${expX - 2.5},${topFlangeY2 + yShiftWeb - 6} ${expX + 2.5},${topFlangeY2 + yShiftWeb - 6}`} className="fill-muted-foreground/60" />
                <polygon points={`${expX},${topFlangeY2 + yShiftTop + 2} ${expX - 2.5},${topFlangeY2 + yShiftTop + 6} ${expX + 2.5},${topFlangeY2 + yShiftTop + 6}`} className="fill-muted-foreground/60" />
              </g>
            )}

            {/* Top Flange Detail Group */}
            <g style={{ transform: `translateY(${yShiftTop}px)` }} className="transition-transform duration-500 ease-in-out">
              <rect
                x={expX - 50 * scale}
                y={topFlangeY1}
                width={100 * scale}
                height={50 * scale}
                className="fill-indigo-500/10 stroke-indigo-500 transition-colors"
                strokeWidth={1.5}
              />
              
              {/* b_flange indicator (revealed at step 3+) */}
              {currentClick >= 3 && (
                <g className="animate-in fade-in duration-300">
                  <line x1={expX - 50 * scale} y1={topFlangeY2 + 3} x2={expX - 50 * scale} y2={topFlangeY2 + 12} className="stroke-muted-foreground/30" strokeWidth={0.6} />
                  <line x1={expX + 50 * scale} y1={topFlangeY2 + 3} x2={expX + 50 * scale} y2={topFlangeY2 + 12} className="stroke-muted-foreground/30" strokeWidth={0.6} />
                  <line x1={expX - 50 * scale} y1={topFlangeY2 + 8} x2={expX + 50 * scale} y2={topFlangeY2 + 8} className="stroke-indigo-400" strokeWidth={0.8} />
                  
                  {/* Positioned on the right side of Top Flange, offset from web label */}
                  <foreignObject x={expX + 50 * scale + 6} y={topFlangeY2 + 1} width={80} height={20}>
                    <div className="text-left text-[8px] text-indigo-500 font-mono font-bold leading-none">
                      <LatexFormula math="b_{\text{flange}} = 100\text{ mm}" />
                    </div>
                  </foreignObject>
                </g>
              )}
            </g>

            {/* Web Detail Group */}
            <g style={{ transform: `translateY(${yShiftWeb}px)` }} className="transition-transform duration-500 ease-in-out">
              <rect
                x={expX - 25 * scale}
                y={topFlangeY2}
                width={50 * scale}
                height={70 * scale}
                className="fill-blue-500/10 stroke-blue-500 transition-colors"
                strokeWidth={1.5}
                strokeDasharray="4,2"
              />

              {/* b_web indicator (revealed at step 3+) */}
              {currentClick >= 3 && (
                <g className="animate-in fade-in duration-300">
                  <line x1={expX - 25 * scale} y1={topFlangeY2 - 3} x2={expX - 25 * scale} y2={topFlangeY2 - 12} className="stroke-muted-foreground/30" strokeWidth={0.6} />
                  <line x1={expX + 25 * scale} y1={topFlangeY2 - 3} x2={expX + 25 * scale} y2={topFlangeY2 - 12} className="stroke-muted-foreground/30" strokeWidth={0.6} />
                  <line x1={expX - 25 * scale} y1={topFlangeY2 - 8} x2={expX + 25 * scale} y2={topFlangeY2 - 8} className="stroke-blue-400" strokeWidth={0.8} />
                  
                  {/* Positioned on the left side of Web, offset from flange label */}
                  <foreignObject x={expX - 25 * scale - 86} y={topFlangeY2 - 14} width={80} height={20}>
                    <div className="text-right text-[8px] text-blue-500 font-mono font-bold leading-none">
                      <LatexFormula math="b_{\text{web}} = 50\text{ mm}" />
                    </div>
                  </foreignObject>
                </g>
              )}
            </g>

            {/* Formula & Discontinuity Overlay (revealed at step 4+) */}
            {currentClick >= 4 && (
              <g className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                <rect x={expX - 60} y={topFlangeY2 + 50} width={120} height={38} rx={4} className="fill-background/90 stroke-border/40" strokeWidth={1} />
                <foreignObject x={expX - 55} y={topFlangeY2 + 52} width={110} height={18}>
                  <div className="text-center text-[9px] leading-none">
                    <LatexFormula math="\tau = \frac{V \cdot Q}{I \cdot b}" />
                  </div>
                </foreignObject>
                <foreignObject x={expX - 55} y={topFlangeY2 + 71} width={110} height={14}>
                  <div className="text-center text-[8.5px] font-bold text-amber-600 leading-none">
                    <LatexFormula math="b \text{ halving} \implies \tau \text{ doubles!}" />
                  </div>
                </foreignObject>
              </g>
            )}
          </g>
        )}
      </svg>
    </ExpandableDrawing>
  );
};

export default FlangedJunctionExplodedView;
