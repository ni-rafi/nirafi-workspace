import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, LatexFormula, CalculationOutput } from '@/features/presentation/components/elements';
import { useUrlSyncedState } from '@/features/presentation/hooks/useUrlSyncedState';
import { ProfileShapeView } from '@/subjects/mechanics-of-solids/features/stress/components/diagrams/ProfileShapeView';
import { ShearStressProfileChart } from '@/subjects/mechanics-of-solids/features/stress/components/diagrams/ShearStressProfileChart';
import { CrossSectionEngine } from '@/subjects/mechanics-of-solids/cores/stress/cross-section.engine';
import { StressSolverEngine } from '@/subjects/mechanics-of-solids/cores/stress/stress-solver.engine';
import { StaticalMomentEngine } from '@/subjects/mechanics-of-solids/cores/stress/statical-moment.engine';
import { ExpandableDrawing } from '@/shared/components';
import { problem2Config } from '../../problemConfig';

export const Problem02Constants: React.FC = () => {
  const [inspectY] = useUrlSyncedState<number>('problem2_inspect_y', 0);

  const { shape, V } = problem2Config;
  const props = CrossSectionEngine.calculateProperties(shape);
  const res = StressSolverEngine.solveDistribution(shape, 0, V);

  const H_m = shape.height ?? 0.3;
  const ybar_m = props.centroid; // 125mm from bottom
  const I_mm4 = props.I * 1e12;
  const ybar_mm = ybar_m * 1000;

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
      title="Section Centroid and Moment of Inertia"
      leftWidth="55%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-3 text-left">
          <div>
            <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest block mb-1">
              Section Properties (y_bar, I)
            </span>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground">
              Because the cross-section is asymmetric (the bottom flange is wider than the top flange), we must calculate the centroid height and the moment of inertia first.
            </SlideParagraph>
          </div>

          <div className="space-y-2 text-xs text-muted-foreground">
            <div>
              <span className="font-bold text-foreground">1. Centroid (ybar from bottom):</span>
              <div className="my-1 py-0.5 text-center bg-background rounded border border-border/20 text-[10px]">
                <LatexFormula math={`\\bar{y} = \\frac{\\sum A_i \\bar{y}_i}{\\sum A_i} = ${ybar_mm.toFixed(1)} \\text{ mm}`} />
              </div>
            </div>

            <div>
              <span className="font-bold text-foreground">2. Moment of Inertia (I_xx):</span>
              <div className="my-1.5 py-0.5 text-center bg-background rounded border border-border/20 text-[10px]">
                <LatexFormula math={`I = \\sum (I_i + A_i d_i^2) = ${(I_mm4 / 1e6).toFixed(2)} \\times 10^6 \\text{ mm}^4`} />
              </div>
              <SlideParagraph variant="plain" className="text-[9.5px] text-muted-foreground">
                Using parallel-axis theorem: d_1 = 100 mm, d_2 = 25 mm, d_3 = 150 mm.
              </SlideParagraph>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <CalculationOutput title="Centroid y_bar" value={ybar_mm.toFixed(1)} unit="mm from bot" />
            <CalculationOutput title="Moment of Inertia" value={(I_mm4 / 1e6).toFixed(2)} unit="10⁶ mm⁴" />
          </div>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center h-full min-h-[250px]">
          <ExpandableDrawing
            title="Asymmetric Section Properties"
            description="Profile visualization mapping the neutral axis centroid coordinate for the asymmetric I-beam."
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

export default Problem02Constants;
