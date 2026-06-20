import React from 'react';
import { IActiveReactionVisual, IActiveLoadVisual } from '../sectionLoadHelper';
import { CutLineVisual } from './CutLineVisual';
import { CutDimensionHelper } from './CutDimensionHelper';
import { InternalActionsVisual } from './InternalActionsVisual';
import { SectionReactionsVisual } from './SectionReactionsVisual';
import { SectionLoadsVisual } from './SectionLoadsVisual';
import { StackedDimensionsVisual } from './StackedDimensionsVisual';

interface SectionOverlayProps {
  cutX: number;
  length: number;
  activeSide: 'left' | 'right';
  activeReactions: IActiveReactionVisual[];
  activeLoadVisuals: IActiveLoadVisual[];
  dimTargets: { x: number; label: string }[];
  yBeam: number;
  reactions: Array<{ supportId: string; type: string; value: number }>;
  toPixel: (x: number) => number;
}

export const SectionOverlay: React.FC<SectionOverlayProps> = ({
  cutX,
  length,
  activeSide,
  activeReactions,
  activeLoadVisuals,
  dimTargets,
  yBeam,
  reactions,
  toPixel,
}) => {
  const sPx = toPixel(0);
  const cutPx = toPixel(cutX);
  const endPxBeam = toPixel(length);

  return (
    <g>
      {/* Dotted Cut Line */}
      <CutLineVisual cutPx={cutPx} yBeam={yBeam} />

      {/* Dimension helper for cut coordinate x / segment length */}
      <CutDimensionHelper
        activeSide={activeSide}
        sPx={sPx}
        cutPx={cutPx}
        endPxBeam={endPxBeam}
        yBeam={yBeam}
        length={length}
        cutX={cutX}
      />

      {/* Cut-face internal actions V and M */}
      <InternalActionsVisual
        activeSide={activeSide}
        cutPx={cutPx}
        yBeam={yBeam}
      />

      {/* Draw active support reaction arrows */}
      <SectionReactionsVisual
        activeReactions={activeReactions}
        reactions={reactions}
        toPixel={toPixel}
        yBeam={yBeam}
      />

      {/* Draw equivalent loads and value labels */}
      <SectionLoadsVisual
        activeLoadVisuals={activeLoadVisuals}
        toPixel={toPixel}
        yBeam={yBeam}
      />

      {/* Stacked moment arms dimension lines */}
      <StackedDimensionsVisual
        dimTargets={dimTargets}
        toPixel={toPixel}
        cutX={cutX}
        yBeam={yBeam}
      />
    </g>
  );
};
