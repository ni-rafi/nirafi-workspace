import React from 'react';
import { BeamLoads } from '@/features/presentation/components/elements';
import { IActiveLoadVisual } from '../sectionLoadHelper';

interface SectionLoadsVisualProps {
  activeLoadVisuals: IActiveLoadVisual[];
  toPixel: (x: number) => number;
  yBeam: number;
}

export const SectionLoadsVisual: React.FC<SectionLoadsVisualProps> = ({
  activeLoadVisuals,
  toPixel,
  yBeam,
}) => {
  return (
    <>
      {activeLoadVisuals.map(l => {
        const px = toPixel(l.centroidX);

        if (l.type === 'point' || l.type === 'moment') {
          const isUp = l.isUpward;
          return (
            <g key={l.id}>
              <text
                x={px}
                y={l.type === 'point' ? (isUp ? yBeam + 46 : yBeam - 42) : yBeam - 42}
                textAnchor="middle"
                className="fill-muted-foreground text-[12px] font-bold select-none"
              >
                {l.label}
              </text>
            </g>
          );
        }

        const isUp = l.isUpward;
        const ty = isUp ? yBeam + 6 : yBeam - 30;

        return (
          <g key={l.id} opacity={0.85}>
            <BeamLoads
              el={{
                id: `equiv-${l.id}`,
                type: 'point-load',
                x: 0,
                y: 0,
                w: 24,
                h: 24,
                enterAt: 1,
                pointLoadDirection: isUp ? 'up' : 'down',
              }}
              stroke="var(--accent, #f97316)"
              fill="none"
              sw={1.2}
              transform={`translate(${px - 12}, ${ty})`}
              strokeDasharray="3,1.5"
            />
            <circle cx={px} cy={yBeam} r={2} fill="var(--accent, #f97316)" />
            <text
              x={px}
              y={isUp ? yBeam + 46 : yBeam - 42}
              textAnchor="middle"
              className="fill-accent text-[11px] font-bold select-none"
            >
              {l.label}
            </text>
          </g>
        );
      })}
    </>
  );
};
