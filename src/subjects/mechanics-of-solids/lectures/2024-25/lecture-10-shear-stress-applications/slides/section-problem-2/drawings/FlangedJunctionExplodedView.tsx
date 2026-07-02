import React from 'react';
import { ExpandableDrawing } from '@/shared/components';

interface FlangedJunctionExplodedViewProps {
  currentClick?: number;
}

export const FlangedJunctionExplodedView: React.FC<FlangedJunctionExplodedViewProps> = ({ currentClick = 0 }) => {
  const width = 300;
  const height = 180;

  const leftX = 50;
  const scale = 0.45; 
  const naY = 110;
  
  const topFlangeY1 = naY - 175 * scale;
  const topFlangeY2 = naY - 125 * scale;
  const botFlangeY1 = naY + 75 * scale;

  const expX = 200;
  const expTFY1 = topFlangeY1;
  const expTFY2 = topFlangeY2;
  const expWebY1 = topFlangeY2 + 25;
  const expWebY2 = botFlangeY1 + 25;

  return (
    <ExpandableDrawing
      title="Flanged Section Junction Details"
      description="Exploded visual analysis at Point B (junction interface) showing the change in width from b_flange=100mm to b_web=50mm, and illustrating why shear stress jumps by 2x."
      className="max-w-[450px] mx-auto w-full"
    >
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full aspect-[1.67] overflow-visible">
        {/* Left Side: Asymmetric I-beam Section */}
        <g>
          <rect x={leftX - 50 * scale} y={topFlangeY1} width={100 * scale} height={50 * scale} className="fill-muted/20 stroke-foreground" strokeWidth={1} />
          <rect x={leftX - 25 * scale} y={topFlangeY2} width={50 * scale} height={200 * scale} className="fill-muted/20 stroke-foreground" strokeWidth={1} />
          <rect x={leftX - 100 * scale} y={botFlangeY1} width={200 * scale} height={50 * scale} className="fill-muted/20 stroke-foreground" strokeWidth={1} />

          <line x1={leftX - 60 * scale} y1={naY} x2={leftX + 110 * scale} y2={naY} className="stroke-destructive" strokeWidth={0.8} strokeDasharray="3,1" />
          <text x={leftX - 60 * scale - 4} y={naY + 3.5} className="fill-destructive text-[11px] font-mono font-bold" textAnchor="end">
            N.A.
          </text>

          <line x1={leftX - 65 * scale} y1={topFlangeY2} x2={leftX + 65 * scale} y2={topFlangeY2} className="stroke-blue-500" strokeWidth={1.5} />
          <circle cx={leftX} cy={topFlangeY2} r={3} className="fill-blue-500 animate-ping" />
          <circle cx={leftX} cy={topFlangeY2} r={2} className="fill-blue-500" />
          <text x={leftX + 65 * scale + 4} y={topFlangeY2 + 3} className="fill-blue-500 text-[11px] font-mono font-black">
            Point B
          </text>
        </g>

        {/* Right Side: Exploded Junction View (revealed at step 1+) */}
        <g opacity={currentClick >= 1 ? 1 : 0.05} className="transition-opacity duration-300">
          <rect x={expX - 50 * scale} y={expTFY1} width={100 * scale} height={50 * scale} className="fill-indigo-500/10 stroke-indigo-500" strokeWidth={1.5} />
          <rect x={expX - 25 * scale} y={expWebY1} width={50 * scale} height={70 * scale} className="fill-blue-500/10 stroke-blue-500" strokeWidth={1.5} strokeDasharray="4,2" />

          <path d={`M ${expX} ${expTFY2 + 3} L ${expX} ${expWebY1 - 3}`} className="stroke-muted-foreground/50 fill-none" strokeWidth={0.8} strokeDasharray="2,2" />
          <polygon points={`${expX},${expWebY1 - 3} ${expX - 2.5},${expWebY1 - 7} ${expX + 2.5},${expWebY1 - 7}`} className="fill-muted-foreground/60" />
          <polygon points={`${expX},${expTFY2 + 3} ${expX - 2.5},${expTFY2 + 7} ${expX + 2.5},${expTFY2 + 7}`} className="fill-muted-foreground/60" />

          {/* Width indicators */}
          <line x1={expX - 50 * scale} y1={expTFY2 + 4} x2={expX - 50 * scale} y2={expTFY2 + 15} className="stroke-muted-foreground/30" strokeWidth={0.6} />
          <line x1={expX + 50 * scale} y1={expTFY2 + 4} x2={expX + 50 * scale} y2={expTFY2 + 15} className="stroke-muted-foreground/30" strokeWidth={0.6} />
          <line x1={expX - 50 * scale} y1={expTFY2 + 11} x2={expX + 50 * scale} y2={expTFY2 + 11} className="stroke-indigo-400" strokeWidth={0.8} />
          <text x={expX} y={expTFY2 + 22} className="fill-indigo-500 text-[11px] font-mono font-bold" textAnchor="middle">
            b_flange = 100 mm
          </text>

          <line x1={expX - 25 * scale} y1={expWebY1 - 4} x2={expX - 25 * scale} y2={expWebY1 - 15} className="stroke-muted-foreground/30" strokeWidth={0.6} />
          <line x1={expX + 25 * scale} y1={expWebY1 - 4} x2={expX + 25 * scale} y2={expWebY1 - 15} className="stroke-muted-foreground/30" strokeWidth={0.6} />
          <line x1={expX - 25 * scale} y1={expWebY1 - 11} x2={expX + 25 * scale} y2={expWebY1 - 11} className="stroke-blue-400" strokeWidth={0.8} />
          <text x={expX} y={expWebY1 - 18} className="fill-blue-500 text-[11px] font-mono font-bold" textAnchor="middle">
            b_web = 50 mm
          </text>

          {/* Conceptual Formula text overlay */}
          <rect x={expX - 65} y={expWebY2 + 10} width={130} height={25} rx={4} className="fill-muted/40 stroke-border/40" strokeWidth={1} />
          <text x={expX} y={expWebY2 + 26} className="fill-foreground text-[11px] font-mono font-bold" textAnchor="middle">
            τ = VQ / (I * b)
          </text>
          <text x={expX} y={expWebY2 + 46} className="fill-amber-500 text-[11px] font-bold" textAnchor="middle">
            b halving ⇒ τ doubles!
          </text>
        </g>
      </svg>
    </ExpandableDrawing>
  );
};

export default FlangedJunctionExplodedView;
