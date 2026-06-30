import React from 'react';

export interface PointLoadProps {
  x: number;
  y: number; // tip coordinate
  length?: number; // arrow length (default 28)
  direction?: 'up' | 'down' | 'left' | 'right';
  color?: string;
  strokeWidth?: number;
  label?: string;
  labelSide?: 'left' | 'right';
}

export const PointLoad: React.FC<PointLoadProps> = ({
  x,
  y,
  length = 28,
  direction = 'down',
  color = '#ef4444',
  strokeWidth = 2,
  label,
  labelSide = 'right',
}) => {
  let x1 = 0, y1 = 0, x2 = 0, y2 = 0;
  let arrowheadD = '';
  let labelX = 6;
  let labelY = -12;
  let textAnchor: 'start' | 'end' | 'middle' = 'start';

  if (direction === 'down') {
    x1 = 0; y1 = -length; x2 = 0; y2 = 0;
    arrowheadD = `M -3.5 -5 L 0 0 L 3.5 -5 Z`;
    labelX = labelSide === 'right' ? 6 : -6;
    labelY = -length / 2;
    textAnchor = labelSide === 'right' ? 'start' : 'end';
  } else if (direction === 'up') {
    x1 = 0; y1 = length; x2 = 0; y2 = 0;
    arrowheadD = `M -3.5 5 L 0 0 L 3.5 5 Z`;
    labelX = labelSide === 'right' ? 6 : -6;
    labelY = length / 2;
    textAnchor = labelSide === 'right' ? 'start' : 'end';
  } else if (direction === 'left') {
    x1 = length; y1 = 0; x2 = 0; y2 = 0;
    arrowheadD = `M 5 -3.5 L 0 0 L 5 3.5 Z`;
    labelX = length / 2;
    labelY = -6;
    textAnchor = 'middle';
  } else if (direction === 'right') {
    x1 = -length; y1 = 0; x2 = 0; y2 = 0;
    arrowheadD = `M -5 -3.5 L 0 0 L -5 3.5 Z`;
    labelX = -length / 2;
    labelY = -6;
    textAnchor = 'middle';
  }

  return (
    <g transform={`translate(${x}, ${y})`}>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path d={arrowheadD} fill={color} />
      {label && (
        <text
          x={labelX}
          y={labelY}
          textAnchor={textAnchor}
          className="text-[8px] font-black font-mono select-none"
          fill={color}
        >
          {label}
        </text>
      )}
    </g>
  );
};

export default PointLoad;
