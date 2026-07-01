import React from 'react';
import { useUrlSyncedState } from '@/features/presentation/hooks/useUrlSyncedState';

export const MultiSpanBMD: React.FC = () => {
  const [view, setView] = useUrlSyncedState<'bmd' | 'sfd' | 'elastic'>('multi_view', 'bmd');

  const width = 320;
  const height = 180;
  const paddingX = 25;
  const plotW = width - paddingX * 2; // 270px
  const scaleX = (x_ft: number) => paddingX + (x_ft / 16.0) * plotW;

  return (
    <div className="flex flex-col items-center justify-between h-full w-full gap-3 select-none">
      {/* View Toggle tabs */}
      <div className="flex gap-1.5 bg-slate-900/60 p-1 rounded-lg border border-border/40 w-full">
        {(['bmd', 'sfd', 'elastic'] as const).map((v) => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={`flex-1 py-1 px-2 text-[9px] font-bold rounded transition-all cursor-pointer uppercase ${
              view === v
                ? 'bg-indigo-500 text-white shadow-sm'
                : 'bg-background hover:bg-muted text-muted-foreground'
            }`}
          >
            {v === 'bmd' && 'Bending Moment'}
            {v === 'sfd' && 'Shear Force'}
            {v === 'elastic' && 'Elastic Curve'}
          </button>
        ))}
      </div>

      <div className="bg-slate-950/20 border border-border/30 rounded-xl p-3 w-full flex justify-center items-center h-[180px]">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
          {/* Beam lines & supports */}
          <line x1={scaleX(0)} y1={50} x2={scaleX(16)} y2={50} stroke="var(--foreground)" strokeWidth={2} />
          
          {/* Support A (Pin) at x = 0 */}
          <polygon points={`${scaleX(0)},50 ${scaleX(0)-4},56 ${scaleX(0)+4},56`} fill="var(--foreground)" />
          <text x={scaleX(0)} y={65} textAnchor="middle" className="fill-muted-foreground text-[8px] font-bold">A</text>
          
          {/* Support B (Roller) at x = 12 */}
          <circle cx={scaleX(12)} cy={53} r={3} fill="none" stroke="var(--foreground)" strokeWidth={1.5} />
          <line x1={scaleX(12)-5} y1={56} x2={scaleX(12)+5} y2={56} stroke="var(--foreground)" strokeWidth={1} />
          <text x={scaleX(12)} y={65} textAnchor="middle" className="fill-muted-foreground text-[8px] font-bold">B</text>

          {/* Overhang C at x = 16 */}
          <text x={scaleX(16)} y={65} textAnchor="middle" className="fill-muted-foreground text-[8px] font-bold">C (Overhang)</text>

          {/* UDL label */}
          <text x={scaleX(8)} y={42} textAnchor="middle" className="fill-indigo-400 text-[7px] font-bold font-mono">w = 1.5 kips/ft</text>

          {/* Concentrated Load at x = 6 (20 kips) */}
          <g>
            <path d={`M ${scaleX(6)} 15 L ${scaleX(6)} 45`} stroke="var(--primary)" strokeWidth={1.5} markerEnd="url(#arrow)" />
            <text x={scaleX(6)} y={12} textAnchor="middle" className="fill-primary text-[7px] font-bold font-mono">20 kips</text>
          </g>

          {/* Concentrated Load at end x = 16 (12 kips) */}
          <g>
            <path d={`M ${scaleX(16)} 15 L ${scaleX(16)} 45`} stroke="var(--primary)" strokeWidth={1.5} markerEnd="url(#arrow)" />
            <text x={scaleX(16)} y={12} textAnchor="middle" className="fill-primary text-[7px] font-bold font-mono">12 kips</text>
          </g>

          {/* Render Active View Diagram */}
          {view === 'bmd' && (
            <g transform="translate(0, 110)">
              {/* Baseline */}
              <line x1={scaleX(0)} y1={20} x2={scaleX(16)} y2={20} stroke="var(--border)" strokeWidth={0.8} />
              {/* BMD Path */}
              {/* M(0) = 0, M(6) = 108, M(12) = -48, M(16) = 0 */}
              {/* Curve from 0 to 6 is a parabola peaking at 108 */}
              {/* Curve from 6 to 12 is a parabola passing through 92 and dropping to -48 */}
              {/* Curve from 12 to 16 is a parabola peaking towards 0 */}
              <path
                d={`M ${scaleX(0)} 20 
                   Q ${scaleX(3.5)} -20 ${scaleX(6)} -25 
                   Q ${scaleX(9.5)} 0 ${scaleX(12)} 40 
                   Q ${scaleX(14)} 30 ${scaleX(16)} 20`}
                fill="none"
                stroke="var(--emerald-500)"
                strokeWidth={1.5}
              />
              {/* Labels */}
              <text x={scaleX(6)} y={-30} textAnchor="middle" className="fill-emerald-500 text-[8px] font-bold font-mono">+108 k·ft</text>
              <text x={scaleX(12)} y={52} textAnchor="middle" className="fill-emerald-500 text-[8px] font-bold font-mono">-48 k·ft</text>
              <text x={width/2} y={64} textAnchor="middle" className="fill-muted-foreground text-[8px] font-bold uppercase">Bending Moment Diagram (BMD)</text>
            </g>
          )}

          {view === 'sfd' && (
            <g transform="translate(0, 110)">
              {/* Baseline */}
              <line x1={scaleX(0)} y1={20} x2={scaleX(16)} y2={20} stroke="var(--border)" strokeWidth={0.8} />
              {/* SFD Path */}
              <path
                d={`M ${scaleX(0)} 20 
                   L ${scaleX(0)} -2 
                   L ${scaleX(6)} 12
                   L ${scaleX(6)} 40
                   L ${scaleX(12)} 55
                   L ${scaleX(12)} 0
                   L ${scaleX(16)} 20 Z`}
                fill="rgba(99, 102, 241, 0.1)"
                stroke="var(--primary)"
                strokeWidth={1.5}
              />
              <text x={width/2} y={64} textAnchor="middle" className="fill-muted-foreground text-[8px] font-bold uppercase">Shear Force Diagram (SFD)</text>
            </g>
          )}

          {view === 'elastic' && (
            <g transform="translate(0, 110)">
              {/* Baseline */}
              <line x1={scaleX(0)} y1={20} x2={scaleX(16)} y2={20} stroke="var(--border)" strokeWidth={0.8} strokeDasharray="2,2" />
              {/* Elastic curve deformation */}
              <path
                d={`M ${scaleX(0)} 20 
                   Q ${scaleX(6)} 28 ${scaleX(12)} 20 
                   Q ${scaleX(14)} 10 ${scaleX(16)} 8`}
                fill="none"
                stroke="var(--amber-500)"
                strokeWidth={1.5}
              />
              <text x={width/2} y={64} textAnchor="middle" className="fill-muted-foreground text-[8px] font-bold uppercase">Deformed Elastic Curve</text>
            </g>
          )}

          {/* Definitions for arrow markers */}
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--primary)" />
            </marker>
          </defs>
        </svg>
      </div>
    </div>
  );
};
export default MultiSpanBMD;
