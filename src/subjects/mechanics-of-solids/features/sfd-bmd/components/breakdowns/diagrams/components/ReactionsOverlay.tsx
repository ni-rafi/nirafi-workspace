import React from 'react';
import { BeamLoads } from '@/features/presentation/components/elements';
import { IActiveReactionVisual, IActiveLoadVisual } from '../helpers/reactionsLoadHelper';
import { formatNumber } from '../helpers/sectionLoadsFormatter';

interface ReactionsOverlayProps {
  pivotPos: number | null;
  yBeam: number;
  activeReactions: IActiveReactionVisual[];
  activeLoadVisuals: IActiveLoadVisual[];
  dimTargets: { x: number; label: string }[];
  reactions: Array<{ supportId: string; type: string; value: number }>;
  toPixel: (x: number) => number;
}

export const ReactionsOverlay: React.FC<ReactionsOverlayProps> = ({
  pivotPos,
  yBeam,
  activeReactions,
  activeLoadVisuals,
  dimTargets,
  reactions,
  toPixel,
}) => {
  return (
    <g>
      {/* Render Pivot indicator */}
      {pivotPos !== null && (() => {
        const px = toPixel(pivotPos!);
        return (
          <g>
            <circle cx={px} cy={yBeam} r={10} fill="none" stroke="var(--primary)" strokeWidth={1.5} className="animate-pulse" />
            <circle cx={px} cy={yBeam} r={3} fill="var(--primary)" />
            <path
              d={`M ${px - 12} ${yBeam - 12} A 16 16 0 0 1 ${px + 12} ${yBeam - 12}`}
              fill="none"
              stroke="var(--primary)"
              strokeWidth={1.2}
              strokeDasharray="1.5,1.5"
            />
            <text x={px} y={yBeam - 18} textAnchor="middle" className="fill-primary text-[12px] font-bold select-none">
              Pivot
            </text>
          </g>
        );
      })()}

      {/* Draw active support reaction arrows */}
      {activeReactions.map(r => {
        const px = toPixel(r.position);
        if (r.isPivot) return null;

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

      {/* Draw equivalent loads and value labels */}
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

        // For distributed loads, draw equivalent force vector at centroid
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

      {/* Stacked moment arms dimension lines */}
      {pivotPos !== null && dimTargets.map((dt, idx) => {
        const startPx = toPixel(pivotPos!);
        const endPx = toPixel(dt.x);
        const yDim = yBeam - 54 - idx * 12;

        return (
          <g key={`dim-${idx}`}>
            <line
              x1={startPx}
              y1={yDim}
              x2={endPx}
              y2={yDim}
              stroke="var(--primary)"
              strokeWidth={0.8}
              strokeDasharray="2,2"
              opacity={0.8}
            />
            <line x1={startPx} y1={yDim - 3} x2={startPx} y2={yDim + 3} stroke="var(--primary)" strokeWidth={0.8} opacity={0.8} />
            <line x1={endPx} y1={yDim - 3} x2={endPx} y2={yDim + 3} stroke="var(--primary)" strokeWidth={0.8} opacity={0.8} />

            <rect
              x={Math.min(startPx, endPx) + Math.abs(startPx - endPx) / 2 - 14}
              y={yDim - 5}
              width={28}
              height={10}
              fill="var(--background)"
              rx={1.5}
              opacity={0.85}
            />
            <text
              x={(startPx + endPx) / 2}
              y={yDim + 3}
              textAnchor="middle"
              className="fill-primary text-[11px] font-bold select-none"
            >
              {dt.label}
            </text>
          </g>
        );
      })}
    </g>
  );
};
