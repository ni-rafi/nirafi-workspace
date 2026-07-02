import React from 'react';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import { useUrlSyncedState } from '@/features/presentation/hooks/useUrlSyncedState';
import { ParameterSlider, CalculationOutput } from '@/features/presentation/components/elements';
import { ExpandableDrawing } from '@/shared/components';

export const Problem02SandboxSlide: React.FC = () => {
  const [load, setLoad] = useUrlSyncedState<number>('sz_load', 4.0); // kN/m
  const [span, setSpan] = useUrlSyncedState<number>('sz_span', 5.0); // m
  const [width, setWidth] = useUrlSyncedState<number>('sz_width', 60); // mm
  const [sigmaC, setSigmaC] = useUrlSyncedState<number>('sz_sigc', 35); // MPa
  const [sigmaT, setSigmaT] = useUrlSyncedState<number>('sz_sigt', 45); // MPa

  // Sizing calculations
  const Mmax = (load * span * span) / 8; // kNm
  const Mmax_Nmm = Mmax * 1e6;
  const sigmaAllow = Math.min(sigmaC, sigmaT); // MPa
  const b_mm = width;
  const h_req = Math.sqrt((6 * Mmax_Nmm) / (b_mm * sigmaAllow)); // mm

  return (
    <FullWidthLayout title="Problem 02: Sizing Sandbox & Parametric Optimization" bgVariant="default">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto py-2">
        {/* Left Column: Sliders */}
        <div className="flex flex-col gap-4 bg-muted/10 p-5 border border-border/40 rounded-2xl shadow-sm justify-center">
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest block mb-1">
              Design Sandbox Options
            </span>
            <ParameterSlider label="UDL load (w)" value={load} unit="kN/m" min={2.0} max={6.0} step={0.2} onChange={setLoad} />
            <ParameterSlider label="Span length (L)" value={span} unit="m" min={3.0} max={6.0} step={0.5} onChange={setSpan} />
            <ParameterSlider label="Beam Width (b)" value={width} unit="mm" min={50} max={100} step={5} onChange={setWidth} />
            <ParameterSlider label="Allowable Compression (σ_c)" value={sigmaC} unit="MPa" min={25} max={50} step={1} onChange={setSigmaC} />
            <ParameterSlider label="Allowable Tension (σ_t)" value={sigmaT} unit="MPa" min={30} max={60} step={1} onChange={setSigmaT} />
          </div>
        </div>

        {/* Right Column: Visualizer Output */}
        <div className="flex flex-col gap-4 bg-muted/10 p-5 border border-border/40 rounded-2xl shadow-sm items-center justify-center">
          <div className="w-full text-center">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-2">
              Sizing Optimization Outputs
            </span>
            <div className="grid grid-cols-2 gap-3 mb-4 w-full">
              <CalculationOutput title="Bending Moment M" value={Mmax.toFixed(2)} unit="kNm" />
              <CalculationOutput title="Governing Stress σ" value={sigmaAllow.toFixed(0)} unit="MPa" />
              <CalculationOutput title="Required Depth (h)" value={h_req.toFixed(1)} unit="mm" className="col-span-2 text-emerald-500 font-bold bg-emerald-500/5 border-emerald-500/20 text-sm" />
            </div>
          </div>
          <ExpandableDrawing title="Sized Cross-Section Profile" description="Autoscaled cross-section profile displaying the calculated depth h relative to width b.">
            <svg viewBox="0 0 200 160" className="w-[180px] h-[130px] overflow-visible">
              <line x1={100} y1={10} x2={100} y2={150} stroke="var(--border)" strokeWidth={0.8} strokeDasharray="3,3" />
              {(() => {
                const rectW = (width / 100) * 80;
                const rectH = Math.min(130, (h_req / 250) * 130);
                return (
                  <rect
                    x={100 - rectW / 2}
                    y={80 - rectH / 2}
                    width={rectW}
                    height={rectH}
                    fill="rgba(99, 102, 241, 0.08)"
                    stroke="var(--foreground)"
                    strokeWidth={1.5}
                  />
                );
              })()}
              <text x={100} y={84} textAnchor="middle" className="fill-foreground text-[12px] font-mono font-bold">
                {width}x{h_req.toFixed(0)}
              </text>
            </svg>
          </ExpandableDrawing>
        </div>
      </div>
    </FullWidthLayout>
  );
};

export default Problem02SandboxSlide;
