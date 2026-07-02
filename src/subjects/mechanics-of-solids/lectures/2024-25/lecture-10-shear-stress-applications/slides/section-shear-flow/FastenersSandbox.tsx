import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, SlideCallout, ParameterSlider, CalculationOutput } from '@/features/presentation/components/elements';
import { useUrlSyncedState } from '@/features/presentation/hooks/useUrlSyncedState';
import { BuiltUpFastenersDrawing } from './drawings/BuiltUpFastenersDrawing';

export const FastenersSandbox: React.FC = () => {
  const [fastenerV, setFastenerV] = useUrlSyncedState<number>('fasteners_v', 40); // kN
  const [fastenerF, setFastenerF] = useUrlSyncedState<number>('fasteners_f', 3.0); // kN
  const [fastenerN, setFastenerN] = useUrlSyncedState<number>('fasteners_n', 1); // nails per row

  // Section Properties (T-beam)
  // Flange: 150x50 mm, Web: 50x150 mm
  // Area = 15000 mm²
  // Centroid from bottom ybar = 125 mm
  // Q at interface = 50 * (150 * 50) = 375,000 mm³
  // I = 53.125 * 10⁶ mm⁴
  const Q = 375000; // mm³
  const I = 53.125e6; // mm⁴

  const V_N = fastenerV * 1000;
  const F_N = fastenerF * 1000;

  // Shear Flow q (N/mm)
  const q_N_mm = (V_N * Q) / I; // N/mm = kN/m
  const q_kN_m = q_N_mm;

  // Spacing s (mm)
  const spacing_mm = q_N_mm > 0.001 ? (fastenerN * F_N) / q_N_mm : 200;
  const spacingClamped = Math.min(250, Math.max(10, spacing_mm));

  return (
    <TwoColumnLayout
      title="Interactive Fastener Spacing Sandbox"
      leftWidth="50%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-3 text-left">
          <div>
            <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest block mb-1">
              Live Parameter Tuning
            </span>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground">
              Adjust the sliders below to see how load magnitude, nail capacity, and fastener count dynamically dictate nail spacing.
            </SlideParagraph>
          </div>

          <div className="space-y-2 py-1">
            <ParameterSlider
              label="Shear Force (V)"
              value={fastenerV}
              unit="kN"
              min={10}
              max={100}
              step={5}
              onChange={setFastenerV}
            />
            <ParameterSlider
              label="Nail Capacity (F_nail)"
              value={fastenerF}
              unit="kN"
              min={1.0}
              max={10.0}
              step={0.5}
              onChange={setFastenerF}
            />
            <ParameterSlider
              label="Nails Per Row (n)"
              value={fastenerN}
              unit=""
              min={1}
              max={2}
              step={1}
              onChange={setFastenerN}
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <CalculationOutput title="Shear Flow q" value={q_kN_m.toFixed(2)} unit="kN/m" />
            <CalculationOutput title="Nail Spacing s" value={spacing_mm.toFixed(1)} unit="mm" />
          </div>

          <SlideCallout variant="info" className="py-2 px-3 text-[10px]">
            <strong>Observation:</strong> Increasing the shear load \(V\) increases the shear flow \(q\), requiring nails to be placed closer together (smaller spacing \(s\)).
          </SlideCallout>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center h-full min-h-[250px]">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-2">Discrete Fastener Pitch (s)</span>
          <BuiltUpFastenersDrawing spacing={spacingClamped} currentClick={1} />
        </div>
      }
    />
  );
};

export default FastenersSandbox;
