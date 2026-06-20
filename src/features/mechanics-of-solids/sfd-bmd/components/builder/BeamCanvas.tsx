import React, { useRef, useState } from 'react';
import { useBeamWorkspace } from '../../context/BeamWorkspaceContext';
import { BeamSupports } from '@/features/presentation/components/elements/BeamSupports';
import { BeamLoads } from '@/features/presentation/components/elements/BeamLoads';
import { VisualCanvasShape } from '@/features/presentation/types/schema';

export const BeamCanvas: React.FC = () => {
  const {
    length,
    supports,
    releases,
    loads,
    selectedId,
    hoverX,
    setSelectedId,
    updateSupport,
    updateRelease,
    updateLoad,
    setHoverX,
  } = useBeamWorkspace();

  const svgRef = useRef<SVGSVGElement>(null);
  const wasDraggingRef = useRef<boolean>(false);
  const [dragState, setDragState] = useState<{
    id: string;
    type: 'support' | 'release' | 'load';
    startX: number;
    startPos: number;
    startEndPos?: number;
  } | null>(null);

  // SVG Coordinates constants
  const paddingX = 60;
  const width = 800;
  const beamW = width - paddingX * 2; // 680px
  const yBeam = 100;

  const toPixel = (pos: number) => paddingX + (pos / length) * beamW;
  const toMeter = (pixel: number) => {
    const raw = ((pixel - paddingX) / beamW) * length;
    return Math.max(0, Math.min(length, parseFloat(raw.toFixed(2))));
  };

  const handleMouseDown = (
    e: React.MouseEvent,
    id: string,
    type: 'support' | 'release' | 'load',
    pos: number,
    endPos?: number
  ) => {
    e.stopPropagation();
    wasDraggingRef.current = false;
    setSelectedId(id);
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    setDragState({
      id,
      type,
      startX: clickX,
      startPos: pos,
      startEndPos: endPos,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const xMeter = Math.max(0, Math.min(length, toMeter(currentX)));

    if (!dragState) {
      setHoverX(xMeter);
      return;
    }

    wasDraggingRef.current = true;
    const deltaX = currentX - dragState.startX;
    const deltaM = (deltaX / beamW) * length;
    const newPos = Math.max(0, Math.min(length, parseFloat((dragState.startPos + deltaM).toFixed(2))));
    setHoverX(newPos);

    if (dragState.type === 'support') {
      updateSupport(dragState.id, { position: newPos });
    } else if (dragState.type === 'release') {
      updateRelease(dragState.id, { position: newPos });
    } else if (dragState.type === 'load') {
      const load = loads.find(l => l.id === dragState.id);
      if (!load) return;

      if (load.type === 'point' || load.type === 'moment') {
        updateLoad(dragState.id, { position: newPos });
      } else if (load.type === 'udl' || load.type === 'uvl') {
        const span = (dragState.startEndPos ?? 0) - dragState.startPos;
        let sPos = newPos;
        let ePos = sPos + span;
        if (ePos > length) {
          ePos = length;
          sPos = ePos - span;
        }
        updateLoad(dragState.id, {
          startPosition: parseFloat(sPos.toFixed(2)),
          endPosition: parseFloat(ePos.toFixed(2)),
        });
      }
    }
  };

  const handleMouseUp = () => {
    setDragState(null);
    setHoverX(null);
  };

  const handleMouseLeave = () => {
    setDragState(null);
    setHoverX(null);
  };

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-border bg-card/40 p-4 backdrop-blur-md">
      <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Interactive Beam Workspace</div>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${width} 170`}
        className="w-full select-none overflow-visible"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onMouseDown={() => {
          wasDraggingRef.current = false;
        }}
        onClick={(e) => {
          if (wasDraggingRef.current) {
            wasDraggingRef.current = false;
            return;
          }
          setSelectedId(null);
        }}
      >
        {/* Dimension ticks and length grid */}
        <line x1={paddingX} y1={yBeam + 30} x2={paddingX + beamW} y2={yBeam + 30} stroke="var(--muted-foreground)" strokeWidth={1} strokeDasharray="3,3" />
        <line x1={paddingX} y1={yBeam + 25} x2={paddingX} y2={yBeam + 35} stroke="var(--muted-foreground)" strokeWidth={1} />
        <line x1={paddingX + beamW} y1={yBeam + 25} x2={paddingX + beamW} y2={yBeam + 35} stroke="var(--muted-foreground)" strokeWidth={1} />
        <text x={paddingX + beamW / 2} y={yBeam + 48} textAnchor="middle" className="fill-muted-foreground text-xs font-medium">
          Total Length = {length}m
        </text>

        {/* The Beam Member */}
        <rect
          x={paddingX}
          y={yBeam - 6}
          width={beamW}
          height={12}
          rx={4}
          className={`cursor-pointer stroke-2 fill-muted/80 transition-colors ${
            selectedId === 'beam' ? 'stroke-primary fill-muted' : 'stroke-border hover:fill-muted'
          }`}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedId('beam');
          }}
        />

        {/* Render Supports */}
        {supports.map(s => {
          const px = toPixel(s.position);
          const isSelected = selectedId === s.id;
          const shape: VisualCanvasShape = {
            id: s.id,
            type: s.type === 'fixed' ? 'support-fixed' : s.type === 'hinge' ? 'support-pin' : 'support-roller',
            x: 0, y: 0, w: 40, h: 40, enterAt: 1
          };

          let tx = `translate(${px - 20}, ${yBeam + 6})`;
          if (s.type === 'fixed') {
            tx = s.position < length / 2 
              ? `translate(${px - 12}, ${yBeam - 20}) rotate(180, 6, 20)`
              : `translate(${px}, ${yBeam - 20})`;
          }

          return (
            <g
              key={s.id}
              className={`cursor-ew-resize transition-all ${isSelected ? 'drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]' : ''}`}
              onMouseDown={(e) => handleMouseDown(e, s.id, 'support', s.position)}
              onClick={(e) => e.stopPropagation()}
            >
              <BeamSupports
                el={shape}
                stroke={isSelected ? 'var(--primary)' : 'var(--foreground)'}
                fill={isSelected ? 'var(--primary-hover)' : 'var(--muted)'}
                sw={2}
                transform={tx}
              />
              <circle cx={px} cy={yBeam} r={5} fill={isSelected ? 'var(--primary)' : 'var(--muted-foreground)'} />
            </g>
          );
        })}

        {/* Render Internal Releases */}
        {releases.map(r => {
          const px = toPixel(r.position);
          const isSelected = selectedId === r.id;
          const shape: VisualCanvasShape = {
            id: r.id,
            type: 'hinge', // internal release hinge is rendered as circle
            x: 0, y: 0, w: 14, h: 14, enterAt: 1
          };
          return (
            <g
              key={r.id}
              className={`cursor-ew-resize ${isSelected ? 'drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]' : ''}`}
              onMouseDown={(e) => handleMouseDown(e, r.id, 'release', r.position)}
              onClick={(e) => e.stopPropagation()}
            >
              <BeamSupports
                el={shape}
                stroke={isSelected ? 'var(--primary)' : 'var(--destructive)'}
                fill="var(--background)"
                sw={2}
                transform={`translate(${px - 7}, ${yBeam - 7})`}
              />
            </g>
          );
        })}

        {/* Render Loads */}
        {loads.map(l => {
          const isSelected = selectedId === l.id;
          const stroke = isSelected ? 'var(--primary)' : 'var(--accent, #f97316)';
          const fill = isSelected ? 'rgba(59,130,246,0.1)' : 'rgba(249,115,22,0.1)';

          if (l.type === 'point' && l.position !== undefined) {
            const px = toPixel(l.position);
            const isUp = (l.magnitude ?? 0) < 0;
            const shape: VisualCanvasShape = {
              id: l.id,
              type: 'point-load',
              x: 0, y: 0, w: 20, h: 40, enterAt: 1,
              pointLoadDirection: isUp ? 'up' : 'down'
            };
            const ty = isUp ? yBeam + 6 : yBeam - 46;
            return (
              <g
                key={l.id}
                className="cursor-ew-resize"
                onMouseDown={(e) => handleMouseDown(e, l.id, 'load', l.position!)}
                onClick={(e) => e.stopPropagation()}
              >
                <BeamLoads el={shape} stroke={stroke} fill={fill} sw={2} transform={`translate(${px - 10}, ${ty})`} />
                <text x={px} y={isUp ? yBeam + 60 : yBeam - 54} textAnchor="middle" className="fill-foreground text-xs font-semibold">
                  {Math.abs(l.magnitude ?? 0)} kN
                </text>
              </g>
            );
          }

          if (l.type === 'moment' && l.position !== undefined) {
            const px = toPixel(l.position);
            const shape: VisualCanvasShape = {
              id: l.id,
              type: 'moment',
              x: 0, y: 0, w: 32, h: 32, enterAt: 1,
              momentDirection: (l.magnitude ?? 0) >= 0 ? 'cw' : 'ccw'
            };
            return (
              <g
                key={l.id}
                className="cursor-ew-resize"
                onMouseDown={(e) => handleMouseDown(e, l.id, 'load', l.position!)}
                onClick={(e) => e.stopPropagation()}
              >
                <BeamLoads el={shape} stroke={stroke} fill={fill} sw={2} transform={`translate(${px - 16}, ${yBeam - 32})`} />
                <text x={px} y={yBeam - 42} textAnchor="middle" className="fill-foreground text-xs font-semibold">
                  {Math.abs(l.magnitude ?? 0)} kNm
                </text>
              </g>
            );
          }

          if ((l.type === 'udl' || l.type === 'uvl') && l.startPosition !== undefined && l.endPosition !== undefined) {
            const startPx = toPixel(l.startPosition);
            const endPx = toPixel(l.endPosition);
            const w = endPx - startPx;
            
            const shape: VisualCanvasShape = {
              id: l.id,
              type: l.type === 'udl' ? 'udl' : 'uvl',
              x: 0, y: 0, w, h: 40, enterAt: 1,
              udlSegmentsCount: Math.max(4, Math.round(w / 20)),
              uvlStartHeight: l.type === 'uvl' ? Math.min(1, Math.max(0, Math.abs(l.startMagnitude ?? 0) / 10)) : undefined,
              uvlEndHeight: l.type === 'uvl' ? Math.min(1, Math.max(0, Math.abs(l.endMagnitude ?? 0) / 10)) : undefined
            };

            const isUp = l.type === 'udl' ? (l.magnitude ?? 0) < 0 : (l.startMagnitude ?? 0) < 0;
            const ty = isUp ? yBeam + 6 : yBeam - 46;

            const textX = startPx + w / 2;
            const textY = isUp ? yBeam + 62 : yBeam - 54;
            const labelStr = l.type === 'udl' 
              ? `${Math.abs(l.magnitude ?? 0)} kN/m`
              : `${Math.abs(l.startMagnitude ?? 0)} to ${Math.abs(l.endMagnitude ?? 0)} kN/m`;

            return (
              <g
                key={l.id}
                className="cursor-ew-resize"
                onMouseDown={(e) => handleMouseDown(e, l.id, 'load', l.startPosition!, l.endPosition!)}
                onClick={(e) => e.stopPropagation()}
              >
                <BeamLoads el={shape} stroke={stroke} fill={fill} sw={1.5} transform={`translate(${startPx}, ${ty})`} />
                <text x={textX} y={textY} textAnchor="middle" className="fill-foreground text-xs font-semibold">
                  {labelStr}
                </text>
              </g>
            );
          }
          return null;
        })}

        {/* Hover Crosshair Sync */}
        {hoverX !== null && (
          <g>
            <line
              x1={toPixel(hoverX)}
              y1={20}
              x2={toPixel(hoverX)}
              y2={yBeam + 30}
              stroke="var(--primary)"
              strokeWidth={1}
              strokeDasharray="3,3"
              opacity={0.65}
            />
            <circle
              cx={toPixel(hoverX)}
              cy={yBeam}
              r={4}
              fill="var(--primary)"
              opacity={0.8}
            />
          </g>
        )}
      </svg>
    </div>
  );
};
