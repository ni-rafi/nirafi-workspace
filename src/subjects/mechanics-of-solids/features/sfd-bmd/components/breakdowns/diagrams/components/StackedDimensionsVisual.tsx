import React from 'react';

interface StackedDimensionsVisualProps {
  dimTargets: { x: number; label: string }[];
  toPixel: (x: number) => number;
  cutX: number;
  yBeam: number;
}

export const StackedDimensionsVisual: React.FC<StackedDimensionsVisualProps> = ({
  dimTargets,
  toPixel,
  cutX,
  yBeam,
}) => {
  return (
    <>
      {dimTargets.map((dt, idx) => {
        const startPx = toPixel(dt.x);
        const endPx = toPixel(cutX);
        const yDim = yBeam - 54 - idx * 12;
        const labelWidth = Math.max(28, dt.label.length * 6.5);

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
              x={Math.min(startPx, endPx) + Math.abs(startPx - endPx) / 2 - labelWidth / 2}
              y={yDim - 5}
              width={labelWidth}
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
    </>
  );
};
