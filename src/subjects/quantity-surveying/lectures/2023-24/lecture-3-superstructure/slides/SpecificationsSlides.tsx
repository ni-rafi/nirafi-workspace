import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { InteractiveCard, SlideList, ParameterSlider, CalculationOutput } from '@/features/presentation/components/elements';
import { ShieldAlert, HelpCircle } from 'lucide-react';
import { useUrlSyncedState } from '@/features/presentation/hooks/useUrlSyncedState';

/**
 * Slide 1: Rate Analysis
 */
export const Slide1: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Analysis of Rates (AoR) Fundamentals"
      leftWidth="50%"
      leftContent={
        <div className="space-y-4 flex flex-col justify-between h-full">
          <InteractiveCard title="What is Rate Analysis?">
            <p className="text-xs text-muted-foreground leading-relaxed">
              The method of determining the rate per unit of measurement for a particular item of work. It is obtained by summing the costs of:
            </p>
            <SlideList
              variant="plain"
              revealMode="none"
              items={[
                { title: 'Material Cost:', text: 'Price of raw materials delivered to site, including transit and wastage.' },
                { title: 'Labor Cost:', text: 'Wages for skilled and unskilled workers (masons, helpers, etc.).' },
                { title: 'Equipment Cost:', text: 'Rental or operational costs of mixers, vibrators, and scaffolding.' },
                { title: 'Overheads & Profit:', text: 'Contractor administrative costs and standard profit margin.' },
              ]}
            />
          </InteractiveCard>
        </div>
      }
      rightContent={
        <div className="space-y-4 flex flex-col justify-between h-full">
          <InteractiveCard title="The Contractor's Margin & Purpose">
            <p className="text-xs text-muted-foreground leading-relaxed">
              A standard margin of <span className="text-primary font-bold">10%</span> is added to the total cost of materials and labor to represent a reasonable contractor profit.
            </p>
            <div className="mt-2 space-y-2">
              <div className="p-2.5 bg-muted/40 border border-border/40 rounded-lg text-xs leading-normal">
                <strong className="text-foreground">PWD Schedule Rates:</strong> AoR helps surveyors check the validity of bidding rates against official government indexes.
              </div>
              <div className="p-2.5 bg-muted/40 border border-border/40 rounded-lg text-xs leading-normal">
                <strong className="text-foreground">Material Planning:</strong> Enables estimators to forecast actual material counts and workforce days required for completion.
              </div>
            </div>
          </InteractiveCard>
        </div>
      }
    />
  );
};

/**
 * Slide 2: Material Breakdown & Conversions
 */
