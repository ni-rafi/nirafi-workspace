import React from 'react';
import { EarthworkSpec } from '../types/earthworkSchema';
import { computeEarthworkRegions } from '../engines/cutFillPolygonEngine';
import { EGLProfileLine } from './atoms/earthwork/EGLProfileLine';
import { CutFillShading } from './atoms/earthwork/CutFillShading';
import { TrenchWorkingSpace } from './atoms/earthwork/TrenchWorkingSpace';

interface EarthworkProfileCanvasProps {
  spec: EarthworkSpec;
  scaleFactor?: number; // scale divisor for Shoelace area calculation
  showLabels?: boolean;
}

export const EarthworkProfileCanvas: React.FC<EarthworkProfileCanvasProps> = ({
  spec,
  scaleFactor = 1000000, // default to mm² to m² conversion
  showLabels = true,
}) => {
  const {
    eglPoints,
    formationLevel,
    formationWidth,
    sideSlopeCutRatio,
    sideSlopeFillRatio,
    workingSpaceAllowance,
    isTrenchExcavation = false,
  } = spec;

  // 1. Calculate Cut/Fill Regions using engine
  const regions = computeEarthworkRegions(
    eglPoints,
    formationLevel,
    formationWidth,
    sideSlopeCutRatio,
    sideSlopeFillRatio,
    isTrenchExcavation
  );

  // 2. Compute dynamic SVG Viewport Box
  if (eglPoints.length < 2) return null;
  const xCoords = eglPoints.map(p => p.x);
  const yCoords = eglPoints.map(p => p.y);

  const minX = Math.min(...xCoords);
  const maxX = Math.max(...xCoords);
  const minY = Math.min(...yCoords, formationLevel);
  const maxY = Math.max(...yCoords, formationLevel);

  const dx = maxX - minX;
  const dy = maxY - minY;

  const viewBox = `${minX - 100} ${minY - 120} ${dx + 200} ${dy + 250}`;

  const totalCut = regions.filter(r => r.type === 'cut').reduce((sum, r) => sum + r.area, 0) / scaleFactor;
  const totalFill = regions.filter(r => r.type === 'fill').reduce((sum, r) => sum + r.area, 0) / scaleFactor;

  return (
    <div className="w-full rounded-xl border border-foreground/10 bg-background/50 p-4 shadow-sm backdrop-blur-md">
      <div className="mb-2 flex items-center justify-between">
        <h4 className="text-sm font-semibold tracking-wide text-foreground/80">
          Earthwork Cut & Fill Profile Analyzer
        </h4>
        <div className="flex gap-3 text-[10px] font-mono">
          <span className="rounded bg-red-500/10 px-1.5 py-0.5 text-red-600 dark:text-red-400 font-semibold">
            Cut: {totalCut.toFixed(2)} m²
          </span>
          <span className="rounded bg-emerald-500/10 px-1.5 py-0.5 text-emerald-600 dark:text-emerald-400 font-semibold">
            Fill: {totalFill.toFixed(2)} m²
          </span>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-lg bg-muted/10 border border-foreground/5 p-2">
        <svg viewBox={viewBox} className="w-full select-none" style={{ maxHeight: '380px' }}>
          {/* A. Reference Grid Background Line */}
          <line
            x1={minX - 50}
            y1={formationLevel}
            x2={maxX + 50}
            y2={formationLevel}
            className="stroke-foreground/10 stroke-[0.75]"
            strokeDasharray="4,4"
          />

          {/* B. Cut & Fill Shaded Polygons */}
          <CutFillShading regions={regions} scaleFactor={scaleFactor} showLabels={showLabels} />

          {/* C. Existing Ground Line (EGL) */}
          <EGLProfileLine eglPoints={eglPoints} />

          {/* D. Design Formation level Bed line */}
          {!isTrenchExcavation && (
            <g>
              {/* Formation Base Bed */}
              <line
                x1={(minX + maxX) / 2 - formationWidth / 2}
                y1={formationLevel}
                x2={(minX + maxX) / 2 + formationWidth / 2}
                y2={formationLevel}
                className="stroke-indigo-600 dark:stroke-indigo-400 stroke-[3]"
              />
              <text
                x={(minX + maxX) / 2}
                y={formationLevel - 10}
                textAnchor="middle"
                fontSize="8"
                fontWeight="700"
                className="fill-indigo-600 dark:fill-indigo-400 font-sans"
              >
                FL = {formationLevel.toFixed(0)}
              </text>
            </g>
          )}

          {/* E. Trench Excavation detail and struts (if flagged) */}
          {isTrenchExcavation && (
            <TrenchWorkingSpace
              formationLevel={formationLevel}
              formationWidth={formationWidth}
              workingSpaceAllowance={workingSpaceAllowance}
              isTrenchExcavation={isTrenchExcavation}
            />
          )}
        </svg>
      </div>
    </div>
  );
};
