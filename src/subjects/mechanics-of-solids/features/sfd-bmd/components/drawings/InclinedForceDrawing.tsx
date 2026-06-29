import React from 'react';
import { DimensionLine } from '@/features/presentation/components/elements/DimensionLine';

interface InclinedForceDrawingProps {
  angle: number; // e.g. 50
  showComponents?: boolean;
  showReactions?: boolean;
}

export const InclinedForceDrawing: React.FC<InclinedForceDrawingProps> = ({
  angle,
  showComponents = false,
  showReactions = false,
}) => {
  const beamLength = 6.0;
  const scale = 360 / beamLength;
  const getSvgX = (x: number) => 70 + x * scale;

  const nodeCX = getSvgX(3.0); // Center is 3m (250px)
  const nodeCY = 76; // beam center Y

  const rad = (angle * Math.PI) / 180;
  const arrowLength = 50;

  // Compute load vector start position pointing to C (250, 76)
  const startX = nodeCX - arrowLength * Math.cos(rad);
  const startY = nodeCY - arrowLength * Math.sin(rad);

  // Compute arrowhead wings pointing at C (250, 76)
  const wing1X = nodeCX - 9 * Math.cos(rad - 0.45);
  const wing1Y = nodeCY - 9 * Math.sin(rad - 0.45);
  const wing2X = nodeCX - 9 * Math.cos(rad + 0.45);
  const wing2Y = nodeCY - 9 * Math.sin(rad + 0.45);

  // Reaction values (static reference is 10 kN)
  const loadP = 10.0;
  const valPx = (loadP * Math.cos(rad)).toFixed(2);
  const valPy = (loadP * Math.sin(rad)).toFixed(2);
  const valRy = (loadP * Math.sin(rad) / 2.0).toFixed(2);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center select-none">
      <svg className="w-full max-w-full h-full overflow-visible" viewBox="55 22 390 148">
        {/* Ground baseline */}
        <line
          x1="40"
          y1="76"
          x2="460"
          y2="76"
          className="stroke-slate-350 dark:stroke-slate-700/60"
          strokeWidth="1"
          strokeDasharray="3 3"
        />

        {/* 1. BEAM MEMBER */}
        <rect
          x="70"
          y="70"
          width="360"
          height="12"
          rx="2"
          className="fill-slate-200 dark:fill-slate-800 stroke-slate-400 dark:stroke-slate-650"
          strokeWidth="1.5"
        />

        {/* 2. SUPPORTS (Fixed Pin A, Roller B) */}
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
          y="60"
          textAnchor="middle"
          className="text-[10px] font-black fill-slate-600 dark:fill-slate-400"
        >
          C
        </text>

        {/* 3. INCLINED FORCE ARROW */}
        <g>
          <line
            x1={startX}
            y1={startY}
            x2={nodeCX}
            y2={nodeCY}
            stroke="#ef4444"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d={`M ${wing1X},${wing1Y} L ${nodeCX},${nodeCY} L ${wing2X},${wing2Y}`}
            fill="none"
            stroke="#ef4444"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text
            x={startX - 6}
            y={startY - 6}
            textAnchor="end"
            className="text-[10px] font-mono font-bold fill-rose-500"
          >
            P = 10 kN @ {angle}°
          </text>
        </g>

        {/* 4. ORTHOGONAL COMPONENTS OVERLAY */}
        {showComponents && (
          <g className="animate-in fade-in duration-300">
            <path
              d={`M ${nodeCX},26 L ${nodeCX},76 M ${nodeCX - 4.5},70 L ${nodeCX},76 L ${nodeCX + 4.5},70`}
              fill="none"
              stroke="#f59e0b"
              strokeWidth="2"
              strokeDasharray="2 2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <text
              x={nodeCX - 8}
              y="42"
              textAnchor="end"
              className="text-[9px] font-mono font-semibold fill-amber-600 dark:fill-amber-400"
            >
              Py = {valPy} kN
            </text>
            <path
              d={`M ${nodeCX},76 L ${nodeCX + 60},76 M ${nodeCX + 54},72 L ${nodeCX + 60},76 L ${nodeCX + 54},80`}
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2"
              strokeDasharray="2 2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <text
              x={nodeCX + 65}
              y="72"
              textAnchor="start"
              className="text-[9px] font-mono font-semibold fill-blue-600 dark:fill-blue-400"
            >
              Px = {valPx} kN
            </text>
          </g>
        )}

        {/* 5. SUPPORT BOUNDARY REACTIONS */}
        {showReactions && (
          <g className="animate-in fade-in duration-300">
            <path
              d="M 70,116 L 70,92 M 66.5,98 L 70,92 L 73.5,98"
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <text x="70" y="128" textAnchor="middle" className="text-[9px] font-mono font-bold fill-emerald-500">
              Ay = {valRy} kN
            </text>
            <path
              d="M 110,76 L 80,76 M 86,72 L 80,76 L 86,80"
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <text x="115" y="87" textAnchor="start" className="text-[9px] font-mono font-bold fill-emerald-500">
              Ax = {valPx} kN
            </text>
            <path
              d="M 430,116 L 430,92 M 426.5,98 L 430,92 L 433.5,98"
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <text x="430" y="128" textAnchor="middle" className="text-[9px] font-mono font-bold fill-emerald-500">
              By = {valRy} kN
            </text>
          </g>
        )}

        {/* 6. DIMENSION LABELS CHAIN */}
        <DimensionLine x1={70} y1={150} x2={nodeCX} y2={150} label="3.0 m" />
        <DimensionLine x1={nodeCX} y1={150} x2={430} y2={150} label="3.0 m" />
      </svg>
    </div>
  );
};

export default InclinedForceDrawing;
