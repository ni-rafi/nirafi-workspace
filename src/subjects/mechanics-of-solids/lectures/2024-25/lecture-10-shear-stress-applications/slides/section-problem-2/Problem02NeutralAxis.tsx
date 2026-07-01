import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, LatexFormula, CalculationOutput } from '@/features/presentation/components/elements';
import { useUrlSyncedState } from '@/features/presentation/hooks/useUrlSyncedState';
import { ProfileShapeView } from '@/subjects/mechanics-of-solids/features/stress/components/diagrams/ProfileShapeView';
import { ShearStressProfileChart } from '@/subjects/mechanics-of-solids/features/stress/components/diagrams/ShearStressProfileChart';
import { CrossSectionEngine } from '@/subjects/mechanics-of-solids/cores/stress/cross-section.engine';
import { StressSolverEngine } from '@/subjects/mechanics-of-solids/cores/stress/stress-solver.engine';
import { StaticalMomentEngine } from '@/subjects/mechanics-of-solids/cores/stress/statical-moment.engine';
import { problem2Config } from '../../problemConfig';

export const Problem02NeutralAxis: React.FC = () => {
  const [inspectY] = useUrlSyncedState<number>('problem2_inspect_y', 0); // At NA

  const { shape, V } = problem2Config;
  const props = CrossSectionEngine.calculateProperties(shape);
  const res = StressSolverEngine.solveDistribution(shape, 0, V);

  const H_m = shape.height ?? 0.3;
  const ybar_m = props.centroid;
  const I_mm4 = props.I * 1e12;
  const b_web_mm = (shape.thicknessWeb ?? 0.05) * 1000;

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

  return (
    <TwoColumnLayout
      title="Neutral Axis Peak Stress"
      leftWidth="55%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-3 text-left">
          <div>
            <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest block mb-1">
              Peak Stress: y = 0 mm
            </span>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground">
              Finally, we calculate the absolute maximum shear stress, which occurs along the Neutral Axis line inside the web section:
            </SlideParagraph>
          </div>

          <div className="space-y-2 text-xs text-muted-foreground">
            <p>
              **Step 1: Calculate maximum statical moment Q_max:**
            </p>
            <div className="font-mono text-center text-foreground py-0.5 bg-muted/20 border border-border/40 rounded">
              Q_max = Q_junction + Q_web_segment
              <br />
              = 750,000 + (50 * 125) * 62.5 = {Q_mm3.toLocaleString()} mm³
            </div>

            <p>
              **Substitute Q_max and web width b = {b_web_mm.toFixed(0)} mm:**
            </p>
            <div className="py-1 text-center bg-indigo-500/10 rounded-xl border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 font-extrabold text-xs">
              <LatexFormula math={`\\tau_{\\max} = \\frac{100000 \\cdot ${Q_mm3.toFixed(0)}}{${(I_mm4 / 1e6).toFixed(2)} \\times 10^6 \\cdot ${b_web_mm.toFixed(0)}} = ${currentTauMPa.toFixed(3)} \\text{ MPa}`} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <CalculationOutput title="Maximum Q_max" value={Q_mm3.toLocaleString()} unit="mm³" />
            <CalculationOutput title="Peak Stress τ_max" value={currentTauMPa.toFixed(3)} unit="MPa" />
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

export default Problem02NeutralAxis;
