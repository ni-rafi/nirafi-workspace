import React, { useContext } from 'react';
import { PresentationContext } from '@/features/presentation/context/PresentationContext';

interface StirrupCountingDrawingProps {
  clearSpanM: number;
  spacingM: number;
  showAnnotation?: boolean;
}

export const StirrupCountingDrawing: React.FC<StirrupCountingDrawingProps> = ({
  clearSpanM,
  spacingM,
  showAnnotation = true,
}) => {
  const presentation = useContext(PresentationContext);
  const isBlog = presentation?.viewMode === 'blog';

  const containerClasses = isBlog
    ? 'bg-transparent border-none shadow-none p-0 flex flex-col items-center select-none w-full'
    : 'relative border border-border/80 bg-muted/20 dark:bg-muted/5 rounded-xl p-6 flex flex-col items-center shadow-sm select-none w-full h-full justify-center min-h-[300px]';

  // Math calculations
  const span = clearSpanM;
  const spacing = spacingM;
  const ratio = span / spacing;
  const rawRatio = Math.round(ratio * 100000) / 100000;
  const stirrupCount = span > 0 && spacing > 0 ? Math.floor(rawRatio) + 1 : 0;

  // SVG drawing configuration
  const beamWidth = 280;
  const beamHeight = 40;
  const beamX = 60;
  const beamY = 80;

  // Generate stirrup coordinates
  const drawnCount = Math.min(stirrupCount, 25); // cap visual lines to prevent lag/clutter
  const stirrupLines: number[] = [];

  if (stirrupCount > 1) {
    const spacingPx = beamWidth / (stirrupCount - 1);
    for (let i = 0; i < drawnCount; i++) {
      // Map index to visually even spaces, or map based on actual ratio
      const index = drawnCount === stirrupCount ? i : Math.round((i / (drawnCount - 1)) * (stirrupCount - 1));
      stirrupLines.push(beamX + index * spacingPx);
    }
  } else if (stirrupCount === 1) {
    stirrupLines.push(beamX);
  }

  return (
    <div className={containerClasses}>
      <span className="text-xs uppercase tracking-wider font-extrabold text-primary mb-3">
        Stirrup Spacing & Counting Mechanism
      </span>
      <svg
        width="100%"
        height="220"
        viewBox="0 0 400 220"
        className="overflow-visible select-none"
      >
        {/* Columns on Left and Right (Grey blocks) */}
        <rect x="10" y="50" width="50" height="100" fill="currentColor" className="text-muted-foreground/20" rx="3" />
        <rect x="340" y="50" width="50" height="100" fill="currentColor" className="text-muted-foreground/20" rx="3" />
        <text x="35" y="105" textAnchor="middle" className="fill-muted-foreground font-mono text-[9px] font-bold">COLUMN</text>
        <text x="365" y="105" textAnchor="middle" className="fill-muted-foreground font-mono text-[9px] font-bold">COLUMN</text>

        {/* Concrete Beam outline (Transparent/Bordered) */}
        <rect
          x={beamX}
          y={beamY}
          width={beamWidth}
          height={beamHeight}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-foreground/75"
        />
        {/* Main longitudinal top & bottom bars inside beam */}
        <line x1={beamX - 10} y1={beamY + 6} x2={beamX + beamWidth + 10} y2={beamY + 6} stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground" />
        <line x1={beamX - 10} y1={beamY + beamHeight - 6} x2={beamX + beamWidth + 10} y2={beamY + beamHeight - 6} stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground" />

        {/* Draw Stirrups */}
        {stirrupLines.map((x, idx) => {
          // Highlight the first (+1) stirrup in a separate color (primary) to show it's the start offset
          const isEndOffset = idx === 0;
          return (
            <g key={idx}>
              <line
                x1={x}
                y1={beamY + 2}
                x2={x}
                y2={beamY + beamHeight - 2}
                stroke={isEndOffset ? 'var(--chart-1)' : 'var(--chart-2)'}
                strokeWidth={isEndOffset ? '2.5' : '1.5'}
                className="transition-all duration-300"
              />
              {isEndOffset && showAnnotation && (
                <text x={x} y={beamY - 6} textAnchor="middle" className="fill-chart-1 font-mono text-[7px] font-extrabold animate-bounce">
                  +1 (Start)
                </text>
              )}
            </g>
          );
        })}

        {/* Clear Span Dimension annotations */}
        {showAnnotation && (
          <g className="font-mono text-[9px] fill-muted-foreground">
            {/* Clear Span line */}
            <path d="M 60,135 L 60,150" stroke="currentColor" strokeWidth="0.5" />
            <path d="M 340,135 L 340,150" stroke="currentColor" strokeWidth="0.5" />
            <path d="M 60,145 L 340,145" stroke="currentColor" strokeWidth="0.5" />
            <polygon points="60,145 65,142 65,148" fill="currentColor" />
            <polygon points="340,145 335,142 335,148" fill="currentColor" />
            <text x="200" y="141" textAnchor="middle" className="font-bold fill-foreground">
              Clear Span (L): {span.toFixed(3)}m ({Math.round(span * 1000)}mm)
            </text>

            {/* Spacing dimension (between stirrup 1 and 2 if exists) */}
            {stirrupLines.length > 1 && (() => {
              const s0 = stirrupLines[0] ?? 0;
              const s1 = stirrupLines[1] ?? 0;
              return (
                <g>
                  <path d={`M ${s0},75 L ${s0},60`} stroke="currentColor" strokeWidth="0.5" />
                  <path d={`M ${s1},75 L ${s1},60`} stroke="currentColor" strokeWidth="0.5" />
                  <path d={`M ${s0},65 L ${s1},65`} stroke="currentColor" strokeWidth="0.5" />
                  <text x={(s0 + s1) / 2} y="58" textAnchor="middle" className="font-bold fill-chart-2 text-[8px]">
                    s = {Math.round(spacing * 1000)}mm
                  </text>
                </g>
              );
            })()}

            {/* Formula & Total count display */}
            <rect x="80" y="170" width="240" height="36" fill="var(--chart-2-opacity, rgba(var(--chart-2), 0.1))" stroke="var(--chart-2)" strokeWidth="0.5" rx="5" className="fill-muted/40" />
            <text x="200" y="184" textAnchor="middle" className="fill-foreground font-bold">
              Formula: ({Math.round(span * 1000)} / {Math.round(spacing * 1000)}) + 1
            </text>
            <text x="200" y="198" textAnchor="middle" className="fill-primary font-black text-xs font-mono">
              Total Stirrups = {stirrupCount} Nos.
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};

export default StirrupCountingDrawing;
