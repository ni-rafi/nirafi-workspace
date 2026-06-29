import React from 'react';

interface LoadDiagramDrawingProps {
  loadCase: 'intro' | 'point-load' | 'udl' | 'moment' | 'all';
}

export const LoadDiagramDrawing: React.FC<LoadDiagramDrawingProps> = ({ loadCase }) => {
  const nodeAX = 60;
  const nodeBX = 360;
  const midX = 210;

  const yLoad = 50;
  const ySFD = 135;
  const yBMD = 220;

  // Support rendering helpers
  const renderSupports = (yPos: number) => (
    <g>
      {/* Pin A */}
      <polygon
        points={`${nodeAX - 5},${yPos + 9} ${nodeAX},${yPos} ${nodeAX + 5},${yPos + 9}`}
        className="fill-slate-400 dark:fill-slate-500 stroke-slate-500"
        strokeWidth="0.8"
      />
      <line x1={nodeAX - 8} y1={yPos + 9} x2={nodeAX + 8} y2={yPos + 9} className="stroke-slate-500" strokeWidth="1" />
      {/* Roller B */}
      <polygon
        points={`${nodeBX - 5},${yPos + 8} ${nodeBX},${yPos} ${nodeBX + 5},${yPos + 8}`}
        className="fill-slate-400 dark:fill-slate-500 stroke-slate-500"
        strokeWidth="0.8"
      />
      <circle cx={nodeBX} cy={yPos + 9.5} r={1.5} className="fill-slate-400 dark:fill-slate-500 stroke-slate-500" strokeWidth="0.5" />
      <line x1={nodeBX - 8} y1={yPos + 11} x2={nodeBX + 8} y2={yPos + 11} className="stroke-slate-500" strokeWidth="1" />
    </g>
  );

  return (
    <div className="w-full h-full flex flex-col items-center justify-center select-none">
      <svg className="w-full max-w-full h-full overflow-visible text-[10px] font-sans" viewBox="30 0 360 280">
        
        {/* Layer 1: LOAD DIAGRAM */}
        <g>
          <text x="30" y="24" className="font-black fill-slate-500 tracking-wider text-[9px] uppercase">1. Load Diagram</text>
          <line x1="30" y1={yLoad} x2="390" y2={yLoad} className="stroke-slate-350 dark:stroke-slate-700/60" strokeWidth="1" strokeDasharray="3 3" />
          <line x1={nodeAX} y1={yLoad} x2={nodeBX} y2={yLoad} className="stroke-slate-750 dark:stroke-slate-200" strokeWidth="3" strokeLinecap="round" />
          {renderSupports(yLoad)}

          {/* Intro Case: Point Load + UDL */}
          {loadCase === 'intro' && (
            <g className="animate-in fade-in duration-200">
              {/* Point load */}
              <path d={`M ${midX},15 L ${midX},${yLoad - 2}`} fill="none" stroke="#ef4444" strokeWidth="2.5" />
              <path d={`M ${midX - 4},${yLoad - 7} L ${midX},${yLoad - 2} L ${midX + 4},${yLoad - 7}`} fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
              <text x={midX + 6} y="26" className="fill-rose-500 font-bold font-mono">P</text>

              {/* UDL */}
              <path d={`M ${nodeAX},${yLoad - 15} Q ${nodeAX + 30},${yLoad - 22} ${nodeAX + 60},${yLoad - 15} Q ${nodeAX + 90},${yLoad - 22} ${midX},${yLoad - 15}`} fill="none" stroke="#f59e0b" strokeWidth="1.2" strokeDasharray="2 2" />
              <text x={nodeAX + 30} y={yLoad - 22} className="fill-amber-500 font-bold font-mono text-[9px]">w</text>
            </g>
          )}

          {/* Point Load Case */}
          {loadCase === 'point-load' && (
            <g className="animate-in fade-in duration-200">
              {/* Point load arrow */}
              <path d={`M ${midX},12 L ${midX},${yLoad - 2}`} fill="none" stroke="#ef4444" strokeWidth="3" />
              <path d={`M ${midX - 5},${yLoad - 8} L ${midX},${yLoad - 2} L ${midX + 5},${yLoad - 8}`} fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
              <text x={midX + 8} y="22" className="fill-rose-500 font-bold font-mono text-[10px]">P</text>
            </g>
          )}

          {/* UDL Case */}
          {loadCase === 'udl' && (
            <g className="animate-in fade-in duration-200">
              {/* Distributed load box/arrows */}
              <path
                d={`M ${nodeAX},${yLoad - 18} L ${nodeBX},${yLoad - 18}`}
                fill="none"
                stroke="#f59e0b"
                strokeWidth="1.5"
              />
              {/* Repeated small arrows downward */}
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => {
                const x = nodeAX + (i * (nodeBX - nodeAX)) / 10;
                return (
                  <g key={`udl-arr-${i}`}>
                    <line x1={x} y1={yLoad - 18} x2={x} y2={yLoad - 2} className="stroke-amber-500" strokeWidth="1" />
                    <path d={`M ${x - 2.5},${yLoad - 5} L ${x},${yLoad - 2} L ${x + 2.5},${yLoad - 5}`} fill="none" className="stroke-amber-500" strokeWidth="0.8" />
                  </g>
                );
              })}
              <text x={midX} y={yLoad - 24} textAnchor="middle" className="fill-amber-500 font-bold font-mono text-[10px]">
                w (kN/m)
              </text>
            </g>
          )}

          {/* Moment Case */}
          {loadCase === 'moment' && (
            <g className="animate-in fade-in duration-200">
              {/* Clockwise Moment Arc */}
              <path
                d={`M ${midX - 14},${yLoad} A 14,14 0 1,1 ${midX},${yLoad - 14}`}
                fill="none"
                stroke="#6366f1"
                strokeWidth="2.5"
              />
              <path
                d={`M ${midX - 5},${yLoad - 18} L ${midX},${yLoad - 14} L ${midX - 4},${yLoad - 10}`}
                fill="none"
                stroke="#6366f1"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <text x={midX + 14} y={yLoad - 12} className="fill-indigo-500 font-bold font-mono text-[10px]">
                M₀
              </text>
            </g>
          )}

          {/* All Combined / Reconstruction Case */}
          {loadCase === 'all' && (
            <g className="animate-in fade-in duration-200">
              {/* Point load */}
              <path d={`M 150,15 L 150,${yLoad - 2}`} fill="none" stroke="#ef4444" strokeWidth="2" />
              <path d={`M 147,${yLoad - 6} L 150,${yLoad - 2} L 153,${yLoad - 6}`} fill="none" stroke="#ef4444" strokeWidth="1.5" />
              <text x="150" y="11" textAnchor="middle" className="fill-rose-500 font-bold font-mono text-[8px]">P</text>

              {/* UDL */}
              <path d={`M 220,${yLoad - 12} L 320,${yLoad - 12}`} fill="none" stroke="#f59e0b" strokeWidth="1" />
              {[0, 1, 2, 3, 4].map(i => (
                <line key={`all-udl-${i}`} x1={220 + i*25} y1={yLoad - 12} x2={220 + i*25} y2={yLoad - 2} className="stroke-amber-500" strokeWidth="0.8" />
              ))}
              <text x="270" y={yLoad - 16} textAnchor="middle" className="fill-amber-500 font-bold font-mono text-[8px]">w</text>
            </g>
          )}
        </g>

        {/* Layer 2: SHEAR FORCE DIAGRAM (SFD) */}
        <g>
          <text x="30" y={ySFD - 20} className="font-black fill-slate-500 tracking-wider text-[9px] uppercase">2. Shear Force Diagram (SFD)</text>
          <line x1="30" y1={ySFD} x2="390" y2={ySFD} className="stroke-slate-300 dark:stroke-slate-700" strokeWidth="1.2" />
          
          {/* Point Load Case SFD */}
          {loadCase === 'point-load' && (
            <g className="animate-in fade-in duration-200">
              <path d={`M ${nodeAX},${ySFD} L ${nodeAX},${ySFD - 18} L ${midX},${ySFD - 18} L ${midX},${ySFD + 18} L ${nodeBX},${ySFD + 18} L ${nodeBX},${ySFD}`} fill="none" stroke="#ef4444" strokeWidth="2.2" />
              {/* Highlight the jump */}
              <line x1={midX} y1={ySFD - 18} x2={midX} y2={ySFD + 18} className="stroke-rose-500" strokeWidth="2" strokeDasharray="2 2" />
              <text x={midX + 6} y={ySFD + 4} className="fill-rose-500 font-bold font-mono text-[8.5px]">Jump ΔV = P</text>
            </g>
          )}

          {/* UDL Case SFD */}
          {loadCase === 'udl' && (
            <g className="animate-in fade-in duration-200">
              <path d={`M ${nodeAX},${ySFD} L ${nodeAX},${ySFD - 22} L ${nodeBX},${ySFD + 22} L ${nodeBX},${ySFD}`} fill="none" stroke="#f59e0b" strokeWidth="2.2" />
              {/* Annotation */}
              <text x={midX + 16} y={ySFD - 12} className="fill-amber-600 dark:fill-amber-400 font-bold font-mono text-[8.5px]">Slope = -w</text>
            </g>
          )}

          {/* Moment Case SFD */}
          {loadCase === 'moment' && (
            <g className="animate-in fade-in duration-200">
              {/* Small constant negative shear */}
              <path d={`M ${nodeAX},${ySFD} L ${nodeAX},${ySFD + 8} L ${nodeBX},${ySFD + 8} L ${nodeBX},${ySFD}`} fill="none" stroke="#6366f1" strokeWidth="2.2" />
              <text x={midX} y={ySFD + 20} textAnchor="middle" className="fill-indigo-500 font-bold font-mono text-[8.5px]">Constant shear (No jump: ΔV = 0)</text>
            </g>
          )}

          {/* Intro Case SFD */}
          {loadCase === 'intro' && (
            <path d={`M ${nodeAX},${ySFD} L ${nodeAX},${ySFD - 14} Q ${midX},${ySFD - 20} ${midX},${ySFD + 14} L ${nodeBX},${ySFD + 14} L ${nodeBX},${ySFD}`} fill="none" stroke="#94a3b8" strokeWidth="1.5" />
          )}

          {/* All Case SFD */}
          {loadCase === 'all' && (
            <path d={`M ${nodeAX},${ySFD} L ${nodeAX},${ySFD - 15} L 150,${ySFD - 15} L 150,${ySFD + 5} L 220,${ySFD + 5} L 320,${ySFD + 20} L 320,${ySFD} Z`} fill="none" stroke="#94a3b8" strokeWidth="1.5" />
          )}
        </g>

        {/* Layer 3: BENDING MOMENT DIAGRAM (BMD) */}
        <g>
          <text x="30" y={yBMD - 20} className="font-black fill-slate-500 tracking-wider text-[9px] uppercase">3. Bending Moment Diagram (BMD)</text>
          <line x1="30" y1={yBMD} x2="390" y2={yBMD} className="stroke-slate-300 dark:stroke-slate-700" strokeWidth="1.2" />

          {/* Point Load Case BMD */}
          {loadCase === 'point-load' && (
            <g className="animate-in fade-in duration-200">
              <path d={`M ${nodeAX},${yBMD} L ${midX},${yBMD + 24} L ${nodeBX},${yBMD}`} fill="none" stroke="#ef4444" strokeWidth="2.2" />
              {/* Highlight slope change */}
              <text x={midX} y={yBMD + 36} textAnchor="middle" className="fill-rose-500 font-bold font-mono text-[8.5px]">Slope change (Discontinuity)</text>
            </g>
          )}

          {/* UDL Case BMD */}
          {loadCase === 'udl' && (
            <g className="animate-in fade-in duration-200">
              {/* Parabolic curve */}
              <path d={`M ${nodeAX},${yBMD} Q ${midX},${yBMD + 38} ${nodeBX},${yBMD}`} fill="none" stroke="#f59e0b" strokeWidth="2.2" />
              <text x={midX} y={yBMD + 35} textAnchor="middle" className="fill-amber-600 dark:fill-amber-400 font-bold font-mono text-[8.5px]">Parabolic curve (d²M/dx² = -w)</text>
            </g>
          )}

          {/* Moment Case BMD */}
          {loadCase === 'moment' && (
            <g className="animate-in fade-in duration-200">
              {/* Abrupt vertical jump */}
              <path d={`M ${nodeAX},${yBMD} L ${midX},${yBMD - 18} L ${midX},${yBMD + 18} L ${nodeBX},${yBMD}`} fill="none" stroke="#6366f1" strokeWidth="2.2" />
              <line x1={midX} y1={yBMD - 18} x2={midX} y2={yBMD + 18} className="stroke-indigo-500" strokeWidth="2" strokeDasharray="2 2" />
              <text x={midX + 6} y={yBMD + 4} className="fill-indigo-500 font-bold font-mono text-[8.5px]">Jump ΔM = -M₀</text>
            </g>
          )}

          {/* Intro Case BMD */}
          {loadCase === 'intro' && (
            <path d={`M ${nodeAX},${yBMD} Q ${midX},${yBMD + 30} ${nodeBX},${yBMD}`} fill="none" stroke="#94a3b8" strokeWidth="1.5" />
          )}

          {/* All Case BMD */}
          {loadCase === 'all' && (
            <path d={`M ${nodeAX},${yBMD} L 150,${yBMD + 15} L 220,${yBMD + 5} Q 270,${yBMD + 25} 320,${yBMD} Z`} fill="none" stroke="#94a3b8" strokeWidth="1.5" />
          )}
        </g>
      </svg>
    </div>
  );
};

export default LoadDiagramDrawing;
