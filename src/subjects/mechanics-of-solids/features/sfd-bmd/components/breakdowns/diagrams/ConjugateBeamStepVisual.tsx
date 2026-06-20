import React from 'react';
import { useBeamWorkspace } from '@/subjects/mechanics-of-solids/features/sfd-bmd/context/BeamWorkspaceContext';
import { useBeamEngine } from '../../../hooks/useBeamEngine';
import { IConjugateReaction } from '@/subjects/mechanics-of-solids/cores/deflection/types';

interface ConjugateBeamStepVisualProps {
  text: string;
}

export const ConjugateBeamStepVisual: React.FC<ConjugateBeamStepVisualProps> = ({ text }) => {
  const { length, supports, releases } = useBeamWorkspace();
  const { solverResult, deflectionResult } = useBeamEngine();
  const conjugateBeam = deflectionResult.conjugateBeam;

  const width = 320;
  const paddingX = 20;
  const beamW = width - paddingX * 2;

  const toPixelX = (x: number) => paddingX + (x / length) * beamW;

  if (!conjugateBeam) return null;

  const isTransformStep = text.includes('transform') || text.includes('becomes') || text.includes('remains') || text.includes('Step 1');
  const isReactionStep = text.includes('reaction') || text.includes('reactions') || text.includes('Step 2');
  const isShearMomentStep = text.includes('Step 3') || text.includes('shear and moment') || text.includes('represents');

  // Support renderer helper
  const renderSupportGraphic = (px: number, type: string, yBeamPos: number, isHighlighted: boolean) => {
    const color = isHighlighted ? 'stroke-primary fill-primary/10' : 'stroke-foreground fill-none';
    const strokeW = isHighlighted ? 2 : 1.2;

    switch (type) {
      case 'Fixed Support':
        return (
          <g>
            <line
              x1={px}
              y1={yBeamPos - 10}
              x2={px}
              y2={yBeamPos + 10}
              className={isHighlighted ? 'stroke-primary stroke-[2.5]' : 'stroke-foreground stroke-1.8'}
            />
            {px < width / 2 ? (
              // Left wall hashes
              Array.from({ length: 5 }).map((_, i) => (
                <line
                  key={i}
                  x1={px}
                  y1={yBeamPos - 8 + i * 4}
                  x2={px - 4}
                  y2={yBeamPos - 12 + i * 4}
                  className={isHighlighted ? 'stroke-primary stroke-0.8' : 'stroke-muted-foreground stroke-0.6'}
                />
              ))
            ) : (
              // Right wall hashes
              Array.from({ length: 5 }).map((_, i) => (
                <line
                  key={i}
                  x1={px}
                  y1={yBeamPos - 8 + i * 4}
                  x2={px + 4}
                  y2={yBeamPos - 12 + i * 4}
                  className={isHighlighted ? 'stroke-primary stroke-0.8' : 'stroke-muted-foreground stroke-0.6'}
                />
              ))
            )}
          </g>
        );
      case 'Hinged Support':
      case 'Roller Support':
      case 'Internal Roller':
      case 'Internal Support':
      case 'Roller Support on the conjugate beam':
      case 'Hinged/Roller support':
        if (type.includes('Roller') || type.includes('roller')) {
          return (
            <g>
              <circle
                cx={px}
                cy={yBeamPos + 4}
                r={3}
                className={color}
                strokeWidth={strokeW}
              />
              <line
                x1={px - 6}
                y1={yBeamPos + 8}
                x2={px + 6}
                y2={yBeamPos + 8}
                className={isHighlighted ? 'stroke-primary stroke-1.2' : 'stroke-foreground stroke-0.8'}
              />
            </g>
          );
        } else {
          return (
            <polygon
              points={`${px},${yBeamPos} ${px - 5},${yBeamPos + 8} ${px + 5},${yBeamPos + 8}`}
              className={color}
              strokeWidth={strokeW}
            />
          );
        }
      case 'Internal Hinge':
        return (
          <circle
            cx={px}
            cy={yBeamPos}
            r={3.5}
            className="fill-background stroke-destructive stroke-[1.5]"
          />
        );
      default:
        return null;
    }
  };

  const getReactionPosition = (rx: IConjugateReaction): number => {
    if (rx.supportId === 'conj-left-force' || rx.supportId === 'conj-left-moment') return 0;
    if (rx.supportId === 'conj-right-force' || rx.supportId === 'conj-right-moment') return length;
    if (rx.supportId.startsWith('conj-internal-')) {
      const idx = parseInt(rx.supportId.replace('conj-internal-', ''), 10);
      return releases[idx]?.position ?? 0;
    }
    const realSupport = supports.find(s => s.id === rx.supportId);
    return realSupport ? realSupport.position : 0;
  };

  if (isTransformStep) {
    const yBeamReal = 22;
    const yBeamConj = 62;
    const heightTrans = 92;

    // Parse highlight position
    let highlightPos: number | null = null;
    const posMatch = text.match(/at \$x = ([\d.]+)\$/) || text.match(/x\s*=\s*([\d.]+)/);
    if (posMatch && posMatch[1]) {
      highlightPos = parseFloat(posMatch[1]);
    }

    return (
      <div className="mt-2.5 mb-1.5 overflow-hidden rounded-lg border border-border/30 bg-muted/5 p-2 max-w-sm">
        <svg viewBox={`0 0 ${width} ${heightTrans}`} className="w-full select-none overflow-visible">
          {/* Real Beam Title */}
          <text x={paddingX} y={12} className="fill-muted-foreground text-[7.5px] font-bold">REAL BEAM</text>
          <rect x={paddingX} y={yBeamReal - 3} width={beamW} height={6} rx={1.5} className="fill-muted/40 stroke-border" strokeWidth={0.8} />
          {supports.map(s => (
            <g key={`real-${s.id}`}>
              {renderSupportGraphic(
                toPixelX(s.position),
                s.type === 'fixed' ? 'Fixed Support' : s.type === 'hinge' ? 'Hinged Support' : 'Roller Support',
                yBeamReal,
                highlightPos !== null && Math.abs(s.position - highlightPos) < 0.05
              )}
            </g>
          ))}
          {releases.map((r, i) => (
            <circle
              key={`real-rel-${i}`}
              cx={toPixelX(r.position)}
              cy={yBeamReal}
              r={2.5}
              className="fill-background stroke-destructive stroke-1"
            />
          ))}

          {/* Connection Arrows between beams at support points */}
          {highlightPos !== null && (
            <g opacity={0.6}>
              <line
                x1={toPixelX(highlightPos)}
                y1={yBeamReal + 8}
                x2={toPixelX(highlightPos)}
                y2={yBeamConj - 8}
                stroke="var(--primary)"
                strokeWidth={1}
                strokeDasharray="2,2"
              />
              <polygon
                points={`${toPixelX(highlightPos)},${yBeamConj - 5} ${toPixelX(highlightPos) - 2.5},${yBeamConj - 9} ${toPixelX(highlightPos) + 2.5},${yBeamConj - 9}`}
                fill="var(--primary)"
              />
            </g>
          )}

          {/* Conjugate Beam Title */}
          <text x={paddingX} y={52} className="fill-muted-foreground text-[7.5px] font-bold">CONJUGATE BEAM</text>
          <rect x={paddingX} y={yBeamConj - 3} width={beamW} height={6} rx={1.5} className="fill-muted/75 stroke-border" strokeWidth={0.8} />
          {conjugateBeam.supports.map((s, i) => (
            <g key={`conj-${i}`}>
              {renderSupportGraphic(
                toPixelX(s.position),
                s.type,
                yBeamConj,
                highlightPos !== null && Math.abs(s.position - highlightPos) < 0.05
              )}
            </g>
          ))}
        </svg>
      </div>
    );
  }

  if (isReactionStep) {
    const yBeam = 35;
    const heightReac = 75;

    return (
      <div className="mt-2.5 mb-1.5 overflow-hidden rounded-lg border border-border/30 bg-muted/5 p-2 max-w-sm">
        <svg viewBox={`0 0 ${width} ${heightReac}`} className="w-full select-none overflow-visible">
          <text x={paddingX} y={12} className="fill-muted-foreground text-[7.5px] font-bold">CONJUGATE BEAM REACTIONS</text>
          <rect x={paddingX} y={yBeam - 3} width={beamW} height={6} rx={1.5} className="fill-muted/70 stroke-border" strokeWidth={0.8} />

          {/* Conjugate Supports */}
          {conjugateBeam.supports.map((s, i) => (
            <g key={`conj-supp-${i}`}>
              {renderSupportGraphic(toPixelX(s.position), s.type, yBeam, false)}
            </g>
          ))}

          {/* Conjugate Reaction Arrows */}
          {conjugateBeam.reactions.map((rx, i) => {
            const rxPx = toPixelX(getReactionPosition(rx));
            const isMoment = rx.type === 'M';

            if (isMoment) {
              const isCw = rx.value > 0;
              return (
                <g key={`rx-${i}`}>
                  <path
                    d={isCw
                      ? `M ${rxPx - 8} ${yBeam - 6} A 10 10 0 1 1 ${rxPx - 8} ${yBeam + 6}`
                      : `M ${rxPx + 8} ${yBeam - 6} A 10 10 0 1 0 ${rxPx + 8} ${yBeam + 6}`
                    }
                    fill="none"
                    stroke="var(--success, #10b981)"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                  />
                  <polygon
                    points={isCw
                      ? `${rxPx - 8},${yBeam + 6} ${rxPx - 11},${yBeam + 2} ${rxPx - 5},${yBeam + 3}`
                      : `${rxPx + 8},${yBeam + 6} ${rxPx + 5},${yBeam + 2} ${rxPx + 11},${yBeam + 3}`
                    }
                    fill="var(--success, #10b981)"
                  />
                  <text
                    x={rxPx}
                    y={yBeam - 16}
                    textAnchor="middle"
                    className="fill-success text-[7.5px] font-bold"
                  >
                    {Math.abs(rx.value).toFixed(4)}m
                  </text>
                </g>
              );
            } else {
              const isUp = rx.value > 0;
              return (
                <g key={`rx-${i}`}>
                  <line
                    x1={rxPx}
                    y1={isUp ? yBeam + 22 : yBeam - 22}
                    x2={rxPx}
                    y2={isUp ? yBeam + 5 : yBeam - 5}
                    stroke="var(--success, #10b981)"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                  />
                  <polygon
                    points={isUp
                      ? `${rxPx},${yBeam + 5} ${rxPx - 2.5},${yBeam + 9} ${rxPx + 2.5},${yBeam + 9}`
                      : `${rxPx},${yBeam - 5} ${rxPx - 2.5},${yBeam - 9} ${rxPx + 2.5},${yBeam - 9}`
                    }
                    fill="var(--success, #10b981)"
                  />
                  <text
                    x={rxPx + 5}
                    y={isUp ? yBeam + 18 : yBeam - 14}
                    textAnchor="start"
                    className="fill-success text-[7.5px] font-bold"
                  >
                    {Math.abs(rx.value).toFixed(4)} rad
                  </text>
                </g>
              );
            }
          })}
        </svg>
      </div>
    );
  }

  if (isShearMomentStep) {
    const yBeam = 45;
    const heightSM = 90;

    // We can show the loading representing the M/EI diagram
    // Get moment diagram from solverResult
    const yBaseline = 45;
    const getMAt = (x: number): number => {
      if (!solverResult.success || !solverResult.intervals) return 0;
      const interval = solverResult.intervals.find(
        inv => x >= inv.startX - 1e-4 && x <= inv.endX + 1e-4
      );
      if (!interval) return 0;
      const [a, b, c, d] = interval.mCoeffs;
      return (a * x * x * x + b * x * x + c * x + d) / 20.0;
    };

    let maxM = 1;
    const points: { x: number; m: number }[] = [];
    const numSteps = 50;
    for (let i = 0; i <= numSteps; i++) {
      const x = (i / numSteps) * length;
      const m = getMAt(x);
      points.push({ x, m });
      if (Math.abs(m) > maxM) maxM = Math.abs(m);
    }

    const scaleY = (m: number) => yBaseline + (m / maxM) * 22;

    let pathD = `M ${toPixelX(0)} ${yBaseline}`;
    points.forEach(pt => {
      pathD += ` L ${toPixelX(pt.x)} ${scaleY(pt.m)}`;
    });
    pathD += ` L ${toPixelX(length)} ${yBaseline} Z`;

    return (
      <div className="mt-2.5 mb-1.5 overflow-hidden rounded-lg border border-border/30 bg-muted/5 p-2 max-w-sm">
        <svg viewBox={`0 0 ${width} ${heightSM}`} className="w-full select-none overflow-visible">
          <text x={paddingX} y={12} className="fill-muted-foreground text-[7.5px] font-bold">M/EI LOAD ON CONJUGATE BEAM</text>

          {/* Shaded M/EI Load Profile */}
          <path d={pathD} fill="rgba(59, 130, 246, 0.15)" stroke="var(--primary)" strokeWidth={1} />

          {/* Small Load Arrows inside the profile */}
          {Array.from({ length: 9 }).map((_, i) => {
            const x = (i / 8) * length;
            const px = toPixelX(x);
            const m = getMAt(x);
            if (Math.abs(m) < 0.1) return null;
            const py = scaleY(m);
            const isUp = m < 0;

            return (
              <g key={i} opacity={0.6}>
                <line
                  x1={px}
                  y1={yBaseline}
                  x2={px}
                  y2={py}
                  stroke="var(--primary)"
                  strokeWidth={0.8}
                />
                <polygon
                  points={isUp
                    ? `${px},${yBaseline} ${px - 1.5},${yBaseline - 3} ${px + 1.5},${yBaseline - 3}`
                    : `${px},${yBaseline} ${px - 1.5},${yBaseline + 3} ${px + 1.5},${yBaseline + 3}`
                  }
                  fill="var(--primary)"
                />
              </g>
            );
          })}

          {/* Conjugate Beam member */}
          <rect x={paddingX} y={yBeam - 3} width={beamW} height={6} rx={1.5} className="fill-muted/80 stroke-border" strokeWidth={0.8} />

          {/* Conjugate Supports */}
          {conjugateBeam.supports.map((s, i) => (
            <g key={`conj-supp-${i}`}>
              {renderSupportGraphic(toPixelX(s.position), s.type, yBeam, false)}
            </g>
          ))}
        </svg>
      </div>
    );
  }

  // Fallback
  return (
    <div className="mt-2.5 mb-1.5 overflow-hidden rounded-lg border border-border/30 bg-muted/5 p-2 max-w-sm">
      <svg viewBox={`0 0 ${width} 50`} className="w-full select-none overflow-visible">
        <rect x={paddingX} y={22} width={beamW} height={6} rx={1.5} className="fill-muted stroke-border" strokeWidth={0.8} />
      </svg>
    </div>
  );
};
