import React from 'react';
import { useUrlSyncedState } from '@/features/presentation/hooks/useUrlSyncedState';
import { ParameterSlider, CalculationOutput, SlideParagraph } from '@/features/presentation/components/elements';
import { ExpandableDrawing } from '@/shared/components';

export const TaperedBeamOptimizer: React.FC = () => {
  const [h0, setH0] = useUrlSyncedState<number>('taper_h0', 150); // mm
  const [k, setK] = useUrlSyncedState<number>('taper_k', 0.10); // slope

  const b = 100; // mm
  const L = 2000; // mm (2.0 m)
  const P = 15000; // N (15 kN)

  // Critical section from the free end
  // x_crit = h0 / k
  const xCrit = h0 / k; // mm
  const isInside = xCrit <= L;
  const peakX = isInside ? xCrit : L;

  // Maximum stress at peak location
  // M = P * x
  // Z = b * (h0 + k * x)^2 / 6
  // sigma = M / Z = 6 * P * x / (b * (h0 + k * x)^2)
  const peakM_Nmm = P * peakX;
  const peakH = h0 + k * peakX;
  const peakZ = (b * Math.pow(peakH, 2)) / 6;
  const peakStress_MPa = peakM_Nmm / peakZ;

  // Generate stress curve coordinates for visual graph
  const points = [];
  const steps = 40;
  for (let i = 0; i <= steps; i++) {
    const x = (i / steps) * L;
    const h = h0 + k * x;
    const Z = (b * Math.pow(h, 2)) / 6;
    const M = P * x;
    const stress = x === 0 ? 0 : M / Z;
    points.push({ x, stress });
  }

  // Scale coordinates for plotting
  const svgW = 200;
  const svgH = 100;
  const padding = 15;
  const graphW = svgW - padding * 2;
  const graphH = svgH - padding * 2;

  const toPxX = (x: number) => padding + (x / L) * graphW;
  const maxStressPlot = Math.max(...points.map(p => p.stress)) * 1.2 || 1;
  const toPxY = (stress: number) => svgH - padding - (stress / maxStressPlot) * graphH;

  let pathD = `M ${toPxX(0)} ${toPxY(0)}`;
  points.forEach((pt) => {
    pathD += ` L ${toPxX(pt.x)} ${toPxY(pt.stress)}`;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full text-left items-stretch">
      {/* Parameters Panel */}
      <div className="flex flex-col justify-between gap-3 bg-muted/30 dark:bg-muted/10 p-4 border border-border/40 rounded-xl">
        <div>
          <span className="text-[9px] font-bold text-indigo-500 uppercase tracking-widest block mb-1">
            Taper Parameters
          </span>
          <SlideParagraph variant="plain" className="text-[10px] text-muted-foreground leading-normal">
            Adjust the baseline depth at the free end (h₀) and the linear taper rate (k) to locate the maximum bending stress.
          </SlideParagraph>
        </div>

        <div className="space-y-2">
          <ParameterSlider label="End Depth (h₀)" value={h0} unit="mm" min={100} max={250} step={10} onChange={setH0} />
          <ParameterSlider label="Taper Rate (k)" value={k} unit="mm/mm" min={0.05} max={0.25} step={0.01} onChange={setK} />
        </div>

        <div className="grid grid-cols-2 gap-2 mt-1 text-[10px]">
          <CalculationOutput title="Peak Stress Location" value={xCrit.toFixed(0)} unit="mm" className="font-mono text-indigo-500 font-bold" />
          <CalculationOutput title="Max Stress" value={peakStress_MPa.toFixed(1)} unit="MPa" className="font-mono" />
        </div>
      </div>

      {/* Visual Drawing Card with Modal Zoom */}
      <div className="flex flex-col justify-between bg-muted/20 border border-border/40 rounded-xl p-4">
        <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest block mb-3 text-center">
          Bending Stress Envelope (σ_xx)
        </span>

        <div className="flex-1 flex justify-center items-center h-[130px]">
          <ExpandableDrawing title="Tapered Cantilever Stress Distribution">
            <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-[160px] h-[100px] overflow-visible">
              {/* Axes */}
              <line x1={padding} y1={svgH - padding} x2={svgW - padding} y2={svgH - padding} stroke="var(--border)" strokeWidth={1} />
              <line x1={padding} y1={padding} x2={padding} y2={svgH - padding} stroke="var(--border)" strokeWidth={1} />

              <text x={svgW - padding} y={svgH - padding + 10} textAnchor="end" className="fill-muted-foreground text-[6px] font-bold">Fixed Wall (x=2.0m)</text>
              <text x={padding} y={svgH - padding + 10} textAnchor="start" className="fill-muted-foreground text-[6px] font-bold">Free End</text>

              {/* Stress Envelope Curve */}
              <path d={pathD} fill="none" stroke="var(--primary)" strokeWidth={1.5} />

              {/* Peak Marker dot */}
              <circle cx={toPxX(peakX)} cy={toPxY(peakStress_MPa)} r={3} fill="var(--destructive)" />
              <text x={toPxX(peakX)} y={toPxY(peakStress_MPa) - 6} textAnchor="middle" className="fill-destructive text-[7px] font-bold font-mono">
                {xCrit.toFixed(0)} mm
              </text>
            </svg>
          </ExpandableDrawing>
        </div>
      </div>
    </div>
  );
};
export default TaperedBeamOptimizer;
