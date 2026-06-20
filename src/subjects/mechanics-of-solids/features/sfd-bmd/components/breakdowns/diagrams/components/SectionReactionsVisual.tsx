import React from 'react';
import { BeamLoads } from '@/features/presentation/components/elements';
import { IActiveReactionVisual } from '../sectionLoadHelper';
import { formatNumber } from '../helpers/sectionLoadsFormatter';

interface SectionReactionsVisualProps {
  activeReactions: IActiveReactionVisual[];
  reactions: Array<{ supportId: string; type: string; value: number }>;
  toPixel: (x: number) => number;
  yBeam: number;
}

export const SectionReactionsVisual: React.FC<SectionReactionsVisualProps> = ({
  activeReactions,
  reactions,
  toPixel,
  yBeam,
}) => {
  return (
    <>
      {activeReactions.map(r => {
        const px = toPixel(r.position);
        const rxnValue = reactions.find(rxn => rxn.supportId === r.supportId && rxn.type === 'R_y')?.value ?? 0;

        return (
          <g key={r.supportId}>
            <BeamLoads
              el={{
                id: `rxn-${r.supportId}`,
                type: 'point-load',
                x: 0,
                y: 0,
                w: 24,
                h: 24,
                enterAt: 1,
                pointLoadDirection: rxnValue >= 0 ? 'up' : 'down',
              }}
              stroke="var(--success, #10b981)"
              fill="none"
              sw={1.8}
              transform={`translate(${px - 12}, ${yBeam + 48})`}
            />
            <text x={px} y={yBeam + 83} textAnchor="middle" className="fill-success text-[12px] font-bold select-none">
              R<tspan fontSize="75%" baselineShift="sub">y{r.letter}</tspan> = {formatNumber(rxnValue)} kN
            </text>
          </g>
        );
      })}
    </>
  );
};
