import React from 'react';
import { useUrlSyncedState } from '@/features/presentation/hooks/useUrlSyncedState';
import { ParameterSlider, CalculationOutput, SlideParagraph } from '@/features/presentation/components/elements';
import { ExpandableDrawing } from '@/shared/components';

export const LogCuttingOptimizer: React.FC = () => {
  const [dVal, setDVal] = useUrlSyncedState<number>('opt_dia', 300); // mm

  // Optimized dimensions
  const bOpt = dVal / Math.sqrt(3); // mm
  const dOpt = dVal * Math.sqrt(2 / 3); // mm
  const Zmax = (bOpt * dOpt * dOpt) / 6; // mm³

  // Generate curve coordinates for graph of Z as a function of width b
  // Z = (b * (D^2 - b^2)) / 6
  const points = [];
  const steps = 30;
  for (let i = 0; i <= steps; i++) {
    const b = (i / steps) * dVal;
    const Z = (b * (dVal * dVal - b * b)) / 6;
    points.push({ b, Z });
  }

  // Scale coordinates for plotting
  const svgW = 160;
  const svgH = 100;
  const padding = 15;
  const graphW = svgW - padding * 2;
  const graphH = svgH - padding * 2;

  const toPxX = (b: number) => padding + (b / dVal) * graphW;
  const maxZPlot = (dVal * dVal * dVal) / (9 * Math.sqrt(3)) * 1.2; // scale boundary
  const toPxY = (Z: number) => svgH - padding - (Z / maxZPlot) * graphH;

  let pathD = `M ${toPxX(0)} ${toPxY(0)}`;
  points.forEach((pt) => {
    pathD += ` L ${toPxX(pt.b)} ${toPxY(pt.Z)}`;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full text-left items-stretch">
      {/* Parameters Panel */}
      <div className="flex flex-col justify-between gap-3 bg-muted/10 p-4 border border-border/40 rounded-xl">
        <div>
          <span className="text-[9px] font-bold text-indigo-500 uppercase tracking-widest block mb-1">
            Log Parameters
          </span>
          <SlideParagraph variant="plain" className="text-[10px] text-muted-foreground leading-normal">
            Slide the diameter D of the raw timber log to dynamically calculate the width (b) and depth (d) that maximize the section modulus.
          </SlideParagraph>
        </div>

        <div className="space-y-1.5">
          <ParameterSlider label="Log Diameter (D)" value={dVal} unit="mm" min={200} max={500} step={10} onChange={setDVal} />
        </div>

        <div className="grid grid-cols-2 gap-2 mt-1 text-[10px]">
          <CalculationOutput title="Optimized Width" value={bOpt.toFixed(1)} unit="mm" />
          <CalculationOutput title="Optimized Depth" value={dOpt.toFixed(1)} unit="mm" />
        </div>
      </div>

      {/* Visual Drawing & Optimization Plot Panel */}
      <div className="flex flex-col justify-between bg-muted/20 border border-border/50 rounded-xl p-4">
        <div>
          <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest block mb-3 text-center">
            Calculus Peak Curve (dZ/db = 0)
          </span>

          {/* Graph plot */}
          <div className="flex justify-center mb-3">
            <ExpandableDrawing title="Section Modulus Optimization Curve" description="Plots Section Modulus Z relative to cut width b, demonstrating the mathematical peak where dZ/db = 0.">
              <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-[140px] h-[80px] overflow-visible">
                <line x1={padding} y1={svgH - padding} x2={svgW - padding} y2={svgH - padding} stroke="var(--border)" strokeWidth={1} />
                <line x1={padding} y1={padding} x2={padding} y2={svgH - padding} stroke="var(--border)" strokeWidth={1} />
                
                <path d={pathD} fill="none" stroke="var(--primary)" strokeWidth={1.5} />
                
                {/* Peak Marker dot */}
                <circle cx={toPxX(bOpt)} cy={toPxY(Zmax)} r={3} fill="var(--destructive)" />
                <text x={toPxX(bOpt)} y={toPxY(Zmax) - 6} textAnchor="middle" className="fill-destructive text-[7px] font-bold font-mono">
                  dZ/db = 0
                </text>
              </svg>
            </ExpandableDrawing>
          </div>
        </div>

        <div className="flex justify-center items-center py-2 border-t border-border/30">
          <ExpandableDrawing title="Optimized Timber Cut Layout" description="Displays the optimal rectangular section (width b, depth d) inscribed inside a circular timber log diameter D.">
            <svg viewBox="0 0 100 100" className="w-[60px] h-[60px] overflow-visible">
              {/* Draw Log circle */}
              <circle cx={50} cy={50} r={40} fill="none" stroke="var(--border)" strokeWidth={1.5} />
              {/* Inscribed Rectangle */}
              {(() => {
                const scale = 40 / (dVal / 2);
                const rectW = bOpt * scale;
                const rectH = dOpt * scale;
                return (
                  <rect
                    x={50 - rectW / 2}
                    y={50 - rectH / 2}
                    width={rectW}
                    height={rectH}
                    fill="rgba(99, 102, 241, 0.08)"
                    stroke="var(--foreground)"
                    strokeWidth={1.2}
                  />
                );
              })()}
              <line x1={50 - 40 * Math.cos(Math.PI/6)} y1={50 - 40 * Math.sin(Math.PI/6)} x2={50 + 40 * Math.cos(Math.PI/6)} y2={50 + 40 * Math.sin(Math.PI/6)} stroke="var(--primary)" strokeWidth={0.8} strokeDasharray="2,2" />
              <text x={50} y={40} textAnchor="middle" className="fill-primary text-[8px] font-bold">D</text>
            </svg>
          </ExpandableDrawing>
        </div>
      </div>
    </div>
  );
};
export default LogCuttingOptimizer;
