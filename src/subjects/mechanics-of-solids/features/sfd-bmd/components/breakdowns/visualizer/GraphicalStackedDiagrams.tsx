import React from 'react';
import { getBaselines, getSvgX, svgWidth } from './diagramConstants';
import { BeamDiagram } from './BeamDiagram';
import { SfdDiagram } from './SfdDiagram';
import { BmdDiagram } from './BmdDiagram';
import { IBeam, ISolverOutput } from '@/subjects/mechanics-of-solids/cores/sfd-bmd/types';

interface GraphicalStackedDiagramsProps {
  pairing: 'beam' | 'beam-sfd' | 'sfd-bmd' | 'all';
  stepIndex: number;
  displayedStep: number;
  clickIdx: number;
  beam: IBeam;
  solverResult: ISolverOutput;
}

export const GraphicalStackedDiagrams: React.FC<GraphicalStackedDiagramsProps> = ({
  pairing,
  stepIndex,
  displayedStep,
  clickIdx,
  beam,
  solverResult,
}) => {
  const svgHeight = pairing === 'all' ? 245 : 185;
  const { beamY, sfdY, bmdY } = getBaselines(pairing);

  // Dynamic gridlines calculation
  const gridPositions = React.useMemo(() => {
    const points = new Set<number>();
    points.add(0);
    points.add(beam.length);
    beam.supports.forEach(s => points.add(s.position));
    beam.releases.forEach(r => points.add(r.position));
    beam.loads.forEach(l => {
      if (l.position !== undefined) points.add(l.position);
      if (l.startPosition !== undefined) points.add(l.startPosition);
      if (l.endPosition !== undefined) points.add(l.endPosition);
    });
    return Array.from(points).sort((a, b) => a - b);
  }, [beam]);

  // Dynamic scale calculation based on engine solver results
  const maxV = React.useMemo(() => {
    let maxVal = 0.1;
    if (solverResult.criticalPoints) {
      solverResult.criticalPoints.forEach(cp => {
        maxVal = Math.max(maxVal, Math.abs(cp.v));
      });
    }
    return maxVal;
  }, [solverResult.criticalPoints]);

  const maxM = React.useMemo(() => {
    let maxVal = 0.1;
    if (solverResult.criticalPoints) {
      solverResult.criticalPoints.forEach(cp => {
        maxVal = Math.max(maxVal, Math.abs(cp.m));
      });
    }
    return maxVal;
  }, [solverResult.criticalPoints]);

  const sfdScale = (pairing === 'all' ? 25 : pairing === 'sfd-bmd' ? 30 : 40) / maxV;
  const bmdScale = (pairing === 'all' ? 45 : 48) / maxM;

  return (
    <div className="relative w-full flex flex-col items-center justify-center p-3 border border-border/40 bg-muted/5 dark:bg-slate-900/10 rounded-xl diagrams-transition-wrapper">
      <svg className="w-full h-full overflow-visible" viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#f59e0b" />
          </marker>
        </defs>

        {/* Vertical Aligned Gridlines */}
        {gridPositions.map((x, idx) => {
          const showLine = displayedStep >= 2 ? (displayedStep > 2 || clickIdx >= idx) : true;
          return showLine ? (
            <line
              key={x}
              x1={getSvgX(x, beam.length)}
              y1="5"
              x2={getSvgX(x, beam.length)}
              y2={svgHeight - 5}
              className="stroke-muted-foreground/15 transition-opacity duration-300"
              strokeWidth="1"
              strokeDasharray="2 2"
            />
          ) : null;
        })}

        {/* 1. BEAM DIAGRAM */}
        <BeamDiagram
          beamY={beamY}
          pairing={pairing}
          stepIndex={stepIndex}
          clickIdx={clickIdx}
          beam={beam}
          solverResult={solverResult}
        />

        {/* 2. SHEAR FORCE DIAGRAM (SFD) */}
        <SfdDiagram
          sfdY={sfdY}
          sfdScale={sfdScale}
          pairing={pairing}
          stepIndex={stepIndex}
          displayedStep={displayedStep}
          clickIdx={clickIdx}
          beam={beam}
          solverResult={solverResult}
        />

        {/* 3. BENDING MOMENT DIAGRAM (BMD) */}
        <BmdDiagram
          bmdY={bmdY}
          bmdScale={bmdScale}
          pairing={pairing}
          stepIndex={stepIndex}
          displayedStep={displayedStep}
          clickIdx={clickIdx}
          beam={beam}
          solverResult={solverResult}
        />

      </svg>
    </div>
  );
};
