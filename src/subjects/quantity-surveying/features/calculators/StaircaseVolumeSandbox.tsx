import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import {
  InteractiveCard,
  ParameterSlider,
  CalculationOutput,
  SlideParagraph,
  SlideList,
  SlideCallout
} from '@/features/presentation/components/elements';
import { useUrlSyncedState } from '@/features/presentation/hooks/useUrlSyncedState';
import { calculateStaircaseConcreteVolumeInternal } from '../../cores';

export const StaircaseVolumeSandbox: React.FC = () => {
  const [waistLength, setWaistLength] = useUrlSyncedState<number>('sc_waist_len', 3.5);
  const [waistWidth, setWaistWidth] = useUrlSyncedState<number>('sc_waist_wid', 1.2);
  const [waistThickness, setWaistThickness] = useUrlSyncedState<number>('sc_waist_thick', 0.15);
  const [stepCount, setStepCount] = useUrlSyncedState<number>('sc_steps', 10);
  const [tread, setTread] = useUrlSyncedState<number>('sc_tread', 0.25);
  const [riser, setRiser] = useUrlSyncedState<number>('sc_riser', 0.15);
  const [landingLength, setLandingLength] = useUrlSyncedState<number>('sc_land_len', 1.5);
  const [landingWidth, setLandingWidth] = useUrlSyncedState<number>('sc_land_wid', 1.2);
  const [landingThickness, setLandingThickness] = useUrlSyncedState<number>('sc_land_thick', 0.15);

  const result = calculateStaircaseConcreteVolumeInternal(
    waistLength,
    waistWidth,
    waistThickness,
    stepCount,
    tread,
    riser,
    landingLength,
    landingWidth,
    landingThickness
  );

  return (
    <TwoColumnLayout
      title="RCC Staircase Concrete Sandbox"
      bgVariant="default"
      leftWidth="45%"
      leftContent={
        <InteractiveCard title="Staircase Geometry Parameters">
          <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1 mb-4 scrollbar-thin">
            <span className="text-[10px] font-bold text-primary uppercase tracking-widest block border-b border-border/40 pb-1">Waist Slab</span>
            <ParameterSlider
              label="Waist Slab Length"
              min={1.5}
              max={6.0}
              step={0.1}
              value={waistLength}
              onChange={setWaistLength}
              unit=" m"
            />
            <ParameterSlider
              label="Flight Width"
              min={0.8}
              max={2.0}
              step={0.1}
              value={waistWidth}
              onChange={setWaistWidth}
              unit=" m"
            />
            <ParameterSlider
              label="Waist Thickness"
              min={0.1}
              max={0.25}
              step={0.01}
              value={waistThickness}
              onChange={setWaistThickness}
              unit=" m"
            />

            <span className="text-[10px] font-bold text-primary uppercase tracking-widest block border-b border-border/40 pb-1 pt-2">Steps (Triangular)</span>
            <ParameterSlider
              label="Number of Steps"
              min={4}
              max={18}
              step={1}
              value={stepCount}
              onChange={setStepCount}
              unit=" Nos"
            />
            <ParameterSlider
              label="Step Tread (T)"
              min={0.20}
              max={0.35}
              step={0.01}
              value={tread}
              onChange={setTread}
              unit=" m"
            />
            <ParameterSlider
              label="Step Riser (R)"
              min={0.12}
              max={0.22}
              step={0.01}
              value={riser}
              onChange={setRiser}
              unit=" m"
            />

            <span className="text-[10px] font-bold text-primary uppercase tracking-widest block border-b border-border/40 pb-1 pt-2">Landing Slab</span>
            <ParameterSlider
              label="Landing Length"
              min={0.8}
              max={3.0}
              step={0.1}
              value={landingLength}
              onChange={setLandingLength}
              unit=" m"
            />
            <ParameterSlider
              label="Landing Width"
              min={0.8}
              max={2.0}
              step={0.1}
              value={landingWidth}
              onChange={setLandingWidth}
              unit=" m"
            />
            <ParameterSlider
              label="Landing Thickness"
              min={0.1}
              max={0.25}
              step={0.01}
              value={landingThickness}
              onChange={setLandingThickness}
              unit=" m"
            />
          </div>

          <div className="border-t border-border/40 pt-3 space-y-2">
            <div className="grid grid-cols-3 gap-1.5">
              <div className="bg-muted/30 p-2 rounded-lg text-center border border-border/30">
                <span className="text-[9px] text-muted-foreground uppercase block font-bold leading-none">Waist</span>
                <span className="text-xs font-black text-foreground block mt-1">{result.waistVolume.toFixed(3)} m³</span>
              </div>
              <div className="bg-muted/30 p-2 rounded-lg text-center border border-border/30">
                <span className="text-[9px] text-muted-foreground uppercase block font-bold leading-none">Steps</span>
                <span className="text-xs font-black text-foreground block mt-1">{result.stepsVolume.toFixed(3)} m³</span>
              </div>
              <div className="bg-muted/30 p-2 rounded-lg text-center border border-border/30">
                <span className="text-[9px] text-muted-foreground uppercase block font-bold leading-none">Landing</span>
                <span className="text-xs font-black text-foreground block mt-1">{result.landingVolume.toFixed(3)} m³</span>
              </div>
            </div>
            <CalculationOutput
              title="Grand Total Concrete Volume"
              value={result.totalVolume}
              unit="m³"
              subtitle="Sum of Waist slab, Steps, and Landing slab"
            />
          </div>
        </InteractiveCard>
      }
      rightContent={
        <div className="h-full flex flex-col justify-between space-y-4">
          <InteractiveCard title="Staircase Volumetric Profile" variant="default" className="flex-1">
            <div className="w-full flex justify-center py-2 bg-background/40 rounded-lg border border-border/30">
              <svg viewBox="0 0 400 180" className="w-full max-w-[360px] h-auto">
                <rect x="270" y="30" width="110" height="30" fill="#f59e0b" fillOpacity="0.2" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3,3" />
                <text x="325" y="48" textAnchor="middle" className="fill-amber-500 text-[11px] font-bold">Landing Slab</text>
                <text x="325" y="58" textAnchor="middle" className="fill-amber-500 text-[9px]">{landingLength}m × {landingWidth}m × {landingThickness}m</text>

                <path d="M 40 150 L 270 50 L 270 65 L 53 160 Z" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="1.5" />
                <text x="140" y="125" textAnchor="middle" className="fill-emerald-500 text-[11px] font-bold transform -rotate-22 origin-center">Waist Slab</text>
                <text x="140" y="137" textAnchor="middle" className="fill-emerald-500 text-[9px] transform -rotate-22 origin-center">{waistLength}m × {waistWidth}m × {waistThickness}m</text>

                <path d="M 40 150 L 63 150 L 63 140 L 86 140 L 86 130 L 109 130 L 109 120 L 132 120 L 132 110 L 155 110 L 155 100 L 178 100 L 178 90 L 201 90 L 201 80 L 224 80 L 224 70 L 247 70 L 247 60 L 270 60 L 270 50 Z" fill="#ef4444" fillOpacity="0.15" stroke="#ef4444" strokeWidth="1" />
                
                <line x1="75" y1="140" x2="75" y2="130" stroke="currentColor" strokeWidth="1" className="text-foreground/60" />
                <polygon points="75,130 73,133 77,133" fill="currentColor" className="text-foreground/60" />
                <polygon points="75,140 73,137 77,137" fill="currentColor" className="text-foreground/60" />
                <text x="80" y="138" className="fill-foreground/80 text-[9px]">R={riser}m</text>
                
                <line x1="86" y1="135" x2="109" y2="135" stroke="currentColor" strokeWidth="1" className="text-foreground/60" />
                <polygon points="86,135 89,133 89,137" fill="currentColor" className="text-foreground/60" />
                <polygon points="109,135 106,133 106,137" fill="currentColor" className="text-foreground/60" />
                <text x="91" y="129" className="fill-foreground/80 text-[9px]">T={tread}m</text>

                <text x="180" y="65" textAnchor="middle" className="fill-red-500 text-[11px] font-bold">Steps ({stepCount} Nos)</text>
                <text x="180" y="75" textAnchor="middle" className="fill-red-500 text-[9px]">½ × T × R × Width</text>
              </svg>
            </div>

            <div className="mt-4">
              <SlideParagraph variant="plain" className="text-xs text-muted-foreground leading-relaxed">
                Staircase structural breakdown:
              </SlideParagraph>
              <SlideList
                items={[
                  { title: "Waist Slab Volume", text: "Calculated as a rectangular sloping plate. The sloping length is derived geometrically from the rise and run of the flight." },
                  { title: "Individual Step Volume", text: "Each step forms a triangular prism. The volume is calculated as ½ × Tread × Riser × Flight Width." },
                  { title: "Landing Slab Volume", text: "Standard flat rectangular slab calculation (Length × Width × Structural Thickness)." }
                ]}
              />
            </div>
          </InteractiveCard>
          
          <SlideCallout variant="warning" title="Beams and Support Embedment" className="py-2">
            <p className="text-[10px] leading-relaxed text-muted-foreground">
              Always double-check support plans: the concrete of landing beams supporting the landing slab must be quantified under structural beams or explicitly added to the landing volume.
            </p>
          </SlideCallout>
        </div>
      }
    />
  );
};

export default StaircaseVolumeSandbox;
