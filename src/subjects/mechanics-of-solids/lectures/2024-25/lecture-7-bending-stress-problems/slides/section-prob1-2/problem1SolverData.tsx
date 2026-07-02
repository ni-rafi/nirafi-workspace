import React from 'react';
import { type ClickSyncedTabItem } from '@/features/presentation/components/elements/ClickSyncedTabs';
import { LatexFormula, SlideParagraph } from '@/features/presentation/components/elements';
import { ExpandableDrawing } from '@/shared/components';

export const Problem1Visualizer: React.FC<{ click: number }> = ({ click }) => {
  // Tab 0: click 0, 1, 2
  // Tab 1: click 3, 4, 5
  // Tab 2: click 6, 7, 8
  // Tab 3: click 9, 10, 11, 12

  if (click <= 2) {
    // Step 1: Beam Loading FBD
    return (
      <ExpandableDrawing title="Simply Supported Beam UDL Loading" description="Loading diagram for a simply supported beam of span L = 4m under a uniform load w = 4.5 kN/m.">
        <svg viewBox="0 0 240 180" className="w-[260px] h-[170px] overflow-visible">
          {/* Beam line */}
          <line x1={30} y1={100} x2={210} y2={100} stroke="var(--foreground)" strokeWidth={3} />
          {/* Supports */}
          <polygon points="30,100 23,115 37,115" fill="none" stroke="var(--foreground)" strokeWidth={1.5} />
          <polygon points="210,100 203,115 217,115" fill="none" stroke="var(--foreground)" strokeWidth={1.5} />
          <circle cx={210} cy={119} r={2.5} fill="var(--foreground)" />

          {/* UDL line & arrows (Fade in at click 1) */}
          {click >= 1 && (
            <g className="animate-in fade-in duration-300">
              <line x1={30} y1={70} x2={210} y2={70} stroke="var(--primary)" strokeWidth={1.5} strokeDasharray="3,3" />
              <path d="M 30 70 Q 45 78 60 70 Q 75 78 90 70 Q 105 78 120 70 Q 135 78 150 70 Q 165 78 180 70 Q 195 78 210 70" fill="none" stroke="var(--primary)" strokeWidth={1.8} />
              <text x={120} y={55} textAnchor="middle" className="fill-primary text-[12px] font-bold">w = 4.5 kN/m</text>
            </g>
          )}

          {/* Dimension L */}
          <line x1={30} y1={140} x2={210} y2={140} stroke="var(--muted-foreground)" strokeWidth={1} />
          <line x1={30} y1={135} x2={30} y2={145} stroke="var(--muted-foreground)" strokeWidth={1} />
          <line x1={210} y1={135} x2={210} y2={145} stroke="var(--muted-foreground)" strokeWidth={1} />
          <text x={120} y={158} textAnchor="middle" className="fill-muted-foreground text-[12px] font-mono font-bold">L = 4.0 m</text>
        </svg>
      </ExpandableDrawing>
    );
  }

  if (click <= 5) {
    // Step 2: Cross Section stiffness highlight
    return (
      <ExpandableDrawing title="Rectangular Cross-Section Stiffness" description="Cross-section highlights showing width b = 60mm and height h = 150mm.">
        <svg viewBox="0 0 240 240" className="w-[220px] h-[210px] overflow-visible">
          <rect x={70} y={30} width={100} height={160} fill="rgba(99, 102, 241, 0.08)" stroke="var(--foreground)" strokeWidth={2} />

          {/* Highlight width dimension (click >= 4) */}
          {click >= 4 && (
            <g className="animate-in fade-in duration-300">
              <line x1={70} y1={210} x2={170} y2={210} stroke="var(--primary)" strokeWidth={2} />
              <line x1={70} y1={205} x2={70} y2={215} stroke="var(--primary)" strokeWidth={1.5} />
              <line x1={170} y1={205} x2={170} y2={215} stroke="var(--primary)" strokeWidth={1.5} />
              <text x={120} y={228} textAnchor="middle" className="fill-primary text-[12px] font-bold">b = 60 mm</text>
            </g>
          )}

          {/* Highlight depth dimension (click >= 4) */}
          {click >= 4 && (
            <g className="animate-in fade-in duration-300">
              <line x1={45} y1={30} x2={45} y2={190} stroke="var(--primary)" strokeWidth={2} />
              <line x1={40} y1={30} x2={50} y2={30} stroke="var(--primary)" strokeWidth={1.5} />
              <line x1={40} y1={190} x2={50} y2={190} stroke="var(--primary)" strokeWidth={1.5} />
              <text x={28} y={115} textAnchor="middle" className="fill-primary text-[12px] font-bold" transform="rotate(-90 28 115)">h = 150 mm</text>
            </g>
          )}

          <circle cx={120} cy={110} r={3.5} fill="var(--destructive)" />
          <line x1={60} y1={110} x2={180} y2={110} stroke="var(--destructive)" strokeWidth={1.2} strokeDasharray="4,2" opacity={0.7} />
          <text x={186} y={114} className="fill-destructive text-[12px] font-bold">N.A.</text>
        </svg>
      </ExpandableDrawing>
    );
  }

  if (click <= 8) {
    // Step 3: Outermost fiber highlights
    return (
      <ExpandableDrawing title="Extreme Fiber Distances" description="Highlights of the top and bottom extreme fiber distances y_max = ±75mm from the neutral axis.">
        <svg viewBox="0 0 240 240" className="w-[220px] h-[210px] overflow-visible">
          <rect x={70} y={30} width={100} height={160} fill="rgba(99, 102, 241, 0.04)" stroke="var(--foreground)" strokeWidth={1.5} />

          {/* NA line */}
          <line x1={60} y1={110} x2={180} y2={110} stroke="var(--destructive)" strokeWidth={2} strokeDasharray="4,2" />
          <text x={186} y={114} className="fill-destructive text-[12px] font-bold">N.A.</text>

          {/* Centroid dot */}
          <circle cx={120} cy={110} r={4.5} fill="var(--destructive)" />

          {/* Top fiber highlight */}
          <line x1={70} y1={30} x2={170} y2={30} stroke="var(--primary)" strokeWidth={3} />

          {click >= 7 && (
            <g className="animate-in fade-in duration-300">
              <line x1={190} y1={110} x2={190} y2={30} stroke="var(--primary)" strokeWidth={1.2} strokeDasharray="2,2" />
              <line x1={185} y1={30} x2={195} y2={30} stroke="var(--primary)" strokeWidth={1.2} />
              <line x1={185} y1={110} x2={195} y2={110} stroke="var(--primary)" strokeWidth={1.2} />
              <text x={200} y={75} className="fill-primary text-[12px] font-bold">y_max = 75 mm</text>
            </g>
          )}

          {/* Bottom fiber highlight */}
          <line x1={70} y1={190} x2={170} y2={190} stroke="var(--primary)" strokeWidth={3} />
        </svg>
      </ExpandableDrawing>
    );
  }

  // Step 4: Stress distribution gradient plot (click 9, 10, 11, 12)
  return (
    <ExpandableDrawing title="Stress Distribution Gradient" description="Plot demonstrating linear variation of bending stress across the beam depth: max compression on the top fiber, zero at the neutral axis, and max tension on the bottom fiber.">
      <svg viewBox="0 0 240 200" className="w-[240px] h-[190px] overflow-visible">
        {/* Baseline */}
        <line x1={120} y1={20} x2={120} y2={180} stroke="var(--border)" strokeWidth={2} />

        {/* Stress line (Fade in at click 10) */}
        {click >= 10 && (
          <g className="animate-in fade-in duration-300">
            <line x1={60} y1={20} x2={180} y2={180} stroke="var(--primary)" strokeWidth={2.2} />
            <polygon points="120,20 60,20 120,100" fill="#ef4444" fillOpacity={0.15} />
            <polygon points="120,180 180,180 120,100" fill="#10b981" fillOpacity={0.15} />
          </g>
        )}

        {/* Labels (Fade in top fiber calculation at click 10) */}
        {click >= 10 && (
          <g className="animate-in fade-in duration-300">
            <text x={55} y={24} textAnchor="end" className="fill-red-500 text-[12px] font-mono font-bold">-40 MPa (C)</text>
          </g>
        )}

        {/* Labels (Fade in bottom fiber calculation at click 11) */}
        {click >= 11 && (
          <g className="animate-in fade-in duration-300">
            <text x={185} y={184} className="fill-emerald-500 text-[12px] font-mono font-bold">+40 MPa (T)</text>
          </g>
        )}

        <line x1={50} y1={100} x2={190} y2={100} stroke="var(--destructive)" strokeWidth={1.2} strokeDasharray="4,2" opacity={0.7} />
        <text x={195} y={104} className="fill-destructive text-[12px] font-bold">N.A.</text>
      </svg>
    </ExpandableDrawing>
  );
};

