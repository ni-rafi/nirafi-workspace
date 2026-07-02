import React from 'react';
import { type ClickSyncedTabItem } from '@/features/presentation/components/elements/ClickSyncedTabs';
import { LatexFormula, InteractiveCard, SlideParagraph } from '@/features/presentation/components/elements';
import { ExpandableDrawing } from '@/shared/components';

export const Problem4Visualizer: React.FC<{ click: number }> = ({ click }) => {
  const width = 320;
  const height = 190;
  const paddingX = 30;
  const plotW = width - paddingX * 2; // 260px
  const scaleX = (x_ft: number) => paddingX + (x_ft / 16.0) * plotW;

  // Tab mapping:
  // Tab 0 (BMD): click 0, 1, 2
  // Tab 1 (SFD): click 3, 4
  // Tab 2 (Elastic): click 5, 6
  // Tab 3 (Peaks): click 7, 8

  const showBMD = click >= 1 && click <= 2;
  const showSFD = click >= 3 && click <= 4;
  const showElastic = click >= 5 && click <= 6;
  const showPeaks = click >= 7;

  return (
    <ExpandableDrawing title="Continuous Beam Structural Diagram" description="Continuous beam showing support configurations, shear load diagrams, bending moments, and curvature peaks.">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-[280px] h-[170px] overflow-visible">
        {/* Beam lines & supports */}
        <line x1={scaleX(0)} y1={55} x2={scaleX(16)} y2={55} stroke="var(--foreground)" strokeWidth={2.5} />
        
        {/* Support A (Pin) at x = 0 */}
        <polygon points={`${scaleX(0)},55 ${scaleX(0)-5},63 ${scaleX(0)+5},63`} fill="var(--foreground)" />
        <text x={scaleX(0)} y={76} textAnchor="middle" className="fill-muted-foreground text-[11px] font-bold">A</text>
        
        {/* Support B (Roller) at x = 12 */}
        <circle cx={scaleX(12)} cy={59} r={3.5} fill="none" stroke="var(--foreground)" strokeWidth={1.8} />
        <line x1={scaleX(12)-7} y1={63} x2={scaleX(12)+7} y2={63} stroke="var(--foreground)" strokeWidth={1.2} />
        <text x={scaleX(12)} y={78} textAnchor="middle" className="fill-muted-foreground text-[11px] font-bold">B</text>

        {/* Overhang beam labeling */}
        <text x={scaleX(16)} y={73} textAnchor="middle" className="fill-muted-foreground text-[11px] font-bold">C</text>

        {/* Loading representation */}
        <path
          d={`M ${scaleX(0)} 40 
             Q ${scaleX(3)} 30 ${scaleX(6)} 40 
             Q ${scaleX(9)} 30 ${scaleX(12)} 40
             Q ${scaleX(14)} 30 ${scaleX(16)} 40`}
          fill="none"
          stroke="var(--foreground)"
          strokeWidth={1}
          opacity={0.5}
        />
        <text x={scaleX(6)} y={24} textAnchor="middle" className="fill-muted-foreground text-[11px] font-bold font-mono">w = 1.5 k/ft</text>

        {/* Point load P = 12k at overhang tip C */}
        <line x1={scaleX(16)} y1={12} x2={scaleX(16)} y2={51} stroke="var(--primary)" strokeWidth={1.5} />
        <polygon points={`${scaleX(16)-4},46 ${scaleX(16)+4},46 ${scaleX(16)},52`} fill="var(--primary)" />
        <text x={scaleX(16)} y={6} textAnchor="middle" className="fill-primary text-[11px] font-bold font-mono">P = 12 k</text>

        {/* Bending Moment Diagram (BMD) */}
        {showBMD && (
          <g transform="translate(0, 110)" className="animate-in fade-in duration-300">
            {/* Baseline */}
            <line x1={scaleX(0)} y1={20} x2={scaleX(16)} y2={20} stroke="var(--border)" strokeWidth={1} strokeDasharray="3,2" />
            {/* BMD Curve */}
            <path
              d={`M ${scaleX(0)} 20 
                 Q ${scaleX(6)} -15 ${scaleX(12)} 65 
                 L ${scaleX(16)} 20`}
              fill="none"
              stroke="var(--primary)"
              strokeWidth={2}
            />
            {click >= 2 && (
              <>
                <text x={scaleX(6)} y={0} textAnchor="middle" className="fill-emerald-500 text-[11px] font-mono font-bold animate-in fade-in">+108 k-ft</text>
                <text x={scaleX(12)} y={80} textAnchor="middle" className="fill-red-500 text-[11px] font-mono font-bold animate-in fade-in">-48 k-ft</text>
              </>
            )}
            <text x={width/2} y={64} textAnchor="middle" className="fill-muted-foreground text-[10px] font-bold uppercase tracking-wider">Bending Moment Diagram (BMD)</text>
          </g>
        )}

        {/* Shear Force Diagram (SFD) */}
        {showSFD && (
          <g transform="translate(0, 110)" className="animate-in fade-in duration-300">
            {/* Baseline */}
            <line x1={scaleX(0)} y1={20} x2={scaleX(16)} y2={20} stroke="var(--border)" strokeWidth={1} strokeDasharray="3,2" />
            {/* SFD blocks */}
            <path
              d={`M ${scaleX(0)} 20 
                 L ${scaleX(0)} -2 
                 L ${scaleX(12)} 40 
                 L ${scaleX(12)} -15 
                 L ${scaleX(16)} -15 
                 L ${scaleX(16)} 20`}
              fill="none"
              stroke="var(--primary)"
              strokeWidth={2}
            />
            {click >= 4 && (
              <>
                <text x={scaleX(3)} y={8} className="fill-muted-foreground text-[10px] font-mono font-bold animate-in fade-in">V_pos</text>
                <text x={scaleX(14)} y={33} className="fill-muted-foreground text-[10px] font-mono font-bold animate-in fade-in">V_neg</text>
              </>
            )}
            <text x={width/2} y={64} textAnchor="middle" className="fill-muted-foreground text-[10px] font-bold uppercase tracking-wider">Shear Force Diagram (SFD)</text>
          </g>
        )}

        {/* Elastic Curvature */}
        {showElastic && (
          <g transform="translate(0, 110)" className="animate-in fade-in duration-300">
            {/* Baseline */}
            <line x1={scaleX(0)} y1={20} x2={scaleX(16)} y2={20} stroke="var(--border)" strokeWidth={1} strokeDasharray="3,2" />
            {/* Deflection Curve */}
            <path
              d={`M ${scaleX(0)} 20 
                 Q ${scaleX(4)} 34 ${scaleX(8)} 20 
                 Q ${scaleX(11)} 5 ${scaleX(12)} 20 
                 Q ${scaleX(14)} 35 ${scaleX(16)} 40`}
              fill="none"
              stroke="var(--primary)"
              strokeWidth={2}
            />
            {click >= 6 && (
              <>
                <text x={scaleX(4.5)} y={40} className="fill-muted-foreground text-[10px] font-bold animate-in fade-in">Sagging</text>
                <text x={scaleX(10)} y={8} className="fill-muted-foreground text-[10px] font-bold animate-in fade-in">Hogging</text>
              </>
            )}
            <text x={width/2} y={64} textAnchor="middle" className="fill-muted-foreground text-[10px] font-bold uppercase tracking-wider">Deflection Profile (Elastic Curve)</text>
          </g>
        )}

        {/* Peak Moments highlighted */}
        {showPeaks && (
          <g transform="translate(0, 110)" className="animate-in fade-in duration-300">
            {/* Baseline */}
            <line x1={scaleX(0)} y1={20} x2={scaleX(16)} y2={20} stroke="var(--border)" strokeWidth={1} strokeDasharray="3,2" />
            {/* BMD Curve */}
            <path
              d={`M ${scaleX(0)} 20 
                 Q ${scaleX(6)} -15 ${scaleX(12)} 65 
                 L ${scaleX(16)} 20`}
              fill="none"
              stroke="var(--primary)"
              strokeWidth={2}
              opacity={0.3}
            />
            
            {/* Positive Peak highlight */}
            <circle cx={scaleX(6)} cy={1} r={6} fill="none" stroke="var(--emerald-500)" strokeWidth={2} className="animate-ping" />
            <circle cx={scaleX(6)} cy={1} r={4} fill="var(--emerald-500)" />
            <text x={scaleX(6)} y={-10} textAnchor="middle" className="fill-emerald-500 text-[11px] font-mono font-bold">Sagging: +108 k-ft</text>

            {/* Negative Peak highlight */}
            {click >= 8 && (
              <g className="animate-in fade-in duration-300">
                <circle cx={scaleX(12)} cy={65} r={6} fill="none" stroke="var(--rose-500)" strokeWidth={2} className="animate-ping" />
                <circle cx={scaleX(12)} cy={65} r={4} fill="var(--rose-500)" />
                <text x={scaleX(12)} y={80} textAnchor="middle" className="fill-rose-500 text-[11px] font-mono font-bold">Hogging: -48 k-ft</text>
              </g>
            )}
          </g>
        )}
      </svg>
    </ExpandableDrawing>
  );
};

