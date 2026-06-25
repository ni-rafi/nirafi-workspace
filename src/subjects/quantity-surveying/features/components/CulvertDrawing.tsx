import React, { useContext } from 'react';
import { PresentationContext } from '@/features/presentation/context/PresentationContext';

interface CulvertDrawingProps {
  mode: 'box' | 'pipe';
  activeHighlight?: 'none' | 'base' | 'walls' | 'deck' | 'void' | 'pipe' | 'cradle' | 'headwall';
  className?: string;
  showAnnotation?: boolean;
}

export const CulvertDrawing: React.FC<CulvertDrawingProps> = ({
  mode,
  activeHighlight = 'none',
  className = '',
  showAnnotation = true,
}) => {
  const presentation = useContext(PresentationContext);
  const isBlog = presentation?.viewMode === 'blog';

  const containerClasses = isBlog
    ? 'bg-transparent border-none shadow-none p-0 flex flex-col items-center select-none w-full'
    : `relative border border-border/80 bg-muted/20 dark:bg-muted/5 rounded-xl p-1.5 flex flex-col items-center shadow-sm select-none w-full justify-center ${className}`;

  const isBoxMode = mode === 'box';

  // Highlights mapping
  const isBaseActive = activeHighlight === 'none' || activeHighlight === 'base';
  const isWallsActive = activeHighlight === 'none' || activeHighlight === 'walls';
  const isDeckActive = activeHighlight === 'none' || activeHighlight === 'deck';
  const isVoidActive = activeHighlight === 'none' || activeHighlight === 'void';

  const isPipeActive = activeHighlight === 'none' || activeHighlight === 'pipe';
  const isCradleActive = activeHighlight === 'none' || activeHighlight === 'cradle';
  const isHeadwallActive = activeHighlight === 'none' || activeHighlight === 'headwall';

  const cx = 225; // center x
  const cy = 100; // center y

  return (
    <div className={containerClasses}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 450 180"
        className="overflow-visible select-none max-h-[140px]"
      >
        {isBoxMode ? (
          /* ==================== BOX CULVERT DRAWING ==================== */
          <g>
            {/* Ground line behind */}
            <line x1="20" y1="130" x2="430" y2="130" stroke="currentColor" strokeWidth="0.8" className="text-muted-foreground/30" strokeDasharray="3,3" />

            {/* Inner Flow Void (Hydraulic Opening) */}
            <rect
              x={cx - 60}
              y={cy - 40}
              width="120"
              height="80"
              fill="var(--chart-2-opacity, rgba(234, 179, 8, 0.15))"
              stroke="var(--chart-2, #eab308)"
              strokeWidth={activeHighlight === 'void' ? '3' : '1'}
              strokeDasharray={activeHighlight === 'void' ? 'none' : '4,2'}
              className="transition-all duration-300"
              opacity={isVoidActive ? 1 : 0.15}
            />
            {isVoidActive && (
              <text x={cx} y={cy + 5} textAnchor="middle" className="fill-chart-2 font-mono text-[10px] font-bold">Hydraulic Void</text>
            )}

            {/* RCC Base Footing Slab */}
            <rect
              x={cx - 85}
              y={cy + 40}
              width="170"
              height="20"
              fill="var(--chart-3-opacity, rgba(239, 68, 68, 0.12))"
              stroke={activeHighlight === 'base' ? 'var(--chart-3)' : 'currentColor'}
              strokeWidth={activeHighlight === 'base' ? '3.5' : '1.8'}
              className="transition-all duration-300"
              opacity={isBaseActive ? 1 : 0.15}
            />

            {/* RCC Vertical Side Walls */}
            {/* Left Wall */}
            <rect
              x={cx - 85}
              y={cy - 40}
              width="25"
              height="80"
              fill="var(--chart-1-opacity, rgba(59, 130, 246, 0.1))"
              stroke={activeHighlight === 'walls' ? 'var(--chart-1)' : 'currentColor'}
              strokeWidth={activeHighlight === 'walls' ? '3.5' : '1.8'}
              className="transition-all duration-300"
              opacity={isWallsActive ? 1 : 0.15}
            />
            {/* Right Wall */}
            <rect
              x={cx + 60}
              y={cy - 40}
              width="25"
              height="80"
              fill="var(--chart-1-opacity, rgba(59, 130, 246, 0.1))"
              stroke={activeHighlight === 'walls' ? 'var(--chart-1)' : 'currentColor'}
              strokeWidth={activeHighlight === 'walls' ? '3.5' : '1.8'}
              className="transition-all duration-300"
              opacity={isWallsActive ? 1 : 0.15}
            />

            {/* RCC Top Deck Slab */}
            <rect
              x={cx - 85}
              y={cy - 60}
              width="170"
              height="20"
              fill="var(--chart-4-opacity, rgba(156, 163, 175, 0.12))"
              stroke={activeHighlight === 'deck' ? 'var(--chart-4)' : 'currentColor'}
              strokeWidth={activeHighlight === 'deck' ? '3.5' : '1.8'}
              className="transition-all duration-300"
              opacity={isDeckActive ? 1 : 0.15}
            />

            {/* Annotations */}
            {showAnnotation && (
              <g className="font-mono fill-muted-foreground font-bold" style={{ fontSize: '11px' }}>
                {/* Span */}
                <g opacity={isVoidActive ? 1 : 0.15} className="transition-opacity duration-300">
                  <line x1={cx - 60} y1={cy + 25} x2={cx + 60} y2={cy + 25} stroke="currentColor" strokeWidth="0.5" />
                  <path d={`M ${cx - 60},${cy + 22} V ${cy + 28} M ${cx + 60},${cy + 22} V ${cy + 28}`} stroke="currentColor" strokeWidth="0.5" />
                  <text x={cx} y={cy + 21} textAnchor="middle" className="fill-chart-2">Void Span (S) = 1.2m</text>
                </g>

                {/* Slab thickness */}
                <g opacity={isDeckActive ? 1 : 0.15} className="transition-opacity duration-300">
                  <text x={cx} y={cy - 48} textAnchor="middle" className="fill-chart-4">Top Deck (200mm)</text>
                </g>
                <g opacity={isBaseActive ? 1 : 0.15} className="transition-opacity duration-300">
                  <text x={cx} y={cy + 52} textAnchor="middle" className="fill-chart-3">Base Raft (200mm)</text>
                </g>
                <g opacity={isWallsActive ? 1 : 0.15} className="transition-opacity duration-300">
                  <text x={cx - 105} y={cy + 4} textAnchor="end" className="fill-chart-1">Wall (250mm)</text>
                </g>
              </g>
            )}
          </g>
        ) : (
          /* ==================== PIPE CULVERT DRAWING ==================== */
          <g>
            {/* Ground Line */}
            <line x1="20" y1={cy + 40} x2="430" y2={cy + 40} stroke="currentColor" strokeWidth="0.8" className="text-muted-foreground/30" strokeDasharray="3,3" />

            {/* Cradle Bedding Concrete (Curved block at bottom) */}
            <path
              d={`
                M ${cx - 60},${cy + 40} 
                H ${cx + 60} 
                V ${cy} 
                A 60,60 0 0,1 ${cx - 60},${cy} 
                Z
              `}
              fill="var(--chart-2-opacity, rgba(234, 179, 8, 0.12))"
              stroke={activeHighlight === 'cradle' ? 'var(--chart-2)' : 'currentColor'}
              strokeWidth={activeHighlight === 'cradle' ? '3.5' : '1.8'}
              className="transition-all duration-300"
              opacity={isCradleActive ? 1 : 0.15}
            />

            {/* Hume Pipe (Outer circle and Inner circle) */}
            <g opacity={isPipeActive ? 1 : 0.15} className="transition-all duration-300">
              <circle
                cx={cx}
                cy={cy - 10}
                r="50"
                fill="var(--chart-1-opacity, rgba(59, 130, 246, 0.08))"
                stroke={activeHighlight === 'pipe' ? 'var(--chart-1)' : 'currentColor'}
                strokeWidth={activeHighlight === 'pipe' ? '4' : '2.5'}
              />
              <circle
                cx={cx}
                cy={cy - 10}
                r="40"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray="4,2"
              />
            </g>

            {/* Headwalls (Masonry block representation at sides) */}
            <g opacity={isHeadwallActive ? 1 : 0.15} className="transition-opacity duration-300">
              <rect x={cx - 100} y={cy - 50} width="20" height="90" fill="var(--chart-3-opacity, rgba(239, 68, 68, 0.15))" stroke={activeHighlight === 'headwall' ? 'var(--chart-3)' : 'currentColor'} strokeWidth="1.5" />
              <rect x={cx + 80} y={cy - 50} width="20" height="90" fill="var(--chart-3-opacity, rgba(239, 68, 68, 0.15))" stroke={activeHighlight === 'headwall' ? 'var(--chart-3)' : 'currentColor'} strokeWidth="1.5" />
            </g>

            {/* Annotations */}
            {showAnnotation && (
              <g className="font-mono fill-muted-foreground font-bold" style={{ fontSize: '11px' }}>
                {/* Pipe Orifice Dia */}
                <g opacity={isPipeActive ? 1 : 0.15} className="transition-opacity duration-300">
                  <line x1={cx - 40} y1={cy - 10} x2={cx + 40} y2={cy - 10} stroke="currentColor" strokeWidth="0.5" />
                  <path d={`M ${cx - 40},${cy - 13} V ${cy - 7} M ${cx + 40},${cy - 13} V ${cy - 7}`} stroke="currentColor" strokeWidth="0.5" />
                  <text x={cx} y={cy - 16} textAnchor="middle" className="fill-chart-1 font-extrabold">NP3 Hume Pipe (⌀900mm)</text>
                </g>

                {/* Cradle Bedding label */}
                <g opacity={isCradleActive ? 1 : 0.15} className="transition-opacity duration-300">
                  <text x={cx} y={cy + 30} textAnchor="middle" className="fill-chart-2">Cradle Bedding Concrete</text>
                </g>

                {/* Headwalls */}
                <g opacity={isHeadwallActive ? 1 : 0.15} className="transition-opacity duration-300">
                  <text x={cx - 105} y={cy - 15} textAnchor="end" className="fill-chart-3">Brick Headwall</text>
                  <text x={cx + 105} y={cy - 15} textAnchor="start" className="fill-chart-3">Brick Headwall</text>
                </g>
              </g>
            )}
          </g>
        )}
      </svg>
    </div>
  );
};

export default CulvertDrawing;
