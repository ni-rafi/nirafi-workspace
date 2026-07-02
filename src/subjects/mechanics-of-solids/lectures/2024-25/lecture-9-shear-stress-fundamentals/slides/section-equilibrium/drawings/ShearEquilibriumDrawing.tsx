import React from 'react';
import { ExpandableDrawing } from '@/shared/components';

interface ShearEquilibriumDrawingProps {
  currentTab: number;
}

export const ShearEquilibriumDrawing: React.FC<ShearEquilibriumDrawingProps> = ({ currentTab }) => {
  const width = 160;
  const height = 160;

  return (
    <ExpandableDrawing
      title="Stress Element Equilibrium States"
      description="Step-by-step visualization of a 2D infinitesimal stress element transitioning from unstressed setup, primary shear loading, rotational dilemma, and final equilibrium resolution."
      className="max-w-[280px] mx-auto w-full"
    >
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full aspect-square overflow-visible">
        <g transform="translate(80, 80)">
          {/* STEP 2: Rotational Dilemma - Tilted & Spinning */}
          {currentTab === 2 ? (
            <g className="animate-fadeIn">
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

              {/* Tilted Red Stress Block */}
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
          ) : (
            // STEPS 0, 1, 3: Stable element block
            <g className="transition-all duration-500">
              {/* Unstressed base block (Step 0) or Stressed block (Steps 1, 3) */}
              <rect
                x={-25}
                y={-25}
                width={50}
                height={50}
                className={`transition-colors duration-300 ${
                  currentTab === 3
                    ? 'fill-emerald-500/10 stroke-emerald-500'
                    : 'fill-muted/20 stroke-foreground'
                }`}
                strokeWidth={1.5}
              />

              {/* Coordinate axis reference on background for Step 0 */}
              {currentTab === 0 && (
                <g className="stroke-muted-foreground/30 stroke-[0.8] animate-fadeIn" strokeDasharray="2,2">
                  <line x1={-50} y1={0} x2={50} y2={0} />
                  <line x1={0} y1={-50} x2={0} y2={50} />
                  <text x={42} y={-4} className="fill-muted-foreground text-[7px]" stroke="none">x</text>
                  <text x={4} y={-42} className="fill-muted-foreground text-[7px]" stroke="none">y</text>
                </g>
              )}

              {/* Primary vertical shear stress arrows (Steps 1 & 3) */}
              {currentTab >= 1 && (
                <g className="animate-fadeIn">
                  {/* Left face arrow */}
                  <line x1={-30} y1={-20} x2={-30} y2={20} stroke="#f59e0b" strokeWidth={1.5} />
                  <polygon points="-30,20 -32.5,16 -27.5,16" fill="#f59e0b" />
                  
                  {/* Right face arrow */}
                  <line x1={30} y1={20} x2={30} y2={-20} stroke="#f59e0b" strokeWidth={1.5} />
                  <polygon points="30,-20 27.5,-16 32.5,-16" fill="#f59e0b" />

                  <text x={36} y={3} className="fill-amber-500 text-[8px] font-mono font-bold">
                    τ_xy
                  </text>
                  <text x={-48} y={3} className="fill-amber-500 text-[8px] font-mono font-bold">
                    τ_xy
                  </text>
                </g>
              )}

              {/* Complementary horizontal shear stress arrows (Step 3) */}
              {currentTab === 3 && (
                <g className="animate-fadeIn">
                  {/* Top face arrow */}
                  <line x1={20} y1={-30} x2={-20} y2={-30} stroke="#6366f1" strokeWidth={1.5} />
                  <polygon points="-20,-30 -16,-32.5 -16,-27.5" fill="#6366f1" />
                  
                  {/* Bottom face arrow */}
                  <line x1={-20} y1={30} x2={20} y2={30} stroke="#6366f1" strokeWidth={1.5} />
                  <polygon points="20,30 16,27.5 16,32.5" fill="#6366f1" />

                  <text x={0} y={-35} className="fill-indigo-500 text-[8px] font-mono font-bold" textAnchor="middle">
                    τ_yx
                  </text>
                  <text x={0} y={42} className="fill-indigo-500 text-[8px] font-mono font-bold" textAnchor="middle">
                    τ_yx
                  </text>
                </g>
              )}
            </g>
          )}
        </g>
      </svg>
    </ExpandableDrawing>
  );
};

export default ShearEquilibriumDrawing;
