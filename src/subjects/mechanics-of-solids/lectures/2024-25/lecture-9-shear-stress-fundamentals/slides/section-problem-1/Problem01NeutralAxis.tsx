import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, LatexFormula, CalculationOutput } from '@/features/presentation/components/elements';
import { useUrlSyncedState } from '@/features/presentation/hooks/useUrlSyncedState';
import { ProfileShapeView } from '@/subjects/mechanics-of-solids/features/stress/components/diagrams/ProfileShapeView';
import { ShearStressProfileChart } from '@/subjects/mechanics-of-solids/features/stress/components/diagrams/ShearStressProfileChart';
import { CrossSectionEngine } from '@/subjects/mechanics-of-solids/cores/stress/cross-section.engine';
import { StressSolverEngine } from '@/subjects/mechanics-of-solids/cores/stress/stress-solver.engine';
import { StaticalMomentEngine } from '@/subjects/mechanics-of-solids/cores/stress/statical-moment.engine';
import { problem1Config } from '../../problemConfig';

export const Problem01NeutralAxis: React.FC = () => {
  const [inspectY] = useUrlSyncedState<number>('problem1_inspect_y', 0); // Default to NA

  const { shape, V } = problem1Config;
  const props = CrossSectionEngine.calculateProperties(shape);
  const res = StressSolverEngine.solveDistribution(shape, 0, V);

  const H_m = shape.height ?? 0.3;
  const ybar_m = props.centroid;
  const I_mm4 = props.I * 1e12;
  const b_mm = shape.width * 1000;
  const h_mm = H_m * 1000;
  const multiplier = I_mm4 > 0 && b_mm > 0 ? V / (I_mm4 * b_mm) : 0;

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

  const y_mm = Math.abs(inspectY);
  const A_prime_mm2 = y_mm >= h_mm / 2 ? 0 : b_mm * (h_mm / 2 - y_mm);
  const ybar_prime_mm = h_mm / 2 - (h_mm / 2 - y_mm) / 2;
  const Q_mm3 = statQ.Q * 1e9;
  const tau_avg_MPa = V / (b_mm * h_mm);
  const tau_max_MPa = 1.5 * tau_avg_MPa;

  return (
    <TwoColumnLayout
      title="Neutral Axis Peak Stress"
      leftWidth="55%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-3 text-left">
          <div>
            <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest block mb-1">
              At Centroid (y = 0 mm)
            </span>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground">
              The first moment of area Q peaks at the neutral axis. We calculate Q and use it to solve for maximum shear stress:
            </SlideParagraph>
          </div>

          <div className="space-y-2 text-xs text-muted-foreground">
            <p>
              **Standard Shear Formula approach:**
            </p>
            <div className="font-mono text-[10px] text-foreground bg-muted/20 p-1.5 rounded border border-border/40">
              A' = {b_mm.toFixed(0)} * {(h_mm / 2 - y_mm).toFixed(0)} = {A_prime_mm2.toLocaleString()} mm²
              <br />
              ybar' = {ybar_prime_mm.toFixed(1)} mm  ⇒  Q = {ybar_prime_mm.toFixed(1)} * {A_prime_mm2.toLocaleString()} = {Q_mm3.toLocaleString()} mm³
            </div>
            <div className="font-mono text-center text-foreground py-0.5 bg-muted/20 border border-border/40 rounded">
              τ_max = multiplier * Q = {multiplier.toFixed(4)} × 10⁻⁶ * {Q_mm3.toLocaleString()} = {currentTauMPa.toFixed(2)} MPa
            </div>

            <p>
              **Shortcut verification (Solid Rectangle only):**
            </p>
            <div className="py-2 text-center bg-indigo-500/10 rounded-xl border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 font-extrabold text-xs">
              <LatexFormula math={`\\tau_{\\max} = 1.5 \\cdot \\tau_{\\text{avg}} = 1.5 \\cdot \\frac{60000}{${b_mm.toFixed(0)} \\cdot ${h_mm.toFixed(0)}} = ${tau_max_MPa.toFixed(2)} \\text{ MPa}`} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <CalculationOutput title="Maximum Q" value={Q_mm3.toLocaleString()} unit="mm³" />
            <CalculationOutput title="Peak Stress τ_max" value={currentTauMPa.toFixed(2)} unit="MPa" />
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

export default Problem01NeutralAxis;
