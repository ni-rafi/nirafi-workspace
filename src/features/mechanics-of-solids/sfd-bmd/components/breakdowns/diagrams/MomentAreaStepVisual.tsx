import React from 'react';
import { useBeamWorkspace } from '../../../context/BeamWorkspaceContext';
import { useBeamEngine } from '../../../hooks/useBeamEngine';

interface MomentAreaStepVisualProps {
  text: string;
}

export const MomentAreaStepVisual: React.FC<MomentAreaStepVisualProps> = ({ text }) => {
  const { length, supports } = useBeamWorkspace();
  const { solverResult } = useBeamEngine();

  const width = 320;
  const height = 90;
  const paddingX = 20;
  const beamW = width - paddingX * 2;
  const yBeam = 25;

  const toPixelX = (x: number) => paddingX + (x / length) * beamW;

  const isDeviation = text.includes('deviation') || text.includes('t_{') || text.includes('t_');
  const isCentroid = text.includes('centroid') || text.includes('Theorem II') || text.includes('M/EI');

  // Find supports
  const sortedSupports = [...supports].sort((a, b) => a.position - b.position);
  const xA = sortedSupports[0]?.position ?? 0;
  const xB = sortedSupports[1]?.position ?? length;

  const pxA = toPixelX(xA);
  const pxB = toPixelX(xB);

  if (isCentroid && solverResult.success && solverResult.intervals) {
    // Render M/EI centroid mapper
    const yBaseline = 50;

    const getMAt = (x: number): number => {
      const interval = solverResult.intervals.find(
        inv => x >= inv.startX - 1e-4 && x <= inv.endX + 1e-4
      );
      if (!interval) return 0;
      const [a, b, c, d] = interval.mCoeffs;
      // Moment equation is represented as: a*x^3 + b*x^2 + c*x + d
      return (a * x * x * x + b * x * x + c * x + d) / 20.0; // scale factor
    };

    // Calculate max moment to scale
    let maxM = 1;
    const points: { x: number; m: number }[] = [];
    const numSteps = 50;
    for (let i = 0; i <= numSteps; i++) {
      const x = (i / numSteps) * length;
      const m = getMAt(x);
      points.push({ x, m });
      if (Math.abs(m) > maxM) maxM = Math.abs(m);
    }

    const scaleY = (m: number) => yBaseline + (m / maxM) * 20;

    let pathD = `M ${toPixelX(0)} ${yBaseline}`;
    points.forEach(pt => {
      pathD += ` L ${toPixelX(pt.x)} ${scaleY(pt.m)}`;
    });
    pathD += ` L ${toPixelX(length)} ${yBaseline} Z`;

    // Shade area between xA and xB
    const shadePoints = points.filter(pt => pt.x >= xA - 1e-4 && pt.x <= xB + 1e-4);
    let shadeD = '';
    if (shadePoints.length > 0) {
      shadeD = `M ${pxA} ${yBaseline}`;
      shadePoints.forEach(pt => {
        shadeD += ` L ${toPixelX(pt.x)} ${scaleY(pt.m)}`;
      });
      shadeD += ` L ${pxB} ${yBaseline} Z`;
    }

    // Centroid coordinate (approximate at center for visualization)
    const centroidX = (xA + xB) / 2;
    const centroidPx = toPixelX(centroidX);
    const centroidPy = scaleY(getMAt(centroidX)) - 10;

    return (
      <div className="mt-2.5 mb-1.5 overflow-hidden rounded-lg border border-border/30 bg-muted/5 p-2 max-w-sm">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full select-none overflow-visible">
          {/* M/EI Diagram */}
          <line x1={paddingX} y1={yBaseline} x2={width - paddingX} y2={yBaseline} stroke="var(--muted-foreground)" strokeWidth={1} opacity={0.4} />
          <path d={pathD} fill="none" stroke="var(--border)" strokeWidth={1} opacity={0.3} />
          {shadeD && <path d={shadeD} fill="rgba(59, 130, 246, 0.15)" stroke="var(--primary)" strokeWidth={1.2} />}

          {/* Centroid marker */}
          <g>
            <circle cx={centroidPx} cy={centroidPy} r={4} fill="var(--primary)" />
            <line x1={centroidPx - 6} y1={centroidPy} x2={centroidPx + 6} y2={centroidPy} stroke="var(--primary)" strokeWidth={1} />
            <line x1={centroidPx} y1={centroidPy - 6} x2={centroidPx} y2={centroidPy + 6} stroke="var(--primary)" strokeWidth={1} />
          </g>

          {/* Centroid lever arm x-bar */}
          <line x1={centroidPx} y1={yBaseline - 12} x2={pxB} y2={yBaseline - 12} stroke="var(--primary)" strokeWidth={1} strokeDasharray="2,2" />
          <circle cx={centroidPx} cy={yBaseline - 12} r={1.5} fill="var(--primary)" />
          <circle cx={pxB} cy={yBaseline - 12} r={1.5} fill="var(--primary)" />
          <text x={(centroidPx + pxB) / 2} y={yBaseline - 16} textAnchor="middle" className="fill-primary text-[8px] font-bold">x-bar</text>
        </svg>
      </div>
    );
  }

  // Fallback / default: Render deflection curve and Mohr's tangent line
  const thetaAngle = 0.05; // radians (slope of tangent line at A)
  const dyB = beamW * Math.tan(thetaAngle); // deviation at B

  return (
    <div className="mt-2.5 mb-1.5 overflow-hidden rounded-lg border border-border/30 bg-muted/5 p-2 max-w-sm">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full select-none overflow-visible">
        {/* Straight Undeflected Beam (Baseline) */}
        <line
          x1={paddingX}
          y1={yBeam}
          x2={width - paddingX}
          y2={yBeam}
          stroke="var(--muted-foreground)"
          strokeWidth={0.75}
          strokeDasharray="3,3"
          opacity={0.6}
        />

        {/* Deflected shape of the beam */}
        <path
          d={`M ${pxA} ${yBeam} Q ${(pxA + pxB) / 2} ${yBeam + 20} ${pxB} ${yBeam}`}
          fill="none"
          stroke="var(--foreground)"
          strokeWidth={2}
        />

        {/* Tangent line at support A */}
        <line
          x1={pxA}
          y1={yBeam}
          x2={pxB + 10}
          y2={yBeam + dyB + 0.5}
          stroke="var(--primary)"
          strokeWidth={1.2}
          strokeDasharray="4,2"
        />

        {/* Support markers */}
        <circle cx={pxA} cy={yBeam} r={4} fill="var(--muted-foreground)" />
        <circle cx={pxB} cy={yBeam} r={4} fill="var(--muted-foreground)" />
        <text x={pxA} y={yBeam - 6} textAnchor="middle" className="fill-muted-foreground text-[8px] font-bold">A</text>
        <text x={pxB} y={yBeam - 6} textAnchor="middle" className="fill-muted-foreground text-[8px] font-bold">B</text>

        {/* Tangential deviation t_{B/A} vertical dimension line */}
        {isDeviation && (
          <g>
            <line
              x1={pxB}
              y1={yBeam}
              x2={pxB}
              y2={yBeam + dyB}
              stroke="var(--destructive)"
              strokeWidth={1.5}
            />
            {/* Arrows */}
            <polygon points={`${pxB},${yBeam} ${pxB - 3},${yBeam + 4} ${pxB + 3},${yBeam + 4}`} fill="var(--destructive)" />
            <polygon points={`${pxB},${yBeam + dyB} ${pxB - 3},${yBeam + dyB - 4} ${pxB + 3},${yBeam + dyB - 4}`} fill="var(--destructive)" />
            <text
              x={pxB + 8}
              y={yBeam + dyB / 2 + 3}
              textAnchor="start"
              className="fill-destructive text-[8px] font-bold select-none"
            >
              t_B/A
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};
