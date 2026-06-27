import React from 'react';
import { ISupport } from '@/subjects/mechanics-of-solids/cores/sfd-bmd/types';
import { BeamLoads } from '@/features/presentation/components/elements';

interface ReactionsVisualProps {
  customReactions: Array<{ supportId: string; type: 'R_y' | 'M' | 'R_x'; value: number }>;
  activeSupports: ISupport[];
  toPixel: (pos: number) => number;
  yBeam: number;
  supportIdToLetter: Map<string, string>;
  getOpacity: (x: number) => number;
}

export const ReactionsVisual: React.FC<ReactionsVisualProps> = ({
  customReactions,
  activeSupports,
  toPixel,
  yBeam,
  supportIdToLetter,
  getOpacity,
}) => {
  return (
    <>
      {customReactions.map((rxn, idx) => {
        const s = activeSupports.find(sup => sup.id === rxn.supportId);
        if (!s) return null;
        const px = toPixel(s.position);
        const opacity = getOpacity(s.position);

        const letter = supportIdToLetter.get(s.id) || '';

        if (rxn.type === 'R_y') {
          const isUp = rxn.value > 0;

          return (
            <g key={`rxn-ry-${idx}`} opacity={opacity}>
              <BeamLoads
                el={{
                  id: `rxn-ry-${idx}`,
                  type: 'point-load',
                  x: 0,
                  y: 0,
                  w: 24,
                  h: 25,
                  enterAt: 1,
                  pointLoadDirection: isUp ? 'up' : 'down',
                }}
                stroke="var(--success, #10b981)"
                fill="none"
                sw={1.8}
                transform={`translate(${px - 12}, ${yBeam + 20})`}
              />
               <text
                x={px + 16}
                y={yBeam + 36}
                className="fill-success text-[12px] font-bold"
              >
                R<tspan fontSize="75%" baselineShift="sub">y{letter}</tspan>
              </text>
            </g>
          );
        }

        if (rxn.type === 'M') {
          const cw = rxn.value > 0;

          return (
            <g key={`rxn-m-${idx}`} opacity={opacity}>
              <BeamLoads
                el={{
                  id: `rxn-m-${idx}`,
                  type: 'moment',
                  x: 0,
                  y: 0,
                  w: 32,
                  h: 32,
                  enterAt: 1,
                  momentDirection: cw ? 'cw' : 'ccw',
                }}
                stroke="var(--success, #10b981)"
                fill="none"
                sw={1.8}
                transform={`translate(${px - 16}, ${yBeam - 16})`}
              />
              <text
                x={px}
                y={yBeam - 26}
                textAnchor="middle"
                className="fill-success text-[12px] font-bold"
              >
                M<tspan fontSize="75%" baselineShift="sub">{letter}</tspan>
              </text>
            </g>
          );
        }

        return null;
      })}
    </>
  );
};
