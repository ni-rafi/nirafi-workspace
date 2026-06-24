import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import {
  InteractiveCard,
  ParameterSlider,
  CalculationOutput
} from '@/features/presentation/components/elements';
import { EcoStpPrefabDrawing } from '../components/EcoStpPrefabDrawing';
import { useUrlSyncedState } from '@/features/presentation/hooks/useUrlSyncedState';
import { calculateEcoStpCost, calculatePrefabTanksCost } from '../../cores/reservoir';

export const EcoStpPrefabSandbox: React.FC = () => {
  const [capacityL, setCapacityL] = useUrlSyncedState<number>('ecostp_cap', 2000);
  const [stpRate, setStpRate] = useUrlSyncedState<number>('ecostp_rate', 35);
  const [startupCharge, setStartupCharge] = useUrlSyncedState<number>('ecostp_startup', 8000);

  const [plasticCount, setPlasticCount] = useUrlSyncedState<number>('prefab_p_count', 2);
  const [plasticRate, setPlasticRate] = useUrlSyncedState<number>('prefab_p_rate', 12000);

  const [ferroCount, setFerroCount] = useUrlSyncedState<number>('prefab_f_count', 1);
  const [ferroRate, setFerroRate] = useUrlSyncedState<number>('prefab_f_rate', 9500);

  const [activeHighlight, setActiveHighlight] = useUrlSyncedState<'none' | 'ecostp' | 'prefab'>('ecostp_prefab_highlight', 'none');

  const {
    baseStpCostBdt,
    startupChargeBdt: finalStartupCharge,
    totalStpCostBdt
  } = calculateEcoStpCost(capacityL, stpRate, startupCharge);

  const {
    plasticCostBdt,
    ferroCostBdt,
    totalPrefabCostBdt
  } = calculatePrefabTanksCost(plasticCount, plasticRate, ferroCount, ferroRate);

  return (
    <TwoColumnLayout
      title="Eco STP & Prefab Tanks Sandbox"
      bgVariant="default"
      leftWidth="45%"
      leftContent={
        <InteractiveCard title="Pricing & Count Parameters">
          <div className="space-y-3 mb-3 max-h-[360px] overflow-y-auto pr-1">
            <div className="border-b border-border/20 pb-2">
              <span className="text-xs font-bold text-primary block mb-2">Eco Sewage Treatment Plant (STP)</span>
              <div className="grid grid-cols-2 gap-2">
                <ParameterSlider label="Capacity (L)" min={1000} max={10000} step={500} value={capacityL} onChange={setCapacityL} unit=" L" />
                <ParameterSlider label="Rate / L" min={10} max={80} step={1} value={stpRate} onChange={setStpRate} unit=" ৳" />
              </div>
              <ParameterSlider label="Startup Charge" min={2000} max={15000} step={500} value={startupCharge} onChange={setStartupCharge} unit=" ৳" />
            </div>

            <div>
              <span className="text-xs font-bold text-primary block mb-2">Prefabricated Storage Tanks</span>
              <div className="grid grid-cols-2 gap-2">
                <ParameterSlider label="Plastic (Nos)" min={0} max={6} step={1} value={plasticCount} onChange={setPlasticCount} unit="" />
                <ParameterSlider label="Plastic Rate" min={5000} max={30000} step={500} value={plasticRate} onChange={setPlasticRate} unit=" ৳" />
                <ParameterSlider label="Ferro (Nos)" min={0} max={6} step={1} value={ferroCount} onChange={setFerroCount} unit="" />
                <ParameterSlider label="Ferro Rate" min={4000} max={25000} step={500} value={ferroRate} onChange={setFerroRate} unit=" ৳" />
              </div>
            </div>

            <div className="border-t border-border/30 pt-2 flex items-center justify-between">
              <span className="text-xs font-bold text-muted-foreground">Highlight Panel:</span>
              <select
                value={activeHighlight}
                onChange={(e) => setActiveHighlight(e.target.value as 'none' | 'ecostp' | 'prefab')}
                className="text-xs font-bold bg-muted border border-border/60 rounded px-2.5 py-1 text-foreground focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
              >
                <option value="none">Show Both Panels</option>
                <option value="ecostp">Eco STP System Details</option>
                <option value="prefab">Prefab Storage Tanks</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 border-t border-border/40 pt-3 font-mono">
            <CalculationOutput title="Eco STP Base Cost" value={`৳${baseStpCostBdt.toLocaleString()}`} unit="" variant="compact" />
            <CalculationOutput title="STP Startup Charge" value={`৳${finalStartupCharge.toLocaleString()}`} unit="" variant="compact" />
            <CalculationOutput title="Total Eco STP Cost" value={`৳${totalStpCostBdt.toLocaleString()}`} unit="" variant="compact" />
            <CalculationOutput title="Plastic Tanks Cost" value={`৳${plasticCostBdt.toLocaleString()}`} unit="" variant="compact" />
            <CalculationOutput title="Ferro Tanks Cost" value={`৳${ferroCostBdt.toLocaleString()}`} unit="" variant="compact" />
            <CalculationOutput title="Total Prefab Cost" value={`৳${totalPrefabCostBdt.toLocaleString()}`} unit="" variant="compact" />
          </div>
        </InteractiveCard>
      }
      rightContent={
        <EcoStpPrefabDrawing activeHighlight={activeHighlight} className="flex-1" />
      }
    />
  );
};

export default EcoStpPrefabSandbox;
