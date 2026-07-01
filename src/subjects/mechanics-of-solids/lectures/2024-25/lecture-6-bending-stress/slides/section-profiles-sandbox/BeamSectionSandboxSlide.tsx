import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { useUrlSyncedState } from '@/features/presentation/hooks/useUrlSyncedState';
import { ParameterSlider, CalculationOutput } from '@/features/presentation/components/elements';
import { ProfileShapeView } from '@/subjects/mechanics-of-solids/features/stress/components/diagrams/ProfileShapeView';
import { BendingStressProfileChart } from '@/subjects/mechanics-of-solids/features/stress/components/diagrams/BendingStressProfileChart';
import { CrossSectionEngine } from '@/subjects/mechanics-of-solids/cores/stress/cross-section.engine';
import { StressSolverEngine } from '@/subjects/mechanics-of-solids/cores/stress/stress-solver.engine';
import { StaticalMomentEngine } from '@/subjects/mechanics-of-solids/cores/stress/statical-moment.engine';
import { ICrossSection, CrossSectionType } from '@/subjects/mechanics-of-solids/cores/stress/stress.interface';

export const BeamSectionSandboxSlide: React.FC = () => {
  const [shapeType, setShapeType] = useUrlSyncedState<CrossSectionType>('sandbox_shape_type', 'rectangular');
  const [width, setWidth] = useUrlSyncedState<number>('sandbox_width', 150); // in mm
  const [height, setHeight] = useUrlSyncedState<number>('sandbox_height', 200); // in mm
  const [tf, setTf] = useUrlSyncedState<number>('sandbox_tf', 15); // flange thickness in mm
  const [tw, setTw] = useUrlSyncedState<number>('sandbox_tw', 10); // web thickness in mm
  const [diameter, setDiameter] = useUrlSyncedState<number>('sandbox_diameter', 150); // in mm
  const [moment, setMoment] = useUrlSyncedState<number>('sandbox_moment', 25); // in kNm
  const [inspectY, setInspectY] = useUrlSyncedState<number>('sandbox_inspect_y', 0); // in mm

  // Build shape config
  const shape: ICrossSection = {
    type: shapeType,
    width: shapeType === 'circular' ? undefined : width / 1000,
    height: shapeType === 'circular' ? undefined : height / 1000,
    thicknessFlange: shapeType === 'rectangular' || shapeType === 'circular' ? undefined : tf / 1000,
    thicknessWeb: shapeType === 'rectangular' || shapeType === 'circular' ? undefined : tw / 1000,
    diameter: shapeType === 'circular' ? diameter / 1000 : undefined,
  };

  const M_Nmm = moment * 1e6;
  const props = CrossSectionEngine.calculateProperties(shape);
  const res = StressSolverEngine.solveDistribution(shape, M_Nmm, 0, props.I);

  const H_m = shapeType === 'circular' ? (diameter / 1000) : (height / 1000);
  const ybar_m = props.centroid;

  // SVG coordinate conversions
  const svgW = 280;
  const svgH = 150;
  const paddingY = 20;
  const chartH = svgH - paddingY * 2;
  const toPixelY = (yNA: number) => paddingY + (1 - (yNA + ybar_m) / H_m) * chartH;

  const maxSigma = Math.max(1e-3, Math.abs(res.maxBendingTension), Math.abs(res.maxBendingCompression));
  const inspectY_m = inspectY / 1000;
  const pyInspect = toPixelY(inspectY_m);

  // Exact stresses at inspectY
  const sigma = props.I > 1e-12 ? -(M_Nmm * inspectY_m) / props.I : 0;
  const statQ = StaticalMomentEngine.calculateQAndWidth(shape, inspectY_m, props);
  const sigmaMPa = sigma / 1e6;

  // Top and bottom fiber bending stresses
  const sigmaTopMPa = (props.I > 1e-12 ? -(M_Nmm * (H_m - ybar_m)) / props.I : 0) / 1e6;
  const sigmaBottomMPa = (props.I > 1e-12 ? -(M_Nmm * (-ybar_m)) / props.I : 0) / 1e6;

  const shapeTypes: { id: CrossSectionType; label: string }[] = [
    { id: 'rectangular', label: 'Rect' },
    { id: 'circular', label: 'Circle' },
    { id: 'i-beam', label: 'I-Beam' },
    { id: 't-beam', label: 'T-Beam' }
  ];

  return (
    <TwoColumnLayout
      title="Bending Stress Cross-Section Sandbox"
      leftWidth="45%"
      leftContent={
        <div className="flex flex-col gap-3 text-left">
          <div>
            <span className="text-[9px] font-bold text-indigo-500 uppercase tracking-widest block mb-1">Interactive Sandbox</span>
            <div className="flex gap-1.5 mb-2">
              {shapeTypes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setShapeType(t.id)}
                  className={`px-2 py-1 rounded text-[10px] font-bold border transition-all ${shapeType === t.id ? 'bg-indigo-500/10 border-indigo-500 text-indigo-500' : 'bg-background hover:bg-muted border-border/60 text-muted-foreground'}`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            {shapeType !== 'circular' && (
              <>
                <ParameterSlider label="Width (b)" value={width} unit="mm" min={50} max={300} step={5} onChange={setWidth} />
                <ParameterSlider label="Height (h)" value={height} unit="mm" min={100} max={400} step={10} onChange={setHeight} />
              </>
            )}
            {shapeType === 'circular' && (
              <ParameterSlider label="Diameter (d)" value={diameter} unit="mm" min={50} max={300} step={5} onChange={setDiameter} />
            )}
            {(shapeType === 'i-beam' || shapeType === 't-beam') && (
              <>
                <ParameterSlider label="Flange Thickness (tf)" value={tf} unit="mm" min={5} max={40} step={1} onChange={setTf} />
                <ParameterSlider label="Web Thickness (tw)" value={tw} unit="mm" min={5} max={30} step={1} onChange={setTw} />
              </>
            )}
            <ParameterSlider label="Moment (M)" value={moment} unit="kNm" min={5} max={100} step={1} onChange={setMoment} />
            <ParameterSlider label="Inspect Y" value={inspectY} unit="mm" min={-Math.round(ybar_m * 1000)} max={Math.round((H_m - ybar_m) * 1000)} step={1} onChange={setInspectY} />
          </div>

          <div className="grid grid-cols-2 gap-2 mt-1">
            <CalculationOutput title="Moment of Inertia (I)" value={(props.I * 1e6).toFixed(1)} unit="10⁶ mm⁴" />
            <CalculationOutput title="Stress at Y" value={sigmaMPa.toFixed(2)} unit="MPa" />
          </div>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center h-full min-h-[260px]">
          <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full max-w-[250px] overflow-visible">
            <ProfileShapeView shape={shape} centroid={ybar_m} toPixelY={toPixelY} inspectY={inspectY} currentWidth={statQ.t * 1000} />
            <BendingStressProfileChart points={res.points} maxSigma={maxSigma} toPixelY={toPixelY} H={H_m} ybar={ybar_m} sigmaTopMPa={sigmaTopMPa} sigmaBottomMPa={sigmaBottomMPa} pyInspect={pyInspect} currentSigma={sigmaMPa} />
          </svg>
        </div>
      }
    />
  );
};

export default BeamSectionSandboxSlide;
