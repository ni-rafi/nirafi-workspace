import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import {
  SlideParagraph,
  InteractiveCard,
  ParameterSlider,
} from '@/features/presentation/components/elements';
import { ElasticCurveDrawing } from '@/subjects/mechanics-of-solids/features/sfd-bmd/components/drawings/ElasticCurveDrawing';
import { useUrlSyncedState } from '@/features/presentation/hooks/useUrlSyncedState';
import { BeamWorkspaceContext, BeamWorkspaceContextProps } from '@/subjects/mechanics-of-solids/features/sfd-bmd/context/BeamWorkspaceContext';
import { ShearForceChart } from '@/subjects/mechanics-of-solids/features/sfd-bmd/components/diagrams/ShearForceChart';
import { BendingMomentChart } from '@/subjects/mechanics-of-solids/features/sfd-bmd/components/diagrams/BendingMomentChart';

export const ElasticCurveSandbox: React.FC = () => {
  // Synced state parameter for moment load position
  const [momentPos, setMomentPos] = useUrlSyncedState<number>('moment_couple_position', 3.0);

  // Construct dynamic beam configuration for the diagrams context
  const length = 6.0;
  const beamConfig = {
    length,
    supports: [
      { id: 'A', type: 'hinge' as const, position: 0 },
      { id: 'B', type: 'roller' as const, position: length }
    ],
    releases: [],
    loads: [
      { id: 'M0', type: 'moment' as const, position: momentPos, magnitude: 15.0 }
    ],
  };

  const mockContextValue = {
    length,
    supports: beamConfig.supports,
    releases: beamConfig.releases,
    loads: beamConfig.loads,
    eiSegments: [{ id: 'ei-1', startPosition: 0, endPosition: length, E: 200, I: 100 }],
    hoverX: null,
    setHoverX: () => {},
    selectedId: null,
    setSelectedId: () => {},
    deflMethod: 'double-integration' as const,
    setDeflMethod: () => {},
    customInspectX: null,
    setCustomInspectX: () => {},
    inspectY: 0,
    inspectAngle: 0,
    isSectionBuilderOpen: false,
    setIsSectionBuilderOpen: () => {},
    activeEISegment: null,
    updateEISegment: () => {},
    activeTab: 'doi' as const,
    setActiveTab: () => {},
  };

  return (
    <TwoColumnLayout
      title="Elastic Curve & Diagrams Sandbox"
      leftWidth="52%"
      leftContent={
        <div className="flex flex-col gap-3">
          {/* Beam and Deformed drawing canvas */}
          <div className="flex flex-col justify-center border border-border/40 bg-muted/10 rounded-xl px-0 py-2 min-h-[135px]">
            <ElasticCurveDrawing momentPos={momentPos} activeStep={3} />
          </div>

          {/* Aligned SFD and BMD Charts */}
          <div className="grid grid-cols-2 gap-3 h-[120px]">
            <BeamWorkspaceContext.Provider value={mockContextValue as unknown as BeamWorkspaceContextProps}>
              <div className="border border-border/40 bg-muted/5 rounded-xl p-1.5 flex flex-col justify-between">
                <span className="text-[9px] font-bold text-muted-foreground text-center">Shear Force Diagram (SFD)</span>
                <div className="h-[90px] w-full">
                  <ShearForceChart />
                </div>
              </div>
              <div className="border border-border/40 bg-muted/5 rounded-xl p-1.5 flex flex-col justify-between">
                <span className="text-[9px] font-bold text-muted-foreground text-center">Bending Moment Diagram (BMD)</span>
                <div className="h-[90px] w-full">
                  <BendingMomentChart />
                </div>
              </div>
            </BeamWorkspaceContext.Provider>
          </div>
        </div>
      }
      rightContent={
        <div className="flex flex-col justify-start h-full space-y-4 select-text text-left">
          <div>
            <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest block mb-0.5">
              Interactive Simulator
            </span>
            <h4 className="text-sm font-bold text-foreground">Parametric Inflection Point Study</h4>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground mt-2 leading-relaxed">
              Use the slider below to shift the position of the concentrated moment couple and see how the Point of Inflection ($M=0$) and diagrams update in real-time:
            </SlideParagraph>
          </div>

          <InteractiveCard title="Interactive Simulation Sandbox">
            <div className="flex flex-col gap-3">
              <ParameterSlider
                label="Moment Position (x)"
                value={momentPos}
                unit="m"
                min={1.5}
                max={4.5}
                step={0.15}
                onChange={setMomentPos}
              />
            </div>
          </InteractiveCard>
        </div>
      }
    />
  );
};

export default ElasticCurveSandbox;
