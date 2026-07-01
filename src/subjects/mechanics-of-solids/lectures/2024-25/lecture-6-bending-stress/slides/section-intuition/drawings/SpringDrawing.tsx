import React from 'react';

interface SpringDrawingProps {
  mode: 'straight' | 'bent' | 'boundaries-only';
}

export const SpringDrawing: React.FC<SpringDrawingProps> = ({ mode }) => {
  const width = 300;
  const height = 180;

  // Render straight spring
  const renderStraight = () => {
    const coils = [];
    const numCoils = 10;
    const startY = 20;
    const endY = 160;
    const dy = (endY - startY) / numCoils;

    for (let i = 0; i < numCoils; i++) {
      const cy1 = startY + i * dy;
      const cy2 = cy1 + dy;
      // Draw a zig-zag representing the spring coil
      coils.push(
        <path
          key={i}
          d={`M 100 ${cy1} L 200 ${cy1 + dy / 2} L 100 ${cy2}`}
          fill="none"
          stroke="var(--foreground)"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      );
    }

    return (
      <g>
        {/* Guidelines */}
        {mode !== 'boundaries-only' && coils}
        <line x1={80} y1={10} x2={80} y2={170} stroke="#f97316" strokeWidth={3} strokeDasharray="4,4" />
        <line x1={220} y1={10} x2={220} y2={170} stroke="#f97316" strokeWidth={3} strokeDasharray="4,4" />
      </g>
    );
  };

  // Render bent spring
  const renderBent = () => {
    // Bent along a circular quadrant
    // Center of circle at (50, 220)
    // Inner radius = 80, Outer radius = 170, NA radius = 125
    const numCoils = 12;
    const coils = [];

    for (let i = 0; i <= numCoils; i++) {
      const angle = (i / numCoils) * Math.PI * 0.5; // 0 to 90 degrees
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);

      // Coordinates for inside and outside edges
      // center is (20, 180)
      const cx = 20;
      const cy = 180;
      const rInner = 70;
      const rOuter = 160;

      const px1 = cx + rInner * sin;
      const py1 = cy - rInner * cos;
      const px2 = cx + rOuter * sin;
      const py2 = cy - rOuter * cos;

      if (i > 0) {
        const prevAngle = ((i - 1) / numCoils) * Math.PI * 0.5;
        const prevCos = Math.cos(prevAngle);
        const prevSin = Math.sin(prevAngle);
        const ppx1 = cx + rInner * prevSin;
        const ppy1 = cy - rInner * prevCos;

        // Coil zig-zag
        coils.push(
          <path
            key={i}
            d={`M ${ppx1} ${ppy1} L ${px2} ${py2} L ${px1} ${py1}`}
            fill="none"
            stroke="var(--foreground)"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        );
      }
    }

    return (
      <g>
        {coils}
        {/* Concentric curved guidelines */}
        <path d="M 20 120 A 60 60 0 0 1 80 180" fill="none" stroke="#f97316" strokeWidth={3} strokeDasharray="4,4" />
        <path d="M 20 10 A 170 170 0 0 1 190 180" fill="none" stroke="#f97316" strokeWidth={3} strokeDasharray="4,4" />
      </g>
    );
  };

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-[240px] h-auto overflow-visible">
      {mode === 'straight' || mode === 'boundaries-only' ? renderStraight() : renderBent()}
    </svg>
  );
};
