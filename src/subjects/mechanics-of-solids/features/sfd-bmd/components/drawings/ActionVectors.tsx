import React from 'react';

interface ShearVectorArrowProps {
  x: number;
  y: number;
  direction: 'up' | 'down';
  color?: string;
  height?: number;
  strokeWidth?: number;
  className?: string;
}

export const ShearVectorArrow: React.FC<ShearVectorArrowProps> = ({
  x,
  y,
  direction,
  color = '#f43f5e',
  height = 30,
  strokeWidth = 2.5,
  className = '',
}) => {
  const yEnd = direction === 'down' ? y + height : y - height;
  const tipY = direction === 'down' ? yEnd - 7 : yEnd + 7;

  return (
    <g className={className}>
      {/* Arrow line body */}
      <line
        x1={x}
        y1={y}
        x2={x}
        y2={yEnd}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      {/* Arrow tip (correctly points towards yEnd) */}
      <path
        d={`M ${x - 4.5},${tipY} L ${x},${yEnd} L ${x + 4.5},${tipY}`}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
};

interface MomentVectorArcProps {
  x: number; // Cut face center x
  y: number; // Cut face center y
  direction: 'cw' | 'ccw';
  side: 'left' | 'right';
  color?: string;
  radius?: number;
  strokeWidth?: number;
  className?: string;
}

export const MomentVectorArc: React.FC<MomentVectorArcProps> = ({
  x,
  y,
  direction,
  side,
  color = '#6366f1',
  radius = 20,
  strokeWidth = 2.5,
  className = '',
}) => {
  const dx = side === 'right' ? radius : -radius;
  const dy = radius * 0.72; // Standard aspect ratio matching CAD drawings

  const startY = direction === 'ccw' ? y + dy : y - dy;
  const endY = direction === 'ccw' ? y - dy : y + dy;

  // Sweep flag is 0 for y-axis mirrored arcs curving towards the beam body
  const sweepFlag = 0;
  const tipX = x + dx;

  // Mirrored arrowhead paths (always pointing left at the active end)
  const headPath = direction === 'ccw'
    ? `M ${tipX + 7},${endY} L ${tipX},${endY} L ${tipX},${endY + 7}`
    : `M ${tipX - 6},${endY} L ${tipX},${endY} L ${tipX},${endY - 7}`;

  return (
    <g className={className}>
      {/* Moment rotational arc */}
      <path
        d={`M ${x + dx},${startY} A ${radius},${radius} 0 0,${sweepFlag} ${x + dx},${endY}`}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      {/* Rotational arrow head */}
      <path
        d={headPath}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
};
