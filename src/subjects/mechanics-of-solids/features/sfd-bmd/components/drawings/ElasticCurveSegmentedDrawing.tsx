import React from 'react';
import { SFDBmdService } from '@/subjects/mechanics-of-solids/cores/sfd-bmd/sfdBmdService';
import { DeflectionService } from '@/subjects/mechanics-of-solids/cores/deflection/deflectionService';

interface ElasticCurveSegmentedDrawingProps {
  activeStep: number; // 0: beam, 1: BMD, 2: signs, 3: left segments sag, 4: all segments curved, 5: connected, 6: inflection point
}

export const ElasticCurveSegmentedDrawing: React.FC<ElasticCurveSegmentedDrawingProps> = ({
  activeStep,
}) => {
  const beamLength = 32.0; // 32 ft total
  const scale = 360 / beamLength; // 11.25 px/ft
  const getSvgX = (x: number) => 70 + x * scale;

  const nodeAX = getSvgX(0); // 70 (pinned support A)
  const nodeCX = getSvgX(6.0); // 137.5 (node C)
  const nodeDX = getSvgX(14.0); // 227.5 (node D)
  const nodeEX = getSvgX(24.0); // 340 (roller support E)
  const nodeBX = getSvgX(32.0); // 430 (overhang tip B)
  const nodeIPX = getSvgX(20.57); // 301.4 (inflection point IP)

  const yBeam = 42;
  const yBmd = 90;
  const yDeflection = 136;

  // Real beam configuration for the overhanging multi-load problem
  const beamConfig = React.useMemo(() => ({
    length: 32.0,
    supports: [
      { id: 'A', type: 'hinge' as const, position: 0 },
      { id: 'E', type: 'roller' as const, position: 24.0 }
    ],
    releases: [],
    loads: [
      { id: 'PC', type: 'point' as const, position: 6.0, magnitude: 20.0 },
      { id: 'PD', type: 'point' as const, position: 14.0, magnitude: 12.0 },
      { id: 'w', type: 'udl' as const, startPosition: 24.0, endPosition: 32.0, magnitude: 1.5 }
    ],
    eiSegments: [{ id: 'ei-1', startPosition: 0, endPosition: 32.0, E: 200, I: 100 }]
  }), []);

  // Solve reactions and moment diagram dynamically
  const solver = React.useMemo(() => new SFDBmdService(), []);
  const solverResult = React.useMemo(() => solver.solve(beamConfig), [solver, beamConfig]);

  // Solve deflection diagram dynamically using core Double Integration deflection engine
  const deflectionSolver = React.useMemo(() => new DeflectionService(), []);
  const deflectionResult = React.useMemo(() => {
    if (!solverResult.success) return { success: false, points: [], criticalPoints: [] };
    return deflectionSolver.calculateDeflection(
      beamConfig,
      solverResult.reactions,
      solverResult.intervals,
      beamConfig.eiSegments,
      'double-integration',
      null
    );
  }, [deflectionSolver, beamConfig, solverResult]);

  // Evaluates polynomial coefficients at coordinate x
  const evalPoly = (coeffs: number[], x: number): number => {
    let val = 0;
    for (let i = 0; i < coeffs.length; i++) {
      const c = coeffs[i];
      if (c !== undefined) {
        val = val * x + c;
      }
    }
    return val;
  };

  // Helper to query moment value at any x
  const getMomentAt = React.useCallback((x: number): number => {
    if (!solverResult.success) return 0;
    const interval = solverResult.intervals.find(
      inv => x >= inv.startX - 1e-9 && x <= inv.endX + 1e-9
    );
    if (!interval) return 0;
    return evalPoly(interval.mCoeffs, x);
  }, [solverResult]);

  // Helper to query solved deflection at any x
  const getSolvedDeflectionAt = React.useCallback((x: number): number => {
    if (!deflectionResult.success || deflectionResult.points.length === 0) return 0;
    const points = deflectionResult.points;
    const rightIndex = points.findIndex(p => p.x >= x);
    const lastPoint = points[points.length - 1];
    const firstPoint = points[0];
    if (rightIndex === -1) return lastPoint ? lastPoint.deflection : 0;
    if (rightIndex === 0) return firstPoint ? firstPoint.deflection : 0;
    const p1 = points[rightIndex - 1];
    const p2 = points[rightIndex];
    if (!p1 || !p2) return 0;
    const fraction = (x - p1.x) / (p2.x - p1.x);
    return p1.deflection + fraction * (p2.deflection - p1.deflection);
  }, [deflectionResult]);

  // Maximum deflection in the span (for visual scaling)
  const maxDeflection = React.useMemo(() => {
    if (!deflectionResult.success || deflectionResult.points.length === 0) return 1.0;
    let maxVal = 0.001;
    deflectionResult.points.forEach(p => {
      const absVal = Math.abs(p.deflection);
      if (absVal > maxVal) maxVal = absVal;
    });
    return maxVal;
  }, [deflectionResult]);

  // Generate paths for connected deflected wave (Steps 5 & 6)
  const leftPoints: string[] = [];
  const rightPoints: string[] = [];

  // Span A-IP (0 to 20.57 ft)
  for (let i = 0; i <= 35; i++) {
    const x = (20.57 * i) / 35;
    const svgX = getSvgX(x);
    const dy = 16 * Math.sin((Math.PI * x) / 20.57);
    leftPoints.push(`${svgX.toFixed(1)},${(yBeam + dy).toFixed(1)}`);
  }
  // Span IP-E (20.57 to 24 ft)
  for (let i = 0; i <= 15; i++) {
    const x = 20.57 + (3.43 * i) / 15;
    const svgX = getSvgX(x);
    const dy = -6 * Math.sin((Math.PI * (x - 20.57)) / 3.43);
    rightPoints.push(`${svgX.toFixed(1)},${(yBeam + dy).toFixed(1)}`);
  }
  // Overhang E-B (24 to 32 ft) - deflects upward due to heavy span loading
  for (let i = 1; i <= 15; i++) {
    const x = 24.0 + (8.0 * i) / 15;
    const svgX = getSvgX(x);
    const dy = -6 * (x - 24.0) / 8.0 - 8 * ((x - 24.0) / 8.0) ** 2;
    rightPoints.push(`${svgX.toFixed(1)},${(yBeam + dy).toFixed(1)}`);
  }

  const connectedPath = `M ${[...leftPoints, ...rightPoints].join(' L ')}`;

  // Helper to generate path for individual isolated segments (Steps 3 & 4)
  const getSegmentPath = (xStart: number, xEnd: number, isSagging: boolean, yOffset: number) => {
    const points: string[] = [];
    const len = xEnd - xStart;
    for (let i = 0; i <= 15; i++) {
      const x = xStart + (len * i) / 15;
      const svgX = getSvgX(x);
      let dy = 0;
      if (isSagging) {
        // Concave down smile shape
        dy = 8 * Math.sin((Math.PI * (x - xStart)) / len) + yOffset;
      } else {
        // Convex up frown shape
        dy = -8 * Math.sin((Math.PI * (x - xStart)) / len) + yOffset;
      }
      points.push(`${svgX.toFixed(1)},${(yBeam + dy).toFixed(1)}`);
    }
    return `M ${points.join(' L ')}`;
  };

  // Generate coordinates for the solved BMD diagram (Step 2+)
  const bmdPoints: string[] = [];
  const bmdSteps = 60;
  for (let i = 0; i <= bmdSteps; i++) {
    const x = (beamLength * i) / bmdSteps;
    const svgX = getSvgX(x);
    const m = getMomentAt(x);
    const scaleY = 16 / 108;
    const svgY = yBmd + m * scaleY;
    bmdPoints.push(`${svgX.toFixed(1)},${svgY.toFixed(1)}`);
  }
  const solvedBmdPath = `M ${bmdPoints.join(' L ')}`;

  // Generate coordinates for the solved Deflection diagram (Step 6+)
  const deflPoints: string[] = [];
  for (let i = 0; i <= bmdSteps; i++) {
    const x = (beamLength * i) / bmdSteps;
    const svgX = getSvgX(x);
    const yVal = getSolvedDeflectionAt(x);
    // Invert scale: positive mathematical coordinate points upwards, so yDeflection - dy
    const svgY = yDeflection - (yVal / maxDeflection) * 14;
    deflPoints.push(`${svgX.toFixed(1)},${svgY.toFixed(1)}`);
  }
  const solvedDeflPath = `M ${deflPoints.join(' L ')}`;

  // Visibility logic
  const showBeamAndLoads = activeStep <= 2;
  const showSegmentedHogging = activeStep === 4;
  const showConnectedCurve = activeStep >= 5;
  const showDeflectionChart = activeStep >= 5;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center select-none">
      <svg className="w-full max-w-full h-full overflow-visible" viewBox="55 10 390 152">
        {/* Ground baseline (only visible in static steps) */}
        {showBeamAndLoads && (
          <line
            x1="40"
            y1={yBeam}
            x2="460"
            y2={yBeam}
            className="stroke-slate-350 dark:stroke-slate-700/60"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
        )}

        {/* Support A (Pin at x=0) */}
        <g>
          <polygon
            points={`${nodeAX - 6},${yBeam + 11} ${nodeAX},${yBeam} ${nodeAX + 6},${yBeam + 11}`}
            className="fill-slate-400 dark:fill-slate-500 stroke-slate-500"
            strokeWidth="1"
          />
          <line
            x1={nodeAX - 10}
            y1={yBeam + 11}
            x2={nodeAX + 10}
            y2={yBeam + 11}
            className="stroke-slate-500"
            strokeWidth="1.2"
          />
          <text x={nodeAX} y={yBeam - 12} textAnchor="middle" className="text-[10px] font-black fill-slate-500">
            A
          </text>
        </g>

        {/* Support E (Roller at x=24ft) */}
        <g>
          <polygon
            points={`${nodeEX - 6},${yBeam + 10} ${nodeEX},${yBeam} ${nodeEX + 6},${yBeam + 10}`}
            className="fill-slate-400 dark:fill-slate-500 stroke-slate-500"
            strokeWidth="1"
          />
          <circle cx={nodeEX - 3} cy={yBeam + 12} r={1.5} className="fill-slate-400 dark:fill-slate-500" />
          <circle cx={nodeEX + 3} cy={yBeam + 12} r={1.5} className="fill-slate-400 dark:fill-slate-500" />
          <line
            x1={nodeEX - 10}
            y1={yBeam + 14}
            x2={nodeEX + 10}
            y2={yBeam + 14}
            className="stroke-slate-500"
            strokeWidth="1.2"
          />
          <text x={nodeEX} y={yBeam - 12} textAnchor="middle" className="text-[10px] font-black fill-slate-500">
            E
          </text>
        </g>

        {/* Overhanging Beam label at tip B */}
        <text x={nodeBX} y={yBeam - 12} textAnchor="middle" className="text-[10px] font-black fill-slate-500">
          B
        </text>

        {/* ==================== ACTIVE LOADINGS (Only in step 0, 1, 2) ==================== */}
        {showBeamAndLoads && (
          <g className="opacity-90 transition-all duration-300">
            {/* Point Load C: 20 kips */}
            <path d={`M ${nodeCX},17 L ${nodeCX},36 M ${nodeCX - 3.5},30 L ${nodeCX},36 L ${nodeCX + 3.5},30`} fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <text x={nodeCX} y="13" textAnchor="middle" className="text-[7.5px] font-mono font-bold fill-blue-600">20 kips</text>

            {/* Point Load D: 12 kips */}
            <path d={`M ${nodeDX},17 L ${nodeDX},36 M ${nodeDX - 3.5},30 L ${nodeDX},36 L ${nodeDX + 3.5},30`} fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <text x={nodeDX} y="13" textAnchor="middle" className="text-[7.5px] font-mono font-bold fill-blue-600">12 kips</text>

            {/* UDL Overhang E to B: 1.5 kips/ft */}
            <line x1={nodeEX} y1="23" x2={nodeBX} y2="23" className="stroke-blue-500/80" strokeWidth="0.8" />
            {Array.from({ length: 9 }).map((_, i) => {
              const xVal = nodeEX + (nodeBX - nodeEX) * (i / 8);
              return (
                <path
                  key={i}
                  d={`M ${xVal.toFixed(1)},23 L ${xVal.toFixed(1)},36 M ${(xVal - 2).toFixed(1)},32 L ${xVal.toFixed(1)},36 L ${(xVal + 2).toFixed(1)},32`}
                  fill="none"
                  className="stroke-blue-500/80"
                  strokeWidth="0.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              );
            })}
            <text x={(nodeEX + nodeBX) / 2} y="19" textAnchor="middle" className="text-[7.5px] font-mono font-bold fill-blue-600">1.5 kips/ft</text>
          </g>
        )}

        {/* ==================== BEAM DRAWINGS ==================== */}
        {/* Step 0, 1, 2: Straight Beam */}
        {showBeamAndLoads && (
          <line
            x1={nodeAX}
            y1={yBeam}
            x2={nodeBX}
            y2={yBeam}
            className="stroke-slate-200 dark:stroke-slate-800"
            strokeWidth="6"
            strokeLinecap="round"
          />
        )}

        {/* Step 3: Segmented Sagging segments shown curved, hogging segments straight/hidden */}
        {activeStep === 3 && (
          <g className="animate-in fade-in duration-300">
            {/* Zone 1: A to C (Sagging) */}
            <path
              d={getSegmentPath(0, 6.0, true, 4)}
              fill="none"
              className="stroke-indigo-500 dark:stroke-indigo-400"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
            {/* Zone 2: C to D (Sagging) */}
            <path
              d={getSegmentPath(6.0, 14.0, true, 8)}
              fill="none"
              className="stroke-indigo-500 dark:stroke-indigo-400"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
            {/* Zone 3: D to IP (Sagging) */}
            <path
              d={getSegmentPath(14.0, 20.57, true, 4)}
              fill="none"
              className="stroke-indigo-500 dark:stroke-indigo-400"
              strokeWidth="4.5"
              strokeLinecap="round"
            />

            {/* Dotted lines at boundaries */}
            <line x1={nodeCX} y1={yBeam - 12} x2={nodeCX} y2={yBeam + 20} className="stroke-slate-400/40 stroke-[0.8]" strokeDasharray="2 2" />
            <line x1={nodeDX} y1={yBeam - 12} x2={nodeDX} y2={yBeam + 20} className="stroke-slate-400/40 stroke-[0.8]" strokeDasharray="2 2" />
            <line x1={nodeIPX} y1={yBeam - 12} x2={nodeIPX} y2={yBeam + 20} className="stroke-slate-400/50 stroke-[0.8]" strokeDasharray="2 2" />

            <text x={nodeIPX - 8} y={yBeam + 22} className="text-[7px] font-bold fill-indigo-600 animate-pulse" textAnchor="end">Sagging zones activated (Smile)</text>
          </g>
        )}

        {/* Step 4: All segments curved (disconnected) */}
        {showSegmentedHogging && (
          <g className="animate-in fade-in duration-300">
            {/* Zone 1: A to C (Sagging) */}
            <path
              d={getSegmentPath(0, 6.0, true, 4)}
              fill="none"
              className="stroke-indigo-500 dark:stroke-indigo-400"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
            {/* Zone 2: C to D (Sagging) */}
            <path
              d={getSegmentPath(6.0, 14.0, true, 8)}
              fill="none"
              className="stroke-indigo-500 dark:stroke-indigo-400"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
            {/* Zone 3: D to IP (Sagging) */}
            <path
              d={getSegmentPath(14.0, 20.57, true, 4)}
              fill="none"
              className="stroke-indigo-500 dark:stroke-indigo-400"
              strokeWidth="4.5"
              strokeLinecap="round"
            />

            {/* Zone 4: IP to E (Hogging) */}
            <path
              d={getSegmentPath(20.57, 24.0, false, -4)}
              fill="none"
              className="stroke-rose-500 dark:stroke-rose-400"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
            {/* Zone 5: E to B (Hogging) */}
            <path
              d={getSegmentPath(24.0, 32.0, false, -8)}
              fill="none"
              className="stroke-rose-500 dark:stroke-rose-400"
              strokeWidth="4.5"
              strokeLinecap="round"
            />

            <line x1={nodeCX} y1={yBeam - 12} x2={nodeCX} y2={yBeam + 20} className="stroke-slate-400/40 stroke-[0.8]" strokeDasharray="2 2" />
            <line x1={nodeDX} y1={yBeam - 12} x2={nodeDX} y2={yBeam + 20} className="stroke-slate-400/40 stroke-[0.8]" strokeDasharray="2 2" />
            <line x1={nodeIPX} y1={yBeam - 22} x2={nodeIPX} y2={yBeam + 20} className="stroke-slate-400/50 stroke-[0.8]" strokeDasharray="2 2" />
            <line x1={nodeEX} y1={yBeam - 22} x2={nodeEX} y2={yBeam + 12} className="stroke-slate-400/40 stroke-[0.8]" strokeDasharray="2 2" />

            <text x={nodeIPX - 8} y={yBeam + 22} className="text-[7.5px] font-bold fill-indigo-600" textAnchor="end">Sagging (Smile)</text>
            <text x={nodeIPX + 8} y={yBeam - 18} className="text-[7.5px] font-bold fill-rose-500 animate-pulse" textAnchor="start">Hogging activated (Frown)</text>
          </g>
        )}

        {/* Step 5 & 6: Connected Continuous Curve */}
        {showConnectedCurve && (
          <g className="animate-in fade-in duration-300">
            {/* Thick deflected member shape */}
            <path
              d={connectedPath}
              fill="none"
              className="stroke-blue-100 dark:stroke-blue-950/40"
              strokeWidth="10"
              strokeLinecap="round"
            />
            {/* Orange deflected elastic centerline */}
            <path
              d={connectedPath}
              fill="none"
              className="stroke-orange-500 dark:stroke-orange-400"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Shaded curvature regions */}
            <g className="opacity-10 dark:opacity-15">
              <path
                d={`M ${nodeAX},${yBeam} L ${leftPoints.join(' L ')} Z`}
                className="fill-indigo-500"
              />
              <path
                d={`M ${nodeIPX},${yBeam} L ${rightPoints.join(' L ')} Z`}
                className="fill-rose-500"
              />
            </g>

            <text x={(nodeAX + nodeIPX) / 2} y={yBeam + 24} textAnchor="middle" className="text-[8px] font-bold fill-indigo-650/80">Sagging (+)</text>
            <text x={(nodeIPX + nodeBX) / 2} y={yBeam + 24} textAnchor="middle" className="text-[8px] font-bold fill-rose-500/85">Hogging (-)</text>
          </g>
        )}

        {/* ==================== BENDING MOMENT DIAGRAM (BMD) OVERLAY ==================== */}
        {activeStep >= 1 && (
          <g className="animate-in fade-in duration-300">
            {/* BMD baseline */}
            <line
              x1={nodeAX}
              y1={yBmd}
              x2={nodeBX}
              y2={yBmd}
              className="stroke-slate-400 dark:stroke-slate-600"
              strokeWidth="0.8"
            />
            <text x={nodeAX - 10} y={yBmd + 3} className="text-[7px] font-mono fill-slate-500">BMD</text>

            {/* Shaded positive (sagging) area between A and IP */}
            <path
              d={`M ${nodeAX},${yBmd} L ${bmdPoints.slice(0, Math.floor(bmdSteps * 20.57 / beamLength) + 1).join(' L ')} L ${nodeIPX},${yBmd} Z`}
              className="fill-indigo-500/10 dark:fill-indigo-500/15"
            />
            {/* Shaded negative (hogging) area between IP and E/B */}
            <path
              d={`M ${nodeIPX},${yBmd} L ${bmdPoints.slice(Math.floor(bmdSteps * 20.57 / beamLength)).join(' L ')} L ${nodeBX},${yBmd} Z`}
              className="fill-rose-500/10 dark:fill-rose-500/15"
            />

            {/* Real BMD moment curve generated by the solver */}
            <path
              d={solvedBmdPath}
              fill="none"
              className="stroke-slate-500 dark:stroke-slate-400"
              strokeWidth="1.2"
            />

            {/* BMD Value Labels */}
            <text x={nodeCX} y={yBmd + 24} textAnchor="middle" className="text-[7px] font-mono font-bold fill-indigo-600">+108 k·ft</text>
            <text x={nodeDX} y={yBmd + 21} textAnchor="middle" className="text-[7px] font-mono font-bold fill-indigo-600">+92 k·ft</text>
            <text x={nodeEX} y={yBmd - 12} textAnchor="middle" className="text-[7px] font-mono font-bold fill-rose-500">-48 k·ft</text>

            {activeStep >= 2 && (
              <g className="animate-in fade-in duration-300">
                <text x={(nodeAX + nodeIPX) / 2} y={yBmd - 5} textAnchor="middle" className="text-[8px] fill-indigo-500 font-semibold">☺ Smile (Sagging)</text>
                <text x={(nodeIPX + nodeBX) / 2} y={yBmd + 9} textAnchor="middle" className="text-[8px] fill-rose-500 font-semibold">☹ Frown (Hogging)</text>
              </g>
            )}
          </g>
        )}

        {/* ==================== REAL SOLVED DEFLECTION DIAGRAM (Step 6+) ==================== */}
        {showDeflectionChart && (
          <g className="animate-in fade-in duration-300">
            {/* Deflection baseline */}
            <line
              x1={nodeAX}
              y1={yDeflection}
              x2={nodeBX}
              y2={yDeflection}
              className="stroke-slate-400 dark:stroke-slate-600"
              strokeWidth="0.8"
            />
            <text x={nodeAX - 10} y={yDeflection + 3} className="text-[7px] font-mono fill-slate-500">DEFL</text>

            {/* Solid solved deflection curve */}
            <path
              d={solvedDeflPath}
              fill="none"
              className="stroke-orange-500 dark:stroke-orange-400"
              strokeWidth="1.5"
              strokeLinecap="round"
            />

            {/* Zero deflection indicators at supports */}
            <circle cx={nodeAX} cy={yDeflection} r="2.5" className="fill-slate-500 stroke-background" strokeWidth="0.8" />
            <circle cx={nodeEX} cy={yDeflection} r="2.5" className="fill-slate-500 stroke-background" strokeWidth="0.8" />

            <text x={(nodeAX + nodeEX) / 2} y={yDeflection + 14} textAnchor="middle" className="text-[7px] font-mono font-bold fill-slate-500">Real Deflection Curve</text>
          </g>
        )}

        {/* ==================== INFLECTION POINT HIGHLIGHT ==================== */}
        {activeStep >= 6 && (
          <g className="animate-in zoom-in-50 duration-300">
            {/* Vertical projection line running through all three diagrams */}
            <line
              x1={nodeIPX}
              y1={yBeam}
              x2={nodeIPX}
              y2={showDeflectionChart ? yDeflection + 14 : yBmd}
              className="stroke-emerald-500/80 stroke-[0.8]"
              strokeDasharray="3 3"
            />

            {/* Green circle dots on all curves */}
            <circle cx={nodeIPX} cy={yBeam} r="3.5" className="fill-emerald-500 stroke-background" strokeWidth="1" />
            <circle cx={nodeIPX} cy={yBmd} r="3.5" className="fill-emerald-500 stroke-background" strokeWidth="1" />
            {showDeflectionChart && (
              <circle
                cx={nodeIPX}
                cy={yDeflection - (getSolvedDeflectionAt(20.57) / maxDeflection) * 14}
                r="3.5"
                className="fill-emerald-500 stroke-background"
                strokeWidth="1"
              />
            )}

            {/* Inflection Point indicator label */}
            <g transform={`translate(${nodeIPX}, ${yBeam - 14})`}>
              <rect x="-35" y="-10" width="70" height="13" fill="var(--background, #030712)" rx="2" className="stroke-emerald-500/30 stroke-[0.5]" />
              <text x="0" y="-1" textAnchor="middle" className="text-[6.5px] font-bold fill-emerald-600 dark:fill-emerald-400">Inflection Point</text>
            </g>

            <g transform={`translate(${nodeIPX}, ${yBmd - 12})`}>
              <rect x="-35" y="-10" width="70" height="13" fill="var(--background, #030712)" rx="2" className="stroke-emerald-500/30 stroke-[0.5]" />
              <text x="0" y="-1" textAnchor="middle" className="text-[6.5px] font-bold fill-emerald-600 dark:fill-emerald-400">Inflection Point</text>
            </g>
          </g>
        )}

      </svg>
    </div>
  );
};

export default ElasticCurveSegmentedDrawing;
