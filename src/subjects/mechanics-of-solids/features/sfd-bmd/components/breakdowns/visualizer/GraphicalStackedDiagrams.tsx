import React from 'react';
import { getBaselines, getScales, getSvgX, svgWidth } from './diagramConstants';
import { BeamDiagram } from './BeamDiagram';
import { SfdDiagram } from './SfdDiagram';
import { BmdDiagram } from './BmdDiagram';

interface GraphicalStackedDiagramsProps {
  pairing: 'beam' | 'beam-sfd' | 'sfd-bmd' | 'all';
  stepIndex: number;
  displayedStep: number;
  clickIdx: number;
}

export const GraphicalStackedDiagrams: React.FC<GraphicalStackedDiagramsProps> = ({
  pairing,
  stepIndex,
  displayedStep,
  clickIdx,
}) => {
  const svgHeight = pairing === 'all' ? 245 : 185;
  const { beamY, sfdY, bmdY } = getBaselines(pairing);
  const { sfdScale, bmdScale } = getScales(pairing);

  return (
    <div className="w-full flex flex-col items-center justify-center p-3 border border-border/40 bg-muted/5 dark:bg-slate-900/10 rounded-xl">
      <svg className="w-full h-full overflow-visible" viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#f59e0b" />
          </marker>
        </defs>

        {/* Vertical Aligned Gridlines */}
        {[0, 5, 12, 17, 20].map((x, idx) => {
          const showLine = displayedStep >= 2 ? (displayedStep > 2 || clickIdx >= idx) : true;
          return showLine ? (
            <line
              key={x}
              x1={getSvgX(x)}
              y1="5"
              x2={getSvgX(x)}
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
        />

        {/* 2. SHEAR FORCE DIAGRAM (SFD) */}
        <SfdDiagram
          sfdY={sfdY}
          sfdScale={sfdScale}
          pairing={pairing}
          stepIndex={stepIndex}
          displayedStep={displayedStep}
          clickIdx={clickIdx}
        />

        {/* 3. BENDING MOMENT DIAGRAM (BMD) */}
        <BmdDiagram
          bmdY={bmdY}
          bmdScale={bmdScale}
          pairing={pairing}
          stepIndex={stepIndex}
          displayedStep={displayedStep}
          clickIdx={clickIdx}
        />

      </svg>
    </div>
  );
};
