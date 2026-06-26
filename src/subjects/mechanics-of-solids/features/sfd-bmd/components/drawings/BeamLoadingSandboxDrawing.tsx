import React from 'react';

interface BeamLoadingSandboxDrawingProps {
  showPointLoad?: boolean;
  showUdl?: boolean;
  reactionA?: number | string;
  reactionB?: number | string;
}

export const BeamLoadingSandboxDrawing: React.FC<BeamLoadingSandboxDrawingProps> = ({
  showPointLoad = true,
  showUdl = false,
  reactionA,
  reactionB,
}) => {
  return (
    <div className="w-full flex flex-col items-center py-6 select-none bg-slate-50/50 dark:bg-slate-950/30 rounded-xl border border-border/60 p-4">
      <svg className="w-full max-w-[300px] h-36 overflow-visible" viewBox="0 0 300 130">
        {/* UDL representation */}
        {showUdl && (
          <g className="transition-all duration-350">
            <path
              d="M 30 32 C 37 18, 43 18, 50 32 C 57 18, 63 18, 70 32 C 77 18, 83 18, 90 32 C 97 18, 103 18, 110 32 C 117 18, 123 18, 130 32 C 137 18, 143 18, 150 32 C 157 18, 163 18, 170 32 C 177 18, 183 18, 190 32 C 197 18, 203 18, 210 32 C 217 18, 223 18, 230 32 C 237 18, 243 18, 250 32 C 257 18, 263 18, 270 32"
              fill="none"
              className="stroke-rose-400/80"
              strokeWidth="2"
            />
            {/* Arrows pointing down along the span */}
            {[...Array(13)].map((_, i) => {
              const x = 30 + i * 20;
              return (
                <path
                  key={i}
                  d={`M ${x} 32 L ${x} 48 M ${x} 48 L ${x - 3} 44 M ${x} 48 L ${x + 3} 44`}
                  fill="none"
                  className="stroke-rose-400/80"
                  strokeWidth="1.5"
                />
              );
            })}
            <text x="150" y="14" textAnchor="middle" className="text-[11px] font-mono font-bold fill-rose-400">
              w (UDL)
            </text>
          </g>
        )}

        {/* Point Load */}
        {showPointLoad && (
          <g className="transition-all duration-350">
            <text x="110" y="14" textAnchor="middle" className="text-[11px] font-mono font-bold fill-amber-400">
              P (Point Load)
            </text>
            <path
              d="M 110 20 L 110 48 M 110 48 L 106 42 M 110 48 L 114 42"
              fill="none"
              className="stroke-amber-400"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </g>
        )}

        {/* Beam member */}
        <rect
          x="30"
          y="48"
          width="240"
          height="12"
          className="fill-slate-600 stroke-slate-500"
          strokeWidth="1.5"
          rx="1"
        />

        {/* Support shapes */}
        {/* Left Pin Support */}
        <path d="M 30 60 L 22 72 L 38 72 Z" className="fill-slate-500 stroke-slate-400" strokeWidth="1" />
        {/* Right Roller Support */}
        <path d="M 270 60 L 262 70 L 278 70 Z" className="fill-slate-500 stroke-slate-400" strokeWidth="1" />
        <circle cx="270" cy="72" r="2" className="fill-slate-500" />

        {/* Support reaction vectors if calculated */}
        {reactionA !== undefined && (
          <g>
            <path
              d="M 30 115 L 30 80 M 30 80 L 27 84 M 30 80 L 33 84"
              fill="none"
              className="stroke-indigo-400"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <text x="36" y="98" className="text-[11px] font-mono font-bold fill-indigo-400">
              {reactionA}
            </text>
          </g>
        )}
        {reactionB !== undefined && (
          <g>
            <path
              d="M 270 115 L 270 80 M 270 80 L 267 84 M 270 80 L 273 84"
              fill="none"
              className="stroke-indigo-400"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <text x="235" y="98" className="text-[11px] font-mono font-bold fill-indigo-400">
              {reactionB}
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};
