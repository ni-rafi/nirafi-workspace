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

export const Problem01WebCheck: React.FC = () => {
  const [inspectY] = useUrlSyncedState<number>('problem1_inspect_y', 75); // Default to +75mm

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

  return (
    <TwoColumnLayout
      title="Internal Coordinate Stress"
      leftWidth="55%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-3 text-left">
          <div>
            <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest block mb-1">
              Inspection height: y = 75 mm
            </span>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground">
              We find the shear stress at a depth coordinate halfway between the neutral axis and the outer skin:
            </SlideParagraph>
          </div>

          <div className="space-y-2 text-xs text-muted-foreground">
            <p>
              **Step 1: Calculate sub-area A' above y = 75 mm:**
            </p>
            <div className="font-mono text-[10px] text-foreground bg-muted/20 p-1.5 rounded border border-border/40">
              A' = b * (h/2 - y) = 100 mm * (150 mm - 75 mm) = 7,500 mm²
            </div>

            <p>
              **Step 2: Find centroid ybar' of sub-area from NA:**
            </p>
            <div className="font-mono text-center text-foreground py-0.5 bg-muted/20 border border-border/40 rounded">
              y_bar' = y + (h/2 - y) / 2 = 75 + 37.5 = 112.5 mm
            </div>

            <p>
              **Step 3: Solve statical moment Q = ybar · A' and stress:**
            </p>
            <div className="font-mono text-center text-foreground py-0.5 bg-muted/20 border border-border/40 rounded">
              Q = {ybar_prime_mm.toFixed(1)} * {A_prime_mm2.toLocaleString()} = {Q_mm3.toLocaleString()} mm³
            </div>
            <div className="py-1 text-center bg-indigo-500/10 rounded-xl border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 font-extrabold text-xs">
              <LatexFormula math={`\\tau = (${(multiplier * 1e6).toFixed(3)} \\times 10^{-6}) \\cdot (${Q_mm3.toFixed(0)}) = ${currentTauMPa.toFixed(2)} \\text{ MPa}`} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <CalculationOutput title="Statical Moment Q" value={Q_mm3.toLocaleString()} unit="mm³" />
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

export default Problem01WebCheck;
