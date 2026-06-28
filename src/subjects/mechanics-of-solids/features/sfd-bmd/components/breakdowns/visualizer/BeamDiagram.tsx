import React from 'react';
import { getSvgX } from './diagramConstants';
import { IBeam, ISolverOutput } from '@/subjects/mechanics-of-solids/cores/sfd-bmd/types';
import { DimensionLine } from '@/features/presentation/components/elements';

interface BeamDiagramProps {
  beamY: number;
  pairing: 'beam' | 'beam-sfd' | 'sfd-bmd' | 'all';
  stepIndex: number;
  clickIdx: number;
  beam: IBeam;
  solverResult: ISolverOutput;
}

export const BeamDiagram: React.FC<BeamDiagramProps> = ({
  beamY,
  pairing,
  stepIndex,
  clickIdx,
  beam,
  solverResult,
}) => {
  const showBeam = pairing === 'beam' || pairing === 'beam-sfd' || pairing === 'all';
  if (!showBeam) return null;

  const reactions = solverResult.reactions;

  const sfdSteps = (solverResult.graphicalStepsData || []).filter(s => s.type.startsWith('sfd-'));
  const sfdSlides: {
    type: 'sfd-segment' | 'sfd-jump' | 'sfd-node-check';
    x?: number;
    startX?: number;
    endX?: number;
    vStart?: number;
    vEnd?: number;
    loadArea?: number;
    jump?: number;
    source?: string;
  }[] = [];

  sfdSteps.forEach((step, idx) => {
    if (step.type === 'sfd-start') return;
    if (step.type === 'sfd-jump') {
      sfdSlides.push({
        type: 'sfd-jump',
        x: step.x,
        vStart: step.vStart,
        vEnd: step.vEnd,
        jump: step.jump,
        source: step.source,
      });
    } else if (step.type === 'sfd-segment') {
      sfdSlides.push({
        type: 'sfd-segment',
        startX: step.startX,
        endX: step.endX,
        vStart: step.vStart,
        vEnd: step.vEnd,
        loadArea: step.loadArea,
      });
      
      // Check if there is a jump at endX
      const nextStep = sfdSteps[idx + 1];
      const hasJumpAtEnd = nextStep && nextStep.type === 'sfd-jump' && Math.abs((nextStep.x || 0) - (step.endX || 0)) < 1e-3;
      if (!hasJumpAtEnd && step.endX !== undefined && step.endX < beam.length - 1e-3) {
        sfdSlides.push({
          type: 'sfd-node-check',
          x: step.endX,
          vEnd: step.vEnd,
        });
      }
    }
  });

  const activeStep = stepIndex >= 3 && stepIndex <= 11 ? sfdSlides[stepIndex - 3] : null;

  // Highlight area definitions dynamically
  let shadeSource: React.ReactNode = null;
  if (pairing === 'beam-sfd' && activeStep && activeStep.type === 'sfd-segment' && clickIdx >= 0) {
    const sX = getSvgX(activeStep.startX || 0, beam.length);
    const eX = getSvgX(activeStep.endX || 0, beam.length);
    const width = eX - sX;
    const dx = (activeStep.endX || 0) - (activeStep.startX || 0);
    const isUnloaded = Math.abs(activeStep.loadArea || 0) < 1e-6;
    const w = isUnloaded ? 0 : Math.abs(activeStep.loadArea || 0) / dx;
    const shadeHeight = isUnloaded ? 15 : 26;

    shadeSource = (
      <g>
        <rect
          x={sX}
          y={beamY - shadeHeight}
          width={width}
          height={shadeHeight}
          className="fill-fuchsia-500/20 stroke-fuchsia-500/20 animate-in fade-in duration-300"
          strokeWidth="0.5"
        />
        {clickIdx >= 1 && (
          <text
            x={(sX + eX) / 2}
            y={beamY - shadeHeight - 3}
            textAnchor="middle"
            className="text-[7.5px] font-black fill-fuchsia-600 dark:fill-fuchsia-400 font-mono animate-in fade-in"
          >
            {isUnloaded ? `w = 0, L = ${dx.toFixed(1)}m` : `w = ${w.toFixed(1)} kN/m, L = ${dx.toFixed(1)}m`}
          </text>
        )}
      </g>
    );
  }

  return (
    <g>
      {/* Beam body */}
      <rect
        x="50"
        y={beamY - 5}
        width="400"
        height="10"
        rx="1.5"
        className="fill-slate-200 dark:fill-slate-800 stroke-slate-400 dark:stroke-slate-700"
        strokeWidth="1.2"
      />

      {/* Supports */}
      {beam.supports.map(support => {
        const xPos = getSvgX(support.position, beam.length);
        if (support.type === 'roller') {
          return (
            <g key={support.id}>
              <polygon
                points={`${xPos - 8},${beamY + 14} ${xPos},${beamY + 5} ${xPos + 8},${beamY + 14}`}
                className="fill-slate-400 dark:fill-slate-500"
              />
              <circle cx={xPos - 4} cy={beamY + 15.5} r="1.5" className="fill-slate-400" />
              <circle cx={xPos + 4} cy={beamY + 15.5} r="1.5" className="fill-slate-400" />
              <line
                x1={xPos - 10}
                y1={beamY + 17.5}
                x2={xPos + 10}
                y2={beamY + 17.5}
                className="stroke-slate-500"
                strokeWidth="1.2"
              />
            </g>
          );
        }
        return (
          <g key={support.id}>
            <polygon
              points={`${xPos - 8},${beamY + 16} ${xPos},${beamY + 5} ${xPos + 8},${beamY + 16}`}
              className="fill-slate-400 dark:fill-slate-500"
            />
            <line
              x1={xPos - 10}
              y1={beamY + 16}
              x2={xPos + 10}
              y2={beamY + 16}
              className="stroke-slate-500"
              strokeWidth="1.2"
            />
          </g>
        );
      })}

      {/* UDL Graphics */}
      {beam.loads.filter(l => l.type === 'udl').map((load, idx) => {
        const startX = getSvgX(load.startPosition ?? 0, beam.length);
        const endX = getSvgX(load.endPosition ?? 0, beam.length);
        const midX = (startX + endX) / 2;
        let wavePath = `M ${startX} ${beamY - 5}`;
        const numWaves = Math.max(4, Math.round((load.endPosition ?? 0) - (load.startPosition ?? 0)) * 2);
        for (let i = 0; i < numWaves; i++) {
          const x1 = startX + (endX - startX) * (i / numWaves);
          const x2 = startX + (endX - startX) * ((i + 1) / numWaves);
          const xMid = (x1 + x2) / 2;
          wavePath += ` Q ${xMid} ${beamY - 20} ${x2} ${beamY - 5}`;
        }

        const isThisUdlActive = activeStep?.type === 'sfd-segment' && 
          Math.abs((activeStep.startX || 0) - (load.startPosition || 0)) < 1e-2 &&
          Math.abs((activeStep.endX || 0) - (load.endPosition || 0)) < 1e-2;
 
        return (
          <g key={idx}>
            <path
              d={wavePath}
              fill="none"
              className="stroke-amber-500/80"
              strokeWidth="1.5"
            />
            {!(pairing === 'beam-sfd' && isThisUdlActive) && (
              <text x={midX} y={beamY - 22} textAnchor="middle" className="text-[9px] font-black fill-amber-500/90 font-mono">
                w = {load.magnitude} kN/m
              </text>
            )}
          </g>
        );
      })}

      {/* Point Loads */}
      {beam.loads.filter(l => l.type === 'point').map((load, idx) => {
        const xPos = getSvgX(load.position ?? 0, beam.length);
        return (
          <g key={idx}>
            <path
              d={`M ${xPos},${beamY - 28} L ${xPos},${beamY - 6} M ${xPos - 3.5},${beamY - 12} L ${xPos},${beamY - 6} L ${xPos + 3.5},${beamY - 12}`}
              fill="none"
              stroke="#ef4444"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <text x={xPos + 6} y={beamY - 20} className="text-[9px] font-black fill-rose-500 font-mono">
              P = {load.magnitude} kN
            </text>
          </g>
        );
      })}

      {/* Reaction force vectors */}
      {((stepIndex === 1 && clickIdx >= 1) || stepIndex > 1) && reactions.filter(r => r.type === 'R_y').map((rxn, idx) => {
        const support = beam.supports.find(s => s.id === rxn.supportId);
        if (!support) return null;
        const xPos = getSvgX(support.position, beam.length);
        const isA = rxn.supportId === 'A';
        
        if (stepIndex === 1 && isA && clickIdx < 3) return null;
 
        return (
          <g key={idx}>
            <path
              d={`M ${xPos},${beamY + 36} L ${xPos},${beamY + 19} M ${xPos - 3.5},${beamY + 25} L ${xPos},${beamY + 19} L ${xPos + 3.5},${beamY + 25}`}
              fill="none"
              stroke="#10b981"
              strokeWidth="1.8"
            />
            <text
              x={isA ? xPos + 6 : xPos - 6}
              y={beamY + 30}
              textAnchor={isA ? 'start' : 'end'}
              className="text-[8.5px] font-bold fill-emerald-600 dark:fill-emerald-400 font-sans"
            >
              R<tspan dy="2" fontSize="6px">{rxn.supportId.toLowerCase()}y</tspan>
              <tspan dy="-2"> = {rxn.value.toFixed(3)} kN</tspan>
            </text>
          </g>
        );
      })}

      {/* Segment dimension lines under the beam using reusable DimensionLine component */}
      {(() => {
        const dimY = beamY + 46;
        return (
          <g>
            {solverResult.intervals.map((inv, idx) => {
              const sX = getSvgX(inv.startX, beam.length);
              const eX = getSvgX(inv.endX, beam.length);
              const L = inv.endX - inv.startX;
              return (
                <DimensionLine
                  key={idx}
                  x1={sX}
                  y1={dimY}
                  x2={eX}
                  y2={dimY}
                  label={`${L.toFixed(1)}m`}
                  color="#94a3b8"
                  className="opacity-90 dark:opacity-85 text-[7px]"
                  textClassName="fill-slate-500 dark:fill-slate-400 text-[6.5px] font-sans font-extrabold"
                />
              );
            })}
          </g>
        );
      })()}

      {shadeSource}
    </g>
  );
};
