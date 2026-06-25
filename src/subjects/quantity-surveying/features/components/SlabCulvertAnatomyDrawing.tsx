import React, { useContext } from 'react';
import { PresentationContext } from '@/features/presentation/context/PresentationContext';

interface SlabCulvertAnatomyDrawingProps {
  activeHighlight: 'abutment' | 'wingwall' | 'deck' | 'bearing' | 'none';
  className?: string;
}

export const SlabCulvertAnatomyDrawing: React.FC<SlabCulvertAnatomyDrawingProps> = ({
  activeHighlight,
  className = '',
}) => {
  const presentation = useContext(PresentationContext);
  const isBlog = presentation?.viewMode === 'blog';

  const isHighlightActive = (part: typeof activeHighlight) => {
    return activeHighlight === part;
  };

  const containerClasses = isBlog
    ? 'bg-transparent border-none shadow-none p-0 flex flex-col items-center select-none w-full'
    : `relative border border-border/80 bg-muted/20 dark:bg-muted/5 rounded-xl p-1 flex flex-col items-center shadow-sm select-none w-full justify-center ${className}`;

  return (
    <div className={containerClasses}>
      <svg viewBox="0 0 160 210" className="w-full h-full select-none overflow-visible max-h-[220px]">
        {/* ================= SECTION ELEVATION (TOP) ================= */}
        <g>
          <text x="80" y="15" textAnchor="middle" className="fill-muted-foreground font-mono font-bold" style={{ fontSize: '10px' }}>Elevation View</text>
          
          {/* Ground line */}
          <line x1="10" y1="80" x2="150" y2="80" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 3" className="text-muted-foreground/30" />

          {/* Left Footing */}
          <rect x="35" y="75" width="25" height="5" className="fill-muted/20 stroke-border/40" />
          {/* Right Footing */}
          <rect x="100" y="75" width="25" height="5" className="fill-muted/20 stroke-border/40" />

          {/* Left Abutment Wall */}
          <rect
            x="40"
            y="35"
            width="15"
            height="40"
            className={`transition-all duration-300 ${
              isHighlightActive('abutment')
                ? 'fill-indigo-500/20 stroke-indigo-600 stroke-[2px]'
                : 'fill-muted/30 stroke-border/40'
            }`}
          />
          
          {/* Right Abutment Wall */}
          <rect
            x="105"
            y="35"
            width="15"
            height="40"
            className={`transition-all duration-300 ${
              isHighlightActive('abutment')
                ? 'fill-indigo-500/20 stroke-indigo-600 stroke-[2px]'
                : 'fill-muted/30 stroke-border/40'
            }`}
          />

          {/* Deck Slab */}
          <rect
            x="40"
            y="23"
            width="80"
            height="12"
            className={`transition-all duration-300 ${
              isHighlightActive('deck')
                ? 'fill-amber-500/20 stroke-amber-500 stroke-[2px]'
                : 'fill-muted/10 stroke-border/40'
            }`}
          />

          {/* Slab Bearing Zones (Red highlight at joints) */}
          <rect
            x="40"
            y="34.5"
            width="15"
            height="1.5"
            className={`transition-all duration-300 ${
              isHighlightActive('bearing')
                ? 'fill-red-500 stroke-red-600 opacity-100'
                : 'fill-transparent stroke-transparent opacity-0'
            }`}
          />
          <rect
            x="105"
            y="34.5"
            width="15"
            height="1.5"
            className={`transition-all duration-300 ${
              isHighlightActive('bearing')
                ? 'fill-red-500 stroke-red-600 opacity-100'
                : 'fill-transparent stroke-transparent opacity-0'
            }`}
          />

          {/* Elevation Labels */}
          {isHighlightActive('bearing') && (
            <g className="text-red-500 font-bold font-mono animate-fadeIn" style={{ fontSize: '8px' }}>
              <text x="145" y="30" textAnchor="start">Slab Bearing</text>
              <line x1="140" y1="33" x2="115" y2="35" stroke="currentColor" strokeWidth="0.8" />
            </g>
          )}
          <text x="80" y="57" className="fill-muted-foreground font-mono" style={{ fontSize: '8px' }} textAnchor="middle">Water Channel</text>
        </g>

        {/* ================= TOP DOWN PLAN VIEW (BOTTOM) ================= */}
        <g>
          <text x="80" y="103" textAnchor="middle" className="fill-muted-foreground font-mono font-bold" style={{ fontSize: '10px' }}>Plan View</text>
          
          {/* Water Flow Channel Arrow */}
          <path d="M 80,185 L 80,120 M 76,128 L 80,120 L 84,128" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-muted-foreground/30" />
          <text x="85" y="182" className="fill-muted-foreground/40 font-mono" style={{ fontSize: '7px' }}>Water Flow</text>

          {/* Left Abutment Rect */}
          <rect
            x="40"
            y="125"
            width="10"
            height="60"
            className={`transition-all duration-300 ${
              isHighlightActive('abutment')
                ? 'fill-indigo-500/20 stroke-indigo-600 stroke-[1.5px]'
                : 'fill-muted/30 stroke-border/40'
            }`}
          />

          {/* Right Abutment Rect */}
          <rect
            x="110"
            y="125"
            width="10"
            height="60"
            className={`transition-all duration-300 ${
              isHighlightActive('abutment')
                ? 'fill-indigo-500/20 stroke-indigo-600 stroke-[1.5px]'
                : 'fill-muted/30 stroke-border/40'
            }`}
          />

          {/* Flared Wing Walls (Angled rectangular paths) */}
          {/* Top-Left Wing Wall */}
          <line
            x1="40" y1="125" x2="20" y2="105"
            className={`transition-all duration-300 ${
              isHighlightActive('wingwall') ? 'stroke-indigo-600 stroke-[3px]' : 'stroke-border/40 stroke-[1.5px]'
            }`}
          />
          {/* Bottom-Left Wing Wall */}
          <line
            x1="40" y1="185" x2="20" y2="205"
            className={`transition-all duration-300 ${
              isHighlightActive('wingwall') ? 'stroke-indigo-600 stroke-[3px]' : 'stroke-border/40 stroke-[1.5px]'
            }`}
          />
          {/* Top-Right Wing Wall */}
          <line
            x1="120" y1="125" x2="140" y2="105"
            className={`transition-all duration-300 ${
              isHighlightActive('wingwall') ? 'stroke-indigo-600 stroke-[3px]' : 'stroke-border/40 stroke-[1.5px]'
            }`}
          />
          {/* Bottom-Right Wing Wall */}
          <line
            x1="120" y1="185" x2="140" y2="205"
            className={`transition-all duration-300 ${
              isHighlightActive('wingwall') ? 'stroke-indigo-600 stroke-[3px]' : 'stroke-border/40 stroke-[1.5px]'
            }`}
          />

          {/* Overlying Deck Slab (Dashed transparent fill) */}
          <rect
            x="40"
            y="130"
            width="80"
            height="50"
            fill="none"
            strokeDasharray="2 2"
            className={`transition-all duration-300 ${
              isHighlightActive('deck')
                ? 'stroke-amber-500 stroke-[1.8px] fill-amber-500/5'
                : 'stroke-muted-foreground/30 fill-transparent'
            }`}
          />

          {/* Plan Labels */}
          {isHighlightActive('wingwall') && (
            <text x="12" y="98" className="fill-indigo-600 font-mono font-bold animate-fadeIn" style={{ fontSize: '8px' }} textAnchor="end">Flared Wing Wall</text>
          )}
          {isHighlightActive('abutment') && (
            <text x="35" y="175" className="fill-indigo-600 font-mono font-bold animate-fadeIn" style={{ fontSize: '8px' }} textAnchor="end">Abutment</text>
          )}
          {isHighlightActive('deck') && (
            <text x="80" y="158" className="fill-amber-600 font-mono font-bold animate-fadeIn" style={{ fontSize: '8px' }} textAnchor="middle">Deck Slab</text>
          )}
        </g>
      </svg>
    </div>
  );
};

export default SlabCulvertAnatomyDrawing;
