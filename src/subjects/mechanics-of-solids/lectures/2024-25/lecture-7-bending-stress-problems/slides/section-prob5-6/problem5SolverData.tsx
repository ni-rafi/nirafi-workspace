import React from 'react';
import { type ClickSyncedTabItem } from '@/features/presentation/components/elements/ClickSyncedTabs';
import { LatexFormula } from '@/features/presentation/components/elements';
import { ExpandableDrawing } from '@/shared/components';

export const Problem5Visualizer: React.FC<{ click: number }> = ({ click }) => {
  // Visualizes the dynamic drawing components
  return (
    <ExpandableDrawing title="Symmetrical Retrofitted Cross-Section" description="A standard core section reinforced symmetrically with top and bottom cover plates.">
      <svg viewBox="0 0 240 240" className="w-[200px] h-[210px] overflow-visible">
        {/* Core section */}
        <rect x={70} y={50} width={100} height={140} fill="rgba(99, 102, 241, 0.04)" stroke="var(--foreground)" strokeWidth={1.5} />
        
        {/* Reinforced Top Plate (Fade in at click 1) */}
        {click >= 1 && (
          <rect x={40} y={35} width={160} height={15} fill="rgba(245, 158, 11, 0.2)" stroke="var(--primary)" strokeWidth={1.5} className="animate-in fade-in duration-300" />
        )}
        {/* Reinforced Bottom Plate (Fade in at click 1) */}
        {click >= 1 && (
          <rect x={40} y={190} width={160} height={15} fill="rgba(245, 158, 11, 0.2)" stroke="var(--primary)" strokeWidth={1.5} className="animate-in fade-in duration-300" />
        )}

        {/* Core dimensions */}
        <line x1={70} y1={215} x2={170} y2={215} stroke="var(--muted-foreground)" strokeWidth={0.8} />
        <text x={120} y={228} textAnchor="middle" className="fill-muted-foreground text-[10px] font-bold">b = 100 mm</text>
        <line x1={30} y1={50} x2={30} y2={190} stroke="var(--muted-foreground)" strokeWidth={0.8} />
        <text x={18} y={120} textAnchor="middle" className="fill-muted-foreground text-[10px] font-bold" transform="rotate(-90 18 120)">d = 240 mm</text>

        {/* Plate dimensions (click >= 4) */}
        {click >= 4 && (
          <g className="animate-in fade-in duration-300">
            <line x1={40} y1={20} x2={200} y2={20} stroke="var(--primary)" strokeWidth={0.8} />
            <text x={120} y={12} textAnchor="middle" className="fill-primary text-[10px] font-bold">bp = 200 mm</text>
            <line x1={215} y1={35} x2={215} y2={50} stroke="var(--primary)" strokeWidth={0.8} />
            <text x={228} y={45} textAnchor="middle" className="fill-primary text-[10px] font-bold" transform="rotate(-90 228 45)">tp = 15 mm</text>
          </g>
        )}

        <circle cx={120} cy={120} r={3} fill="var(--destructive)" />
        <line x1={50} y1={120} x2={190} y2={120} stroke="var(--destructive)" strokeWidth={1} strokeDasharray="4,2" />
        <text x={195} y={124} className="fill-destructive text-[10px] font-bold">N.A.</text>
      </svg>
    </ExpandableDrawing>
  );
};

export const getProblem5SolverItems = (currentClick: number): ClickSyncedTabItem[] => {
  return [
    {
      title: '1. Composite Inertia',
      badge: <LatexFormula math="I_{\text{comp}}" />,
      badgeVariant: 'primary',
      description: 'Evaluate the composite moment of inertia by adding the core inertia and the transfer contribution of both plates.',
      rightVisualizer: <Problem5Visualizer click={currentClick} />,
      rightContent: (
        <div className="mt-3 space-y-3 bg-muted/10 p-3.5 rounded-xl border border-border/40 text-xs">
          <p className="font-bold text-foreground">Inertia Summation:</p>
          {currentClick >= 2 && (
            <div className="py-1.5 text-center bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 rounded font-bold animate-in fade-in duration-300">
              <LatexFormula math="I_{\text{comp}} = 217.76 \times 10^6\text{ mm}^4" />
            </div>
          )}
        </div>
      ),
      leftBottomContent: (
        <div className="space-y-4">
          <div className="space-y-2 text-xs">
            <p className="font-bold text-foreground">Parallel Axis Transfer:</p>
            <div className="my-1.5 py-1.5 text-center bg-muted/30 border border-border/40 rounded">
              <LatexFormula math="I_{\text{comp}} = I_{\text{core}} + 2 \cdot (I_p + A_p \cdot d^2)" />
            </div>
          </div>
        </div>
      )
    },
    {
      title: '2. Capacity & Modulus',
      badge: <LatexFormula math="M_{\text{allow}}" />,
      badgeVariant: 'warning',
      description: 'Solve the reinforced composite section modulus and governing bending moment capacity.',
      rightVisualizer: <Problem5Visualizer click={currentClick} />,
      rightContent: (
        <div className="mt-3 space-y-3 bg-muted/10 p-3.5 rounded-xl border border-border/40 text-xs animate-in fade-in duration-300">
          <p className="font-bold text-foreground">Capacity for Original Parameters:</p>
          <ul className="list-disc pl-4 space-y-1 text-muted-foreground text-[11px]">
            <li>Outer Distance: <LatexFormula math="y_{\max} = 135\text{ mm}" /></li>
            {currentClick >= 4 && (
              <li className="animate-in slide-in-from-left-1 duration-200">
                Composite Modulus: <LatexFormula math="Z_{\text{comp}} = 1.613 \times 10^6\text{ mm}^3" />
              </li>
            )}
          </ul>
          {currentClick >= 5 && (
            <div className="py-1 text-center bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 rounded font-bold font-mono text-sm animate-in fade-in duration-300">
              M_allow = 225.8 kNm (+61.3% gain)
            </div>
          )}
        </div>
      ),
      leftBottomContent: (
        <div className="space-y-3 animate-in fade-in duration-300 text-xs">
          <div>
            <p className="font-bold text-foreground">Section Modulus & Capacity:</p>
            <div className="my-1 py-1 text-center bg-muted/30 border border-border/40 rounded font-mono text-[11px]">
              <LatexFormula math="Z_{\text{comp}} = \frac{I_{\text{comp}}}{y_{\max}} = 1.613 \times 10^6\text{ mm}^3" />
            </div>
          </div>
          {currentClick >= 4 && (
            <div className="animate-in fade-in duration-300">
              <p className="font-bold text-foreground">Allowable Moment:</p>
              <div className="my-1 py-1 text-center bg-muted/30 border border-border/40 rounded font-mono text-[11px]">
                <LatexFormula math="M_{\text{allow}} = 140 \cdot 1.613 \times 10^6 = 225.8\text{ kNm}" />
              </div>
            </div>
          )}
        </div>
      )
    }
  ];
};
