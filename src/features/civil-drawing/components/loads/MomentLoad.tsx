import React from 'react';

export interface MomentLoadProps {
  cx: number;
  cy: number;
  radius?: number; // default 14
  variant?: 'cw-left' | 'cw-right' | 'ccw-left' | 'ccw-right';
  color?: string;
  strokeWidth?: number;
  label?: string;
}

export const MomentLoad: React.FC<MomentLoadProps> = ({
  cx,
  cy,
  radius = 14,
  variant = 'cw-right',
  color = '#8b5cf6',
  strokeWidth = 2,
  label,
}) => {
  const isRight = variant.endsWith('right');

  const angleBottom = Math.PI / 2;
  const angleTop = 3 * Math.PI / 2;

  let startAngle = angleBottom;
  let endAngle = angleTop;
  let sweep = 1;

  if (variant === 'cw-left') {
    startAngle = angleBottom;
    endAngle = angleTop;
    sweep = 1;
  } else if (variant === 'cw-right') {
    startAngle = angleTop;
    endAngle = angleBottom;
    sweep = 1;
  } else if (variant === 'ccw-left') {
    startAngle = angleTop;
    endAngle = angleBottom;
    sweep = 0;
  } else if (variant === 'ccw-right') {
    startAngle = angleBottom;
    endAngle = angleTop;
    sweep = 0;
  }

  // Subtract a small offset from the end angle so the arrow tip has room
  const pathEndAngle = endAngle - (sweep === 1 ? 0.35 : -0.35);

  const x1 = radius * Math.cos(startAngle);
  const y1 = radius * Math.sin(startAngle);
  const x2 = radius * Math.cos(pathEndAngle);
  const y2 = radius * Math.sin(pathEndAngle);

  const pathD = `M ${x1} ${y1} A ${radius} ${radius} 0 1 ${sweep} ${x2} ${y2}`;

  // Arrowhead coordinates at endAngle
  const arrowLength = 7;
  const arrowAngle = Math.PI / 6;
  const tangent = endAngle + (sweep === 1 ? Math.PI / 2 : -Math.PI / 2);
  const ax = radius * Math.cos(endAngle);
  const ay = radius * Math.sin(endAngle);

  const p1x = ax - arrowLength * Math.cos(tangent - arrowAngle);
  const p1y = ay - arrowLength * Math.sin(tangent - arrowAngle);
  const p2x = ax - arrowLength * Math.cos(tangent + arrowAngle);
  const p2y = ay - arrowLength * Math.sin(tangent + arrowAngle);

  const arrowheadD = `M ${p1x} ${p1y} L ${ax} ${ay} L ${p2x} ${p2y} Z`;

  // Label positioning above or below the moment curve
  const labelY = isRight ? -radius - 6 : -radius - 6;
  const labelX = isRight ? radius + 4 : -radius - 4;
  const textAnchor = isRight ? 'start' : 'end';

  return (
    <g transform={`translate(${cx}, ${cy})`}>
      <path
        d={pathD}
        fill="none"
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

export default MomentLoad;
