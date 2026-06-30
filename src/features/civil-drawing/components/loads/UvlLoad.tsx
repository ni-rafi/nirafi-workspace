import React from 'react';

export interface UvlLoadProps {
  x: number;
  y: number; // baseline (beam surface)
  width: number;
  startHeight: number; // SVG pixel height at left
  endHeight: number; // SVG pixel height at right
  direction?: 'up' | 'down';
  color?: string;
  fill?: string;
  strokeWidth?: number;
  startLabel?: string;
  endLabel?: string;
  numArrows?: number;
}

export const UvlLoad: React.FC<UvlLoadProps> = ({
  x,
  y,
  width,
  startHeight,
  endHeight,
  direction = 'down',
  color = '#f59e0b',
  fill = 'rgba(245, 158, 11, 0.05)',
  strokeWidth = 1.5,
  startLabel,
  endLabel,
  numArrows = 6,
}) => {
  const isDown = direction === 'down';
  
  // y values of the sloped top line relative to the baseline (0)
  const y1 = isDown ? -startHeight : startHeight;
  const y2 = isDown ? -endHeight : endHeight;

  const arrows = [];
  const arrowCount = numArrows;
  for (let i = 0; i < arrowCount; i++) {
    const x_i = (i * width) / (arrowCount - 1);
    const arrowTipY = 0;
    const arrowShaftStartY = y1 + ((y2 - y1) * i) / (arrowCount - 1);
    
    // Skip arrow if height is basically zero
    if (Math.abs(arrowShaftStartY) < 1) continue;

    arrows.push(
      <g key={i}>
        <line
          x1={x_i}
          y1={arrowShaftStartY}
          x2={x_i}
          y2={isDown ? arrowTipY - 4 : arrowTipY + 4}
          stroke={color}
          strokeWidth={strokeWidth}
        />
        <path
          d={isDown
            ? `M ${x_i - 3} ${arrowTipY - 4} L ${x_i} ${arrowTipY} L ${x_i + 3} ${arrowTipY - 4} Z`
            : `M ${x_i - 3} ${arrowTipY + 4} L ${x_i} ${arrowTipY} L ${x_i + 3} ${arrowTipY + 4} Z`
          }
          fill={color}
        />
      </g>
    );
  }

  // Label offsets
  const labelOffset = 6;
  const labelY1 = isDown ? y1 - labelOffset : y1 + labelOffset + 8;
  const labelY2 = isDown ? y2 - labelOffset : y2 + labelOffset + 8;

  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* Trapezoidal load boundary */}
      <polygon
        points={`0,0 0,${y1} ${width},${y2} ${width},0`}
        fill={fill}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeOpacity={0.6}
      />
      {arrows}
      
      {startLabel && (
        <text
          x={0}
          y={labelY1}
          textAnchor="start"
          className="text-[8px] font-black font-mono"
          fill={color}
        >
          {startLabel}
        </text>
      )}
      {endLabel && (
        <text
          x={width}
          y={labelY2}
          textAnchor="end"
          className="text-[8px] font-black font-mono"
          fill={color}
        >
          {endLabel}
        </text>
      )}
    </g>
  );
};

export default UvlLoad;
