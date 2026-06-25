import React from 'react';
import { calculateRoadwayArea } from '../../cores';

interface RoadwaySectionDrawingProps {
  B: number; // Formation Width (m)
  s: number; // Side Slope (s:1)
  d: number; // Depth/Height of cut or fill (m)
  currentClick?: number;
  activeHighlight?: 'none' | 'turfing' | 'box-cutting';
  className?: string;
}

export const RoadwaySectionDrawing: React.FC<RoadwaySectionDrawingProps> = ({
  B,
  s,
  d,
  currentClick,
  activeHighlight = 'none',
  className = '',
}) => {
  const isFilling = d >= 0;
  const absD = Math.abs(d);

  // Helper to determine if a highlight step is active
  const isStepActive = (step: number) => {
    return currentClick === undefined || currentClick >= step;
  };

  // SVG coordinates calculations
  // Center is (150, 80), ground level is y = 110
  const yGround = 110;
  
  // Scale parameters (meters to pixels)
  // Max depth is 5m, max B is 15m
  const scaleX = Math.min(10, 120 / B); 
  const scaleY = Math.min(15, 60 / Math.max(1, absD));

  const bp = B * scaleX;       // width in pixels
  const dp = absD * scaleY;    // depth in pixels
  const sp = s * dp;           // slope offset in pixels

  // Polygon coordinates
  let polyPath = '';
  let yFL = yGround;

  const xTopL = isFilling ? 150 - bp / 2 : 150 - bp / 2 - sp;
  const xTopR = isFilling ? 150 + bp / 2 : 150 + bp / 2 + sp;
  const xBotL = isFilling ? 150 - bp / 2 - sp : 150 - bp / 2;
  const xBotR = isFilling ? 150 + bp / 2 + sp : 150 + bp / 2;

  if (activeHighlight === 'box-cutting') {
    yFL = yGround + Math.max(15, dp); // shallow cut
    const xBoxL = 150 - bp / 2;
    const xBoxR = 150 + bp / 2;
    polyPath = `M ${xBoxL},${yGround} L ${xBoxL},${yFL} L ${xBoxR},${yFL} L ${xBoxR},${yGround} Z`;
  } else if (isFilling) {
    yFL = yGround - dp;
    polyPath = `M ${xBotL},${yGround} L ${xTopL},${yFL} L ${xTopR},${yFL} L ${xBotR},${yGround} Z`;
  } else {
    yFL = yGround + dp;
    polyPath = `M ${xTopL},${yGround} L ${xBotL},${yFL} L ${xBotR},${yFL} L ${xTopR},${yGround} Z`;
  }

  return (
    <div className={`w-full flex flex-col justify-between bg-muted/20 p-1.5 border border-border/40 rounded-xl ${className}`}>
      <span className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground mb-0.5 block text-center">
        Road Cross-Section Visualizer ({activeHighlight === 'box-cutting' ? 'Box Cutting' : isFilling ? 'Embankment/Fill' : 'Trench/Cut'})
      </span>

      <div className="h-44 bg-background rounded-lg border border-border/20 relative flex items-center justify-center overflow-hidden">
        <svg viewBox="0 25 300 150" className="w-full h-full select-none overflow-visible">
          {/* Natural Ground Level (NGL) Line */}
          <line
            x1="10"
            y1={yGround}
            x2="290"
            y2={yGround}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            className="text-muted-foreground/40"
          />
          <text x="265" y={yGround - 6} className="fill-muted-foreground text-[11px] font-mono">NGL</text>

          {/* Trapezoidal or Box-Cutting Earthwork Block */}
          {(absD > 0.05 || activeHighlight === 'box-cutting') && (
            <path
              d={polyPath}
              className={`transition-all duration-300 ${
                activeHighlight === 'box-cutting'
                  ? 'fill-amber-500/25 stroke-amber-500 stroke-[2px]'
                  : isStepActive(3)
                    ? isFilling
                      ? 'fill-emerald-500/20 stroke-emerald-600 stroke-[2px]'
                      : 'fill-red-500/20 stroke-red-500/80 stroke-[2px]'
                    : 'fill-muted/30 stroke-border/60'
              }`}
            />
          )}

          {/* Turfing Highlights */}
          {activeHighlight === 'turfing' && isFilling && (
            <g className="animate-fadeIn">
              {/* Left Slope Turfing Line */}
              <line
                x1={xBotL}
                y1={yGround}
                x2={xTopL}
                y2={yFL}
                stroke="currentColor"
                strokeWidth="4.5"
                className="text-emerald-500"
              />
              <text
                x={(xBotL + xTopL) / 2 - 25}
                y={(yGround + yFL) / 2 - 2}
                textAnchor="middle"
                className="fill-emerald-600 dark:fill-emerald-400 text-[9px] font-mono font-bold"
              >
                Turfing (m²)
              </text>

              {/* Right Slope Turfing Line */}
              <line
                x1={xTopR}
                y1={yFL}
                x2={xBotR}
                y2={yGround}
                stroke="currentColor"
                strokeWidth="4.5"
                className="text-emerald-500"
              />
              <text
                x={(xBotR + xTopR) / 2 + 25}
                y={(yGround + yFL) / 2 - 2}
                textAnchor="middle"
                className="fill-emerald-600 dark:fill-emerald-400 text-[9px] font-mono font-bold"
              >
                Turfing (m²)
              </text>
            </g>
          )}

          {/* Formation Width Dimension (B) */}
          <g className={`transition-opacity duration-300 ${isStepActive(1) ? 'text-primary' : 'text-muted-foreground/30'}`}>
            {isFilling && activeHighlight !== 'box-cutting' ? (
              // B on top
              <>
                <line x1={150 - bp / 2} y1={yFL - 15} x2={150 + bp / 2} y2={yFL - 15} stroke="currentColor" strokeWidth="1" />
                <polygon points={`${150 - bp / 2},${yFL - 15} ${150 - bp / 2 + 5},${yFL - 18} ${150 - bp / 2 + 5},${yFL - 12}`} className="fill-current" />
                <polygon points={`${150 + bp / 2},${yFL - 15} ${150 + bp / 2 - 5},${yFL - 18} ${150 + bp / 2 - 5},${yFL - 12}`} className="fill-current" />
                <text x="150" y={yFL - 22} textAnchor="middle" className="fill-current text-[11px] font-mono font-bold">B = {B.toFixed(1)}m</text>
              </>
            ) : (
              // B on bottom
              <>
                <line x1={150 - bp / 2} y1={yFL + 15} x2={150 + bp / 2} y2={yFL + 15} stroke="currentColor" strokeWidth="1" />
                <polygon points={`${150 - bp / 2},${yFL + 15} ${150 - bp / 2 + 5},${yFL + 12} ${150 - bp / 2 + 5},${yFL + 18}`} className="fill-current" />
                <polygon points={`${150 + bp / 2},${yFL + 15} ${150 + bp / 2 - 5},${yFL + 12} ${150 + bp / 2 - 5},${yFL + 18}`} className="fill-current" />
                <text x="150" y={yFL + 26} textAnchor="middle" className="fill-current text-[11px] font-mono font-bold">B = {B.toFixed(1)}m</text>
              </>
            )}
          </g>

          {/* Side Slopes (s:1) Indicators */}
          {absD > 0.3 && isStepActive(2) && activeHighlight !== 'box-cutting' && (
            <g className="text-amber-500 font-mono text-[11px] font-bold animate-fadeIn">
              {isFilling ? (
                <>
                  {/* Left Slope Indicator */}
                  <text x={150 - bp / 2 - sp / 2 - 12} y={yGround - dp / 2 + 4} textAnchor="middle" className="fill-current">{s}:1</text>
                  {/* Right Slope Indicator */}
                  <text x={150 + bp / 2 + sp / 2 + 12} y={yGround - dp / 2 + 4} textAnchor="middle" className="fill-current">{s}:1</text>
                </>
              ) : (
                <>
                  {/* Left Slope Indicator */}
                  <text x={150 - bp / 2 - sp / 2 - 12} y={yGround + dp / 2 + 4} textAnchor="middle" className="fill-current">{s}:1</text>
                  {/* Right Slope Indicator */}
                  <text x={150 + bp / 2 + sp / 2 + 12} y={yGround + dp / 2 + 4} textAnchor="middle" className="fill-current">{s}:1</text>
                </>
              )}
            </g>
          )}

          {/* Depth/Height Dimension (d) */}
          {absD > 0.1 && activeHighlight !== 'box-cutting' && (
            <g className={`transition-opacity duration-300 ${isStepActive(3) ? 'text-primary' : 'text-muted-foreground/30'}`}>
              <line x1="150" y1={yGround} x2="150" y2={yFL} stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 1" />
              <text x="156" y={(yGround + yFL) / 2 + 4} className="fill-current text-[11px] font-mono font-bold">d = {absD.toFixed(2)}m</text>
            </g>
          )}
        </svg>

        {activeHighlight === 'box-cutting' && (
          <div className="absolute bottom-2 left-2 right-2 border text-[10px] p-2 rounded-md font-mono flex items-center justify-between animate-fadeIn z-10 bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400">
            <span>Box Cutting: Area = B × L (Billed in m² for depth ≤ 300 / 450mm)</span>
          </div>
        )}
        {activeHighlight !== 'box-cutting' && isStepActive(3) && absD > 0.05 && (
          <div className={`absolute bottom-2 left-2 right-2 border text-[10px] p-2 rounded-md font-mono flex items-center justify-between animate-fadeIn z-10 ${
            isFilling
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
              : 'bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400'
          }`}>
            <span>Area = B·d + s·d² = {calculateRoadwayArea(B, s, d).toFixed(3)} m²</span>
          </div>
        )}
      </div>

      <span className="text-[9px] text-muted-foreground text-center mt-2 leading-normal h-8">
        {activeHighlight === 'box-cutting'
          ? 'Box Cutting: Shallow subgrade excavation up to 300mm/450mm. Billed in square meters (m²) instead of standard cubic meters.'
          : activeHighlight === 'turfing'
            ? 'Turfing: Grass sods laid on embankment side slopes to protect against rain erosion. Billed as surface treatment in square meters (m²).'
            : isFilling
              ? isStepActive(3)
                ? 'Embankment Fill: Soil is deposited on ground. Slopes represent horizontal/vertical ratios.'
                : isStepActive(2)
                  ? 'Side slopes B·d + s·d² keep the embankment stable against gravity.'
                  : 'Formation width platform B is built above natural ground level.'
              : isStepActive(3)
                ? 'Trench Cutting: Excavating a canal/road trench below ground level. B is at bottom.'
                : isStepActive(2)
                  ? 'Side slopes are cut back to prevent soil collapsing inward.'
                  : 'Roadway formation platform B lies at target sub-grade depth.'}
      </span>
    </div>
  );
};
