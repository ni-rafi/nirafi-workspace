import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, CalculationOutput } from '@/features/presentation/components/elements';
import { useUrlSyncedState } from '@/features/presentation/hooks/useUrlSyncedState';
import { ProfileShapeView } from '@/subjects/mechanics-of-solids/features/stress/components/diagrams/ProfileShapeView';
import { ShearStressProfileChart } from '@/subjects/mechanics-of-solids/features/stress/components/diagrams/ShearStressProfileChart';
import { CrossSectionEngine } from '@/subjects/mechanics-of-solids/cores/stress/cross-section.engine';
import { StressSolverEngine } from '@/subjects/mechanics-of-solids/cores/stress/stress-solver.engine';
import { StaticalMomentEngine } from '@/subjects/mechanics-of-solids/cores/stress/statical-moment.engine';
import { problem2Config } from '../../problemConfig';

export const Problem02JunctionWidths: React.FC = () => {
  const [inspectY] = useUrlSyncedState<number>('problem2_inspect_y', 125); // At junction

  const { shape, V } = problem2Config;
  const props = CrossSectionEngine.calculateProperties(shape);
  const res = StressSolverEngine.solveDistribution(shape, 0, V);

  const H_m = shape.height ?? 0.3;
  const ybar_m = props.centroid;
  const b_mm = shape.width * 1000;

  // Coordinate conversions
  const svgW = 200;
  const svgH = 150;
  const scale = svgH / (H_m * 1.5);
  const cy = svgH / 2;
  const toPixelY = (y: number) => cy - y * scale;

  const inspectY_m = inspectY / 1000;
  const statQ = StaticalMomentEngine.calculateQAndWidth(shape, inspectY_m, props);
  const pyInspect = toPixelY(inspectY_m);

  // Stress calculation
  const currentTau = props.I > 1e-12 && statQ.t > 1e-6 ? (V * statQ.Q) / (props.I * statQ.t) : 0;
  const currentTauMPa = currentTau / 1e6;
  const maxTau = res.maxShear;

  const Q_mm3 = statQ.Q * 1e9;
  const flange_thickness_mm = (shape.thicknessFlange ?? 0.05) * 1000;
  const flange_width_mm = b_mm;
  const A_prime_mm2 = flange_thickness_mm * flange_width_mm;
  const ybar_prime_mm = inspectY + flange_thickness_mm / 2;

  return (
    <TwoColumnLayout
      title="Junction Q & Area Properties"
      leftWidth="55%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-3 text-left">
          <div>
            <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest block mb-1">
              Top Flange Junction Properties (y = 125 mm)
            </span>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground">
              To evaluate the junction stresses, we calculate the area A' and first moment of area Q for the entire top flange block above the junction:
            </SlideParagraph>
          </div>

          <div className="space-y-2 text-xs text-muted-foreground">
            <p>
              **Step 1: Calculate isolated top flange area A':**
            </p>
            <div className="font-mono text-center text-foreground py-0.5 bg-muted/20 border border-border/40 rounded">
              A' = b_flange * t_flange = {flange_width_mm.toFixed(0)} * {flange_thickness_mm.toFixed(0)} = {A_prime_mm2.toLocaleString()} mm²
            </div>

            <p>
              **Step 2: Find centroid arm ybar' of flange area from NA:**
            </p>
            <div className="font-mono text-center text-foreground py-0.5 bg-muted/20 border border-border/40 rounded">
              y_bar' = {inspectY.toFixed(0)} + {flange_thickness_mm.toFixed(0)} / 2 = {ybar_prime_mm.toFixed(1)} mm
            </div>

            <p>
              **Step 3: Solve junction statical moment Q = ybar · A':**
            </p>
            <div className="font-mono text-center text-foreground py-0.5 bg-muted/20 border border-border/40 rounded">
              Q = {ybar_prime_mm.toFixed(1)} * {A_prime_mm2.toLocaleString()} = {Q_mm3.toLocaleString()} mm³
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <CalculationOutput title="Junction Area A'" value={A_prime_mm2.toLocaleString()} unit="mm²" />
            <CalculationOutput title="Junction Q" value={Q_mm3.toLocaleString()} unit="mm³" />
          </div>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center h-full min-h-[250px]">
          <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full max-w-[250px] overflow-visible">
            <ProfileShapeView
              shape={shape}
              centroid={ybar_m}
              toPixelY={toPixelY}
              inspectY={inspectY}
              currentWidth={statQ.t * 1000}
            />
            <ShearStressProfileChart
              shape={shape}
              points={res.points}
              maxTau={maxTau}
              toPixelY={toPixelY}
              H={H_m}
              ybar={ybar_m}
              V={V}
              props={props}
              pyInspect={pyInspect}
              currentTau={currentTauMPa}
            />
          </svg>
        </div>
      }
    />
  );
};

export default Problem02JunctionWidths;
