import React from 'react';

interface SuperstructureBoundaryDrawingProps {
  activeSection?: 'superstructure' | 'substructure' | 'all';
  className?: string;
}

export const SuperstructureBoundaryDrawing: React.FC<SuperstructureBoundaryDrawingProps> = ({
  activeSection = 'all',
  className = '',
}) => {
  const isSuper = activeSection === 'superstructure' || activeSection === 'all';
  const isSub = activeSection === 'substructure' || activeSection === 'all';

  return (
    <div className={`w-full flex flex-col items-center justify-center p-4 bg-muted/10 rounded-xl border border-border/30 ${className}`}>
      <span className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground mb-3">
        Cross-Sectional Elevation: Plinth Boundary
      </span>
      <div className="w-full max-w-[320px] aspect-[4/3] bg-background rounded-lg border border-border/20 p-2 relative overflow-hidden flex items-center justify-center">
        <svg viewBox="0 0 400 300" className="w-full h-full select-none overflow-visible">
          {/* Ground Grid lines */}
          <line x1="20" y1="180" x2="380" y2="180" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="text-muted-foreground/30" />
          <text x="25" y="174" className="fill-muted-foreground text-[8px] font-mono">EGL (Existing Ground Level)</text>

          {/* Plinth Level Line */}
          <line x1="20" y1="120" x2="380" y2="120" stroke="#f59e0b" strokeWidth="2" strokeDasharray="6 3" />
          <text x="25" y="114" className="fill-amber-500 font-mono text-[9px] font-bold">PLINTH LEVEL (+0.60m)</text>

          {/* Substructure Region Box */}
          <rect
            x="80"
            y="120"
            width="240"
            height="150"
            fill={isSub ? 'url(#subgrade-pattern)' : 'currentColor'}
            className={isSub ? 'stroke-destructive/70 text-muted/10' : 'stroke-border/20 text-muted/5 opacity-20'}
            strokeWidth={isSub ? 2 : 1}
            strokeDasharray={isSub ? 'none' : '3 3'}
          />

          {/* Superstructure Region Box */}
          <rect
            x="80"
            y="30"
            width="240"
            height="90"
            fill={isSuper ? 'url(#brick-pattern)' : 'currentColor'}
            className={isSuper ? 'stroke-primary text-primary/5' : 'stroke-border/20 text-muted/5 opacity-20'}
            strokeWidth={isSuper ? 2 : 1}
            strokeDasharray={isSuper ? 'none' : '3 3'}
          />

          {/* Labels & Overlay Info */}
          {isSuper && (
            <g className="animate-fadeIn">
              <rect x="110" y="45" width="180" height="30" rx="4" className="fill-background/95 stroke-primary/30" strokeWidth="1" />
              <text x="200" y="64" textAnchor="middle" className="fill-primary font-sans text-[10px] font-black uppercase tracking-wider">
                Superstructure Zone
              </text>
            </g>
          )}

          {isSub && (
            <g className="animate-fadeIn">
              <rect x="110" y="185" width="180" height="30" rx="4" className="fill-background/95 stroke-destructive/30" strokeWidth="1" />
              <text x="200" y="204" textAnchor="middle" className="fill-destructive font-sans text-[10px] font-black uppercase tracking-wider">
                Substructure Zone
              </text>
            </g>
          )}

          {/* Patterns definitions */}
          <defs>
            <pattern id="brick-pattern" width="20" height="10" patternUnits="userSpaceOnUse">
              <rect width="20" height="10" className="fill-primary/5" />
              <line x1="0" y1="0" x2="20" y2="0" stroke="currentColor" strokeWidth="0.5" className="text-primary/20" />
              <line x1="0" y1="5" x2="20" y2="5" stroke="currentColor" strokeWidth="0.5" className="text-primary/20" />
              <line x1="5" y1="0" x2="5" y2="5" stroke="currentColor" strokeWidth="0.5" className="text-primary/20" />
              <line x1="15" y1="5" x2="15" y2="10" stroke="currentColor" strokeWidth="0.5" className="text-primary/20" />
            </pattern>

            <pattern id="subgrade-pattern" width="16" height="16" patternUnits="userSpaceOnUse">
              <rect width="16" height="16" className="fill-destructive/5" />
              <path d="M0,16 l16,-16 M-4,4 l8,-8 M12,20 l8,-8" stroke="currentColor" strokeWidth="0.5" className="text-destructive/25" />
            </pattern>
          </defs>
        </svg>
      </div>
      <span className="text-[10px] text-muted-foreground text-center mt-2 leading-relaxed">
        The plinth acts as the physical and mathematical separator between in-ground substructure and above-ground superstructure elements.
      </span>
    </div>
  );
};
