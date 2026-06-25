import React, { useContext } from 'react';
import { PresentationContext } from '@/features/presentation/context/PresentationContext';

interface SiteSafetyDrawingProps {
  activeHighlight?: 'none' | 'canopy' | 'shed' | 'fencing';
  className?: string;
}

export const SiteSafetyDrawing: React.FC<SiteSafetyDrawingProps> = ({
  activeHighlight = 'none',
  className = '',
}) => {
  const presentation = useContext(PresentationContext);
  const isBlog = presentation?.viewMode === 'blog';

  const containerClasses = isBlog
    ? 'bg-transparent border-none shadow-none p-0 flex flex-col items-center select-none w-full'
    : `relative border border-border/80 bg-muted/20 dark:bg-muted/5 rounded-xl p-4 flex flex-col items-center shadow-sm select-none w-full justify-center ${className}`;

  const isCanopyActive = activeHighlight === 'none' || activeHighlight === 'canopy';
  const isShedActive = activeHighlight === 'none' || activeHighlight === 'shed';
  const isFencingActive = activeHighlight === 'none' || activeHighlight === 'fencing';

  return (
    <div className={containerClasses}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 600 360"
        className="overflow-visible select-none max-h-[300px]"
      >
        {/* Sky / Background grid guide (Subtle) */}
        <line x1="50" y1="320" x2="550" y2="320" stroke="currentColor" strokeWidth="2" className="text-muted-foreground/30" />
        
        {/* Ground Dirt Hatching */}
        <g fill="currentColor" className="text-muted-foreground/20">
          <rect x="50" y="320" width="500" height="20" />
        </g>

        {/* 1. Building Frame (Grey, low opacity) */}
        <g stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground/30 fill-none">
          {/* Columns */}
          <line x1="120" y1="320" x2="120" y2="80" />
          <line x1="200" y1="320" x2="200" y2="80" />
          <line x1="280" y1="320" x2="280" y2="80" />
          
          {/* Beams (Slabs) */}
          {/* Ground level */}
          <line x1="100" y1="320" x2="300" y2="320" />
          {/* 1st Floor */}
          <line x1="100" y1="260" x2="300" y2="260" />
          {/* 2nd Floor */}
          <line x1="100" y1="200" x2="300" y2="200" />
          {/* 3rd Floor */}
          <line x1="100" y1="140" x2="300" y2="140" />
          {/* Roof */}
          <line x1="100" y1="80" x2="300" y2="80" />

          {/* Foundation footings (Subtle) */}
          <rect x="105" y="320" width="30" height="8" />
          <rect x="185" y="320" width="30" height="8" />
          <rect x="265" y="320" width="30" height="8" />
        </g>

        {/* Crane Hook / Construction Indicator (Subtle background details) */}
        <g stroke="currentColor" strokeWidth="1" className="text-muted-foreground/20 fill-none" transform="translate(180, 20)">
          <path d="M 0,0 V 40 L -5,45 M 0,40 L 5,45" />
          <circle cx="0" cy="50" r="3" />
        </g>

        {/* 2. Safety Canopy (PWD Chapter 10) */}
        {/* Temporary truss system projecting out to protect public from falling debris */}
        <g className="transition-all duration-300">
          {/* Canopy Left Platform */}
          <polygon
            points="50,260 120,260 120,250 65,250"
            fill={activeHighlight === 'canopy' ? 'var(--chart-2-opacity, rgba(234, 179, 8, 0.25))' : 'rgba(120,120,120,0.05)'}
            stroke={activeHighlight === 'canopy' ? 'var(--chart-2)' : 'currentColor'}
            strokeWidth={activeHighlight === 'canopy' ? '3' : '1.5'}
            className="transition-all duration-300 text-muted-foreground/60"
            opacity={isCanopyActive ? 1 : 0.15}
          />
          {/* Canopy Left Diagonal Truss Support */}
          <line
            x1="50"
            y1="260"
            x2="120"
            y2="290"
            stroke={activeHighlight === 'canopy' ? 'var(--chart-2)' : 'currentColor'}
            strokeWidth={activeHighlight === 'canopy' ? '3' : '1.5'}
            className="transition-all duration-300 text-muted-foreground/60"
            opacity={isCanopyActive ? 1 : 0.15}
          />
          {/* Canopy Right Platform */}
          <polygon
            points="280,260 350,260 335,250 280,250"
            fill={activeHighlight === 'canopy' ? 'var(--chart-2-opacity, rgba(234, 179, 8, 0.25))' : 'rgba(120,120,120,0.05)'}
            stroke={activeHighlight === 'canopy' ? 'var(--chart-2)' : 'currentColor'}
            strokeWidth={activeHighlight === 'canopy' ? '3' : '1.5'}
            className="transition-all duration-300 text-muted-foreground/60"
            opacity={isCanopyActive ? 1 : 0.15}
          />
          {/* Canopy Right Diagonal Truss Support */}
          <line
            x1="350"
            y1="260"
            x2="280"
            y2="290"
            stroke={activeHighlight === 'canopy' ? 'var(--chart-2)' : 'currentColor'}
            strokeWidth={activeHighlight === 'canopy' ? '3' : '1.5'}
            className="transition-all duration-300 text-muted-foreground/60"
            opacity={isCanopyActive ? 1 : 0.15}
          />
          {/* Falling CGI debris outline inside canopy area */}
          {activeHighlight === 'canopy' && (
            <path
              d="M 85,150 L 95,160 L 80,170"
              fill="none"
              stroke="var(--chart-2)"
              strokeWidth="2"
              className="animate-bounce"
            />
          )}
        </g>

        {/* 3. Safety Shed Over Driveway (PWD Chapter 10) */}
        {/* Installed at 15ft (approx. 4.5m) height over driveways and pathways */}
        <g className="transition-all duration-300">
          {/* Shed Posts */}
          <line
            x1="410"
            y1="320"
            x2="410"
            y2="230"
            stroke={activeHighlight === 'shed' ? 'var(--chart-1)' : 'currentColor'}
            strokeWidth={activeHighlight === 'shed' ? '2.5' : '1.5'}
            className="transition-all duration-300 text-muted-foreground/60"
            opacity={isShedActive ? 1 : 0.15}
          />
          <line
            x1="510"
            y1="320"
            x2="510"
            y2="230"
            stroke={activeHighlight === 'shed' ? 'var(--chart-1)' : 'currentColor'}
            strokeWidth={activeHighlight === 'shed' ? '2.5' : '1.5'}
            className="transition-all duration-300 text-muted-foreground/60"
            opacity={isShedActive ? 1 : 0.15}
          />
          {/* Shed Roof (Slanted CGI Sheet) */}
          <polygon
            points="395,235 525,220 520,210 400,225"
            fill={activeHighlight === 'shed' ? 'var(--chart-1-opacity, rgba(59, 130, 246, 0.25))' : 'rgba(120,120,120,0.05)'}
            stroke={activeHighlight === 'shed' ? 'var(--chart-1)' : 'currentColor'}
            strokeWidth={activeHighlight === 'shed' ? '3' : '1.5'}
            className="transition-all duration-300 text-muted-foreground/70"
            opacity={isShedActive ? 1 : 0.15}
          />
          {/* Truck/Vehicular Outline under shed */}
          <g
            stroke="currentColor"
            strokeWidth="1.2"
            className="text-muted-foreground/40 fill-none"
            opacity={isShedActive ? 0.7 : 0.1}
            transform="translate(425, 260)"
          >
            <rect x="0" y="15" width="50" height="30" rx="3" />
            <rect x="50" y="25" width="20" height="20" rx="2" />
            <circle cx="15" cy="48" r="6" />
            <circle cx="55" cy="48" r="6" />
          </g>
        </g>

        {/* 4. Temporary Safety Fencing (1.2m Height) */}
        {/* Around the outer periphery and floor slab voids */}
        <g className="transition-all duration-300">
          {/* Left Peripheral Fence */}
          <g opacity={isFencingActive ? 1 : 0.15} className="transition-opacity duration-300">
            {/* Posts */}
            <line x1="20" y1="320" x2="20" y2="280" stroke={activeHighlight === 'fencing' ? 'var(--chart-5)' : 'currentColor'} strokeWidth="2" />
            <line x1="50" y1="320" x2="50" y2="280" stroke={activeHighlight === 'fencing' ? 'var(--chart-5)' : 'currentColor'} strokeWidth="2" />
            <line x1="80" y1="320" x2="80" y2="280" stroke={activeHighlight === 'fencing' ? 'var(--chart-5)' : 'currentColor'} strokeWidth="2" />
            {/* Horizontal mesh lines */}
            <line x1="15" y1="290" x2="85" y2="290" stroke={activeHighlight === 'fencing' ? 'var(--chart-5)' : 'currentColor'} strokeWidth={activeHighlight === 'fencing' ? '2' : '1'} />
            <line x1="15" y1="305" x2="85" y2="305" stroke={activeHighlight === 'fencing' ? 'var(--chart-5)' : 'currentColor'} strokeWidth={activeHighlight === 'fencing' ? '2' : '1'} />
            {/* Safety mesh cross-hatch */}
            <path d="M 20,320 L 50,290 M 50,320 L 80,290 M 20,290 L 50,320 M 50,290 L 80,320" stroke={activeHighlight === 'fencing' ? 'var(--chart-5)' : 'currentColor'} strokeWidth="0.8" opacity="0.6" />
          </g>

          {/* Floor Slab Punch Void Guard (Upper Floor) */}
          <g opacity={isFencingActive ? 1 : 0.15} className="transition-opacity duration-300" transform="translate(220, 160)">
            <rect x="0" y="0" width="40" height="40" stroke="currentColor" strokeWidth="1" strokeDasharray="3,3" fill="rgba(239, 68, 68, 0.05)" />
            {/* Guard Fencing around void */}
            <line x1="-5" y1="40" x2="-5" y2="15" stroke={activeHighlight === 'fencing' ? 'var(--chart-5)' : 'currentColor'} strokeWidth="2" />
            <line x1="45" y1="40" x2="45" y2="15" stroke={activeHighlight === 'fencing' ? 'var(--chart-5)' : 'currentColor'} strokeWidth="2" />
            <line x1="-5" y1="20" x2="45" y2="20" stroke={activeHighlight === 'fencing' ? 'var(--chart-5)' : 'currentColor'} strokeWidth="2" />
            <line x1="-5" y1="30" x2="45" y2="30" stroke={activeHighlight === 'fencing' ? 'var(--chart-5)' : 'currentColor'} strokeWidth="1" />
          </g>
        </g>

        {/* Annotations */}
        <g className="font-mono font-bold fill-muted-foreground" style={{ fontSize: '11px' }}>
          {/* Safety Canopy Annotations */}
          <g opacity={isCanopyActive ? 1 : 0.15} className="transition-opacity duration-300">
            <line x1="85" y1="255" x2="85" y2="190" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,2" />
            <circle cx="85" cy="255" r="2" className="fill-chart-2" />
            <text x="85" y="180" textAnchor="middle" className="fill-chart-2">Safety Canopy (1st Floor)</text>
            <text x="85" y="195" textAnchor="middle" className="fill-muted-foreground font-normal text-[10px]">CGI sheets + Steel Trusses</text>
          </g>

          {/* Driveway Safety Shed Annotations */}
          <g opacity={isShedActive ? 1 : 0.15} className="transition-opacity duration-300">
            <line x1="460" y1="218" x2="460" y2="130" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,2" />
            <circle cx="460" cy="218" r="2" className="fill-chart-1" />
            <text x="460" y="110" textAnchor="middle" className="fill-chart-1">Driveway Safety Shed</text>
            <text x="460" y="125" textAnchor="middle" className="fill-muted-foreground font-normal text-[10px]">0.27mm thick CGI (H = 15&apos;-0&quot;)</text>
          </g>

          {/* Safety Fencing Annotations */}
          <g opacity={isFencingActive ? 1 : 0.15} className="transition-opacity duration-300">
            <line x1="50" y1="285" x2="50" y2="230" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,2" />
            <line x1="225" y1="175" x2="225" y2="230" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,2" />
            <circle cx="50" cy="285" r="2" className="fill-chart-5" />
            <circle cx="225" cy="175" r="2" className="fill-chart-5" />
            
            <text x="137" y="243" textAnchor="middle" className="fill-chart-5">1.2m Safety Fencing</text>
            <text x="137" y="255" textAnchor="middle" className="fill-muted-foreground font-normal text-[10px]">Periphery &amp; Void Protection</text>
          </g>

          {/* Ground indicator */}
          <text x="300" y="343" textAnchor="middle" className="text-muted-foreground font-normal text-[10px]">Ground Level (EGL)</text>
        </g>
      </svg>
    </div>
  );
};

export default SiteSafetyDrawing;
