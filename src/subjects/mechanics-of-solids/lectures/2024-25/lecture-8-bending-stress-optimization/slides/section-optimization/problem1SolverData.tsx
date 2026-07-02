import React from 'react';
import { type ClickSyncedTabItem } from '@/features/presentation/components/elements/ClickSyncedTabs';
import { LatexFormula } from '@/features/presentation/components/elements';
import { ExpandableDrawing } from '@/shared/components';

export const Problem1Visualizer: React.FC<{ click: number }> = ({ click }) => {
  // Tab 0: click 0, 1, 2
  // Tab 1: click 3, 4, 5
  // Tab 2: click 6, 7, 8

  if (click <= 2) {
    // Step 1: Circular log geometry
    return (
      <ExpandableDrawing title="Circular Timber Log" description="A circular log of diameter D = 300 mm.">
        <svg viewBox="0 0 240 240" className="w-[220px] h-[210px] overflow-visible">
          <circle cx={120} cy={110} r={90} fill="rgba(99, 102, 241, 0.04)" stroke="var(--foreground)" strokeWidth={1.5} />
          <line x1={120} y1={110} x2={120} y2={20} stroke="var(--primary)" strokeWidth={1} strokeDasharray="3,3" />
          
          {click >= 1 && (
            <g className="animate-in fade-in duration-300">
              <line x1={120} y1={110} x2={210} y2={110} stroke="var(--primary)" strokeWidth={1.5} />
              <text x={165} y={100} textAnchor="middle" className="fill-primary text-[12px] font-mono font-bold">R = 150 mm</text>
            </g>
          )}
          
          {click >= 2 && (
            <g className="animate-in fade-in duration-300">
              <line x1={56} y1={46} x2={184} y2={174} stroke="var(--destructive)" strokeWidth={2} />
              <text x={140} y={130} className="fill-destructive text-[12px] font-mono font-bold" transform="rotate(45 140 130)">D = 300 mm</text>
            </g>
          )}
          <circle cx={120} cy={110} r={3.5} fill="var(--destructive)" />
        </svg>
      </ExpandableDrawing>
    );
  }

  // Step 2: Rectangle inside log
  return (
    <ExpandableDrawing title="Rectangular Beam Proportions" description="Rectangular cross-section carved inside the circular log.">
      <svg viewBox="0 0 240 240" className="w-[220px] h-[210px] overflow-visible">
        <circle cx={120} cy={110} r={90} fill="none" stroke="var(--border)" strokeWidth={1.2} strokeDasharray="2,2" />
        <rect x={120 - 52} y={110 - 73.5} width={104} height={147} fill="rgba(245, 158, 11, 0.08)" stroke="var(--foreground)" strokeWidth={2} />
        
        {click >= 4 && (
          <g className="animate-in fade-in duration-300">
            <line x1={120 - 52} y1={200} x2={120 + 52} y2={200} stroke="var(--primary)" strokeWidth={1} />
            <text x={120} y={215} textAnchor="middle" className="fill-primary text-[12px] font-mono font-bold">b</text>
            <line x1={52} y1={110 - 73.5} x2={52} y2={110 + 73.5} stroke="var(--primary)" strokeWidth={1} />
            <text x={40} y={110} textAnchor="middle" className="fill-primary text-[12px] font-mono font-bold" transform="rotate(-90 40 110)">d</text>
          </g>
        )}
        <circle cx={120} cy={110} r={3.5} fill="var(--destructive)" />
      </svg>
    </ExpandableDrawing>
  );
};

