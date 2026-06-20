import React from 'react';
import { ILoad } from '@/subjects/mechanics-of-solids/cores/sfd-bmd/types';
import { BeamLoads } from '@/features/presentation/components/elements';
import { VisualCanvasShape } from '@/features/presentation/types/schema';

interface LoadsVisualProps {
  activeLoads: ILoad[];
  toPixel: (pos: number) => number;
  highlightedLoadId: string | null;
  yBeam: number;
  opacityRightOfX: number | null;
  opacitySide: 'left' | 'right';
  getOpacity: (x: number) => number;
}

export const LoadsVisual: React.FC<LoadsVisualProps> = ({
  activeLoads,
  toPixel,
  highlightedLoadId,
  yBeam,
  opacityRightOfX,
  opacitySide,
  getOpacity,
}) => {
  interface IEnhancedLoad extends ILoad {
    forceOpacity?: number;
  }

  const processedLoads: IEnhancedLoad[] = [];

  activeLoads.forEach(l => {
    if (
      opacityRightOfX !== null &&
      (l.type === 'udl' || l.type === 'uvl') &&
      l.startPosition !== undefined &&
      l.endPosition !== undefined &&
      l.startPosition < opacityRightOfX - 1e-5 &&
      l.endPosition > opacityRightOfX + 1e-5
    ) {
      const cutVal = opacityRightOfX;
      const leftOpacity = opacitySide === 'left' ? 0.2 : 1.0;
      const rightOpacity = opacitySide === 'right' ? 0.2 : 1.0;

      if (l.type === 'udl') {
        processedLoads.push({
          ...l,
          id: `${l.id}-left`,
          startPosition: l.startPosition,
          endPosition: cutVal,
          forceOpacity: leftOpacity,
        });
        processedLoads.push({
          ...l,
          id: `${l.id}-right`,
          startPosition: cutVal,
          endPosition: l.endPosition,
          forceOpacity: rightOpacity,
        });
      } else {
        const w1 = l.startMagnitude ?? 0;
        const w2 = l.endMagnitude ?? 0;
        const totalL = l.endPosition - l.startPosition;
        const cutL = cutVal - l.startPosition;
        const wx = w1 + ((w2 - w1) * cutL) / totalL;

        processedLoads.push({
          ...l,
          id: `${l.id}-left`,
          startPosition: l.startPosition,
          endPosition: cutVal,
          startMagnitude: w1,
          endMagnitude: wx,
          forceOpacity: leftOpacity,
        });
        processedLoads.push({
          ...l,
          id: `${l.id}-right`,
          startPosition: cutVal,
          endPosition: l.endPosition,
          startMagnitude: wx,
          endMagnitude: w2,
          forceOpacity: rightOpacity,
        });
      }
    } else {
      processedLoads.push(l);
    }
  });

  return (
    <>
      {processedLoads.map(l => {
        const isHighlighted = highlightedLoadId === l.id || (l.id.includes('-') && highlightedLoadId === l.id.split('-')[0]);
        const opacity = l.forceOpacity !== undefined ? l.forceOpacity : getOpacity(l.position ?? l.startPosition ?? 0);

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
    </>
  );
};
