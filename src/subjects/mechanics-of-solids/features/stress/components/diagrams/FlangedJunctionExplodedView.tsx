import React from 'react';

export const FlangedJunctionExplodedView: React.FC = () => {
  const width = 300;
  const height = 180;

  // Coordinates for left side (full section)
  const leftX = 50;
  const scale = 0.45; // scale to fit
  // Neutral axis is at y = 125mm from bottom. Height is 300mm.
  // bottom flange is 50mm, web is 200mm, top flange is 50mm.
  // NA is at 125mm from bottom, which means:
  // bottom flange top is at 50mm (75mm below NA)
  // web top is at 250mm (125mm above NA)
  // top flange top is at 300mm (175mm above NA)
  // Let's set NA at SVG y=110.
  const naY = 110;
  // bottom flange: bottom = naY + 125*scale = 110 + 56.25 = 166.25, top = naY + 75*scale = 143.75, width=200, halfW=100
  // top flange: top = naY - 175*scale = 110 - 78.75 = 31.25, bottom = naY - 125*scale = 53.75, width=100, halfW=50
  // web: width=50, halfW=25
  const topFlangeY1 = naY - 175 * scale;
  const topFlangeY2 = naY - 125 * scale;
  const botFlangeY1 = naY + 75 * scale;

  // Exploded view coordinates (right side)
  const expX = 200;
  // Top flange: centered at expX
  const expTFY1 = topFlangeY1;
  const expTFY2 = topFlangeY2;
  // Web: centered at expX, shifted down by 25px
  const expWebY1 = topFlangeY2 + 25;
  const expWebY2 = botFlangeY1 + 25;

  return (
    <div className="flex justify-center border border-border/30 bg-muted/5 rounded-2xl p-4 max-w-[450px] mx-auto w-full shadow-inner">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full aspect-[1.67] overflow-visible">
        {/* Left Side: Asymmetric I-beam Section */}
        <g>
          {/* Top Flange */}
          <rect x={leftX - 50 * scale} y={topFlangeY1} width={100 * scale} height={50 * scale} className="fill-muted/20 stroke-foreground" strokeWidth={1} />
          {/* Web */}
          <rect x={leftX - 25 * scale} y={topFlangeY2} width={50 * scale} height={200 * scale} className="fill-muted/20 stroke-foreground" strokeWidth={1} />
          {/* Bottom Flange */}
          <rect x={leftX - 100 * scale} y={botFlangeY1} width={200 * scale} height={50 * scale} className="fill-muted/20 stroke-foreground" strokeWidth={1} />

          {/* Neutral Axis (N.A.) */}
          <line x1={leftX - 60 * scale} y1={naY} x2={leftX + 110 * scale} y2={naY} className="stroke-destructive" strokeWidth={0.8} strokeDasharray="3,1" />
          <text x={leftX - 60 * scale - 4} y={naY + 3.5} className="fill-destructive text-[8px] font-mono font-bold" textAnchor="end">
            N.A.
          </text>

          {/* Point B Junction warning line */}
          <line x1={leftX - 65 * scale} y1={topFlangeY2} x2={leftX + 65 * scale} y2={topFlangeY2} className="stroke-blue-500" strokeWidth={1.5} />
          <circle cx={leftX} cy={topFlangeY2} r={3} className="fill-blue-500 animate-ping" />
          <circle cx={leftX} cy={topFlangeY2} r={2} className="fill-blue-500" />
          <text x={leftX + 65 * scale + 4} y={topFlangeY2 + 3} className="fill-blue-500 text-[9px] font-mono font-black">
            Point B
          </text>
        </g>

        {/* Right Side: Exploded Junction View */}
        <g>
          {/* Exploded Top Flange */}
          <rect x={expX - 50 * scale} y={expTFY1} width={100 * scale} height={50 * scale} className="fill-indigo-500/10 stroke-indigo-500" strokeWidth={1.5} />
          {/* Exploded Web */}
          <rect x={expX - 25 * scale} y={expWebY1} width={50 * scale} height={70 * scale} className="fill-blue-500/10 stroke-blue-500" strokeWidth={1.5} strokeDasharray="4,2" />

          {/* Separation indicator arrows */}
          <path d={`M ${expX} ${expTFY2 + 3} L ${expX} ${expWebY1 - 3}`} className="stroke-muted-foreground/50 fill-none" strokeWidth={0.8} strokeDasharray="2,2" />
          <polygon points={`${expX},${expWebY1 - 3} ${expX - 2.5},${expWebY1 - 7} ${expX + 2.5},${expWebY1 - 7}`} className="fill-muted-foreground/60" />
          <polygon points={`${expX},${expTFY2 + 3} ${expX - 2.5},${expTFY2 + 7} ${expX + 2.5},${expTFY2 + 7}`} className="fill-muted-foreground/60" />

          {/* Width indicators */}
          {/* Flange Width = 100mm */}
          <line x1={expX - 50 * scale} y1={expTFY2 + 4} x2={expX - 50 * scale} y2={expTFY2 + 15} className="stroke-muted-foreground/30" strokeWidth={0.6} />
          <line x1={expX + 50 * scale} y1={expTFY2 + 4} x2={expX + 50 * scale} y2={expTFY2 + 15} className="stroke-muted-foreground/30" strokeWidth={0.6} />
          <line x1={expX - 50 * scale} y1={expTFY2 + 11} x2={expX + 50 * scale} y2={expTFY2 + 11} className="stroke-indigo-400" strokeWidth={0.8} />
          <text x={expX} y={expTFY2 + 20} className="fill-indigo-500 text-[8.5px] font-mono font-bold" textAnchor="middle">
            b_flange = 100 mm
          </text>

          {/* Web Width = 50mm */}
          <line x1={expX - 25 * scale} y1={expWebY1 - 4} x2={expX - 25 * scale} y2={expWebY1 - 15} className="stroke-muted-foreground/30" strokeWidth={0.6} />
          <line x1={expX + 25 * scale} y1={expWebY1 - 4} x2={expX + 25 * scale} y2={expWebY1 - 15} className="stroke-muted-foreground/30" strokeWidth={0.6} />
          <line x1={expX - 25 * scale} y1={expWebY1 - 11} x2={expX + 25 * scale} y2={expWebY1 - 11} className="stroke-blue-400" strokeWidth={0.8} />
          <text x={expX} y={expWebY1 - 16} className="fill-blue-500 text-[8.5px] font-mono font-bold" textAnchor="middle">
            b_web = 50 mm
          </text>

          {/* Conceptual Formula text overlay */}
          <rect x={expX - 65} y={expWebY2 + 10} width={130} height={25} rx={4} className="fill-muted/40 stroke-border/40" strokeWidth={1} />
          <text x={expX} y={expWebY2 + 25} className="fill-foreground text-[10px] font-mono font-bold" textAnchor="middle">
            τ = VQ / (I * b)
          </text>
          <text x={expX} y={expWebY2 + 45} className="fill-amber-500 text-[9px] font-bold" textAnchor="middle">
            b halving ⇒ τ doubles!
          </text>
        </g>
      </svg>
    </div>
  );
};
export default FlangedJunctionExplodedView;
