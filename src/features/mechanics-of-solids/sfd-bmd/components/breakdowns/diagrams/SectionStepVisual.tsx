import React from 'react';
import { useBeamWorkspace } from '../../../context/BeamWorkspaceContext';

interface SectionStepVisualProps {
  text: string;
}

export const SectionStepVisual: React.FC<SectionStepVisualProps> = ({ text }) => {
  const { length, supports, loads, hoverX } = useBeamWorkspace();

  const width = 320;
  const height = 75;
  const paddingX = 20;
  const beamW = width - paddingX * 2;
  const yBeam = 40;

  const toPixel = (pos: number) => paddingX + (pos / length) * beamW;

  // Parse interval limits (e.g. "Interval 1: $x \\in [0.00, 3.00]$")
  let startX = 0;
  let endX = length;
  const match = text.match(/\[([\d.]+),\s*([\d.]+)\]/);
  if (match && match[1] && match[2]) {
    startX = parseFloat(match[1]);
    endX = parseFloat(match[2]);
  }

  // Active cut position x is synced with hoverX if hoverX is within the interval,
  // otherwise it defaults to the midpoint of the interval.
  let cutX = (startX + endX) / 2;
  if (hoverX !== null && hoverX >= startX && hoverX <= endX) {
    cutX = hoverX;
  }

  const sPx = toPixel(0);
  const cutPx = toPixel(cutX);
  const ePx = toPixel(length);

  return (
    <div className="mt-2.5 mb-1.5 overflow-hidden rounded-lg border border-border/30 bg-muted/5 p-2 max-w-sm">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full select-none overflow-visible">
        {/* Ghosted Right Beam Part */}
        <rect
          x={cutPx}
          y={yBeam - 4}
          width={ePx - cutPx}
          height={8}
          rx={2}
          className="fill-muted/20 stroke-border/30"
          strokeWidth={0.75}
        />

        {/* Active Left Beam Part */}
        <rect
          x={sPx}
          y={yBeam - 4}
          width={cutPx - sPx}
          height={8}
          rx={2}
          className="fill-muted/80 stroke-border"
          strokeWidth={1}
        />

        {/* Supports */}
        {supports.map(s => {
          const px = toPixel(s.position);
          const isRightSide = s.position > cutX;
          const opacity = isRightSide ? 0.2 : 1.0;

          return (
            <g key={s.id} opacity={opacity}>
              {s.type === 'fixed' ? (
                <line x1={px} y1={yBeam - 10} x2={px} y2={yBeam + 10} className="stroke-foreground stroke-2" />
              ) : s.type === 'hinge' ? (
                <polygon
                  points={`${px},${yBeam} ${px - 5},${yBeam + 8} ${px + 5},${yBeam + 8}`}
                  className="fill-none stroke-foreground stroke-1.5"
                />
              ) : (
                <g>
                  <circle cx={px} cy={yBeam + 3} r={3} className="fill-none stroke-foreground stroke-1.2" />
                  <line x1={px - 5} y1={yBeam + 8} x2={px + 5} y2={yBeam + 8} className="stroke-foreground stroke-0.8" />
                </g>
              )}
            </g>
          );
        })}

        {/* Applied Loads */}
        {loads.map((l, idx) => {
          if (l.type !== 'point' || l.position === undefined) return null;
          const px = toPixel(l.position);
          const isRightSide = l.position > cutX;
          const opacity = isRightSide ? 0.2 : 1.0;
          const isUp = (l.magnitude ?? 0) < 0;

          return (
            <g key={`l-${idx}`} opacity={opacity}>
              <line
                x1={px}
                y1={isUp ? yBeam + 16 : yBeam - 16}
                x2={px}
                y2={yBeam}
                stroke="var(--accent, #f97316)"
                strokeWidth={1.5}
              />
              <polygon
                points={isUp
                  ? `${px},${yBeam} ${px - 2},${yBeam + 3} ${px + 2},${yBeam + 3}`
                  : `${px},${yBeam} ${px - 2},${yBeam - 3} ${px + 2},${yBeam - 3}`
                }
                fill="var(--accent, #f97316)"
              />
            </g>
          );
        })}

        {/* Dotted Cut Line */}
        <line
          x1={cutPx}
          y1={yBeam - 22}
          x2={cutPx}
          y2={yBeam + 22}
          stroke="var(--destructive)"
          strokeWidth={1.2}
          strokeDasharray="3,2"
        />

        {/* Dimension helper for cut coordinate x */}
        <line
          x1={sPx}
          y1={yBeam + 16}
          x2={cutPx}
          y2={yBeam + 16}
          stroke="var(--primary)"
          strokeWidth={0.75}
        />
        <text
          x={(sPx + cutPx) / 2}
          y={yBeam + 26}
          textAnchor="middle"
          className="fill-primary text-[8.5px] font-semibold"
        >
          x = {cutX.toFixed(2)}m
        </text>

        {/* Cut-face internal actions V and M */}
        <g transform={`translate(${cutPx + 4}, ${yBeam - 8})`}>
          {/* Shear Force Vector (V) */}
          <g>
            <line x1={4} y1={-6} x2={4} y2={10} stroke="var(--success, #10b981)" strokeWidth={1.5} strokeLinecap="round" />
            <polygon points="4,10 2,7 6,7" fill="var(--success, #10b981)" />
            <text x={10} y={4} className="fill-success text-[8px] font-bold">V</text>
          </g>

          {/* Internal Moment Arc (M) */}
          <g transform="translate(14, 0)">
            <path d="M -6 4 A 7 7 0 0 0 6 4" fill="none" stroke="var(--success, #10b981)" strokeWidth={1.5} strokeLinecap="round" />
            <polygon points="6,4 4,7 8,6" fill="var(--success, #10b981)" />
            <text x={10} y={4} className="fill-success text-[8px] font-bold">M</text>
          </g>
        </g>
      </svg>
    </div>
  );
};
