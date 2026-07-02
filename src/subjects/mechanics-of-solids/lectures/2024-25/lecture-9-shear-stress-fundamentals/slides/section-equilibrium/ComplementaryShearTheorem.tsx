import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, SlideCallout } from '@/features/presentation/components/elements';
import { ExpandableDrawing } from '@/shared/components';

export const ComplementaryShearTheorem: React.FC = () => {
  return (
    <TwoColumnLayout
      title="The Complementary Shear Theorem"
      leftWidth="55%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-3 text-left">
          <div>
            <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest block mb-1">
              Static Resolution
            </span>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground">
              To balance the clockwise couple formed by primary vertical shear stresses, an equal and opposite counter-clockwise couple must act on the horizontal planes of the element.
            </SlideParagraph>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold text-foreground">Complementary Shear Stress:</h4>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground">
              This leads directly to the **Complementary Shear Theorem**:
            </SlideParagraph>
            <div className="bg-indigo-500/5 p-3 rounded-xl border border-indigo-500/20 text-xs text-foreground font-semibold italic">
              "Shear stress on any plane is always accompanied by an equal shear stress on a perpendicular plane at that point."
            </div>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground">
              This proves that a vertical shear stress (τ_xy) cannot exist without inducing a longitudinal horizontal shear stress (τ_yx) of equal magnitude:
            </SlideParagraph>
            <div className="font-mono text-xs text-center text-indigo-500 font-extrabold">
              τ_xy = τ_yx
            </div>
          </div>

          <SlideCallout variant="success" className="py-2 px-3 text-[10px]">
            In beams, this means transverse vertical load shear always induces horizontal sliding stresses along the longitudinal beam fibers!
          </SlideCallout>
        </div>
      }
      rightContent={
        <div className="flex flex-col items-center justify-center h-full">
          <ExpandableDrawing
            title="Complementary Shear Stresses"
            description="Stress element diagram showing equal vertical and horizontal shear stress components acting to maintain moment equilibrium."
            className="max-w-[280px] mx-auto w-full"
          >
            <svg viewBox="0 0 160 160" className="w-full h-full aspect-square overflow-visible">
              <g transform="translate(80, 80)">
                <rect
                  x={-25}
                  y={-25}
                  width={50}
                  height={50}
                  className="fill-muted/20 stroke-foreground"
                  strokeWidth={1.5}
                />
                
                {/* Primary Vertical Arrows (Orange) */}
                <line x1={-30} y1={-20} x2={-30} y2={20} stroke="#f59e0b" strokeWidth={1.5} />
                <polygon points="-30,20 -32.5,16 -27.5,16" fill="#f59e0b" />
                
                <line x1={30} y1={20} x2={30} y2={-20} stroke="#f59e0b" strokeWidth={1.5} />
                <polygon points="30,-20 27.5,-16 32.5,-16" fill="#f59e0b" />

                {/* Complementary Horizontal Arrows (Indigo) */}
                <line x1={20} y1={-30} x2={-20} y2={-30} stroke="#6366f1" strokeWidth={1.5} />
                <polygon points="-20,-30 -16,-32.5 -16,-27.5" fill="#6366f1" />

                <line x1={-20} y1={30} x2={20} y2={30} stroke="#6366f1" strokeWidth={1.5} />
                <polygon points="20,30 16,27.5 16,32.5" fill="#6366f1" />

                {/* Labels */}
                <text x={36} y={3} className="fill-amber-500 text-[8px] font-mono font-bold">
                  τ_xy
                </text>
                <text x={-48} y={3} className="fill-amber-500 text-[8px] font-mono font-bold">
                  τ_xy
                </text>
                <text x={0} y={-35} className="fill-indigo-500 text-[8px] font-mono font-bold" textAnchor="middle">
                  τ_yx
                </text>
                <text x={0} y={42} className="fill-indigo-500 text-[8px] font-mono font-bold" textAnchor="middle">
                  τ_yx
                </text>
              </g>
            </svg>
          </ExpandableDrawing>
          <SlideParagraph variant="plain" className="text-[10.5px] text-muted-foreground mt-2 font-mono">
            Equilibrium Satisfied: τ_xy = τ_yx
          </SlideParagraph>
        </div>
      }
    />
  );
};

export default ComplementaryShearTheorem;
