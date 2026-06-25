import React from 'react';

interface RoadwayGradientDrawingProps {
  currentClick?: number;
  className?: string;
}

export const RoadwayGradientDrawing: React.FC<RoadwayGradientDrawingProps> = ({
  currentClick = 0,
  className = '',
}) => {
  const isStepActive = (step: number) => currentClick >= step;

  // 7 Stations x-coordinates spread across the 300px width
  const stations = [
    { label: '0+00', x: 30, egl_y: 110, egl_val: '54.00m', fl_y: 80, fl_val: '55.00m' },
    { label: '1+00', x: 70, egl_y: 106, egl_val: '54.20m', fl_y: 82, fl_val: '54.90m' },
    { label: '2+00', x: 110, egl_y: 116, egl_val: '53.70m', fl_y: 84, fl_val: '54.80m' },
    { label: '3+00', x: 150, egl_y: 108, egl_val: '54.10m', fl_y: 86, fl_val: '54.70m' },
    { label: '4+00', x: 190, egl_y: 102, egl_val: '54.40m', fl_y: 88, fl_val: '54.60m' },
    { label: '5+00', x: 230, egl_y: 112, egl_val: '53.90m', fl_y: 90, fl_val: '54.50m' },
    { label: '6+00', x: 270, egl_y: 118, egl_val: '53.60m', fl_y: 92, fl_val: '54.40m' },
  ];

  return (
    <div className={`w-full flex flex-col justify-between bg-muted/20 p-1.5 border border-border/40 rounded-xl ${className}`}>
      <span className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground mb-0.5 block text-center">
        Longitudinal Profile &amp; Design Gradients (7 Station Grid)
      </span>

      <div className="h-44 bg-background rounded-lg border border-border/20 relative flex items-center justify-center overflow-hidden">
        <svg viewBox="0 0 300 150" className="w-full h-full select-none overflow-visible">
          {/* Station Vertical Reference Lines */}
          {stations.map((st, i) => (
            <line
              key={i}
              x1={st.x}
              y1="30"
              x2={st.x}
              y2="135"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-muted-foreground/15"
              strokeDasharray="2 2"
            />
          ))}

          {/* EGL Ground Line (Polyline) */}
          <path
            d={`M ${stations.map(st => `${st.x},${st.egl_y}`).join(' L ')}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-muted-foreground/40"
          />
          <text x="275" y="125" className="fill-muted-foreground text-[8px] font-mono">EGL</text>

          {/* EGL Elevation Nodes & Text */}
          {stations.map((st, i) => (
            <g key={i}>
              <circle cx={st.x} cy={st.egl_y} r="2.5" className="fill-muted-foreground/50" />
              <text x={st.x} y={st.egl_y + 10} textAnchor="middle" className="fill-muted-foreground text-[8px] font-mono">
                {st.egl_val}
              </text>
            </g>
          ))}

          {/* Design Gradient Line (FL) */}
          {isStepActive(1) && (
            <g className="animate-fadeIn">
              <line
                x1={stations[0]!.x}
                y1={stations[0]!.fl_y}
                x2={stations[stations.length - 1]!.x}
                y2={stations[stations.length - 1]!.fl_y}
                stroke="currentColor"
                strokeWidth="2.5"
                className="text-primary"
              />
              <text x="275" y="85" className="fill-primary text-[8px] font-mono font-bold">FL</text>

              {/* Slope Arrow and Label */}
              <path d="M 120,60 L 180,63" stroke="currentColor" strokeWidth="1" className="text-primary" markerEnd="url(#arrow)" />
              <text x="150" y="54" textAnchor="middle" className="fill-primary text-[8px] font-mono font-bold">
                Downward Slope (1 in 1000)
              </text>

              {/* FL Nodes */}
              {stations.map((st, i) => (
                <circle key={i} cx={st.x} cy={st.fl_y} r="3" className="fill-primary" />
              ))}
            </g>
          )}

          {/* Gradient Math & Calculations Layer */}
          {isStepActive(2) && (
            <g className="animate-fadeIn font-mono text-[8px] font-bold">
              {/* FL Calculation Labels */}
              {stations.map((st, i) => (
                <g key={i}>
                  <text
                    x={st.x}
                    y={st.fl_y - 6}
                    textAnchor="middle"
                    className="fill-indigo-600 dark:fill-indigo-400"
                  >
                    {st.fl_val}
                  </text>
                  {/* Station Indicators at Bottom */}
                  <text x={st.x} y="145" textAnchor="middle" className="fill-muted-foreground text-[7.5px]">
                    {st.label}
                  </text>
                </g>
              ))}

              {/* Step indicator arrow drops */}
              <path d={`M ${stations[0]!.x + 8},81 L ${stations[1]!.x - 8},82`} stroke="currentColor" strokeWidth="0.75" className="text-indigo-500/50" strokeDasharray="1.5 1" />
              <text x={(stations[0]!.x + stations[1]!.x) / 2} y="74" textAnchor="middle" className="fill-indigo-500/80 font-normal text-[6.5px]">
                -0.10m
              </text>
            </g>
          )}

          {/* Marker Definition for Arrows */}
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" className="fill-primary" />
            </marker>
          </defs>
        </svg>
      </div>

      <span className="text-[9px] text-muted-foreground text-center mt-2 leading-normal h-8">
        {!isStepActive(1)
          ? 'Surveyors measure ground levels (EGL) at 100m station chainages before designing road beds.'
          : !isStepActive(2)
            ? 'The designed formation levels (FL) follow a straight, constant slope (gradient) to keep pavements smooth.'
            : 'Downward slope of 1 in 1000 means elevation drops exactly 0.100m for every 100m chainage station interval.'}
      </span>
    </div>
  );
};
