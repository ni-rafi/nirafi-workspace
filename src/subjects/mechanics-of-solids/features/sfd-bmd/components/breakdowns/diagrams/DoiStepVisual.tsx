import React, { useContext } from 'react';
import { BeamWorkspaceContext } from '@/subjects/mechanics-of-solids/features/sfd-bmd/context/BeamWorkspaceContext';
import { InfluenceLinesWorkspaceContext } from '@/subjects/structural-analysis/features/influence-lines/context/InfluenceLinesWorkspaceContext';
import { MiniBeamVisual } from './MiniBeamVisual';

interface DoiStepVisualProps {
  text: string;
}

export const DoiStepVisual: React.FC<DoiStepVisualProps> = ({ text }) => {
  const beamCtx = useContext(BeamWorkspaceContext);
  const influenceCtx = useContext(InfluenceLinesWorkspaceContext);

  const supports = beamCtx ? beamCtx.supports : (influenceCtx ? influenceCtx.supports : []);
  const releases = beamCtx ? beamCtx.releases : (influenceCtx ? influenceCtx.releases : []);

  // 1. Identify which support or release is being targeted by parsing coordinate (e.g. "x = 4" or "x = 4.00")
  let targetPosition: number | null = null;
  const posMatch = text.match(/x\s*=\s*([\d.]+)/);
  if (posMatch && posMatch[1]) {
    targetPosition = parseFloat(posMatch[1]);
  }

  // 2. Identify step type
  const isSupportStep = text.toLowerCase().includes('support');
  const isInternalStep = text.toLowerCase().includes('internal');
  const isTotalReactionsStep = text.toLowerCase().includes('total unknown support reactions');
  const isTotalConditionsStep = text.toLowerCase().includes('total equations of condition');
  const isFormulaStep = text.includes('DOI =') || text.includes('r - 3 - c');
  const isConclusionStep = text.includes('determinate') || text.includes('indeterminate') || text.includes('unstable') || text.includes('equations of equilibrium');

  // Highlight matching support
  let highlightedSupportId: string | null = null;
  if (isSupportStep && targetPosition !== null) {
    const s = supports.find(sup => Math.abs(sup.position - targetPosition!) < 0.05);
    if (s) highlightedSupportId = s.id;
  }

  // Highlight matching release
  let highlightedReleaseId: string | null = null;
  if (isInternalStep && targetPosition !== null) {
    const r = releases.find(rel => Math.abs(rel.position - targetPosition!) < 0.05);
    if (r) highlightedReleaseId = r.id;
  }

  const showSupportReactions = (_sId: string, sPosition: number) => {
    if (isTotalReactionsStep || isFormulaStep || isConclusionStep) return true;
    if (isSupportStep && targetPosition !== null && Math.abs(sPosition - targetPosition) < 0.05) return true;
    return false;
  };

  const showReleaseHighlights = (rPosition: number) => {
    if (isTotalConditionsStep || isFormulaStep || isConclusionStep) return true;
    if (isInternalStep && targetPosition !== null && Math.abs(rPosition - targetPosition) < 0.05) return true;
    return false;
  };

  const showEquilibriumEquations = isConclusionStep || text.toLowerCase().includes('equilibrium');

  const handleRenderOverlay = (toPixel: (x: number) => number) => {
    const yBeam = 70; // matches MiniBeamVisual base line coordinate
    return (
      <g>
        {/* Support reaction badges & arrows */}
        {supports.map(s => {
          const px = toPixel(s.position);
          const showArrows = showSupportReactions(s.id, s.position);
          const isHighlighted = highlightedSupportId === s.id;

          let rxCount = 0;
          if (s.type === 'roller') rxCount = 1;
          else if (s.type === 'hinge') rxCount = 2;
          else if (s.type === 'fixed') rxCount = 3;

          return (
            <g key={s.id}>
              {/* Count badge */}
              {isHighlighted && !isFormulaStep && !isConclusionStep && (
                <g transform={`translate(${px}, ${yBeam + 22})`}>
                  <rect x={-10} y={0} width={20} height={8} rx={1.5} className="fill-primary/10 stroke-primary/30" strokeWidth={0.5} />
                  <text x={0} y={6} textAnchor="middle" className="fill-primary text-[5px] font-extrabold">
                    r = {rxCount}
                  </text>
                </g>
              )}

              {/* Reaction Force Vector Arrows */}
              {showArrows && (
                <g>
                  {/* Vertical Reaction Arrow Ry */}
                  <line x1={px} y1={yBeam + 35} x2={px} y2={yBeam + 12} stroke="var(--success, #10b981)" strokeWidth={1.2} strokeLinecap="round" />
                  <polygon points={`${px},${yBeam + 12} ${px - 2.5},${yBeam + 15.5} ${px + 2.5},${yBeam + 15.5}`} fill="var(--success, #10b981)" />

                  {/* Horizontal Reaction Arrow Rx */}
                  {(s.type === 'hinge' || s.type === 'fixed') && (
                    <g>
                      <line x1={px - 18} y1={yBeam} x2={px - 5} y2={yBeam} stroke="var(--success, #10b981)" strokeWidth={1.2} strokeLinecap="round" />
                      <polygon points={`${px - 5},${yBeam} ${px - 8.5},${yBeam - 2.5} ${px - 8.5},${yBeam + 2.5}`} fill="var(--success, #10b981)" />
                    </g>
                  )}

                  {/* Moment Reaction Arrow M */}
                  {s.type === 'fixed' && (
                    <g>
                      <path d={`M ${px - 10} ${yBeam - 15} A 10 10 0 0 1 ${px + 10} ${yBeam - 15}`} fill="none" stroke="var(--success, #10b981)" strokeWidth={1.2} strokeLinecap="round" />
                      <polygon points={`${px + 10},${yBeam - 15} ${px + 7.5},${yBeam - 18.5} ${px + 7.5},${yBeam - 11.5}`} fill="var(--success, #10b981)" />
                    </g>
                  )}
                </g>
              )}
            </g>
          );
        })}

        {/* Releases highlight glow & count badge */}
        {releases.map((r, i) => {
          const px = toPixel(r.position);
          const active = showReleaseHighlights(r.position);
          const condCount = r.type === 'hinge' ? 1 : 2;

          return (
            <g key={`rel-${i}`}>
              {active && (
                <circle cx={px} cy={yBeam} r={10} fill="none" stroke="var(--destructive)" strokeWidth={0.5} strokeDasharray="1.5,1.5" />
              )}
              {active && !isFormulaStep && !isConclusionStep && (
                <g transform={`translate(${px}, ${yBeam - 22})`}>
                  <rect x={-10} y={-8} width={20} height={8} rx={1.5} className="fill-destructive/10 stroke-destructive/30" strokeWidth={0.5} />
                  <text x={0} y={-2} textAnchor="middle" className="fill-destructive text-[5px] font-extrabold">
                    c = {condCount}
                  </text>
                </g>
              )}
            </g>
          );
        })}

        {/* Equilibrium Equations Graphic overlay */}
        {showEquilibriumEquations && (
          <g transform={`translate(${400 - 45}, 125)`}>
            <rect x={0} y={0} width={90} height={14} rx={3} className="fill-primary/10 stroke-primary/30" strokeWidth={0.6} />
            <text x={45} y={9} textAnchor="middle" className="fill-primary text-[7px] font-extrabold uppercase tracking-wider">
              ΣFx = 0, ΣFy = 0, ΣM = 0
            </text>
          </g>
        )}
      </g>
    );
  };

  return (
    <MiniBeamVisual
      highlightedSupportId={highlightedSupportId}
      highlightedReleaseId={highlightedReleaseId}
      onRenderOverlay={handleRenderOverlay}
    />
  );
};
