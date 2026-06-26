import React from 'react';
import { useBeamWorkspace } from '@/subjects/mechanics-of-solids/features/sfd-bmd/context/BeamWorkspaceContext';
import { useBeamEngine } from '../../../hooks/useBeamEngine';
import { splitIntoSignSegments } from '../../../utils/chartUtils';

import { ICalculationStep } from '../../../types/stepTypes';

interface GraphicalStepVisualProps {
  step: ICalculationStep;
}

export const GraphicalStepVisual: React.FC<GraphicalStepVisualProps> = ({ step }) => {
  const { length } = useBeamWorkspace();
  const { solverResult } = useBeamEngine();

  const width = 320;
  const height = 90;
  const paddingX = 20;
  const beamW = width - paddingX * 2;
  const ySFD = 40;

  const toPixelX = (x: number) => paddingX + (x / length) * beamW;

  // Evaluate shear force at any x
  const getVAt = (x: number): number => {
    if (!solverResult.success || !solverResult.intervals) return 0;
    const interval = solverResult.intervals.find(
      inv => x >= inv.startX - 1e-4 && x <= inv.endX + 1e-4
    );
    if (!interval) return 0;
    const [a, b, c] = interval.vCoeffs;
    return a * x * x + b * x + c;
  };

  // Evaluate shear force using step metadata vCoeffs if available, falling back to getVAt
  const evalVAt = (x: number): number => {
    const coeffs = step.metadata?.vCoeffs as [number, number, number] | undefined;
    if (coeffs) {
      const [a, b, c] = coeffs;
      return a * x * x + b * x + c;
    }
    return getVAt(x);
  };

  // Find max shear to scale
  let maxV = 1;
  const points: { x: number; v: number }[] = [];
  const numSteps = 80;
  for (let i = 0; i <= numSteps; i++) {
    const x = (i / numSteps) * length;
    const v = getVAt(x);
    points.push({ x, v });
    if (Math.abs(v) > maxV) maxV = Math.abs(v);
  }

  const scaleY = (v: number) => ySFD - (v / maxV) * 25;

  // Shading bounds from step metadata
  const hasShading = step.metadata?.startX !== undefined && step.metadata?.endX !== undefined;
  const shadeStart = hasShading ? (step.metadata!.startX as number) : 0;
  const shadeEnd = hasShading ? (step.metadata!.endX as number) : length;

  // Jump coordinates from step highlightX
  const isPointJump = step.id.includes('jump');
  const jumpX = step.highlightX ?? 0;

  // Build the SFD polygon path
  let pathD = `M ${toPixelX(0)} ${scaleY(0)}`;
  points.forEach(pt => {
    pathD += ` L ${toPixelX(pt.x)} ${scaleY(pt.v)}`;
  });
  pathD += ` L ${toPixelX(length)} ${scaleY(0)} Z`;

  // Build the shaded area path using exact boundary sampling
  const shadePoints: { x: number; v: number }[] = [];
  if (hasShading) {
    const numShadeSteps = 40;
    for (let i = 0; i <= numShadeSteps; i++) {
      const x = shadeStart + (i / numShadeSteps) * (shadeEnd - shadeStart);
      shadePoints.push({ x, v: evalVAt(x) });
    }
  }

  const signSegments = splitIntoSignSegments(
    shadePoints.map(pt => ({ x: pt.x, y: pt.v }))
  );

  const renderedSegments = signSegments.map((seg, sIdx) => {
    if (seg.points.length === 0) return null;
    const segStartX = seg.points[0]!.x;
    const segEndX = seg.points[seg.points.length - 1]!.x;
    
    let d = `M ${toPixelX(segStartX)} ${scaleY(0)}`;
    seg.points.forEach(pt => {
      d += ` L ${toPixelX(pt.x)} ${scaleY(pt.y)}`;
    });
    d += ` L ${toPixelX(segEndX)} ${scaleY(0)} Z`;

    const fillColor = seg.isPos ? 'rgba(16, 185, 129, 0.25)' : 'rgba(239, 68, 68, 0.2)';
    const strokeColor = seg.isPos ? 'var(--success, #10b981)' : 'var(--destructive, #ef4444)';

    return (
      <path
        key={sIdx}
        d={d}
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={1.5}
      />
    );
  });

  // Determine role and label formatting
  const role = (step.metadata?.diagramRole as string | undefined) ?? (step.id.includes('sfd') ? 'sfd-segment' : 'bmd-segment');
  const isSfd = role.startsWith('sfd');
  const labelText = isSfd ? 'Load Area = ΔV' : 'Shear Area = ΔM';
  const labelColor = isSfd ? 'var(--success, #10b981)' : '#0ea5e9';

  return (
    <div className="mt-2.5 mb-1.5 overflow-hidden rounded-lg border border-border/30 bg-muted/5 p-2 max-w-sm">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full select-none overflow-visible">
        {/* SFD Baseline */}
        <line
          x1={paddingX}
          y1={ySFD}
          x2={width - paddingX}
          y2={ySFD}
          stroke="var(--muted-foreground)"
          strokeWidth={1}
          opacity={0.5}
        />

        {/* SFD Overall Shape */}
        <path
          d={pathD}
          fill="none"
          stroke="var(--border)"
          strokeWidth={1}
          opacity={0.4}
        />

        {/* Shaded Area integration zones */}
        {renderedSegments}

        {/* Point Jump Indicator */}
        {isPointJump && (
          <g>
            <line
              x1={toPixelX(jumpX)}
              y1={10}
              x2={toPixelX(jumpX)}
              y2={height - 10}
              stroke="var(--destructive)"
              strokeWidth={1}
              strokeDasharray="2,2"
            />
            <circle
              cx={toPixelX(jumpX)}
              cy={scaleY(getVAt(jumpX))}
              r={4}
              fill="var(--destructive)"
              className="animate-pulse"
            />
            <text
              x={toPixelX(jumpX) + 6}
              y={scaleY(getVAt(jumpX)) - 6}
              className="fill-destructive text-[8px] font-extrabold select-none"
            >
              x = {jumpX.toFixed(2)}m
            </text>
          </g>
        )}

        {/* Label for shaded area */}
        {shadePoints.length > 0 && (
          <g>
            <text
              x={toPixelX((shadeStart + shadeEnd) / 2)}
              y={ySFD + 25}
              textAnchor="middle"
              className="text-[8.5px] font-bold select-none"
              style={{ fill: labelColor }}
            >
              {labelText}
            </text>
            <line
              x1={toPixelX((shadeStart + shadeEnd) / 2)}
              y1={ySFD + 4}
              x2={toPixelX((shadeStart + shadeEnd) / 2)}
              y2={ySFD + 16}
              stroke={labelColor}
              strokeWidth={1}
              strokeDasharray="2,1"
            />
          </g>
        )}
      </svg>
    </div>
  );
};
