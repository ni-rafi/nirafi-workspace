import React from 'react';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import { SlideParagraph, ClickReveal, SlideBullet } from '@/features/presentation/components/elements';
import { useClickStepsContext } from '@/features/presentation/context/ClickStepsContext';
import { Beam2DDrawing } from '@/subjects/mechanics-of-solids/features/sfd-bmd/components/drawings';
import { beamConfig } from '../../beamConfig';

export const CuttingSectionsL2: React.FC = () => {
  const { currentClick } = useClickStepsContext();
  const step = currentClick ?? 0;

  return (
    <FullWidthLayout
      title={<span>Defining the Cutting Sections</span>}
    >
      <div className="w-full h-full flex flex-col justify-between gap-4 p-4 text-left select-text">
        <div>
          <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest block mb-0.5">Partition Strategy</span>
          <h2 className="text-lg font-bold text-foreground">Dividing the Beam Domain (Problem 2)</h2>
          <SlideParagraph variant="plain" className="text-[11px] text-muted-foreground leading-normal">
            Partition the beam total span of 20m into four distinct segments based on load changes.
          </SlideParagraph>
        </div>

        <div className="flex-1 flex items-center justify-center bg-muted/20 dark:bg-muted/5 border border-border/40 rounded-xl relative min-h-[180px]">
          <Beam2DDrawing
            beam={beamConfig}
            showDiscontinuities={true}
            showZones={true}
            showSections={true}
            activeStep={step}
          />
          
          <ClickReveal at={1} preset="none"><div className="hidden" /></ClickReveal>
          <ClickReveal at={2} preset="none"><div className="hidden" /></ClickReveal>
          <ClickReveal at={3} preset="none"><div className="hidden" /></ClickReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-1 items-stretch">
          <ClickReveal at={1}>
            <div className="bg-indigo-500/[0.015] border border-indigo-500/10 p-3 rounded-xl h-full flex flex-col justify-start">
              <SlideBullet icon={<span className="text-indigo-500 font-bold font-mono">1</span>}>
                <span className="text-[10.5px] text-foreground leading-relaxed block">
                  Locate Discontinuities: Boundary boundaries exist at x = 0, 5, 12, 17, and 20 m due to reactions, UDL boundaries, and point loads.
                </span>
              </SlideBullet>
            </div>
          </ClickReveal>
          <ClickReveal at={2}>
            <div className="bg-emerald-500/[0.015] border border-emerald-500/10 p-3 rounded-xl h-full flex flex-col justify-start">
              <SlideBullet icon={<span className="text-emerald-500 font-bold font-mono">2</span>}>
                <span className="text-[10.5px] text-foreground leading-relaxed block">
                  <strong>Define 4 Zones:</strong> Establishing boundaries yields Zone 1 (0 ≤ x &lt; 5 m), Zone 2 (5 ≤ x &lt; 12 m), Zone 3 (12 ≤ x &lt; 17 m), and Zone 4 (17 ≤ x ≤ 20 m).
                </span>
              </SlideBullet>
            </div>
          </ClickReveal>
          <ClickReveal at={3}>
            <div className="bg-rose-500/[0.015] border border-rose-500/10 p-3 rounded-xl h-full flex flex-col justify-start">
              <SlideBullet icon={<span className="text-rose-500 font-bold font-mono">3</span>}>
                <span className="text-[10.5px] text-foreground leading-relaxed block">
                  <strong>Apply Section Method:</strong> Section cuts a-a, b-b, c-c, d-d are placed in each zone to solve algebraic force/moment functions.
                </span>
              </SlideBullet>
            </div>
          </ClickReveal>
        </div>
      </div>
    </FullWidthLayout>
  );
};

export default CuttingSectionsL2;
