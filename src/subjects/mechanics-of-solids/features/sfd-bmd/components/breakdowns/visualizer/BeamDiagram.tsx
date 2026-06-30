import React from 'react';
import { getSvgX } from './diagramConstants';
import { IBeam, ISolverOutput } from '@/subjects/mechanics-of-solids/cores/sfd-bmd/types';
import { DimensionLine } from '@/features/presentation/components/elements';
import { UdlLoad, UvlLoad, PointLoad, MomentLoad } from '@/features/civil-drawing/components/loads';

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

  const activeStep = (stepIndex >= 3 && stepIndex < 3 + sfdSlides.length) ? sfdSlides[stepIndex - 3] : null;

  // Highlight area definitions dynamically
  let shadeSource: React.ReactNode = null;
  if (pairing === 'beam-sfd' && activeStep && activeStep.type === 'sfd-segment' && clickIdx >= 0) {
    const sX = getSvgX(activeStep.startX || 0, beam.length);
    const eX = getSvgX(activeStep.endX || 0, beam.length);
    const dx = (activeStep.endX || 0) - (activeStep.startX || 0);
    const isUnloaded = Math.abs(activeStep.loadArea || 0) < 1e-6;

    // Find the maximum load magnitude across the entire beam to compute a uniform height scale
    let maxW = 0.1;
    beam.loads.forEach(l => {
      if (l.type === 'udl') {
        maxW = Math.max(maxW, Math.abs(l.magnitude ?? 0));
      } else if (l.type === 'uvl') {
        maxW = Math.max(maxW, Math.abs(l.startMagnitude ?? 0), Math.abs(l.endMagnitude ?? 0));
      }
    });
    const scaleW = 26 / maxW;

    // Resolve specific start and end intensities for the active load zone
    const midX = ((activeStep.startX ?? 0) + (activeStep.endX ?? 0)) / 2;
    const activeLoad = beam.loads.find(
      l => midX >= (l.startPosition ?? l.position ?? 0) &&
           midX <= (l.endPosition ?? l.position ?? beam.length)
    );

    let hStart = 4; // default minimum marking height
    let hEnd = 4;
    let labelText = '';

    if (isUnloaded || !activeLoad) {
      hStart = 4;
      hEnd = 4;
      labelText = `w = 0, L = ${dx.toFixed(1)}m`;
    } else if (activeLoad.type === 'uvl') {
      const wStartFull = activeLoad.startMagnitude ?? 0;
      const wEndFull = activeLoad.endMagnitude ?? 0;
      const Xs = activeLoad.startPosition ?? 0;
      const Xe = activeLoad.endPosition ?? 0;
      const loadSpan = Xe - Xs;

      const w_startX = wStartFull + (wEndFull - wStartFull) * (((activeStep.startX ?? 0) - Xs) / loadSpan);
      const w_endX = wStartFull + (wEndFull - wStartFull) * (((activeStep.endX ?? 0) - Xs) / loadSpan);

      hStart = Math.max(4, Math.abs(w_startX) * scaleW);
      hEnd = Math.max(4, Math.abs(w_endX) * scaleW);
      labelText = `w = ${w_startX.toFixed(1)}→${w_endX.toFixed(1)} kN/m, L = ${dx.toFixed(1)}m`;
    } else {
      // UDL
      const wMag = activeLoad.magnitude ?? 0;
      const h = Math.max(4, Math.abs(wMag) * scaleW);
      hStart = h;
      hEnd = h;
      labelText = `w = ${wMag.toFixed(1)} kN/m, L = ${dx.toFixed(1)}m`;
    }

    const points = `${sX},${beamY} ${sX},${beamY - hStart} ${eX},${beamY - hEnd} ${eX},${beamY}`;
    const maxH = Math.max(hStart, hEnd);

    shadeSource = (
      <g>
        <polygon
          points={points}
          className="fill-fuchsia-500/20 stroke-fuchsia-500/20 animate-in fade-in duration-300"
          strokeWidth="0.5"
        />
        {clickIdx >= 1 && (
          <text
            x={(sX + eX) / 2}
            y={beamY - maxH - 3}
            textAnchor="middle"
            className="text-[7.5px] font-black fill-fuchsia-600 dark:fill-fuchsia-400 font-mono animate-in fade-in"
          >
            {labelText}
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
        const width = endX - startX;
        
        const isThisUdlActive = activeStep?.type === 'sfd-segment' && 
          Math.abs((activeStep.startX || 0) - (load.startPosition || 0)) < 1e-2 &&
          Math.abs((activeStep.endX || 0) - (load.endPosition || 0)) < 1e-2;

        return (
          <UdlLoad
            key={`udl-${idx}`}
            x={startX}
            y={beamY - 5}
            width={width}
            height={16}
            direction={(load.magnitude ?? 0) < 0 ? 'up' : 'down'}
            color="#f59e0b"
            label={!(pairing === 'beam-sfd' && isThisUdlActive) ? `w = ${load.magnitude} kN/m` : undefined}
          />
        );
      })}

      {/* UVL Graphics */}
      {beam.loads.filter(l => l.type === 'uvl').map((load, idx) => {
        const startX = getSvgX(load.startPosition ?? 0, beam.length);
        const endX = getSvgX(load.endPosition ?? 0, beam.length);
        const width = endX - startX;
        
        const isThisUvlActive = activeStep?.type === 'sfd-segment' && 
          Math.abs((activeStep.startX || 0) - (load.startPosition || 0)) < 1e-2 &&
          Math.abs((activeStep.endX || 0) - (load.endPosition || 0)) < 1e-2;

        const maxMag = Math.max(Math.abs(load.startMagnitude ?? 0), Math.abs(load.endMagnitude ?? 0));
        const maxScaleHeight = 24;
        const startHeight = maxMag > 0 ? (Math.abs(load.startMagnitude ?? 0) / maxMag) * maxScaleHeight : 0;
        const endHeight = maxMag > 0 ? (Math.abs(load.endMagnitude ?? 0) / maxMag) * maxScaleHeight : 0;

        const startLabel = !(pairing === 'beam-sfd' && isThisUvlActive) ? `w1 = ${load.startMagnitude} kN/m` : undefined;
        const endLabel = !(pairing === 'beam-sfd' && isThisUvlActive) ? `w2 = ${load.endMagnitude} kN/m` : undefined;

        return (
          <UvlLoad
            key={`uvl-${idx}`}
            x={startX}
            y={beamY - 5}
            width={width}
            startHeight={startHeight}
            endHeight={endHeight}
            direction={(load.startMagnitude ?? 0) < 0 ? 'up' : 'down'}
            color="#f59e0b"
            startLabel={startLabel}
            endLabel={endLabel}
          />
        );
      })}

      {/* Point Loads */}
      {beam.loads.filter(l => l.type === 'point').map((load, idx) => {
        const xPos = getSvgX(load.position ?? 0, beam.length);
        const magnitude = load.magnitude ?? 0;
        const isUp = magnitude < 0;
        return (
          <PointLoad
            key={`point-${idx}`}
            x={xPos}
            y={isUp ? beamY + 5 : beamY - 5}
            length={20}
            direction={isUp ? 'up' : 'down'}
            color="#ef4444"
            label={`P = ${Math.abs(magnitude)} kN`}
          />
        );
      })}

      {/* Moment Loads */}
      {beam.loads.filter(l => l.type === 'moment').map((load, idx) => {
        const xPos = getSvgX(load.position ?? 0, beam.length);
        const magnitude = load.magnitude ?? 0;
        const isCcw = magnitude < 0;
        const variant = isCcw 
          ? (xPos > getSvgX(beam.length / 2, beam.length) ? 'ccw-left' : 'ccw-right')
          : (xPos > getSvgX(beam.length / 2, beam.length) ? 'cw-left' : 'cw-right');

        return (
          <MomentLoad
            key={`moment-${idx}`}
            cx={xPos}
            cy={beamY}
            radius={12}
            variant={variant}
            color="#8b5cf6"
            label={`M = ${Math.abs(magnitude)} kNm`}
          />
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
