import React from 'react';

export const GeometricGalleryDrawing: React.FC = () => {
  const width = 380;
  const height = 190;

  return (
    <div className="flex justify-center border border-border/30 bg-muted/5 rounded-2xl p-4 max-w-[480px] mx-auto w-full shadow-inner">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full aspect-[2.0] overflow-visible">
        {/* ROW 1: Cross-Section shapes */}
        {/* Separator lines between columns */}
        <line x1={95} y1={10} x2={95} y2={180} className="stroke-border/30" strokeWidth={0.8} strokeDasharray="3,2" />
        <line x1={190} y1={10} x2={190} y2={180} className="stroke-border/30" strokeWidth={0.8} strokeDasharray="3,2" />
        <line x1={285} y1={10} x2={285} y2={180} className="stroke-border/30" strokeWidth={0.8} strokeDasharray="3,2" />

        {/* COLUMN 1: Rectangle */}
        <g id="gallery-rectangle">
          {/* Label */}
          <text x={47.5} y={15} className="fill-foreground text-[8px] font-bold text-center" textAnchor="middle">
            Rectangle
          </text>
          {/* Shape */}
          <rect x={32.5} y={25} width={30} height={50} className="fill-indigo-500/10 stroke-indigo-500/80" strokeWidth={1} />
          {/* Neutral Axis (NA) */}
          <line x1={25} y1={50} x2={70} y2={50} className="stroke-indigo-600/50 stroke-dasharray-[2,1]" strokeWidth={0.8} />
          <text x={22} y={52} className="fill-indigo-600/70 text-[6px] font-mono font-bold" textAnchor="end">NA</text>

          {/* Stress Plot */}
          <line x1={47.5} y1={95} x2={47.5} y2={155} className="stroke-foreground/60" strokeWidth={1} />
          {/* Parabolic profile */}
          <path d="M 47.5,95 Q 72.5,125 47.5,155" className="fill-none stroke-indigo-500" strokeWidth={1.5} />
          <text x={47.5} y={170} className="fill-muted-foreground text-[7px] font-mono" textAnchor="middle">
            τ_max at NA
          </text>
        </g>

        {/* COLUMN 2: Circle */}
        <g id="gallery-circle">
          {/* Label */}
          <text x={142.5} y={15} className="fill-foreground text-[8px] font-bold text-center" textAnchor="middle">
            Circle
          </text>
          {/* Shape */}
          <circle cx={142.5} cy={50} r={25} className="fill-indigo-500/10 stroke-indigo-500/80" strokeWidth={1} />
          {/* Neutral Axis (NA) */}
          <line x1={112} y1={50} x2={173} y2={50} className="stroke-indigo-600/50 stroke-dasharray-[2,1]" strokeWidth={0.8} />

          {/* Stress Plot */}
          <line x1={142.5} y1={95} x2={142.5} y2={155} className="stroke-foreground/60" strokeWidth={1} />
          {/* Parabolic profile */}
          <path d="M 142.5,95 Q 167.5,125 142.5,155" className="fill-none stroke-indigo-500" strokeWidth={1.5} />
          <text x={142.5} y={170} className="fill-muted-foreground text-[7px] font-mono" textAnchor="middle">
            τ_max at NA
          </text>
        </g>

        {/* COLUMN 3: Triangle */}
        <g id="gallery-triangle">
          {/* Label */}
          <text x={237.5} y={15} className="fill-amber-500 text-[8px] font-black text-center" textAnchor="middle">
            ⚠️ Triangle
          </text>
          {/* Shape */}
          <polygon points="237.5,25 212.5,75 262.5,75" className="fill-amber-500/10 stroke-amber-500/80" strokeWidth={1} />
          
          {/* Neutral Axis (NA) - 2/3 from apex (Y = 25 + 50 * 2/3 = 58.3) */}
          <line x1={210} y1={58.3} x2={265} y2={58.3} className="stroke-indigo-600/50 stroke-dasharray-[2,1]" strokeWidth={0.8} />
          <text x={208} y={60} className="fill-indigo-600/70 text-[6px] font-mono font-bold" textAnchor="end">NA</text>
          
          {/* Mid-Depth Peak Stress Level - 1/2 from apex (Y = 25 + 25 = 50) */}
          <line x1={210} y1={50} x2={265} y2={50} className="stroke-red-500/80" strokeWidth={0.8} />
          <text x={268} y={52} className="fill-red-500/80 text-[6px] font-mono font-bold" textAnchor="start">y = h/2 (Peak)</text>

          {/* Stress Plot */}
          <line x1={237.5} y1={95} x2={237.5} y2={155} className="stroke-foreground/60" strokeWidth={1} />
          {/* Triangle Shear Stress distribution curve:
              Formula: tau = 12 * V * w * (h-w) / (b * h^3).
              Parabola peaking at mid-depth (w = h/2, i.e., Y = 95 + 30 = 125).
              Apex (Y=95) has stress 0. Base (Y=155) has stress 0. */}
          <path d="M 237.5,95 Q 267.5,125 237.5,155" className="fill-none stroke-red-500" strokeWidth={1.8} />
          
          {/* NA level marker on plot */}
          <line x1={237.5} y1={128.3} x2={253} y2={128.3} className="stroke-indigo-500/60 stroke-dasharray-[2,1]" strokeWidth={0.8} />
          {/* Mid-depth peak level marker on plot */}
          <line x1={237.5} y1={125} x2={267.5} y2={125} className="stroke-red-500/50" strokeWidth={0.8} />

          <text x={237.5} y={170} className="fill-red-600 dark:fill-red-400 text-[7px] font-mono font-bold" textAnchor="middle">
            τ_max at h/2 (Not NA!)
          </text>
        </g>

        {/* COLUMN 4: Cross Shape */}
        <g id="gallery-cross">
          {/* Label */}
          <text x={332.5} y={15} className="fill-foreground text-[8px] font-bold text-center" textAnchor="middle">
            Cross (+)
          </text>
          {/* Shape */}
          <path
            d="M 327.5,25 L 337.5,25 L 337.5,44 L 350.5,44 L 350.5,56 L 337.5,56 L 337.5,75 L 327.5,75 L 327.5,56 L 314.5,56 L 314.5,44 L 327.5,44 Z"
            className="fill-indigo-500/10 stroke-indigo-500/80"
            strokeWidth={1}
          />
          {/* Neutral Axis (NA) */}
          <line x1={310} y1={50} x2={355} y2={50} className="stroke-indigo-600/50 stroke-dasharray-[2,1]" strokeWidth={0.8} />

          {/* Stress Plot */}
          <line x1={332.5} y1={95} x2={332.5} y2={155} className="stroke-foreground/60" strokeWidth={1} />
          {/* Cross Shape distribution:
              Starts at 0 at Y=95.
              Increases parabolically to junction Y=117.8.
              At junction, width jumps from 10 to 36, so stress drops to 1/3: step jump inward!
              Inside the wing, width is 36, stress increases to a local peak at NA Y=125.
              Then decreases symmetrically. */}
          <path
            d="M 332.5,95 Q 344.5,106.4 344.5,117.8 L 336.5,117.8 Q 342.5,125 336.5,132.2 L 344.5,132.2 Q 344.5,143.6 332.5,155"
            className="fill-none stroke-indigo-500"
            strokeWidth={1.5}
          />
          
          <text x={332.5} y={170} className="fill-muted-foreground text-[7px] font-mono" textAnchor="middle">
            Junction Drop (Width Jump)
          </text>
        </g>
      </svg>
    </div>
  );
};

export default GeometricGalleryDrawing;
