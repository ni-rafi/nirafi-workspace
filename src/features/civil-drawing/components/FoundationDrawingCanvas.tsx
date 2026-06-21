import React from 'react';
import { FoundationSpec } from '../types/foundationSchema';
import { PileLayoutPlan } from './atoms/foundations/PileLayoutPlan';
import { PileSectionDetail } from './atoms/foundations/PileSectionDetail';
import { FoundationRebarGrid } from './atoms/foundations/FoundationRebarGrid';

interface FoundationDrawingCanvasProps {
  spec: FoundationSpec;
  activeView?: 'all' | 'plan' | 'section';
}

export const FoundationDrawingCanvas: React.FC<FoundationDrawingCanvasProps> = ({
  spec,
  activeView = 'all',
}) => {
  const {
    pileCount,
    pileDiameter,
    pileDepth,
    capWidth,
    capDepth,
    clearCover,
    spacingFactor = 2.5,
    customPilePositions,
    capRebar,
  } = spec;

  // Layout spacing configurations
  const sectionOffsetY = capDepth + 600; // Y spacing between Plan and Section views

  // Calculate dynamic viewBox
  const padding = 300;
  const planWidth = capWidth + padding * 2;
  const planHeight = capDepth + padding * 2;
  const sectionHeight = capDepth + pileDepth + padding * 2;

  let viewBox = '';
  let svgHeight = 450;

  if (activeView === 'plan') {
    viewBox = `${-planWidth / 2} ${-planHeight / 2} ${planWidth} ${planHeight}`;
    svgHeight = 350;
  } else if (activeView === 'section') {
    viewBox = `${-planWidth / 2} -100 ${planWidth} ${sectionHeight}`;
    svgHeight = 350;
  } else {
    // Both views stacked
    const totalHeight = planHeight + sectionHeight + 300;
    viewBox = `${-planWidth / 2} ${-planHeight / 2} ${planWidth} ${totalHeight}`;
    svgHeight = 600;
  }

  return (
    <div className="w-full rounded-xl border border-foreground/10 bg-background/50 p-4 shadow-sm backdrop-blur-md">
      <div className="mb-2 flex items-center justify-between">
        <h4 className="text-sm font-semibold tracking-wide text-foreground/80">
          Foundation Structural Drawing: {pileCount}-Pile Cap
        </h4>
        <div className="flex gap-4 font-mono text-[10px] text-muted-foreground">
          <span>Cap: {capWidth}x{capWidth}x{capDepth}mm</span>
          <span>Piles: Ø{pileDiameter}x{pileDepth}mm</span>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-lg bg-muted/10 border border-foreground/5 p-2">
        <svg
          viewBox={viewBox}
          className="w-full select-none"
          style={{ maxHeight: `${svgHeight}px` }}
        >
          {/* DEFINITIONS FOR DYNAMIC PATTERNS */}
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 2 L 10 5 L 0 8 z" className="fill-foreground/45" />
            </marker>
          </defs>

          {/* 1. PLAN VIEW */}
          {(activeView === 'all' || activeView === 'plan') && (
            <g>
              <PileLayoutPlan
                pileCount={pileCount}
                pileDiameter={pileDiameter}
                capWidth={capWidth}
                capDepth={capWidth} // Cap is square in plan view
                spacingFactor={spacingFactor}
                customPilePositions={customPilePositions}
              />
              {/* Text label */}
              <text x={-capWidth / 2} y={-capWidth / 2 - 30} className="fill-foreground/75 font-semibold text-[32px]">
                PLAN VIEW
              </text>
              {/* Dimensions */}
              <line x1={-capWidth / 2} y1={capWidth / 2 + 50} x2={capWidth / 2} y2={capWidth / 2 + 50} className="stroke-foreground/30" strokeWidth="1.5" markerStart="url(#arrow)" markerEnd="url(#arrow)" />
              <text x="0" y={capWidth / 2 + 100} textAnchor="middle" className="fill-foreground/60 font-mono text-[24px]">
                {capWidth} mm
              </text>
            </g>
          )}

          {/* 2. PROJECTION GUIDES */}
          {activeView === 'all' && (
            <g className="stroke-foreground/10 stroke-[0.75] stroke-dasharray-[4,4]">
              {/* Projection lines from plan outer corners to section outer corners */}
              <line x1={-capWidth / 2} y1={capWidth / 2} x2={-capWidth / 2} y2={sectionOffsetY} strokeDasharray="4,4" />
              <line x1={capWidth / 2} y1={capWidth / 2} x2={capWidth / 2} y2={sectionOffsetY} strokeDasharray="4,4" />
            </g>
          )}

          {/* 3. SECTION PROFILE ELEVATION */}
          {(activeView === 'all' || activeView === 'section') && (
            <g transform={`translate(0, ${activeView === 'all' ? sectionOffsetY : 0})`}>
              <PileSectionDetail
                pileCount={pileCount}
                pileDiameter={pileDiameter}
                pileDepth={pileDepth}
                capWidth={capWidth}
                capDepth={capDepth}
                spacingFactor={spacingFactor}
                customPilePositions={customPilePositions}
              />
              <FoundationRebarGrid
                capWidth={capWidth}
                capDepth={capDepth}
                clearCover={clearCover}
                pileCount={pileCount}
                pileDiameter={pileDiameter}
                spacingFactor={spacingFactor}
                customPilePositions={customPilePositions}
                rebar={capRebar}
              />
              {/* Section Header Label */}
              <text x={-capWidth / 2} y={-40} className="fill-foreground/75 font-semibold text-[32px]">
                CROSS-SECTION DETAIL
              </text>
              {/* Height dimension */}
              <line x1={capWidth / 2 + 50} y1={0} x2={capWidth / 2 + 50} y2={capDepth} className="stroke-foreground/30" strokeWidth="1.5" markerStart="url(#arrow)" markerEnd="url(#arrow)" />
              <text x={capWidth / 2 + 100} y={capDepth / 2} dominantBaseline="middle" className="fill-foreground/60 font-mono text-[24px]">
                H = {capDepth} mm
              </text>
            </g>
          )}
        </svg>
      </div>
    </div>
  );
};
