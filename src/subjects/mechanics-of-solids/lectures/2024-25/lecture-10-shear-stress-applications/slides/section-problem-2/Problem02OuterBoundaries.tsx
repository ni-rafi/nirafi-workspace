import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, LatexFormula, CalculationOutput, SlideList } from '@/features/presentation/components/elements';
import { useUrlSyncedState } from '@/features/presentation/hooks/useUrlSyncedState';
import { ProfileShapeView } from '@/subjects/mechanics-of-solids/features/stress/components/diagrams/ProfileShapeView';
import { ShearStressProfileChart } from '@/subjects/mechanics-of-solids/features/stress/components/diagrams/ShearStressProfileChart';
import { CrossSectionEngine } from '@/subjects/mechanics-of-solids/cores/stress/cross-section.engine';
import { StressSolverEngine } from '@/subjects/mechanics-of-solids/cores/stress/stress-solver.engine';
import { StaticalMomentEngine } from '@/subjects/mechanics-of-solids/cores/stress/statical-moment.engine';
import { ExpandableDrawing } from '@/shared/components';
import { problem2Config } from '../../problemConfig';

export const Problem02OuterBoundaries: React.FC = () => {
  const [inspectY] = useUrlSyncedState<number>('problem2_inspect_y', 175); // Top fiber

  const { shape, V } = problem2Config;
  const props = CrossSectionEngine.calculateProperties(shape);
  const res = StressSolverEngine.solveDistribution(shape, 0, V);

  const H_m = shape.height ?? 0.3;
  const ybar_m = props.centroid;
  const top_y_mm = (H_m - ybar_m) * 1000;
  const bot_y_mm = -ybar_m * 1000;

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
      title="Outer Boundary Conditions"
      leftWidth="55%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-3 text-left">
          <div>
            <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest block mb-1">
              Outer skin check (y = 175, y = -125 mm)
            </span>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground">
              Like any solid section, the flexural shear stress at the extreme upper and lower boundaries of the beam profile must equal zero because no material area remains outside.
            </SlideParagraph>
          </div>

          <div className="space-y-2 text-xs text-muted-foreground">
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground">
              **Properties at outer skins:**
            </SlideParagraph>
            <SlideList
              items={[
                { text: `Top outer skin: y = +${top_y_mm.toFixed(0)} mm from NA. Sliced area A' = 0 ⇒ Q = 0.` },
                { text: `Bottom outer skin: y = ${bot_y_mm.toFixed(0)} mm from NA. Sliced area A' = 0 ⇒ Q = 0.` }
              ]}
            />
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground">
              Substituting Q = 0 into the shear stress equation:
            </SlideParagraph>
            <div className="py-2 text-center bg-indigo-500/10 rounded-xl border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 font-extrabold text-xs">
              <LatexFormula math="\tau_{\text{top}} = 0 \quad \text{and} \quad \tau_{\text{bottom}} = 0" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <CalculationOutput title={`Top Stress (y = ${top_y_mm.toFixed(0)})`} value="0.00" unit="MPa" />
            <CalculationOutput title={`Bottom Stress (y = ${bot_y_mm.toFixed(0)})`} value="0.00" unit="MPa" />
          </div>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center h-full min-h-[250px]">
          <ExpandableDrawing
            title="Outer Boundary Shear Check"
            description="Plot showing zero shear stress boundary values at top and bottom fibers."
          >
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
          </ExpandableDrawing>
        </div>
      }
    />
  );
};

export default Problem02OuterBoundaries;
