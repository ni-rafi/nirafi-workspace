import React from 'react';
import { IIntervalEquation } from '@/subjects/mechanics-of-solids/cores/sfd-bmd/types';
import { getSvgX, getSfdCurvePoints } from './diagramConstants';

interface ShearAreaShadingProps {
  startX: number;
  endX: number;
  sfdY: number;
  sfdScale: number;
  beamLength: number;
  intervals: IIntervalEquation[];
  vStart: number;
  vEnd: number;
  fillColor?: string;   // e.g. "fill-emerald-500/20"
  strokeColor?: string; // e.g. "stroke-emerald-500/10"
  className?: string;   // custom animation classes
}

export const ShearAreaShading: React.FC<ShearAreaShadingProps> = ({
  startX,
  endX,
  sfdY,
  sfdScale,
  beamLength,
  intervals,
  vStart,
  vEnd,
  fillColor = 'fill-emerald-500/20',
  strokeColor = 'stroke-emerald-500/10',
  className = 'animate-in fade-in duration-300',
}) => {
  const sX = getSvgX(startX, beamLength);
  const eX = getSvgX(endX, beamLength);

  const interval = intervals.find(
    inv => startX >= inv.startX - 1e-3 && endX <= inv.endX + 1e-3
  );
  const isCurved = interval && Math.abs(interval.vCoeffs[0]) > 1e-6;

  let pathD = '';
  if (isCurved) {
    const ptsStr = getSfdCurvePoints(startX, endX, sfdY, sfdScale, beamLength, intervals);
    const curveCmds = ptsStr.trim().split(' ').map(pair => `L ${pair.split(',').join(' ')}`).join(' ');
    pathD = `M ${sX} ${sfdY} ${curveCmds} L ${eX} ${sfdY} Z`;
  } else {
    pathD = `M ${sX} ${sfdY} L ${sX} ${sfdY - vStart * sfdScale} L ${eX} ${sfdY - vEnd * sfdScale} L ${eX} ${sfdY} Z`;
  }

  return (
    <path
      d={pathD}
      className={`${fillColor} ${strokeColor} ${className}`}
      strokeWidth="0.5"
    />
  );
};
