import React, { useContext } from 'react';
import { BeamWorkspaceContext } from '@/subjects/mechanics-of-solids/features/sfd-bmd/context/BeamWorkspaceContext';
import { MiniBeamVisual } from './MiniBeamVisual';

interface ReactionsStepVisualProps {
  text: string;
}

export const ReactionsStepVisual: React.FC<ReactionsStepVisualProps> = ({ text }) => {
  const beamCtx = useContext(BeamWorkspaceContext);
  if (!beamCtx) return null;

  const { supports, loads } = beamCtx;

  const trimmed = text.trim();
  const sortedSupports = [...supports].sort((a, b) => a.position - b.position);

  let pivotPos: number | null = null;
  let isMomentEquation = false;
  let isLeftOnly = false;
  let isRightOnly = false;

  // Detect equation type and pivot/cut point
  if (
    trimmed.toLowerCase().includes('moment') ||
    trimmed.toLowerCase().includes('m_{') ||
    trimmed.toLowerCase().includes('m_') ||
    trimmed.toLowerCase().includes('m_{\\text{left') ||
    trimmed.toLowerCase().includes('m_{\\text{right')
  ) {
    isMomentEquation = true;
  }

  if (trimmed.toLowerCase().includes('left')) {
    isLeftOnly = true;
  }
  if (trimmed.toLowerCase().includes('right')) {
    isRightOnly = true;
  }

  if (isMomentEquation) {
    const relMatch = trimmed.match(/(?:hinge|roller)\s+at\s+\$x\s*=\s*([\d.]+)/i);
    if (relMatch && relMatch[1]) {
      pivotPos = parseFloat(relMatch[1]);
    } else if (trimmed.includes('x=0') || trimmed.includes('x = 0') || trimmed.includes('x_{0}') || trimmed.includes('x=0\\text')) {
      pivotPos = 0;
    } else {
      if (trimmed.includes('M_A') || trimmed.includes('about $A$') || trimmed.includes('about support $A$')) {
        pivotPos = sortedSupports[0]?.position ?? 0;
      } else if (trimmed.includes('M_B') || trimmed.includes('about $B$') || trimmed.includes('about support $B$')) {
        pivotPos = sortedSupports[1]?.position ?? 0;
      } else if (trimmed.includes('M_C') || trimmed.includes('about $C$') || trimmed.includes('about support $C$')) {
        pivotPos = sortedSupports[2]?.position ?? 0;
      } else {
        pivotPos = 0;
      }
    }
  }

  const opacityRightOfX = (isLeftOnly || isRightOnly) ? pivotPos : null;
  const opacitySide = isRightOnly ? 'left' : 'right';

  // 1. Identify active loads and compute equivalents/centroids
  interface IActiveLoadVisual {
    id: string;
    type: 'point' | 'udl' | 'uvl' | 'moment';
    label: string;
    magnitude: number;
    centroidX: number;
    isUpward: boolean;
  }

  const activeLoadVisuals: IActiveLoadVisual[] = [];

  loads.forEach(l => {
    let cX = 0;
    let P = 0;
    let isUpward = false;
    let label = '';

    if (l.type === 'point' && l.position !== undefined) {
      if (isLeftOnly && pivotPos !== null && l.position > pivotPos + 1e-5) return;
      if (isRightOnly && pivotPos !== null && l.position < pivotPos - 1e-5) return;

      cX = l.position;
      P = Math.abs(l.magnitude ?? 0);
      isUpward = (l.magnitude ?? 0) < 0;
      label = `${P.toFixed(1)} kN`;
    } else if (l.type === 'moment' && l.position !== undefined) {
      if (isLeftOnly && pivotPos !== null && l.position > pivotPos + 1e-5) return;
      if (isRightOnly && pivotPos !== null && l.position < pivotPos - 1e-5) return;

      cX = l.position;
      P = Math.abs(l.magnitude ?? 0);
      isUpward = false;
      label = `${P.toFixed(1)} kNm`;
    } else if (l.type === 'udl' && l.startPosition !== undefined && l.endPosition !== undefined) {
      let start = l.startPosition;
      let end = l.endPosition;
      if (isLeftOnly && pivotPos !== null) {
        end = Math.min(end, pivotPos);
      }
      if (isRightOnly && pivotPos !== null) {
        start = Math.max(start, pivotPos);
      }
      const L_load = end - start;
      if (L_load <= 1e-5) return;

      cX = start + L_load / 2;
      P = Math.abs(l.magnitude ?? 0) * L_load;
      isUpward = (l.magnitude ?? 0) < 0;
      label = `${P.toFixed(1)} kN (equiv)`;
    } else if (l.type === 'uvl' && l.startPosition !== undefined && l.endPosition !== undefined) {
      let start = l.startPosition;
      let end = l.endPosition;
      if (isLeftOnly && pivotPos !== null) {
        end = Math.min(end, pivotPos);
      }
      if (isRightOnly && pivotPos !== null) {
        start = Math.max(start, pivotPos);
      }
      const L_load = end - start;
      if (L_load <= 1e-5) return;

      const w1 = l.startMagnitude ?? 0;
      const w2 = l.endMagnitude ?? 0;
      const totalLen = l.endPosition - l.startPosition;
      if (totalLen <= 0) return;

      let rectW = w1;
      let triW = w2 - w1;

      if (isLeftOnly && pivotPos !== null && l.endPosition > pivotPos) {
        const wx = w1 + ((w2 - w1) * L_load) / totalLen;
        rectW = w1;
        triW = wx - w1;
      } else if (isRightOnly && pivotPos !== null && l.startPosition < pivotPos) {
        const wx = w1 + ((w2 - w1) * (totalLen - L_load)) / totalLen;
        rectW = wx;
        triW = w2 - wx;
      }

      const absW1 = Math.abs(rectW);
      const absW2 = Math.abs(rectW + triW);
      P = 0.5 * Math.abs(rectW + (rectW + triW)) * L_load;
      isUpward = rectW < 0 || (rectW + triW) < 0;

      if (absW1 + absW2 > 1e-4) {
        cX = start + L_load * (absW1 + 2 * absW2) / (3 * (absW1 + absW2));
      } else {
        cX = start + L_load / 2;
      }
      label = `${P.toFixed(1)} kN (equiv)`;
    }

    activeLoadVisuals.push({
      id: l.id,
      type: l.type,
      label,
      magnitude: P,
      centroidX: cX,
      isUpward,
    });
  });

  // 2. Identify active support reactions
  interface IActiveReactionVisual {
    supportId: string;
    letter: string;
    position: number;
    label: string;
    isPivot: boolean;
  }

  const activeReactions: IActiveReactionVisual[] = [];
  sortedSupports.forEach((s, idx) => {
    const letter = String.fromCharCode(65 + idx);
    const isPivot = pivotPos !== null && Math.abs(s.position - pivotPos) < 1e-3;

    if (isLeftOnly && s.position >= (pivotPos ?? 0) - 1e-5) {
      return;
    }
    if (isRightOnly && s.position <= (pivotPos ?? 0) + 1e-5) {
      return;
    }

    activeReactions.push({
      supportId: s.id,
      letter,
      position: s.position,
      label: `R_{y${letter}}`,
      isPivot,
    });
  });

  // Filter and sort targets for dimension lines
  const dimTargets: { x: number; label: string }[] = [];

  if (pivotPos !== null) {
    activeReactions.forEach(r => {
      if (Math.abs(r.position - pivotPos!) > 0.05) {
        dimTargets.push({ x: r.position, label: `${Math.abs(r.position - pivotPos!).toFixed(2)}m` });
      }
    });

    activeLoadVisuals.forEach(l => {
      if (Math.abs(l.centroidX - pivotPos!) > 0.05 && l.type !== 'moment') {
        dimTargets.push({ x: l.centroidX, label: `${Math.abs(l.centroidX - pivotPos!).toFixed(2)}m` });
      }
    });

    dimTargets.sort((a, b) => Math.abs(a.x - pivotPos!) - Math.abs(b.x - pivotPos!));
  }

  const dimCount = dimTargets.length;
  const yBeam = Math.max(90, 69 + Math.max(0, dimCount - 1) * 12);
  const height = yBeam + 75;

  const handleRenderOverlay = (toPixel: (x: number) => number) => {
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

          return (
            <g key={r.supportId}>
              <line x1={px} y1={yBeam + 45} x2={px} y2={yBeam + 12} stroke="var(--success, #10b981)" strokeWidth={1.8} />
              <polygon points={`${px},${yBeam + 12} ${px - 3},${yBeam + 16} ${px + 3},${yBeam + 16}`} fill="var(--success, #10b981)" />
              <text x={px} y={yBeam + 54} textAnchor="middle" className="fill-success text-[12px] font-bold select-none">
                R<tspan fontSize="75%" baselineShift="sub">y{r.letter}</tspan>
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
          const arrowYStart = isUp ? yBeam + 30 : yBeam - 30;
          const arrowYEnd = isUp ? yBeam + 6 : yBeam - 6;

          return (
            <g key={l.id} opacity={0.85}>
              <line
                x1={px}
                y1={arrowYStart}
                x2={px}
                y2={arrowYEnd}
                stroke="var(--accent, #f97316)"
                strokeWidth={1.2}
                strokeDasharray="3,1.5"
              />
              <polygon
                points={isUp
                  ? `${px},${arrowYEnd} ${px - 2.5},${arrowYEnd + 4} ${px + 2.5},${arrowYEnd + 4}`
                  : `${px},${arrowYEnd} ${px - 2.5},${arrowYEnd - 4} ${px + 2.5},${arrowYEnd - 4}`
                }
                fill="var(--accent, #f97316)"
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

  return (
    <MiniBeamVisual
      height={height}
      yBeam={yBeam}
      opacityRightOfX={opacityRightOfX}
      opacitySide={opacitySide}
      onRenderOverlay={handleRenderOverlay}
    />
  );
};

