import React, { useState, useMemo } from 'react';
import { Zap } from 'lucide-react';
import { ParameterSlider } from '@/features/presentation/components/elements/ParameterSlider';
import { CalculationOutput } from '@/features/presentation/components/elements/CalculationOutput';
import { FormulaBreakdown } from '@/features/presentation/components/elements/FormulaBreakdown';
import type { FormulaStep } from '@/features/presentation/components/elements/FormulaBreakdown';

/** Lightweight inline SVG line chart — plots volume over a parameter range */
const VolumeLineChart: React.FC<{
  length: number;
  width: number;
  depth: number;
}> = ({ length, width, depth }) => {
  const MIN_L = 1;
  const MAX_L = 12;
  const STEPS = 40;

  const points = useMemo(() => {
    return Array.from({ length: STEPS + 1 }, (_, i) => {
      const l = MIN_L + (i / STEPS) * (MAX_L - MIN_L);
      return { l: parseFloat(l.toFixed(2)), v: parseFloat((l * width * depth).toFixed(3)) };
    });
  }, [width, depth]);

  const maxV = Math.max(...points.map((p) => p.v));
  const minV = 0;

  const W = 320;
  const H = 120;
  const PAD = { t: 10, r: 12, b: 28, l: 36 };
  const chartW = W - PAD.l - PAD.r;
  const chartH = H - PAD.t - PAD.b;

  const toX = (l: number) => PAD.l + ((l - MIN_L) / (MAX_L - MIN_L)) * chartW;
  const toY = (v: number) => PAD.t + chartH - ((v - minV) / (maxV - minV || 1)) * chartH;

  const polyline = points.map((p) => `${toX(p.l).toFixed(1)},${toY(p.v).toFixed(1)}`).join(' ');
  const areaPath = [
    `M ${toX(MIN_L)} ${toY(0)}`,
    ...points.map((p) => `L ${toX(p.l).toFixed(1)} ${toY(p.v).toFixed(1)}`),
    `L ${toX(MAX_L)} ${toY(0)}`,
    'Z',
  ].join(' ');

  const curX = toX(length);
  const curY = toY(length * width * depth);
  const curV = (length * width * depth).toFixed(3);

  const yTicks = [0, maxV * 0.5, maxV].map((v) => ({
    v,
    y: toY(v),
    label: v.toFixed(2),
  }));

  const xTicks = [1, 4, 7, 10, 12].map((l) => ({
    l,
    x: toX(l),
    label: `${l}m`,
  }));

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full h-auto"
      aria-label="Volume vs Length chart"
    >
      <defs>
        <linearGradient id="vol-area-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-primary, #6366f1)" stopOpacity="0.25" />
          <stop offset="100%" stopColor="var(--color-primary, #6366f1)" stopOpacity="0.02" />
        </linearGradient>
      </defs>

      {/* Grid lines */}
      {yTicks.map(({ y, label }, i) => (
        <g key={i}>
          <line
            x1={PAD.l} y1={y} x2={W - PAD.r} y2={y}
            stroke="currentColor" strokeOpacity="0.08" strokeWidth="1"
          />
          <text
            x={PAD.l - 4} y={y + 3}
            textAnchor="end" fontSize="7" fill="currentColor" fillOpacity="0.5"
          >
            {label}
          </text>
        </g>
      ))}

      {/* X axis ticks */}
      {xTicks.map(({ x, label }, i) => (
        <g key={i}>
          <line
            x1={x} y1={PAD.t + chartH} x2={x} y2={PAD.t + chartH + 3}
            stroke="currentColor" strokeOpacity="0.3" strokeWidth="1"
          />
          <text
            x={x} y={H - 4}
            textAnchor="middle" fontSize="7" fill="currentColor" fillOpacity="0.5"
          >
            {label}
          </text>
        </g>
      ))}

      {/* Area fill */}
      <path d={areaPath} fill="url(#vol-area-grad)" />

      {/* Line */}
      <polyline
        points={polyline}
        fill="none"
        stroke="var(--color-primary, #6366f1)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Current value indicator */}
      <line
        x1={curX} y1={PAD.t} x2={curX} y2={PAD.t + chartH}
        stroke="var(--color-primary, #6366f1)" strokeOpacity="0.4"
        strokeWidth="1" strokeDasharray="3,3"
      />
      <circle
        cx={curX} cy={curY} r="4"
        fill="var(--color-primary, #6366f1)"
        stroke="white" strokeWidth="1.5"
      />
      <text
        x={Math.min(curX + 5, W - PAD.r - 28)} y={Math.max(curY - 6, PAD.t + 8)}
        fontSize="7.5" fill="var(--color-primary, #6366f1)" fontWeight="700"
      >
        {curV} m³
      </text>

      {/* Axis labels */}
      <text
        x={PAD.l + chartW / 2} y={H - 1}
        textAnchor="middle" fontSize="7" fill="currentColor" fillOpacity="0.4"
      >
        Beam Length (m)
      </text>
    </svg>
  );
};

