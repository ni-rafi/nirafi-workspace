import React from 'react';
import { type ClickSyncedTabItem } from '@/features/presentation/components/elements/ClickSyncedTabs';
import { LatexFormula, SlideParagraph } from '@/features/presentation/components/elements';
import { ExpandableDrawing } from '@/shared/components';

export const Problem3Visualizer: React.FC<{ click: number }> = ({ click }) => {
  const isInverted = click >= 3;
  const topW = isInverted ? 120 : 60;
  const botW = isInverted ? 60 : 120;
  const NA_y = isInverted ? 140 - 175 * 0.5 : 140 - 125 * 0.5;

  const yBottomStd = 125;
  const yTopStd = 175;
  const yBottom = isInverted ? yTopStd : yBottomStd;
  const yTop = isInverted ? yBottomStd : yTopStd;

  return (
    <ExpandableDrawing title="Section Orientation Profile" description="Demonstrates tension and compression extreme fiber distance shifts (y_max) when the flanged section is inverted (rotated 180°).">
      <svg viewBox="0 0 240 180" className="w-[220px] h-[150px] overflow-visible">
        {/* Base reference */}
        <line x1={20} y1={140} x2={220} y2={140} stroke="var(--border)" strokeWidth={1} />

        {/* Flanges & Web shapes */}
        {/* Bottom flange */}
        <rect x={120 - botW / 2} y={140 - 18} width={botW} height={18} fill="rgba(99, 102, 241, 0.12)" stroke="var(--foreground)" strokeWidth={1.5} />
        {/* Web */}
        <rect x={120 - 18} y={140 - 88} width={36} height={70} fill="rgba(99, 102, 241, 0.12)" stroke="var(--foreground)" strokeWidth={1.5} />
        {/* Top flange */}
        <rect x={120 - topW / 2} y={140 - 106} width={topW} height={18} fill="rgba(99, 102, 241, 0.12)" stroke="var(--foreground)" strokeWidth={1.5} />

        {/* Neutral Axis (Fade in at click 1 for standard, click 4 for inverted) */}
        {((!isInverted && click >= 1) || (isInverted && click >= 4)) && (
          <g className="animate-in fade-in duration-300">
            <line x1={15} y1={NA_y} x2={225} y2={NA_y} stroke="var(--destructive)" strokeWidth={1.5} strokeDasharray="4,2" />
            <circle cx={120} cy={NA_y} r={3.5} fill="var(--destructive)" />
            <text x={228} y={NA_y + 4} className="fill-destructive text-[11px] font-bold">N.A.</text>
          </g>
        )}

        {/* Fiber labels (Fade in at click 2 for standard, click 5 for inverted) */}
        {((!isInverted && click >= 2) || (isInverted && click >= 5)) && (
          <g className="animate-in fade-in duration-300">
            <text x={120} y={140 - 106 - 6} textAnchor="middle" className="fill-muted-foreground text-[11px] font-bold font-mono">
              Top Fiber (y = {yTop}mm)
            </text>
            <text x={120} y={140 + 15} textAnchor="middle" className="fill-muted-foreground text-[11px] font-bold font-mono">
              Bottom Fiber (y = {yBottom}mm)
            </text>
          </g>
        )}
      </svg>
    </ExpandableDrawing>
  );
};

