import React, { useRef } from 'react';
import { useBeamWorkspace } from '@/subjects/mechanics-of-solids/features/sfd-bmd/context/BeamWorkspaceContext';
import { useBeamEngine } from '../../../sfd-bmd/hooks/useBeamEngine';
import { CrossSectionEngine } from '@/subjects/mechanics-of-solids/cores/stress/cross-section.engine';
import { StressSolverEngine } from '@/subjects/mechanics-of-solids/cores/stress/stress-solver.engine';
import { StaticalMomentEngine } from '@/subjects/mechanics-of-solids/cores/stress/statical-moment.engine';
import { Info } from 'lucide-react';
import { ProfileShapeView } from './ProfileShapeView';
import { BendingStressProfileChart } from './BendingStressProfileChart';
import { ShearStressProfileChart } from './ShearStressProfileChart';
import { ExpandableDrawing } from '@/shared/components';

export const StressGradientProfile: React.FC = () => {
  const { length, hoverX, customInspectX, inspectY, setInspectY, eiSegments } = useBeamWorkspace();
  const { solverResult } = useBeamEngine();
  const svgRef = useRef<SVGSVGElement>(null);

  if (!solverResult.success || !solverResult.intervals) return null;

  // Active longitudinal coordinate X
  const inspectX = hoverX !== null ? hoverX : (customInspectX !== null ? customInspectX : length / 2);

  // Find active segment, shape and internal forces at inspectX
  const seg = eiSegments.find(s => inspectX >= s.startPosition - 1e-4 && inspectX <= s.endPosition + 1e-4) || eiSegments[0]!;
  const shape = seg.shape ?? { type: 'custom' };

  if (shape.type === 'custom') {
    return (
      <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-5 text-xs text-amber-500 backdrop-blur-md flex gap-3">
        <Info className="h-4 w-4 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold uppercase tracking-wider text-[10px]">Stress Distribution Analysis Disabled</p>
          <p className="mt-1 text-muted-foreground text-[10px] leading-relaxed">
            2D Cross-section stress distributions cannot be computed for segments using **Custom (Manual I)** stiffness properties.
            Please select a Rectangular, Circular, or Flanged section profile in the Cross-Section Builder to enable stress analysis.
          </p>
        </div>
      </div>
    );
  }

  const getMAt = (x: number): number => {
    const interval = solverResult.intervals!.find(
      inv => x >= inv.startX - 1e-4 && x <= inv.endX + 1e-4
    );
    if (!interval) return 0;
    const [a, b, c, d] = interval.mCoeffs;
    return a * x * x * x + b * x * x + c * x + d;
  };

  const getVAt = (x: number): number => {
    const interval = solverResult.intervals!.find(
      inv => x >= inv.startX - 1e-4 && x <= inv.endX + 1e-4
    );
    if (!interval) return 0;
    const [a, b, c] = interval.vCoeffs;
    return a * x * x + b * x + c;
  };

  const M = getMAt(inspectX) * 1000;
  const V = getVAt(inspectX) * 1000;

  const res = StressSolverEngine.solveDistribution(shape, M, V, seg.I * 1e-6);
  const props = CrossSectionEngine.calculateProperties(shape, seg.I * 1e-6);

  const H = shape.type === 'circular' ? (shape.diameter ?? 0.1) : (shape.height ?? 0.2);
  const ybar = props.centroid;

  // SVG dimensions
  const width = 360;
  const height = 150;
  const paddingY = 20;
  const chartH = height - paddingY * 2; // 110px

  // Y Coordinate mappings (relative to NA in meters -> pixel coordinate)
  const toPixelY = (yNA: number) => paddingY + (1 - (yNA + ybar) / H) * chartH;
  const toMeterY = (py: number) => (1 - (py - paddingY) / chartH) * H - ybar;

  // Max stress magnitudes for scaling
  const maxSigma = Math.max(1e-3, Math.abs(res.maxBendingTension), Math.abs(res.maxBendingCompression));
  const maxTau = Math.max(1e-3, res.maxShear);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const clientY = (e.clientY - rect.top) * (height / rect.height);
    // Map clientY to y relative to neutral axis
    const yMeter = Math.max(-ybar, Math.min(H - ybar, toMeterY(clientY)));
    setInspectY(parseFloat((yMeter * 1000).toFixed(1))); // Store in mm
  };

  // Stress at inspectY
  const inspectYMeters = inspectY / 1000;
  const pyInspect = toPixelY(inspectYMeters);

  // Solve exact stresses at inspectY
  const getStressAtInspectY = () => {
    const sigma = props.I > 1e-12 ? -(M * inspectYMeters) / props.I : 0;
    const statQ = StaticalMomentEngine.calculateQAndWidth(shape, inspectYMeters, props);
    const tau = props.I > 1e-12 && statQ.t > 1e-6 ? (V * statQ.Q) / (props.I * statQ.t) : 0;
    return { sigma: sigma / 1e6, tau: tau / 1e6, b: statQ.t * 1000 }; // in MPa and mm
  };

  const currentStresses = getStressAtInspectY();

  // Solve top and bottom fiber bending stresses
  const sigmaTop = props.I > 1e-12 ? -(M * (H - ybar)) / props.I : 0;
  const sigmaBottom = props.I > 1e-12 ? -(M * (-ybar)) / props.I : 0;
  const sigmaTopMPa = sigmaTop / 1e6;
  const sigmaBottomMPa = sigmaBottom / 1e6;

  return (
    <ExpandableDrawing
      title={`Cross-Section Stress Distributions at x = ${inspectX.toFixed(2)}m`}
      description={`Normal bending and shear stress profiles across the cross-section height at the selected span coordinate.`}
    >
      <div className="relative w-full select-none">
        <div className="relative">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${width} ${height}`}
          className="w-full overflow-visible"
          onMouseMove={handleMouseMove}
        >
          {/* Profile Shape */}
          <ProfileShapeView
            shape={shape}
            centroid={ybar}
            toPixelY={toPixelY}
            inspectY={inspectY}
            currentWidth={currentStresses.b}
          />

          {/* Bending Stress Plot */}
          <BendingStressProfileChart
            points={res.points}
            maxSigma={maxSigma}
            toPixelY={toPixelY}
            H={H}
            ybar={ybar}
            sigmaTopMPa={sigmaTopMPa}
            sigmaBottomMPa={sigmaBottomMPa}
            pyInspect={pyInspect}
            currentSigma={currentStresses.sigma}
          />

          {/* Shear Stress Plot */}
          <ShearStressProfileChart
            shape={shape}
            points={res.points}
            maxTau={maxTau}
            toPixelY={toPixelY}
            H={H}
            ybar={ybar}
            V={V}
            props={props}
            pyInspect={pyInspect}
            currentTau={currentStresses.tau}
          />

          {/* Interactive Inspection Horizontal Line */}
          <g>
            <line
              x1={10}
              y1={pyInspect}
              x2={width - 10}
              y2={pyInspect}
              stroke="var(--primary)"
              strokeWidth={1.2}
              strokeDasharray="2,2"
              opacity={0.6}
            />
            {/* Handle markers */}
            <circle cx={10} cy={pyInspect} r={2.5} fill="var(--primary)" />
            <circle cx={width - 10} cy={pyInspect} r={2.5} fill="var(--primary)" />
          </g>
        </svg>
      </div>
    </div>
  </ExpandableDrawing>
  );
};
