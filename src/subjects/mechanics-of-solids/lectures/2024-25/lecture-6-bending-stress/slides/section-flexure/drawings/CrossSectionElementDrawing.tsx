import { ExpandableDrawing } from '@/shared/components';

export const CrossSectionElementDrawing: React.FC = () => {
  const width = 320;
  const height = 160;

  return (
    <ExpandableDrawing title="Cross Section Differential Analysis" description="Models the differential force dF = σ dA on a strip dA at distance y from the neutral axis, with stress profile limits.">
      <div className="w-full flex justify-center items-center py-2 bg-muted/10 border border-border/40 rounded-xl">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-[260px] h-auto overflow-visible">
          {/* 1. Cross Section shape (Rectangle) */}
          <g>
            <rect x={30} y={20} width={80} height={120} fill="none" stroke="var(--foreground)" strokeWidth={1.5} />
            {/* Neutral axis line */}
            <line x1={20} y1={80} x2={120} y2={80} stroke="var(--destructive)" strokeWidth={1.2} strokeDasharray="3,2" />
            <text x={125} y={83} className="fill-destructive text-[8px] font-bold">N.A.</text>

            {/* Differential strip dA */}
            <rect x={30} y={45} width={80} height={6} fill="var(--primary)" fillOpacity={0.2} stroke="var(--primary)" strokeWidth={1} />
            
            {/* Label dA */}
            <text x={70} y={50} textAnchor="middle" className="fill-primary text-[8px] font-bold font-mono">dA</text>

            {/* Coordinate y to strip */}
            <line x1={50} y1={80} x2={50} y2={51} stroke="var(--muted-foreground)" strokeWidth={0.8} />
            <circle cx={50} cy={80} r={1.2} fill="var(--muted-foreground)" />
            <circle cx={50} cy={51} r={1.2} fill="var(--muted-foreground)" />
            <text x={55} y={69} className="fill-muted-foreground text-[8px] font-mono font-bold">y</text>

            {/* Dimensions b, h */}
            <text x={70} y={152} textAnchor="middle" className="fill-muted-foreground text-[9px] font-mono font-bold">b</text>
            <text x={12} y={80} textAnchor="middle" className="fill-muted-foreground text-[9px] font-mono font-bold">h</text>
          </g>

          {/* 2. Stress profile sidebar */}
          <g transform="translate(180, 0)">
            {/* Base vertical line */}
            <line x1={40} y1={20} x2={40} y2={140} stroke="var(--border)" strokeWidth={1} />
            {/* Neutral Axis reference */}
            <line x1={20} y1={80} x2={60} y2={80} stroke="var(--destructive)" strokeWidth={1.2} strokeDasharray="3,2" opacity={0.6} />

            {/* Stress profile lines */}
            <line x1={15} y1={20} x2={65} y2={140} stroke="var(--primary)" strokeWidth={1.5} />
            <polygon points="40,20 15,20 40,80" fill="var(--primary)" fillOpacity={0.1} />
            <polygon points="40,140 65,140 40,80" fill="var(--primary)" fillOpacity={0.1} />

            {/* Force dF on the differential element */}
            <line x1={40} y1={48} x2={27} y2={48} stroke="var(--primary)" strokeWidth={1} markerEnd="url(#arrow-df)" />
            <text x={23} y={44} className="fill-primary text-[8px] font-bold font-mono">dF = σ dA</text>
            
            {/* Label stresses */}
            <text x={12} y={23} className="fill-foreground text-[8px] font-mono font-bold">σ_c</text>
            <text x={68} y={143} className="fill-foreground text-[8px] font-mono font-bold">σ_t</text>
            <text x={40} y={12} textAnchor="middle" className="fill-muted-foreground text-[9px] font-bold">Stress Profile</text>
          </g>

          <defs>
            <marker id="arrow-df" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--primary)" />
            </marker>
          </defs>
        </svg>
      </div>
    </ExpandableDrawing>
  );
};
