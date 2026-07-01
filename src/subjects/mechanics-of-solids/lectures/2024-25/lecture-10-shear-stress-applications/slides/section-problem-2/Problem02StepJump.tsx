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

export const Problem02StepJump: React.FC = () => {
  const [inspectY] = useUrlSyncedState<number>('problem2_inspect_y', 125); // At junction

  const { shape, V } = problem2Config;
  const props = CrossSectionEngine.calculateProperties(shape);
  const res = StressSolverEngine.solveDistribution(shape, 0, V);

  const H_m = shape.height ?? 0.3;
  const ybar_m = props.centroid;
  const b_flange_mm = shape.width * 1000;
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

  const tau_flange_MPa = props.I > 1e-12 ? (V * statQ.Q) / (props.I * shape.width * 1e6) : 0;
  const tau_web_MPa = props.I > 1e-12 ? (V * statQ.Q) / (props.I * (shape.thicknessWeb ?? 0.05) * 1e6) : 0;
  const jump_ratio = b_flange_mm / b_web_mm;

  return (
    <TwoColumnLayout
      title="Step Jump Stress Discontinuity"
      leftWidth="55%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-3 text-left">
          <div>
            <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest block mb-1">
              Top Junction: y = 125 mm
            </span>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground">
              Because the width b halves from 100 mm to 50 mm, the shearing stress experiences a sudden double-step jump at this exact level coordinate:
            </SlideParagraph>
          </div>

          <div className="space-y-2 text-xs text-muted-foreground">
            <p>
              **Stress on flange side (b_flange = {b_flange_mm.toFixed(0)} mm):**
            </p>
            <div className="font-mono text-center text-foreground py-0.5 bg-muted/20 border border-border/40 rounded">
              τ_flange = V * Q / (I * b_flange) = {tau_flange_MPa.toFixed(3)} MPa
            </div>

            <p>
              **Stress on web side (b_web = {b_web_mm.toFixed(0)} mm):**
            </p>
            <div className="font-mono text-center text-foreground py-0.5 bg-muted/20 border border-border/40 rounded">
              τ_web = V * Q / (I * b_web) = {tau_web_MPa.toFixed(3)} MPa
            </div>

            <p>
              **Notice the jump ratio:**
            </p>
            <div className="font-mono text-center text-red-500 font-bold">
              τ_web = (b_flange / b_web) * τ_flange = {jump_ratio.toFixed(0)} * τ_flange
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <CalculationOutput title="Stress in Flange" value={tau_flange_MPa.toFixed(3)} unit="MPa" />
            <CalculationOutput title="Stress in Web" value={tau_web_MPa.toFixed(3)} unit="MPa" />
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

export default Problem02StepJump;
