import React from 'react';
import { IEISegment } from '@/subjects/mechanics-of-solids/cores/deflection/types';

interface BeamSegmentsVisualProps {
  eiSegments: IEISegment[];
  toPixel: (x: number) => number;
  yBeam: number;
  opacityRightOfX: number | null;
  opacitySide: 'left' | 'right';
}

export const BeamSegmentsVisual: React.FC<BeamSegmentsVisualProps> = ({
  eiSegments,
  toPixel,
  yBeam,
  opacityRightOfX,
  opacitySide,
}) => {
  return (
    <>
      {eiSegments.map((seg, idx) => {
        const sPx = toPixel(seg.startPosition);
        const ePx = toPixel(seg.endPosition);
        const segW = ePx - sPx;
        const EI = seg.E * seg.I;
        const scaleH = Math.max(10, Math.min(26, 10 + (EI / 100000) * 12));

        const opacity = opacityRightOfX !== null
          ? (opacitySide === 'left'
              ? (seg.startPosition >= opacityRightOfX
                  ? 1.0
                  : seg.endPosition <= opacityRightOfX
                  ? 0.2
                  : 1.0)
              : (seg.endPosition <= opacityRightOfX
                  ? 1.0
                  : seg.startPosition >= opacityRightOfX
                  ? 0.2
                  : 1.0))
          : 1.0;

        return (
          <g key={seg.id} opacity={opacity}>
            <rect
              x={sPx}
              y={yBeam - scaleH / 2}
              width={segW}
              height={scaleH}
              rx={3}
              className="fill-muted/70 stroke-border stroke-[1.2]"
            />
            {idx > 0 && (
              <line
                x1={sPx}
                y1={yBeam - 12}
                x2={sPx}
                y2={yBeam + 12}
                className="stroke-primary stroke-[1.2] stroke-dasharray-[3,3]"
              />
            )}
          </g>
        );
      })}
    </>
  );
};