export const getProblem1SolverItems = (currentClick: number): ClickSyncedTabItem[] => {
  return [
    {
      title: '1. Section Modulus',
      badge: <LatexFormula math="Z(b, d)" />,
      badgeVariant: 'primary',
      description: 'Formulate the section modulus equation and establish the geometric constraint.',
      rightVisualizer: <Problem1Visualizer click={currentClick} />,
      rightContent: (
        <div className="mt-3 space-y-3 bg-muted/10 p-3.5 rounded-xl border border-border/40 text-xs">
          <p className="font-bold text-foreground">Section Modulus Equation:</p>
          {currentClick >= 2 && (
            <div className="py-1.5 text-center bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 rounded font-bold animate-in fade-in duration-300">
              <LatexFormula math="Z = \frac{b \cdot d^2}{6} = \frac{b \cdot (D^2 - b^2)}{6}" />
            </div>
          )}
        </div>
      ),
      leftBottomContent: (
        <div className="space-y-4">
          <div className="space-y-2 text-xs">
            <p className="font-bold text-foreground">Diagonal constraint:</p>
            <div className="my-1.5 py-1.5 text-center bg-muted/30 border border-border/40 rounded">
              <LatexFormula math="b^2 + d^2 = D^2 \implies d^2 = D^2 - b^2" />
            </div>
          </div>
        </div>
      )
    },
    {
      title: '2. Calculus Peak',
      badge: <LatexFormula math="dZ/db" />,
      badgeVariant: 'warning',
      description: 'Differentiate Z with respect to b and set it to zero for maximum value.',
      rightVisualizer: <Problem1Visualizer click={currentClick} />,
      rightContent: (
        <div className="mt-3 space-y-3 bg-muted/10 p-3.5 rounded-xl border border-border/40 text-xs animate-in fade-in duration-300">
          <p className="font-bold text-foreground">Calculus Output Equations:</p>
          {currentClick >= 5 && (
            <div className="py-1.5 text-center bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 rounded font-bold animate-in fade-in duration-300">
              <LatexFormula math="b = \frac{D}{\sqrt{3}}, \quad d = D \cdot \sqrt{\frac{2}{3}}" />
            </div>
          )}
        </div>
      ),
      leftBottomContent: (
        <div className="space-y-4">
          <div className="space-y-2 text-xs">
            <p className="font-bold text-foreground">First Derivative:</p>
            <div className="my-1.5 py-1.5 text-center bg-muted/30 border border-border/40 rounded">
              <LatexFormula math="\frac{dZ}{db} = \frac{1}{6} \cdot (D^2 - 3b^2) = 0" />
            </div>
          </div>
        </div>
      )
    },
    {
      title: '3. Optimal Sizing',
      badge: <LatexFormula math="b \times d" />,
      badgeVariant: 'success',
      description: 'Calculate the optimum rectangular beam dimensions from a log of diameter D = 300 mm.',
      rightVisualizer: (
        <ExpandableDrawing title="Sized Timber Rectangular Section" description="Cross-section sizing results showing optimal proportions b and d inside circular log.">
          <svg viewBox="0 0 240 240" className="w-[220px] h-[210px] overflow-visible">
            <circle cx={120} cy={110} r={90} fill="rgba(99, 102, 241, 0.04)" stroke="var(--border)" strokeWidth={1.5} />
            <rect x={120 - 52} y={110 - 73.5} width={104} height={147} fill="none" stroke="var(--foreground)" strokeWidth={2} />
            <text x={120} y={114} textAnchor="middle" className="fill-foreground text-[12px] font-mono font-bold">173x245</text>
          </svg>
        </ExpandableDrawing>
      ),
      rightContent: (
        <div className="mt-3 space-y-3 bg-muted/10 p-3.5 rounded-xl border border-border/40 text-xs animate-in fade-in duration-300">
          <p className="font-bold text-foreground">Sizing for Diameter D = 300 mm:</p>
          {currentClick >= 8 && (
            <div className="py-1.5 text-center bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 rounded font-bold">
              b = 173.2 mm, &nbsp; d = 244.9 mm
            </div>
          )}
        </div>
      ),
      leftBottomContent: (
        <div className="space-y-4 animate-in fade-in duration-300">
          <div className="space-y-2 text-xs">
            <p className="font-bold text-foreground">Numerical Substitutions:</p>
            <ul className="list-disc pl-4 space-y-1 text-muted-foreground text-[11px]">
              <li>Width: <LatexFormula math="b = 300 / \sqrt{3} = 173.2\text{ mm}" /></li>
              {currentClick >= 7 && (
                <li className="animate-in slide-in-from-left-1 duration-200">
                  Depth: <LatexFormula math="d = 300 \sqrt{2/3} = 244.9\text{ mm}" />
                </li>
              )}
            </ul>
          </div>
        </div>
      )
    }
  ];
};
