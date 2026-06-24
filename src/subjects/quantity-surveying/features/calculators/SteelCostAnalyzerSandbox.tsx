import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import {
  InteractiveCard,
  ParameterSlider,
  CalculationOutput,
  SlideParagraph,
  SlideCallout
} from '@/features/presentation/components/elements';
import { useUrlSyncedState } from '@/features/presentation/hooks/useUrlSyncedState';
import { calculateSteelCostWithMarkupInternal } from '../../cores';

export const SteelCostAnalyzerSandbox: React.FC = () => {
  const [tonnage, setTonnage] = useUrlSyncedState<number>('cost_tonnage', 2.5); // in tonnes
  const [grade, setGrade] = useUrlSyncedState<string>('cost_grade', 'A36');
  const [markupPercent, setMarkupPercent] = useUrlSyncedState<number>('cost_markup', 10); // in percent

  const baseRate = grade === 'A36' ? 120.0 : 145.0; // BDT per kg
  const weightKg = tonnage * 1000;
  
  const result = calculateSteelCostWithMarkupInternal(weightKg, baseRate, markupPercent);

  // Format currency helpers
  const formatBDT = (amount: number) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  return (
    <TwoColumnLayout
      title="PWD Steel Cost &amp; Rate Analyzer"
      bgVariant="default"
      leftWidth="45%"
      leftContent={
        <InteractiveCard title="Budget Cost Setup">
          <div className="space-y-4 mb-5">
            <div>
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block mb-1">Steel Grade (Yield Strength)</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setGrade('A36')}
                  className={`py-1.5 px-3 rounded-lg border text-[11px] font-bold transition-all ${
                    grade === 'A36'
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-muted border-border/50 hover:bg-muted/80 text-foreground'
                  }`}
                >
                  ASTM A36 (250 MPa)
                  <span className="block text-[8px] opacity-80 font-normal">Base Rate: 120.00 BDT/kg</span>
                </button>
                <button
                  onClick={() => setGrade('A572')}
                  className={`py-1.5 px-3 rounded-lg border text-[11px] font-bold transition-all ${
                    grade === 'A572'
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-muted border-border/50 hover:bg-muted/80 text-foreground'
                  }`}
                >
                  ASTM A572 (345 MPa)
                  <span className="block text-[8px] opacity-80 font-normal">Base Rate: 145.00 BDT/kg</span>
                </button>
              </div>
            </div>

            <ParameterSlider
              label="Steel Tonnage (Weight)"
              min={0.5}
              max={15.0}
              step={0.5}
              value={tonnage}
              onChange={setTonnage}
              unit=" Tonnes"
            />

            <ParameterSlider
              label="Erection &amp; Welding Markup"
              min={5}
              max={25}
              step={1}
              value={markupPercent}
              onChange={setMarkupPercent}
              unit=" %"
            />
          </div>

          <div className="border-t border-border/40 pt-4 space-y-3">
            <div className="flex justify-between items-center text-[11px] text-muted-foreground">
              <span>Raw Material Cost:</span>
              <span className="font-mono font-bold text-foreground">{formatBDT(result.materialCost)}</span>
            </div>
            <div className="flex justify-between items-center text-[11px] text-muted-foreground border-b border-dashed border-border/40 pb-2">
              <span>Erection &amp; Welding ({markupPercent}%):</span>
              <span className="font-mono font-bold text-foreground">{formatBDT(result.erectionMarkupCost)}</span>
            </div>
            <CalculationOutput
              title="Grand Total Budget Cost"
              value={result.totalCost}
              unit=" BDT"
              subtitle="Material Cost + Erection Markup"
            />
          </div>
        </InteractiveCard>
      }
      rightContent={
        <div className="h-full flex flex-col justify-between space-y-4">
          <InteractiveCard title="PWD rate Analysis Context" variant="default" className="flex-1">
            <div className="bg-background/40 p-3 rounded-lg border border-border/30 mb-4 select-text">
              <span className="text-[9px] uppercase font-bold text-primary tracking-widest block mb-2">PWD SOR 2022 Reference Rates</span>
              <div className="space-y-2 text-[10px] leading-relaxed text-muted-foreground font-mono">
                <div className="flex justify-between py-1 border-b border-border/30">
                  <span className="font-sans font-semibold text-foreground">A36 Angle Fabrication (Item 6.1)</span>
                  <span>120.00 BDT/kg</span>
                </div>
                <div className="flex justify-between py-1 border-b border-border/30">
                  <span className="font-sans font-semibold text-foreground">A572 High-Yield Truss (Item 6.4)</span>
                  <span>145.00 BDT/kg</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="font-sans font-semibold text-foreground">Site Erection Allowance</span>
                  <span>10% (standard)</span>
                </div>
              </div>
            </div>

            <SlideParagraph variant="plain" className="text-xs text-muted-foreground leading-relaxed">
              Cost take-off parameters for estimators:
            </SlideParagraph>
            <div className="space-y-3 text-[11px] select-text">
              <p>
                • <strong>Rate Selection</strong>: PWD pricing strictly separates rates by structural grade. Choosing a higher grade like ASTM A572 increases material costs but allows lighter member profiles, reducing overall tonnage.
              </p>
              <p>
                • <strong>Erection Allowance</strong>: In commercial contracts, fabrication (making structural members in shop) and erection (assembling them on-site) are distinct rates. A standard 10% allowance is applied in detailed estimates to cover welding, cranes, scaffolding, and bolt tightening.
              </p>
            </div>
          </InteractiveCard>

          <SlideCallout variant="warning" title="Budgeting Standard Code Constraints" className="py-2">
            <p className="text-[10px] leading-relaxed text-muted-foreground">
              Always consult structural drawings for design constraints. Higher strength grade A572 is typically specified for columns and heavy trusses to prevent buckling under high loads.
            </p>
          </SlideCallout>
        </div>
      }
    />
  );
};

export default SteelCostAnalyzerSandbox;
