import React, { useContext } from 'react';
import { PresentationContext } from '@/features/presentation/context/PresentationContext';

interface HookCrankDrawingProps {
  diameterMm: number;
  effectiveDepthM: number;
  showAnnotation?: boolean;
  activeHighlight?: 'none' | 'hook' | 'crank';
}

export const HookCrankDrawing: React.FC<HookCrankDrawingProps> = ({
  diameterMm,
  effectiveDepthM,
  showAnnotation = true,
  activeHighlight = 'none',
}) => {
  const presentation = useContext(PresentationContext);
  const isBlog = presentation?.viewMode === 'blog';

  const containerClasses = isBlog
    ? 'bg-transparent border-none shadow-none p-0 flex flex-col items-center select-none w-full'
    : 'relative border border-border/80 bg-muted/20 dark:bg-muted/5 rounded-xl p-6 flex flex-col items-center shadow-sm select-none w-full h-full justify-center min-h-[300px]';

  // Calculations for display
  const d = diameterMm;
  const D = effectiveDepthM; // in meters
  const D_mm = Math.round(D * 1000);

  const hookAdditionSingle = (9 * d) / 1000; // in meters
  const hookAdditionTotal = hookAdditionSingle * 2;
  const crankAdditionSingle = 0.42 * D; // in meters
  const crankAdditionTotal = crankAdditionSingle * 2;

  const isHookHighlighted = activeHighlight === 'hook' || activeHighlight === 'none';
  const isCrankHighlighted = activeHighlight === 'crank' || activeHighlight === 'none';

  return (
    <div className={containerClasses}>
      <span className="text-xs uppercase tracking-wider font-extrabold text-primary mb-3">
        BBS Rebar Bending Geometry
      </span>
      <svg
        width="100%"
        height="240"
        viewBox="0 0 450 240"
        className="overflow-visible select-none"
      >
        {/* Draw Hook Diagram (Top half) */}
        <g transform="translate(10, 10)">
          {/* Section Label */}
          <text x="10" y="15" className="fill-muted-foreground font-sans text-[10px] font-bold">
            180° Anchor Hook (Standard +9d addition per hook)
          </text>

          {/* Core Hook bar */}
          <path
            d="M 50,45 L 350,45 A 12,12 0 0,0 362,33 L 362,25"
            fill="none"
            stroke={isHookHighlighted ? 'var(--chart-1)' : 'currentColor'}
            strokeWidth={isHookHighlighted ? '3.5' : '2'}
            className="transition-all duration-300"
          />
          {/* Tiny hook start (left) */}
          <path
            d="M 50,45 A 12,12 0 0,1 38,33 L 38,25"
            fill="none"
            stroke={isHookHighlighted ? 'var(--chart-1)' : 'currentColor'}
            strokeWidth={isHookHighlighted ? '3.5' : '2'}
            className="transition-all duration-300"
          />

          {/* Hook Annotations */}
          {showAnnotation && (
            <g className="font-mono text-[9px] fill-muted-foreground">
              {/* Diameter label */}
              <text x="200" y="40" textAnchor="middle" className="font-bold">
                Bar Diameter (d): {d}mm
              </text>

              {/* Hook Addition Left */}
              <path d="M 38,25 L 38,15" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,2" />
              <path d="M 50,45 L 50,15" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,2" />
              <path d="M 38,18 L 50,18" stroke="currentColor" strokeWidth="0.5" />
              <text x="44" y="12" textAnchor="middle" className="fill-chart-1 font-bold">
                +9d
              </text>

              {/* Hook Addition Right */}
              <path d="M 350,45 L 350,15" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,2" />
              <path d="M 362,25 L 362,15" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,2" />
              <path d="M 350,18 L 362,18" stroke="currentColor" strokeWidth="0.5" />
              <text x="356" y="12" textAnchor="middle" className="fill-chart-1 font-bold">
                +9d
              </text>

              {/* Result Badge */}
              <rect x="120" y="60" width="160" height="18" fill="var(--chart-1-opacity, rgba(var(--chart-1), 0.1))" stroke="var(--chart-1)" strokeWidth="0.5" rx="3" className="fill-muted/40" />
              <text x="200" y="72" textAnchor="middle" className="fill-foreground font-bold">
                Total Add = +18d = {hookAdditionTotal.toFixed(3)}m
              </text>
            </g>
          )}
        </g>

        {/* Draw Cranked Bar Diagram (Bottom half) */}
        <g transform="translate(10, 110)">
          {/* Section Label */}
          <text x="10" y="15" className="fill-muted-foreground font-sans text-[10px] font-bold">
            45° Cranked Slab Bar (+0.42D addition per bend)
          </text>

          {/* Slab bounds (dashed grey lines) */}
          <line x1="40" y1="35" x2="360" y2="35" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4,4" className="text-muted-foreground/30" />
          <line x1="40" y1="75" x2="360" y2="75" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4,4" className="text-muted-foreground/30" />

          {/* Cranked Bar */}
          <path
            d="M 50,70 L 120,70 L 155,40 L 280,40 L 315,70 L 350,70"
            fill="none"
            stroke={isCrankHighlighted ? 'var(--chart-2)' : 'currentColor'}
            strokeWidth={isCrankHighlighted ? '3.5' : '2'}
            className="transition-all duration-300"
          />

          {/* Angles */}
          <path d="M 127,70 A 7,7 0 0,0 132,65" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <text x="140" y="74" className="font-mono text-[7px] fill-muted-foreground">45°</text>

          {/* Crank Annotations */}
          {showAnnotation && (
            <g className="font-mono text-[9px] fill-muted-foreground">
              {/* Effective depth D */}
              <line x1="200" y1="40" x2="200" y2="70" stroke="var(--chart-2)" strokeWidth="1" strokeDasharray="2,2" />
              <path d="M 197,40 L 203,40" stroke="var(--chart-2)" strokeWidth="0.5" />
              <path d="M 197,70 L 203,70" stroke="var(--chart-2)" strokeWidth="0.5" />
              <text x="205" y="58" className="fill-chart-2 font-bold" textAnchor="start">
                D = {D_mm}mm
              </text>

              {/* Slope label */}
              <text x="145" y="50" textAnchor="end" className="text-[7.5px] fill-muted-foreground">
                Slope = 1.42 D
              </text>

              {/* Crank Addition Indicator */}
              <text x="285" y="50" textAnchor="start" className="fill-chart-2 font-bold text-[8px]">
                +0.42 D
              </text>

              {/* Result Badge */}
              <rect x="120" y="85" width="160" height="18" fill="var(--chart-2-opacity, rgba(var(--chart-2), 0.1))" stroke="var(--chart-2)" strokeWidth="0.5" rx="3" className="fill-muted/40" />
              <text x="200" y="97" textAnchor="middle" className="fill-foreground font-bold">
                Total Add = +0.84D = {crankAdditionTotal.toFixed(3)}m
              </text>
            </g>
          )}
        </g>
      </svg>
    </div>
  );
};

export default HookCrankDrawing;
