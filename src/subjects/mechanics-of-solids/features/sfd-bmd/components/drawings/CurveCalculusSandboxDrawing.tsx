import React from 'react';

export interface ICurveCalculusSandboxDrawingProps {
  currentX: number;
  showSlope: boolean;
  showArea: boolean;
  showShading: boolean;
}

export const CurveCalculusSandboxDrawing: React.FC<ICurveCalculusSandboxDrawingProps> = ({
  currentX,
  showSlope,
  showArea,
  showShading,
}) => {
  // Math equations for f(x) = -0.05*x^2 + 0.8*x + 1.0
  const f = (x: number) => -0.05 * x * x + 0.8 * x + 1.0;
  const df = (x: number) => -0.1 * x + 0.8;

  const yVal = f(currentX);
  const slopeVal = df(currentX);

  // SVG dimensions mapping
  const getSvgX = (x: number) => 40 + x * 28; // x in [0, 10] -> [40, 320]
  const getSvgY = (y: number) => 150 - y * 28; // y in [0, 5] -> [10, 150]

  // Generate curve path points
  const stepsCount = 50;
  const curvePoints: { x: number; y: number }[] = [];
  for (let i = 0; i <= stepsCount; i++) {
    const x = (i / stepsCount) * 10;
    curvePoints.push({ x, y: f(x) });
  }
  const curvePathD = `M ${getSvgX(curvePoints[0]!.x)} ${getSvgY(curvePoints[0]!.y)} ` +
    curvePoints.map(pt => `L ${getSvgX(pt.x)} ${getSvgY(pt.y)}`).join(' ');

  // Generate area shaded path points
  const areaPoints: { x: number; y: number }[] = [];
  for (let i = 0; i <= stepsCount; i++) {
    const x = (i / stepsCount) * currentX;
    areaPoints.push({ x, y: f(x) });
  }
  const areaPathD = areaPoints.length > 0
    ? `M ${getSvgX(0)} ${getSvgY(0)} ` +
    areaPoints.map(pt => `L ${getSvgX(pt.x)} ${getSvgY(pt.y)}`).join(' ') +
    ` L ${getSvgX(currentX)} ${getSvgY(0)} Z`
    : '';

  // Calculate tangent line points (length +/- 2.0 in x-direction)
  const tx1 = Math.max(0, currentX - 2.0);
  const ty1 = yVal + slopeVal * (tx1 - currentX);
  const tx2 = Math.min(10, currentX + 2.0);
  const ty2 = yVal + slopeVal * (tx2 - currentX);

  return (
    <svg className="w-full h-full overflow-visible" viewBox="0 0 360 180">
      {/* Axes baseline */}
      <line x1="30" y1="150" x2="340" y2="150" className="stroke-muted-foreground/45" strokeWidth="1.5" />
      <line x1="40" y1="20" x2="40" y2="160" className="stroke-muted-foreground/45" strokeWidth="1.5" />

      {/* Gridlines */}
      {[2, 4, 6, 8, 10].map(val => (
        <g key={val}>
          <line x1={getSvgX(val)} y1="150" x2={getSvgX(val)} y2="154" className="stroke-muted-foreground/30" strokeWidth="1" />
          <text x={getSvgX(val)} y="165" textAnchor="middle" className="text-[8px] font-mono fill-muted-foreground">{val}</text>
        </g>
      ))}
      {[1, 2, 3, 4, 5].map(val => (
        <g key={val}>
          <line x1="36" y1={getSvgY(val)} x2="40" y2={getSvgY(val)} className="stroke-muted-foreground/30" strokeWidth="1" />
          <text x="28" y={getSvgY(val) + 3} textAnchor="end" className="text-[8px] font-mono fill-muted-foreground">{val}</text>
        </g>
      ))}

      {/* Shaded Area under the curve */}
      {showShading && areaPathD && (
        <path d={areaPathD} className="fill-orange-500/25 stroke-orange-500/10 transition-all duration-300" />
      )}

      {/* Plotted Curve */}
      <path d={curvePathD} className="fill-none stroke-blue-500" strokeWidth="2.5" />

      {/* Definite Integral Bounds labels */}
      {showArea && (
        <g className="animate-in fade-in duration-300">
          <line x1={getSvgX(0)} y1={getSvgY(0)} x2={getSvgX(0)} y2={getSvgY(f(0))} className="stroke-orange-500/60" strokeWidth="1" strokeDasharray="2 2" />
          <line x1={getSvgX(currentX)} y1={getSvgY(0)} x2={getSvgX(currentX)} y2={getSvgY(yVal)} className="stroke-orange-500/60" strokeWidth="1" strokeDasharray="2 2" />
          <text x={getSvgX(currentX / 2)} y={getSvgY(0) - 10} textAnchor="middle" className="text-[12px] font-bold fill-orange-400 animate-pulse">Area</text>
        </g>
      )}

      {/* Tangent line (Slope) */}
      {showSlope && (
        <line
          x1={getSvgX(tx1)}
          y1={getSvgY(ty1)}
          x2={getSvgX(tx2)}
          y2={getSvgY(ty2)}
          className="stroke-red-500 transition-all duration-200"
          strokeWidth="2"
        />
      )}

      {/* Coordinate Point */}
      <circle
        cx={getSvgX(currentX)}
        cy={getSvgY(yVal)}
        r="5"
        className="fill-red-500 stroke-white dark:stroke-slate-950 transition-all duration-200"
        strokeWidth="1.5"
      />

      {/* Hovering coordinate readout */}
      <g transform={`translate(${getSvgX(currentX)}, ${getSvgY(yVal) - 12})`} className="transition-all duration-200">
        <rect x="-35" y="-12" width="70" height="15" rx="3" className="fill-slate-950/80 stroke-slate-800" strokeWidth="0.5" />
        <text x="0" y="-2" textAnchor="middle" className="text-[7px] font-mono fill-white font-bold">
          ({currentX.toFixed(1)}, {yVal.toFixed(2)})
        </text>
      </g>
    </svg>
  );
};
