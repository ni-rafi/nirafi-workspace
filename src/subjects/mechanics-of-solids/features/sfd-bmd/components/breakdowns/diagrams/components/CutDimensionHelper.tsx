import React from 'react';

interface CutDimensionHelperProps {
  activeSide: 'left' | 'right';
  sPx: number;
  cutPx: number;
  endPxBeam: number;
  yBeam: number;
  length: number;
  cutX: number;
}

export const CutDimensionHelper: React.FC<CutDimensionHelperProps> = ({
  activeSide,
  sPx,
  cutPx,
  endPxBeam,
  yBeam,
  length,
  cutX,
}) => {
  const yDimLine = yBeam + 98;
  const yDimText = yBeam + 110;

  if (activeSide === 'left') {
    return (
      <g>
        {/* Witness Lines */}
        <line x1={sPx} y1={yBeam + 10} x2={sPx} y2={yDimLine + 3} stroke="var(--muted-foreground)" strokeWidth={0.6} strokeDasharray="2,2" opacity={0.4} />
        <line x1={cutPx} y1={yBeam + 10} x2={cutPx} y2={yDimLine + 3} stroke="var(--muted-foreground)" strokeWidth={0.6} strokeDasharray="2,2" opacity={0.4} />

        {/* Dimension Line */}
        <line
          x1={sPx}
          y1={yDimLine}
          x2={cutPx}
          y2={yDimLine}
          stroke="var(--primary)"
          strokeWidth={0.8}
        />
        <line x1={sPx} y1={yDimLine - 3} x2={sPx} y2={yDimLine + 3} stroke="var(--primary)" strokeWidth={0.8} />
        <line x1={cutPx} y1={yDimLine - 3} x2={cutPx} y2={yDimLine + 3} stroke="var(--primary)" strokeWidth={0.8} />
        <text
          x={(sPx + cutPx) / 2}
          y={yDimText}
          textAnchor="middle"
          className="fill-primary text-[12px] font-bold select-none"
        >
          x = {cutX.toFixed(2)}m
        </text>
      </g>
    );
  }

  return (
    <g>
      {/* Witness Lines */}
      <line x1={cutPx} y1={yBeam + 10} x2={cutPx} y2={yDimLine + 3} stroke="var(--muted-foreground)" strokeWidth={0.6} strokeDasharray="2,2" opacity={0.4} />
      <line x1={endPxBeam} y1={yBeam + 10} x2={endPxBeam} y2={yDimLine + 3} stroke="var(--muted-foreground)" strokeWidth={0.6} strokeDasharray="2,2" opacity={0.4} />

      {/* Dimension Line */}
      <line
        x1={cutPx}
        y1={yDimLine}
        x2={endPxBeam}
        y2={yDimLine}
        stroke="var(--primary)"
        strokeWidth={0.8}
      />
      <line x1={cutPx} y1={yDimLine - 3} x2={cutPx} y2={yDimLine + 3} stroke="var(--primary)" strokeWidth={0.8} />
      <line x1={endPxBeam} y1={yDimLine - 3} x2={endPxBeam} y2={yDimLine + 3} stroke="var(--primary)" strokeWidth={0.8} />
      <text
        x={(cutPx + endPxBeam) / 2}
        y={yDimText}
        textAnchor="middle"
        className="fill-primary text-[12px] font-bold select-none"
      >
        {length.toFixed(1)} - x = {(length - cutX).toFixed(2)}m
      </text>
    </g>
  );
};
