import React from 'react';
import { useUrlSyncedState } from '@/features/presentation/hooks/useUrlSyncedState';
import { LatexFormula, InteractiveCard, ParameterInputCard, CalculationOutput } from '@/features/presentation/components/elements';
import { UnitConverter } from '@/cores/shared/utils/unitConverter';

export const CementBagInfographic: React.FC = () => {
  const [bags, setBags] = useUrlSyncedState<number>('cementBagsCount', 1);

  // Conversion Constants utilizing UnitConverter
  const weightPerBagKg = 50;
  const totalVolumeCft = UnitConverter.cement.bagsToCft(bags);
  const totalVolumeM3 = UnitConverter.volume.cftToM3(totalVolumeCft);
  const totalWeightKg = bags * weightPerBagKg;
  const totalWeightTons = UnitConverter.mass.kgToTonne(totalWeightKg);

  return (
    <div className="flex flex-col gap-4 w-full select-text max-w-5xl mx-auto">
      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {/* Left Column: Definitions, Controls, and Reference Constants */}
        <div className="flex flex-col gap-4">
          <InteractiveCard title="Standard Unit Definition" variant="plain" className="w-full">
            <div className="text-xs md:text-sm text-muted-foreground leading-relaxed">
              In Bangladesh (PWD specifications) and South Asia, cement is universally supplied in standard <strong className="text-primary">50 kg bags</strong>.
              Its dry loose volume matches the standard imperial measure of <strong className="text-primary">1.25 cft per bag</strong>.
            </div>
          </InteractiveCard>

          <div className="border border-border/40 bg-muted/20 dark:bg-muted/5 rounded-xl p-4 flex flex-col gap-2">
            <ParameterInputCard
              label="Cement Bags"
              value={bags}
              min={1}
              max={5000}
              unit="bags"
              variant="compact"
              onChange={setBags}
            />
          </div>

          <div className="border border-border/40 bg-muted/20 dark:bg-muted/5 rounded-xl p-4 flex flex-col gap-2.5">
            <span className="text-[9px] uppercase font-bold text-muted-foreground/80 tracking-wider">Physical Constants Reference</span>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <CalculationOutput
                title="Cement Density"
                value="1,440"
                unit="kg/m³"
                variant="compact"
              />
              <CalculationOutput
                title="Density in Imperial"
                value="90"
                unit="lbs/cft"
                variant="compact"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Mathematical Derivation & Dynamic Output */}
        <div className="flex flex-col gap-4">
          <div className="border border-border/40 bg-muted/20 dark:bg-muted/5 rounded-xl p-4 flex flex-col gap-3">
            <span className="text-[9px] uppercase font-bold text-muted-foreground/80 tracking-wider">Volumetric Derivation Formula</span>
            <div className="flex flex-col gap-3 font-semibold text-primary">
              <div className="flex flex-col gap-1">
                <span className="text-[9px] text-muted-foreground font-medium uppercase">1. Volume in Metric (m³)</span>
                <LatexFormula math={`V_{\\text{m}^3} = \\frac{\\text{Weight}}{\\text{Density}} = \\frac{50 \\text{ kg}}{1440 \\text{ kg/m}^3} \\approx 0.0347 \\text{ m}^3`} />
              </div>
              <div className="flex flex-col gap-1 border-t border-dashed border-border/30 pt-2">
                <span className="text-[9px] text-muted-foreground font-medium uppercase">2. Conversion to Imperial (cft)</span>
                <LatexFormula math={`V_{\\text{cft}} = 0.03472 \\text{ m}^3 \\times 35.315 \\text{ cft/m}^3`} />
                <LatexFormula math={`\\approx 1.226 \\text{ cft} \\approx 1.25 \\text{ cft}`} />
              </div>
            </div>
          </div>

          <div className="border border-border/40 bg-muted/20 dark:bg-muted/5 rounded-xl p-4 flex flex-col gap-3">
            <span className="text-[9px] uppercase font-bold text-muted-foreground/80 tracking-wider">Cumulative Quantities</span>
            <div className="grid grid-cols-2 gap-2.5">
              <CalculationOutput
                title="Total Volume (CFT)"
                value={totalVolumeCft.toFixed(2)}
                unit="cft"
                variant="compact"
              />
              <CalculationOutput
                title="Total Volume (m³)"
                value={totalVolumeM3.toFixed(3)}
                unit="m³"
                variant="compact"
              />
              <CalculationOutput
                title="Total Weight (KG)"
                value={totalWeightKg.toLocaleString()}
                unit="kg"
                variant="compact"
              />
              <CalculationOutput
                title="Total Weight (Tons)"
                value={totalWeightTons.toFixed(3)}
                unit="T"
                variant="compact"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CementBagInfographic;
