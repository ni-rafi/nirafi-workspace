import React from 'react';
import { useBeamWorkspace } from '@/subjects/mechanics-of-solids/features/sfd-bmd/context/BeamWorkspaceContext';

interface DoubleIntegrationStepVisualProps {
  text: string;
}

export const DoubleIntegrationStepVisual: React.FC<DoubleIntegrationStepVisualProps> = ({ text }) => {
  const { length, supports } = useBeamWorkspace();

  const width = 320;
  const height = 70;
  const paddingX = 20;
  const beamW = width - paddingX * 2;
  const yBeam = 25;

  const toPixel = (pos: number) => paddingX + (pos / length) * beamW;

  // Parse boundary condition coordinate from step text (e.g., "y(0.00) = 0" or "y(6.00) = 0" or "theta(0) = 0")
  let lockPos: number | null = null;
  let isSlopeLock = false;

  const matchDeflection = text.match(/y\(([\d.]+)\)\s*=\s*0/) || text.match(/v\(([\d.]+)\)\s*=\s*0/);
  const matchSlope = text.match(/theta\(([\d.]+)\)\s*=\s*0/) || text.match(/\\theta_A\s*=\s*0/);

  if (matchDeflection && matchDeflection[1]) {
    lockPos = parseFloat(matchDeflection[1]);
  } else if (matchSlope) {
    if (matchSlope[1]) {
      lockPos = parseFloat(matchSlope[1]);
    } else {
      lockPos = 0; // default for theta_A
    }
    isSlopeLock = true;
  } else {
    // Check if the step mentions fixed support or boundary conditions
    const fixedSupport = supports.find(s => s.type === 'fixed');
    if (fixedSupport) {
      lockPos = fixedSupport.position;
      isSlopeLock = text.includes('slope') || text.includes('tangent');
    }
  }

  const hasLock = lockPos !== null;
  const lockPx = hasLock ? toPixel(lockPos!) : 0;

  return (
    <div className="mt-2.5 mb-1.5 overflow-hidden rounded-lg border border-border/30 bg-muted/5 p-2 max-w-sm">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full select-none overflow-visible">
        {/* Beam member */}
        <rect
          x={paddingX}
          y={yBeam - 4}
          width={beamW}
          height={8}
          rx={2}
          className="fill-muted/70 stroke-border"
          strokeWidth={1}
        />

        {/* Supports */}
        {supports.map(s => {
          const px = toPixel(s.position);
          return (
            <g key={s.id}>
              {s.type === 'fixed' ? (
                <line x1={px} y1={yBeam - 10} x2={px} y2={yBeam + 10} className="stroke-foreground stroke-2" />
              ) : s.type === 'hinge' ? (
                <polygon
                  points={`${px},${yBeam} ${px - 5},${yBeam + 8} ${px + 5},${yBeam + 8}`}
                  className="fill-none stroke-foreground stroke-1.5"
                />
              ) : (
                <g>
                  <circle cx={px} cy={yBeam + 3} r={3} className="fill-none stroke-foreground stroke-1.2" />
                  <line x1={px - 5} y1={yBeam + 8} x2={px + 5} y2={yBeam + 8} className="stroke-foreground stroke-0.8" />
                </g>
              )}
            </g>
          );
        })}

        {/* Padlock boundary locks */}
        {hasLock && (
          <g transform={`translate(${lockPx}, ${yBeam + 18})`}>
            {/* Padlock loop */}
            <path
              d="M -3 -1 A 3 3 0 0 1 3 -1 L 3 2 L -3 2 Z"
              fill="none"
              stroke="var(--destructive)"
              strokeWidth={1}
            />
            {/* Padlock body */}
            <rect x={-5} y={1} width={10} height={8} rx={1} fill="var(--destructive)" />
            {/* Keyhole */}
            <circle cx={0} cy={4} r={1} fill="var(--background)" />

            {/* Label text next to the lock */}
            <text
              x={8}
              y={7}
              textAnchor="start"
              className="fill-destructive text-[8px] font-bold select-none"
            >
              {isSlopeLock ? 'θ = 0' : 'y = 0'}
            </text>

            {/* Glowing lock ring */}
            <circle cx={0} cy={0} r={12} fill="none" stroke="var(--destructive)" strokeWidth={0.75} strokeDasharray="2,2" opacity={0.6} />
          </g>
        )}
      </svg>
    </div>
  );
};
