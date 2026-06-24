import React from 'react';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import {
  InteractiveCard,
  SlideBullet,
  ParameterSlider,
  CalculationOutput,
  SlideContent,
  LatexFormula
} from '@/features/presentation/components/elements';
import { ColumnVolumeSandbox, BeamClearSpanSandbox } from '@/subjects/quantity-surveying/features';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { useUrlSyncedState } from '@/features/presentation/hooks/useUrlSyncedState';

// Slide 5: 2.1 Superstructure Columns: Net Height
export const Slide5: React.FC = () => (
  <ColumnVolumeSandbox />
);

// Slide 6: 2.2 Floor Beams: Extracting Clear Span
export const Slide6: React.FC = () => (
  <BeamClearSpanSandbox />
);

// Slide 7: 2.3 Slab Projections & Cantilevers
export const Slide7: React.FC = () => {
  return (
    <FullWidthLayout title="2.3 Slab Projections & Cantilevers" bgVariant="default">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-6">
          <InteractiveCard title="Volumetric Slabs Rules" className="h-full flex flex-col justify-between">
            <ul className="flex flex-col gap-4">
              <SlideBullet revealAt={0} icon="🟦">
                <span>
                  Slabs are estimated volumetrically by multiplying plan floor areas by design slab thickness.
                </span>
              </SlideBullet>
              <SlideBullet revealAt={1} icon="📐">
                <span>
                  <strong>Cantilevers:</strong> Projecting balconies, verandas, and sunshades (chajjas) must be computed separately and added to the slab totals.
                </span>
              </SlideBullet>
              <SlideBullet revealAt={2} icon="🌧️">
                <span>
                  <strong>Weathering Copings:</strong> Keep running copings at roof level separated from standard slab concrete.
                </span>
              </SlideBullet>
            </ul>
          </InteractiveCard>
        </div>

        <div className="lg:col-span-6">
          <InteractiveCard title="Slab-Cantilever Cross-Section" className="h-full flex flex-col justify-center">
            <div className="w-full aspect-[1.8/1] bg-background border border-border/30 rounded-lg flex items-center justify-center p-2 relative overflow-hidden">
              <svg viewBox="0 0 320 180" className="w-full h-full select-none overflow-visible">
                {/* Main Slab */}
                <rect x="20" y="70" width="180" height="25" className="fill-muted stroke-border/60" strokeWidth="1.5" />
                <text x="110" y="85" textAnchor="middle" className="fill-muted-foreground font-mono text-[9px] font-bold">Main Floor Slab</text>

                {/* Cantilever/Balcony */}
                <polygon points="200,70 280,70 280,82 200,95" className="fill-primary/10 stroke-primary" strokeWidth="1.5" />
                <text x="240" y="64" textAnchor="middle" className="fill-primary font-mono text-[8px] font-bold">Cantilever Balcony</text>

                {/* Support Column */}
                <rect x="180" y="95" width="20" height="60" className="fill-muted stroke-border/40" strokeWidth="1" />

                {/* Rebar lines representation */}
                <line x1="30" y1="74" x2="275" y2="74" stroke="red" strokeWidth="1" opacity="0.6" />
                <line x1="30" y1="91" x2="198" y2="91" stroke="red" strokeWidth="1" opacity="0.6" />
                {/* Main reinforcement hook */}
                <path d="M 275 74 L 277 78 L 272 81" fill="none" stroke="red" strokeWidth="1" opacity="0.6" />

                {/* Dimension markup */}
                <line x1="20" y1="150" x2="200" y2="150" stroke="currentColor" className="text-muted-foreground/30" strokeWidth="1" />
                <line x1="200" y1="150" x2="280" y2="150" stroke="red" strokeWidth="1" />
                <text x="110" y="144" textAnchor="middle" className="fill-muted-foreground font-mono text-[8px]">Room span</text>
                <text x="240" y="144" textAnchor="middle" className="fill-primary font-mono text-[8px] font-bold">Cantilever span</text>
              </svg>
            </div>
          </InteractiveCard>
        </div>
      </div>
    </FullWidthLayout>
  );
};

/**
 * Slide 7B: Estimating Centering and Shuttering (Formwork)
 */
