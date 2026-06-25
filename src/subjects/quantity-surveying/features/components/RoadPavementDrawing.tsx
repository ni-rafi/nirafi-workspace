import React, { useContext } from 'react';
import { PresentationContext } from '@/features/presentation/context/PresentationContext';

interface RoadPavementDrawingProps {
  activeHighlight?: 'none' | 'subgrade' | 'sub-base' | 'base' | 'surface';
  className?: string;
  showAnnotation?: boolean;
}

export const RoadPavementDrawing: React.FC<RoadPavementDrawingProps> = ({
  activeHighlight = 'none',
  className = '',
  showAnnotation = true,
}) => {
  const presentation = useContext(PresentationContext);
  const isBlog = presentation?.viewMode === 'blog';

  const containerClasses = isBlog
    ? 'bg-transparent border-none shadow-none p-0 flex flex-col items-center select-none w-full'
    : `relative border border-border/80 bg-muted/20 dark:bg-muted/5 rounded-xl p-1 flex flex-col items-center shadow-sm select-none w-full justify-center ${className}`;

  const isSubgradeActive = activeHighlight === 'none' || activeHighlight === 'subgrade';
  const isSubBaseActive = activeHighlight === 'none' || activeHighlight === 'sub-base';
  const isBaseActive = activeHighlight === 'none' || activeHighlight === 'base';
  const isSurfaceActive = activeHighlight === 'none' || activeHighlight === 'surface';
  const hasHighlight = activeHighlight !== 'none';

  return (
    <div className={containerClasses}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 540 180"
        className="overflow-visible select-none max-h-[140px]"
      >
        {/* Layer 1: Subgrade (Bottom-most, widest) */}
        <polygon
          points="20,165 430,165 400,125 50,125"
          fill="var(--muted-foreground-opacity, rgba(120, 120, 120, 0.15))"
          stroke={activeHighlight === 'subgrade' ? 'var(--chart-3)' : 'currentColor'}
          strokeWidth={activeHighlight === 'subgrade' ? '3' : '1'}
          className="transition-all duration-300"
          opacity={isSubgradeActive ? 1 : 0.15}
        />
        {/* Soil texture for subgrade */}
        {isSubgradeActive && (
          <g fill="currentColor" className="text-muted-foreground/30 transition-opacity duration-300" opacity={hasHighlight ? 1 : 0.6}>
            <circle cx="80" cy="145" r="1.5" />
            <circle cx="160" cy="155" r="1" />
            <circle cx="240" cy="135" r="1.5" />
            <circle cx="320" cy="150" r="1" />
            <circle cx="380" cy="140" r="1.5" />
          </g>
        )}

        {/* Layer 2: Sub-Base (WBM / Brick Soling) */}
        <polygon
          points="50,125 400,125 380,95 70,95"
          fill="var(--chart-2-opacity, rgba(234, 179, 8, 0.15))"
          stroke={activeHighlight === 'sub-base' ? 'var(--chart-2)' : 'currentColor'}
          strokeWidth={activeHighlight === 'sub-base' ? '3' : '1'}
          className="transition-all duration-300"
          opacity={isSubBaseActive ? 1 : 0.15}
        />
        {/* Soling pattern */}
        {isSubBaseActive && (
          <g stroke="currentColor" strokeWidth="0.8" className="text-muted-foreground/40 transition-opacity duration-300">
            <line x1="90" y1="95" x2="90" y2="125" />
            <line x1="150" y1="95" x2="150" y2="125" />
            <line x1="210" y1="95" x2="210" y2="125" />
            <line x1="270" y1="95" x2="270" y2="125" />
            <line x1="330" y1="95" x2="330" y2="125" />
          </g>
        )}

        {/* Layer 3: Base Course (Stone chips) */}
        <polygon
          points="70,95 380,95 360,65 90,65"
          fill="var(--chart-4-opacity, rgba(156, 163, 175, 0.2))"
          stroke={activeHighlight === 'base' ? 'var(--chart-4)' : 'currentColor'}
          strokeWidth={activeHighlight === 'base' ? '3' : '1'}
          className="transition-all duration-300"
          opacity={isBaseActive ? 1 : 0.15}
        />
        {/* Aggregates dots */}
        {isBaseActive && (
          <g fill="currentColor" className="text-muted-foreground/50 transition-opacity duration-300">
            <circle cx="110" cy="80" r="2" />
            <circle cx="180" cy="75" r="2.5" />
            <circle cx="250" cy="82" r="2" />
            <circle cx="310" cy="78" r="2.5" />
          </g>
        )}

        {/* Layer 4: Surface Course (Bituminous wearing carpet) */}
        <polygon
          points="90,65 360,65 350,45 100,45"
          fill="var(--chart-1-opacity, rgba(59, 130, 246, 0.25))"
          stroke={activeHighlight === 'surface' ? 'var(--chart-1)' : 'currentColor'}
          strokeWidth={activeHighlight === 'surface' ? '3' : '1'}
          className="transition-all duration-300"
          opacity={isSurfaceActive ? 1 : 0.15}
        />

        {/* Annotations */}
        {showAnnotation && (
          <g className="font-mono fill-muted-foreground font-bold" style={{ fontSize: '11px' }}>
            {/* Top Width (Surface) */}
            <g opacity={isSurfaceActive ? 1 : 0.15} className="transition-opacity duration-300">
              <line x1="100" y1="35" x2="350" y2="35" stroke="currentColor" strokeWidth="0.5" />
              <path d="M 100,32 V 38 M 350,32 V 38" stroke="currentColor" strokeWidth="0.5" />
              <text x="225" y="30" textAnchor="middle" className="fill-chart-1 font-bold">Surface Course Width = 3.75m</text>
            </g>

            {/* Subgrade Width */}
            <g opacity={isSubgradeActive ? 1 : 0.15} className="transition-opacity duration-300">
              <line x1="20" y1="175" x2="430" y2="175" stroke="currentColor" strokeWidth="0.5" />
              <path d="M 20,172 V 178 M 430,172 V 178" stroke="currentColor" strokeWidth="0.5" />
              <text x="225" y="180" textAnchor="middle" className="fill-foreground font-bold">Subgrade Bed Width = 6.00m</text>
            </g>

            {/* Layer labels on the left/right side */}
            <text x="440" y="58" textAnchor="start" className={`fill-chart-1 ${isSurfaceActive ? 'opacity-100' : 'opacity-15'} transition-all`}>Seal/Tack Coat</text>
            <text x="440" y="83" textAnchor="start" className={`fill-chart-4 ${isBaseActive ? 'opacity-100' : 'opacity-15'} transition-all`}>Base (150mm)</text>
            <text x="440" y="113" textAnchor="start" className={`fill-chart-2 ${isSubBaseActive ? 'opacity-100' : 'opacity-15'} transition-all`}>Sub-base (150mm)</text>
            <text x="440" y="148" textAnchor="start" className={`fill-muted-foreground ${isSubgradeActive ? 'opacity-100' : 'opacity-15'} transition-all`}>Subgrade Bed</text>
          </g>
        )}
      </svg>
    </div>
  );
};

export default RoadPavementDrawing;
