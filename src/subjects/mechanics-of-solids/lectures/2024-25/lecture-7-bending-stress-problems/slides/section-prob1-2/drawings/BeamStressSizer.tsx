import React from 'react';
import { useUrlSyncedState } from '@/features/presentation/hooks/useUrlSyncedState';
import { ParameterSlider, CalculationOutput, SlideParagraph } from '@/features/presentation/components/elements';

export const BeamStressSizer: React.FC = () => {
  const [load, setLoad] = useUrlSyncedState<number>('sz_load', 4.0); // kN/m
  const [span, setSpan] = useUrlSyncedState<number>('sz_span', 5.0); // m
  const [width, setWidth] = useUrlSyncedState<number>('sz_width', 60); // mm
  const [sigmaC, setSigmaC] = useUrlSyncedState<number>('sz_sigc', 35); // MPa
  const [sigmaT, setSigmaT] = useUrlSyncedState<number>('sz_sigt', 45); // MPa

  // 1. Calculate Peak Bending Moment (UDL Simply Supported)
  const Mmax = (load * span * span) / 8; // kNm
  const Mmax_Nmm = Mmax * 1e6;

  // 2. Identify governing allowable limit (for symmetric rectangle, the smaller stress limit dictates depth)
  const sigmaAllow = Math.min(sigmaC, sigmaT); // MPa

  // 3. Size depth h: sigma = M * y_max / I = M * (h/2) / (b * h^3 / 12) = 6M / (b * h^2)
  // h = sqrt(6M / (b * sigmaAllow))
  const b_mm = width;
  const h_req = Math.sqrt((6 * Mmax_Nmm) / (b_mm * sigmaAllow)); // mm

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full text-left items-stretch">
      {/* Parameters Panel */}
      <div className="flex flex-col justify-between gap-3 bg-muted/10 p-4 border border-border/40 rounded-xl">
        <div>
          <span className="text-[9px] font-bold text-indigo-500 uppercase tracking-widest block mb-1">
            Sizing Parameters
          </span>
          <SlideParagraph variant="plain" className="text-[10px] text-muted-foreground leading-normal">
            Adjust the loading and material criteria to dynamically solve the required beam depth.
          </SlideParagraph>
        </div>

        <div className="space-y-1.5">
          <ParameterSlider label="UDL (w)" value={load} unit="kN/m" min={2.0} max={6.0} step={0.2} onChange={setLoad} />
          <ParameterSlider label="Span (L)" value={span} unit="m" min={3.0} max={6.0} step={0.5} onChange={setSpan} />
          <ParameterSlider label="Width (b)" value={width} unit="mm" min={50} max={100} step={5} onChange={setWidth} />
          <ParameterSlider label="Compression Limit (σ_c)" value={sigmaC} unit="MPa" min={25} max={50} step={1} onChange={setSigmaC} />
          <ParameterSlider label="Tension Limit (σ_t)" value={sigmaT} unit="MPa" min={30} max={60} step={1} onChange={setSigmaT} />
        </div>
      </div>

      {/* Solver & Visual Panel */}
      <div className="flex flex-col justify-between bg-muted/20 border border-border/50 rounded-xl p-4">
        <div>
          <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest block mb-3 text-center">
            Design Solver Output
          </span>
          
          <div className="grid grid-cols-2 gap-3 mb-4">
            <CalculationOutput title="Bending Moment" value={Mmax.toFixed(2)} unit="kNm" />
            <CalculationOutput title="Governing stress" value={sigmaAllow.toFixed(0)} unit="MPa" />
            <CalculationOutput title="Required Depth (h)" value={h_req.toFixed(1)} unit="mm" className="col-span-2 text-emerald-500 font-bold bg-emerald-500/5 border-emerald-500/20" />
          </div>
        </div>

        {/* Visual Beam cross section scale preview */}
        <div className="flex flex-col items-center justify-center py-2 border-t border-border/30">
          <span className="text-[8px] text-muted-foreground font-bold uppercase mb-2">Cross-Section Profile</span>
          <svg viewBox="0 0 120 100" className="w-[120px] h-[90px] overflow-visible">
            {/* Centering guide */}
            <line x1={60} y1={5} x2={60} y2={95} stroke="var(--border)" strokeWidth={0.5} strokeDasharray="2,2" />
            
            {/* Rectangle scale box */}
            {/* Map width (b) of 50-100 to pixels 25-50, and depth (h) of 100-250 to pixels 30-75 */}
            {(() => {
              const rectW = (width / 100) * 50;
              const rectH = Math.min(80, (h_req / 250) * 80);
              return (
                <rect
                  x={60 - rectW / 2}
                  y={50 - rectH / 2}
                  width={rectW}
                  height={rectH}
                  fill="rgba(99, 102, 241, 0.08)"
                  stroke="var(--foreground)"
                  strokeWidth={1.2}
                />
              );
            })()}

            <text x={60} y={54} textAnchor="middle" className="fill-foreground text-[8px] font-mono font-bold">
              {width}x{h_req.toFixed(0)}
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
};
export default BeamStressSizer;
