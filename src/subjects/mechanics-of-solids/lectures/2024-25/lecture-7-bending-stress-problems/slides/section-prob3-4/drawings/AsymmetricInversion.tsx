import React from 'react';
import { useUrlSyncedState } from '@/features/presentation/hooks/useUrlSyncedState';
import { ParameterSlider, CalculationOutput, SlideParagraph, LatexFormula } from '@/features/presentation/components/elements';
import { ExpandableDrawing } from '@/shared/components';
import { RotateCw } from 'lucide-react';

export const AsymmetricInversion: React.FC = () => {
  const [isInverted, setIsInverted] = useUrlSyncedState<boolean>('inv_toggle', false);
  const [sigmaT, setSigmaT] = useUrlSyncedState<number>('inv_sigt', 40); // Tension limit in MPa
  const [sigmaC, setSigmaC] = useUrlSyncedState<number>('inv_sigc', 40); // Compression limit in MPa

  const I_xx = 255.2e6; // mm⁴

  // Centroid from bottom of standard shape: 125mm
  // Top fiber: 175mm, Bottom fiber: 125mm
  const yBottomStd = 125;
  const yTopStd = 175;

  const yBottom = isInverted ? yTopStd : yBottomStd;
  const yTop = isInverted ? yBottomStd : yTopStd;

  // Resisting Moment capacity calculations
  // Positive bending: compression on top, tension on bottom
  // M_compression = sigma_C * I_xx / yTop
  // M_tension = sigma_T * I_xx / yBottom
  const M_comp = (sigmaC * I_xx) / yTop / 1e3; // kNm
  const M_tens = (sigmaT * I_xx) / yBottom / 1e3; // kNm
  const M_allow = Math.min(M_comp, M_tens); // kNm

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full text-left items-stretch select-text">
      <div className="flex flex-col justify-between gap-3 bg-muted/10 p-4 border border-border/40 rounded-xl">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">
              Orientation Analysis
            </span>
            <button
              onClick={() => setIsInverted(!isInverted)}
              className="flex items-center gap-1.5 py-1 px-2.5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-[9px] font-bold transition-all cursor-pointer shadow-sm"
            >
              <RotateCw className="h-3 w-3" />
              <span>Invert Section</span>
            </button>
          </div>
          <SlideParagraph variant="plain" className="text-[11px] text-muted-foreground leading-normal">
            For steel (symmetric limits: <LatexFormula math="\sigma_c = \sigma_t = 40\text{ MPa}" />), inversion yields no capacity change. Try making limits asymmetric (like cast iron) to see inversion effects!
          </SlideParagraph>
        </div>

        <div className="space-y-1.5">
          <ParameterSlider label="Tension Limit (σ_t)" value={sigmaT} unit="MPa" min={20} max={80} step={5} onChange={setSigmaT} />
          <ParameterSlider label="Compression Limit (σ_c)" value={sigmaC} unit="MPa" min={20} max={120} step={5} onChange={setSigmaC} />
        </div>
      </div>

      <div className="flex flex-col justify-between bg-muted/20 border border-border/50 rounded-xl p-4">
        <div>
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-3 text-center">
            Resisting Moment Capacity
          </span>
          <div className="grid grid-cols-2 gap-3 mb-2">
            <CalculationOutput title="Capacity (Compression)" value={M_comp.toFixed(1)} unit="kNm" />
            <CalculationOutput title="Capacity (Tension)" value={M_tens.toFixed(1)} unit="kNm" />
            <CalculationOutput title="Resisting Moment M" value={M_allow.toFixed(1)} unit="kNm" className="col-span-2 text-emerald-500 font-bold bg-emerald-500/5 border-emerald-500/20" />
          </div>
        </div>

        <div className="flex justify-center items-center py-2 border-t border-border/30">
          <ExpandableDrawing title="Asymmetric Section Inversion Analysis" description="Demonstrates tension and compression extreme fiber distance shifts (y_max) when the flanged section is inverted (rotated 180°).">
            <svg viewBox="0 0 240 180" className="w-[200px] h-[150px] overflow-visible">
              {/* Draw asymmetric I-beam */}
              {(() => {
                const topW = isInverted ? 120 : 60;
                const botW = isInverted ? 60 : 120;
                const NA_y = isInverted ? 140 - 175 * 0.5 : 140 - 125 * 0.5;

                return (
                  <g>
                    {/* Base reference */}
                    <line x1={20} y1={140} x2={220} y2={140} stroke="var(--border)" strokeWidth={1} />

                    {/* Flanges & Web shapes */}
                    {/* Bottom flange */}
                    <rect x={120 - botW / 2} y={140 - 18} width={botW} height={18} fill="rgba(99, 102, 241, 0.12)" stroke="var(--foreground)" strokeWidth={1.5} />
                    {/* Web */}
                    <rect x={120 - 18} y={140 - 88} width={36} height={70} fill="rgba(99, 102, 241, 0.12)" stroke="var(--foreground)" strokeWidth={1.5} />
                    {/* Top flange */}
                    <rect x={120 - topW / 2} y={140 - 106} width={topW} height={18} fill="rgba(99, 102, 241, 0.12)" stroke="var(--foreground)" strokeWidth={1.5} />

                    {/* Neutral Axis */}
                    <line x1={15} y1={NA_y} x2={225} y2={NA_y} stroke="var(--destructive)" strokeWidth={1.5} strokeDasharray="4,2" />
                    <text x={228} y={NA_y + 4} className="fill-destructive text-[11px] font-bold">N.A.</text>

                    {/* Fiber labels */}
                    <text x={120} y={140 - 106 - 6} textAnchor="middle" className="fill-muted-foreground text-[11px] font-bold font-mono">
                      Top Fiber (y = {yTop}mm)
                    </text>
                    <text x={120} y={140 + 15} textAnchor="middle" className="fill-muted-foreground text-[11px] font-bold font-mono">
                      Bottom Fiber (y = {yBottom}mm)
                    </text>
                  </g>
                );
              })()}
            </svg>
          </ExpandableDrawing>
        </div>
      </div>
    </div>
  );
};

export default AsymmetricInversion;
