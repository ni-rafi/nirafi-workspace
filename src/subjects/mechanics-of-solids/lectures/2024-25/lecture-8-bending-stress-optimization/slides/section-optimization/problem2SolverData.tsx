import React from 'react';
import { type ClickSyncedTabItem } from '@/features/presentation/components/elements/ClickSyncedTabs';
import { LatexFormula } from '@/features/presentation/components/elements';
import { ExpandableDrawing } from '@/shared/components';

export const Problem2Visualizer: React.FC<{ click: number }> = ({ click }) => {
  return (
    <ExpandableDrawing title="Shifted Neutral Axis" description="Cross-section diagram illustrating centroidal height y_bar = 87.11mm from the heavy bottom flange.">
      <svg viewBox="0 0 240 240" className="w-[220px] h-[210px] overflow-visible">
        {/* Draw Asymmetric Section outline */}
        {/* Bottom flange */}
        <rect x={60} y={160} width={120} height={30} fill="rgba(99, 102, 241, 0.08)" stroke="var(--foreground)" strokeWidth={1.5} />
        {/* Web */}
        <rect x={112.5} y={40} width={15} height={120} fill="rgba(99, 102, 241, 0.08)" stroke="var(--foreground)" strokeWidth={1.5} />
        {/* Top flange */}
        <rect x={90} y={25} width={60} height={15} fill="rgba(99, 102, 241, 0.08)" stroke="var(--foreground)" strokeWidth={1.5} />

        {/* NA line (Fade in at click 1) */}
        {click >= 1 && (
          <g className="animate-in fade-in duration-300">
            <line x1={30} y1={134.33} x2={210} y2={134.33} stroke="var(--destructive)" strokeWidth={2} strokeDasharray="4,2" />
            <circle cx={120} cy={134.33} r={3.5} fill="var(--destructive)" />
            <text x={215} y={138.33} className="fill-destructive text-[12px] font-bold">N.A.</text>
          </g>
        )}
        
        {/* Dimensions (Fade in at click 2) */}
        {click >= 2 && (
          <g className="animate-in fade-in duration-300" stroke="var(--primary)" strokeWidth={1.2}>
            <line x1={45} y1={190} x2={45} y2={134.33} />
            <line x1={40} y1={190} x2={50} y2={190} />
            <line x1={40} y1={134.33} x2={50} y2={134.33} />
            <text x={35} y={166} textAnchor="end" className="fill-primary text-[12px] font-bold" stroke="none">y_bot = 87.11</text>

            <line x1={45} y1={25} x2={45} y2={134.33} />
            <line x1={40} y1={25} x2={50} y2={25} />
            <text x={35} y={75} textAnchor="end" className="fill-primary text-[12px] font-bold" stroke="none">y_top = 172.89</text>
          </g>
        )}
      </svg>
    </ExpandableDrawing>
  );
};

export const getProblem2SolverItems = (currentClick: number): ClickSyncedTabItem[] => {
  return [
    {
      title: '1. Centroid Setup',
      badge: <LatexFormula math="\bar{y}" />,
      badgeVariant: 'primary',
      description: 'Formulate centroid height y_bar from the bottom of the section by taking first moments of segmented shapes.',
      rightVisualizer: <Problem2Visualizer click={currentClick} />,
      rightContent: (
        <div className="mt-3 space-y-3 bg-muted/10 p-3.5 rounded-xl border border-border/40 text-xs">
          <p className="font-bold text-foreground">Global Centroid Calculation:</p>
          {currentClick >= 2 && (
            <div className="py-1.5 text-center bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 rounded font-bold animate-in fade-in duration-300">
              <LatexFormula math="\bar{y} = 87.11\text{ mm from bottom}" />
            </div>
          )}
        </div>
      ),
      leftBottomContent: (
        <div className="space-y-4">
          <div className="space-y-2 text-xs">
            <p className="font-bold text-foreground">Segmented Areas & Centroids:</p>
            <ul className="list-disc pl-4 space-y-1 text-muted-foreground text-[11px]">
              <li>Bottom flange: <LatexFormula math="A_1 = 160 \times 40 = 6,400\text{ mm}^2" /></li>
              <li>Web segment: <LatexFormula math="A_2 = 200 \times 20 = 4,000\text{ mm}^2" /></li>
              <li>Top flange: <LatexFormula math="A_3 = 80 \times 20 = 1,600\text{ mm}^2" /></li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: '2. Capacity Evaluation',
      badge: <LatexFormula math="M_{\text{allow}}" />,
      badgeVariant: 'success',
      description: 'Verify capacity safety margins under different UDL loadings and asymmetric tensile/compressive limits.',
      rightVisualizer: <Problem2Visualizer click={currentClick} />,
      rightContent: (
        <div className="mt-3 space-y-3 bg-muted/10 p-3.5 rounded-xl border border-border/40 text-xs animate-in fade-in duration-300">
          <p className="font-bold text-foreground">Resisting Capacity Limits (Original Shape):</p>
          {currentClick >= 4 && (
            <ul className="list-disc pl-4 space-y-1 text-muted-foreground text-[11px] animate-in slide-in-from-left-1 duration-200">
              <li>Compression limit (top fiber): <LatexFormula math="M_c = 118.1\text{ kNm}" /></li>
              <li>Tension limit (bottom fiber): <LatexFormula math="M_t = 87.9\text{ kNm}" /></li>
            </ul>
          )}
          {currentClick >= 5 && (
            <div className="py-1.5 text-center bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 rounded font-bold animate-in fade-in duration-300">
              M = 87.9 kNm (Tension governs)
            </div>
          )}
        </div>
      ),
      leftBottomContent: (
        <div className="space-y-4 animate-in fade-in duration-300">
          <div className="space-y-2 text-xs">
            <p className="font-bold text-foreground">Stress capacity formulas:</p>
            <div className="my-1.5 py-1.5 text-center bg-muted/30 border border-border/40 rounded">
              <LatexFormula math="M_c = \frac{\sigma_c \cdot I_{xx}}{y_{\text{top}}}, \quad M_t = \frac{\sigma_t \cdot I_{xx}}{y_{\text{bottom}}}" />
            </div>
          </div>
        </div>
      )
    }
  ];
};
