import React from 'react';

export interface IGraphDegreeTransitionsDrawingProps {
  showStep1: boolean;
  showStep2: boolean;
}

export const GraphDegreeTransitionsDrawing: React.FC<IGraphDegreeTransitionsDrawingProps> = ({
  showStep1,
  showStep2,
}) => {
  return (
    <svg className="w-full max-w-[440px] h-[120px] overflow-visible" viewBox="0 0 300 85">
      {/* Load (Zero) */}
      <g transform="translate(10, 10)">
        <rect x="0" y="5" width="60" height="30" className="fill-muted/20 stroke-muted-foreground/30" strokeWidth="1.2" rx="4" />
        <line x1="10" y1="35" x2="50" y2="35" className="stroke-muted-foreground/50 stroke-1.5" />
        <text x="30" y="52" textAnchor="middle" className="text-[10px] font-bold fill-muted-foreground">Load w = 0</text>
      </g>
      
      {/* Arrow 1 */}
      <g transform="translate(80, 20)" className={`transition-all duration-500 ease-in-out ${showStep1 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <path d="M 0 10 L 20 10 M 15 5 L 20 10 L 15 15" className="fill-none stroke-emerald-500" strokeWidth="2" />
        <text x="10" y="-1" textAnchor="middle" className="text-[11px] font-mono font-black fill-emerald-500">∫</text>
      </g>

      {/* Shear (Constant) */}
      <g transform="translate(115, 10)" className={`transition-all duration-500 ease-in-out ${showStep1 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        {/* Shaded Area */}
        <rect x="10" y="15" width="40" height="20" className="fill-emerald-500/10 stroke-none" />
        <rect x="0" y="5" width="60" height="30" className="fill-emerald-500/5 stroke-emerald-500" strokeWidth="1.8" rx="4" />
        <line x1="10" y1="15" x2="50" y2="15" className="stroke-emerald-500 stroke-2" />
        <line x1="10" y1="35" x2="50" y2="35" className="stroke-muted-foreground/30 stroke-1" strokeDasharray="2 2" />
        <text x="30" y="52" textAnchor="middle" className="text-[10px] font-bold fill-emerald-500">Shear V = C</text>
      </g>

      {/* Arrow 2 */}
      <g transform="translate(185, 20)" className={`transition-all duration-500 ease-in-out ${showStep2 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <path d="M 0 10 L 20 10 M 15 5 L 20 10 L 15 15" className="fill-none stroke-blue-500" strokeWidth="2" />
        <text x="10" y="-1" textAnchor="middle" className="text-[11px] font-mono font-black fill-blue-500">∫</text>
      </g>

      {/* Moment (Linear) */}
      <g transform="translate(220, 10)" className={`transition-all duration-500 ease-in-out ${showStep2 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        {/* Shaded Area */}
        <polygon points="10,35 50,15 50,35" className="fill-blue-500/10 stroke-none" />
        <rect x="0" y="5" width="60" height="30" className="fill-blue-500/5 stroke-blue-500" strokeWidth="1.8" rx="4" />
        <line x1="10" y1="35" x2="50" y2="15" className="stroke-blue-500 stroke-2" />
        <line x1="10" y1="35" x2="50" y2="35" className="stroke-muted-foreground/30 stroke-1" strokeDasharray="2 2" />
        <text x="30" y="52" textAnchor="middle" className="text-[10px] font-bold fill-blue-500">Moment M = Cx</text>
      </g>
    </svg>
  );
};
