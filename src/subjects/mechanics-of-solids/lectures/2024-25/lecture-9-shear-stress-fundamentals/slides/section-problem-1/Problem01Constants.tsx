import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, CalculationOutput } from '@/features/presentation/components/elements';
import { useUrlSyncedState } from '@/features/presentation/hooks/useUrlSyncedState';
import { ProfileShapeView } from '@/subjects/mechanics-of-solids/features/stress/components/diagrams/ProfileShapeView';
import { ShearStressProfileChart } from '@/subjects/mechanics-of-solids/features/stress/components/diagrams/ShearStressProfileChart';
import { CrossSectionEngine } from '@/subjects/mechanics-of-solids/cores/stress/cross-section.engine';
import { StressSolverEngine } from '@/subjects/mechanics-of-solids/cores/stress/stress-solver.engine';
import { StaticalMomentEngine } from '@/subjects/mechanics-of-solids/cores/stress/statical-moment.engine';
import { problem1Config } from '../../problemConfig';

export const Problem01Constants: React.FC = () => {
  const [inspectY] = useUrlSyncedState<number>('problem1_inspect_y', 0);

  const { shape, V } = problem1Config;
  const props = CrossSectionEngine.calculateProperties(shape);
  const res = StressSolverEngine.solveDistribution(shape, 0, V);

  const H_m = shape.height ?? 0.3;
  const ybar_m = props.centroid;
  const I_mm4 = props.I * 1e12;
  const b_mm = shape.width * 1000;
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

  return (
    <TwoColumnLayout
      title="Constant Multiplier Check"
      leftWidth="55%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-3 text-left">
          <div>
            <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest block mb-1">
              Constant Terms (V / I b)
            </span>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground">
              To simplify repeated calculations across different depths, we isolate the constant terms of the flexural shear formula:
            </SlideParagraph>
          </div>

          <div className="space-y-2 text-xs text-muted-foreground">
            <p>
              Given: V = {(V / 1000).toFixed(0)} kN, b = {b_mm.toFixed(0)} mm, and I = {(I_mm4 / 1e6).toFixed(1)} × 10⁶ mm⁴.
            </p>
            <div className="font-mono text-[10px] text-foreground bg-muted/20 p-2 rounded border border-border/40">
              Constant = V / (I * b)
              <br />
              = 60,000 / (225x10⁶ * 100)
              <br />
              = 2.667 × 10⁻⁶ N/mm³ (or MPa/mm³)
            </div>
            <div className="py-1 bg-amber-500/10 rounded border border-amber-500/30 p-2">
              <p className="text-[10px] text-amber-600 dark:text-amber-400 font-bold leading-normal">
                💡 Flexural Shear formula can be written as:
                <br />
                <span className="font-mono font-bold text-[11px]">τ = (2.667 × 10⁻⁶) · Q</span>
                <br />
                Where Q must be in mm³ to yield stress directly in MPa.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <CalculationOutput title="Moment of Inertia (I)" value={(I_mm4 / 1e6).toFixed(1)} unit="10⁶ mm⁴" />
            <CalculationOutput title="Multiplier Coeff" value={(multiplier * 1e6).toFixed(3)} unit="x 10⁻⁶" />
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

export default Problem01Constants;
