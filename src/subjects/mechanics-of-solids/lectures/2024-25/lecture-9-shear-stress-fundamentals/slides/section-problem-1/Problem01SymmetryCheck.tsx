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

export const Problem01SymmetryCheck: React.FC = () => {
  const [inspectY] = useUrlSyncedState<number>('problem1_inspect_y', -75); // Default to -75mm

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
  const Q_mm3 = statQ.Q * 1e9;

  return (
    <TwoColumnLayout
      title="Symmetrical Stress Check"
      leftWidth="55%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-3 text-left">
          <div>
            <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest block mb-1">
              Symmetry Check: y = -75 mm
            </span>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground">
              By complementary symmetry of the rectangular cross-section, the stress at y = {inspectY} mm (bottom half) must equal the stress at y = +{Math.abs(inspectY)} mm:
            </SlideParagraph>
          </div>

          <div className="space-y-2 text-xs text-muted-foreground">
            <p>
              **Properties at y = {inspectY} mm:**
            </p>
            <ul className="list-disc pl-4 space-y-1">
              <li>The sub-area A' can be taken as the bottom block from -75 mm to -150 mm.</li>
              <li>Bottom block area: A' = {A_prime_mm2.toLocaleString()} mm².</li>
              <li>Centroid arm from NA: ybar' = -112.5 mm.</li>
              <li>Statical moment magnitude: |Q| = {Q_mm3.toLocaleString()} mm³.</li>
            </ul>
            <p>
              This yields the identical stress value:
            </p>
            <div className="py-1 text-center bg-indigo-500/10 rounded-xl border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 font-extrabold text-xs">
              <LatexFormula math={`\\tau = (${(multiplier * 1e6).toFixed(3)} \\times 10^{-6}) \\cdot (${Q_mm3.toFixed(0)}) = ${currentTauMPa.toFixed(2)} \\text{ MPa}`} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <CalculationOutput title="Symmetric Q" value={Q_mm3.toLocaleString()} unit="mm³" />
            <CalculationOutput title="Shear Stress τ" value={currentTauMPa.toFixed(2)} unit="MPa" />
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

export default Problem01SymmetryCheck;
