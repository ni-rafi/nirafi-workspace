import React from 'react';
import { useUrlSyncedState } from '@/features/presentation/hooks/useUrlSyncedState';
import { ParameterSlider, CalculationOutput, SlideParagraph } from '@/features/presentation/components/elements';
import { ExpandableDrawing } from '@/shared/components';
import { AlertCircle, CheckCircle } from 'lucide-react';

export const AsymmetricMaterialLimitSolver: React.FC = () => {
  const [load, setLoad] = useUrlSyncedState<number>('opt2_load', 12.0); // UDL w in kN/m
  const [sigmaT, setSigmaT] = useUrlSyncedState<number>('opt2_sigt', 30); // MPa
  const [sigmaC, setSigmaC] = useUrlSyncedState<number>('opt2_sigc', 90); // MPa

  const I_xx = 112.2e6; // mm⁴
  const h = 260; // mm
  const ybar = 87.11; // mm from bottom

  // Distances to extreme fibers
  const yBottom = ybar; // 87.11 mm
  const yTop = h - ybar; // 172.89 mm

  // Bending Moment M in Nmm
  // M = w * L^2 / 8 = w * 36 / 8 = 4.5 * w (kNm)
  const M_kNm = 4.5 * load;
  const M_Nmm = M_kNm * 1e6;

  // Stresses induced
  const stressComp = (M_Nmm * yTop) / I_xx; // MPa (Top fiber under compression)
  const stressTens = (M_Nmm * yBottom) / I_xx; // MPa (Bottom fiber under tension)

  // Safety checks
  const isCompSafe = stressComp <= sigmaC;
  const isTensSafe = stressTens <= sigmaT;
  const isSafe = isCompSafe && isTensSafe;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full text-left items-stretch">
      {/* Parameters Panel */}
      <div className="flex flex-col justify-between gap-3 bg-muted/10 p-4 border border-border/40 rounded-xl">
        <div>
          <span className="text-[9px] font-bold text-indigo-500 uppercase tracking-widest block mb-1">
            Loading & Limits
          </span>
          <SlideParagraph variant="plain" className="text-[10px] text-muted-foreground leading-normal">
            Slide the sessional UDL load (w) or material limit parameters to check section safety under dual capacity envelopes.
          </SlideParagraph>
        </div>

        <div className="space-y-1.5">
          <ParameterSlider label="UDL (w)" value={load} unit="kN/m" min={5.0} max={25.0} step={0.5} onChange={setLoad} />
          <ParameterSlider label="Tension Limit (σ_t)" value={sigmaT} unit="MPa" min={20} max={50} step={1} onChange={setSigmaT} />
          <ParameterSlider label="Compression Limit (σ_c)" value={sigmaC} unit="MPa" min={60} max={120} step={2} onChange={setSigmaC} />
        </div>
      </div>

      {/* Calculator & Status Output */}
      <div className="flex flex-col justify-between bg-muted/20 border border-border/50 rounded-xl p-4">
        <div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
              Solver Output
            </span>
            <div className="flex items-center gap-1.5">
              {isSafe ? (
                <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  <CheckCircle className="h-3.5 w-3.5" /> SAFE
                </span>
              ) : (
                <span className="flex items-center gap-1 text-[10px] font-bold text-rose-500 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                  <AlertCircle className="h-3.5 w-3.5" /> FAILED
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-2 text-[10px]">
            <CalculationOutput title="Moment (M)" value={M_kNm.toFixed(1)} unit="kNm" />
            <CalculationOutput title="Inertia I_xx" value={(I_xx / 1e6).toFixed(1)} unit="10⁶ mm⁴" />
            <CalculationOutput
              title="Top Comp. Stress"
              value={stressComp.toFixed(1)}
              unit={`/ ${sigmaC} MPa`}
              className={isCompSafe ? 'text-emerald-500' : 'text-rose-500 bg-rose-500/5 border-rose-500/20'}
            />
            <CalculationOutput
              title="Bottom Tens. Stress"
              value={stressTens.toFixed(1)}
              unit={`/ ${sigmaT} MPa`}
              className={isTensSafe ? 'text-emerald-500' : 'text-rose-500 bg-rose-500/5 border-rose-500/20'}
            />
          </div>
        </div>

        <div className="flex justify-center items-center py-2 border-t border-border/30">
          <ExpandableDrawing title="Asymmetric Cast Iron Section" description="Renders the cross-section profile of the asymmetric flanged beam, mapping its shifted neutral axis location (y_bar).">
            <svg viewBox="0 0 160 110" className="w-[120px] h-[95px] overflow-visible">
              {/* Draw Asymmetric Cast Iron I-beam */}
              <g>
                <line x1={20} y1={90} x2={140} y2={90} stroke="var(--border)" strokeWidth={1} />
                
                {/* Bottom flange 160x40 -> draw width 80, thickness 20 */}
                <rect x={80 - 40} y={90 - 20} width={80} height={20} fill="rgba(99, 102, 241, 0.12)" stroke="var(--foreground)" strokeWidth={1.2} />
                {/* Web 20x200 -> draw width 10, thickness 100 */}
                <rect x={80 - 5} y={90 - 120} width={10} height={100} fill="rgba(99, 102, 241, 0.12)" stroke="var(--foreground)" strokeWidth={1.2} />
                {/* Top flange 80x20 -> draw width 40, thickness 10 */}
                <rect x={80 - 20} y={90 - 130} width={40} height={10} fill="rgba(99, 102, 241, 0.12)" stroke="var(--foreground)" strokeWidth={1.2} />

                {/* NA line */}
                <line x1={15} y1={90 - ybar * 0.5} x2={145} y2={90 - ybar * 0.5} stroke="var(--destructive)" strokeWidth={1.2} strokeDasharray="3,1" opacity={0.7} />
                <text x={144} y={90 - ybar * 0.5 + 4} className="fill-destructive text-[11px] font-bold">N.A.</text>
              </g>
            </svg>
          </ExpandableDrawing>
        </div>
      </div>
    </div>
  );
};
export default AsymmetricMaterialLimitSolver;