export const getProblem4SolverItems = (currentClick: number): ClickSyncedTabItem[] => [
  {
    title: '1. Bending Moment',
    badge: 'BMD',
    badgeVariant: 'primary',
    description: 'Construct the bending moment diagram to isolate internal load points and peaks.',
    rightVisualizer: <Problem4Visualizer click={currentClick} />,
    rightContent: (
      <div className="mt-3 space-y-3 bg-muted/10 p-3.5 rounded-xl border border-border/40 text-xs">
        <p className="font-bold text-foreground">Bending Moment Profile:</p>
        <SlideParagraph variant="plain" className="text-[11px] text-muted-foreground leading-normal">
          The overhanging beam triggers sagging within span A-B (positive moment) and hogging above support B (negative moment).
        </SlideParagraph>
        {currentClick >= 2 && (
          <div className="mt-2 py-1 text-center bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 rounded font-bold animate-in fade-in duration-300 text-[11px]">
            Sagging Peak: +108 kip-ft | Hogging Peak: -48 kip-ft
          </div>
        )}
      </div>
    ),
    leftBottomContent: (
      <div className="space-y-2">
        <SlideParagraph variant="plain" className="text-[11px] text-muted-foreground leading-normal">
          Review the moment distribution curve to see peak transitions.
        </SlideParagraph>
      </div>
    )
  },
  {
    title: '2. Shear Force',
    badge: 'SFD',
    badgeVariant: 'warning',
    description: 'Construct the shear force diagram to confirm load distribution and reaction locations.',
    rightVisualizer: <Problem4Visualizer click={currentClick} />,
    rightContent: (
      <div className="mt-3 space-y-3 bg-muted/10 p-3.5 rounded-xl border border-border/40 text-xs">
        <p className="font-bold text-foreground">Shear Force Profile:</p>
        <SlideParagraph variant="plain" className="text-[11px] text-muted-foreground leading-normal">
          Verifies the load transitions and locates coordinates of zero shear, which dictate the locations of local peak moments.
        </SlideParagraph>
      </div>
    ),
    leftBottomContent: (
      <div className="space-y-2">
        <SlideParagraph variant="plain" className="text-[11px] text-muted-foreground leading-normal">
          Zero-shear transitions dictate local maximum moments.
        </SlideParagraph>
      </div>
    )
  },
  {
    title: '3. Elastic Curve',
    badge: 'Deflection',
    badgeVariant: 'info',
    description: 'Map boundary condition coordinates and beam curvature changes.',
    rightVisualizer: <Problem4Visualizer click={currentClick} />,
    rightContent: (
      <div className="mt-3 space-y-3 bg-muted/10 p-3.5 rounded-xl border border-border/40 text-xs">
        <p className="font-bold text-foreground">Curvature Profile:</p>
        <SlideParagraph variant="plain" className="text-[11px] text-muted-foreground leading-normal">
          Provides a qualitative view of bending deformation: downward curvature (sagging) in span A-B and upward curvature (hogging) at support B.
        </SlideParagraph>
      </div>
    ),
    leftBottomContent: (
      <div className="space-y-2">
        <SlideParagraph variant="plain" className="text-[11px] text-muted-foreground leading-normal">
          Compare sagging (span A-B) and hogging (support B) zones.
        </SlideParagraph>
      </div>
    )
  },
  {
    title: '4. Design Peaks',
    badge: 'Peaks',
    badgeVariant: 'success',
    description: 'Extract sagging and hogging peaks to establish the governing design envelope values.',
    rightVisualizer: <Problem4Visualizer click={currentClick} />,
    rightContent: (
      <div className="mt-3 space-y-3 bg-muted/10 p-3.5 rounded-xl border border-border/40 text-xs">
        <p className="font-bold text-foreground">Governing Design Values:</p>
        <ul className="list-disc pl-4 space-y-1.5 text-muted-foreground text-[11px]">
          <li>Max Positive Moment (Sagging): <LatexFormula math="M_{\max}^+ = +108\text{ kip}\cdot\text{ft}" />.</li>
          {currentClick >= 8 && <li>Max Negative Moment (Hogging): <LatexFormula math="M_{\max}^- = -48\text{ kip}\cdot\text{ft}" />.</li>}
        </ul>
        <InteractiveCard title="Critical Sizing Parameters">
          <div className="space-y-1 text-[11px] font-mono text-foreground">
            <p>• Positive: M = 1,296,000 lb&middot;in (sagging)</p>
            {currentClick >= 8 && <p>• Negative: M = 576,000 lb&middot;in (hogging)</p>}
          </div>
        </InteractiveCard>
      </div>
    ),
    leftBottomContent: (
      <div className="space-y-2">
        <SlideParagraph variant="plain" className="text-[11px] text-muted-foreground leading-normal">
          The larger peak moment governs the section size design envelope.
        </SlideParagraph>
      </div>
    )
  }
];
