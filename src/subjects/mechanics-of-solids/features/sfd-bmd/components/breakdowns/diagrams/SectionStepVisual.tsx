import React, { useContext } from 'react';
import { BeamWorkspaceContext } from '@/subjects/mechanics-of-solids/features/sfd-bmd/context/BeamWorkspaceContext';
import { MiniBeamVisual } from './MiniBeamVisual';

interface SectionStepVisualProps {
  text: string;
}

export const SectionStepVisual: React.FC<SectionStepVisualProps> = ({ text }) => {
  const beamCtx = useContext(BeamWorkspaceContext);
  if (!beamCtx) return null;

  const { length, hoverX } = beamCtx;

  // Parse interval limits (e.g. "Interval 1: $x \in [0.00, 3.00]$")
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

  const handleRenderOverlay = (toPixel: (x: number) => number) => {
    const yBeam = 70;
    const sPx = toPixel(0);
    const cutPx = toPixel(cutX);

    return (
      <g>
        {/* Dotted Cut Line */}
        <line
          x1={cutPx}
          y1={yBeam - 30}
          x2={cutPx}
          y2={yBeam + 30}
          stroke="var(--destructive)"
          strokeWidth={1.2}
          strokeDasharray="3,2"
        />

        {/* Dimension helper for cut coordinate x */}
        <line
          x1={sPx}
          y1={yBeam + 24}
          x2={cutPx}
          y2={yBeam + 24}
          stroke="var(--primary)"
          strokeWidth={0.75}
        />
        <text
          x={(sPx + cutPx) / 2}
          y={yBeam + 36}
          textAnchor="middle"
          className="fill-primary text-[12px] font-bold"
        >
          x = {cutX.toFixed(2)}m
        </text>

        {/* Cut-face internal actions V and M */}
        <g transform={`translate(${cutPx + 6}, ${yBeam - 10})`}>
          {/* Shear Force Vector (V) */}
          <g>
            <line x1={4} y1={-8} x2={4} y2={14} stroke="var(--success, #10b981)" strokeWidth={1.2} strokeLinecap="round" />
            <polygon points="4,14 1.5,10 6.5,10" fill="var(--success, #10b981)" />
            <text x={10} y={6} className="fill-success text-[11px] font-extrabold">V</text>
          </g>

          {/* Internal Moment Arc (M) */}
          <g transform="translate(16, 0)">
            <path d="M -6 4 A 8 8 0 0 0 6 4" fill="none" stroke="var(--success, #10b981)" strokeWidth={1.2} strokeLinecap="round" />
            <polygon points="6,4 3.5,7 8.5,6" fill="var(--success, #10b981)" />
            <text x={10} y={6} className="fill-success text-[11px] font-extrabold">M</text>
          </g>
        </g>
      </g>
    );
  };

  return (
    <MiniBeamVisual
      opacityRightOfX={cutX}
      onRenderOverlay={handleRenderOverlay}
    />
  );
};
