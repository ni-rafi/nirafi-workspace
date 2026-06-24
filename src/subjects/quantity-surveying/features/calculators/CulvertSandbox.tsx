import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { 
  InteractiveCard, 
  ParameterSlider, 
  CalculationOutput 
} from '@/features/presentation/components/elements';
import { CulvertDrawing } from '../components/CulvertDrawing';
import { useUrlSyncedState } from '@/features/presentation/hooks/useUrlSyncedState';
import { calculateBoxCulvertVolume } from '../../cores/roadway';

export const CulvertSandbox: React.FC = () => {
  const [mode, setMode] = useUrlSyncedState<'box' | 'pipe'>('culv_mode', 'box');
  const [length, setLength] = useUrlSyncedState<number>('culv_len', 12);

  // Box Culvert states
  const [outerWidth, setOuterWidth] = useUrlSyncedState<number>('culv_ow', 2.0);
  const [outerHeight, setOuterHeight] = useUrlSyncedState<number>('culv_oh', 2.0);
  const [voidWidth, setVoidWidth] = useUrlSyncedState<number>('culv_vw', 1.2);
  const [voidHeight, setVoidHeight] = useUrlSyncedState<number>('culv_vh', 1.2);

  // Pipe Culvert states
  const [pipeDia, setPipeDia] = useUrlSyncedState<number>('culv_pdia', 0.9);
  const [cradleWidth, setCradleWidth] = useUrlSyncedState<number>('culv_crad_w', 1.4);
  const [cradleThickness, setCradleThickness] = useUrlSyncedState<number>('culv_crad_t', 0.3);

  // Ensure void dimensions do not exceed outer dimensions
  const safeVoidWidth = Math.min(voidWidth, outerWidth - 0.3);
  const safeVoidHeight = Math.min(voidHeight, outerHeight - 0.3);

  // Calculations
  const boxConcrete = calculateBoxCulvertVolume(length, outerWidth, outerHeight, safeVoidWidth, safeVoidHeight);
  const brickHeadwallEst = Math.round(2 * 1.5 * 1.8 * 0.38 * 1000) / 1000; // Est volume for 2 brick headwalls

  // Pipe Cradle Bedding Volume
  const pipeCradleConcrete = Math.round(cradleWidth * cradleThickness * length * 1000) / 1000;
  const numPipes = Math.ceil(length / 2.5); // 2.5m standard pipe length

  return (
    <TwoColumnLayout
      title="Culvert Quantity Sandbox"
      bgVariant="default"
      leftWidth="45%"
      leftContent={
        <InteractiveCard title="Culvert Design Parameters">
          {/* Mode Switcher */}
          <div className="flex bg-muted p-1 rounded-lg mb-4">
            <button
              type="button"
              className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all ${
                mode === 'box'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => setMode('box')}
            >
              RCC Box Culvert
            </button>
            <button
              type="button"
              className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all ${
                mode === 'pipe'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => setMode('pipe')}
            >
              Hume Pipe Culvert
            </button>
          </div>

          <div className="space-y-4 mb-4">
            <ParameterSlider
              label="Culvert Length"
              min={5}
              max={30}
              step={1}
              value={length}
              onChange={setLength}
              unit=" m"
            />

            {mode === 'box' ? (
              <>
                <ParameterSlider
                  label="Outer Width"
                  min={1.5}
                  max={4.0}
                  step={0.1}
                  value={outerWidth}
                  onChange={setOuterWidth}
                  unit=" m"
                />
                <ParameterSlider
                  label="Outer Height"
                  min={1.5}
                  max={4.0}
                  step={0.1}
                  value={outerHeight}
                  onChange={setOuterHeight}
                  unit=" m"
                />
                <ParameterSlider
                  label="Inner Void Width (Span)"
                  min={0.8}
                  max={3.0}
                  step={0.1}
                  value={voidWidth}
                  onChange={setVoidWidth}
                  unit=" m"
                />
                <ParameterSlider
                  label="Inner Void Height"
                  min={0.8}
                  max={3.0}
                  step={0.1}
                  value={voidHeight}
                  onChange={setVoidHeight}
                  unit=" m"
                />
              </>
            ) : (
              <>
                <ParameterSlider
                  label="Pipe Diameter (⌀)"
                  min={0.6}
                  max={1.5}
                  step={0.15}
                  value={pipeDia}
                  onChange={setPipeDia}
                  unit=" m"
                />
                <ParameterSlider
                  label="Cradle Bedding Width"
                  min={1.0}
                  max={2.5}
                  step={0.1}
                  value={cradleWidth}
                  onChange={setCradleWidth}
                  unit=" m"
                />
                <ParameterSlider
                  label="Cradle Thickness"
                  min={0.15}
                  max={0.6}
                  step={0.05}
                  value={cradleThickness}
                  onChange={setCradleThickness}
                  unit=" m"
                />
              </>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2 border-t border-border/40 pt-3 font-mono">
            {mode === 'box' ? (
              <>
                <CalculationOutput title="RCC Concrete" value={boxConcrete.toFixed(3)} unit="m³" variant="compact" />
                <CalculationOutput title="Void Volume" value={((safeVoidWidth * safeVoidHeight) * length).toFixed(3)} unit="m³" variant="compact" />
                <CalculationOutput title="Gross Volume" value={((outerWidth * outerHeight) * length).toFixed(3)} unit="m³" variant="compact" />
                <CalculationOutput title="Headwalls Est." value={brickHeadwallEst.toFixed(3)} unit="m³" variant="compact" />
              </>
            ) : (
              <>
                <CalculationOutput title="Cradle Bedding" value={pipeCradleConcrete.toFixed(3)} unit="m³" variant="compact" />
                <CalculationOutput title="Pipe Count" value={numPipes.toString()} unit=" Nos" variant="compact" />
                <CalculationOutput title="Pipe Diameter" value={(pipeDia * 1000).toFixed(0)} unit=" mm" variant="compact" />
                <CalculationOutput title="Headwalls Est." value={brickHeadwallEst.toFixed(3)} unit="m³" variant="compact" />
              </>
            )}
          </div>
        </InteractiveCard>
      }
      rightContent={
        <CulvertDrawing mode={mode} />
      }
    />
  );
};

export default CulvertSandbox;
