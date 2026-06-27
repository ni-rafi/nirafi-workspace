import React from 'react';
import { useClickStepsContext } from '@/features/presentation/context/ClickStepsContext';
import { LatexFormula } from '@/features/presentation/components/elements';

interface ISupport {
  id: string;
  type: 'hinge' | 'roller';
  position: number;
}

interface ILoad {
  id: string;
  type: 'point' | 'udl';
  position?: number;
  magnitude: number;
}

interface IBeam {
  length: number;
  supports: ISupport[];
  loads: ILoad[];
}

interface ManualPlottingVisualizerProps {
  mode: 'sfd' | 'bmd';
  beam: IBeam;
}

export const ManualPlottingVisualizer: React.FC<ManualPlottingVisualizerProps> = ({ mode, beam }) => {
  const { currentClick } = useClickStepsContext();
  const step = currentClick ?? 0;

  // Dynamic Scale: Mapping x: [0, beam.length] -> [50, 450]
  const scale = 400 / beam.length;
  const getSvgX = (coord: number) => 50 + coord * scale;

  const midX = beam.length / 2;
  const pointLoad = beam.loads.find(l => l.type === 'point');
  const loadMagnitude = pointLoad?.magnitude ?? 20;

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch select-none animate-in fade-in duration-300">
      {/* Left Column: Beam & Graph SVG */}
      <div className="lg:col-span-7 flex flex-col items-center justify-center p-3 border border-border/50 bg-muted/20 dark:bg-slate-900/10 rounded-xl min-h-[300px]">
        <svg className="w-full max-w-[480px] h-[230px] overflow-visible" viewBox="0 0 500 230">
          {/* Background Grid Pattern */}
          <rect x="10" y="10" width="480" height="210" className="fill-none stroke-slate-200/40 dark:stroke-slate-800/40" strokeWidth="0.5" />
          
          {/* ==================== 1. DYNAMIC BEAM DIAGRAM (y=40) ==================== */}
          <g>
            {/* Beam member */}
            <rect x="50" y="34" width="400" height="12" rx="2" className="fill-slate-200 dark:fill-slate-800 stroke-slate-400 dark:stroke-slate-650" strokeWidth="1.5" />
            
            {/* Supports */}
            {beam.supports.map((s, idx) => {
              const xVal = getSvgX(s.position);
              const labelLetter = idx === 0 ? 'A' : 'B';
              const reactionVal = loadMagnitude / 2; // Symmetric reaction calculation
              
              if (s.type === 'hinge') {
                return (
                  <g key={s.id}>
                    <polygon points={`${xVal - 8},61 ${xVal},46 ${xVal + 8},61`} className="fill-slate-400 dark:fill-slate-500 stroke-slate-500" strokeWidth="1" />
                    <line x1={xVal - 12} y1="61" x2={xVal + 12} y2="61" className="stroke-slate-500" strokeWidth="1.2" />
                    
                    {/* Reaction Vector & Label */}
                    <path d={`M ${xVal},98 L ${xVal},66 M ${xVal - 3.5},72 L ${xVal},66 L ${xVal + 3.5},72`} fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <foreignObject x={xVal + 8} y="68" width="60" height="20">
                      <div className="text-[9px] font-mono font-bold text-emerald-500 dark:text-emerald-400 leading-none">
                        R<sub>{labelLetter}</sub> = {reactionVal} kN
                      </div>
                    </foreignObject>
                  </g>
                );
              } else {
                return (
                  <g key={s.id}>
                    <polygon points={`${xVal - 8},57 ${xVal},46 ${xVal + 8},57`} className="fill-slate-400 dark:fill-slate-500 stroke-slate-500" strokeWidth="1" />
                    <circle cx={xVal - 4} cy="59.5" r="2" className="fill-slate-400 dark:fill-slate-500" />
                    <circle cx={xVal + 4} cy="59.5" r="2" className="fill-slate-400 dark:fill-slate-500" />
                    <line x1={xVal - 12} y1="61.5" x2={xVal + 12} y2="61.5" className="stroke-slate-500" strokeWidth="1.2" />
                    
                    {/* Reaction Vector & Label */}
                    <path d={`M ${xVal},98 L ${xVal},66 M ${xVal - 3.5},72 L ${xVal},66 L ${xVal + 3.5},72`} fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <foreignObject x={xVal - 67} y="68" width="60" height="20">
                      <div className="text-[9px] font-mono font-bold text-emerald-500 dark:text-emerald-400 leading-none text-right">
                        R<sub>{labelLetter}</sub> = {reactionVal} kN
                      </div>
                    </foreignObject>
                  </g>
                );
              }
            })}

            {/* Loads */}
            {beam.loads.map((l) => {
              const xVal = getSvgX(l.position ?? midX);
              if (l.type === 'point') {
                return (
                  <g key={l.id}>
                    <path d={`M ${xVal},2 L ${xVal},32 M ${xVal-4},26 L ${xVal},32 L ${xVal+4},26`} fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    <text x={xVal + 6} y="12" className="text-[9px] font-black fill-rose-500 font-mono">{l.id} = {l.magnitude} kN</text>
                  </g>
                );
              }
              return null;
            })}
          </g>

          {/* ==================== 2. GRAPH AXES (y=155 is baseline) ==================== */}
          {step >= 1 && (
            <g className="animate-in fade-in duration-300">
              {/* Baseline */}
              <line x1="30" y1="155" x2="470" y2="155" className="stroke-slate-400/80 dark:stroke-slate-600/80" strokeWidth="1.5" />
              {/* Vertical axis line */}
              <line x1="50" y1="105" x2="50" y2="205" className="stroke-slate-400/80 dark:stroke-slate-600/80" strokeWidth="1.5" />
              <text x="475" y="158" className="text-[9px] font-bold fill-muted-foreground font-mono">x</text>
              <text x="42" y="100" className="text-[9px] font-bold fill-muted-foreground font-mono">{mode === 'sfd' ? 'V (kN)' : 'M (kNm)'}</text>
              
              {/* x-axis tick marks dynamically generated at 2m increments */}
              {Array.from({ length: Math.floor(beam.length / 2) + 1 }, (_, i) => i * 2).map((m) => (
                <g key={`tick-${m}`}>
                  <line x1={getSvgX(m)} y1="152" x2={getSvgX(m)} y2="158" className="stroke-slate-400 dark:stroke-slate-600" strokeWidth="1" />
                  <text x={getSvgX(m)} y="167" textAnchor="middle" className="text-[8px] fill-muted-foreground font-mono font-medium">{m}m</text>
                </g>
              ))}
            </g>
          )}

          {/* ==================== 3. MANUAL PLOTTING CURVES ==================== */}
          {mode === 'sfd' && step >= 1 && (
            <g className="transition-all duration-500">
              {/* Interval 1: 0 <= x < midX (V = +10 kN -> y = 155 - 25 = 130) */}
              <line x1="50" y1="130" x2={getSvgX(midX)} y2="130" className="stroke-rose-500" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="50" y1="155" x2="50" y2="130" className="stroke-rose-500 stroke-dash-2" strokeWidth="1.5" strokeDasharray="2 2" />
              {[0, 2, 4, 6].map((m) => (
                <circle key={`pt-${m}`} cx={getSvgX(m)} cy="130" r="3.5" className="fill-rose-500 stroke-white dark:stroke-slate-900" strokeWidth="1" />
              ))}
              <circle cx={getSvgX(midX)} cy="130" r="3.5" className="fill-rose-300 stroke-rose-500" strokeWidth="1" />

              {/* Step 2: Jump at x=midX (left: 10, right: -10) */}
              {step >= 2 && (
                <line x1={getSvgX(midX)} y1="130" x2={getSvgX(midX)} y2="180" className="stroke-rose-500 animate-in fade-in duration-300" strokeWidth="2.5" strokeDasharray="3 3" />
              )}

              {/* Step 3: Interval 2: midX < x <= beam.length (V = -10 kN -> y = 155 + 25 = 180) */}
              {step >= 3 && (
                <g className="animate-in fade-in duration-500">
                  <line x1={getSvgX(midX)} y1="180" x2={getSvgX(beam.length)} y2="180" className="stroke-rose-500" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1={getSvgX(beam.length)} y1="180" x2={getSvgX(beam.length)} y2="155" className="stroke-rose-500 stroke-dash-2" strokeWidth="1.5" strokeDasharray="2 2" />
                  <circle cx={getSvgX(midX)} cy="180" r="3.5" className="fill-rose-300 stroke-rose-500" strokeWidth="1" />
                  {[10, 12, 14, 16].map((m) => (
                    <circle key={`pt-${m}`} cx={getSvgX(m)} cy="180" r="3.5" className="fill-rose-500 stroke-white dark:stroke-slate-900" strokeWidth="1" />
                  ))}
                </g>
              )}
            </g>
          )}

          {mode === 'bmd' && step >= 1 && (
            <g className="transition-all duration-500">
              {/* Interval 1: 0 <= x <= midX (M = 10x, maximum at x=midX is 80 -> y = 155 - 45 = 110) */}
              <line x1="50" y1="155" x2={getSvgX(midX)} y2="110" className="stroke-indigo-500" strokeWidth="2.5" strokeLinecap="round" />
              {[0, 2, 4, 6].map((m) => {
                const momentVal = 10 * m;
                const yVal = 155 - (momentVal * 45) / 80;
                return (
                  <circle key={`pt-${m}`} cx={getSvgX(m)} cy={yVal} r="3.5" className="fill-indigo-500 stroke-white dark:stroke-slate-900" strokeWidth="1" />
                );
              })}
              <circle cx={getSvgX(midX)} cy="110" r="3.5" className="fill-indigo-300 stroke-indigo-500" strokeWidth="1" />

              {/* Step 2: Interval 2: midX <= x <= beam.length (M = 160 - 10x, back to 0 at x=beam.length) */}
              {step >= 2 && (
                <g className="animate-in fade-in duration-500">
                  <line x1={getSvgX(midX)} y1="110" x2={getSvgX(beam.length)} y2="155" className="stroke-indigo-500" strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx={getSvgX(midX)} cy="110" r="3.5" className="fill-indigo-500 stroke-white dark:stroke-slate-900" strokeWidth="1" />
                  {[10, 12, 14, 16].map((m) => {
                    const momentVal = 160 - 10 * m;
                    const yVal = 155 - (momentVal * 45) / 80;
                    return (
                      <circle key={`pt-${m}`} cx={getSvgX(m)} cy={yVal} r="3.5" className="fill-indigo-500 stroke-white dark:stroke-slate-900" strokeWidth="1" />
                    );
                  })}
                </g>
              )}
            </g>
          )}
        </svg>
      </div>

      {/* Right Column: Coordinate Tables */}
      <div className="lg:col-span-5 flex flex-col justify-start text-left gap-2.5">
        <div>
          <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest block mb-0.5">
            {mode === 'sfd' ? 'Shear Force Tabulation' : 'Bending Moment Tabulation'}
          </span>
          <h4 className="text-xs font-bold text-foreground mb-1">
            {mode === 'sfd' ? 'Plotting V(x) Segment Values' : 'Plotting M(x) Segment Values'}
          </h4>
        </div>

        {/* Dynamic Segment Formulas */}
        <div className="grid grid-cols-2 gap-2 text-[10px]">
          <div className={`p-2 rounded-lg border ${step >= 1 ? 'border-emerald-500/25 bg-emerald-500/[0.02]' : 'border-border/30 opacity-40'}`}>
            <span className="font-bold text-foreground block">Interval 1 (0 &le; x &le; {midX}m)</span>
            <div className="font-mono mt-0.5 text-emerald-600 dark:text-emerald-400">
              {mode === 'sfd' ? <LatexFormula math="V(x) = 10\text{ kN}" /> : <LatexFormula math="M(x) = 10x\text{ kNm}" />}
            </div>
          </div>
          <div className={`p-2 rounded-lg border ${
            (mode === 'sfd' && step >= 3) || (mode === 'bmd' && step >= 2)
              ? 'border-indigo-500/25 bg-indigo-500/[0.02]' 
              : 'border-border/30 opacity-40'
          }`}>
            <span className="font-bold text-foreground block">Interval 2 ({midX}m &le; x &le; {beam.length}m)</span>
            <div className="font-mono mt-0.5 text-indigo-600 dark:text-indigo-400">
              {mode === 'sfd' ? <LatexFormula math="V(x) = -10\text{ kN}" /> : <LatexFormula math="M(x) = 160 - 10x" />}
            </div>
          </div>
        </div>

        {/* Data Tables Wrapper */}
        {step >= 1 && (
          <div className="grid grid-cols-2 gap-3 animate-in fade-in duration-300">
            {/* Table 1: Left */}
            <div className="border border-border/50 rounded-lg overflow-hidden bg-background/50">
              <table className="w-full text-left border-collapse text-[9.5px]">
                <thead>
                  <tr className="bg-muted/40 border-b border-border/40 text-muted-foreground font-bold uppercase tracking-wider">
                    <th className="px-2.5 py-1 w-12">x (m)</th>
                    <th className="px-2.5 py-1 text-right">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {mode === 'sfd' ? (
                    <>
                      {[0, 2, 4, 6].map((m) => (
                        <tr key={`r-${m}`} className="border-b border-border/10 hover:bg-muted/10">
                          <td className="px-2.5 py-0.5 font-mono">{m}.0</td>
                          <td className="px-2.5 py-0.5 text-right font-bold text-rose-500">+10.0 kN</td>
                        </tr>
                      ))}
                      <tr className="hover:bg-muted/10">
                        <td className="px-2.5 py-0.5 font-mono">{midX}.0 (L)</td>
                        <td className="px-2.5 py-0.5 text-right font-bold text-rose-500">+10.0 kN</td>
                      </tr>
                    </>
                  ) : (
                    <>
                      {[0, 2, 4, 6, 8].map((m) => (
                        <tr key={`r-${m}`} className="border-b border-border/10 hover:bg-muted/10">
                          <td className="px-2.5 py-0.5 font-mono">{m}.0</td>
                          <td className="px-2.5 py-0.5 text-right font-bold text-indigo-500">{10 * m}.0 kNm</td>
                        </tr>
                      ))}
                    </>
                  )}
                </tbody>
              </table>
            </div>

            {/* Table 2: Right */}
            <div className="border border-border/50 rounded-lg overflow-hidden bg-background/50">
              <table className="w-full text-left border-collapse text-[9.5px]">
                <thead>
                  <tr className="bg-muted/40 border-b border-border/40 text-muted-foreground font-bold uppercase tracking-wider">
                    <th className="px-2.5 py-1 w-12">x (m)</th>
                    <th className="px-2.5 py-1 text-right">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {mode === 'sfd' ? (
                    <>
                      <tr className={`border-b border-border/10 hover:bg-muted/10 ${step >= 2 ? '' : 'opacity-20'}`}>
                        <td className="px-2.5 py-0.5 font-mono">{midX}.0 (R)</td>
                        <td className="px-2.5 py-0.5 text-right font-bold text-rose-500">{step >= 2 ? '-10.0 kN' : '—'}</td>
                      </tr>
                      {[10, 12, 14, 16].map((m) => (
                        <tr key={`r-${m}`} className={`border-b border-border/10 hover:bg-muted/10 ${step >= 3 ? '' : 'opacity-20'}`}>
                          <td className="px-2.5 py-0.5 font-mono">{m}.0</td>
                          <td className="px-2.5 py-0.5 text-right font-bold text-rose-500">{step >= 3 ? '-10.0 kN' : '—'}</td>
                        </tr>
                      ))}
                    </>
                  ) : (
                    <>
                      {[8, 10, 12, 14, 16].map((m) => (
                        <tr key={`r-${m}`} className={`border-b border-border/10 hover:bg-muted/10 ${step >= 2 ? '' : 'opacity-20'}`}>
                          <td className="px-2.5 py-0.5 font-mono">{m}.0</td>
                          <td className="px-2.5 py-0.5 text-right font-bold text-indigo-500">{step >= 2 ? `${160 - 10 * m}.0 kNm` : '—'}</td>
                        </tr>
                      ))}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {mode === 'sfd' && step >= 1 && (
          <div className={`p-2 border border-amber-500/20 bg-amber-500/[0.02] dark:bg-amber-950/[0.02] rounded-lg text-[9px] text-muted-foreground leading-normal mt-0.5 transition-opacity duration-300 ${step >= 2 ? 'opacity-100' : 'opacity-30'}`}>
            <span className="font-bold text-amber-600 dark:text-amber-400 block mb-0.5">Midpoint Point Load Jump (x = {midX}.0 m)</span>
            Concentrated load {pointLoad?.id ?? 'P'} = {loadMagnitude} kN causes a vertical step drop of {loadMagnitude} kN in shear (from +10 kN to -10 kN).
          </div>
        )}
      </div>
    </div>
  );
};

export default ManualPlottingVisualizer;
