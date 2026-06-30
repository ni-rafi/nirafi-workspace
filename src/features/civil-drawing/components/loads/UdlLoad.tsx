import React from 'react';

export interface UdlLoadProps {
  x: number;
  y: number; // baseline (beam surface)
  width: number;
  height?: number; // height of the load drawing (default 16)
  direction?: 'up' | 'down';
  color?: string;
  fill?: string;
  strokeWidth?: number;
  label?: string;
  numArrows?: number;
}

export const UdlLoad: React.FC<UdlLoadProps> = ({
  x,
  y,
  width,
  height = 16,
  direction = 'down',
  color = '#f59e0b',
  fill = 'rgba(245, 158, 11, 0.05)',
  strokeWidth = 1.5,
  label,
  numArrows,
}) => {
  const isDown = direction === 'down';
  const yTop = isDown ? -height : height;

  const S = numArrows ?? Math.max(4, Math.round(width / 25));
  const arrows = [];
  const arrowCount = S + 1;
  for (let i = 0; i < arrowCount; i++) {
    const x_i = (i * width) / (arrowCount - 1);
    const arrowTipY = 0;
    const arrowShaftStartY = yTop;
    
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

  const midX = width / 2;
  const labelY = isDown ? yTop - 6 : yTop + 14;

  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* Rectangular boundary */}
      <polygon
        points={`0,0 0,${yTop} ${width},${yTop} ${width},0`}
        fill={fill}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeOpacity={0.6}
      />
      {arrows}
      {label && (
        <text
          x={midX}
          y={labelY}
          textAnchor="middle"
          className="text-[8px] font-black font-mono select-none"
          fill={color}
        >
          {label}
        </text>
      )}
    </g>
  );
};

export default UdlLoad;
