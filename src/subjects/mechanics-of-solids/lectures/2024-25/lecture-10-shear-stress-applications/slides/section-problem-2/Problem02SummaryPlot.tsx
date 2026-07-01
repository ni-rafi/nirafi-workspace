import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, SlideCallout, SlideTable } from '@/features/presentation/components/elements';
import { useUrlSyncedState } from '@/features/presentation/hooks/useUrlSyncedState';
import { ProfileShapeView } from '@/subjects/mechanics-of-solids/features/stress/components/diagrams/ProfileShapeView';
import { ShearStressProfileChart } from '@/subjects/mechanics-of-solids/features/stress/components/diagrams/ShearStressProfileChart';
import { CrossSectionEngine } from '@/subjects/mechanics-of-solids/cores/stress/cross-section.engine';
import { StressSolverEngine } from '@/subjects/mechanics-of-solids/cores/stress/stress-solver.engine';
import { StaticalMomentEngine } from '@/subjects/mechanics-of-solids/cores/stress/statical-moment.engine';
import { problem2Config } from '../../problemConfig';

export const Problem02SummaryPlot: React.FC = () => {
  const [inspectY] = useUrlSyncedState<number>('problem2_inspect_y', 0);

  const { shape, V } = problem2Config;
  const props = CrossSectionEngine.calculateProperties(shape);
  const res = StressSolverEngine.solveDistribution(shape, 0, V);

  const H_m = shape.height ?? 0.3;
  const ybar_m = props.centroid;

  const svgW = 280;
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
  const headers = ['Depth y (mm)', 'Width b (mm)', 'Stress τ (MPa)'];
  const rows = [
    ['+175 (Top)', '100', '0.00'],
    ['+125 (Junction B, flange)', '100', '2.94'],
    ['+125 (Junction B, web)', '50', '5.88'],
    ['0 (Neutral Axis)', '50', '8.94 (Max)'],
    ['-75 (Junction D, web)', '50', '7.84'],
    ['-75 (Junction D, flange)', '200', '1.96'],
    ['-125 (Bottom)', '200', '0.00']
  ];

  return (
    <TwoColumnLayout
      title="Compiled Flanged Stress Profile"
      leftWidth="55%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-3 text-left">
          <div>
            <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest block mb-1">
              Problem Summary
            </span>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground">
              Here is the compiled list of key stress values across the asymmetric section:
            </SlideParagraph>
          </div>

          <div className="flex-1 my-1">
            <SlideTable headers={headers} rows={rows} bordered striped />
          </div>

          <SlideCallout variant="success" className="py-2 px-3 text-[10px]">
            Notice the sudden stress jumps at the junctions due to width variations, and the parabolic growth peaking at the neutral axis.
          </SlideCallout>
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

export default Problem02SummaryPlot;
