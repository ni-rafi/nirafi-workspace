import React from 'react';
import { useUrlSyncedState } from '@/features/presentation/hooks/useUrlSyncedState';
import { ExpandableDrawing } from '@/shared/components';

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
      <div className="flex gap-1.5 bg-muted/30 p-1 rounded-lg border border-border/40 w-full">
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

      <div className="w-full flex justify-center items-center h-[180px]">
        <ExpandableDrawing title="Multi-Span SFD, BMD & Deflection Curves" description="Visualizes continuous load demands, shear envelope transitions, and elastic curvature deformations.">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-[280px] h-[150px] overflow-visible">
            {/* Beam lines & supports */}
            <line x1={scaleX(0)} y1={50} x2={scaleX(16)} y2={50} stroke="var(--foreground)" strokeWidth={2} />
            
            {/* Support A (Pin) at x = 0 */}
            <polygon points={`${scaleX(0)},50 ${scaleX(0)-4},56 ${scaleX(0)+4},56`} fill="var(--foreground)" />
            <text x={scaleX(0)} y={65} textAnchor="middle" className="fill-muted-foreground text-[8px] font-bold">A</text>
            
            {/* Support B (Roller) at x = 12 */}
            <circle cx={scaleX(12)} cy={53} r={3} fill="none" stroke="var(--foreground)" strokeWidth={1.5} />
            <line x1={scaleX(12)-5} y1={56} x2={scaleX(12)+5} y2={56} stroke="var(--foreground)" strokeWidth={1} />
            <text x={scaleX(12)} y={68} textAnchor="middle" className="fill-muted-foreground text-[8px] font-bold">B</text>

            {/* Overhang beam labeling */}
            <text x={scaleX(16)} y={65} textAnchor="middle" className="fill-muted-foreground text-[8px] font-bold">C</text>

            {/* UDL w = 2.5 k/ft over span AB */}
            <path
              d={`M ${scaleX(0)} 35 
                 Q ${scaleX(3)} 25 ${scaleX(6)} 35 
                 Q ${scaleX(9)} 25 ${scaleX(12)} 35`}
              fill="none"
              stroke="var(--foreground)"
              strokeWidth={1}
            />
            <text x={scaleX(6)} y={22} textAnchor="middle" className="fill-foreground text-[8px] font-bold font-mono">w = 2.5 k/ft</text>

            {/* Point load P = 12k at overhang tip C */}
            <line x1={scaleX(16)} y1={10} x2={scaleX(16)} y2={46} stroke="var(--primary)" strokeWidth={1.5} markerEnd="url(#arrow)" />
            <text x={scaleX(16)} y={5} textAnchor="middle" className="fill-primary text-[8px] font-bold font-mono">P = 12 kips</text>

            {view === 'bmd' && (
              <g transform="translate(0, 110)">
                {/* Baseline */}
                <line x1={scaleX(0)} y1={20} x2={scaleX(16)} y2={20} stroke="var(--border)" strokeWidth={0.8} strokeDasharray="2,2" />
                {/* Moment Curve */}
                <path
                  d={`M ${scaleX(0)} 20 
                     Q ${scaleX(6)} -5 ${scaleX(12)} 68 
                     L ${scaleX(16)} 20`}
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth={1.5}
                />
                <text x={scaleX(6)} y={3} textAnchor="middle" className="fill-foreground text-[7px] font-mono font-bold">M_max = 24.2 kip-ft</text>
                <text x={scaleX(12)} y={80} textAnchor="middle" className="fill-foreground text-[7px] font-mono font-bold">M_support = -48.0</text>
                <text x={width/2} y={64} textAnchor="middle" className="fill-muted-foreground text-[8px] font-bold uppercase">Bending Moment Diagram (BMD)</text>
              </g>
            )}

            {view === 'sfd' && (
              <g transform="translate(0, 110)">
                {/* Baseline */}
                <line x1={scaleX(0)} y1={20} x2={scaleX(16)} y2={20} stroke="var(--border)" strokeWidth={0.8} strokeDasharray="2,2" />
                {/* SFD blocks */}
                <path
                  d={`M ${scaleX(0)} 20 
                     L ${scaleX(0)} 8 
                     L ${scaleX(12)} 42 
                     L ${scaleX(12)} -15 
                     L ${scaleX(16)} -15 
                     L ${scaleX(16)} 20`}
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth={1.5}
                />
                <text x={scaleX(1)} y={3} className="fill-foreground text-[7px] font-mono font-bold">V_A = 11.0k</text>
                <text x={scaleX(11)} y={52} textAnchor="end" className="fill-foreground text-[7px] font-mono font-bold">V_B- = -19.0k</text>
                <text x={scaleX(12)+4} y={-19} className="fill-foreground text-[7px] font-mono font-bold">V_B+ = 12.0k</text>
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
        </ExpandableDrawing>
      </div>
    </div>
  );
};
export default MultiSpanBMD;
