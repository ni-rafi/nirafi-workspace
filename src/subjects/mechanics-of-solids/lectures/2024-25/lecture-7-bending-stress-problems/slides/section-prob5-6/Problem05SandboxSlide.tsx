import React from 'react';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import { useUrlSyncedState } from '@/features/presentation/hooks/useUrlSyncedState';
import { ParameterSlider, CalculationOutput } from '@/features/presentation/components/elements';
import { ExpandableDrawing } from '@/shared/components';

export const Problem05SandboxSlide: React.FC = () => {
  const [bPlate, setBPlate] = useUrlSyncedState<number>('sz_bp', 200); // mm
  const [tPlate, setTPlate] = useUrlSyncedState<number>('sz_tp', 15); // mm

  // Composite Section Properties
  const I_core = 120e6; // mm⁴
  const d_core = 240; // mm
  const sigmaAllow = 140; // MPa

  const yMax = d_core / 2 + tPlate; // outer fiber distance
  const A_plate = bPlate * tPlate;
  const d_plate = d_core / 2 + tPlate / 2;
  const I_plate_own = (bPlate * Math.pow(tPlate, 3)) / 12;
  const I_plate_transfer = A_plate * Math.pow(d_plate, 2);
  const I_comp = I_core + 2 * (I_plate_own + I_plate_transfer);
  
  const Z_comp = I_comp / yMax;
  const Z_baseline = I_core / (d_core / 2); // 1.0 * 10^6 mm³
  const M_allow_comp = (sigmaAllow * Z_comp) / 1e6; // kNm
  const M_allow_baseline = (sigmaAllow * Z_baseline) / 1e6; // 140 kNm
  const capacityIncreasePercent = ((M_allow_comp - M_allow_baseline) / M_allow_baseline) * 100;

  return (
    <FullWidthLayout title="Problem 05: Symmetrical Retrofit Optimization Sandbox" bgVariant="default">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto py-2">
        {/* Left Column: Sliders */}
        <div className="flex flex-col gap-4 bg-muted/10 p-5 border border-border/40 rounded-2xl shadow-sm justify-center">
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest block mb-1">
              Retrofit Sandbox Options
            </span>
            <ParameterSlider label="Plate Width (bp)" value={bPlate} unit="mm" min={100} max={300} step={10} onChange={setBPlate} />
            <ParameterSlider label="Plate Thickness (tp)" value={tPlate} unit="mm" min={5} max={30} step={1} onChange={setTPlate} />
          </div>
        </div>

        {/* Right Column: Visualizer Output */}
        <div className="flex flex-col gap-4 bg-muted/10 p-5 border border-border/40 rounded-2xl shadow-sm items-center justify-center">
          <div className="w-full text-center">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-2">
              Composite Section Output
            </span>
            <div className="grid grid-cols-2 gap-3 mb-4 w-full">
              <CalculationOutput title="Comp. Inertia I" value={(I_comp / 1e6).toFixed(2)} unit="10⁶ mm⁴" />
              <CalculationOutput title="Capacity Gain" value={`${capacityIncreasePercent.toFixed(1)}%`} unit="increase" className="text-emerald-500 font-bold" />
              <CalculationOutput title="Allowable Moment M" value={M_allow_comp.toFixed(1)} unit="kNm" className="col-span-2 text-emerald-500 font-bold bg-emerald-500/5 border-emerald-500/20 text-sm" />
            </div>
          </div>
          <ExpandableDrawing title="Retrofitted Cross-Section View" description="Dynamically autoscaling section view showing top/bottom cover plates bp x tp.">
            <svg viewBox="0 0 200 200" className="w-[180px] h-[145px] overflow-visible animate-in fade-in duration-300">
              {/* Core section (fixed 100x120) */}
              <rect x={75} y={40} width={50} height={120} fill="rgba(99, 102, 241, 0.04)" stroke="var(--foreground)" strokeWidth={1.5} />
              
              {/* Dynamic top and bottom plates */}
              {(() => {
                const pW = Math.min(180, (bPlate / 300) * 150);
                const pH = Math.min(25, (tPlate / 30) * 20);
                return (
                  <>
                    <rect x={100 - pW / 2} y={40 - pH} width={pW} height={pH} fill="rgba(245, 158, 11, 0.2)" stroke="var(--primary)" strokeWidth={1.5} />
                    <rect x={100 - pW / 2} y={160} width={pW} height={pH} fill="rgba(245, 158, 11, 0.2)" stroke="var(--primary)" strokeWidth={1.5} />
                  </>
                );
              })()}
              <circle cx={100} cy={100} r={3} fill="var(--destructive)" />
              <line x1={40} y1={100} x2={160} y2={100} stroke="var(--destructive)" strokeWidth={1} strokeDasharray="4,2" />
            </svg>
          </ExpandableDrawing>
        </div>
      </div>
    </FullWidthLayout>
  );
};

export default Problem05SandboxSlide;