export const Slide2: React.FC = () => {
  const [mixType, setMixType] = useUrlSyncedState<'concrete' | 'mortar'>('mix_calc_type', 'concrete');
  const [wetVolume, setWetVolume] = useUrlSyncedState<number>('mix_wet_vol', 10.0);
  const [ratioPreset, setRatioPreset] = useUrlSyncedState<string>('mix_ratio_preset', mixType === 'concrete' ? '1:2:4' : '1:4');

  // Sync preset if type changes
  React.useEffect(() => {
    if (mixType === 'concrete') {
      setRatioPreset('1:2:4');
    } else {
      setRatioPreset('1:4');
    }
  }, [mixType, setRatioPreset]);

  // Sizing multipliers
  const shrinkageFactor = mixType === 'concrete' ? 1.54 : 1.25;
  const dryVolume = wetVolume * shrinkageFactor;

  // Parse ratios
  const parts = ratioPreset.split(':').map(Number);
  const cementPart = parts[0] || 1;
  const sandPart = parts[1] || 2;
  const aggregatePart = parts[2] || 0;
  const totalParts = parts.reduce((a, b) => a + b, 0);

  // Material calculations
  const cementVol = dryVolume * (cementPart / totalParts);
  const cementBags = cementVol / 0.0347; // 1 bag = 0.0347 m3 (1.25 cft)

  const sandVol = dryVolume * (sandPart / totalParts);
  const aggregateVol = mixType === 'concrete' ? dryVolume * (aggregatePart / totalParts) : 0;

  return (
    <TwoColumnLayout
      title="Volumetric Shrinkage & Material Conversions"
      leftWidth="45%"
      leftContent={
        <div className="space-y-4 flex flex-col justify-between h-full">
          <InteractiveCard title="The Shrinkage Multiplier">
            <p className="text-xs text-muted-foreground leading-relaxed">
              Dry ingredients shrink when mixed with water and compacted. We must estimate loose dry volumes to purchase materials.
            </p>
            <div className="mt-2 space-y-2">
              <div className="p-2.5 bg-muted/40 border border-border/40 rounded-lg text-xs leading-normal">
                <span className="font-bold text-primary">Concrete mix multiplier:</span> Wet Volume &times; <span className="font-mono text-foreground font-bold">1.54 to 1.57</span>
              </div>
              <div className="p-2.5 bg-muted/40 border border-border/40 rounded-lg text-xs leading-normal">
                <span className="font-bold text-primary">Mortar mix multiplier:</span> Wet Volume &times; <span className="font-mono text-foreground font-bold">1.25 to 1.30</span>
              </div>
              <div className="p-2.5 bg-muted/40 border border-border/40 rounded-lg text-xs leading-normal">
                <span className="font-bold text-primary">Cement Bag Unit:</span> 1 Bag (50 kg) = <span className="font-mono text-foreground font-bold">1.25 cft (0.0347 m³)</span>
              </div>
            </div>
          </InteractiveCard>
          <div className="p-3 bg-muted/20 border border-border/40 rounded-xl flex gap-2.5 items-start">
            <HelpCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <p className="text-[10.5px] text-muted-foreground leading-relaxed">
              <strong> Bangladesh Practice:</strong> Dry sand has higher shrinkage variances. PWD standard multipliers are standard guidelines for public estimates.
            </p>
          </div>
        </div>
      }
      rightContent={
        <InteractiveCard title="Dry Mix Material Calculator">
          <div className="space-y-3">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setMixType('concrete')}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg border transition-all ${
                  mixType === 'concrete' ? 'bg-primary/10 border-primary text-primary' : 'bg-background text-muted-foreground border-border/40'
                }`}
              >
                Concrete
              </button>
              <button
                type="button"
                onClick={() => setMixType('mortar')}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg border transition-all ${
                  mixType === 'mortar' ? 'bg-primary/10 border-primary text-primary' : 'bg-background text-muted-foreground border-border/40'
                }`}
              >
                Mortar
              </button>
            </div>

            <ParameterSlider
              label="Wet Compacted Volume"
              min={1}
              max={50}
              step={0.5}
              value={wetVolume}
              onChange={setWetVolume}
              unit=" m³"
            />

            <div className="flex justify-between items-center bg-muted/40 p-2 rounded-lg border border-border/40">
              <span className="text-[10px] font-mono text-muted-foreground uppercase">Mix Proportion Ratio</span>
              <select
                value={ratioPreset}
                onChange={(e) => setRatioPreset(e.target.value)}
                className="bg-background text-primary text-xs font-mono font-bold border border-border/40 px-2 py-1 rounded"
              >
                {mixType === 'concrete' ? (
                  <>
                    <option value="1:1.5:3">1:1.5:3 (M20 / RCC Frame)</option>
                    <option value="1:2:4">1:2:4 (M15 / Mass Footings)</option>
                    <option value="1:3:6">1:3:6 (M10 / Base Bedding)</option>
                  </>
                ) : (
                  <>
                    <option value="1:3">1:3 (Rich joint masonry)</option>
                    <option value="1:4">1:4 (Standard 5&quot; wall / Plaster)</option>
                    <option value="1:6">1:6 (10&quot; thick walls)</option>
                  </>
                )}
              </select>
            </div>

            <div className="border-t border-border/40 pt-2 text-[10px] font-mono text-muted-foreground flex justify-between">
              <span>Dry Volume ({shrinkageFactor}x):</span>
              <span className="font-bold text-foreground">{dryVolume.toFixed(2)} m³</span>
            </div>

            <div className="grid grid-cols-3 gap-2 border-t border-border/40 pt-2">
              <CalculationOutput title="Cement Required" value={Math.ceil(cementBags)} unit="bags" />
              <CalculationOutput title="Sand Volume" value={sandVol.toFixed(2)} unit="m³" />
              {mixType === 'concrete' ? (
                <CalculationOutput title="Coarse Agg" value={aggregateVol.toFixed(2)} unit="m³" />
              ) : (
                <div className="bg-muted/20 border border-border/40 rounded-xl p-2.5 opacity-40 flex items-center justify-center text-[10px] text-muted-foreground">
                  N/A (Mortar)
                </div>
              )}
            </div>
          </div>
        </InteractiveCard>
      }
    />
  );
};

/**
 * Slide 3: Governing Quality and Cost: Specifications
 */
export const Slide3: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Governing Quality and Cost: Specifications"
      leftWidth="50%"
      leftContent={
        <div className="space-y-4 flex flex-col justify-between h-full">
          <InteractiveCard title="The Role of Specifications">
            <p className="text-xs text-muted-foreground leading-relaxed">
              A document specifying the class of work, material grades, water-cement ratios, and workmanship steps.
            </p>
            <div className="p-2.5 bg-amber-500/5 border-l-4 border-amber-500 text-amber-600 dark:text-amber-400 text-[11px] font-semibold mt-2 flex gap-2">
              <ShieldAlert className="w-4 h-4 flex-shrink-0" />
              <span>The unit rate of any work is completely governed by its specification. Changes in specifications alter rates directly.</span>
            </div>
          </InteractiveCard>
        </div>
      }
      rightContent={
        <div className="space-y-4 flex flex-col justify-between h-full">
          <InteractiveCard title="General vs. Detailed Specifications">
            <div className="space-y-3">
              <div className="bg-muted/40 p-3 border border-border/40 rounded-lg">
                <span className="text-[10px] text-primary uppercase font-bold block mb-1">General Specifications</span>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Summarizes the nature and quality of components in general terms. Used for preliminary estimates to form a broad outline.
                </p>
              </div>
              <div className="bg-muted/40 p-3 border border-border/40 rounded-lg">
                <span className="text-[10px] text-emerald-500 uppercase font-bold block mb-1">Detailed Specifications</span>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Exhaustive instructions describing exact material grades, concrete mix ratios, curing periods, and structural standards.
                </p>
              </div>
            </div>
          </InteractiveCard>
        </div>
      }
    />
  );
};