export const Slide7_Formwork: React.FC = () => {
  const [colConcrete, setColConcrete] = useUrlSyncedState<number>('fw_col_concrete', 15);
  const [beamConcrete, setBeamConcrete] = useUrlSyncedState<number>('fw_beam_concrete', 25);
  const [slabConcrete, setSlabConcrete] = useUrlSyncedState<number>('fw_slab_concrete', 40);
  const [concreteRate, setConcreteRate] = useUrlSyncedState<number>('fw_concrete_rate', 15000);

  // Estimating contact area (shuttering area) in square meters
  // Columns: ~12.5 m² per m³ of concrete
  // Beams: ~8.5 m² per m³ of concrete
  // Slabs: ~6.67 m² per m³ of concrete (assuming 150mm thick slab)
  const colFwArea = colConcrete * 12.5;
  const beamFwArea = beamConcrete * 8.5;
  const slabFwArea = slabConcrete * 6.67;
  const totalFwArea = colFwArea + beamFwArea + slabFwArea;

  const fwRate = 600; // BDT per square meter
  const estFwCost = totalFwArea * fwRate;

  const totalConcreteVol = colConcrete + beamConcrete + slabConcrete;
  const concreteCost = totalConcreteVol * concreteRate;

  const costRatioPercent = concreteCost > 0 ? (estFwCost / concreteCost) * 100 : 0;

  return (
    <TwoColumnLayout
      title="Centering, Shuttering &amp; Formwork"
      bgVariant="default"
      leftWidth="50%"
      leftContent={
        <div className="space-y-4">
          <SlideContent
            blocks={[
              {
                type: 'paragraph',
                text: (
                  <span>
                    Before pouring wet concrete for superstructure elements (columns, beams, slabs), temporary molds called <strong>formwork</strong> must be erected.
                  </span>
                ),
              },
              {
                type: 'bullet',
                text: (
                  <span>
                    <strong>Measurement Standard:</strong> Formwork is quantified separately in square area units (<LatexFormula math="\text{m}^2" /> or sq-ft) of the actual contact surface between wet concrete and the shuttering boards.
                  </span>
                ),
                revealAt: 0,
              },
              {
                type: 'bullet',
                text: (
                  <span>
                    <strong>Cost Impact:</strong> Formwork accounts for approximately <strong>30%</strong> of the total cement concrete work budget. Never omit it from detailed estimates.
                  </span>
                ),
                revealAt: 1,
              },
              {
                type: 'bullet',
                text: (
                  <span>
                    <strong>Ledger Separation:</strong> Log formwork as separate items for floor slabs, rectangular beams, and vertical columns due to varying complexity in support structure (propping/strutting).
                  </span>
                ),
                revealAt: 2,
              },
            ]}
          />
        </div>
      }
      rightContent={
        <InteractiveCard title="Formwork Contact Area &amp; Cost Estimator">
          <div className="space-y-3 mb-4 select-none">
            <div className="grid grid-cols-3 gap-2">
              <ParameterSlider
                label="Col Concrete"
                min={5}
                max={40}
                step={1}
                value={colConcrete}
                onChange={setColConcrete}
                unit=" m³"
              />
              <ParameterSlider
                label="Beam Concrete"
                min={5}
                max={60}
                step={1}
                value={beamConcrete}
                onChange={setBeamConcrete}
                unit=" m³"
              />
              <ParameterSlider
                label="Slab Concrete"
                min={10}
                max={100}
                step={2}
                value={slabConcrete}
                onChange={setSlabConcrete}
                unit=" m³"
              />
            </div>

            <div className="border-t border-border/40 pt-2">
              <ParameterSlider
                label="Concrete Rate (BDT/m³)"
                min={10000}
                max={20000}
                step={500}
                value={concreteRate}
                onChange={setConcreteRate}
                unit=" ৳"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 border-t border-border/40 pt-3 text-[11px] font-mono">
            <CalculationOutput title="Col Formwork" value={`${colFwArea.toFixed(1)}`} unit="m²" />
            <CalculationOutput title="Beam Formwork" value={`${beamFwArea.toFixed(1)}`} unit="m²" />
            <CalculationOutput title="Slab Formwork" value={`${slabFwArea.toFixed(1)}`} unit="m²" />
          </div>

          <div className="grid grid-cols-2 gap-3 border-t border-border/40 pt-3 font-mono text-[11px] mt-2">
            <CalculationOutput title="Total Shuttering Area" value={`${totalFwArea.toFixed(1)}`} unit="m²" />
            <CalculationOutput title="Est Formwork Cost (৳600/m²)" value={`৳${estFwCost.toLocaleString(undefined, {maximumFractionDigits:0})}`} unit="" />
          </div>

          <div className="mt-3 bg-primary/10 border border-primary/20 rounded-xl p-2.5 flex justify-between items-center">
            <span className="text-[10px] font-bold text-muted-foreground uppercase">Formwork % of Concrete Cost</span>
            <span className="text-sm font-black text-primary font-mono">{costRatioPercent.toFixed(1)}%</span>
          </div>
        </InteractiveCard>
      }
    />
  );
};

