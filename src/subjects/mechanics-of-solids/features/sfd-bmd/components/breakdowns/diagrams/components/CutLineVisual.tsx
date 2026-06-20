import React from 'react';

interface CutLineVisualProps {
  cutPx: number;
  yBeam: number;
}

export const CutLineVisual: React.FC<CutLineVisualProps> = ({ cutPx, yBeam }) => (
  <line
    x1={cutPx}
    y1={yBeam - 35}
    x2={cutPx}
    y2={yBeam + 35}
    stroke="var(--destructive)"
    strokeWidth={1.5}
    strokeDasharray="3,2"
  />
);
