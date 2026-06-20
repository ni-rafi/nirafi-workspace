import React, { useContext } from 'react';
import { BeamWorkspaceContext } from '@/subjects/mechanics-of-solids/features/sfd-bmd/context/BeamWorkspaceContext';
import { BeamSupports, BeamLoads } from '@/features/presentation/components/elements';
import { VisualCanvasShape } from '@/features/presentation/types/schema';
import { ISupport, IInternalRelease, ILoad } from '@/subjects/mechanics-of-solids/cores/sfd-bmd/types';


interface MiniBeamVisualProps {
  width?: number;
  height?: number;
  paddingX?: number;
  yBeam?: number;
  highlightedSupportId?: string | null;
  highlightedLoadId?: string | null;
  highlightedReleaseId?: string | null;
  opacityRightOfX?: number | null;
  opacitySide?: 'left' | 'right';
  customSupportType?: Record<string, 'roller' | 'hinge' | 'fixed' | 'free' | 'internal-roller' | 'internal-hinge'>;
  customReactions?: Array<{ supportId: string; type: 'R_y' | 'M' | 'R_x'; value: number }>;
  showSupportLetters?: boolean;
  customSupports?: ISupport[];
  customReleases?: IInternalRelease[];
  customLoads?: ILoad[];
  onRenderOverlay?: (toPixel: (x: number) => number) => React.ReactNode;
}

