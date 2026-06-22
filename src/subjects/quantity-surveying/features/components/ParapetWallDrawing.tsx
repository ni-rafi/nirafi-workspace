import React from 'react';

interface ParapetWallDrawingProps {
  activeHighlight?: 'coping' | 'masonry' | 'slab' | 'none';
  className?: string;
}

export const ParapetWallDrawing: React.FC<ParapetWallDrawingProps> = ({
  activeHighlight = 'none',
  className = '',
}) => {
  const isCoping = activeHighlight === 'coping';
  const isMasonry = activeHighlight === 'masonry';
  const isSlab = activeHighlight === 'slab';

  return (
    <div className={`w-full flex flex-col items-center justify-center p-4 bg-muted/10 rounded-xl border border-border/30 ${className}`}>
      <span className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground mb-3">
        Cross-Sectional Elevation: Roof Parapet
      </span>
      <div className="w-full max-w-[280px] aspect-[1/1] bg-background rounded-lg border border-border/20 p-2 relative overflow-hidden flex items-center justify-center">
        <svg viewBox="0 0 300 300" className="w-full h-full select-none overflow-visible">
          {/* Main Roof Slab (Bottom Box) */}
          <rect
            x="30"
            y="210"
            width="240"
            height="50"
            className={`transition-colors duration-300 ${
              isSlab
                ? 'fill-blue-500/20 stroke-blue-500 stroke-2'
                : 'fill-muted/30 stroke-border/40'
            }`}
          />
          <text x="150" y="240" textAnchor="middle" className={`text-[10px] font-mono font-bold transition-colors ${isSlab ? 'fill-blue-500 font-extrabold' : 'fill-muted-foreground'}`}>
            Roof Slab (Thickness = 125mm)
          </text>

          {/* Parapet Masonry Wall (Middle Box) */}
          <rect
            x="60"
            y="70"
            width="80"
            height="140"
            className={`transition-colors duration-300 ${
              isMasonry
                ? 'fill-amber-500/20 stroke-amber-500 stroke-2'
                : 'fill-muted/10 stroke-border/40'
            }`}
          />
          {/* Brick lines patterns in the masonry wall */}
          <g opacity={isMasonry ? 0.6 : 0.2} className="stroke-foreground/30" strokeWidth="0.5">
            <line x1="60" y1="90" x2="140" y2="90" />
            <line x1="60" y1="110" x2="140" y2="110" />
            <line x1="60" y1="130" x2="140" y2="130" />
            <line x1="60" y1="150" x2="140" y2="150" />
            <line x1="60" y1="170" x2="140" y2="170" />
            <line x1="60" y1="190" x2="140" y2="190" />
            <line x1="85" y1="70" x2="85" y2="90" />
            <line x1="115" y1="70" x2="115" y2="90" />
            <line x1="100" y1="90" x2="100" y2="110" />
            <line x1="85" y1="110" x2="85" y2="130" />
            <line x1="115" y1="110" x2="115" y2="130" />
            <line x1="100" y1="130" x2="100" y2="150" />
            <line x1="85" y1="150" x2="85" y2="170" />
            <line x1="115" y1="150" x2="115" y2="170" />
            <line x1="100" y1="170" x2="100" y2="190" />
            <line x1="85" y1="190" x2="85" y2="210" />
            <line x1="115" y1="190" x2="115" y2="210" />
          </g>
          <text x="100" y="145" textAnchor="middle" className={`text-[9px] font-bold transition-colors rotate-90 origin-center ${isMasonry ? 'fill-amber-500' : 'fill-muted-foreground'}`}>
            Parapet Brickwork
          </text>

          {/* Concrete Weathering Coping (Top trapezoid) */}
          <polygon
            points="50,70 150,70 135,45 65,45"
            className={`transition-colors duration-300 ${
              isCoping
                ? 'fill-emerald-500/20 stroke-emerald-500 stroke-2'
                : 'fill-muted/40 stroke-border/40'
            }`}
          />
          <text x="100" y="60" textAnchor="middle" className={`text-[9px] font-mono font-bold transition-colors ${isCoping ? 'fill-emerald-500 font-extrabold' : 'fill-muted-foreground'}`}>
            Coping
          </text>

          {/* Dimension Arrows */}
          <g className="stroke-muted-foreground/45 fill-muted-foreground text-[8px] font-mono" strokeWidth="0.5">
            {/* Height of parapet */}
            <line x1="170" y1="70" x2="170" y2="210" />
            <polygon points="170,70 167,76 173,76" />
            <polygon points="170,210 167,204 173,204" />
            <text x="178" y="145" className="stroke-none font-bold" textAnchor="start">Height ~ 1.0m</text>

            {/* Thickness of parapet */}
            <line x1="60" y1="28" x2="140" y2="28" />
            <polygon points="60,28 66,25 66,31" />
            <polygon points="140,28 134,25 134,31" />
            <text x="100" y="22" className="stroke-none font-bold" textAnchor="middle">Width = 125mm (5")</text>
          </g>
        </svg>
      </div>
      <span className="text-[10px] text-muted-foreground text-center mt-2 leading-relaxed">
        Hover/Click structural members to inspect formulas. Parapet walls are estimated volumetric but do not have beam clashing concerns.
      </span>
    </div>
  );
};
