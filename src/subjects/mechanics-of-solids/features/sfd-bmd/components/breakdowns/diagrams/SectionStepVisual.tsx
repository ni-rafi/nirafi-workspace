import React, { useContext } from 'react';
import { BeamWorkspaceContext } from '@/subjects/mechanics-of-solids/features/sfd-bmd/context/BeamWorkspaceContext';
import { MiniBeamVisual } from './MiniBeamVisual';
import { processSectionForces } from './sectionLoadHelper';
import { parseIntervalLimits } from './helpers/sectionIntervalParser';
import { SectionOverlay } from './components/SectionOverlay';
import { useBeamEngine } from '../../../hooks/useBeamEngine';

interface SectionStepVisualProps {
  text: string;
  stepIndex?: number;
  allSteps?: string[];
}

export const SectionStepVisual: React.FC<SectionStepVisualProps> = ({ text, stepIndex, allSteps }) => {
  const beamCtx = useContext(BeamWorkspaceContext);
  const { solverResult } = useBeamEngine();
  if (!beamCtx) return null;

  const { length, hoverX, supports, loads } = beamCtx;

  // Parse interval limits
  const { cutX, isMoment } = parseIntervalLimits(text, stepIndex, allSteps, length, hoverX);

  const { activeSide, activeReactions, activeLoadVisuals, dimTargets } = processSectionForces(
    supports,
    loads,
    cutX,
    length,
    isMoment
  );

  const dimCount = dimTargets.length;
  const yBeam = Math.max(90, 69 + Math.max(0, dimCount - 1) * 12);
  const height = yBeam + 120;

  return (
    <MiniBeamVisual
      height={height}
      yBeam={yBeam}
      opacityRightOfX={cutX}
      opacitySide={activeSide === 'left' ? 'right' : 'left'}
      onRenderOverlay={(toPixel) => (
        <SectionOverlay
          cutX={cutX}
          length={length}
          activeSide={activeSide}
          activeReactions={activeReactions}
          activeLoadVisuals={activeLoadVisuals}
          dimTargets={dimTargets}
          yBeam={yBeam}
          reactions={solverResult.reactions}
          toPixel={toPixel}
        />
      )}
    />
  );
};
