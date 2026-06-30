import React from 'react';
import { getSvgX } from './diagramConstants';

interface LoadAreaShadingProps {
  startX: number;
  endX: number;
  beamY: number;
  hStart: number;
  hEnd: number;
  beamLength: number;
  fillColor?: string;
  strokeColor?: string;
  className?: string;
}

export const LoadAreaShading: React.FC<LoadAreaShadingProps> = ({
  startX,
  endX,
  beamY,
  hStart,
  hEnd,
  beamLength,
  fillColor = 'fill-fuchsia-500/20',
  strokeColor = 'stroke-fuchsia-500/20',
  className = 'animate-in fade-in duration-300',
}) => {
  const sX = getSvgX(startX, beamLength);
  const eX = getSvgX(endX, beamLength);
  const points = `${sX},${beamY} ${sX},${beamY - hStart} ${eX},${beamY - hEnd} ${eX},${beamY}`;

  return (
    <polygon
      points={points}
      className={`${fillColor} ${strokeColor} ${className}`}
      strokeWidth="0.5"
    />
  );
};
export default LoadAreaShading;
