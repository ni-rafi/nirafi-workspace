import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import {
  InteractiveCard,
  ParameterSlider,
  CalculationOutput,
  SlideCallout
} from '@/features/presentation/components/elements';
import { useUrlSyncedState } from '@/features/presentation/hooks/useUrlSyncedState';
import { calculateSteelLedgerRowInternal } from '../../cores';
import { SteelLedgerTrussDrawing } from '../components/SteelLedgerTrussDrawing';

interface LedgerRow {
  member: string;
  shape: string;
  section: string;
  qty: number;
  length: number;
  unitWeight: number;
  totalWeight: number;
  highlightKey: string;
}

export const SteelLedgerSandbox: React.FC = () => {
  const [span, setSpan] = useUrlSyncedState<number>('ledger_span', 10.0); // in meters
  const [rise, setRise] = useUrlSyncedState<number>('ledger_rise', 2.5); // in meters
  const [bayLength, setBayLength] = useUrlSyncedState<number>('ledger_bay', 6.0); // in meters
  const [selectedKey, setSelectedKey] = useUrlSyncedState<string>('ledger_selected_key', 'rafter');

  // Sloped rafter length = sqrt(rise^2 + (span/2)^2)
  const rafterLength = Math.round(Math.sqrt(rise * rise + (span / 2) * (span / 2)) * 1000) / 1000;
  
  // Purlin length equals the bay length
  const purlinLength = bayLength;

  const rows: LedgerRow[] = [
    {
      member: 'Principal Rafter (Top Chord)',
      shape: 'Double Angle',
      section: '2L 75×75×6 mm',
      qty: 2,
      length: rafterLength,
      unitWeight: 13.6, // kg/m (for double angle)
      totalWeight: calculateSteelLedgerRowInternal(2, rafterLength, 13.6),
      highlightKey: 'rafter'
    },
    {
      member: 'Main Tie (Bottom Chord)',
      shape: 'Double Angle',
      section: '2L 65×65×6 mm',
      qty: 1,
      length: span,
      unitWeight: 11.4, // kg/m
      totalWeight: calculateSteelLedgerRowInternal(1, span, 11.4),
      highlightKey: 'tie'
    },
    {
      member: 'Web Diagonals (Struts)',
      shape: 'Single Angle',
      section: 'L 50×50×5 mm',
      qty: 6,
      length: 1.8, // average vertical/inclined strut length
      unitWeight: 3.8, // kg/m
      totalWeight: calculateSteelLedgerRowInternal(6, 1.8, 3.8),
      highlightKey: 'web'
    },
    {
      member: 'Roof Purlins',
      shape: 'Channel Section',
      section: 'ISMC 100',
      qty: 8, // 4 purlins per slope
      length: purlinLength,
      unitWeight: 9.6, // kg/m
      totalWeight: calculateSteelLedgerRowInternal(8, purlinLength, 9.6),
      highlightKey: 'purlin'
    },
    {
      member: 'Sagrods',
      shape: 'Circular Rod',
      section: 'Ø 12 mm Rod',
      qty: 6,
      length: 1.5,
      unitWeight: 0.89, // kg/m
      totalWeight: calculateSteelLedgerRowInternal(6, 1.5, 0.89),
      highlightKey: 'sagrod'
    },
    {
      member: 'Top Chord Bracings',
      shape: 'Single Angle',
      section: 'L 50×50×5 mm',
      qty: 4,
      length: 4.2,
      unitWeight: 3.8, // kg/m
      totalWeight: calculateSteelLedgerRowInternal(4, 4.2, 3.8),
      highlightKey: 'bracing'
    }
  ];

  const grandTotalKg = Math.round(rows.reduce((sum, r) => sum + r.totalWeight, 0) * 1000) / 1000;

  return (
    <TwoColumnLayout
      title="Steel Calculation Ledger Sandbox"
      bgVariant="default"
      leftWidth="42%"
      leftContent={
        <div className="flex flex-col gap-4">
          <InteractiveCard title="Geometry Controls">
            <div className="space-y-4 mb-1">
              <ParameterSlider
                label="Truss Span (Bottom Chord)"
                min={6.0}
                max={14.0}
                step={0.5}
                value={span}
                onChange={setSpan}
                unit=" m"
              />
              <ParameterSlider
                label="Truss Rise"
                min={1.5}
                max={4.0}
                step={0.1}
                value={rise}
                onChange={setRise}
                unit=" m"
              />
              <ParameterSlider
                label="Bay Length (Purlin Span)"
                min={4.0}
                max={8.0}
                step={0.5}
                value={bayLength}
                onChange={setBayLength}
                unit=" m"
              />
            </div>
          </InteractiveCard>

          <InteractiveCard title="Selected Member Visual" variant="plain" className="bg-background/40 border border-border/30 p-3">
            <div className="flex items-center justify-center h-[140px]">
              <SteelLedgerTrussDrawing
                span={span}
                rise={rise}
                bayLength={bayLength}
                selectedKey={selectedKey}
                onSelectKey={setSelectedKey}
              />
            </div>
            <span className="text-[10px] text-muted-foreground block text-center mt-1">Click a member on the diagram to select it in the ledger</span>
          </InteractiveCard>
        </div>
      }
      rightContent={
        <div className="h-full flex flex-col justify-between space-y-4">
          <InteractiveCard title="Calculated Structural Steel Ledger" className="flex-1">
            <div className="w-full overflow-x-auto select-text scrollbar-thin">
              <table className="w-full text-[10px] font-mono border-collapse text-left">
                <thead>
                  <tr className="border-b border-border/60 text-muted-foreground font-bold">
                    <th className="pb-1.5 font-sans">Member</th>
                    <th className="pb-1.5 font-sans">Section</th>
                    <th className="pb-1.5 font-sans text-center">Qty</th>
                    <th className="pb-1.5 font-sans text-right">Length</th>
                    <th className="pb-1.5 font-sans text-right">Unit Wt</th>
                    <th className="pb-1.5 font-sans text-right">Total Wt</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr
                      key={row.highlightKey}
                      className={`border-b border-border/30 hover:bg-muted/30 cursor-pointer ${
                        selectedKey === row.highlightKey ? 'bg-primary/5 text-primary font-bold border-l-2 border-l-primary pl-1' : 'text-foreground/80'
                      }`}
                      onClick={() => setSelectedKey(row.highlightKey)}
                    >
                      <td className="py-2 pr-1 font-sans truncate max-w-[120px]" title={row.member}>{row.member}</td>
                      <td className="py-2 pr-1">{row.section}</td>
                      <td className="py-2 text-center">{row.qty}</td>
                      <td className="py-2 text-right">{row.length.toFixed(3)} m</td>
                      <td className="py-2 text-right">{row.unitWeight.toFixed(2)} kg/m</td>
                      <td className="py-2 text-right">{row.totalWeight.toFixed(2)} kg</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="border-t border-border/40 pt-3 mt-4">
              <CalculationOutput
                title="Grand Total Structural Weight"
                value={grandTotalKg}
                unit="kg"
                subtitle="Sum of all truss members and secondary bracings/sagrods"
              />
            </div>
          </InteractiveCard>

          <SlideCallout variant="info" title="Take-Off Tip" className="py-2">
            <p className="text-[10px] leading-relaxed text-muted-foreground">
              A standard industrial shed detailed estimate must aggregate structural weight in metric tons or kg. Notice how changing the <strong>Truss Span</strong> immediately scales both the <strong>Main Tie</strong> and <strong>Principal Rafters</strong>.
            </p>
          </SlideCallout>
        </div>
      }
    />
  );
};

export default SteelLedgerSandbox;
