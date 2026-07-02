import { ExpandableDrawing } from '@/shared/components';

interface BeamDeformationDrawingProps {
  mode: 'straight' | 'sagging' | 'hogging';
}

export const BeamDeformationDrawing: React.FC<BeamDeformationDrawingProps> = ({ mode }) => {
  const width = 360;
  const height = 150;

  const renderContent = () => {
    if (mode === 'straight') {
      return (
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-[280px] h-auto overflow-visible">
          {/* Straight beam element */}
          <rect x={40} y={50} width={280} height={50} rx={4} className="fill-indigo-500/10 stroke-indigo-500" strokeWidth={2} />
          {/* Neutral axis line */}
          <line x1={30} y1={75} x2={330} y2={75} stroke="var(--destructive)" strokeWidth={1.5} strokeDasharray="5,3" />
          <text x={340} y={79} className="fill-destructive text-[10px] font-bold">N.A.</text>
        </svg>
      );
    }

    // Sagging (Smile curvature)
    if (mode === 'sagging') {
      return (
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-[280px] h-auto overflow-visible">
          {/* Sagging curved path */}
          <path
            d="M 40 40 Q 180 100 320 40 L 310 90 Q 180 150 50 90 Z"
            className="fill-indigo-500/10 stroke-indigo-500"
            strokeWidth={2}
          />
          {/* Curved Neutral axis */}
          <path
            d="M 35 65 Q 180 125 325 65"
            stroke="var(--destructive)"
            strokeWidth={1.5}
            strokeDasharray="5,3"
            fill="none"
          />
          <text x={330} y={69} className="fill-destructive text-[10px] font-bold">N.A.</text>

          {/* Compression arrows at the top */}
          <path d="M 80 52 L 105 57 M 105 57 L 98 52 M 105 57 L 100 60" stroke="#ef4444" strokeWidth={1.5} fill="none" />
          <path d="M 280 52 L 255 57 M 255 57 L 260 52 M 255 57 L 262 60" stroke="#ef4444" strokeWidth={1.5} fill="none" />
          <text x={180} y={45} textAnchor="middle" className="fill-red-500 text-[10px] font-bold">COMPRESSION</text>

          {/* Tension arrows at the bottom */}
          <path d="M 90 100 L 70 95 M 70 95 L 77 92 M 70 95 L 75 99" stroke="#10b981" strokeWidth={1.5} fill="none" />
          <path d="M 270 100 L 290 95 M 290 95 L 283 92 M 290 95 L 285 99" stroke="#10b981" strokeWidth={1.5} fill="none" />
          <text x={180} y={135} textAnchor="middle" className="fill-emerald-500 text-[10px] font-bold">TENSION</text>
        </svg>
      );
    }

    // Hogging (Frown curvature)
    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-[280px] h-auto overflow-visible">
        {/* Hogging curved path */}
        <path
          d="M 40 110 Q 180 50 320 110 L 310 60 Q 180 0 50 60 Z"
          className="fill-indigo-500/10 stroke-indigo-500"
          strokeWidth={2}
        />
        {/* Curved Neutral axis */}
        <path
          d="M 35 85 Q 180 25 325 85"
          stroke="var(--destructive)"
          strokeWidth={1.5}
          strokeDasharray="5,3"
          fill="none"
        />
        <text x={330} y={89} className="fill-destructive text-[10px] font-bold">N.A.</text>

        {/* Tension arrows at the top */}
        <path d="M 90 50 L 70 55 M 70 55 L 77 58 M 70 55 L 75 51" stroke="#10b981" strokeWidth={1.5} fill="none" />
        <path d="M 270 50 L 290 55 M 290 55 L 283 58 M 290 55 L 285 51" stroke="#10b981" strokeWidth={1.5} fill="none" />
        <text x={180} y={20} textAnchor="middle" className="fill-emerald-500 text-[10px] font-bold">TENSION</text>

        {/* Compression arrows at the bottom */}
        <path d="M 80 98 L 105 93 M 105 93 L 98 98 M 105 93 L 100 90" stroke="#ef4444" strokeWidth={1.5} fill="none" />
        <path d="M 280 98 L 255 93 M 255 93 L 260 98 M 255 93 L 262 90" stroke="#ef4444" strokeWidth={1.5} fill="none" />
        <text x={180} y={110} textAnchor="middle" className="fill-red-500 text-[10px] font-bold">COMPRESSION</text>
      </svg>
    );
  };

  return (
    <ExpandableDrawing title="Beam Curvature & Stress Zones" description="Displays tension and compression fiber shifts under straight, sagging (smile), and hogging (frown) moments.">
      <div className="w-full flex justify-center items-center py-2 bg-muted/10 border border-border/40 rounded-xl">
        {renderContent()}
      </div>
    </ExpandableDrawing>
  );
};
