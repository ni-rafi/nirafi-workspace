import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import { 
  SlideContent, 
  ClickHighlight, 
  LatexFormula, 
  InteractiveCard, 
  ParameterSlider, 
  CalculationOutput,
  SlideTable,
  SlideParagraph
} from '@/features/presentation/components/elements';
import { useUrlSyncedState } from '@/features/presentation/hooks/useUrlSyncedState';

/**
 * Slide 10: Stepped Masonry Footings (Anatomy)
 */
export const Slide10_Anatomy: React.FC = () => {
  const [activeStep, setActiveStep] = useUrlSyncedState<number>('stepped_anatomy_step', 1);

  const stepsInfo = [
    { id: 1, name: 'CC Bedding (Base)', dim: '900mm Width × 75mm Depth', desc: 'Distributes wall loads to natural soil. Typically 900mm (36") wide.' },
    { id: 2, name: '1st Step (Brickwork)', dim: '500mm Width × 150mm Height', desc: 'First load distribution offset. Step width of 500mm (20").' },
    { id: 3, name: '2nd Step (Brickwork)', dim: '375mm Width × 150mm Height', desc: 'Second masonry step reduction. Step width of 375mm (15").' },
    { id: 4, name: '3rd Step / Plinth Wall', dim: '250mm Width × Variable Height', desc: 'Topmost plinth wall extending to ground level. Width of 250mm (10").' }
  ];

  return (
    <TwoColumnLayout
      title="Stepped Masonry Foundation Profile"
      bgVariant="default"
      leftWidth="50%"
      leftContent={
        <div className="space-y-4 flex flex-col justify-between h-full">
          <SlideContent
            blocks={[
              {
                type: 'paragraph',
                text: (
                  <span>
                    Brickwork foundations step down to distribute wall loads to the wider concrete base.
                  </span>
                ),
              },
              {
                type: 'bullet',
                text: (
                  <span>
                    <strong>Standard Offsets:</strong> Standard brick offsets in Bangladesh are typically 125mm (5") or 62.5mm (2.5") per step.
                  </span>
                ),
                revealAt: 0,
              },
              {
                type: 'bullet',
                text: (
                  <span>
                    <strong>The Centerline Shift:</strong> As width ($B$) changes at each step, the centerline deduction correction factor ($0.5 \times B$) must be evaluated independently for each ledger line.
                  </span>
                ),
                revealAt: 1,
              },
            ]}
          />
          <div className="flex flex-col gap-1.5 p-3 bg-muted/40 border border-border/40 rounded-xl">
            <span className="text-[10px] font-mono text-muted-foreground uppercase">Selected Step Details</span>
            {(() => {
              const selectedStep = stepsInfo[activeStep - 1] || {
                id: 1,
                name: 'CC Bedding (Base)',
                dim: '900mm Width × 75mm Depth',
                desc: 'Distributes wall loads to natural soil. Typically 900mm (36") wide.'
              };
              return (
                <>
                  <div className="text-xs font-bold text-primary font-mono">{selectedStep.name}</div>
                  <div className="text-[11px] text-muted-foreground leading-relaxed mt-1">
                    <strong>Dim:</strong> {selectedStep.dim}
                    <br />
                    {selectedStep.desc}
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      }
      rightContent={
        <div className="flex flex-col justify-between h-full bg-muted/20 p-4 border border-border/40 rounded-xl">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Foundation Cross-Section</span>
            <span className="text-[10px] text-primary font-bold">Click layers to inspect</span>
          </div>

          <div className="h-56 bg-muted/40 rounded-lg border border-border/30 flex items-center justify-center p-2 relative overflow-hidden select-none">
            <svg width="220" height="200" viewBox="0 0 220 200" className="w-full h-full max-h-[190px]">
              {/* Natural Ground Level Dashed Line */}
              <line x1="10" y1="50" x2="210" y2="50" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3,3" />
              <text x="20" y="44" className="fill-emerald-500 font-bold text-[8px]">GL</text>

              {/* Stacked footings from top to bottom */}
              <rect x="90" y="50" width="40" height="50"
                onClick={() => setActiveStep(4)}
                className={`cursor-pointer transition-colors duration-300 stroke-border/40 ${
                  activeStep === 4 ? 'fill-primary/20 stroke-primary stroke-[1.5]' : 'fill-muted/40'
                }`}
              />

              <rect x="80" y="100" width="60" height="30"
                onClick={() => setActiveStep(3)}
                className={`cursor-pointer transition-colors duration-300 stroke-border/40 ${
                  activeStep === 3 ? 'fill-primary/20 stroke-primary stroke-[1.5]' : 'fill-muted/40'
                }`}
              />

              <rect x="70" y="130" width="80" height="30"
                onClick={() => setActiveStep(2)}
                className={`cursor-pointer transition-colors duration-300 stroke-border/40 ${
                  activeStep === 2 ? 'fill-primary/20 stroke-primary stroke-[1.5]' : 'fill-muted/40'
                }`}
              />

              <rect x="40" y="160" width="140" height="20"
                onClick={() => setActiveStep(1)}
                className={`cursor-pointer transition-colors duration-300 stroke-border/40 ${
                  activeStep === 1 ? 'fill-primary/20 stroke-primary stroke-[1.5]' : 'fill-muted/40'
                }`}
              />

              {/* Text overlays inside SVG */}
              <text x="110" y="80" className="fill-muted-foreground text-[8px]" textAnchor="middle">Plinth Wall</text>
              <text x="110" y="118" className="fill-muted-foreground text-[8px]" textAnchor="middle">Step 2</text>
              <text x="110" y="148" className="fill-muted-foreground text-[8px]" textAnchor="middle">Step 1</text>
              <text x="110" y="173" className="fill-muted-foreground text-[8px]" textAnchor="middle">CC Bedding</text>
            </svg>
          </div>
        </div>
      }
    />
  );
};

/**
 * Slide 11: Stepped Masonry Footings (Breakdown)
 */
export const Slide10_Breakdown: React.FC = () => {
  const [length, setLength] = useUrlSyncedState<number>('stepped_length', 20.0);
  const [b1] = useUrlSyncedState<number>('stepped_b1', 0.500);
  const [b2] = useUrlSyncedState<number>('stepped_b2', 0.375);
  const [b3] = useUrlSyncedState<number>('stepped_b3', 0.250);

  const [h1, setH1] = useUrlSyncedState<number>('stepped_h1', 0.150);
  const [h2, setH2] = useUrlSyncedState<number>('stepped_h2', 0.150);
  const [h3, setH3] = useUrlSyncedState<number>('stepped_h3', 0.300);

  const vol1 = length * b1 * h1;
  const vol2 = length * b2 * h2;
  const vol3 = length * b3 * h3;
  const totalVol = vol1 + vol2 + vol3;

  return (
    <TwoColumnLayout
      title="Measurement Rules for Stepped Footings"
      leftWidth="50%"
      leftContent={
        <div className="space-y-4 flex flex-col justify-between h-full">
          <InteractiveCard title="Volumetric Ledgers Breakdown">
            <p className="text-xs text-muted-foreground leading-relaxed">
              Unlike an isolated RCC footing which is measured as a single block, a continuous stepped foundation must be split into distinct volumetric ledgers based on step height and breadth.
            </p>
            <div className="space-y-2 mt-2">
              <div className="p-2.5 bg-muted/40 border border-border/40 rounded-lg text-xs leading-normal">
                <span className="font-bold text-primary">Step 1 (Bottom):</span> Widest step. Volume: <LatexFormula math="L \times B_1 \times H_1" />.
              </div>
              <div className="p-2.5 bg-muted/40 border border-border/40 rounded-lg text-xs leading-normal">
                <span className="font-bold text-primary">Step 2 (Middle):</span> Middle offset. Volume: <LatexFormula math="L \times B_2 \times H_2" />.
              </div>
              <div className="p-2.5 bg-muted/40 border border-border/40 rounded-lg text-xs leading-normal">
                <span className="font-bold text-primary">Step 3 (Top/Plinth):</span> Plinth wall up to GL. Volume: <LatexFormula math="L \times B_3 \times H_3" />.
              </div>
            </div>
          </InteractiveCard>

          <InteractiveCard title="Dynamic Volume Totals">
            <div className="grid grid-cols-2 gap-3">
              <CalculationOutput title="Step 1 + Step 2 Vol" value={`${(vol1 + vol2).toFixed(3)}`} unit="m³" />
              <CalculationOutput title="Total Footing Vol" value={`${totalVol.toFixed(3)}`} unit="m³" />
            </div>
          </InteractiveCard>
        </div>
      }
      rightContent={
        <InteractiveCard title="Stepped Foundation Modeler">
          <div className="space-y-4">
            <ParameterSlider
              label="Foundation Continuous Length (L)"
              min={5}
              max={50}
              step={0.5}
              value={length}
              onChange={setLength}
              unit=" m"
            />
            
            <div className="border-t border-border/40 pt-3 space-y-3">
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wide block">Step Heights (H)</span>
              <div className="grid grid-cols-3 gap-2">
                <ParameterSlider
                  label="H1 (Step 1)"
                  min={0.100}
                  max={0.300}
                  step={0.025}
                  value={h1}
                  onChange={setH1}
                  unit=" m"
                />
                <ParameterSlider
                  label="H2 (Step 2)"
                  min={0.100}
                  max={0.300}
                  step={0.025}
                  value={h2}
                  onChange={setH2}
                  unit=" m"
                />
                <ParameterSlider
                  label="H3 (Step 3)"
                  min={0.200}
                  max={0.800}
                  step={0.050}
                  value={h3}
                  onChange={setH3}
                  unit=" m"
                />
              </div>
            </div>
          </div>
        </InteractiveCard>
      }
    />
  );
};

/**
 * Slide 12: Stepped Masonry Footings (Ledger Entry)
 */
export const Slide10_Ledger: React.FC = () => {
  const [length] = useUrlSyncedState<number>('stepped_length', 20.0);
  const [b1] = useUrlSyncedState<number>('stepped_b1', 0.500);
  const [b2] = useUrlSyncedState<number>('stepped_b2', 0.375);
  const [b3] = useUrlSyncedState<number>('stepped_b3', 0.250);

  const [h1] = useUrlSyncedState<number>('stepped_h1', 0.150);
  const [h2] = useUrlSyncedState<number>('stepped_h2', 0.150);
  const [h3] = useUrlSyncedState<number>('stepped_h3', 0.300);

  const vol1 = length * b1 * h1;
  const vol2 = length * b2 * h2;
  const vol3 = length * b3 * h3;
  const totalVol = vol1 + vol2 + vol3;

  const headers = [
    { label: 'Item No.', width: '10%' },
    { label: 'Description of Work', width: '35%' },
    { label: 'No.', align: 'center' as const, width: '8%' },
    { label: 'Length (m)', align: 'right' as const, width: '12%' },
    { label: 'Breadth (m)', align: 'right' as const, width: '12%' },
    { label: 'Height (m)', align: 'right' as const, width: '12%' },
    { label: 'Quantity (m³)', align: 'right' as const, width: '15%' }
  ];

  const rows = [
    ['2.01', 'Brickwork in Foundation (1st Step)', '1', length.toFixed(2), b1.toFixed(3), h1.toFixed(3), vol1.toFixed(3)],
    ['2.02', 'Brickwork in Foundation (2nd Step)', '1', length.toFixed(2), b2.toFixed(3), h2.toFixed(3), vol2.toFixed(3)],
    ['2.03', 'Brickwork in Foundation (3rd Step / Plinth)', '1', length.toFixed(2), b3.toFixed(3), h3.toFixed(3), vol3.toFixed(3)],
    ['', 'Total Brickwork in Substructure', '', '', '', '', totalVol.toFixed(3)]
  ];

  return (
    <FullWidthLayout title="Ledger Entry: Brickwork in Foundation (up to GL)">
      <div className="space-y-4">
        <SlideParagraph variant="plain">
          When recording Stepped Brickwork in the Measurement Book (MB), use separate rows for every step width to maintain arithmetical integrity and auditability.
        </SlideParagraph>
        <SlideTable
          headers={headers}
          rows={rows}
          striped={true}
          bordered={true}
          dense="relaxed"
          caption="MEASUREMENT BOOK (MB) SHEET"
        />
        <div className="mt-2 p-3 bg-primary/5 border border-primary/20 rounded-xl text-center text-xs text-muted-foreground">
          <strong>Measurement Note:</strong> Values in the table are linked directly to the configurations from the previous slide. Try modifying the slider values on the previous page to observe real-time ledger updates.
        </div>
      </div>
    </FullWidthLayout>
  );
};

/**
 * Slide 11: Damp-Proof Course (DPC) & Deductions
 */
export const Slide11: React.FC = () => {
  const [totalLength, setTotalLength] = useUrlSyncedState<number>('dpc_total_length', 24.0);
  const [wallWidth, setWallWidth] = useUrlSyncedState<number>('dpc_wall_width', 0.25);
  const [sillOpenings, setSillOpenings] = useUrlSyncedState<number>('dpc_sill_openings', 3);

  const grossDpc = totalLength * wallWidth;
  const deduction = sillOpenings * 1.0 * wallWidth;
  const netDpc = grossDpc - deduction;

  return (
    <TwoColumnLayout
      title="DPC & Door Sill Deductions"
      bgVariant="default"
      leftWidth="50%"
      leftContent={
        <SlideContent
          blocks={[
            {
              type: 'paragraph',
              text: (
                <span>
                  The Damp-Proof Course (DPC) is a horizontal barrier at plinth level to block capillary moisture rise.
                </span>
              ),
            },
            {
              type: 'bullet',
              text: (
                <span>
                  <strong>Surface Area Standard:</strong> DPC is measured in square meters (<ClickHighlight at={1} variant="paint"><LatexFormula math="\text{m}^2" /></ClickHighlight>) when thickness (e.g. 25mm to 38mm) is standardized.
                </span>
              ),
              revealAt: 0,
            },
            {
              type: 'bullet',
              text: (
                <span>
                  <strong>The Sill Deduction Rule:</strong> DPC must be <ClickHighlight at={2} variant="paint">deducted across all door openings</ClickHighlight>, veranda entrances, and floor gates. No DPC is laid where thresholds are constructed.
                </span>
              ),
              revealAt: 0,
            },
          ]}
        />
      }
      rightContent={
        <InteractiveCard title="DPC Net Area Calculator">
          <div className="space-y-3 mb-4">
            <ParameterSlider
              label="Gross Plinth Wall Length"
              min={10}
              max={50}
              step={1}
              value={totalLength}
              onChange={setTotalLength}
              unit=" m"
            />
            <ParameterSlider
              label="Plinth Wall Width"
              min={0.125}
              max={0.375}
              step={0.125}
              value={wallWidth}
              onChange={setWallWidth}
              unit=" m"
            />
            <ParameterSlider
              label="Number of Door Sill Openings (1.0m each)"
              min={0}
              max={6}
              step={1}
              value={sillOpenings}
              onChange={setSillOpenings}
              unit=" doors"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-border/40">
            <CalculationOutput 
              title="Gross DPC Area" 
              value={`${grossDpc.toFixed(3)}`} 
              unit="m²"
            />
            <CalculationOutput 
              title="DPC Door Deductions (Ddt)" 
              value={`-${deduction.toFixed(3)}`} 
              unit="m²"
              className="text-red-500"
            />
          </div>
          <div className="mt-2 bg-muted/40 p-2 border border-border/40 rounded-xl">
            <CalculationOutput 
              title="Net BoQ DPC Area" 
              value={`${netDpc.toFixed(3)}`} 
              unit="m²"
            />
          </div>
        </InteractiveCard>
      }
    />
  );
};

/**
 * Slide 12: Damp-Proof Membrane (DPM) & Slabs
 */
export const Slide12: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Damp-Proof Membrane & Slabs"
      bgVariant="default"
      leftWidth="50%"
      leftContent={
        <SlideContent
          blocks={[
            {
              type: 'paragraph',
              text: (
                <span>
                  Moisture protection continues under ground floor slabs to isolate habitable areas.
                </span>
              ),
            },
            {
              type: 'bullet',
              text: (
                <span>
                  <strong>Polythene Sheeting (DPM):</strong> Laid flat over compacted sand bedding prior to casting ground floor RCC slabs. Kept in area ($m^2$).
                </span>
              ),
              revealAt: 0,
            },
            {
              type: 'bullet',
              text: (
                <span>
                  <strong>Compacted Sand Filling:</strong> Sand cushion layers (e.g., 75mm–150mm thickness) serve as capillary breaks beneath slabs and are measured in volume ($m^3$).
                </span>
              ),
              revealAt: 1,
            },
          ]}
        />
      }
      rightContent={
        <div className="flex flex-col justify-between h-full bg-muted/20 p-4 border border-border/40 rounded-xl">
          <div className="h-44 bg-muted/40 rounded-lg border border-border/30 relative flex flex-col justify-end p-4">
            <div className="w-full bg-primary/20 border border-primary/45 text-[10px] text-foreground font-extrabold py-2 text-center rounded">
              RCC Ground Floor Slab (100-120mm)
            </div>
            <div className="w-full h-1 bg-emerald-500 animate-pulse my-0.5" />
            <div className="w-full text-[9px] text-emerald-500 font-mono text-center mb-1">
              Polythene Sheet DPM
            </div>
            <div className="w-full bg-amber-500/10 border-x border-b border-amber-500/30 text-[10px] text-amber-600 dark:text-amber-400 font-bold py-3 text-center rounded-b">
              Compacted Sand Cushion Base
            </div>
          </div>
          <div className="p-3 bg-emerald-500/5 border border-emerald-500/20 rounded-lg text-[10px] text-emerald-600 dark:text-emerald-400">
            <strong>Local Practice Note:</strong> Single layer DPM polythene sheets typically overlap by 100mm-150mm. Overlaps are not measured separately; they are covered in material wastage allowances.
          </div>
        </div>
      }
    />
  );
};
