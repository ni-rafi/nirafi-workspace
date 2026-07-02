import React from 'react';
import { ExpandableDrawing } from '@/shared/components';

interface GeometricGalleryDrawingProps {
  currentClick?: number;
}

export const GeometricGalleryDrawing: React.FC<GeometricGalleryDrawingProps> = ({ currentClick = 0 }) => {
  const width = 380;
  const height = 190;

  return (
    <ExpandableDrawing
      title="Cross-Section Shear Stress Gallery"
      description="Side-by-side comparison of shear stress distributions across different geometry profiles: Rectangle, Circle, Triangle, and Cross (+), highlighting the mid-height peak exception of the triangle."
      className="max-w-[480px] mx-auto w-full"
    >
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full aspect-[2.0] overflow-visible">
        {/* ROW 1: Cross-Section shapes */}
        {/* Separator lines between columns */}
        <line x1={95} y1={10} x2={95} y2={180} className="stroke-border/30" strokeWidth={0.8} strokeDasharray="3,2" />
        <line x1={190} y1={10} x2={190} y2={180} className="stroke-border/30" strokeWidth={0.8} strokeDasharray="3,2" />
        <line x1={285} y1={10} x2={285} y2={180} className="stroke-border/30" strokeWidth={0.8} strokeDasharray="3,2" />

        {/* COLUMN 1: Rectangle */}
        <g id="gallery-rectangle" opacity={currentClick === 0 || currentClick > 2 ? 1 : 0.25} className="transition-opacity duration-300">
          <text x={47.5} y={15} className="fill-foreground text-[11px] font-bold text-center" textAnchor="middle">
            Rectangle
          </text>
          <rect x={32.5} y={25} width={30} height={50} className="fill-indigo-500/10 stroke-indigo-500/80" strokeWidth={1} />
          <line x1={25} y1={50} x2={70} y2={50} className="stroke-indigo-600/50 stroke-dasharray-[2,1]" strokeWidth={0.8} />
          <text x={22} y={53} className="fill-indigo-600/70 text-[11px] font-mono font-bold" textAnchor="end">NA</text>

          {/* Stress Plot */}
          <line x1={47.5} y1={95} x2={47.5} y2={155} className="stroke-foreground/60" strokeWidth={1} />
          <path d="M 47.5,95 Q 72.5,125 47.5,155" className="fill-none stroke-indigo-500" strokeWidth={1.5} />
          <text x={47.5} y={172} className="fill-muted-foreground text-[11px] font-mono" textAnchor="middle">
            τ_max at NA
          </text>
        </g>

        {/* COLUMN 2: Circle */}
        <g id="gallery-circle" opacity={currentClick === 0 || currentClick > 2 ? 1 : 0.25} className="transition-opacity duration-300">
          <text x={142.5} y={15} className="fill-foreground text-[11px] font-bold text-center" textAnchor="middle">
            Circle
          </text>
          <circle cx={142.5} cy={50} r={25} className="fill-indigo-500/10 stroke-indigo-500/80" strokeWidth={1} />
          <line x1={112} y1={50} x2={173} y2={50} className="stroke-indigo-600/50 stroke-dasharray-[2,1]" strokeWidth={0.8} />

          {/* Stress Plot */}
          <line x1={142.5} y1={95} x2={142.5} y2={155} className="stroke-foreground/60" strokeWidth={1} />
          <path d="M 142.5,95 Q 167.5,125 142.5,155" className="fill-none stroke-indigo-500" strokeWidth={1.5} />
          <text x={142.5} y={172} className="fill-muted-foreground text-[11px] font-mono" textAnchor="middle">
            τ_max at NA
          </text>
        </g>

        {/* COLUMN 3: Triangle */}
        <g
          id="gallery-triangle"
          opacity={currentClick === 0 || currentClick === 1 || currentClick > 2 ? 1 : 0.25}
          className="transition-opacity duration-300"
        >
          <text x={237.5} y={15} className={`text-[11px] font-black text-center ${currentClick === 1 ? 'fill-red-500 font-extrabold' : 'fill-amber-500'}`} textAnchor="middle">
            {currentClick === 1 ? '👉 Triangle Exception' : '⚠️ Triangle'}
          </text>
          <polygon
            points="237.5,25 212.5,75 262.5,75"
            className={`fill-amber-500/10 ${currentClick === 1 ? 'stroke-red-500 stroke-[1.5px]' : 'stroke-amber-500/80'}`}
          />
          
          <line x1={210} y1={58.3} x2={265} y2={58.3} className="stroke-indigo-600/50 stroke-dasharray-[2,1]" strokeWidth={0.8} />
          <text x={208} y={61} className="fill-indigo-600/70 text-[11px] font-mono font-bold" textAnchor="end">NA</text>
          
          <line x1={210} y1={50} x2={265} y2={50} className="stroke-red-500/80" strokeWidth={0.8} />
          <text x={268} y={53} className="fill-red-500/80 text-[11px] font-mono font-bold" textAnchor="start">y = h/2 (Peak)</text>

          {/* Stress Plot */}
          <line x1={237.5} y1={95} x2={237.5} y2={155} className="stroke-foreground/60" strokeWidth={1} />
          <path d="M 237.5,95 Q 267.5,125 237.5,155" className="fill-none stroke-red-500" strokeWidth={currentClick === 1 ? 2.2 : 1.8} />
          
          <line x1={237.5} y1={128.3} x2={253} y2={128.3} className="stroke-indigo-500/60 stroke-dasharray-[2,1]" strokeWidth={0.8} />
          <line x1={237.5} y1={125} x2={267.5} y2={125} className="stroke-red-500/50" strokeWidth={0.8} />

          <text x={237.5} y={172} className="fill-red-600 dark:fill-red-400 text-[11px] font-mono font-bold" textAnchor="middle">
            τ_max at h/2 (Not NA!)
          </text>
        </g>

        {/* COLUMN 4: Cross Shape */}
        <g
          id="gallery-cross"
          opacity={currentClick === 0 || currentClick === 2 || currentClick > 2 ? 1 : 0.25}
          className="transition-opacity duration-300"
        >
          <text x={332.5} y={15} className={`text-[11px] font-bold text-center ${currentClick === 2 ? 'fill-indigo-600 dark:fill-indigo-400 font-extrabold' : 'fill-foreground'}`} textAnchor="middle">
            {currentClick === 2 ? '👉 Cross Bottleneck' : 'Cross (+)'}
          </text>
          <path
            d="M 327.5,25 L 337.5,25 L 337.5,44 L 350.5,44 L 350.5,56 L 337.5,56 L 337.5,75 L 327.5,75 L 327.5,56 L 314.5,56 L 314.5,44 L 327.5,44 Z"
            className={`fill-indigo-500/10 ${currentClick === 2 ? 'stroke-indigo-500 stroke-[1.5px]' : 'stroke-indigo-500/80'}`}
          />
          <line x1={310} y1={50} x2={355} y2={50} className="stroke-indigo-600/50 stroke-dasharray-[2,1]" strokeWidth={0.8} />

          {/* Stress Plot */}
          <line x1={332.5} y1={95} x2={332.5} y2={155} className="stroke-foreground/60" strokeWidth={1} />
          <path
            d="M 332.5,95 Q 344.5,106.4 344.5,117.8 L 336.5,117.8 Q 342.5,125 336.5,132.2 L 344.5,132.2 Q 344.5,143.6 332.5,155"
            className="fill-none stroke-indigo-500"
            strokeWidth={currentClick === 2 ? 2 : 1.5}
          />
          
          <text x={332.5} y={172} className="fill-muted-foreground text-[11px] font-mono" textAnchor="middle">
            Junction Drop (Width Jump)
          </text>
        </g>
      </svg>
    </ExpandableDrawing>
  );
};

export default GeometricGalleryDrawing;
