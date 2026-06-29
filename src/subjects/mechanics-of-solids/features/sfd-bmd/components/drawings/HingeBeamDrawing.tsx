import React from 'react';
import { DimensionLine } from '@/features/presentation/components/elements/DimensionLine';

interface HingeBeamDrawingProps {
  mode: 'full' | 'reactions-unknown' | 'right-segment' | 'left-segment' | 'solved';
  activeStep?: number;
}

export const HingeBeamDrawing: React.FC<HingeBeamDrawingProps> = ({ mode, activeStep = 0 }) => {
  const beamLength = 4.45;
  const scale = 360 / beamLength; // ~80.9 px/m
  const getSvgX = (x: number) => 70 + x * scale;

  const nodeAX = getSvgX(0); // 70
  const nodeEX = getSvgX(3.45); // 349
  const nodeBX = getSvgX(4.45); // 430
  const nodePX = getSvgX(3.95); // 390
  const yBeam = 76;

  // Opacity indicators for segmentation modes
  const isRightSegment = mode === 'right-segment';
  const isLeftSegment = mode === 'left-segment';

  const opacityLeft = isRightSegment ? 0.12 : 1.0;
  const opacityRight = isLeftSegment ? 0.12 : 1.0;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center select-none">
      <svg className="w-full max-w-full h-full overflow-visible" viewBox="0 0 500 180">
        {/* Ground baseline */}
        <line
          x1="40"
          y1="76"
          x2="460"
          y2="76"
          className="stroke-slate-300 dark:stroke-slate-700/60"
          strokeWidth="1"
          strokeDasharray="3 3"
        />

        {/* 1. BEAM MEMBER (Segmented or full) */}
        {/* Left Segment: A to E */}
        <rect
          x={nodeAX}
          y={yBeam - 6}
          width={nodeEX - nodeAX}
          height="12"
          rx="1"
          opacity={opacityLeft}
          className="fill-slate-200 dark:fill-slate-800 stroke-slate-400 dark:stroke-slate-650"
          strokeWidth="1.5"
        />
        {/* Right Segment: E to B */}
        <rect
          x={nodeEX}
          y={yBeam - 6}
          width={nodeBX - nodeEX}
          height="12"
          rx="1"
          opacity={opacityRight}
          className="fill-slate-200 dark:fill-slate-800 stroke-slate-400 dark:stroke-slate-650"
          strokeWidth="1.5"
        />

        {/* 2. SUPPORTS */}
        {/* Fixed Support A (vertical wall) */}
        <g opacity={opacityLeft}>
          {/* Wall back line */}
          <line
            x1={nodeAX}
            y1={yBeam - 22}
            x2={nodeAX}
            y2={yBeam + 22}
            className="stroke-slate-500"
            strokeWidth="3.5"
          />
          {/* Slanted hatch lines */}
          {[-18, -12, -6, 0, 6, 12, 18].map((offset) => (
            <line
              key={offset}
              x1={nodeAX}
              y1={yBeam + offset}
              x2={nodeAX - 5}
              y2={yBeam + offset - 4}
              className="stroke-slate-400"
              strokeWidth="1.2"
            />
          ))}
          <text x={nodeAX - 14} y={yBeam + 30} className="text-[10px] font-black fill-slate-500 text-center">
            A
          </text>
        </g>

        {/* Roller Support B */}
        <g opacity={opacityRight}>
          <polygon
            points={`${nodeBX - 8},${yBeam + 11} ${nodeBX},${yBeam} ${nodeBX + 8},${yBeam + 11}`}
            className="fill-slate-400 dark:fill-slate-500 stroke-slate-500"
            strokeWidth="1"
          />
          <circle cx={nodeBX - 4} cy={yBeam + 13.5} r={2} className="fill-slate-400 dark:fill-slate-500" />
          <circle cx={nodeBX + 4} cy={yBeam + 13.5} r={2} className="fill-slate-400 dark:fill-slate-500" />
          <line
            x1={nodeBX - 12}
            y1={yBeam + 15.5}
            x2={nodeBX + 12}
            y2={yBeam + 15.5}
            className="stroke-slate-500"
            strokeWidth="1.2"
          />
          <text x={nodeBX + 14} y={yBeam + 22} className="text-[10px] font-black fill-slate-500">
            B
          </text>
        </g>

        {/* 3. INTERNAL HINGE PIN AT E */}
        {/* Renders as a connector pin circle */}
        <circle
          cx={nodeEX}
          cy={yBeam}
          r="4.5"
          className="fill-white dark:fill-slate-900 stroke-slate-500"
          strokeWidth="2.0"
          opacity={isRightSegment || isLeftSegment ? 0.3 : 1.0}
        />
        <text
          x={nodeEX}
          y={yBeam - 12}
          textAnchor="middle"
          opacity={isRightSegment || isLeftSegment ? 0.3 : 1.0}
          className="text-[10px] font-black fill-slate-500"
        >
          E
        </text>

        {/* 4. LOADS */}
        {/* UDL w = 2 kN/m on Left segment */}
        {!isRightSegment && (
          <g opacity={opacityLeft} className="animate-in fade-in duration-300">
            {/* UDL top line */}
            <path
              d={`M ${nodeAX},46 L ${nodeEX},46`}
              fill="none"
              stroke="#3b82f6"
              strokeWidth="1.5"
              strokeDasharray="2 2"
            />
            {/* UDL arrows */}
            {Array.from({ length: 9 }).map((_, idx) => {
              const xPos = nodeAX + (idx * (nodeEX - nodeAX)) / 8;
              return (
                <path
                  key={idx}
                  d={`M ${xPos},46 L ${xPos},68 M ${xPos - 3},63 L ${xPos},68 L ${xPos + 3},63`}
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="1"
                />
              );
            })}
            <text
              x={(nodeAX + nodeEX) / 2}
              y="38"
              textAnchor="middle"
              className="text-[9px] font-mono font-bold fill-blue-600 dark:fill-blue-400"
            >
              w = 2 kN/m
            </text>
          </g>
        )}

        {/* Point Load P = 5 kN at midpoint of Right segment */}
        {!isLeftSegment && (
          <g opacity={opacityRight} className="animate-in fade-in duration-300">
            <path
              d={`M ${nodePX},26 L ${nodePX},68 M ${nodePX - 4.5},62 L ${nodePX},68 L ${nodePX + 4.5},62`}
              fill="none"
              stroke="#ef4444"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <text
              x={nodePX}
              y="20"
              textAnchor="middle"
              className="text-[9px] font-mono font-bold fill-rose-500"
            >
              P = 5 kN
            </text>
          </g>
        )}

        {/* 5. SEGMENTED PIN SUPPORT OR FORCE OVERLAYS */}
        {/* Right sub-span reactions E-B */}
        {isRightSegment && (
          <g className="animate-in fade-in duration-300">
            {/* Cut indicator wavy line on left */}
            <path
              d={`M ${nodeEX - 6},${yBeam - 12} Q ${nodeEX - 3},${yBeam - 6} ${nodeEX - 6},${yBeam} Q ${nodeEX - 9},${yBeam + 6} ${nodeEX - 6},${yBeam + 12}`}
              fill="none"
              stroke="#cbd5e1"
              strokeWidth="1"
            />

            {/* Reaction at Hinge E: upward shear reaction V_E */}
            <path
              d={`M ${nodeEX},116 L ${nodeEX},76 M ${nodeEX - 4},82 L ${nodeEX},76 L ${nodeEX + 4},82`}
              fill="none"
              stroke="#3b82f6"
              strokeWidth={activeStep >= 2 ? "2.2" : "1.2"}
              strokeDasharray={activeStep >= 2 ? undefined : "3 3"}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <text
              x={nodeEX}
              y="128"
              textAnchor="middle"
              className={`text-[9px] font-mono font-bold ${activeStep >= 2 ? "fill-blue-500" : "fill-blue-400/80"}`}
            >
              {activeStep >= 2 ? "VE = 2.50 kN (upward)" : "VE = ?"}
            </text>

            {/* Reaction at support B: By */}
            <path
              d={`M ${nodeBX},116 L ${nodeBX},92 M ${nodeBX - 4},98 L ${nodeBX},92 L ${nodeBX + 4},98`}
              fill="none"
              stroke="#10b981"
              strokeWidth={activeStep >= 1 ? "2.2" : "1.2"}
              strokeDasharray={activeStep >= 1 ? undefined : "3 3"}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <text
              x={nodeBX}
              y="128"
              textAnchor="middle"
              className={`text-[9px] font-mono font-bold ${activeStep >= 1 ? "fill-emerald-500" : "fill-emerald-500/60"}`}
            >
              {activeStep >= 1 ? "By = 2.50 kN" : "By = ?"}
            </text>
          </g>
        )}

        {/* Left sub-span forces A-E */}
        {isLeftSegment && (
          <g className="animate-in fade-in duration-300">
            {/* Cut indicator wavy line on right */}
            <path
              d={`M ${nodeEX + 6},${yBeam - 12} Q ${nodeEX + 9},${yBeam - 6} ${nodeEX + 6},${yBeam} Q ${nodeEX + 3},${yBeam + 6} ${nodeEX + 6},${yBeam + 12}`}
              fill="none"
              stroke="#cbd5e1"
              strokeWidth="1"
            />

            {/* Transferred hinge force VE acting downwards at E */}
            <path
              d={`M ${nodeEX},76 L ${nodeEX},116 M ${nodeEX - 4},110 L ${nodeEX},116 L ${nodeEX + 4},110`}
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <text
              x={nodeEX}
              y="128"
              textAnchor="middle"
              className="text-[9px] font-mono font-bold fill-blue-500"
            >
              VE = 2.50 kN (downward)
            </text>

            {/* Reactions at Fixed Support A (Ay and MA) */}
            <path
              d={`M ${nodeAX},116 L ${nodeAX},80 M ${nodeAX - 4},86 L ${nodeAX},80 L ${nodeAX + 4},86`}
              fill="none"
              stroke="#10b981"
              strokeWidth={activeStep >= 1 ? "2.2" : "1.2"}
              strokeDasharray={activeStep >= 1 ? undefined : "3 3"}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <text
              x={nodeAX}
              y="128"
              textAnchor="middle"
              className={`text-[9px] font-mono font-bold ${activeStep >= 1 ? "fill-emerald-500" : "fill-emerald-500/60"}`}
            >
              {activeStep >= 1 ? "Ay = 9.40 kN" : "Ay = ?"}
            </text>

            {/* Fixed moment reaction MA at node A */}
            {/* Curved arrow arc representing counter-clockwise moment */}
            <path
              d="M 50,76 A 16,16 0 1,0 66,60"
              fill="none"
              stroke="#10b981"
              strokeWidth={activeStep >= 2 ? "2.2" : "1.2"}
              strokeDasharray={activeStep >= 2 ? undefined : "3 3"}
              strokeLinecap="round"
            />
            {/* Moment arrowhead */}
            <path
              d="M 62,56 L 68,60 L 68,54"
              fill="none"
              stroke="#10b981"
              strokeWidth={activeStep >= 2 ? "2" : "1"}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <text
              x="38"
              y="54"
              textAnchor="middle"
              className={`text-[9px] font-mono font-bold ${activeStep >= 2 ? "fill-emerald-500" : "fill-emerald-500/60"}`}
            >
              {activeStep >= 2 ? "MA = 20.53 kNm" : "MA = ?"}
            </text>
          </g>
        )}

        {/* 6. REACTION UNKNOWNS OVERLAY */}
        {mode === 'reactions-unknown' && (
          <g className="animate-in fade-in duration-300">
            {/* Fixed support reactions: Ay */}
            <path
              d={`M ${nodeAX},116 L ${nodeAX},80 M ${nodeAX - 4},86 L ${nodeAX},80 L ${nodeAX + 4},86`}
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <text
              x={nodeAX}
              y="128"
              textAnchor="middle"
              className="text-[9px] font-mono font-bold fill-emerald-500"
            >
              Ay = ?
            </text>
            {/* Fixed moment reaction: MA */}
            <path
              d="M 50,76 A 16,16 0 1,0 66,60"
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M 62,56 L 68,60 L 68,54"
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <text
              x="38"
              y="54"
              textAnchor="middle"
              className="text-[9px] font-mono font-bold fill-emerald-500"
            >
              MA = ?
            </text>

            {/* Roller B reaction: By */}
            <path
              d={`M ${nodeBX},116 L ${nodeBX},92 M ${nodeBX - 4},98 L ${nodeBX},92 L ${nodeBX + 4},98`}
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <text
              x={nodeBX}
              y="128"
              textAnchor="middle"
              className="text-[9px] font-mono font-bold fill-emerald-500"
            >
              By = ?
            </text>
          </g>
        )}

        {/* 7. SOLVED REACTIONS MASTER OVERLAY */}
        {mode === 'solved' && (
          <g className="animate-in fade-in duration-300">
            {/* Fixed support reactions: Ay */}
            <path
              d={`M ${nodeAX},116 L ${nodeAX},80 M ${nodeAX - 4},86 L ${nodeAX},80 L ${nodeAX + 4},86`}
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <text
              x={nodeAX}
              y="128"
              textAnchor="middle"
              className="text-[9px] font-mono font-bold fill-emerald-500"
            >
              Ay = 9.40 kN
            </text>
            {/* Fixed moment reaction: MA */}
            <path
              d="M 50,76 A 16,16 0 1,0 66,60"
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M 62,56 L 68,60 L 68,54"
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <text
              x="38"
              y="54"
              textAnchor="middle"
              className="text-[9px] font-mono font-bold fill-emerald-500"
            >
              MA = 20.53 kNm
            </text>

            {/* Roller B reaction: By */}
            <path
              d={`M ${nodeBX},116 L ${nodeBX},92 M ${nodeBX - 4},98 L ${nodeBX},92 L ${nodeBX + 4},98`}
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <text
              x={nodeBX}
              y="128"
              textAnchor="middle"
              className="text-[9px] font-mono font-bold fill-emerald-500"
            >
              By = 2.50 kN
            </text>
          </g>
        )}

        {/* 8. DIMENSION CHAIN */}
        <DimensionLine
          x1={nodeAX}
          y1={150}
          x2={nodeEX}
          y2={150}
          label="3.45 m"
          className={isRightSegment ? "opacity-20 transition-all duration-300" : "transition-all duration-300"}
        />
        <DimensionLine
          x1={nodeEX}
          y1={150}
          x2={nodeBX}
          y2={150}
          label="1.00 m"
          className={isLeftSegment ? "opacity-20 transition-all duration-300" : "transition-all duration-300"}
        />
      </svg>
    </div>
  );
};

export default HingeBeamDrawing;
