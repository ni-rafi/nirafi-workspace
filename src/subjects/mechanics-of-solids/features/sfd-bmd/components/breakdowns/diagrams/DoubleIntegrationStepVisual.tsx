import React, { useContext } from 'react';
import { BeamWorkspaceContext } from '@/subjects/mechanics-of-solids/features/sfd-bmd/context/BeamWorkspaceContext';
import { MiniBeamVisual } from './MiniBeamVisual';

interface DoubleIntegrationStepVisualProps {
  text: string;
}

export const DoubleIntegrationStepVisual: React.FC<DoubleIntegrationStepVisualProps> = ({ text }) => {
  const beamCtx = useContext(BeamWorkspaceContext);
  if (!beamCtx) return null;

  const { supports } = beamCtx;

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

  const handleRenderOverlay = (toPixel: (x: number) => number) => {
    const yBeam = 70;
    if (!hasLock) return null;
    const lockPx = toPixel(lockPos!);

    return (
      <g transform={`translate(${lockPx}, ${yBeam + 24})`}>
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
          className="fill-destructive text-[11px] font-bold select-none"
        >
          {isSlopeLock ? 'θ = 0' : 'y = 0'}
        </text>

        {/* Glowing lock ring */}
        <circle cx={0} cy={0} r={12} fill="none" stroke="var(--destructive)" strokeWidth={0.75} strokeDasharray="1.5,1.5" opacity={0.6} />
      </g>
    );
  };

  return (
    <MiniBeamVisual
      highlightedSupportId={hasLock ? supports.find(s => Math.abs(s.position - lockPos!) < 0.05)?.id : null}
      onRenderOverlay={handleRenderOverlay}
    />
  );
};
