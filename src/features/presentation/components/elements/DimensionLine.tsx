import React from 'react';
import { motion } from 'motion/react';

interface DimensionLineProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  label: string;
  color?: string;
  isDotted?: boolean;
  className?: string;
  textClassName?: string;
  labelPositionRatio?: number;
}

export const DimensionLine: React.FC<DimensionLineProps> = ({
  x1,
  y1,
  x2,
  y2,
  label,
  color = 'currentColor',
  isDotted = false,
  className = '',
  textClassName = '',
  labelPositionRatio = 0.5,
}) => {
  const cx = x1 + (x2 - x1) * labelPositionRatio;
  const cy = y1 + (y2 - y1) * labelPositionRatio;
  const isVertical = Math.abs(x1 - x2) < 2;
  const textAngle = isVertical ? -90 : 0;

  // Calculate approximate label width for masking rect
  const labelLength = label.replace(/[\\_{}]/g, '').length;
  const rectW = Math.max(32, labelLength * 6.5 + 8);
  const rectH = 14;

  return (
    <g className={`select-none font-mono ${className}`}>
      <defs>
        {/* Define arrow marker locally to ensure self-contained reusability */}
        <marker
          id={`dim-arrow-local-${color.replace('#', '')}`}
          viewBox="0 0 10 10"
          refX="5"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto-start-reverse"
        >
          <path d="M 0 2 L 10 5 L 0 8 z" fill={color} />
        </marker>
      </defs>

      {/* Dimension Line with arrow markers */}
      <motion.line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={color}
        strokeWidth="1"
        strokeDasharray={isDotted ? '3 3' : undefined}
        markerStart={isDotted ? undefined : `url(#dim-arrow-local-${color.replace('#', '')})`}
        markerEnd={isDotted ? undefined : `url(#dim-arrow-local-${color.replace('#', '')})`}
        animate={{ x1, y1, x2, y2 }}
        initial={false}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className="text-primary/70"
      />

      {/* End Ticks */}
      <motion.line
        x1={x1}
        y1={y1 - 4}
        x2={x1}
        y2={y1 + 4}
        stroke={color}
        strokeWidth="1"
        animate={{ x1, y1: y1 - 4, x2: x1, y2: y1 + 4 }}
        initial={false}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      />
      <motion.line
        x1={x2}
        y1={y2 - 4}
        x2={x2}
        y2={y2 + 4}
        stroke={color}
        strokeWidth="1"
        animate={{ x1: x2, y1: y2 - 4, x2: x2, y2: y2 + 4 }}
        initial={false}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      />

      {/* Label Group (Uses motion.g to animate translation and rotation together without double offset bugs) */}
      <motion.g
        animate={{ x: cx, y: cy, rotate: textAngle }}
        initial={false}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      >
        {/* Background Mask Box to wipe the line underneath */}
        <rect
          x={-rectW / 2}
          y={-rectH / 2}
          width={rectW}
          height={rectH}
          fill="var(--background, #030712)"
          rx="3"
          className="stroke-border/30 stroke-[0.5] fill-background"
        />
        {/* Centered text label */}
        <text
          textAnchor="middle"
          dominantBaseline="central"
          fontSize="8"
          fontWeight="bold"
          fill={color}
          className={`font-sans tracking-wide fill-foreground ${textClassName}`}
        >
          {label}
        </text>
      </motion.g>
    </g>
  );
};

export default DimensionLine;
