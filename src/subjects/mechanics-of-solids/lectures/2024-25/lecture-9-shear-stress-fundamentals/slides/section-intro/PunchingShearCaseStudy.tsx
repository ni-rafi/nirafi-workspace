import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, SlideCallout } from '@/features/presentation/components/elements';
import collapseImg from '@/assets/punching_shear_collapse.jpg';
import { ExpandableDrawing } from '@/shared/components';

export const PunchingShearCaseStudy: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Punching Shear Failure Case Study"
      leftWidth="50%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-3 text-left">
          <div>
            <span className="text-[10px] font-extrabold tracking-widest uppercase px-2 py-0.5 bg-red-500/10 text-red-500 border border-red-500/20 rounded inline-block mb-2">
              Structural Hazard
            </span>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground">
              In flat concrete slab systems, the region directly around column supports experiences highly concentrated vertical shear forces. If the shear stress exceeds the concrete's capacity, it punches through.
            </SlideParagraph>
          </div>

          {/* SVG Schematic Drawing */}
          <div className="bg-muted/10 p-2.5 rounded-2xl border border-border/40 flex items-center justify-center flex-1 min-h-[160px]">
            <ExpandableDrawing
              title="Punching Shear Schematic"
              description="Schematic view of punching shear action showing concentrated loading and diagonal 45-degree cracking shear failure planes."
              className="w-full"
            >
              <svg viewBox="0 0 200 120" className="w-full h-full overflow-visible">
                {/* Horizontal Concrete Slab */}
                <rect x="10" y="20" width="180" height="20" className="fill-muted/20 stroke-foreground" strokeWidth={1.2} />
                
                {/* Supporting Column */}
                <rect x="85" y="40" width="30" height="60" className="fill-muted/30 stroke-foreground" strokeWidth={1.2} />

                {/* Diagonal 45-degree cracking shear planes */}
                {/* Left crack */}
                <line x1="85" y1="40" x2="65" y2="20" className="stroke-red-500 animate-pulse" strokeWidth={2} strokeDasharray="3,1" />
                {/* Right crack */}
                <line x1="115" y1="40" x2="135" y2="20" className="stroke-red-500 animate-pulse" strokeWidth={2} strokeDasharray="3,1" />

                {/* Force arrows on slab */}
                {[30, 50, 150, 170].map((x, i) => (
                  <g key={i}>
                    <line x1={x} y1={5} x2={x} y2={18} className="stroke-blue-500" strokeWidth={1} />
                    <polygon points={`${x},18 ${x-2},14 ${x+2},14`} className="fill-blue-500" />
                  </g>
                ))}

                {/* Column reaction force */}
                <line x1="100" y1="90" x2="100" y2="42" className="stroke-emerald-500" strokeWidth={1.5} />
                <polygon points="100,42 97,47 103,47" className="fill-emerald-500" />

                {/* Labels */}
                <text x="100" y="15" className="fill-blue-500 text-[8px] font-mono font-bold" textAnchor="middle">Slab Loading</text>
                <text x="100" y="98" className="fill-emerald-500 text-[7px] font-mono" textAnchor="middle">Reaction</text>
                <text x="50" y="45" className="fill-red-500 text-[7.5px] font-bold" textAnchor="end">Shear Crack (~45°)</text>
                <text x="150" y="45" className="fill-red-500 text-[7.5px] font-bold" textAnchor="start">Failure Plane</text>
              </svg>
            </ExpandableDrawing>
          </div>
        </div>
      }
      rightContent={
        <div className="flex flex-col h-full justify-between items-center bg-muted/20 border border-border/40 rounded-2xl p-3 min-h-[260px] gap-2">
          <div className="relative w-full flex-1 rounded-xl overflow-hidden shadow-md flex items-center justify-center bg-black/10 max-h-[140px]">
            <img
              src={collapseImg}
              alt="Punching Shear Failure in Flat Slab"
              className="w-full h-full object-cover"
            />
          </div>
          <SlideParagraph variant="plain" className="text-[10px] text-muted-foreground leading-relaxed text-left">
            <strong>Disaster Case Study:</strong> Actual structural punching failure. The flat floor slab has completely dropped, sliding down the columns due to diagonal shearing stresses.
          </SlideParagraph>
          <SlideCallout variant="danger" className="py-1.5 px-2.5 text-[10px] w-full">
            <strong className="text-red-500 block text-[10px] font-bold mb-0.5">Brittle Failure Mode:</strong> Unlike bending failures which show warning sagging signs, shear failures occur instantaneously with zero deflection warning.
          </SlideCallout>
        </div>
      }
    />
  );
};

export default PunchingShearCaseStudy;