export const getProblem3SolverItems = (currentClick: number): ClickSyncedTabItem[] => {
  return [
    {
      title: '1. Standard Orientation',
      badge: <LatexFormula math="M_{\text{std}}" />,
      badgeVariant: 'primary',
      description: 'Solve the resisting moment capacity for the standard flange-on-bottom configuration.',
      rightVisualizer: <Problem3Visualizer click={currentClick} />,
      rightContent: (
        <div className="mt-3 space-y-3 bg-muted/10 p-3.5 rounded-xl border border-border/40 text-xs">
          <p className="font-bold text-foreground">Standard Capacity Calculation:</p>
          <ul className="list-disc pl-4 space-y-1.5 text-muted-foreground text-[11px]">
            <li>Centroid distances: <LatexFormula math="y_{\text{top}} = 175\text{ mm}" />, <LatexFormula math="y_{\text{bottom}} = 125\text{ mm}" /></li>
            {currentClick >= 1 && (
              <li className="animate-in slide-in-from-left-1 duration-200">
                Tension Capacity: <LatexFormula math="M_t = \frac{\sigma_t \cdot I}{y_{\text{bottom}}} = \frac{40 \cdot 255.2\text{M}}{125} = 81.7\text{ kNm}" />
              </li>
            )}
            {currentClick >= 2 && (
              <li className="animate-in slide-in-from-left-1 duration-200">
                Compression Capacity: <LatexFormula math="M_c = \frac{\sigma_c \cdot I}{y_{\text{top}}} = \frac{40 \cdot 255.2\text{M}}{175} = 58.3\text{ kNm}" />
              </li>
            )}
          </ul>
          {currentClick >= 2 && (
            <div className="py-1 text-center bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 rounded font-bold animate-in fade-in duration-300">
              Resisting Moment M = 58.3 kNm (Compression governs)
            </div>
          )}
        </div>
      ),
      leftBottomContent: (
        <div className="space-y-3 text-xs">
          <div>
            <p className="font-bold text-foreground">Capacity Formulas:</p>
            <div className="my-1.5 py-1 text-center bg-muted/30 border border-border/40 rounded font-mono text-[11px]">
              <LatexFormula math="M_t = \frac{\sigma_t \cdot I}{y_{\text{bottom}}}, \quad M_c = \frac{\sigma_c \cdot I}{y_{\text{top}}}" />
            </div>
          </div>
        </div>
      )
    },
    {
      title: '2. Inverted Orientation',
      badge: <LatexFormula math="M_{\text{inv}}" />,
      badgeVariant: 'warning',
      description: 'Solve the resisting moment capacity with the heavier flange at the top.',
      rightVisualizer: <Problem3Visualizer click={currentClick} />,
      rightContent: (
        <div className="mt-3 space-y-3 bg-muted/10 p-3.5 rounded-xl border border-border/40 text-xs animate-in fade-in duration-300">
          <p className="font-bold text-foreground">Inverted Capacity Calculation:</p>
          <ul className="list-disc pl-4 space-y-1.5 text-muted-foreground text-[11px]">
            <li>Centroid distances: <LatexFormula math="y_{\text{top}} = 125\text{ mm}" />, <LatexFormula math="y_{\text{bottom}} = 175\text{ mm}" /></li>
            {currentClick >= 4 && (
              <li className="animate-in slide-in-from-left-1 duration-200">
                Tension Capacity: <LatexFormula math="M_t = \frac{\sigma_t \cdot I}{y_{\text{bottom}}} = \frac{40 \cdot 255.2\text{M}}{175} = 58.3\text{ kNm}" />
              </li>
            )}
            {currentClick >= 5 && (
              <li className="animate-in slide-in-from-left-1 duration-200">
                Compression Capacity: <LatexFormula math="M_c = \frac{\sigma_c \cdot I}{y_{\text{top}}} = \frac{40 \cdot 255.2\text{M}}{125} = 81.7\text{ kNm}" />
              </li>
            )}
          </ul>
          {currentClick >= 5 && (
            <div className="py-1 text-center bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 rounded font-bold animate-in fade-in duration-300">
              Resisting Moment M = 58.3 kNm (Tension governs)
            </div>
          )}
        </div>
      ),
      leftBottomContent: (
        <div className="space-y-3 text-xs">
          <div>
            <p className="font-bold text-foreground">Inverted Fiber Shifting:</p>
            <SlideParagraph variant="plain" className="text-[11px] text-muted-foreground leading-normal">
              Inversion shifts the centroid heights, reversing which fiber capacity governs.
            </SlideParagraph>
          </div>
        </div>
      )
    }
  ];
};
