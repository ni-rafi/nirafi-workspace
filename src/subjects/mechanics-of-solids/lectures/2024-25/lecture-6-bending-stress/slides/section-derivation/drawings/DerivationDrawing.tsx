import { ExpandableDrawing } from '@/shared/components';

interface DerivationDrawingProps {
  mode: 'straight' | 'bent' | 'both';
}

export const DerivationDrawing: React.FC<DerivationDrawingProps> = ({ mode }) => {
  const width = 360;
  const height = 180;

  const renderStraight = (offsetX = 0, scale = 1.0) => {
    return (
      <g transform={`translate(${offsetX}, 0) scale(${scale})`}>
        {/* Beam Element dx */}
        <rect x={50} y={30} width={120} height={100} fill="none" stroke="var(--foreground)" strokeWidth={2} />
        
        {/* Neutral Axis (NA) */}
        <line x1={40} y1={80} x2={180} y2={80} stroke="var(--destructive)" strokeWidth={1.5} strokeDasharray="4,3" />
        
        {/* Fiber PQ */}
        <line x1={50} y1={60} x2={170} y2={60} stroke="var(--primary)" strokeWidth={2} />

        {/* Labels */}
        <text x={42} y={35} className="fill-foreground text-[10px] font-bold">A</text>
        <text x={42} y={135} className="fill-foreground text-[10px] font-bold">B</text>
        <text x={175} y={35} className="fill-foreground text-[10px] font-bold">C</text>
        <text x={175} y={135} className="fill-foreground text-[10px] font-bold">D</text>

        <text x={38} y={83} className="fill-destructive text-[8px] font-bold">R</text>
        <text x={180} y={83} className="fill-destructive text-[8px] font-bold">S</text>

        <text x={42} y={63} className="fill-primary text-[8px] font-bold">P</text>
        <text x={175} y={63} className="fill-primary text-[8px] font-bold">Q</text>

        {/* Dimension y */}
        <line x1={110} y1={80} x2={110} y2={60} stroke="var(--muted-foreground)" strokeWidth={0.8} />
        <circle cx={110} cy={80} r={1.5} fill="var(--muted-foreground)" />
        <circle cx={110} cy={60} r={1.5} fill="var(--muted-foreground)" />
        <text x={114} y={73} className="fill-muted-foreground text-[8px] font-mono font-bold">y</text>

        {/* Length dx */}
        <line x1={50} y1={145} x2={170} y2={145} stroke="var(--muted-foreground)" strokeWidth={0.8} />
        <line x1={50} y1={142} x2={50} y2={148} stroke="var(--muted-foreground)" strokeWidth={0.8} />
        <line x1={170} y1={142} x2={170} y2={148} stroke="var(--muted-foreground)" strokeWidth={0.8} />
        <text x={110} y={155} textAnchor="middle" className="fill-muted-foreground text-[9px] font-mono font-bold">dx</text>
      </g>
    );
  };

  const renderBent = (offsetX = 0, scale = 1.0) => {
    // Curving around center O at (110, -80)
    // Radius to NA is 180
    // Angle dθ is 30 degrees (0.52 rad)
    return (
      <g transform={`translate(${offsetX}, 0) scale(${scale})`}>
        {/* Center point O */}
        <circle cx={110} cy={10} r={2} fill="var(--foreground)" />
        <text x={110} y={5} textAnchor="middle" className="fill-foreground text-[9px] font-bold">O</text>
        
        {/* Ray lines from O */}
        <line x1={110} y1={10} x2={60} y2={140} stroke="var(--muted-foreground)" strokeWidth={0.5} strokeDasharray="2,2" />
        <line x1={110} y1={10} x2={160} y2={140} stroke="var(--muted-foreground)" strokeWidth={0.5} strokeDasharray="2,2" />

        {/* Bent boundaries */}
        {/* Top boundary (radius = 90) */}
        <path d="M 85 88 A 90 90 0 0 1 135 88" fill="none" stroke="var(--foreground)" strokeWidth={1.5} />
        {/* Bottom boundary (radius = 150) */}
        <path d="M 68 138 A 150 150 0 0 1 152 138" fill="none" stroke="var(--foreground)" strokeWidth={1.5} />
        {/* Side plane cuts */}
        <line x1={85} y1={88} x2={68} y2={138} stroke="var(--foreground)" strokeWidth={2} />
        <line x1={135} y1={88} x2={152} y2={138} stroke="var(--foreground)" strokeWidth={2} />

        {/* Neutral Axis (radius = 120) */}
        <path d="M 75 114 A 120 120 0 0 1 145 114" fill="none" stroke="var(--destructive)" strokeWidth={1.5} strokeDasharray="4,3" />

        {/* Fiber P'Q' (radius = 100) */}
        <path d="M 81 96 A 100 100 0 0 1 139 96" fill="none" stroke="var(--primary)" strokeWidth={2} />

        {/* Radius R dimension */}
        <path d="M 110 10 L 110 114" stroke="var(--destructive)" strokeWidth={0.8} />
        <circle cx={110} cy={114} r={1.5} fill="var(--destructive)" />
        <text x={114} y={70} className="fill-destructive text-[8px] font-mono font-bold">R</text>

        {/* Angle dθ */}
        <path d="M 102 30 A 20 20 0 0 1 118 30" fill="none" stroke="var(--foreground)" strokeWidth={0.8} />
        <text x={110} y={42} textAnchor="middle" className="fill-foreground text-[8px] font-mono font-bold">dθ</text>

        {/* Labels */}
        <text x={87} y={82} className="fill-foreground text-[9px] font-bold">A'</text>
        <text x={60} y={145} className="fill-foreground text-[9px] font-bold">B'</text>
        <text x={132} y={82} className="fill-foreground text-[9px] font-bold">C'</text>
        <text x={152} y={145} className="fill-foreground text-[9px] font-bold">D'</text>

        <text x={68} y={116} className="fill-destructive text-[8px] font-bold">R'</text>
        <text x={148} y={116} className="fill-destructive text-[8px] font-bold">S'</text>

        <text x={75} y={98} className="fill-primary text-[8px] font-bold">P'</text>
        <text x={142} y={98} className="fill-primary text-[8px] font-bold">Q'</text>
      </g>
    );
  };

  return (
    <ExpandableDrawing title="Bending Strain Derivation Geometry" description="Defines the longitudinal fiber element dx, radius of curvature R, angle dθ, and fiber coordinate y used to derive the flexural strain equation.">
      <div className="w-full flex justify-center items-center py-2 bg-muted/10 border border-border/40 rounded-xl">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-[320px] h-auto overflow-visible">
          {mode === 'straight' && renderStraight(80, 0.95)}
          {mode === 'bent' && renderBent(80, 0.95)}
          {mode === 'both' && (
            <g>
              {renderStraight(-10, 0.85)}
              {renderBent(170, 0.85)}
            </g>
          )}
        </svg>
      </div>
    </ExpandableDrawing>
  );
};
