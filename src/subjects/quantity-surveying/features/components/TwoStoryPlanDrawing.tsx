import React, { useContext } from 'react';
import { PlanDrawingCanvas } from '@/features/building-drawing/components/PlanDrawingCanvas';
import { PlanLayoutSchema, ElementColorOverride } from '@/features/building-drawing/types/layoutSchema';
import { PresentationContext } from '@/features/presentation/context/PresentationContext';

interface TwoStoryPlanDrawingProps {
  activeStep: number; // 1 to 5 matching the ledger sequence
  className?: string;
}

export const TwoStoryPlanDrawing: React.FC<TwoStoryPlanDrawingProps> = ({
  activeStep,
  className = '',
}) => {
  const presentation = useContext(PresentationContext);
  const isBlog = presentation?.viewMode === 'blog';

  // Define grid axis locations
  const grid = {
    xAxes: [
      { id: '1', offset: 40, label: '1' },
      { id: '2', offset: 180, label: '2' },
      { id: '3', offset: 320, label: '3' },
    ],
    yAxes: [
      { id: 'A', offset: 50, label: 'A' },
      { id: 'B', offset: 170, label: 'B' },
    ],
  };

  // Helper to color/highlight walls depending on the active step
  const getWallHighlights = (isCrossWall: boolean): ElementColorOverride[] => {
    // Step 3: Stepped Foundation Masonry (Brick/R.R.)
    if (activeStep === 3) {
      return [
        {
          startFraction: 0.0,
          endFraction: 1.0,
          fillClass: isCrossWall ? 'fill-amber-600/30' : 'fill-primary/30',
          strokeClass: isCrossWall ? 'stroke-amber-600 dark:stroke-amber-400' : 'stroke-primary',
        },
      ];
    }
    // Step 5: Damp Proof Course (DPC)
    if (activeStep === 5) {
      // DPC is applied on all walls (outer and cross wall)
      return [
        {
          startFraction: 0.0,
          endFraction: 1.0,
          fillClass: 'fill-teal-500/20',
          strokeClass: 'stroke-teal-500 dark:stroke-teal-400',
        },
      ];
    }
    return [];
  };

  const schema: PlanLayoutSchema = {
    grid,
    columns: [],
    beams: [
      {
        id: 'outer-top',
        startNodeId: '1-A',
        endNodeId: '3-A',
        thickness: 24, // 250mm external wall
        highlights: getWallHighlights(false),
      },
      {
        id: 'outer-bottom',
        startNodeId: '1-B',
        endNodeId: '3-B',
        thickness: 24,
        highlights: getWallHighlights(false),
      },
      {
        id: 'outer-left',
        startNodeId: '1-A',
        endNodeId: '1-B',
        thickness: 24,
        highlights: getWallHighlights(false),
      },
      {
        id: 'outer-right',
        startNodeId: '3-A',
        endNodeId: '3-B',
        thickness: 24,
        highlights: getWallHighlights(false),
      },
      {
        id: 'internal-cross',
        startNodeId: '2-A',
        endNodeId: '2-B',
        thickness: 12, // 125mm partition wall
        highlights: getWallHighlights(true),
      },
    ],
    slabs: [],
  };

  // SVG coordinate dimensions
  const x1 = 40;
  const x2 = 180;
  const x3 = 320;
  const yA = 50;
  const yB = 170;

  // Offsets for excavation/cc bedding width projections
  const projection = 16; 

  const containerClasses = isBlog
    ? 'bg-transparent border-none shadow-none p-0 flex flex-col items-center select-none w-full'
    : 'relative border border-border/40 bg-muted/10 dark:bg-muted/5 rounded-xl p-3 flex flex-col items-center shadow-xs select-none w-full h-full justify-center min-h-[300px]';

  return (
    <div className={`${containerClasses} ${className}`}>
      <span className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground mb-2">
        Building Substructure Layout Plan
      </span>
      <div className="w-full flex-1 min-h-[220px]">
        <PlanDrawingCanvas
          schema={schema}
          activeElementId=""
          onSelectElement={() => {}}
          onChangeSchema={() => {}}
          className="w-full h-full bg-transparent border-none min-h-[220px]"
        >
          {/* Step 1: Earthwork Excavation (Wide outer and inner trenches) */}
          {activeStep === 1 && (
            <g className="opacity-70 animate-fadeIn">
              {/* Outer Trench */}
              <rect
                x={x1 - projection}
                y={yA - projection}
                width={(x3 - x1) + 2 * projection}
                height={(yB - yA) + 2 * projection}
                fill="none"
                stroke="var(--chart-2)"
                strokeWidth={projection * 2}
                opacity="0.35"
                rx="4"
              />
              {/* Inner Cross Wall Trench */}
              <line
                x1={x2}
                y1={yA}
                x2={x2}
                y2={yB}
                stroke="var(--chart-2)"
                strokeWidth={projection * 1.5}
                opacity="0.35"
              />
              <text x="200" y="28" className="fill-amber-500 font-sans font-bold text-[8.5px]" textAnchor="middle">
                Trench Excavation Bounds Highlighted
              </text>
            </g>
          )}

          {/* Step 2: Concrete Bedding (CC Bedding base layer) */}
          {activeStep === 2 && (
            <g className="opacity-70 animate-fadeIn">
              {/* Outer CC Bedding */}
              <rect
                x={x1 - projection}
                y={yA - projection}
                width={(x3 - x1) + 2 * projection}
                height={(yB - yA) + 2 * projection}
                fill="none"
                stroke="var(--chart-5)"
                strokeWidth={projection * 1.8}
                opacity="0.4"
                rx="3"
              />
              {/* Inner Cross Wall CC Bedding */}
              <line
                x1={x2}
                y1={yA}
                x2={x2}
                y2={yB}
                stroke="var(--chart-5)"
                strokeWidth={projection * 1.3}
                opacity="0.4"
              />
              <text x="200" y="28" className="fill-blue-500 font-sans font-bold text-[8.5px]" textAnchor="middle">
                Mass Concrete (1:4:8 / 1:5:10) Bedding Base
              </text>
            </g>
          )}

          {/* Step 4: Earth Filling (Plinth and Trenches) */}
          {activeStep === 4 && (
            <g className="animate-fadeIn">
              {/* Room 1 Plinth Filling (strictly internal dimensions) */}
              <rect
                x={x1 + 12}
                y={yA + 12}
                width={(x2 - x1) - 24}
                height={(yB - yA) - 24}
                fill="var(--chart-2)"
                fillOpacity="0.25"
                stroke="var(--chart-2)"
                strokeWidth="1"
                strokeDasharray="2,2"
              />
              {/* Room 2 Plinth Filling (strictly internal dimensions) */}
              <rect
                x={x2 + 12}
                y={yA + 12}
                width={(x3 - x2) - 24}
                height={(yB - yA) - 24}
                fill="var(--chart-2)"
                fillOpacity="0.25"
                stroke="var(--chart-2)"
                strokeWidth="1"
                strokeDasharray="2,2"
              />
              <text x="110" y="110" className="fill-amber-600 dark:fill-amber-400 font-bold text-[8px]" textAnchor="middle">
                Room 1 Plinth Filling
              </text>
              <text x="250" y="110" className="fill-amber-600 dark:fill-amber-400 font-bold text-[8px]" textAnchor="middle">
                Room 2 Plinth Filling
              </text>
              <text x="200" y="28" className="fill-amber-500 font-sans font-bold text-[8.5px]" textAnchor="middle">
                Filling: Trenches (Reused Soil) &amp; Plinth (Internal Only)
              </text>
            </g>
          )}

          {/* Step 5: DPC Door Opening Deductions Marker */}
          {activeStep === 5 && (
            <g className="animate-fadeIn">
              {/* Door 1 sill deduction marker at x = 110, y = 170 (front wall) */}
              <circle cx="110" cy={yB} r="5" fill="var(--destructive)" />
              <line x1="107" y1={yB - 3} x2="113" y2={yB + 3} stroke="white" strokeWidth="1.5" />
              <line x1="107" y1={yB + 3} x2="113" y2={yB - 3} stroke="white" strokeWidth="1.5" />
              <text x="110" y={yB + 14} className="fill-destructive font-mono font-bold text-[7px]" textAnchor="middle">Ddt</text>

              {/* Door 2 sill deduction marker at x = 250, y = 170 (front wall) */}
              <circle cx="250" cy={yB} r="5" fill="var(--destructive)" />
              <line x1="247" y1={yB - 3} x2="253" y2={yB + 3} stroke="white" strokeWidth="1.5" />
              <line x1="247" y1={yB + 3} x2="253" y2={yB - 3} stroke="white" strokeWidth="1.5" />
              <text x="250" y={yB + 14} className="fill-destructive font-mono font-bold text-[7px]" textAnchor="middle">Ddt</text>

              {/* Door 3 sill deduction marker at x = 180, y = 110 (partition wall door) */}
              <circle cx={x2} cy="110" r="5" fill="var(--destructive)" />
              <line x1={x2 - 3} y1="107" x2={x2 + 3} y2="113" stroke="white" strokeWidth="1.5" />
              <line x1={x2 - 3} y1="113" x2={x2 + 3} y2="107" stroke="white" strokeWidth="1.5" />
              <text x={x2 + 10} y="112" className="fill-destructive font-mono font-bold text-[7px]" textAnchor="start">Ddt</text>

              <text x="200" y="28" className="fill-teal-600 dark:fill-teal-400 font-sans font-bold text-[8.5px]" textAnchor="middle">
                DPC Applied with Door Sill Area Deductions
              </text>
            </g>
          )}

          {/* Overall Dimensions Overlay */}
          <text x={x1 + 10} y={yA - 8} className="fill-muted-foreground font-mono text-[7px]">Ext Wall: 250mm</text>
          <text x={x2 + 6} y={yA + 25} className="fill-muted-foreground font-mono text-[7px]">Int Wall: 125mm</text>
        </PlanDrawingCanvas>
      </div>
    </div>
  );
};
