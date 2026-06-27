import React from 'react';
import { ClickSyncedTabs, ClickSyncedTabItem } from '@/features/presentation/components/elements/ClickSyncedTabs';
import { LatexFormula } from '@/features/presentation/components/elements';

export const EquationShapeConnections: React.FC = () => {
  const items: ClickSyncedTabItem[] = [
    {
      title: "Constant Function (V = C)",
      badge: "Degree 0",
      badgeVariant: "success",
      description: "Occurs in shear diagrams where there are no UDL loads. Yields a horizontal straight line (rectangular area).",
      rightContent: (
        <div className="flex flex-col items-center justify-center gap-4 w-full">
          <svg className="w-full max-w-[340px] h-[120px] overflow-visible" viewBox="0 0 200 80">
            <line x1="10" y1="60" x2="190" y2="60" className="stroke-slate-400" strokeWidth="1.5" />
            <rect x="35" y="25" width="130" height="35" className="fill-emerald-500/10 stroke-emerald-500" strokeWidth="2.5" />
            <circle cx="35" cy="25" r="4.5" className="fill-emerald-500 stroke-white dark:stroke-slate-900" strokeWidth="1.2" />
            <circle cx="165" cy="25" r="4.5" className="fill-emerald-500 stroke-white dark:stroke-slate-900" strokeWidth="1.2" />
            <text x="35" y="74" textAnchor="middle" className="text-[9px] font-mono fill-muted-foreground">x_start</text>
            <text x="165" y="74" textAnchor="middle" className="text-[9px] font-mono fill-muted-foreground">x_end</text>
          </svg>
          <div className="bg-emerald-500/5 px-3 py-1.5 border border-emerald-500/20 rounded-xl text-center">
            <LatexFormula math="V(x) = C" />
          </div>
        </div>
      )
    },
    {
      title: "Linear Function (y = ax + b)",
      badge: "Degree 1",
      badgeVariant: "info",
      description: "Occurs in SFD under UDLs, or in BMD where shear is constant. Yields a sloped straight line (triangular or trapezoidal area).",
      rightContent: (
        <div className="flex flex-col items-center justify-center gap-4 w-full">
          <svg className="w-full max-w-[340px] h-[120px] overflow-visible" viewBox="0 0 200 80">
            <line x1="10" y1="60" x2="190" y2="60" className="stroke-slate-400" strokeWidth="1.5" />
            <polygon points="35,60 165,20 165,60" className="fill-blue-500/10 stroke-blue-500" strokeWidth="2.5" />
            <circle cx="35" cy="60" r="4.5" className="fill-blue-500 stroke-white dark:stroke-slate-900" strokeWidth="1.2" />
            <circle cx="165" cy="20" r="4.5" className="fill-blue-500 stroke-white dark:stroke-slate-900" strokeWidth="1.2" />
            <text x="35" y="74" textAnchor="middle" className="text-[9px] font-mono fill-muted-foreground">x_start</text>
            <text x="165" y="74" textAnchor="middle" className="text-[9px] font-mono fill-muted-foreground">x_end</text>
          </svg>
          <div className="bg-blue-500/5 px-3 py-1.5 border border-blue-500/20 rounded-xl text-center">
            <LatexFormula math="V(x) = ax + b" />
          </div>
        </div>
      )
    },
    {
      title: "Quadratic Function (y = ax² + bx + c)",
      badge: "Degree 2",
      badgeVariant: "primary",
      description: "Occurs in moment diagrams under UDL loads. Yields a parabolic curve (curved area).",
      rightContent: (
        <div className="flex flex-col items-center justify-center gap-4 w-full">
          <svg className="w-full max-w-[340px] h-[120px] overflow-visible" viewBox="0 0 200 80">
            <line x1="10" y1="60" x2="190" y2="60" className="stroke-slate-400" strokeWidth="1.5" />
            <path d="M 35,60 Q 100,10 165,60 Z" className="fill-indigo-500/10 stroke-indigo-500" strokeWidth="2.5" />
            <circle cx="35" cy="60" r="4.5" className="fill-indigo-500 stroke-white dark:stroke-slate-900" strokeWidth="1.2" />
            <circle cx="165" cy="60" r="4.5" className="fill-indigo-500 stroke-white dark:stroke-slate-900" strokeWidth="1.2" />
            <text x="35" y="74" textAnchor="middle" className="text-[9px] font-mono fill-muted-foreground">x_start</text>
            <text x="165" y="74" textAnchor="middle" className="text-[9px] font-mono fill-muted-foreground">x_end</text>
          </svg>
          <div className="bg-indigo-500/5 px-3 py-1.5 border border-indigo-500/20 rounded-xl text-center">
            <LatexFormula math="M(x) = ax^2 + bx + c" />
          </div>
        </div>
      )
    }
  ];

  return (
    <ClickSyncedTabs
      title="Connecting Equations to Graph Shapes"
      items={items}
      leftTitle="Plotting Strategy: Degree of Equation vs. Diagram Shape"
      rightTitle="Visual Shape Profile"
      leftWidth="45%"
    />
  );
};

export default EquationShapeConnections;
