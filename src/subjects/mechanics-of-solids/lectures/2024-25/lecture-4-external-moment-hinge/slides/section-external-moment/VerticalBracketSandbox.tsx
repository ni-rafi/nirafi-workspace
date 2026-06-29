import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import {
  SlideParagraph,
  InteractiveCard,
  ParameterSlider,
  CalculationOutput,
} from '@/features/presentation/components/elements';
import { BracketLoadingDrawing } from '@/subjects/mechanics-of-solids/features/sfd-bmd/components/drawings/BracketLoadingDrawing';
import { useUrlSyncedState } from '@/features/presentation/hooks/useUrlSyncedState';

export const VerticalBracketSandbox: React.FC = () => {
  // Synced state parameters for the sandbox
  const [loadVal, setLoadVal] = useUrlSyncedState<number>('vertical_bracket_load', 1.2);
  const [bracketLen, setBracketLen] = useUrlSyncedState<number>('vertical_bracket_len', 2.0);

  const computedMoment = (loadVal * bracketLen).toFixed(3);

  return (
    <TwoColumnLayout
      title="Eccentric Load Sandbox Simulation"
      leftWidth="48%"
      leftContent={
        <div className="flex flex-col gap-4">
          <div className="flex flex-col justify-center border border-border/40 bg-muted/10 rounded-xl px-0 py-2 min-h-[220px]">
            <BracketLoadingDrawing
              loadVal={loadVal}
              bracketLen={bracketLen}
              mode="equiv-dimmed"
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
            <h4 className="text-sm font-bold text-foreground">Parametric Bracket Study</h4>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground mt-2 leading-relaxed">
              Use the sliders below to explore how the magnitude of the eccentric point load and the length of the bracket arm alter the induced moment couple transferred to the beam neutral axis:
            </SlideParagraph>
          </div>

          <InteractiveCard title="Interactive Simulation Sandbox">
            <div className="flex flex-col gap-3">
              <ParameterSlider
                label="Point Load (P)"
                value={loadVal}
                unit="kN"
                min={0.5}
                max={3.0}
                step={0.1}
                onChange={setLoadVal}
              />
              <ParameterSlider
                label="Bracket Arm (d)"
                value={bracketLen}
                unit="m"
                min={1.0}
                max={4.0}
                step={0.1}
                onChange={setBracketLen}
              />
              <div className="grid grid-cols-2 gap-2 mt-1">
                <CalculationOutput title="Load Magnitude" value={`${loadVal.toFixed(1)} kN`} />
                <CalculationOutput
                  title="Induced Moment (M₀)"
                  value={`${computedMoment} kN·m`}
                  subtitle="P × d"
                />
              </div>
            </div>
          </InteractiveCard>
        </div>
      }
    />
  );
};

export default VerticalBracketSandbox;
