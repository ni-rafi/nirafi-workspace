import React from 'react';
import { DimensionLine } from '@/features/presentation/components/elements/DimensionLine';

interface BracketLoadingDrawingProps {
  loadVal?: number; // e.g. 1.2
  bracketLen?: number; // e.g. 2.0
  mode:
    | 'intro-setup-straight'
    | 'intro-setup-deformed'
    | 'intro-flow'
    | 'equiv-dimmed'
    | 'equiv-deflected'
    | 'horizontal-physical'
    | 'horizontal-equivalent';
}

export const BracketLoadingDrawing: React.FC<BracketLoadingDrawingProps> = ({
  loadVal = 1.2,
  bracketLen = 2.0,
  mode,
}) => {
  const beamLength = 6.0;
  const scale = 360 / beamLength;
  const getSvgX = (x: number) => 70 + x * scale;

  const nodeCX = getSvgX(3.0); // 250
  const nodeCY = 76;

  const computedMoment = (loadVal * bracketLen).toFixed(1);

  // Beam is deformed for intro-setup-deformed, flow, and equiv-deflected
  const isDeformed = mode === 'intro-setup-deformed' || mode === 'intro-flow' || mode === 'equiv-deflected';

  // Bracket is dimmed for equivalence modes
  const isBracketDimmed = mode === 'equiv-dimmed' || mode === 'equiv-deflected';

  // Force is moved to C for equivalence modes
  const isForceMoved = mode === 'equiv-dimmed' || mode === 'equiv-deflected';

  // Show flow path in intro-flow mode
  const showFlowPath = mode === 'intro-flow';

  const renderClockwiseMoment = (x: number, y: number) => {
    return (
      <g>
        <path
          d={`M ${x - 18},${y - 5} A 20,20 0 1,1 ${x + 15},${y - 8}`}
          fill="none"
          stroke="#4f46e5"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d={`M ${x + 9},${y - 12} L ${x + 17},${y - 6} L ${x + 13},${y + 2}`}
          fill="none"
          stroke="#4f46e5"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    );
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center select-none">
      <svg className="w-full max-w-full h-full overflow-visible" viewBox="55 22 390 148">
        {/* Support ground line */}
        <line
          x1="40"
          y1="76"
          x2="460"
          y2="76"
          className="stroke-slate-350 dark:stroke-slate-700/60"
          strokeWidth="1"
          strokeDasharray="3 3"
        />

        {/* 1. BEAM MEMBER (Smoothly Morphing Path) */}
        <path
          d={
            isDeformed
              ? "M 70,76 C 160,56 210,62 250,76 C 290,90 340,96 430,76"
              : "M 70,76 C 160,76 210,76 250,76 C 290,76 340,76 430,76"
          }
          fill="none"
          className="stroke-slate-200 dark:stroke-slate-800 transition-all duration-700 ease-in-out"
          strokeWidth="12"
          strokeLinecap="round"
        />
        {isDeformed && (
          <path
            d="M 70,76 C 160,56 210,62 250,76 C 290,90 340,96 430,76"
            fill="none"
            className="stroke-indigo-500 animate-in fade-in duration-550"
            strokeWidth="2"
            strokeLinecap="round"
          />
        )}

        {/* 2. SUPPORTS (Fixed at A (x=70), Roller at B (x=430)) */}
        <g>
          <polygon
            points="62,91 70,76 78,91"
            className="fill-slate-400 dark:fill-slate-500 stroke-slate-500"
            strokeWidth="1"
          />
          <line x1="58" y1="91" x2="82" y2="91" className="stroke-slate-500" strokeWidth="1.2" />
          <text x="70" y="60" textAnchor="middle" className="text-[10px] font-black fill-slate-500">
            A
          </text>
        </g>
        <g>
          <polygon
            points="422,87 430,76 438,87"
            className="fill-slate-400 dark:fill-slate-500 stroke-slate-500"
            strokeWidth="1"
          />
          <circle cx="426" cy="89.5" r="2" className="fill-slate-400 dark:fill-slate-500" />
          <circle cx="434" cy="89.5" r="2" className="fill-slate-400 dark:fill-slate-500" />
          <line x1="418" y1="91.5" x2="442" y2="91.5" className="stroke-slate-500" strokeWidth="1.2" />
          <text x="430" y="60" textAnchor="middle" className="text-[10px] font-black fill-slate-500">
            B
          </text>
        </g>

        {/* Center label C */}
        <text
          x={nodeCX}
          y={isDeformed ? 92 : 62}
          textAnchor="middle"
          className="text-[10px] font-black fill-slate-600 dark:fill-slate-400 transition-all duration-700 ease-in-out"
        >
          C
        </text>

        {/* 3. BRACKETS AND LOADS */}
        {mode !== 'horizontal-physical' && mode !== 'horizontal-equivalent' && (
          <g>
            {/* The Bracket structure */}
            <path
              d="M 250,76 L 250,120 L 310,120"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              className={`text-slate-700 dark:text-slate-300 transition-all duration-700 ease-in-out ${
                isBracketDimmed ? 'opacity-20' : 'opacity-100'
              }`}
              style={{
                transform: isDeformed ? 'rotate(12deg)' : 'rotate(0deg)',
                transformOrigin: '250px 76px',
              }}
            />

            {/* Load Flow highlight path */}
            {showFlowPath && (
              <path
                d="M 310,120 L 250,120 L 250,76"
                fill="none"
                stroke="#ef4444"
                strokeWidth="2.5"
                strokeDasharray="4 3"
                className="transition-all duration-700 ease-in-out"
                style={{
                  transform: isDeformed ? 'rotate(12deg)' : 'rotate(0deg)',
                  transformOrigin: '250px 76px',
                }}
              />
            )}

            {/* Force at bracket tip */}
            {!isForceMoved && (
              <g
                className="transition-all duration-700 ease-in-out"
                style={{
                  transform: isDeformed ? 'rotate(12deg)' : 'rotate(0deg)',
                  transformOrigin: '250px 76px',
                }}
              >
                <path
                  d="M 310,90 L 310,120 M 306,114 L 310,120 L 314,114"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <text
                  x="315"
                  y="108"
                  textAnchor="start"
                  className="text-[10px] font-mono font-bold fill-rose-500"
                >
                  P = {loadVal.toFixed(1)} kN
                </text>
                <text
                  x="280"
                  y="135"
                  textAnchor="middle"
                  className="text-[9px] font-mono fill-slate-400"
                >
                  Arm = {bracketLen.toFixed(1)} m
                </text>
              </g>
            )}

            {/* Equivalent Load system at node C */}
            {isForceMoved && (
              <g className="animate-in fade-in duration-500">
                <path
                  d="M 250,30 L 250,66 M 246,60 L 250,66 L 254,60"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <text
                  x="242"
                  y="48"
                  textAnchor="end"
                  className="text-[10px] font-mono font-bold fill-rose-500"
                >
                  P = {loadVal.toFixed(1)} kN
                </text>
                {renderClockwiseMoment(250, 76)}
                <text
                  x="274"
                  y="58"
                  textAnchor="start"
                  className="text-[10px] font-mono font-bold fill-indigo-600"
                >
                  M₀ = {computedMoment} kN·m
                </text>
              </g>
            )}
          </g>
        )}

        {/* Mode: horizontal-physical */}
        {mode === 'horizontal-physical' && (
          <g className="animate-in fade-in duration-300">
            <path
              d={`M ${nodeCX},76 L ${nodeCX},36`}
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              className="text-slate-700 dark:text-slate-300"
            />
            <path
              d="M 215,36 L 250,36 M 244,32 L 250,36 L 244,40"
              fill="none"
              stroke="#ef4444"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <text x="210" y="32" textAnchor="middle" className="text-[10px] font-mono font-bold fill-rose-500">
              P = 2.0 kN
            </text>
            <text x={nodeCX + 8} y="56" textAnchor="start" className="text-[9px] font-mono fill-slate-400">
              Height = 1.5 m
            </text>
          </g>
        )}

        {/* Mode: horizontal-equivalent */}
        {mode === 'horizontal-equivalent' && (
          <g className="animate-in fade-in duration-300">
            <path
              d={`M ${nodeCX - 35},76 L ${nodeCX},76 M ${nodeCX - 6},72 L ${nodeCX},76 L ${nodeCX - 6},80`}
              fill="none"
              stroke="#ef4444"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <text x={nodeCX - 38} y="74" textAnchor="end" className="text-[10px] font-mono font-bold fill-rose-500">
              P = 2.0 kN
            </text>
            {renderClockwiseMoment(nodeCX, nodeCY)}
            <text x={nodeCX + 24} y="58" textAnchor="start" className="text-[10px] font-mono font-bold fill-indigo-600">
              M₀ = 3.0 kN·m
            </text>
          </g>
        )}

        {/* Main beam dimensions ticks */}
        {(mode === 'intro-setup-straight' || mode === 'intro-setup-deformed' || mode === 'intro-flow' || mode === 'equiv-dimmed' || mode === 'equiv-deflected') && (
          <>
            <DimensionLine x1={70} y1={150} x2={nodeCX} y2={150} label="3.0 m" />
            <DimensionLine x1={nodeCX} y1={150} x2={430} y2={150} label="3.0 m" />
          </>
        )}
      </svg>
    </div>
  );
};

export default BracketLoadingDrawing;