export const MiniBeamVisual: React.FC<MiniBeamVisualProps> = ({
  width = 800,
  height = 145,
  paddingX = 60,
  yBeam = 70,
  highlightedSupportId = null,
  highlightedLoadId = null,
  highlightedReleaseId = null,
  opacityRightOfX = null,
  opacitySide = 'right',
  customSupportType = undefined,
  customReactions = undefined,
  showSupportLetters = true,
  customSupports = undefined,
  customReleases = undefined,
  customLoads = undefined,
  onRenderOverlay = undefined,
}) => {
  const beamCtx = useContext(BeamWorkspaceContext);
  if (!beamCtx) return null;

  const { length, supports, releases, loads, eiSegments } = beamCtx;
  const activeSupports = customSupports !== undefined ? customSupports : supports;
  const activeReleases = customReleases !== undefined ? customReleases : releases;
  const activeLoads = customLoads !== undefined ? customLoads : loads;

  const beamW = width - paddingX * 2;
  const toPixel = (pos: number) => paddingX + (pos / length) * beamW;

  const getOpacity = (x: number) => {
    if (opacityRightOfX !== null) {
      if (opacitySide === 'left') {
        return x < opacityRightOfX - 1e-5 ? 0.2 : 1.0;
      } else {
        return x > opacityRightOfX + 1e-5 ? 0.2 : 1.0;
      }
    }
    return 1.0;
  };

  // Sort supports and map letters A, B, C...
  const sortedSupports = [...activeSupports].sort((a, b) => a.position - b.position);
  const supportIdToLetter = new Map<string, string>();
  sortedSupports.forEach((s, idx) => {
    supportIdToLetter.set(s.id, String.fromCharCode(65 + idx));
  });

  return (
    <div className="mt-3 mb-2 overflow-hidden rounded-lg border border-border/30 bg-muted/5 p-4 w-full max-w-4xl mx-auto shadow-sm">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full select-none overflow-visible">
        {/* Render Segmented Beam member */}
        {eiSegments.map((seg, idx) => {
          const sPx = toPixel(seg.startPosition);
          const ePx = toPixel(seg.endPosition);
          const segW = ePx - sPx;
          const EI = seg.E * seg.I;
          const scaleH = Math.max(10, Math.min(26, 10 + (EI / 100000) * 12));

          // Compute opacity if we have a cut coordinate
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

        {/* Render Custom Overlay (before elements) */}
        {onRenderOverlay && onRenderOverlay(toPixel)}

        {/* Render Supports */}
        {activeSupports.map(s => {
          const px = toPixel(s.position);
          const isHighlighted = highlightedSupportId === s.id;
          const opacity = getOpacity(s.position);

          const sType = customSupportType && customSupportType[s.id]
            ? customSupportType[s.id]!
            : s.type;

          if (sType === 'free') return null;

          const shape: VisualCanvasShape = {
            id: s.id,
            type: sType === 'fixed' ? 'support-fixed' : sType === 'hinge' ? 'support-pin' : 'support-roller',
            x: 0,
            y: 0,
            w: 32,
            h: 32,
            enterAt: 1,
          };

          let tx = `translate(${px - 16}, ${yBeam + 4})`;
          if (sType === 'fixed') {
            tx = s.position < length / 2
              ? `translate(${px - 10}, ${yBeam - 16})`
              : `translate(${px + 10}, ${yBeam - 16}) scale(-1, 1)`;
          }

          const letter = supportIdToLetter.get(s.id) || '';
          const labelY = sType === 'fixed' ? yBeam - 18 : yBeam + 40;

          return (
            <g key={s.id} opacity={opacity}>
              <BeamSupports
                el={shape}
                stroke={isHighlighted ? 'var(--primary)' : 'var(--foreground)'}
                fill={isHighlighted ? 'var(--primary-hover)' : 'var(--muted)'}
                sw={isHighlighted ? 1.8 : 1.2}
                transform={tx}
              />
              <circle cx={px} cy={yBeam} r={4} className={isHighlighted ? 'fill-primary' : 'fill-muted-foreground'} />
              
              {showSupportLetters && (
                <text
                  x={px}
                  y={labelY}
                  textAnchor="middle"
                  className={`text-[13px] font-extrabold select-none ${isHighlighted ? 'fill-primary font-black' : 'fill-muted-foreground'}`}
                >
                  {letter}
                </text>
              )}
            </g>
          );
        })}

        {/* Render Internal Releases */}
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

        {/* Render Applied Loads */}
        {activeLoads.map(l => {
          const isHighlighted = highlightedLoadId === l.id;
          const opacity = getOpacity(l.position ?? l.startPosition ?? 0);

          let px = 0;
          let w = 32;
          let h = 32;
          let align: 'above' | 'below' = 'above';

          if (l.type === 'point' && l.position !== undefined) {
            px = toPixel(l.position);
            const isUp = (l.magnitude ?? 0) < 0;
            align = isUp ? 'below' : 'above';
          } else if (l.type === 'moment' && l.position !== undefined) {
            px = toPixel(l.position);
            align = 'above';
          } else if ((l.type === 'udl' || l.type === 'uvl') && l.startPosition !== undefined && l.endPosition !== undefined) {
            const startPx = toPixel(l.startPosition);
            const endPx = toPixel(l.endPosition);
            px = startPx;
            w = endPx - startPx;
            const isUp = l.type === 'udl' ? (l.magnitude ?? 0) < 0 : (l.startMagnitude ?? 0) < 0;
            align = isUp ? 'below' : 'above';
          }

          const shape: VisualCanvasShape = {
            id: l.id,
            type: l.type === 'point' ? 'point-load' : l.type === 'udl' ? 'udl' : l.type === 'uvl' ? 'uvl' : 'moment',
            x: 0,
            y: 0,
            w,
            h,
            enterAt: 1,
            pointLoadDirection: l.type === 'point' ? ((l.magnitude ?? 0) < 0 ? 'up' : 'down') : undefined,
            momentDirection: l.type === 'moment' ? ((l.magnitude ?? 0) < 0 ? 'ccw' : 'cw') : undefined,
            uvlStartHeight: l.type === 'uvl' ? (l.startMagnitude || 0) / Math.max(1, Math.abs(l.startMagnitude || 0) + Math.abs(l.endMagnitude || 0)) : undefined,
            uvlEndHeight: l.type === 'uvl' ? (l.endMagnitude || 0) / Math.max(1, Math.abs(l.startMagnitude || 0) + Math.abs(l.endMagnitude || 0)) : undefined,
          };

          let tx = `translate(${px - w / 2}, ${yBeam - h - 5})`;
          if (l.type === 'udl' || l.type === 'uvl') {
            tx = `translate(${px}, ${align === 'above' ? yBeam - h - 5 : yBeam + 5})`;
          } else if (align === 'below') {
            tx = `translate(${px - w / 2}, ${yBeam + 5})`;
          }

          const loadColor = isHighlighted ? 'var(--primary)' : 'var(--muted-foreground)';

          return (
            <g key={l.id} opacity={opacity}>
              <BeamLoads
                el={shape}
                stroke={loadColor}
                fill={isHighlighted ? 'rgba(59,130,246,0.1)' : 'rgba(0,0,0,0.05)'}
                sw={isHighlighted ? 1.8 : 1.2}
                transform={tx}
              />
            </g>
          );
        })}

        {/* Render reaction vectors if solver output is supplied */}
        {customReactions && customReactions.map((rxn, idx) => {
          const s = activeSupports.find(sup => sup.id === rxn.supportId);
          if (!s) return null;
          const px = toPixel(s.position);
          const opacity = getOpacity(s.position);

          const letter = supportIdToLetter.get(s.id) || '';

          if (rxn.type === 'R_y') {
            const isUp = rxn.value > 0;
            const arrowYStart = isUp ? yBeam + 45 : yBeam + 20;
            const arrowYEnd = isUp ? yBeam + 20 : yBeam + 45;

            return (
              <g key={`rxn-ry-${idx}`} opacity={opacity}>
                <line
                  x1={px}
                  y1={arrowYStart}
                  x2={px}
                  y2={arrowYEnd}
                  stroke="var(--success, #10b981)"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                />
                <polygon
                  points={isUp
                    ? `${px},${arrowYEnd} ${px - 4},${arrowYEnd + 5} ${px + 4},${arrowYEnd + 5}`
                    : `${px},${arrowYEnd} ${px - 4},${arrowYEnd - 5} ${px + 4},${arrowYEnd - 5}`
                  }
                  fill="var(--success, #10b981)"
                />
                 <text
                  x={px + 8}
                  y={(arrowYStart + arrowYEnd) / 2 + 4}
                  className="fill-success text-[12px] font-bold"
                >
                  R<tspan fontSize="75%" baselineShift="sub">y{letter}</tspan>
                </text>
              </g>
            );
          }

          if (rxn.type === 'M') {
            const cw = rxn.value > 0;
            const r = 16;
            const pathD = cw
              ? `M ${px - 11.3} ${yBeam + 11.3} A ${r} ${r} 0 1 1 ${px + 11.3} ${yBeam + 11.3}`
              : `M ${px + 11.3} ${yBeam + 11.3} A ${r} ${r} 0 1 0 ${px - 11.3} ${yBeam + 11.3}`;

            return (
              <g key={`rxn-m-${idx}`} opacity={opacity}>
                <path
                  d={pathD}
                  fill="none"
                  stroke="var(--success, #10b981)"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                />
                <polygon
                  points={cw
                    ? `${px + 11.3},${yBeam + 11.3} ${px + 14},${yBeam + 6} ${px + 6},${yBeam + 10}`
                    : `${px - 11.3},${yBeam + 11.3} ${px - 14},${yBeam + 6} ${px - 6},${yBeam + 10}`
                  }
                  fill="var(--success, #10b981)"
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
      </svg>
    </div>
  );
};
