import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, SlideCallout, SlideTable, LatexFormula, ParameterSlider } from '@/features/presentation/components/elements';
import { useUrlSyncedState } from '@/features/presentation/hooks/useUrlSyncedState';
import { ProfileShapeView } from '@/subjects/mechanics-of-solids/features/stress/components/diagrams/ProfileShapeView';
import { ShearStressProfileChart } from '@/subjects/mechanics-of-solids/features/stress/components/diagrams/ShearStressProfileChart';
import { CrossSectionEngine } from '@/subjects/mechanics-of-solids/cores/stress/cross-section.engine';
import { StressSolverEngine } from '@/subjects/mechanics-of-solids/cores/stress/stress-solver.engine';
import { StaticalMomentEngine } from '@/subjects/mechanics-of-solids/cores/stress/statical-moment.engine';
import { problem1Config } from '../../problemConfig';

export const Problem01SummaryPlot: React.FC = () => {
  const [inspectY, setInspectY] = useUrlSyncedState<number>('problem1_inspect_y', 0);

  const { shape, V } = problem1Config;
  const props = CrossSectionEngine.calculateProperties(shape);
  const res = StressSolverEngine.solveDistribution(shape, 0, V);

  const H_m = shape.height ?? 0.3;
  const ybar_m = props.centroid;

  const svgW = 240;
  const svgH = 150;
  const paddingY = 20;
  const chartH = svgH - paddingY * 2;
  const toPixelY = (yNA: number) => paddingY + (1 - (yNA + ybar_m) / H_m) * chartH;

  const maxTau = res.maxShear;
  const inspectY_m = inspectY / 1000;
  const pyInspect = toPixelY(inspectY_m);
  const statQ = StaticalMomentEngine.calculateQAndWidth(shape, inspectY_m, props);
  const currentTau = props.I > 1e-12 && statQ.t > 1e-6 ? (V * statQ.Q) / (props.I * statQ.t) : 0;
  const currentTauMPa = currentTau / 1e6;

  // Table rows
  const headers = ['Height y (mm)', 'Q (10³ mm³)', 'Stress τ (MPa)'];
  const rows = [
    [<span><LatexFormula math="\pm 150" /> (Top/Bot)</span>, '0', '0.00'],
    [<span><LatexFormula math="\pm 75" /> (Mid-height)</span>, '843.75', '2.25'],
    [<span>0 (Neutral Axis)</span>, '1,125.00', '3.00 (Max)']
  ];

  return (
    <TwoColumnLayout
      title="Compiled Numerical Stress Profile"
      leftWidth="52%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-3 text-left">
          <div>
            <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest block mb-1">
              Problem Summary
            </span>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground mb-1">
              Here is the compiled list of stress results at our chosen inspection depths:
            </SlideParagraph>
          </div>

          <div className="flex-1 my-0.5">
            <SlideTable headers={headers} rows={rows} bordered striped dense="tight" />
          </div>

          <div className="my-1.5">
            <ParameterSlider
              label="Interactive NA Depth Inspector (y)"
              value={inspectY}
              unit="mm"
              min={-150}
              max={150}
              step={5}
              onChange={setInspectY}
            />
          </div>

          <SlideCallout variant="success" className="py-2 px-3 text-[10px]">
            The numerical profile confirms the parabolic shape, with zero stresses at outer skins and reaching a peak of 3.00 MPa at the neutral axis.
          </SlideCallout>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center h-full min-h-[250px]">
          <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full max-w-[270px] overflow-visible">
            <ProfileShapeView
              shape={shape}
              centroid={ybar_m}
              toPixelY={toPixelY}
              inspectY={inspectY}
              currentWidth={statQ.t * 1000}
              xSection={65}
              sliceHeight={inspectY}
              sliceDirection="above"
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
              xShear={180}
              showCurve={true}
              showPeak={true}
              showInteractiveDot={true}
            />
          </svg>
        </div>
      }
    />
  );
};

export default Problem01SummaryPlot;
