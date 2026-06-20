import React from 'react';
import { useBeamWorkspace } from '../../../context/BeamWorkspaceContext';

interface ReactionsStepVisualProps {
  text: string;
}

export const ReactionsStepVisual: React.FC<ReactionsStepVisualProps> = ({ text }) => {
  const { length, supports, loads } = useBeamWorkspace();

  const width = 320;
  const height = 75;
  const paddingX = 20;
  const beamW = width - paddingX * 2;
  const yBeam = 35;

  const toPixel = (pos: number) => paddingX + (pos / length) * beamW;

  // Determine pivot support based on text matching A or B
  // Sort supports to match letters A, B, C...
  const sortedSupports = [...supports].sort((a, b) => a.position - b.position);
  let pivotIndex = -1;
  if (text.includes('M_A') || text.includes('about $A$')) {
    pivotIndex = 0;
  } else if (text.includes('M_B') || text.includes('about $B$')) {
    pivotIndex = 1;
  }

  const pivotSupport = pivotIndex >= 0 ? sortedSupports[pivotIndex] : null;
  const isFy = text.includes('F_y') || text.includes('vertical');

  return (
    <div className="mt-2.5 mb-1.5 overflow-hidden rounded-lg border border-border/30 bg-muted/5 p-2 max-w-sm">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full select-none overflow-visible">
        {/* Beam member */}
        <rect
          x={paddingX}
          y={yBeam - 4}
          width={beamW}
          height={8}
          rx={2}
          className="fill-muted/70 stroke-border"
          strokeWidth={1}
        />

        {/* Supports */}
        {supports.map(s => {
          const px = toPixel(s.position);
          const isPivot = pivotSupport && pivotSupport.id === s.id;

          return (
            <g key={s.id}>
              {s.type === 'fixed' ? (
                <line x1={px} y1={yBeam - 10} x2={px} y2={yBeam + 10} className="stroke-foreground stroke-2" />
              ) : s.type === 'hinge' ? (
                <polygon
                  points={`${px},${yBeam} ${px - 6},${yBeam + 10} ${px + 6},${yBeam + 10}`}
                  className="fill-none stroke-foreground stroke-1.5"
                />
              ) : (
                <g>
                  <circle cx={px} cy={yBeam + 4} r={4} className="fill-none stroke-foreground stroke-1.5" />
                  <line x1={px - 6} y1={yBeam + 10} x2={px + 6} y2={yBeam + 10} className="stroke-foreground stroke-1" />
                </g>
              )}

              {/* Glowing Pivot indicator */}
              {isPivot && (
                <g>
                  <circle cx={px} cy={yBeam} r={8} fill="none" stroke="var(--primary)" strokeWidth={1.5} className="animate-pulse" />
                  <circle cx={px} cy={yBeam} r={3} fill="var(--primary)" />
                  {/* Moment arc pivot sign */}
                  <path
                    d={`M ${px - 10} ${yBeam - 10} A 14 14 0 0 1 ${px + 10} ${yBeam - 10}`}
                    fill="none"
                    stroke="var(--primary)"
                    strokeWidth={1.5}
                    strokeDasharray="2,2"
                  />
                </g>
              )}
            </g>
          );
        })}

        {/* Leverage dimension lines to loads */}
        {pivotSupport &&
          loads.map((l, idx) => {
            const loadPos = l.position ?? l.startPosition ?? 0;
            const pivotPx = toPixel(pivotSupport.position);
            const loadPx = toPixel(loadPos);
            if (Math.abs(pivotPx - loadPx) < 5) return null;

            // Draw dimension line representing lever arm
            const yDim = yBeam - 18;
            return (
              <g key={`arm-${idx}`}>
                <line
                  x1={pivotPx}
                  y1={yDim}
                  x2={loadPx}
                  y2={yDim}
                  stroke="var(--primary)"
                  strokeWidth={1}
                  strokeDasharray="2,2"
                />
                <circle cx={pivotPx} cy={yDim} r={2} fill="var(--primary)" />
                <circle cx={loadPx} cy={yDim} r={2} fill="var(--primary)" />
                <text
                  x={(pivotPx + loadPx) / 2}
                  y={yDim - 4}
                  textAnchor="middle"
                  className="fill-primary text-[8px] font-semibold"
                >
                  {Math.abs(loadPos - pivotSupport.position).toFixed(2)}m
                </text>
              </g>
            );
          })}

        {/* Highlight loads arrows for Fy or pivot */}
        {loads.map((l, idx) => {
          if (l.type !== 'point' || l.position === undefined) return null;
          const px = toPixel(l.position);
          const isUp = (l.magnitude ?? 0) < 0;

          return (
            <g key={`l-${idx}`}>
              {/* Force arrow */}
              <line
                x1={px}
                y1={isUp ? yBeam + 22 : yBeam - 22}
                x2={px}
                y2={yBeam}
                stroke={isFy ? 'var(--success, #10b981)' : 'var(--accent, #f97316)'}
                strokeWidth={2}
                strokeLinecap="round"
              />
              <polygon
                points={isUp
                  ? `${px},${yBeam} ${px - 3},${yBeam + 4} ${px + 3},${yBeam + 4}`
                  : `${px},${yBeam} ${px - 3},${yBeam - 4} ${px + 3},${yBeam - 4}`
                }
                fill={isFy ? 'var(--success, #10b981)' : 'var(--accent, #f97316)'}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
};
