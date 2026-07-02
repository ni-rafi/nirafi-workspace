import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideCallout, ParameterSlider, SlideList } from '@/features/presentation/components/elements';
import { useUrlSyncedState } from '@/features/presentation/hooks/useUrlSyncedState';
import { ProfileShapeView } from '@/subjects/mechanics-of-solids/features/stress/components/diagrams/ProfileShapeView';
import { ShearStressProfileChart } from '@/subjects/mechanics-of-solids/features/stress/components/diagrams/ShearStressProfileChart';
import { CrossSectionEngine } from '@/subjects/mechanics-of-solids/cores/stress/cross-section.engine';
import { StressSolverEngine } from '@/subjects/mechanics-of-solids/cores/stress/stress-solver.engine';
import { StaticalMomentEngine } from '@/subjects/mechanics-of-solids/cores/stress/statical-moment.engine';
import { ExpandableDrawing } from '@/shared/components';
import { problem2Config } from '../../problemConfig';

export const Problem02Statement: React.FC = () => {
  const [inspectY, setInspectY] = useUrlSyncedState<number>('problem2_inspect_y', 0); // mm from NA

  const { shape, V } = problem2Config;
  const props = CrossSectionEngine.calculateProperties(shape);
  const res = StressSolverEngine.solveDistribution(shape, 0, V);

  const H_m = shape.height ?? 0.3;
  const ybar_m = props.centroid; // ~0.125m

  // Coordinate conversions
  const svgW = 280;
  const svgH = 150;
  const paddingY = 20;
  const chartH = svgH - paddingY * 2;
  const toPixelY = (yNA: number) => paddingY + (1 - (yNA + ybar_m) / H_m) * chartH;

  const maxTau = Math.max(1e-3, res.maxShear);
  const inspectY_m = inspectY / 1000;
  const pyInspect = toPixelY(inspectY_m);
  const statQ = StaticalMomentEngine.calculateQAndWidth(shape, inspectY_m, props);
  const currentTau = props.I > 1e-12 && statQ.t > 1e-6 ? (V * statQ.Q) / (props.I * statQ.t) : 0;
  const currentTauMPa = currentTau / 1e6;

  return (
    <TwoColumnLayout
      title="Asymmetric I-Beam Section Geometry"
      leftWidth="50%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-3 text-left">
          <div>
            <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest block mb-1">
              Tutorial Problem 02
            </span>
            <div className="bg-muted/10 p-3 rounded-xl border border-border/40 text-xs leading-relaxed text-foreground">
              <strong>Question:</strong> Draw the shear stress distribution over the asymmetric flanged section shown, if it is subjected to an applied vertical shear force of V = 100 kN.
            </div>
          </div>

          <div className="space-y-2 text-xs text-muted-foreground">
            <h4 className="font-bold text-foreground">Beam Dimensions:</h4>
            <SlideList
              items={[
                { text: 'Top Flange: 100 mm × 50 mm' },
                { text: 'Web: 50 mm × 200 mm' },
                { text: 'Bottom Flange: 200 mm × 50 mm' }
              ]}
            />
          </div>

          <div className="space-y-2">
            <ParameterSlider
              label="Inspect Height (y)"
              value={inspectY}
              unit="mm"
              min={-Math.round(ybar_m * 1000)}
              max={Math.round((H_m - ybar_m) * 1000)}
              step={5}
              onChange={setInspectY}
            />
          </div>

          <SlideCallout variant="info" className="py-2 px-3 text-[10px]">
            Notice that the width changes abruptly at the top flange (100 mm → 50 mm) and bottom flange (200 mm → 50 mm) junctions.
          </SlideCallout>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center h-full min-h-[250px]">
          <ExpandableDrawing
            title="Asymmetric I-Beam Stress Profile"
            description="Asymmetric I-beam profile visualization with dynamic shear stress profile chart mapping width discontinuities."
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

export default Problem02Statement;
