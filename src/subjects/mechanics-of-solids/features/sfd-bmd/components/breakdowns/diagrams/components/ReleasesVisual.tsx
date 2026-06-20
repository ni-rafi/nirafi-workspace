import React from 'react';
import { IInternalRelease } from '@/subjects/mechanics-of-solids/cores/sfd-bmd/types';
import { BeamSupports } from '@/features/presentation/components/elements';
import { VisualCanvasShape } from '@/features/presentation/types/schema';

interface ReleasesVisualProps {
  activeReleases: IInternalRelease[];
  toPixel: (pos: number) => number;
  highlightedReleaseId: string | null;
  yBeam: number;
  getOpacity: (x: number) => number;
}

export const ReleasesVisual: React.FC<ReleasesVisualProps> = ({
  activeReleases,
  toPixel,
  highlightedReleaseId,
  yBeam,
  getOpacity,
}) => {
  return (
    <>
      {activeReleases.map(r => {
        const px = toPixel(r.position);
        const isHighlighted = highlightedReleaseId === r.id;
        const opacity = getOpacity(r.position);

        const shape: VisualCanvasShape = {
          id: r.id,
          type: 'hinge',
          x: 0,
          y: 0,
          w: 12,
          h: 12,
          enterAt: 1,
        };

        return (
          <g key={r.id} opacity={opacity}>
            <BeamSupports
              el={shape}
              stroke={isHighlighted ? 'var(--primary)' : 'var(--destructive)'}
              fill="var(--background)"
              sw={1.5}
              transform={`translate(${px - 6}, ${yBeam - 6})`}
            />
          </g>
        );
      })}
    </>
  );
};
