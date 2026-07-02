import React from 'react';
import { type ClickSyncedTabItem } from '@/features/presentation/components/elements/ClickSyncedTabs';
import { LatexFormula } from '@/features/presentation/components/elements';
import { ExpandableDrawing } from '@/shared/components';

export const Problem2Visualizer: React.FC<{ click: number }> = ({ click }) => {
  // Tab 0: click 0, 1, 2
  // Tab 1: click 3, 4, 5
  // Tab 2: click 6, 7, 8, 9

  if (click <= 2) {
    // Step 1: Beam Loading FBD
    return (
      <ExpandableDrawing title="Beam Loading Configuration" description="Simply supported beam under a UDL of w = 4 kN/m over a span of L = 5m.">
        <svg viewBox="0 0 240 180" className="w-[260px] h-[170px] overflow-visible">
          <line x1={30} y1={100} x2={210} y2={100} stroke="var(--foreground)" strokeWidth={3} />
          {/* Supports */}
          <polygon points="30,100 23,115 37,115" fill="none" stroke="var(--foreground)" strokeWidth={1.5} />
          <polygon points="210,100 203,115 217,115" fill="none" stroke="var(--foreground)" strokeWidth={1.5} />
          <circle cx={210} cy={119} r={2.5} fill="var(--foreground)" />

          {/* UDL (Fade in at click 1) */}
          {click >= 1 && (
            <g className="animate-in fade-in duration-300">
              <line x1={30} y1={70} x2={210} y2={70} stroke="var(--primary)" strokeWidth={1.5} strokeDasharray="3,3" />
              <path d="M 30 70 Q 45 78 60 70 Q 75 78 90 70 Q 105 78 120 70 Q 135 78 150 70 Q 165 78 180 70 Q 195 78 210 70" fill="none" stroke="var(--primary)" strokeWidth={1.8} />
              <text x={120} y={55} textAnchor="middle" className="fill-primary text-[12px] font-bold">w = 4.0 kN/m</text>
            </g>
          )}

          <line x1={30} y1={140} x2={210} y2={140} stroke="var(--muted-foreground)" strokeWidth={1} />
          <line x1={30} y1={135} x2={30} y2={145} stroke="var(--muted-foreground)" strokeWidth={1} />
          <line x1={210} y1={135} x2={210} y2={145} stroke="var(--muted-foreground)" strokeWidth={1} />
          <text x={120} y={158} textAnchor="middle" className="fill-muted-foreground text-[12px] font-mono font-bold">L = 5.0 m</text>
        </svg>
      </ExpandableDrawing>
    );
  }

  // Step 2: Parametric cross-section
  return (
    <ExpandableDrawing title="Parametric Rectangular Section" description="Rectangular cross-section showing width b = 60mm and variable height h.">
      <svg viewBox="0 0 240 240" className="w-[220px] h-[210px] overflow-visible">
        <rect x={70} y={30} width={100} height={160} fill="rgba(99, 102, 241, 0.08)" stroke="var(--foreground)" strokeWidth={2} />

        {/* Dimensions (click >= 4) */}
        {click >= 4 && (
          <g className="animate-in fade-in duration-300">
            <line x1={70} y1={210} x2={170} y2={210} stroke="var(--muted-foreground)" strokeWidth={1} />
            <text x={120} y={228} textAnchor="middle" className="fill-muted-foreground text-[12px] font-bold">b = 60 mm</text>
            <line x1={45} y1={30} x2={45} y2={190} stroke="var(--primary)" strokeWidth={2} />
            <text x={28} y={115} textAnchor="middle" className="fill-primary text-[12px] font-bold" transform="rotate(-90 28 115)">h = ?</text>
          </g>
        )}

        <circle cx={120} cy={110} r={3.5} fill="var(--destructive)" />
        <line x1={60} y1={110} x2={180} y2={110} stroke="var(--destructive)" strokeWidth={1.2} strokeDasharray="4,2" opacity={0.7} />
        <text x={186} y={114} className="fill-destructive text-[12px] font-bold">N.A.</text>
      </svg>
    </ExpandableDrawing>
  );
};

