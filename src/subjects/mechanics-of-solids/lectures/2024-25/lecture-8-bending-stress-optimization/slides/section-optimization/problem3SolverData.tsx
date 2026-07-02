import React from 'react';
import { type ClickSyncedTabItem } from '@/features/presentation/components/elements/ClickSyncedTabs';
import { LatexFormula } from '@/features/presentation/components/elements';
import { ExpandableDrawing } from '@/shared/components';

export const Problem3Visualizer: React.FC<{ click: number }> = ({ click }) => {
  return (
    <ExpandableDrawing title="Tapered Cantilever Setup" description="Linearly tapered cantilever beam with loading P at the free end, end depth h_0, and taper rate k.">
      <svg viewBox="0 0 240 180" className="w-[220px] h-[160px] overflow-visible">
        {/* Fixed wall (Fade in at click 1) */}
        {click >= 1 && (
          <g className="animate-in fade-in duration-300">
            <line x1={190} y1={25} x2={190} y2={155} stroke="var(--foreground)" strokeWidth={3} />
            <line x1={190} y1={30} x2={202} y2={20} stroke="var(--border)" strokeWidth={1} />
            <line x1={190} y1={55} x2={202} y2={45} stroke="var(--border)" strokeWidth={1} />
            <line x1={190} y1={80} x2={202} y2={70} stroke="var(--border)" strokeWidth={1} />
            <line x1={190} y1={105} x2={202} y2={95} stroke="var(--border)" strokeWidth={1} />
            <line x1={190} y1={130} x2={202} y2={120} stroke="var(--border)" strokeWidth={1} />
            <text x={115} y={162} textAnchor="middle" className="fill-muted-foreground text-[11px] font-bold">Length L = 2.0m</text>
          </g>
        )}
        
        {/* Tapered beam shape */}
        <polygon points="40,75 190,35 190,145 40,115" fill="rgba(99, 102, 241, 0.08)" stroke="var(--foreground)" strokeWidth={2} />

        {/* Load P at free end (Fade in at click 2) */}
        {click >= 2 && (
          <g className="animate-in fade-in duration-300">
            <line x1={40} y1={25} x2={40} y2={70} stroke="var(--destructive)" strokeWidth={2} />
            <polygon points="36,65 44,65 40,71" fill="var(--destructive)" />
            <text x={40} y={16} textAnchor="middle" className="fill-destructive text-[12px] font-bold">P = 15 kN</text>
          </g>
        )}

        {/* Dimension labels */}
        <text x={34} y={99} textAnchor="end" className="fill-muted-foreground text-[11px] font-bold">h₀</text>
        <text x={184} y={94} textAnchor="end" className="fill-muted-foreground text-[11px] font-bold">h_max</text>
      </svg>
    </ExpandableDrawing>
  );
};

export const getProblem3SolverItems = (currentClick: number): ClickSyncedTabItem[] => {
  return [
    {
      title: '1. Equation Setup',
      badge: <LatexFormula math="Z(x)" />,
      badgeVariant: 'primary',
      description: 'Formulate normal bending stress as a function of the axial coordinate x from the free end.',
      rightVisualizer: <Problem3Visualizer click={currentClick} />,
      rightContent: (
        <div className="mt-3 space-y-3 bg-muted/10 p-3.5 rounded-xl border border-border/40 text-xs">
          <p className="font-bold text-foreground">Stress Function Formulation:</p>
          <div className="my-1.5 py-1.5 text-center bg-muted/30 border border-border/40 rounded">
            <LatexFormula math="\sigma(x) = \frac{M(x)}{Z(x)} = \frac{6 \cdot P \cdot x}{b \cdot (h_0 + k \cdot x)^2}" />
          </div>
        </div>
      ),
      leftBottomContent: (
        <div className="space-y-4">
          <div className="space-y-2 text-xs">
            <ul className="list-disc pl-4 space-y-1 text-muted-foreground text-[11px]">
              <li>At distance <LatexFormula math="x" />: Moment <LatexFormula math="M(x) = P \cdot x" /></li>
              <li>Depth function: <LatexFormula math="h(x) = h_0 + k \cdot x" /></li>
              <li>Section Modulus: <LatexFormula math="Z(x) = b \cdot h(x)^2 / 6" /></li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: '2. Peak Optimization',
      badge: <LatexFormula math="\sigma_{\max}" />,
      badgeVariant: 'success',
      description: 'Find the critical peak stress location along the beam span using differential calculus.',
      rightVisualizer: <Problem3Visualizer click={currentClick} />,
      rightContent: (
        <div className="mt-3 space-y-3 bg-muted/10 p-3.5 rounded-xl border border-border/40 text-xs animate-in fade-in duration-300">
          <p className="font-bold text-foreground">Critical Peak Stress Solution:</p>
          {currentClick >= 4 && (
            <ul className="list-disc pl-4 space-y-1 text-muted-foreground text-[11px] animate-in slide-in-from-left-1 duration-200">
              <li>Optimal location: <LatexFormula math="x_{\text{crit}} = h_0 / k = 1.5\text{ m}" /></li>
              <li>Depth at peak: <LatexFormula math="h(1.5) = 300\text{ mm}" /></li>
            </ul>
          )}
          {currentClick >= 4 && (
            <div className="py-1.5 text-center bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded font-bold mt-2 animate-in fade-in duration-300">
              Peak Stress σ_max = 15.0 MPa (Governing stress)
            </div>
          )}
        </div>
      ),
      leftBottomContent: (
        <div className="space-y-4 animate-in fade-in duration-300">
          <div className="space-y-2 text-xs">
            <p className="font-bold text-foreground">Critical Coordinate Formula:</p>
            <div className="my-1.5 py-1.5 text-center bg-muted/30 border border-border/40 rounded">
              <LatexFormula math="\frac{d\sigma}{dx} = 0 \implies x_{\text{crit}} = \frac{h_0}{k}" />
            </div>
          </div>
        </div>
      )
    }
  ];
};
