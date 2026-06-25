import React from 'react';

interface CompleteEstimateTreeDrawingProps {
  activeHighlight?: 'land' | 'legal' | 'permit' | 'consulting' | 'structure' | 'none';
  onHighlightChange?: (highlight: 'land' | 'legal' | 'permit' | 'consulting' | 'structure' | 'none') => void;
  className?: string;
}

export const CompleteEstimateTreeDrawing: React.FC<CompleteEstimateTreeDrawingProps> = ({
  activeHighlight = 'none',
  onHighlightChange,
  className = '',
}) => {
  const nodes = [
    {
      id: 'land' as const,
      title: '1. Land Cost',
      icon: '🗺️',
      colorClass: 'stroke-amber-500 fill-amber-500/10 text-amber-600',
      activeColorClass: 'stroke-amber-600 fill-amber-500/25 ring-2 ring-amber-500',
      x: 30,
      width: 130,
      center: 95,
      items: ['Deed registration', 'Brokerage commission', 'Demarcation survey', 'Soil purchase/fill'],
    },
    {
      id: 'legal' as const,
      title: '2. Legal Expenses',
      icon: '⚖️',
      colorClass: 'stroke-blue-500 fill-blue-500/10 text-blue-600',
      activeColorClass: 'stroke-blue-600 fill-blue-500/25 ring-2 ring-blue-500',
      x: 180,
      width: 130,
      center: 245,
      items: ['Agreement stamps', 'Lawyer vetting fees', 'Arbitration allowance', 'Insurance deeds'],
    },
    {
      id: 'permit' as const,
      title: '3. Permits & Fees',
      icon: '📋',
      colorClass: 'stroke-purple-500 fill-purple-500/10 text-purple-600',
      activeColorClass: 'stroke-purple-600 fill-purple-500/25 ring-2 ring-purple-500',
      x: 330,
      width: 140,
      center: 400,
      items: ['Municipality approval', 'Water connection fee', 'Electricity grid hookup', 'Fire department NOC'],
    },
    {
      id: 'consulting' as const,
      title: '4. Consultant Fees',
      icon: '📐',
      colorClass: 'stroke-teal-500 fill-teal-500/10 text-teal-600',
      activeColorClass: 'stroke-teal-600 fill-teal-500/25 ring-2 ring-teal-500',
      x: 490,
      width: 130,
      center: 555,
      items: ['Architectural design', 'Structural simulation', 'Soil testing lab', 'Site QA supervision'],
    },
    {
      id: 'structure' as const,
      title: '5. Structural Cost',
      icon: '🏗️',
      colorClass: 'stroke-emerald-500 fill-emerald-500/10 text-emerald-600',
      activeColorClass: 'stroke-emerald-600 fill-emerald-500/25 ring-2 ring-emerald-500',
      x: 640,
      width: 130,
      center: 705,
      items: ['Civil materials', 'Labor contracts', 'Contractor profit (10%)', 'Work-Charged Est (1.5-2%)'],
    },
  ];

  const handleNodeClick = (id: 'land' | 'legal' | 'permit' | 'consulting' | 'structure') => {
    if (onHighlightChange) {
      onHighlightChange(activeHighlight === id ? 'none' : id);
    }
  };

  return (
    <div className={`w-full flex flex-col justify-between bg-muted/20 p-4 border border-border/40 rounded-xl ${className}`}>
      <span className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground mb-4 block text-center">
        Interactive Owner Estimate Cost Tree (Click Nodes to Focus)
      </span>

      <div className="bg-background rounded-lg border border-border/20 relative flex items-center justify-center p-2 overflow-x-auto">
        <svg viewBox="0 0 800 360" className="w-[800px] h-[360px] select-none overflow-visible shrink-0">
          {/* Connector Paths branching from Root to Leaves */}
          {nodes.map((node) => {
            const isActive = activeHighlight === node.id;
            return (
              <path
                key={`line-${node.id}`}
                d={`M 400,75 C 400,115 ${node.center},115 ${node.center},160`}
                fill="none"
                className={`transition-all duration-300 ${
                  isActive
                    ? 'stroke-primary stroke-[3px]'
                    : activeHighlight !== 'none'
                    ? 'stroke-muted-foreground/10 stroke-[1px]'
                    : 'stroke-border stroke-[1.5px]'
                }`}
              />
            );
          })}

          {/* Root Node */}
          <g
            className="cursor-pointer group"
            onClick={() => onHighlightChange && onHighlightChange('none')}
          >
            <rect
              x="250"
              y="15"
              width="300"
              height="60"
              rx="12"
              className={`transition-all duration-300 ${
                activeHighlight === 'none'
                  ? 'fill-primary/10 stroke-primary stroke-[2.5px]'
                  : 'fill-background stroke-muted-foreground/30 stroke-[1.5px] group-hover:stroke-primary/50'
              }`}
            />
            <text
              x="400"
              y="40"
              textAnchor="middle"
              className="fill-foreground font-semibold text-[13px]"
            >
              Complete Estimate
            </text>
            <text
              x="400"
              y="58"
              textAnchor="middle"
              className="fill-muted-foreground font-mono text-[10px]"
            >
              Total Project Lifecycle Cost (Owner Side)
            </text>
          </g>

          {/* Leaves (Cost Branches) */}
          {nodes.map((node) => {
            const isActive = activeHighlight === node.id;
            const isAnyActive = activeHighlight !== 'none';
            const opacityClass = isActive ? 'opacity-100 scale-[1.02]' : isAnyActive ? 'opacity-40 scale-95' : 'opacity-100 hover:scale-[1.01]';

            return (
              <g
                key={node.id}
                onClick={() => handleNodeClick(node.id)}
                className={`cursor-pointer transition-all duration-300 origin-[${node.center}px_240px] ${opacityClass}`}
              >
                {/* Node Box */}
                <rect
                  x={node.x}
                  y="160"
                  width={node.width}
                  height="180"
                  rx="10"
                  className={`transition-all duration-300 stroke-[2px] ${
                    isActive ? node.activeColorClass : 'fill-background ' + node.colorClass.split(' ')[0]
                  }`}
                />

                {/* Header Icon + Title */}
                <rect
                  x={node.x}
                  y="160"
                  width={node.width}
                  height="34"
                  rx="10"
                  clipPath="inset(0 0 146px 0)"
                  className={`${isActive ? 'fill-primary/5' : 'fill-muted/20'}`}
                />
                
                <text
                  x={node.center}
                  y="182"
                  textAnchor="middle"
                  className="font-bold text-[11px] fill-foreground"
                >
                  {node.icon} {node.title}
                </text>

                {/* Sub-item Details */}
                {node.items.map((item, index) => {
                  const itemY = 214 + index * 32;
                  return (
                    <g key={index}>
                      <circle cx={node.x + 14} cy={itemY - 4} r="2.5" className="fill-muted-foreground/60" />
                      {/* Wrap text if too long */}
                      <text
                        x={node.x + 24}
                        y={itemY}
                        className="fill-muted-foreground text-[10px]"
                        style={{ whiteSpace: 'pre-wrap' }}
                      >
                        {item.substring(0, 19)}
                      </text>
                      {item.length > 19 && (
                        <text
                          x={node.x + 24}
                          y={itemY + 10}
                          className="fill-muted-foreground text-[9px] font-light"
                        >
                          {item.substring(19)}
                        </text>
                      )}
                    </g>
                  );
                })}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};
