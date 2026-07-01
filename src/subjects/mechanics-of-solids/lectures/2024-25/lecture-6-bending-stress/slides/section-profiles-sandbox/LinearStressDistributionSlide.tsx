import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, SlideBullet } from '@/features/presentation/components/elements';
import { Activity, ShieldCheck } from 'lucide-react';

export const LinearStressDistributionSlide: React.FC = () => {
  const width = 280;
  const height = 150;
  const paddingY = 20;
  const chartH = height - paddingY * 2; // 110px
  const toPixelY = (yNA: number) => paddingY + (1 - (yNA + 0.075) / 0.15) * chartH;

  return (
    <TwoColumnLayout
      title="Linear Stress Distribution"
      leftWidth="50%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-4 text-left select-text">
          <div>
            <div className="flex items-center space-x-1.5 text-indigo-500 font-bold text-[10px] uppercase mb-1">
              <ShieldCheck className="h-4.5 w-4.5" />
              <span>Stress Gradient Analysis</span>
            </div>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground leading-relaxed">
              {"Since bending stress \\sigma = (M * y) / I, and M/I is constant for a given section, stress varies linearly with the distance y from the neutral axis."}
            </SlideParagraph>
          </div>
          <div className="space-y-2 my-2">
            <SlideBullet text="Zero stress at the Neutral Axis (y = 0)." />
            <SlideBullet text="Maximum compression stress on the top edge (furthest compressed fiber)." />
            <SlideBullet text="Maximum tensile stress on the bottom edge (furthest stretched fiber)." />
          </div>
          <div className="p-3 bg-indigo-500/[0.03] border border-indigo-500/20 rounded-xl text-[9px] text-indigo-600 dark:text-indigo-400 leading-normal flex items-start gap-1.5 font-semibold">
            <Activity className="h-4.5 w-4.5 text-indigo-500 shrink-0 mt-0.5" />
            <span>Material near the Neutral Axis does minimal work to resist bending. This explains why I-beams concentrate material at the outer flanges!</span>
          </div>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-5 flex flex-col items-center justify-center h-full min-h-[260px]">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-4">Butterfly Stress Profile</span>
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-[200px] overflow-visible">
            {/* Rectangle Section */}
            <rect x={10} y={paddingY} width={50} height={chartH} className="fill-primary/5 stroke-muted-foreground" strokeWidth={1} />
            <line x1={0} y1={toPixelY(0)} x2={70} y2={toPixelY(0)} stroke="var(--destructive)" strokeWidth={1.0} strokeDasharray="3,1" opacity={0.6} />
            <text x={35} y={toPixelY(0) - 2} textAnchor="middle" className="fill-destructive text-[7.5px] font-bold opacity-80">N.A.</text>

            {/* Bending Stress Distribution Plot */}
            <g transform="translate(100, 0)">
              <line x1={40} y1={paddingY} x2={40} y2={paddingY + chartH} stroke="var(--border)" strokeWidth={1.2} />
              <line x1={10} y1={paddingY} x2={70} y2={paddingY + chartH} stroke="var(--primary)" strokeWidth={1.5} />
              {/* Fill top compression */}
              <polygon points="40,20 10,20 40,75" fill="#ef4444" fillOpacity={0.12} />
              {/* Fill bottom tension */}
              <polygon points="40,130 70,130 40,75" fill="#10b981" fillOpacity={0.12} />
              
              <line x1={15} y1={75} x2={65} y2={75} stroke="var(--destructive)" strokeWidth={1.0} strokeDasharray="3,1" opacity={0.6} />

              <text x={5} y={23} className="fill-red-500 text-[8px] font-mono font-bold">- σ_c (Max Comp)</text>
              <text x={75} y={133} className="fill-emerald-500 text-[8px] font-mono font-bold">+ σ_t (Max Tens)</text>
            </g>
          </svg>
        </div>
      }
    />
  );
};

export default LinearStressDistributionSlide;
