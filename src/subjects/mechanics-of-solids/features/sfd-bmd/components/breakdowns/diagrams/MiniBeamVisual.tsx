import React, { useContext } from 'react';
import { BeamWorkspaceContext } from '@/subjects/mechanics-of-solids/features/sfd-bmd/context/BeamWorkspaceContext';
import { ISupport, IInternalRelease, ILoad } from '@/subjects/mechanics-of-solids/cores/sfd-bmd/types';
import { BeamSegmentsVisual } from './components/BeamSegmentsVisual';
import { SupportsVisual } from './components/SupportsVisual';
import { ReleasesVisual } from './components/ReleasesVisual';
import { LoadsVisual } from './components/LoadsVisual';
import { ReactionsVisual } from './components/ReactionsVisual';

interface MiniBeamVisualProps {
  width?: number;
  height?: number;
  paddingX?: number;
  yBeam?: number;
  highlightedSupportId?: string | null;
  highlightedLoadId?: string | null;
  highlightedReleaseId?: string | null;
  opacityRightOfX?: number | null;
  opacitySide?: 'left' | 'right';
  customSupportType?: Record<string, 'roller' | 'hinge' | 'fixed' | 'free' | 'internal-roller' | 'internal-hinge'>;
  customReactions?: Array<{ supportId: string; type: 'R_y' | 'M' | 'R_x'; value: number }>;
  showSupportLetters?: boolean;
  customSupports?: ISupport[];
  customReleases?: IInternalRelease[];
  customLoads?: ILoad[];
  onRenderOverlay?: (toPixel: (x: number) => number) => React.ReactNode;
}

export const MiniBeamVisual: React.FC<MiniBeamVisualProps> = ({
  width = 800,
  height = 145,
  paddingX = 60,
  yBeam = 70,
  highlightedSupportId = null,
  highlightedLoadId = null,
  highlightedReleaseId = null,
  opacityRightOfX = null,
  opacitySide = 'right',
  customSupportType = undefined,
  customReactions = undefined,
  showSupportLetters = true,
  customSupports = undefined,
  customReleases = undefined,
  customLoads = undefined,
  onRenderOverlay = undefined,
}) => {
  const beamCtx = useContext(BeamWorkspaceContext);
  if (!beamCtx) return null;

  const { length, supports, releases, loads, eiSegments } = beamCtx;
  const activeSupports = customSupports !== undefined ? customSupports : supports;
  const activeReleases = customReleases !== undefined ? customReleases : releases;
  const activeLoads = customLoads !== undefined ? customLoads : loads;

  const beamW = width - paddingX * 2;
  const toPixel = (pos: number) => paddingX + (pos / length) * beamW;

  const getOpacity = (x: number) => {
    if (opacityRightOfX !== null) {
      if (opacitySide === 'left') {
        return x < opacityRightOfX - 1e-5 ? 0.2 : 1.0;
      } else {
        return x > opacityRightOfX + 1e-5 ? 0.2 : 1.0;
      }
    }
    return 1.0;
  };

  // Sort supports and map letters A, B, C...
  const sortedSupports = [...activeSupports].sort((a, b) => a.position - b.position);
  const supportIdToLetter = new Map<string, string>();
  sortedSupports.forEach((s, idx) => {
    supportIdToLetter.set(s.id, String.fromCharCode(65 + idx));
  });

  return (
    <div className="mt-3 mb-2 overflow-hidden rounded-lg border border-border/30 bg-muted/5 p-4 w-full max-w-4xl mx-auto shadow-sm">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full select-none overflow-visible">
        {/* Render Segmented Beam member */}
        <BeamSegmentsVisual
          eiSegments={eiSegments}
          toPixel={toPixel}
          yBeam={yBeam}
          opacityRightOfX={opacityRightOfX}
          opacitySide={opacitySide}
        />

        {/* Render Custom Overlay (before elements) */}
        {onRenderOverlay && onRenderOverlay(toPixel)}

        {/* Render Supports */}
        <SupportsVisual
          activeSupports={activeSupports}
          toPixel={toPixel}
          highlightedSupportId={highlightedSupportId}
          yBeam={yBeam}
          length={length}
          showSupportLetters={showSupportLetters}
          supportIdToLetter={supportIdToLetter}
          customSupportType={customSupportType}
          getOpacity={getOpacity}
        />

        {/* Render Internal Releases */}
        <ReleasesVisual
          activeReleases={activeReleases}
          toPixel={toPixel}
          highlightedReleaseId={highlightedReleaseId}
          yBeam={yBeam}
          getOpacity={getOpacity}
        />

        {/* Render Applied Loads */}
        <LoadsVisual
          activeLoads={activeLoads}
          toPixel={toPixel}
          highlightedLoadId={highlightedLoadId}
          yBeam={yBeam}
          opacityRightOfX={opacityRightOfX}
          opacitySide={opacitySide}
          getOpacity={getOpacity}
        />

        {/* Render reaction vectors if solver output is supplied */}
        {customReactions && (
          <ReactionsVisual
            customReactions={customReactions}
            activeSupports={activeSupports}
            toPixel={toPixel}
            yBeam={yBeam}
            supportIdToLetter={supportIdToLetter}
            getOpacity={getOpacity}
          />
        )}
      </svg>
    </div>
  );
};
