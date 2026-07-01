import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { useUrlSyncedState } from '@/features/presentation/hooks/useUrlSyncedState';
import { ParameterSlider, CalculationOutput, SlideParagraph } from '@/features/presentation/components/elements';

export const BendingStressEnvelopeSlide: React.FC = () => {
  const [load, setLoad] = useUrlSyncedState<number>('env_load', 30); // in kN
  const [loadPos, setLoadPos] = useUrlSyncedState<number>('env_load_pos', 3); // in meters (0 to 6)
  const [width, setWidth] = useUrlSyncedState<number>('env_width', 100); // in mm
  const [height, setHeight] = useUrlSyncedState<number>('env_height', 200); // in mm

  const L = 6; // Beam length in meters

  // Calculate reactions
  // R_B = P * a / L, R_A = P - R_B where a = loadPos
  const a = loadPos;
  const Rb = (load * a) / L;
  const Ra = load - Rb;

  // Maximum Moment occurs at load position
  const Mmax = Ra * a; // in kNm

  // Section Modulus Z
  const b_m = width / 1000;
  const h_m = height / 1000;
  const Z = (b_m * h_m * h_m) / 6; // in m³

  // Maximum Stress at load position in MPa
  const sigmaMax = Mmax / (Z * 1000); // kNm / m³ -> MPa

  // Build the stress coordinates for the envelope graph
  const points = [];
  const numSteps = 50;
  for (let i = 0; i <= numSteps; i++) {
    const x = (i / numSteps) * L;
    let M = 0;
    if (x <= a) {
      M = Ra * x;
    } else {
      M = Rb * (L - x);
    }
    const stress = M / (Z * 1000); // MPa
    points.push({ x, stress });
  }

  // Graph styling
  const svgW = 320;
  const svgH = 140;
  const graphPadding = 25;
  const graphW = svgW - graphPadding * 2;
  const graphH = svgH - graphPadding * 2;

  const toPxX = (x: number) => graphPadding + (x / L) * graphW;
  // Max stress scaling factor
  const maxStressCap = 60; // scale boundary
  const toPxY = (stress: number) => svgH - graphPadding - (stress / maxStressCap) * graphH;

  // Path string for the envelope
  let pathD = `M ${toPxX(0)} ${toPxY(0)}`;
  points.forEach((pt) => {
    pathD += ` L ${toPxX(pt.x)} ${toPxY(pt.stress)}`;
  });
  pathD += ` L ${toPxX(L)} ${toPxY(0)} Z`;

  return (
    <TwoColumnLayout
      title="Bending Stress Envelope Chart"
      leftWidth="45%"
      leftContent={
        <div className="flex flex-col gap-3 text-left">
          <div>
            <span className="text-[9px] font-bold text-indigo-500 uppercase tracking-widest block mb-1">Envelope Controls</span>
            <SlideParagraph variant="plain" className="text-[10px] text-muted-foreground leading-normal">
              Observe how the bending stress changes along the span length as the concentrated load moves.
            </SlideParagraph>
          </div>

          <div className="space-y-1.5">
            <ParameterSlider label="Load (P)" value={load} unit="kN" min={10} max={60} step={5} onChange={setLoad} />
            <ParameterSlider label="Load Position (a)" value={loadPos} unit="m" min={1} max={5} step={0.5} onChange={setLoadPos} />
            <ParameterSlider label="Beam Width (b)" value={width} unit="mm" min={80} max={150} step={5} onChange={setWidth} />
            <ParameterSlider label="Beam Height (h)" value={height} unit="mm" min={150} max={300} step={10} onChange={setHeight} />
          </div>

          <div className="grid grid-cols-2 gap-2 mt-1">
            <CalculationOutput title="Max Moment" value={Mmax.toFixed(1)} unit="kNm" />
            <CalculationOutput title="Peak Stress" value={sigmaMax.toFixed(1)} unit="MPa" />
          </div>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center h-full min-h-[260px] w-full">
          <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest block mb-4">Bending Stress Envelope along Beam</span>
          
          <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full max-w-[260px] overflow-visible">
            {/* Grid baseline */}
            <line x1={graphPadding} y1={svgH - graphPadding} x2={svgW - graphPadding} y2={svgH - graphPadding} stroke="var(--border)" strokeWidth={1.5} />
            
            {/* Shaded envelope area */}
            <path d={pathD} fill="rgba(99, 102, 241, 0.12)" stroke="var(--primary)" strokeWidth={1.8} />

            {/* Peak label marker */}
            <circle cx={toPxX(a)} cy={toPxY(sigmaMax)} r={3} fill="var(--destructive)" />
            <text x={toPxX(a)} y={toPxY(sigmaMax) - 8} textAnchor="middle" className="fill-destructive text-[8px] font-bold font-mono">
              σ_max = {sigmaMax.toFixed(1)} MPa
            </text>

            {/* Load indicator line */}
            <line x1={toPxX(a)} y1={graphPadding} x2={toPxX(a)} y2={svgH - graphPadding} stroke="var(--muted-foreground)" strokeWidth={0.5} strokeDasharray="2,2" opacity={0.6} />
            
            {/* Supports indicators */}
            <polygon points={`${graphPadding},${svgH - graphPadding} ${graphPadding - 4},${svgH - graphPadding + 6} ${graphPadding + 4},${svgH - graphPadding + 6}`} fill="var(--foreground)" />
            <polygon points={`${svgW - graphPadding},${svgH - graphPadding} ${svgW - graphPadding - 4},${svgH - graphPadding + 6} ${svgW - graphPadding + 4},${svgH - graphPadding + 6}`} fill="var(--foreground)" />

            <text x={graphPadding} y={svgH - graphPadding + 14} textAnchor="middle" className="fill-muted-foreground text-[8px] font-bold">A</text>
            <text x={svgW - graphPadding} y={svgH - graphPadding + 14} textAnchor="middle" className="fill-muted-foreground text-[8px] font-bold">B</text>
          </svg>
        </div>
      }
    />
  );
};

export default BendingStressEnvelopeSlide;