export const getProblem2SolverItems = (currentClick: number): ClickSyncedTabItem[] => {
  return [
    {
      title: '1. Moment Demand',
      badge: <LatexFormula math="M_{\max}" />,
      badgeVariant: 'primary',
      description: 'Evaluate the maximum bending moment under UDL loading.',
      rightVisualizer: <Problem2Visualizer click={currentClick} />,
      rightContent: (
        <div className="mt-3 space-y-3 bg-muted/10 p-3.5 rounded-xl border border-border/40 text-xs">
          <p className="font-bold text-foreground">Peak Moment Value:</p>
          {currentClick >= 2 && (
            <div className="py-1.5 text-center bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 rounded font-bold text-sm animate-in fade-in duration-300">
              <LatexFormula math="M_{\max} = \frac{w \cdot L^2}{8} = 12.5\text{ kN}\cdot\text{m}" />
            </div>
          )}
        </div>
      ),
      leftBottomContent: (
        <div className="space-y-4">
          <div className="space-y-2 text-xs">
            <p className="font-bold text-foreground">Peak Moment Equation:</p>
            <div className="my-1.5 py-1.5 text-center bg-muted/30 border border-border/40 rounded">
              <LatexFormula math="M = \frac{w \cdot L^2}{8}" />
            </div>
          </div>
        </div>
      )
    },
    {
      title: '2. Parametric Inertia',
      badge: <LatexFormula math="I(h)" />,
      badgeVariant: 'warning',
      description: 'Express cross-section stiffness properties in terms of the unknown depth variable h.',
      rightVisualizer: <Problem2Visualizer click={currentClick} />,
      rightContent: (
        <div className="mt-3 space-y-3 bg-muted/10 p-3.5 rounded-xl border border-border/40 text-xs">
          <p className="font-bold text-foreground">Inertia Output Equation:</p>
          {currentClick >= 5 && (
            <div className="py-1.5 text-center bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 rounded font-bold text-sm animate-in fade-in duration-300">
              <LatexFormula math="I_{xx} = 5 \cdot h^3\text{ mm}^4" />
            </div>
          )}
        </div>
      ),
      leftBottomContent: (
        <div className="space-y-4">
          <div className="space-y-2 text-xs">
            <p className="font-bold text-foreground">Inertia in terms of depth:</p>
            <div className="my-1.5 py-1.5 text-center bg-muted/30 border border-border/40 rounded">
              <LatexFormula math="I_{xx} = \frac{b \cdot h^3}{12}" />
            </div>
          </div>
        </div>
      )
    },
    {
      title: '3. Design Sizing',
      badge: <LatexFormula math="h_{\text{req}}" />,
      badgeVariant: 'success',
      description: 'Compute the required beam depth by selecting allowable stress limits and solving the sizing equation.',
      rightVisualizer: (
        <ExpandableDrawing title="Sized Beam Profile" description="Cross-section sizing diagram showing calculated depth h = 189.0mm relative to width b = 60mm.">
          <svg viewBox="0 0 200 240" className="w-[160px] h-[210px] overflow-visible">
            <rect x={70} y={30} width={60} height={180} fill="rgba(99, 102, 241, 0.08)" stroke="var(--foreground)" strokeWidth={2} />
            <text x={100} y={124} textAnchor="middle" className="fill-foreground text-[12px] font-mono font-bold">60x189</text>
          </svg>
        </ExpandableDrawing>
      ),
      rightContent: (
        <div className="mt-3 space-y-3 bg-muted/10 p-3.5 rounded-xl border border-border/40 text-xs animate-in fade-in duration-300">
          <p className="font-bold text-foreground">Sizing for Original Parameters:</p>
          <ul className="list-disc pl-4 space-y-1 text-muted-foreground text-[11px]">
            <li>Allowable stress governs: <LatexFormula math="35\text{ MPa}" /></li>
            {currentClick >= 7 && (
              <li className="animate-in slide-in-from-left-1 duration-200">
                Sizing Formula: <LatexFormula math="h = \sqrt{6M / (b \cdot \sigma)}" />
              </li>
            )}
            {currentClick >= 8 && (
              <li className="animate-in slide-in-from-left-1 duration-200">
                Math Substitution: <LatexFormula math="h = \sqrt{\frac{6 \times 12.5 \times 10^6}{60 \times 35}}" />
              </li>
            )}
          </ul>
          {currentClick >= 9 && (
            <div className="py-1 text-center bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 rounded font-bold font-mono text-sm animate-in fade-in duration-300">
              <LatexFormula math="h_{\text{req}} = 189.0\text{ mm}" />
            </div>
          )}
        </div>
      ),
      leftBottomContent: (
        <div className="space-y-3 animate-in fade-in duration-300 text-xs">
          <div>
            <p className="font-bold text-foreground">Allowable stress selection:</p>
            <div className="my-1 py-1 text-center bg-muted/30 border border-border/40 rounded font-mono text-[11px]">
              <LatexFormula math="\sigma_{\text{allow}} = \min(35, 45) = 35\text{ MPa}" />
            </div>
          </div>
          {currentClick >= 7 && (
            <div className="animate-in fade-in duration-300">
              <p className="font-bold text-foreground">Sizing Formula derivation:</p>
              <div className="my-1 py-1 text-center bg-muted/30 border border-border/40 rounded font-mono text-[11px]">
                <LatexFormula math="Z = \frac{M}{\sigma} \implies \frac{b \cdot h^2}{6} = \frac{M}{\sigma} \implies h = \sqrt{\frac{6 \cdot M}{b \cdot \sigma}}" />
              </div>
            </div>
          )}
        </div>
      )
    }
  ];
};
