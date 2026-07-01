import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { useUrlSyncedState } from '@/features/presentation/hooks/useUrlSyncedState';
import { ParameterSlider, CalculationOutput, SlideParagraph } from '@/features/presentation/components/elements';

export const CompositeBeamsSandboxSlide: React.FC = () => {
  const [b_w, setBw] = useUrlSyncedState<number>('comp_bw', 100); // wood width in mm
  const [h_w, setHw] = useUrlSyncedState<number>('comp_hw', 200); // wood height in mm
  const [t_s, setTs] = useUrlSyncedState<number>('comp_ts', 12); // steel plate thickness in mm
  const [n, setN] = useUrlSyncedState<number>('comp_n', 15); // modular ratio E_s / E_w
  const [moment, setMoment] = useUrlSyncedState<number>('comp_moment', 35); // moment in kNm

  // Composite Section Properties (Wood core with steel plates at top and bottom)
  // Let's assume a flitched beam: steel plates are bolted at top and bottom
  const I_wood = (b_w * Math.pow(h_w, 3)) / 12; // mm⁴

  // Steel plates dimensions: width b_w, thickness t_s, at y_centroid = h_w / 2 + t_s / 2
  const dist_steel_centroid = h_w / 2 + t_s / 2;
  const I_steel_local = (b_w * Math.pow(t_s, 3)) / 12;
  const A_steel = b_w * t_s;
  const I_steel = 2 * (I_steel_local + A_steel * Math.pow(dist_steel_centroid, 2)); // 2 plates

  // Transformed Moment of Inertia (referred to Wood)
  const I_transformed = I_wood + n * I_steel; // mm⁴

  // Maximum Bending stresses (at extreme fibers)
  // M in Nmm
  const M_Nmm = moment * 1e6;
  const y_max_wood = h_w / 2; // mm
  const y_max_steel = h_w / 2 + t_s; // mm

  const stress_wood_max = (M_Nmm * y_max_wood) / I_transformed; // MPa
  const stress_steel_max = n * ((M_Nmm * y_max_steel) / I_transformed); // MPa

  return (
    <TwoColumnLayout
      title="Composite Beams Sandbox"
      leftWidth="45%"
      leftContent={
        <div className="flex flex-col gap-3 text-left">
          <div>
            <span className="text-[9px] font-bold text-indigo-500 uppercase tracking-widest block mb-1">Composite (Flitched) Beams</span>
            <SlideParagraph variant="plain" className="text-[10px] text-muted-foreground leading-normal">
              Wood beam reinforced with steel plates on top and bottom. Transform steel to wood width using $n = E_s / E_w$.
            </SlideParagraph>
          </div>

          <div className="space-y-1.5">
            <ParameterSlider label="Wood Core Width (bw)" value={b_w} unit="mm" min={80} max={150} step={5} onChange={setBw} />
            <ParameterSlider label="Wood Core Height (hw)" value={h_w} unit="mm" min={150} max={300} step={10} onChange={setHw} />
            <ParameterSlider label="Steel Plate Thickness (ts)" value={t_s} unit="mm" min={6} max={24} step={2} onChange={setTs} />
            <ParameterSlider label="Modular Ratio (n)" value={n} unit="" min={10} max={25} step={1} onChange={setN} />
            <ParameterSlider label="Bending Moment (M)" value={moment} unit="kNm" min={10} max={80} step={5} onChange={setMoment} />
          </div>

          <div className="grid grid-cols-2 gap-2 mt-1">
            <CalculationOutput title="Max Wood Stress" value={stress_wood_max.toFixed(1)} unit="MPa" />
            <CalculationOutput title="Max Steel Stress" value={stress_steel_max.toFixed(1)} unit="MPa" />
          </div>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center h-full min-h-[260px] w-full">
          <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest block mb-2">Equivalent Transformed Section</span>

          <svg viewBox="0 0 300 160" className="w-full max-w-[220px] overflow-visible">
            {/* Base coordinate guides */}
            <line x1={150} y1={10} x2={150} y2={150} stroke="var(--border)" strokeWidth={0.5} strokeDasharray="2,2" />
            <line x1={40} y1={80} x2={260} y2={80} stroke="var(--destructive)" strokeWidth={1.0} strokeDasharray="3,1" opacity={0.6} />
            <text x={265} y={83} className="fill-destructive text-[8px] font-bold opacity-80">N.A.</text>

            {/* Original wood core */}
            <rect x={150 - b_w / 2} y={80 - h_w / 2} width={b_w} height={h_w} fill="none" stroke="var(--foreground)" strokeWidth={1.2} />
            <text x={150} y={83} textAnchor="middle" className="fill-foreground text-[8px] font-bold">Wood Core</text>

            {/* Original steel plates (top and bottom) */}
            <rect x={150 - b_w / 2} y={80 - h_w / 2 - t_s} width={b_w} height={t_s} fill="var(--primary)" fillOpacity={0.15} stroke="var(--primary)" strokeWidth={1.2} />
            <rect x={150 - b_w / 2} y={80 + h_w / 2} width={b_w} height={t_s} fill="var(--primary)" fillOpacity={0.15} stroke="var(--primary)" strokeWidth={1.2} />

            {/* Transformed width outlines */}
            <line x1={150 - (n * b_w) / 2} y1={80 - h_w / 2 - t_s / 2} x2={150 + (n * b_w) / 2} y2={80 - h_w / 2 - t_s / 2} stroke="var(--primary)" strokeWidth={0.8} strokeDasharray="2,2" />
            <line x1={150 - (n * b_w) / 2} y1={80 + h_w / 2 + t_s / 2} x2={150 + (n * b_w) / 2} y2={80 + h_w / 2 + t_s / 2} stroke="var(--primary)" strokeWidth={0.8} strokeDasharray="2,2" />

            {/* Labels */}
            <text x={150} y={80 - h_w / 2 - t_s - 4} textAnchor="middle" className="fill-primary text-[8px] font-bold">Steel Plate (ts)</text>
            <text x={150} y={80 + h_w / 2 + t_s + 10} textAnchor="middle" className="fill-primary text-[8px] font-bold">Transformed width = n * bw</text>
          </svg>
        </div>
      }
    />
  );
};

export default CompositeBeamsSandboxSlide;