export const InteractiveDemoSection: React.FC = () => {
  const [length, setLength] = useState(6.0);
  const [width, setWidth] = useState(0.4);
  const [depth, setDepth] = useState(0.3);

  const volume = useMemo(
    () => parseFloat((length * width * depth).toFixed(3)),
    [length, width, depth]
  );

  const formulaSteps: FormulaStep[] = [
    {
      label: 'General Form',
      formula: 'V = L \\times W \\times D',
    },
    {
      label: 'Substitution',
      formula: `V = ${length.toFixed(2)} \\times ${width.toFixed(2)} \\times ${depth.toFixed(2)}`,
    },
    {
      label: 'Result',
      formula: `V = ${volume} \\, \\text{m}^3`,
      highlight: true,
    },
  ];

  return (
    <div className="flex flex-col gap-6 text-left animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 border-b pb-3">
          <Zap className="h-5 w-5 text-primary" />
          <h3 className="text-base font-extrabold text-foreground">Interactive Calculation Demo</h3>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed mt-3">
          This demonstrates how slides in this platform can host live interactive inputs connected
          to real-time formula substitutions and chart updates. Adjust the sliders or type directly
          to see every layer of the calculation update instantly.
        </p>
      </div>

      {/* Main demo grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Left: Inputs + Formula */}
        <div className="flex flex-col gap-4">
          {/* Input sliders */}
          <div className="border border-border bg-card p-4 rounded-2xl flex flex-col gap-3 shadow-sm">
            <h4 className="text-[10px] font-bold font-mono uppercase tracking-wider text-primary border-b pb-1.5">
              Concrete Beam Parameters
            </h4>
            <ParameterSlider
              label="Beam Length (L)"
              value={length}
              unit="m"
              min={1}
              max={12}
              step={0.1}
              onChange={setLength}
              showInput
              showSlider
            />
            <ParameterSlider
              label="Beam Width (W)"
              value={width}
              unit="m"
              min={0.1}
              max={1.0}
              step={0.05}
              onChange={setWidth}
              showInput
              showSlider
            />
            <ParameterSlider
              label="Beam Depth (D)"
              value={depth}
              unit="m"
              min={0.1}
              max={1.0}
              step={0.05}
              onChange={setDepth}
              showInput
              showSlider
            />
          </div>

          {/* Formula breakdown */}
          <div className="border border-border bg-card p-4 rounded-2xl flex flex-col gap-3 shadow-sm">
            <h4 className="text-[10px] font-bold font-mono uppercase tracking-wider text-primary border-b pb-1.5">
              Live Formula Substitution
            </h4>
            <FormulaBreakdown steps={formulaSteps} />
          </div>

          {/* Output */}
          <CalculationOutput
            title="Concrete Volume"
            value={volume}
            unit="m³"
          />
        </div>

        {/* Right: Line Chart */}
        <div className="border border-border bg-card p-4 rounded-2xl flex flex-col gap-3 shadow-sm">
          <h4 className="text-[10px] font-bold font-mono uppercase tracking-wider text-primary border-b pb-1.5">
            Volume vs. Beam Length — Live Chart
          </h4>
          <p className="text-[10px] text-muted-foreground leading-relaxed">
            The chart plots concrete volume across the full length range (1–12 m), holding
            current width & depth fixed. The dot tracks the currently set length value.
          </p>
          <div className="flex-1 flex items-center justify-center py-2 bg-muted/10 border border-dashed rounded-xl overflow-hidden">
            <VolumeLineChart length={length} width={width} depth={depth} />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: 'Length', value: `${length.toFixed(2)} m` },
              { label: 'Width × Depth', value: `${(width * depth).toFixed(3)} m²` },
              { label: 'Volume', value: `${volume} m³` },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-2 bg-muted/30 rounded-lg">
                <p className="text-[9px] text-muted-foreground font-mono uppercase">{stat.label}</p>
                <p className="text-xs font-bold text-foreground mt-0.5 font-mono">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Usage note */}
      <div className="text-[10px] text-muted-foreground leading-relaxed border border-border/50 rounded-xl px-4 py-3 bg-muted/10">
        <strong className="text-foreground">Reusable components used here:</strong>{' '}
        <code>ParameterSlider</code> (with <code>showInput</code> + <code>showSlider</code>),{' '}
        <code>FormulaBreakdown</code> (new — import from{' '}
        <code>@/features/presentation/components/elements/FormulaBreakdown</code>),{' '}
        <code>CalculationOutput</code>. All components are mode-aware and work in both Slide Mode
        and Blog Mode.
      </div>
    </div>
  );
};

export default InteractiveDemoSection;
