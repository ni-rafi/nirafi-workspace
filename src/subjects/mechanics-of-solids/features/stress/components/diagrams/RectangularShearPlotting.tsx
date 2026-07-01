import React from 'react';

interface RectangularShearPlottingProps {
  plotStep: number;
}

export const RectangularShearPlotting: React.FC<RectangularShearPlottingProps> = ({ plotStep }) => {
  const width = 300;
  const height = 150;

  // Cross section coordinates (left side)
  const rectX = 40;
  const rectY = 25;
  const rectW = 50;
  const rectH = 100;
  const naY = rectY + rectH / 2; // y=75

  // Plot grid coordinates (right side)
  const plotZeroX = 180;
  const plotWidth = 70;
  const topY = rectY;
  const botY = rectY + rectH;
  const midTopY = rectY + rectH * 0.25; // y=50
  const midBotY = rectY + rectH * 0.75; // y=100

  // Points on the parabolic curve
  // x = plotZeroX + scale * (1 - (y - naY)^2 / (h/2)^2)
  // at NA (y=75): x = plotZeroX + plotWidth = 250
  // at top/bottom (y=25, 125): x = plotZeroX = 180
  // at midTop/midBot (y=50, 100): x = plotZeroX + plotWidth * 0.75 = 180 + 52.5 = 232.5
  const pxMax = plotZeroX + plotWidth;
  const pxMid = plotZeroX + plotWidth * 0.75;

  return (
    <div className="flex justify-center border border-border/30 bg-muted/5 rounded-2xl p-4 max-w-[400px] mx-auto w-full shadow-inner">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full aspect-[2.0] overflow-visible">
        {/* Left Side: Cross Section */}
        <g>
          {/* Rectangle */}
          <rect
            x={rectX}
            y={rectY}
            width={rectW}
            height={rectH}
            className="fill-muted/20 stroke-foreground"
            strokeWidth={1.5}
          />
          {/* Shaded Area for sub-area Q calculation */}
          {plotStep >= 1 && (
            <rect
              x={rectX}
              y={rectY}
              width={rectW}
              height={topY - rectY + (plotStep === 3 ? 25 : 0)}
              className="fill-amber-500/10 stroke-none"
            />
          )}

          {/* Neutral Axis (N.A.) */}
          <line
            x1={rectX - 10}
            y1={naY}
            x2={rectX + rectW + 10}
            y2={naY}
            className="stroke-destructive"
            strokeWidth={1}
            strokeDasharray="3,1"
          />
          <text x={rectX - 15} y={naY + 3.5} className="fill-destructive text-[9px] font-mono font-bold" textAnchor="end">
            N.A.
          </text>

          {/* Coordinate indicator line */}
          {plotStep === 1 && (
            <g className="animate-fadeIn">
              <line x1={rectX - 5} y1={topY} x2={rectX + rectW + 5} y2={topY} className="stroke-indigo-500" strokeWidth={1.2} />
              <text x={rectX + rectW + 8} y={topY + 3.5} className="fill-indigo-500 text-[9px] font-mono font-bold">
                y = y_max
              </text>
            </g>
          )}

          {plotStep === 3 && (
            <g className="animate-fadeIn">
              <line x1={rectX - 5} y1={midTopY} x2={rectX + rectW + 5} y2={midTopY} className="stroke-indigo-400" strokeWidth={1.2} />
              <text x={rectX + rectW + 8} y={midTopY + 3.5} className="fill-indigo-400 text-[9px] font-mono font-bold">
                y = h/4
              </text>
            </g>
          )}

          {/* Dimensions */}
          <text x={rectX + rectW / 2} y={rectY - 6} textAnchor="middle" className="fill-muted-foreground text-[10px] font-mono">
            b
          </text>
          {/* Height Dimension */}
          <line x1={rectX - 8} y1={rectY} x2={rectX - 8} y2={rectY + rectH} className="stroke-muted-foreground/30" strokeWidth={0.8} />
          <text x={rectX - 14} y={naY + 3.5} textAnchor="middle" className="fill-muted-foreground text-[10px] font-mono rotate-90 origin-center">
            h
          </text>
        </g>

        {/* Right Side: Plot Grid */}
        <g>
          {/* Zero Baseline */}
          <line x1={plotZeroX} y1={rectY - 10} x2={plotZeroX} y2={rectY + rectH + 10} className="stroke-border" strokeWidth={1.2} />
          <text x={plotZeroX} y={rectY - 12} textAnchor="middle" className="fill-muted-foreground text-[9px] font-mono">
            0
          </text>

          {/* Grid lines */}
          <line x1={plotZeroX - 10} y1={naY} x2={plotZeroX + plotWidth + 10} y2={naY} className="stroke-destructive/30" strokeWidth={0.8} strokeDasharray="3,1" />

          {/* Step 2: Outer boundaries (dots at top/bottom baseline) */}
          {plotStep >= 2 && (
            <g className="animate-fadeIn">
              <circle cx={plotZeroX} cy={topY} r={3} className="fill-blue-500" />
              <circle cx={plotZeroX} cy={botY} r={3} className="fill-blue-500" />
              <text x={plotZeroX - 8} y={topY + 3.5} textAnchor="end" className="fill-blue-500 text-[9px] font-mono font-bold">
                τ = 0
              </text>
              <text x={plotZeroX - 8} y={botY + 3.5} textAnchor="end" className="fill-blue-500 text-[9px] font-mono font-bold">
                τ = 0
              </text>
            </g>
          )}

          {/* Step 3: Intermediate dots */}
          {plotStep >= 3 && (
            <g className="animate-fadeIn">
              <circle cx={pxMid} cy={midTopY} r={3} className="fill-indigo-500" />
              <circle cx={pxMid} cy={midBotY} r={3} className="fill-indigo-500" />
              <line x1={plotZeroX} y1={midTopY} x2={pxMid} y2={midTopY} className="stroke-indigo-400/50" strokeWidth={0.8} strokeDasharray="2,2" />
              <line x1={plotZeroX} y1={midBotY} x2={pxMid} y2={midBotY} className="stroke-indigo-400/50" strokeWidth={0.8} strokeDasharray="2,2" />
            </g>
          )}

          {/* Step 4: Finished parabolic stress curve */}
          {plotStep >= 4 && (
            <g className="animate-fadeIn">
              {/* Parabolic path */}
              <path
                d={`M ${plotZeroX} ${topY} Q ${plotZeroX + plotWidth * 2} ${naY} ${plotZeroX} ${botY}`}
                className="fill-none stroke-blue-500"
                strokeWidth={2}
              />
              {/* Max stress dot */}
              <circle cx={pxMax} cy={naY} r={3} className="fill-blue-600" />
              <line x1={plotZeroX} y1={naY} x2={pxMax} y2={naY} className="stroke-blue-400/50" strokeWidth={0.8} strokeDasharray="2,2" />
              <text x={pxMax + 6} y={naY + 3.5} className="fill-blue-500 text-[10px] font-mono font-black">
                τ_max
              </text>
            </g>
          )}

          {/* Step 5: Average stress rectangle baseline */}
          {plotStep >= 5 && (
            <g className="animate-fadeIn">
              {/* Shaded average stress rectangle */}
              <rect
                x={plotZeroX}
                y={topY}
                width={plotWidth * 0.67} // 1 / 1.5 = 2/3 of max width
                height={rectH}
                fill="rgba(244, 63, 94, 0.08)"
                stroke="#f43f5e"
                strokeWidth={1.5}
                strokeDasharray="2,2"
              />
              <text x={plotZeroX + plotWidth * 0.67 + 5} y={topY + 12} className="fill-rose-500 text-[9px] font-mono font-bold">
                τ_avg = V/A
              </text>
              <text x={pxMax + 6} y={naY - 10} className="fill-blue-600 text-[8px] font-mono">
                τ_max = 1.5 * τ_avg
              </text>
            </g>
          )}
        </g>
      </svg>
    </div>
  );
};
