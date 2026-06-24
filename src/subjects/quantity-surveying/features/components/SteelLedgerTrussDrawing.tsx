import React from 'react';

export interface SteelLedgerTrussDrawingProps {
  span: number;
  rise: number;
  bayLength: number;
  selectedKey: string;
  onSelectKey: (key: string) => void;
  className?: string;
}

export const SteelLedgerTrussDrawing: React.FC<SteelLedgerTrussDrawingProps> = (props) => {
  const {
    selectedKey,
    onSelectKey,
    className = ''
  } = props;
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 300 130" className="w-full max-w-[260px] h-auto">
        {/* Column supports */}
        <rect x="20" y="90" width="16" height="30" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-foreground/20" />
        <rect x="264" y="90" width="16" height="30" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-foreground/20" />

        {/* Bottom Chord (Main Tie) */}
        <line
          x1="30"
          y1="90"
          x2="270"
          y2="90"
          stroke={selectedKey === 'tie' ? '#10b981' : 'currentColor'}
          strokeWidth={selectedKey === 'tie' ? '4' : '2'}
          className={selectedKey !== 'tie' ? 'text-foreground/60' : ''}
          onClick={() => onSelectKey('tie')}
          style={{ cursor: 'pointer' }}
        />

        {/* Left Principal Rafter */}
        <line
          x1="30"
          y1="90"
          x2="150"
          y2="30"
          stroke={selectedKey === 'rafter' ? '#10b981' : 'currentColor'}
          strokeWidth={selectedKey === 'rafter' ? '4' : '2'}
          className={selectedKey !== 'rafter' ? 'text-foreground/60' : ''}
          onClick={() => onSelectKey('rafter')}
          style={{ cursor: 'pointer' }}
        />

        {/* Right Principal Rafter */}
        <line
          x1="150"
          y1="30"
          x2="270"
          y2="90"
          stroke={selectedKey === 'rafter' ? '#10b981' : 'currentColor'}
          strokeWidth={selectedKey === 'rafter' ? '4' : '2'}
          className={selectedKey !== 'rafter' ? 'text-foreground/60' : ''}
          onClick={() => onSelectKey('rafter')}
          style={{ cursor: 'pointer' }}
        />

        {/* Vertical Web Struts */}
        <line
          x1="150"
          y1="30"
          x2="150"
          y2="90"
          stroke={selectedKey === 'web' ? '#10b981' : 'currentColor'}
          strokeWidth={selectedKey === 'web' ? '3' : '1.5'}
          className={selectedKey !== 'web' ? 'text-foreground/40' : ''}
          onClick={() => onSelectKey('web')}
          style={{ cursor: 'pointer' }}
        />
        <line
          x1="90"
          y1="60"
          x2="90"
          y2="90"
          stroke={selectedKey === 'web' ? '#10b981' : 'currentColor'}
          strokeWidth={selectedKey === 'web' ? '3' : '1.5'}
          className={selectedKey !== 'web' ? 'text-foreground/40' : ''}
          onClick={() => onSelectKey('web')}
          style={{ cursor: 'pointer' }}
        />
        <line
          x1="210"
          y1="60"
          x2="210"
          y2="90"
          stroke={selectedKey === 'web' ? '#10b981' : 'currentColor'}
          strokeWidth={selectedKey === 'web' ? '3' : '1.5'}
          className={selectedKey !== 'web' ? 'text-foreground/40' : ''}
          onClick={() => onSelectKey('web')}
          style={{ cursor: 'pointer' }}
        />

        {/* Diagonal Web Struts */}
        <line
          x1="90"
          y1="90"
          x2="150"
          y2="30"
          stroke={selectedKey === 'web' ? '#10b981' : 'currentColor'}
          strokeWidth={selectedKey === 'web' ? '3' : '1.5'}
          className={selectedKey !== 'web' ? 'text-foreground/40' : ''}
          onClick={() => onSelectKey('web')}
          style={{ cursor: 'pointer' }}
        />
        <line
          x1="210"
          y1="90"
          x2="150"
          y2="30"
          stroke={selectedKey === 'web' ? '#10b981' : 'currentColor'}
          strokeWidth={selectedKey === 'web' ? '3' : '1.5'}
          className={selectedKey !== 'web' ? 'text-foreground/40' : ''}
          onClick={() => onSelectKey('web')}
          style={{ cursor: 'pointer' }}
        />

        {/* Secondary Purlins dots on rafters */}
        <circle cx="70" cy="70" r="4" fill={selectedKey === 'purlin' ? '#10b981' : '#f59e0b'} style={{ cursor: 'pointer' }} onClick={() => onSelectKey('purlin')} />
        <circle cx="110" cy="50" r="4" fill={selectedKey === 'purlin' ? '#10b981' : '#f59e0b'} style={{ cursor: 'pointer' }} onClick={() => onSelectKey('purlin')} />
        <circle cx="190" cy="50" r="4" fill={selectedKey === 'purlin' ? '#10b981' : '#f59e0b'} style={{ cursor: 'pointer' }} onClick={() => onSelectKey('purlin')} />
        <circle cx="230" cy="70" r="4" fill={selectedKey === 'purlin' ? '#10b981' : '#f59e0b'} style={{ cursor: 'pointer' }} onClick={() => onSelectKey('purlin')} />
        
        {/* Secondary bracing lines */}
        <line x1="30" y1="110" x2="60" y2="120" stroke={selectedKey === 'bracing' ? '#10b981' : '#ef4444'} strokeWidth="1" strokeDasharray="2,2" style={{ cursor: 'pointer' }} onClick={() => onSelectKey('bracing')} />
        <line x1="270" y1="110" x2="240" y2="120" stroke={selectedKey === 'bracing' ? '#10b981' : '#ef4444'} strokeWidth="1" strokeDasharray="2,2" style={{ cursor: 'pointer' }} onClick={() => onSelectKey('bracing')} />

        {/* Secondary Sagrods */}
        <line x1="70" y1="70" x2="90" y2="90" stroke={selectedKey === 'sagrod' ? '#10b981' : '#888888'} strokeWidth="1.5" style={{ cursor: 'pointer' }} onClick={() => onSelectKey('sagrod')} />
        <line x1="230" y1="70" x2="210" y2="90" stroke={selectedKey === 'sagrod' ? '#10b981' : '#888888'} strokeWidth="1.5" style={{ cursor: 'pointer' }} onClick={() => onSelectKey('sagrod')} />
      </svg>
    </div>
  );
};
