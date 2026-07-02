import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, SlideCallout } from '@/features/presentation/components/elements';
import { ExpandableDrawing } from '@/shared/components';

export const RotationalDilemma: React.FC = () => {
  return (
    <TwoColumnLayout
      title="The Rotational Equilibrium Dilemma"
      leftWidth="55%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-3 text-left">
          <div>
            <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest block mb-1">
              Static Resolution
            </span>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground">
              If *only* vertical shear stress existed on the element, the vertical forces would form a force couple, inducing a clockwise rotational moment.
            </SlideParagraph>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold text-foreground">Equilibrium Violation:</h4>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground">
              According to the laws of rigid-body statics, for any body in static equilibrium:
            </SlideParagraph>
            <div className="bg-muted/60 dark:bg-muted/20 p-2 rounded-xl border border-border/40 font-mono text-center text-xs text-red-600 dark:text-red-400">
              ∑ M_z = 0 (No Rotational Spin)
            </div>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground">
              Since there is no counter-couple to resist this spin, the element block would spin infinitely, violating structural equilibrium.
            </SlideParagraph>
          </div>

          <SlideCallout variant="danger" className="py-2 px-3 text-[10px]">
            Therefore, a pure vertical shear stress state is physically impossible in a static solid body. We must resolve this.
          </SlideCallout>
        </div>
      }
      rightContent={
        <div className="flex flex-col items-center justify-center h-full">
          <ExpandableDrawing
            title="Rotational Imbalance"
            description="Stress element diagram showcasing the unbalanced moment couple causing an infinite spinning instability."
            className="max-w-[280px] mx-auto w-full"
          >
            <svg viewBox="0 0 160 160" className="w-full h-full aspect-square overflow-visible">
              <g transform="translate(80, 80)">
                {/* Spin indicator curved arrow */}
                <path
                  d="M -45 -10 A 45 45 0 0 1 45 -10"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth={2}
                  strokeDasharray="4,2"
                  className="animate-spin"
                  style={{ transformOrigin: '0px 0px', animationDuration: '6s' }}
                />
                <polygon points="45,-10 41,-15 48,-14" fill="#ef4444" />

                {/* Tilted Element Block */}
                <g transform="rotate(25)">
                  <rect
                    x={-25}
                    y={-25}
                    width={50}
                    height={50}
                    className="fill-red-500/10 stroke-red-500"
                    strokeWidth={1.5}
                  />
                  {/* Left face arrow */}
                  <line x1={-30} y1={-20} x2={-30} y2={20} stroke="#ef4444" strokeWidth={1.5} />
                  <polygon points="-30,20 -32.5,16 -27.5,16" fill="#ef4444" />
                  
                  {/* Right face arrow */}
                  <line x1={30} y1={20} x2={30} y2={-20} stroke="#ef4444" strokeWidth={1.5} />
                  <polygon points="30,-20 27.5,-16 32.5,-16" fill="#ef4444" />
                </g>

                {/* Spin Text Label */}
                <text x={0} y={5} className="fill-red-500 text-[11px] font-mono font-black animate-pulse" textAnchor="middle">
                  SPINNING!
                </text>
              </g>
            </svg>
          </ExpandableDrawing>
          <SlideParagraph variant="plain" className="text-[10.5px] text-muted-foreground mt-2 font-mono">
            Rotational Imbalance Violating Statics
          </SlideParagraph>
        </div>
      }
    />
  );
};

export default RotationalDilemma;
