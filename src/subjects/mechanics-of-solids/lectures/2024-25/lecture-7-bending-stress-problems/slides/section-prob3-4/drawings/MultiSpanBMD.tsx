import React from 'react';
import { ExpandableDrawing } from '@/shared/components';

export const MultiSpanBMD: React.FC = () => {
  const width = 320;
  const height = 180;
  const paddingX = 30;
  const plotW = width - paddingX * 2; // 260px
  const scaleX = (x_ft: number) => paddingX + (x_ft / 16.0) * plotW;

  return (
    <div className="w-full flex justify-center items-center h-[180px]">
      <ExpandableDrawing title="Multi-Span Loading Configuration" description="Continuous beam showing support configurations, span dimensions, point loads, and UDL.">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-[280px] h-[150px] overflow-visible">
          {/* Beam lines & supports */}
          <line x1={scaleX(0)} y1={80} x2={scaleX(16)} y2={80} stroke="var(--foreground)" strokeWidth={3} />
          
          {/* Support A (Pin) at x = 0 */}
          <polygon points={`${scaleX(0)},80 ${scaleX(0)-6},88 ${scaleX(0)+6},88`} fill="var(--foreground)" />
          <text x={scaleX(0)} y={104} textAnchor="middle" className="fill-muted-foreground text-[12px] font-bold">A</text>
          
          {/* Support B (Roller) at x = 12 */}
          <circle cx={scaleX(12)} cy={84} r={3.5} fill="none" stroke="var(--foreground)" strokeWidth={1.8} />
          <line x1={scaleX(12)-7} y1={88} x2={scaleX(12)+7} y2={88} stroke="var(--foreground)" strokeWidth={1.2} />
          <text x={scaleX(12)} y={106} textAnchor="middle" className="fill-muted-foreground text-[12px] font-bold">B</text>

          {/* Overhang beam labeling */}
          <text x={scaleX(16)} y={102} textAnchor="middle" className="fill-muted-foreground text-[12px] font-bold">C</text>

          {/* UDL w = 1.5 k/ft over span AC (entire 16 ft length) */}
          <path
            d={`M ${scaleX(0)} 62 
               Q ${scaleX(2)} 50 ${scaleX(4)} 62 
               Q ${scaleX(6)} 50 ${scaleX(8)} 62 
               Q ${scaleX(10)} 50 ${scaleX(12)} 62
               Q ${scaleX(14)} 50 ${scaleX(16)} 62`}
            fill="none"
            stroke="var(--foreground)"
            strokeWidth={1.2}
            opacity={0.6}
          />
          <text x={scaleX(8)} y={42} textAnchor="middle" className="fill-foreground text-[11px] font-bold font-mono">w = 1.5 kips/ft</text>

          {/* Point load P = 20k at midspan x = 6 */}
          <line x1={scaleX(6)} y1={25} x2={scaleX(6)} y2={76} stroke="var(--primary)" strokeWidth={2} />
          <polygon points={`${scaleX(6)-4},70 ${scaleX(6)+4},70 ${scaleX(6)},76`} fill="var(--primary)" />
          <text x={scaleX(6)} y={16} textAnchor="middle" className="fill-primary text-[11px] font-bold font-mono">P = 20 kips</text>

          {/* Point load P = 12k at overhang tip C */}
          <line x1={scaleX(16)} y1={25} x2={scaleX(16)} y2={76} stroke="var(--primary)" strokeWidth={2} />
          <polygon points={`${scaleX(16)-4},70 ${scaleX(16)+4},70 ${scaleX(16)},76`} fill="var(--primary)" />
          <text x={scaleX(16)} y={16} textAnchor="middle" className="fill-primary text-[11px] font-bold font-mono">P_tip = 12 k</text>

          {/* Span Dimension Lines */}
          <line x1={scaleX(0)} y1={130} x2={scaleX(12)} y2={130} stroke="var(--muted-foreground)" strokeWidth={1} />
          <line x1={scaleX(0)} y1={125} x2={scaleX(0)} y2={135} stroke="var(--muted-foreground)" strokeWidth={1} />
          <line x1={scaleX(12)} y1={125} x2={scaleX(12)} y2={135} stroke="var(--muted-foreground)" strokeWidth={1} />
          <text x={scaleX(6)} y={145} textAnchor="middle" className="fill-muted-foreground text-[11px] font-bold font-mono">12 ft</text>

          <line x1={scaleX(12)} y1={130} x2={scaleX(16)} y2={130} stroke="var(--muted-foreground)" strokeWidth={1} />
          <line x1={scaleX(16)} y1={125} x2={scaleX(16)} y2={135} stroke="var(--muted-foreground)" strokeWidth={1} />
          <text x={scaleX(14)} y={145} textAnchor="middle" className="fill-muted-foreground text-[11px] font-bold font-mono">4 ft</text>
        </svg>
      </ExpandableDrawing>
    </div>
  );
};

export default MultiSpanBMD;
