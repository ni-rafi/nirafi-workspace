import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideCallout, ParameterSlider, SlideList, LatexFormula } from '@/features/presentation/components/elements';
import { useUrlSyncedState } from '@/features/presentation/hooks/useUrlSyncedState';
import { ProfileShapeView } from '@/subjects/mechanics-of-solids/features/stress/components/diagrams/ProfileShapeView';
import { ShearStressProfileChart } from '@/subjects/mechanics-of-solids/features/stress/components/diagrams/ShearStressProfileChart';
import { CrossSectionEngine } from '@/subjects/mechanics-of-solids/cores/stress/cross-section.engine';
import { StressSolverEngine } from '@/subjects/mechanics-of-solids/cores/stress/stress-solver.engine';
import { StaticalMomentEngine } from '@/subjects/mechanics-of-solids/cores/stress/statical-moment.engine';
import { ExpandableDrawing } from '@/shared/components';
import { problem1Config } from '../../problemConfig';

export const Problem01Statement: React.FC = () => {
  const [inspectY, setInspectY] = useUrlSyncedState<number>('problem1_inspect_y', 0); // mm from NA

  const { shape, V } = problem1Config;

  const props = CrossSectionEngine.calculateProperties(shape);
  const res = StressSolverEngine.solveDistribution(shape, 0, V);

  const H_m = shape.height ?? 0.3;
  const ybar_m = props.centroid; // 0.15m

  // Coordinate conversions
  const svgW = 280;
  const svgH = 150;
  const paddingY = 20;
  const chartH = svgH - paddingY * 2; // 110
  const toPixelY = (yNA: number) => paddingY + (1 - (yNA + ybar_m) / H_m) * chartH;

  const maxTau = Math.max(1e-3, res.maxShear);
  const inspectY_m = inspectY / 1000;
  const pyInspect = toPixelY(inspectY_m);
  const statQ = StaticalMomentEngine.calculateQAndWidth(shape, inspectY_m, props);
  const currentTau = props.I > 1e-12 && statQ.t > 1e-6 ? (V * statQ.Q) / (props.I * statQ.t) : 0;
  const currentTauMPa = currentTau / 1e6;

  return (
    <TwoColumnLayout
      title="Problem Statement & Section Geometry"
      leftWidth="50%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-3 text-left">
          <div>
            <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest block mb-1">
              Tutorial Problem 01
            </span>
            <div className="bg-muted/10 p-3 rounded-xl border border-border/40 text-xs leading-relaxed text-foreground">
              <strong>Question:</strong> Find the shear stress of the rectangular beam section at the Neutral Axis (<LatexFormula math="y = 0" />), <LatexFormula math="y = \pm 75\text{ mm}" />, and <LatexFormula math="y = \pm 150\text{ mm}" /> if the applied vertical shear force is <LatexFormula math="V = 60\text{ kN}" />.
            </div>
          </div>

          <div className="space-y-2 text-xs text-muted-foreground">
            <h4 className="font-bold text-foreground">Given Parameters:</h4>
            <SlideList
              items={[
                { text: <span>Shear Force <LatexFormula math="V = 60\text{ kN} = 60 \times 10^3\text{ N}" /></span> },
                { text: <span>Width <LatexFormula math="b = 100\text{ mm} = 0.1\text{ m}" /></span> },
                { text: <span>Height <LatexFormula math="h = 300\text{ mm} = 0.3\text{ m}" /></span> }
              ]}
            />
          </div>

          <div className="space-y-2">
            <ParameterSlider
              label="Inspect Height (y)"
              value={inspectY}
              unit="mm"
              min={-150}
              max={150}
              step={5}
              onChange={setInspectY}
            />
          </div>

          <SlideCallout variant="info" className="py-2 px-3 text-[10px]">
            Drag the slider to inspect shear stress levels at various depths. Let's solve the section constants next.
          </SlideCallout>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center h-full min-h-[250px]">
          <ExpandableDrawing
            title="Shear Stress Profile Visualizer"
            description="Interactive 2D beam cross-section showing depth slice parameter y mapped to the parabolic shear stress distribution chart."
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

export default Problem01Statement;
