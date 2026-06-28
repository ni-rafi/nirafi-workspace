import React from 'react';
import { getSvgX } from './diagramConstants';

interface BeamDiagramProps {
  beamY: number;
  pairing: 'beam' | 'beam-sfd' | 'sfd-bmd' | 'all';
  stepIndex: number;
  clickIdx: number;
}

export const BeamDiagram: React.FC<BeamDiagramProps> = ({
  beamY,
  pairing,
  stepIndex,
  clickIdx,
}) => {
  const showBeam = pairing === 'beam' || pairing === 'beam-sfd' || pairing === 'all';
  if (!showBeam) return null;

  // Highlight area definitions (only active when pairing === 'beam-sfd')
  let shadeSource: React.ReactNode = null;
  if (pairing === 'beam-sfd') {
    if (stepIndex === 4 && clickIdx >= 0) {
      // A to C: Unloaded area (x = 0 to 5)
      shadeSource = (
        <g>
          <rect
            x={getSvgX(0)}
            y={beamY - 15}
            width={getSvgX(5) - getSvgX(0)}
            height={15}
            className="fill-emerald-500/15 stroke-emerald-500/20 animate-in fade-in duration-300"
            strokeWidth="0.5"
          />
          {clickIdx >= 1 && (
            <text x={getSvgX(2.5)} y={beamY - 18} textAnchor="middle" className="text-[7px] font-black fill-emerald-600 dark:fill-emerald-400 font-mono animate-in fade-in">w = 0, L = 5m</text>
          )}
        </g>
      );
    } else if (stepIndex === 6 && clickIdx >= 0) {
      // C to D: UDL area (x = 5 to 12)
      shadeSource = (
        <g>
          <rect
            x={getSvgX(5)}
            y={beamY - 26}
            width={getSvgX(12) - getSvgX(5)}
            height={26}
            className="fill-emerald-500/25 stroke-emerald-500/20 animate-in fade-in duration-300"
            strokeWidth="0.5"
          />
          {clickIdx >= 1 && (
            <text x={getSvgX(8.5)} y={beamY - 14} textAnchor="middle" className="text-[7.5px] font-black fill-emerald-600 dark:fill-emerald-400 font-mono animate-in fade-in">w = 3 kN/m, L = 7m</text>
          )}
        </g>
      );
    } else if (stepIndex === 8 && clickIdx >= 0) {
      // D to E: Unloaded area (x = 12 to 17)
      shadeSource = (
        <g>
          <rect
            x={getSvgX(12)}
            y={beamY - 15}
            width={getSvgX(17) - getSvgX(12)}
            height={15}
            className="fill-emerald-500/15 stroke-emerald-500/20 animate-in fade-in duration-300"
            strokeWidth="0.5"
          />
          {clickIdx >= 1 && (
            <text x={getSvgX(14.5)} y={beamY - 18} textAnchor="middle" className="text-[7px] font-black fill-emerald-600 dark:fill-emerald-400 font-mono animate-in fade-in">w = 0, L = 5m</text>
          )}
        </g>
      );
    } else if (stepIndex === 10 && clickIdx >= 0) {
      // E to B: Unloaded area (x = 17 to 20)
      shadeSource = (
        <g>
          <rect
            x={getSvgX(17)}
            y={beamY - 15}
            width={getSvgX(20) - getSvgX(17)}
            height={15}
            className="fill-emerald-500/15 stroke-emerald-500/20 animate-in fade-in duration-300"
            strokeWidth="0.5"
          />
          {clickIdx >= 1 && (
            <text x={getSvgX(18.5)} y={beamY - 18} textAnchor="middle" className="text-[7px] font-black fill-emerald-600 dark:fill-emerald-400 font-mono animate-in fade-in">w = 0, L = 3m</text>
          )}
        </g>
      );
    } else if (stepIndex === 9 && clickIdx >= 0) {
      // E: Concentrated load marker
      shadeSource = (
        <circle
          cx={getSvgX(17)}
          cy={beamY}
          r="8"
          className="fill-rose-500/30 stroke-rose-500 animate-pulse"
          strokeWidth="1"
        />
      );
    }
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

      {/* Left Pin Support at x = 0 */}
      <polygon
        points={`${getSvgX(0) - 8},${beamY + 16} ${getSvgX(0)},${beamY + 5} ${getSvgX(0) + 8},${beamY + 16}`}
        className="fill-slate-400 dark:fill-slate-500"
      />
      <line
        x1={getSvgX(0) - 10}
        y1={beamY + 16}
        x2={getSvgX(0) + 10}
        y2={beamY + 16}
        className="stroke-slate-500"
        strokeWidth="1.2"
      />

      {/* Right Roller Support at x = 20 */}
      <polygon
        points={`${getSvgX(20) - 8},${beamY + 14} ${getSvgX(20)},${beamY + 5} ${getSvgX(20) + 8},${beamY + 14}`}
        className="fill-slate-400 dark:fill-slate-500"
      />
      <circle cx={getSvgX(20) - 4} cy={beamY + 15.5} r="1.5" className="fill-slate-400" />
      <circle cx={getSvgX(20) + 4} cy={beamY + 15.5} r="1.5" className="fill-slate-400" />
      <line
        x1={getSvgX(20) - 10}
        y1={beamY + 17.5}
        x2={getSvgX(20) + 10}
        y2={beamY + 17.5}
        className="stroke-slate-500"
        strokeWidth="1.2"
      />

      {/* UDL Graphic */}
      <path
        d={`M ${getSvgX(5)} ${beamY - 5} Q ${getSvgX(5.5)} ${beamY - 20} ${getSvgX(6)} ${beamY - 5} Q ${getSvgX(6.5)} ${beamY - 20} ${getSvgX(7)} ${beamY - 5} Q ${getSvgX(7.5)} ${beamY - 20} ${getSvgX(8)} ${beamY - 5} Q ${getSvgX(8.5)} ${beamY - 20} ${getSvgX(9)} ${beamY - 5} Q ${getSvgX(9.5)} ${beamY - 20} ${getSvgX(10)} ${beamY - 5} Q ${getSvgX(10.5)} ${beamY - 20} ${getSvgX(11)} ${beamY - 5} Q ${getSvgX(11.5)} ${beamY - 20} ${getSvgX(12)} ${beamY - 5}`}
        fill="none"
        className="stroke-amber-500/80"
        strokeWidth="1.5"
      />
      <text x={getSvgX(8.5)} y={beamY - 22} textAnchor="middle" className="text-[9px] font-black fill-amber-500/90 font-mono">w = 3 kN/m</text>

      {/* Point Load P at x = 17 */}
      <path
        d={`M ${getSvgX(17)},${beamY - 28} L ${getSvgX(17)},${beamY - 6} M ${getSvgX(17) - 3.5},${beamY - 12} L ${getSvgX(17)},${beamY - 6} L ${getSvgX(17) + 3.5},${beamY - 12}`}
        fill="none"
        stroke="#ef4444"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <text x={getSvgX(17) + 6} y={beamY - 20} className="text-[9px] font-black fill-rose-500 font-mono">P = 15 kN</text>

      {/* Reaction force at A */}
      {((stepIndex === 1 && clickIdx >= 3) || stepIndex > 1) && (
        <g>
          <path
            d={`M ${getSvgX(0)},${beamY + 36} L ${getSvgX(0)},${beamY + 19} M ${getSvgX(0) - 3.5},${beamY + 25} L ${getSvgX(0)},${beamY + 19} L ${getSvgX(0) + 3.5},${beamY + 25}`}
            fill="none"
            stroke="#10b981"
            strokeWidth="1.8"
          />
          <text x={getSvgX(0) + 6} y={beamY + 30} className="text-[8px] font-bold fill-emerald-500 font-mono">R_A = 14.325 kN</text>
        </g>
      )}

      {/* Reaction force at B */}
      {((stepIndex === 1 && clickIdx >= 1) || stepIndex > 1) && (
        <g>
          <path
            d={`M ${getSvgX(20)},${beamY + 36} L ${getSvgX(20)},${beamY + 19} M ${getSvgX(20) - 3.5},${beamY + 25} L ${getSvgX(20)},${beamY + 19} L ${getSvgX(20) + 3.5},${beamY + 25}`}
            fill="none"
            stroke="#10b981"
            strokeWidth="1.8"
          />
          <text x={getSvgX(20) - 6} y={beamY + 30} textAnchor="end" className="text-[8px] font-bold fill-emerald-500 font-mono">R_B = 21.675 kN</text>
        </g>
      )}

      {shadeSource}
    </g>
  );
};
