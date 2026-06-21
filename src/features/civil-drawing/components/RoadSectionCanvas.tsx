import React, { useState } from 'react';
import { RoadSectionSpec } from '../types/roadSchema';
import { calculatePavementLayers } from '../engines/pavementProfileEngine';
import { PavementTrapezoid } from './atoms/roads/PavementTrapezoid';
import { RoadDrainageTrench } from './atoms/roads/RoadDrainageTrench';

interface RoadSectionCanvasProps {
  spec: RoadSectionSpec;
}

export const RoadSectionCanvas: React.FC<RoadSectionCanvasProps> = ({ spec }) => {
  const { carriagewayWidth, camberPercentage, layers, shoulder, drainage } = spec;
  const [selectedLayerId, setSelectedLayerId] = useState<string | undefined>(undefined);

  const layerGeoms = calculatePavementLayers(carriagewayWidth, camberPercentage, layers);

  // Compute bounding box limits for dynamic viewBox
  const halfW = carriagewayWidth / 2;
  const shWidth = shoulder ? shoulder.width : 0;
  const drClearance = drainage ? drainage.shoulderClearance : 0;
  const drWidth = drainage ? drainage.width : 0;

  const maxOuterX = halfW + shWidth + drClearance + drWidth + 200;
  const maxDepth = layers.reduce((acc, l) => acc + l.thickness, 0) + (drainage ? drainage.depth : 200) + 150;

  const viewBox = `${-maxOuterX} -250 ${maxOuterX * 2} ${maxDepth + 350}`;

  const activeLayer = layers.find(l => l.id === selectedLayerId);

  return (
    <div className="w-full rounded-xl border border-foreground/10 bg-background/50 p-4 shadow-sm backdrop-blur-md">
      <div className="mb-2 flex items-center justify-between">
        <h4 className="text-sm font-semibold tracking-wide text-foreground/80">
          Highway Cross-Section Profile (Camber: {camberPercentage}%)
        </h4>
        {activeLayer && (
          <div className="rounded border border-primary/20 bg-primary/5 px-2 py-0.5 text-[10px] font-medium text-primary">
            Selected layer: {activeLayer.name} ({activeLayer.thickness}mm)
          </div>
        )}
      </div>

      <div className="relative overflow-hidden rounded-lg bg-muted/10 border border-foreground/5 p-2">
        <svg viewBox={viewBox} className="w-full select-none" style={{ maxHeight: '380px' }}>
          <defs>
            <marker id="arrow-road" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 2 L 10 5 L 0 8 z" className="fill-foreground/40" />
            </marker>
          </defs>

          {/* 1. Centerline Mark ℄ */}
          <line x1="0" y1="-120" x2="0" y2="100" className="stroke-foreground/20 stroke-[1.5]" strokeDasharray="6,4,2,4" />
          <text x="15" y="-100" fontSize="16" fontWeight="bold" className="fill-foreground/45 font-mono">
            ℄ Centerline
          </text>

          {/* 2. Camber Slope Arrows and Text Labels */}
          {/* Left Camber Slope */}
          <line x1={-halfW / 2 + 100} y1={-(halfW / 2) * (camberPercentage / 100) - 40} x2={-halfW / 2 - 100} y2={-(halfW / 2) * (camberPercentage / 100) - 40} className="stroke-foreground/40 stroke-[1.2]" markerEnd="url(#arrow-road)" />
          <text x={-halfW / 2} y={-(halfW / 2) * (camberPercentage / 100) - 60} textAnchor="middle" fontSize="14" fontWeight="600" className="fill-foreground/60 font-mono">
            -{camberPercentage}% Slope
          </text>

          {/* Right Camber Slope */}
          <line x1={halfW / 2 - 100} y1={-(halfW / 2) * (camberPercentage / 100) - 40} x2={halfW / 2 + 100} y2={-(halfW / 2) * (camberPercentage / 100) - 40} className="stroke-foreground/40 stroke-[1.2]" markerEnd="url(#arrow-road)" />
          <text x={halfW / 2} y={-(halfW / 2) * (camberPercentage / 100) - 60} textAnchor="middle" fontSize="14" fontWeight="600" className="fill-foreground/60 font-mono">
            -{camberPercentage}% Slope
          </text>

          {/* 3. Cambered Pavement Layers */}
          <PavementTrapezoid
            layerGeoms={layerGeoms}
            activeLayerId={selectedLayerId}
            onSelectLayer={setSelectedLayerId}
          />

          {/* 4. Side Drainage & Shoulder wedges */}
          <RoadDrainageTrench
            carriagewayWidth={carriagewayWidth}
            camberPercentage={camberPercentage}
            shoulder={shoulder}
            drainage={drainage}
          />

          {/* 5. Dimension Annotation Strings */}
          {/* Carriageway dimension */}
          <g>
            <line x1={-halfW} y1="-180" x2={halfW} y2="-180" className="stroke-foreground/30 stroke-[1.2]" markerStart="url(#arrow-road)" markerEnd="url(#arrow-road)" />
            <text x="0" y="-200" textAnchor="middle" fontSize="14" className="fill-foreground/50 font-mono">
              Carriageway Width: {carriagewayWidth} mm
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
};
