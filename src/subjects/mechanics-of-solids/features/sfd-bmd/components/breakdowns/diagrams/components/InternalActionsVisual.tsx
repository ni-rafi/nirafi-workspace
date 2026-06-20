import React from 'react';
import { BeamLoads } from '@/features/presentation/components/elements';

interface InternalActionsVisualProps {
  activeSide: 'left' | 'right';
  cutPx: number;
  yBeam: number;
}

export const InternalActionsVisual: React.FC<InternalActionsVisualProps> = ({
  activeSide,
  cutPx,
  yBeam,
}) => {
  if (activeSide === 'left') {
    return (
      <g>
        {/* Shear Force Vector (V) - Downward on Right Face of left segment */}
        <BeamLoads
          el={{
            id: 'section-v',
            type: 'point-load',
            x: 0,
            y: 0,
            w: 32,
            h: 40,
            enterAt: 1,
            pointLoadDirection: 'down',
          }}
          stroke="var(--success, #10b981)"
          fill="rgba(16,185,129,0.1)"
          sw={2.2}
          transform={`translate(${cutPx - 8}, ${yBeam - 20})`}
        />
        <text x={cutPx + 8} y={yBeam - 24} textAnchor="middle" className="fill-success text-[13px] font-extrabold select-none">V</text>

        {/* Bending Moment (M) - Anticlockwise, on the right side of the section */}
        <BeamLoads
          el={{
            id: 'section-m',
            type: 'moment',
            x: 0,
            y: 0,
            w: 32,
            h: 32,
            enterAt: 1,
            momentDirection: 'ccw',
          }}
          stroke="var(--success, #10b981)"
          fill="rgba(16,185,129,0.1)"
          sw={2.2}
          transform={`translate(${cutPx + 4}, ${yBeam - 16})`}
          momentHalf="right"
        />
        <text x={cutPx + 30} y={yBeam - 22} textAnchor="middle" className="fill-success text-[13px] font-extrabold select-none">M</text>
      </g>
    );
  }

  return (
    <g>
      {/* Shear Force Vector (V) - Upward on Left Face of right segment */}
      <BeamLoads
        el={{
          id: 'section-v',
          type: 'point-load',
          x: 0,
          y: 0,
          w: 32,
          h: 40,
          enterAt: 1,
          pointLoadDirection: 'up',
        }}
        stroke="var(--success, #10b981)"
        fill="rgba(16,185,129,0.1)"
        sw={2.2}
        transform={`translate(${cutPx - 24}, ${yBeam - 20})`}
      />
      <text x={cutPx - 8} y={yBeam - 24} textAnchor="middle" className="fill-success text-[13px] font-extrabold select-none">V</text>

      {/* Bending Moment (M) - Clockwise, on the left side of the section */}
      <BeamLoads
        el={{
          id: 'section-m',
          type: 'moment',
          x: 0,
          y: 0,
          w: 32,
          h: 32,
          enterAt: 1,
          momentDirection: 'cw',
        }}
        stroke="var(--success, #10b981)"
        fill="rgba(16,185,129,0.1)"
        sw={2.2}
        transform={`translate(${cutPx - 36}, ${yBeam - 16})`}
        momentHalf="left"
      />
      <text x={cutPx - 30} y={yBeam - 22} textAnchor="middle" className="fill-success text-[13px] font-extrabold select-none">M</text>
    </g>
  );
};
