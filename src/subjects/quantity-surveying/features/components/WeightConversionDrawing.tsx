import React, { useContext } from 'react';
import { PresentationContext } from '@/features/presentation/context/PresentationContext';

interface WeightConversionDrawingProps {
  diameterMm: number;
  lengthM: number;
  showAnnotation?: boolean;
}

export const WeightConversionDrawing: React.FC<WeightConversionDrawingProps> = ({
  diameterMm,
  lengthM,
  showAnnotation = true,
}) => {
  const presentation = useContext(PresentationContext);
  const isBlog = presentation?.viewMode === 'blog';

  const containerClasses = isBlog
    ? 'bg-transparent border-none shadow-none p-0 flex flex-col items-center select-none w-full'
    : 'relative border border-border/80 bg-muted/20 dark:bg-muted/5 rounded-xl p-6 flex flex-col items-center shadow-sm select-none w-full h-full justify-center min-h-[300px]';

  // Math calculations
  const d = diameterMm;
  const l = lengthM;
  const unitWeight = (d * d) / 162;
  const totalWeight = unitWeight * l;

  // Visual scaling: map diameter 10mm-25mm to cylinder height 8px-24px
  const minD = 10;
  const maxD = 25;
  const minHeight = 10;
  const maxHeight = 26;

  // Interpolate cylinder height
  const heightRatio = (d - minD) / (maxD - minD || 1);
  const cylinderHeight = minHeight + heightRatio * (maxHeight - minHeight);

  // Rib offsets
  const ribsCount = 12;
  const cylinderX = 60;
  const cylinderY = 90 - cylinderHeight / 2;
  const cylinderWidth = 280;

  return (
    <div className={containerClasses}>
      <span className="text-xs uppercase tracking-wider font-extrabold text-primary mb-3">
        Steel Unit Weight & Tonnage Modeler
      </span>
      <svg
        width="100%"
        height="220"
        viewBox="0 0 400 220"
        className="overflow-visible select-none"
      >
        {/* Draw Cylinder (Rebar Body) */}
        {/* Shadow under rebar for 3D effect */}
        <rect
          x={cylinderX}
          y={cylinderY + cylinderHeight - 2}
          width={cylinderWidth}
          height="4"
          fill="black"
          opacity="0.1"
          rx="2"
        />

        {/* Rebar core cylinder */}
        <rect
          x={cylinderX}
          y={cylinderY}
          width={cylinderWidth}
          height={cylinderHeight}
          fill="currentColor"
          className="text-muted-foreground/60 transition-all duration-300"
          rx={cylinderHeight / 4}
        />

        {/* 3D gradient highlight inside cylinder to make it look round */}
        <rect
          x={cylinderX}
          y={cylinderY}
          width={cylinderWidth}
          height={cylinderHeight / 3}
          fill="white"
          opacity="0.15"
          rx={cylinderHeight / 12}
        />

        {/* Diagonal Ribs (Bridges) for Deformed Bar look */}
        {Array.from({ length: ribsCount }).map((_, idx) => {
          const xOffset = cylinderX + 15 + idx * (cylinderWidth / (ribsCount + 0.5));
          return (
            <path
              key={idx}
              d={`M ${xOffset},${cylinderY - 1.5} L ${xOffset + 8},${cylinderY + cylinderHeight + 1.5}`}
              stroke="currentColor"
              strokeWidth="2.2"
              fill="none"
              className="text-foreground/35 transition-all duration-300"
            />
          );
        })}

        {/* Longitudinal rib lines (Standard rebar has two side ridges) */}
        <line
          x1={cylinderX}
          y1={cylinderY + cylinderHeight / 2}
          x2={cylinderX + cylinderWidth}
          y2={cylinderY + cylinderHeight / 2}
          stroke="currentColor"
          strokeWidth="1.2"
          className="text-foreground/25"
        />

        {/* Annotations */}
        {showAnnotation && (
          <g className="font-mono text-[9px] fill-muted-foreground">
            {/* Dimension Line for diameter */}
            <path d={`M ${cylinderX - 10},${cylinderY} L ${cylinderX - 25},${cylinderY}`} stroke="currentColor" strokeWidth="0.5" />
            <path d={`M ${cylinderX - 10},${cylinderY + cylinderHeight} L ${cylinderX - 25},${cylinderY + cylinderHeight}`} stroke="currentColor" strokeWidth="0.5" />
            <path d={`M ${cylinderX - 18},${cylinderY} L ${cylinderX - 18},${cylinderY + cylinderHeight}`} stroke="currentColor" strokeWidth="0.5" />
            <text x={cylinderX - 22} y={cylinderY + cylinderHeight / 2 + 3} textAnchor="end" className="font-bold fill-foreground">
              D = {d}mm
            </text>

            {/* Length Annotation */}
            <path d={`M ${cylinderX},${cylinderY + cylinderHeight + 10} L ${cylinderX},${cylinderY + cylinderHeight + 25}`} stroke="currentColor" strokeWidth="0.5" />
            <path d={`M ${cylinderX + cylinderWidth},${cylinderY + cylinderHeight + 10} L ${cylinderX + cylinderWidth},${cylinderY + cylinderHeight + 25}`} stroke="currentColor" strokeWidth="0.5" />
            <path d={`M ${cylinderX},${cylinderY + cylinderHeight + 20} L ${cylinderX + cylinderWidth},${cylinderY + cylinderHeight + 20}`} stroke="currentColor" strokeWidth="0.5" />
            <polygon points={`${cylinderX},${cylinderY + cylinderHeight + 20} ${cylinderX + 5},${cylinderY + cylinderHeight + 17} ${cylinderX + 5},${cylinderY + cylinderHeight + 23}`} fill="currentColor" />
            <polygon points={`${cylinderX + cylinderWidth},${cylinderY + cylinderHeight + 20} ${cylinderX + cylinderWidth - 5},${cylinderY + cylinderHeight + 17} ${cylinderX + cylinderWidth - 5},${cylinderY + cylinderHeight + 23}`} fill="currentColor" />
            <text x={cylinderX + cylinderWidth / 2} y={cylinderY + cylinderHeight + 16} textAnchor="middle" className="font-bold fill-foreground">
              Total Length (L): {l.toFixed(2)}m
            </text>

            {/* Unit weight calculation balloon */}
            <g transform="translate(60, 140)">
              <rect x="0" y="0" width="280" height="42" fill="var(--chart-1-opacity, rgba(var(--chart-1), 0.1))" stroke="var(--chart-1)" strokeWidth="0.5" rx="5" className="fill-muted/40" />
              {/* Unit Weight */}
              <text x="140" y="15" textAnchor="middle" className="fill-foreground font-bold">
                Unit Weight = {d}² / 162 = <span className="fill-primary font-black font-mono">{unitWeight.toFixed(3)} kg/m</span>
              </text>
              {/* Total Weight */}
              <text x="140" y="32" textAnchor="middle" className="fill-foreground font-bold">
                Total Weight = {unitWeight.toFixed(3)} kg/m × {l.toFixed(2)}m = <span className="fill-primary font-black font-mono text-xs">{totalWeight.toFixed(3)} kg</span>
              </text>
            </g>
          </g>
        )}
      </svg>
    </div>
  );
};

export default WeightConversionDrawing;
