import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import {
  SlideParagraph,
  InteractiveCard,
  ParameterSlider,
  CalculationOutput,
} from '@/features/presentation/components/elements';
import { InclinedForceDrawing } from '@/subjects/mechanics-of-solids/features/sfd-bmd/components/drawings/InclinedForceDrawing';
import { useUrlSyncedState } from '@/features/presentation/hooks/useUrlSyncedState';

export const InclinedForceSandbox: React.FC = () => {
  // Synced state parameter for force angle
  const [angle, setAngle] = useUrlSyncedState<number>('inclined_force_angle', 50);

  // Calculations (Reference load magnitude is static 10.0 kN)
  const loadP = 10.0;
  const rad = (angle * Math.PI) / 180;
  const valPx = (loadP * Math.cos(rad)).toFixed(2);
  const valPy = (loadP * Math.sin(rad)).toFixed(2);

  return (
    <TwoColumnLayout
      title="Inclined Force Sandbox Simulation"
      leftWidth="48%"
      leftContent={
        <div className="flex flex-col gap-4">
          {/* SVG canvas wrapper inheriting flex boundaries */}
          <div className="flex flex-col justify-center border border-border/40 bg-muted/10 rounded-xl px-0 py-2 min-h-[220px]">
            <InclinedForceDrawing
              angle={angle}
              showComponents={true}
              showReactions={true}
            />
          </div>
        </div>
      }
      rightContent={
        <div className="flex flex-col justify-start h-full space-y-4 select-text text-left">
          <div>
            <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest block mb-0.5">
              Interactive Simulator
            </span>
            <h4 className="text-sm font-bold text-foreground">Parametric Angle Study</h4>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground mt-2 leading-relaxed">
              Use the slider below to dynamic adjust the point load angle θ and inspect how the horizontal (axial) and vertical (transverse) vectors scale in response:
            </SlideParagraph>
          </div>

          <InteractiveCard title="Interactive Simulation Sandbox">
            <div className="flex flex-col gap-3">
              <ParameterSlider
                label="Force Angle (θ)"
                value={angle}
                unit="°"
                min={10}
                max={80}
                step={5}
                onChange={setAngle}
              />
              <div className="grid grid-cols-2 gap-2 mt-1">
                <CalculationOutput title="Axial Component (Px)" value={`${valPx} kN`} />
                <CalculationOutput title="Transverse Component (Py)" value={`${valPy} kN`} />
              </div>
            </div>
          </InteractiveCard>
        </div>
      }
    />
  );
};

export default InclinedForceSandbox;
