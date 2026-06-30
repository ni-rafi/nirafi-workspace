import React from 'react';
import { VisualCanvasShape } from '../../types/schema';
import { UdlLoad, UvlLoad, PointLoad, MomentLoad } from '@/features/civil-drawing/components/loads';

interface BeamLoadsProps {
  el: VisualCanvasShape;
  stroke: string;
  fill: string;
  sw: number;
  transform: string;
  strokeDasharray?: string;
  momentHalf?: 'left' | 'right';
}

export const BeamLoads: React.FC<BeamLoadsProps> = ({
  el,
  stroke,
  fill,
  sw,
  transform,
  momentHalf,
}) => {
  return (
    <g transform={transform}>
      {(() => {
        if (el.type === 'udl') {
          return (
            <UdlLoad
              x={0}
              y={el.h}
              width={el.w}
              height={el.h * 0.45}
              direction="down"
              color={stroke}
              strokeWidth={sw}
            />
          );
        }

        if (el.type === 'uvl') {
          const y_bottom = el.h;
          const startHeight = (el.h - 15) * (el.uvlStartHeight ?? 0);
          const endHeight = (el.h - 15) * (el.uvlEndHeight ?? 1);
          return (
            <UvlLoad
              x={0}
              y={y_bottom}
              width={el.w}
              startHeight={startHeight}
              endHeight={endHeight}
              direction="down"
              color={stroke}
              fill={fill}
              strokeWidth={sw}
            />
          );
        }

        if (el.type === 'point-load') {
          const dir = el.pointLoadDirection || 'down';
          const tipY = dir === 'down' ? el.h : dir === 'up' ? 0 : el.h / 2;
          const tipX = dir === 'left' ? 0 : dir === 'right' ? el.w : el.w / 2;
          const length = dir === 'left' || dir === 'right' ? el.w : el.h;
          return (
            <PointLoad
              x={tipX}
              y={tipY}
              length={length}
              direction={dir}
              color={stroke}
              strokeWidth={sw}
            />
          );
        }

        if (el.type === 'moment') {
          const dir = el.momentDirection === 'ccw' ? 'ccw' : 'cw';
          const half = momentHalf === 'right' ? 'right' : 'left';
          const variant = `${dir}-${half}` as 'cw-left' | 'cw-right' | 'ccw-left' | 'ccw-right';
          const r = Math.min(el.w, el.h) * 0.35;
          return (
            <MomentLoad
              cx={el.w / 2}
              cy={el.h / 2}
              radius={r}
              variant={variant}
              color={stroke}
              strokeWidth={sw}
            />
          );
        }

        return null;
      })()}
    </g>
  );
};

export default BeamLoads;
