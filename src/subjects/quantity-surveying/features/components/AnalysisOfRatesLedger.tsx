import React from 'react';
import { useUrlSyncedState } from '@/features/presentation/hooks/useUrlSyncedState';
import { calculateUnitRateFromScratch } from '../../cores';

interface AnalysisOfRatesLedgerProps {
  className?: string;
}

export const AnalysisOfRatesLedger: React.FC<AnalysisOfRatesLedgerProps> = ({ className = '' }) => {
  const [materialCost, setMaterialCost] = useUrlSyncedState<number>('rate_material_cost', 3500);
  const [laborCost, setLaborCost] = useUrlSyncedState<number>('rate_labor_cost', 1200);
  const [equipmentCost, setEquipmentCost] = useUrlSyncedState<number>('rate_equipment_cost', 400);
  const [overheadPct, setOverheadPct] = useUrlSyncedState<number>('rate_overhead_pct', 15);
  const [profitPct, setProfitPct] = useUrlSyncedState<number>('rate_profit_pct', 10);

  const ohRate = overheadPct / 100;
  const prRate = profitPct / 100;

  const directSubtotal = materialCost + laborCost + equipmentCost;
  const overheadCost = Math.round(directSubtotal * ohRate * 1000) / 1000;
  const subtotalWithOh = directSubtotal + overheadCost;
  const profitCost = Math.round(subtotalWithOh * prRate * 1000) / 1000;
  const grandTotal = calculateUnitRateFromScratch(materialCost, laborCost, equipmentCost, ohRate, prRate);

  const formatBDT = (amount: number) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-5 p-5 bg-card text-card-foreground border border-border/55 rounded-2xl shadow-sm ${className}`}>
      {/* Parameters Sidebar */}
      <div className="space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
          Adjust Rate Parameters
        </h4>
        
        {/* Sliders */}
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-medium">Direct Materials Cost:</span>
              <span className="font-mono font-bold text-primary">{formatBDT(materialCost)}</span>
            </div>
            <input
              type="range"
              min="500"
              max="10000"
              step="100"
              value={materialCost}
              onChange={(e) => setMaterialCost(Number(e.target.value))}
              className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-medium">Direct Labor Cost:</span>
              <span className="font-mono font-bold text-primary">{formatBDT(laborCost)}</span>
            </div>
            <input
              type="range"
              min="200"
              max="5000"
              step="50"
              value={laborCost}
              onChange={(e) => setLaborCost(Number(e.target.value))}
              className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-medium">Direct Equipment Cost:</span>
              <span className="font-mono font-bold text-primary">{formatBDT(equipmentCost)}</span>
            </div>
            <input
              type="range"
              min="0"
              max="2000"
              step="50"
              value={equipmentCost}
              onChange={(e) => setEquipmentCost(Number(e.target.value))}
              className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>

          <div className="border-t border-border/40 my-3 pt-3">
            <div className="flex justify-between text-xs mb-1">
              <span className="font-medium">Contractor Overhead:</span>
              <span className="font-mono font-bold text-indigo-600">{overheadPct}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="30"
              step="1"
              value={overheadPct}
              onChange={(e) => setOverheadPct(Number(e.target.value))}
              className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-medium">Contractor Profit:</span>
              <span className="font-mono font-bold text-emerald-600">{profitPct}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="25"
              step="1"
              value={profitPct}
              onChange={(e) => setProfitPct(Number(e.target.value))}
              className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
          </div>
        </div>
      </div>

      {/* Ledger Table */}
      <div className="flex flex-col justify-between border border-border/40 rounded-xl bg-muted/15 p-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 text-center">
          Itemized Rate Analysis Sheet
        </h4>

        <div className="space-y-2 text-xs font-mono">
          <div className="flex justify-between py-1.5 border-b border-border/25">
            <span className="font-sans text-muted-foreground">1. Materials Base Rate</span>
            <span>{formatBDT(materialCost)}</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-border/25">
            <span className="font-sans text-muted-foreground">2. Labor Base Rate</span>
            <span>{formatBDT(laborCost)}</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-border/25">
            <span className="font-sans text-muted-foreground">3. Equipment Rate Component</span>
            <span>{formatBDT(equipmentCost)}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-border/50 font-bold bg-muted/40 px-2 rounded">
            <span className="font-sans">Subtotal (Direct Cost)</span>
            <span>{formatBDT(directSubtotal)}</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-border/25">
            <span className="font-sans text-muted-foreground">4. Overhead Allowance ({overheadPct}%)</span>
            <span className="text-indigo-600">{formatBDT(overheadCost)}</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-border/25 bg-muted/20 px-2 rounded">
            <span className="font-sans text-muted-foreground font-semibold">Subtotal + Overheads</span>
            <span>{formatBDT(subtotalWithOh)}</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-border/30">
            <span className="font-sans text-muted-foreground">5. Contractor Profit ({profitPct}%)</span>
            <span className="text-emerald-600">{formatBDT(profitCost)}</span>
          </div>
          
          <div className="mt-4 p-3 bg-primary/10 border border-primary/20 rounded-lg flex flex-col items-center">
            <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-primary mb-1">
              Analyzed Compound Unit Rate
            </span>
            <span className="text-lg font-bold text-primary font-mono">
              {formatBDT(grandTotal)}
            </span>
            <span className="text-[9px] font-sans text-muted-foreground mt-1">
              Per Cubic Meter (m³) / Square Meter (m²) / Unit
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
