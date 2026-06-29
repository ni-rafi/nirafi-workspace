import React from 'react';
import { DimensionLine } from '@/features/presentation/components/elements/DimensionLine';

interface ElasticCurveDrawingProps {
  momentPos: number; // e.g. 3.0
  activeStep: number;
}

export const ElasticCurveDrawing: React.FC<ElasticCurveDrawingProps> = ({
  momentPos,
  activeStep,
}) => {
  const beamLength = 6.0;
  const scale = 360 / beamLength;
  const getSvgX = (x: number) => 70 + x * scale;

  const nodeAX = getSvgX(0); // 70
  const nodeBX = getSvgX(6.0); // 430
  const nodeCX = getSvgX(momentPos);
  const yBeam = 70;

  // Generate path points for the deflected shape
  const points: string[] = [];
  const steps = 60;
  const maxAmp = 22; // max deflection amplitude in pixels

  const isDeformed = activeStep >= 1;
  const ampLeft = isDeformed ? maxAmp * (momentPos / beamLength) : 0;
  const ampRight = isDeformed ? maxAmp * ((beamLength - momentPos) / beamLength) : 0;

  for (let i = 0; i <= steps; i++) {
    const x = (beamLength * i) / steps;
    const svgX = getSvgX(x);
    let dy = 0;

    if (x < momentPos) {
      dy = -ampLeft * Math.sin((Math.PI * x) / momentPos);
    } else {
      dy = ampRight * Math.sin((Math.PI * (x - momentPos)) / (beamLength - momentPos));
    }

    const svgY = yBeam + dy;
    points.push(`${svgX.toFixed(1)},${svgY.toFixed(1)}`);
  }

  const deflectionPath = `M ${points.join(' L ')}`;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center select-none">
      <svg className="w-full max-w-full h-full overflow-visible" viewBox="55 22 390 115">
        {/* Ground baseline */}
        <line
          x1="40"
          y1={yBeam}
          x2="460"
          y2={yBeam}
          className="stroke-slate-350 dark:stroke-slate-700/60"
          strokeWidth="1"
          strokeDasharray="3 3"
        />

        {/* Support A (Pin) */}
        <g>
          <polygon
            points={`${nodeAX - 6},${yBeam + 12} ${nodeAX},${yBeam} ${nodeAX + 6},${yBeam + 12}`}
            className="fill-slate-400 dark:fill-slate-500 stroke-slate-500"
            strokeWidth="1"
          />
          <line
            x1={nodeAX - 10}
            y1={yBeam + 12}
            x2={nodeAX + 10}
            y2={yBeam + 12}
            className="stroke-slate-500"
            strokeWidth="1.2"
          />
          <text x={nodeAX} y={yBeam - 8} textAnchor="middle" className="text-[10px] font-black fill-slate-500">
            A
          </text>
        </g>

        {/* Support B (Roller) */}
        <g>
          <polygon
            points={`${nodeBX - 6},${yBeam + 11} ${nodeBX},${yBeam} ${nodeBX + 6},${yBeam + 11}`}
            className="fill-slate-400 dark:fill-slate-500 stroke-slate-500"
            strokeWidth="1"
          />
          <circle cx={nodeBX - 3} cy={yBeam + 13} r={1.5} className="fill-slate-400 dark:fill-slate-500" />
          <circle cx={nodeBX + 3} cy={yBeam + 13} r={1.5} className="fill-slate-400 dark:fill-slate-500" />
          <line
            x1={nodeBX - 10}
            y1={yBeam + 15}
            x2={nodeBX + 10}
            y2={yBeam + 15}
            className="stroke-slate-500"
            strokeWidth="1.2"
          />
          <text x={nodeBX} y={yBeam - 8} textAnchor="middle" className="text-[10px] font-black fill-slate-500">
            B
          </text>
        </g>

        {/* Concentrated Moment Couple M0 Arc */}
        <g>
          {/* Rotational arc */}
          <path
            d={`M ${nodeCX - 12},${yBeam} A 12,12 0 1,1 ${nodeCX},${yBeam - 12}`}
            fill="none"
            stroke="#ef4444"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Arrowhead */}
          <path
            d={`M ${nodeCX - 4},${yBeam - 15} L ${nodeCX},${yBeam - 12} L ${nodeCX - 4},${yBeam - 9}`}
            fill="none"
            stroke="#ef4444"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text
            x={nodeCX}
            y={yBeam - 22}
            textAnchor="middle"
            className="text-[9px] font-mono font-bold fill-rose-500"
          >
            M₀
          </text>
        </g>

        {/* BEAM MEMBER (Morphs smoothly) */}
        <path
          d={deflectionPath}
          fill="none"
          className="stroke-slate-200 dark:stroke-slate-800 transition-all duration-700 ease-in-out"
          strokeWidth="10"
          strokeLinecap="round"
        />

        {/* Thin neutral axis core (lights up when deformed) */}
        {isDeformed && (
          <path
            d={deflectionPath}
            fill="none"
            className="stroke-indigo-500 transition-all duration-700 ease-in-out animate-in fade-in duration-300"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        )}

        {/* Shaded curvature regions */}
        {activeStep >= 2 && (
          <g className="opacity-15 dark:opacity-20 animate-in fade-in duration-300">
            {/* Left Hogging region (convex up) */}
            <path
              d={`M ${nodeAX},${yBeam} L ${points.slice(0, Math.floor(steps * momentPos / beamLength) + 1).join(' L ')} Z`}
              className="fill-rose-500"
            />
            {/* Right Sagging region (concave down) */}
            <path
              d={`M ${nodeCX},${yBeam} L ${points.slice(Math.floor(steps * momentPos / beamLength)).join(' L ')} L ${nodeBX},${yBeam} Z`}
              className="fill-indigo-500"
            />
          </g>
        )}

        {/* Curvature signs */}
        {activeStep >= 2 && (
          <g className="animate-in fade-in duration-350 text-[10px] font-bold">
            {/* Hogging left label */}
            <text
              x={(nodeAX + nodeCX) / 2}
              y={yBeam - 16}
              textAnchor="middle"
              className="fill-rose-500"
            >
              Hogging (-)
            </text>
            {/* Sagging right label */}
            <text
              x={(nodeCX + nodeBX) / 2}
              y={yBeam + 26}
              textAnchor="middle"
              className="fill-indigo-500"
            >
              Sagging (+)
            </text>
          </g>
        )}

        {/* Point of Inflection Glowing Highlight */}
        {activeStep >= 2 && (
          <g className="animate-in zoom-in-50 duration-300">
            {/* Glow ring */}
            <circle
              cx={nodeCX}
              cy={yBeam}
              r="7"
              className="fill-none stroke-emerald-400/60 stroke-2 animate-ping"
            />
            {/* Center dot */}
            <circle
              cx={nodeCX}
              cy={yBeam}
              r="4"
              className="fill-emerald-500 stroke-white"
              strokeWidth="1.5"
            />
            <text
              x={nodeCX}
              y={yBeam + 16}
              textAnchor="middle"
              className="text-[8px] font-bold fill-emerald-600 dark:fill-emerald-400 bg-background"
            >
              Inflection Point (M = 0)
            </text>
          </g>
        )}

        {/* Dimension labels */}
        <DimensionLine x1={nodeAX} y1={110} x2={nodeCX} y2={110} label={`${momentPos.toFixed(2)} m`} />
        <DimensionLine x1={nodeCX} y1={110} x2={nodeBX} y2={110} label={`${(beamLength - momentPos).toFixed(2)} m`} />
      </svg>
    </div>
  );
};

export default ElasticCurveDrawing;