export const getProblem1SolverItems = (currentClick: number): ClickSyncedTabItem[] => [
  {
    title: '1. Moment Demand',
    badge: <LatexFormula math="M_{\max}" />,
    badgeVariant: 'primary',
    description: 'Evaluate the peak bending moment by referencing the simply supported UDL configuration.',
    rightVisualizer: <Problem1Visualizer click={currentClick} />,
    rightContent: (
      <div className="mt-3 space-y-3 bg-muted/10 p-3.5 rounded-xl border border-border/40 text-xs">
        <p className="font-bold text-foreground">Peak Moment Value:</p>
        {currentClick >= 2 && (
          <div className="py-1.5 text-center bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 rounded font-bold text-sm animate-in fade-in duration-300">
            <LatexFormula math="M_{\max} = \frac{w \cdot L^2}{8} = 9\text{ kN}\cdot\text{m}" />
          </div>
        )}
      </div>
    ),
    leftBottomContent: (
      <div className="space-y-4">
        <div className="space-y-2 text-xs">
          <p className="font-bold text-foreground">Loading Equations:</p>
          <div className="my-1 py-1 text-center bg-muted/30 border border-border/40 rounded">
            <LatexFormula math="M_{\max} = \frac{w \cdot L^2}{8}" />
          </div>
        </div>
      </div>
    )
  },
  {
    title: '2. Section Inertia',
    badge: <LatexFormula math="I_{xx}" />,
    badgeVariant: 'warning',
    description: 'Evaluate the centroidal moment of inertia using standard rectangular parameters.',
    rightVisualizer: <Problem1Visualizer click={currentClick} />,
    rightContent: (
      <div className="mt-3 space-y-3 bg-muted/10 p-3.5 rounded-xl border border-border/40 text-xs animate-in fade-in duration-300">
        <p className="font-bold text-foreground">Second Moment of Area Value:</p>
        {currentClick >= 5 && (
          <div className="py-1.5 text-center bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 rounded font-bold text-sm animate-in fade-in duration-300">
            <LatexFormula math="I_{xx} = 16.875 \times 10^6\text{ mm}^4" />
          </div>
        )}
      </div>
    ),
    leftBottomContent: (
      <div className="space-y-4">
        <div className="space-y-2 text-xs">
          <p className="font-bold text-foreground">Second Moment formula:</p>
          <div className="my-1 py-1 text-center bg-muted/30 border border-border/40 rounded">
            <LatexFormula math="I_{xx} = \frac{b \cdot h^3}{12}" />
          </div>
        </div>
      </div>
    )
  },
  {
    title: '3. Flexure Formula',
    badge: <LatexFormula math="\sigma_{\max}" />,
    badgeVariant: 'error',
    description: 'Evaluate the maximum normal bending stresses at the outermost fibers.',
    rightVisualizer: <Problem1Visualizer click={currentClick} />,
    rightContent: (
      <div className="mt-3 space-y-3 bg-muted/10 p-3.5 rounded-xl border border-border/40 text-xs animate-in fade-in duration-300">
        <p className="font-bold text-foreground">Flexure Stress Result:</p>
        {currentClick >= 7 && (
          <div className="space-y-2 animate-in fade-in duration-300">
            <div className="text-[11px] text-muted-foreground">
              Substituting values:
              <div className="my-1 py-1 text-center bg-muted/30 border border-border/40 rounded font-mono">
                <LatexFormula math="\sigma_{\max} = \frac{9 \times 10^6 \cdot 75}{16.875 \times 10^6}" />
              </div>
            </div>
            {currentClick >= 8 && (
              <div className="py-1.5 text-center bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 rounded font-bold text-sm animate-in fade-in duration-300">
                <LatexFormula math="\sigma_{\max} = 40.0\text{ MPa}" />
              </div>
            )}
          </div>
        )}
      </div>
    ),
    leftBottomContent: (
      <div className="space-y-4">
        <div className="space-y-2 text-xs">
          <p className="font-bold text-foreground">Maximum Flexure Stress:</p>
          <div className="my-1 py-1 text-center bg-muted/30 border border-border/40 rounded">
            <LatexFormula math="\sigma_{\max} = \frac{M \cdot y_{\max}}{I}" />
          </div>
        </div>
      </div>
    )
  },
  {
    title: '4. Stress Distribution',
    badge: 'Sketch',
    badgeVariant: 'success',
    description: 'The stress varies linearly across the depth, passing through zero at the neutral axis.',
    rightVisualizer: <Problem1Visualizer click={currentClick} />,
    rightContent: (
      <div className="mt-3 space-y-3 bg-muted/10 p-3.5 rounded-xl border border-border/40 text-xs animate-in fade-in duration-300">
        <p className="font-bold text-foreground">Stress Gradient Calculations:</p>
        <ul className="list-none pl-1 space-y-2 text-[11px]">
          {currentClick >= 10 && (
            <li className="animate-in slide-in-from-left-1 duration-200">
              <strong>• Top Fiber (y = +75 mm)</strong>:
              <div className="my-1 py-0.5 text-center bg-red-500/10 border border-red-500/20 text-red-500 rounded font-mono">
                <LatexFormula math="\sigma_c = -40\text{ MPa (Comp)}" />
              </div>
            </li>
          )}
          {currentClick >= 11 && (
            <li className="animate-in slide-in-from-left-1 duration-200">
              <strong>• Bottom Fiber (y = -75 mm)</strong>:
              <div className="my-1 py-0.5 text-center bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded font-mono">
                <LatexFormula math="\sigma_t = +40\text{ MPa (Tension)}" />
              </div>
            </li>
          )}
          {currentClick >= 12 && (
            <li className="animate-in slide-in-from-left-1 duration-200">
              <strong>• Neutral Axis (y = 0 mm)</strong>:
              <div className="my-1 py-0.5 text-center bg-muted/30 border border-border/40 text-muted-foreground rounded font-mono">
                <LatexFormula math="\sigma = 0\text{ MPa}" />
              </div>
            </li>
          )}
        </ul>
      </div>
    ),
    leftBottomContent: (
      <div className="space-y-2">
        <SlideParagraph variant="plain" className="text-[11px] text-muted-foreground leading-normal">
          Linear stress gradient distribution demonstrates zero stress at the neutral axis.
        </SlideParagraph>
      </div>
    )
  }
];
