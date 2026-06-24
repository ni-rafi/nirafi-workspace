import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import {
  InteractiveCard,
  SlideBullet,
  SlideGrid,
  SlideBadge,
  ParameterSlider,
  CalculationOutput,
  SlideContent
} from '@/features/presentation/components/elements';
import { FinishAreaSandbox } from '@/subjects/quantity-surveying/features';
import { useUrlSyncedState } from '@/features/presentation/hooks/useUrlSyncedState';

// Slide 14: 5.1 & 5.3 Plastering & Floor Area Fundamentals
export const Slide14: React.FC = () => (
  <FinishAreaSandbox />
);

// Slide 15: 5.2 Engineering Thresholds: Plastering Voids
export const Slide15: React.FC = () => {
  return (
    <FullWidthLayout title="5.2 Engineering Thresholds: Plastering Voids" bgVariant="default">
      <SlideGrid cols={3}>
        <InteractiveCard title="Minor Openings (< 0.5 m²)">
          <div className="flex flex-col gap-2">
            <SlideBadge variant="success" label="No Deduction" />
            <p className="text-xs text-muted-foreground leading-relaxed mt-2">
              Small ventilator holes, pipe sleeves, and minor exhaust gaps do not require deductions from the gross plastering area.
            </p>
            <div className="mt-3 p-2 bg-muted rounded border border-border/40 text-[11px] font-mono">
              <strong>Action:</strong> Ignore completely. No deductions are made, and no jambs are added.
            </div>
          </div>
        </InteractiveCard>

        <InteractiveCard title="Medium Voids (0.5 to 3.0 m²)">
          <div className="flex flex-col gap-2">
            <SlideBadge variant="warning" label="Partial Deduction" />
            <p className="text-xs text-muted-foreground leading-relaxed mt-2">
              Typical for standard residential bedroom doors and windows. Deduct only one face of the wall.
            </p>
            <div className="mt-3 p-2 bg-muted rounded border border-border/40 text-[11px] font-mono">
              <strong>Action:</strong> Deduct one face only. Omit jambs/sills plastering calculations (mutually offsetting).
            </div>
          </div>
        </InteractiveCard>

        <InteractiveCard title="Large Voids (> 3.0 m²)">
          <div className="flex flex-col gap-2">
            <SlideBadge variant="error" label="Full Deduct + Additions" />
            <p className="text-xs text-muted-foreground leading-relaxed mt-2">
              For large structural openings, shop fronts, verandas, or glazed facade walls.
            </p>
            <div className="mt-3 p-2 bg-muted rounded border border-border/40 text-[11px] font-mono">
              <strong>Action:</strong> Deduct both faces from wall plastering. Add internal jambs/soffits plastering surface.
            </div>
          </div>
        </InteractiveCard>
      </SlideGrid>
    </FullWidthLayout>
  );
};

// Slide 16: 5.4 Skirting: Linear Perimeter Tracking
export const Slide16: React.FC = () => {
  return (
    <TwoColumnLayout
      title="5.4 Skirting: Linear Perimeter Tracking"
      bgVariant="default"
      leftWidth="45%"
      leftContent={
        <div className="flex flex-col gap-4">
          <InteractiveCard title="Skirting Rules">
            <ul className="flex flex-col gap-3">
              <SlideBullet revealAt={0} icon="📏">
                <span>
                  Skirting and Dado trim are measured as a <strong>Linear Length (m or ft)</strong> along the base perimeter of room walls.
                </span>
              </SlideBullet>
              <SlideBullet revealAt={1} icon="🚪">
                <span>
                  <strong>The Door Sill Rule:</strong> Skirting must be strictly omitted across all door frame openings, as the trim cannot run across a walkable sill path.
                </span>
              </SlideBullet>
            </ul>
          </InteractiveCard>
        </div>
      }
      rightContent={
        <div className="flex flex-col justify-center h-full bg-muted/20 p-4 border border-border/40 rounded-xl">
          <span className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground mb-3 block text-center">
            Perimeter Skirting Track with Door Omissions
          </span>
          <div className="w-full aspect-[1.8/1] bg-background rounded-lg border border-border/20 p-2 flex items-center justify-center">
            <svg viewBox="0 0 300 150" className="w-full h-full select-none overflow-visible">
              {/* Room perimeter lines (Inner walls) */}
              <rect x="20" y="20" width="260" height="110" fill="transparent" stroke="currentColor" strokeWidth="2" className="text-muted-foreground/30" />

              {/* Skirting line (Blue highlighted offset track) */}
              {/* Left wall */}
              <line x1="25" y1="25" x2="25" y2="125" stroke="#3b82f6" strokeWidth="2" />
              {/* Top wall */}
              <line x1="25" y1="25" x2="275" y2="25" stroke="#3b82f6" strokeWidth="2" />
              {/* Right wall */}
              <line x1="275" y1="25" x2="275" y2="125" stroke="#3b82f6" strokeWidth="2" />
              
              {/* Bottom wall with door opening (split in 2) */}
              <line x1="25" y1="125" x2="110" y2="125" stroke="#3b82f6" strokeWidth="2" />
              <line x1="170" y1="125" x2="275" y2="125" stroke="#3b82f6" strokeWidth="2" />

              {/* Door Opening (dashed red) */}
              <line x1="110" y1="125" x2="170" y2="125" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 3" />
              <text x="140" y="142" textAnchor="middle" className="fill-destructive font-mono text-[8px] font-bold">Door Sill (OMIT)</text>
              <text x="65" y="117" textAnchor="middle" className="fill-blue-500 font-mono text-[8px] font-bold">Skirting Track</text>
            </svg>
          </div>
        </div>
      }
    />
  );
};

/**
 * Slide 16B: Flooring Estimation: Base and Finish Layers
 */
export const Slide16B: React.FC = () => {
  const [roomL, setRoomL] = useUrlSyncedState<number>('floor_room_l', 5.0);
  const [roomW, setRoomW] = useUrlSyncedState<number>('floor_room_w', 4.0);
  const [baseThickness, setBaseThickness] = useUrlSyncedState<number>('floor_base_thick', 0.075); // default 75mm (3")
  const [finishThickness, setFinishThickness] = useUrlSyncedState<number>('floor_finish_thick', 0.025); // default 25mm (1")

  const floorArea = roomL * roomW;
  const baseVol = floorArea * baseThickness;
  const totalThickness = baseThickness + finishThickness;

  return (
    <TwoColumnLayout
      title="Flooring: Base &amp; Finish Layers"
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
                    Ground floor construction (flooring laid over plinth filling) is estimated as two distinct material layers in the Measurement Book.
                  </span>
                ),
              },
              {
                type: 'bullet',
                text: (
                  <span>
                    <strong>1. The Base Course:</strong> The load-bearing sub-floor foundation layer. Typically comprised of Lime Concrete (LC) or Lean Cement Concrete (CC). It is calculated volumetrically in cubic units (\(m^3\) or cft).
                  </span>
                ),
                revealAt: 0,
              },
              {
                type: 'bullet',
                text: (
                  <span>
                    <strong>2. The Floor Finish:</strong> The top aesthetic wearing surface (e.g. mosaic, marble, or ceramic tiles). This is measured strictly by flat area in square units (\(m^2\) or sft) based on clear internal room dimensions.
                  </span>
                ),
                revealAt: 1,
              },
            ]}
          />
        </div>
      }
      rightContent={
        <InteractiveCard title="Flooring Layer Calculator">
          <div className="space-y-3 mb-4 select-none">
            <div className="grid grid-cols-2 gap-3">
              <ParameterSlider
                label="Clear Internal L"
                min={3}
                max={10}
                step={0.1}
                value={roomL}
                onChange={setRoomL}
                unit=" m"
              />
              <ParameterSlider
                label="Clear Internal W"
                min={3}
                max={10}
                step={0.1}
                value={roomW}
                onChange={setRoomW}
                unit=" m"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3 border-t border-border/40 pt-2">
              <ParameterSlider
                label="Lean CC Base Thickness"
                min={0.05}
                max={0.15}
                step={0.005}
                value={baseThickness}
                onChange={setBaseThickness}
                unit=" m"
                displayValue={`${(baseThickness * 1000).toFixed(0)} mm`}
              />
              <ParameterSlider
                label="Finish Tile Thickness"
                min={0.015}
                max={0.04}
                step={0.001}
                value={finishThickness}
                onChange={setFinishThickness}
                unit=" m"
                displayValue={`${(finishThickness * 1000).toFixed(0)} mm`}
              />
            </div>
          </div>

          <div className="border-t border-border/40 pt-3 space-y-2 font-mono text-[11px]">
            <CalculationOutput 
              title="Clear Room Floor Area (Finish)" 
              value={`${floorArea.toFixed(2)}`} 
              unit="m²"
            />
            <CalculationOutput 
              title="Base Concrete Volume" 
              value={`${baseVol.toFixed(3)}`} 
              unit="m³"
            />
            <div className="flex justify-between items-center text-xs font-bold pt-2.5 border-t border-dashed border-border/40">
              <span className="text-muted-foreground">Total Floor Slab Depth:</span>
              <span className="text-primary font-mono">{(totalThickness * 1000).toFixed(0)} mm</span>
            </div>
          </div>
        </InteractiveCard>
      }
    />
  );
};

/**
 * Slide 16C: Roof Finishes: Weathering & Terracing
 */
export const Slide16C: React.FC = () => {
  const [roofL, setRoofL] = useUrlSyncedState<number>('roof_finish_l', 12.0);
  const [roofW, setRoofW] = useUrlSyncedState<number>('roof_finish_w', 9.0);
  const [terracingThick, setTerracingThick] = useUrlSyncedState<number>('roof_finish_thick', 0.075); // default 75mm (3")

  const roofArea = roofL * roofW;
  const terracingVol = roofArea * terracingThick;

  return (
    <TwoColumnLayout
      title="Roof Finishes: Weathering &amp; Terracing"
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
                    RCC roof slabs require specialized finishing layers to prevent water leakage and regulate indoor building temperature.
                  </span>
                ),
              },
              {
                type: 'bullet',
                text: (
                  <span>
                    <strong>Lime Concrete Terracing:</strong> A standard weathering course comprised of lime concrete is laid over the roof slab. Measured in square area (\(m^2\)) or volumetric units depending on specifications.
                  </span>
                ),
                revealAt: 0,
              },
              {
                type: 'bullet',
                text: (
                  <span>
                    <strong>Measurement Isolation:</strong> Keep roof finish entries strictly isolated from internal floor finishes in the Measurement Book, as they require specialized materials and slopes.
                  </span>
                ),
                revealAt: 1,
              },
            ]}
          />
        </div>
      }
      rightContent={
        <InteractiveCard title="Roof Finish Calculator">
          <div className="space-y-3 mb-4 select-none">
            <div className="grid grid-cols-2 gap-3">
              <ParameterSlider
                label="Roof Length"
                min={5}
                max={25}
                step={0.5}
                value={roofL}
                onChange={setRoofL}
                unit=" m"
              />
              <ParameterSlider
                label="Roof Width"
                min={5}
                max={25}
                step={0.5}
                value={roofW}
                onChange={setRoofW}
                unit=" m"
              />
            </div>
            
            <div className="border-t border-border/40 pt-2">
              <ParameterSlider
                label="Lime Concrete Thickness"
                min={0.05}
                max={0.125}
                step={0.005}
                value={terracingThick}
                onChange={setTerracingThick}
                unit=" m"
                displayValue={`${(terracingThick * 1000).toFixed(0)} mm`}
              />
            </div>
          </div>

          <div className="border-t border-border/40 pt-3 space-y-2 font-mono text-[11px]">
            <CalculationOutput 
              title="Roof Finished Surface Area" 
              value={`${roofArea.toFixed(2)}`} 
              unit="m²"
            />
            <CalculationOutput 
              title="Lime Concrete Terracing Vol" 
              value={`${terracingVol.toFixed(3)}`} 
              unit="m³"
            />
          </div>
        </InteractiveCard>
      }
    />
  );
};

/**
 * Slide 16D: White Washing and Color Washing
 */
export const Slide16D: React.FC = () => {
  const [grossPlaster, setGrossPlaster] = useUrlSyncedState<number>('ww_gross_plaster', 120.0);
  const [deductions, setDeductions] = useUrlSyncedState<number>('ww_deductions', 15.0);
  const [numCoats, setNumCoats] = useUrlSyncedState<number>('ww_num_coats', 3);

  const netArea = Math.max(0, grossPlaster - deductions);
  const totalAppliedArea = netArea * numCoats;

  return (
    <TwoColumnLayout
      title="White Washing and Color Washing"
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
                    Plastered masonry surfaces are completed by applying whitewashing (internal) or color washing (external) to walls.
                  </span>
                ),
              },
              {
                type: 'bullet',
                text: (
                  <span>
                    <strong>Measurement Standard:</strong> Quantified in square meters (\(m^2\)) or square feet (sft).
                  </span>
                ),
                revealAt: 0,
              },
              {
                type: 'bullet',
                text: (
                  <span>
                    <strong>Deduction Rules Match:</strong> The arithmetical deductions for washing match wall plastering deductions exactly (i.e. voids, door, and window frames).
                  </span>
                ),
                revealAt: 1,
              },
              {
                type: 'bullet',
                text: (
                  <span>
                    <strong>Description Specifications:</strong> The ledger description must explicitly state the number of coats (e.g., "White washing by three coats") and include surface preparation work.
                  </span>
                ),
                revealAt: 2,
              },
            ]}
          />
        </div>
      }
      rightContent={
        <InteractiveCard title="Washing Area Quantifier">
          <div className="space-y-3 mb-4 select-none">
            <ParameterSlider
              label="Gross Plaster Area"
              min={20}
              max={300}
              step={10}
              value={grossPlaster}
              onChange={setGrossPlaster}
              unit=" m²"
            />
            <ParameterSlider
              label="Opening Deductions"
              min={0}
              max={50}
              step={1}
              value={deductions}
              onChange={setDeductions}
              unit=" m²"
            />
            <ParameterSlider
              label="Number of Coats"
              min={1}
              max={3}
              step={1}
              value={numCoats}
              onChange={setNumCoats}
              unit=" coats"
            />
          </div>

          <div className="border-t border-border/40 pt-3 space-y-2 font-mono text-[11px]">
            <CalculationOutput 
              title="Net Plaster / Washing Area" 
              value={`${netArea.toFixed(2)}`} 
              unit="m²"
            />
            <CalculationOutput 
              title="Total Equivalent Area Applied" 
              value={`${totalAppliedArea.toFixed(2)}`} 
              unit="m²"
            />
          </div>
        </InteractiveCard>
      }
    />
  );
};

/**
 * Slide 16E: Painting Woodwork and Joinery
 */
export const Slide16E: React.FC = () => {
  const [openingArea, setOpeningArea] = useUrlSyncedState<number>('paint_opening_area', 2.1); // default single door 2.1m²
  const [doorMultiplier, setDoorMultiplier] = useUrlSyncedState<number>('paint_door_mult', 1.3); // default panel door (1.3 per side)

  const singleSideArea = openingArea * doorMultiplier;
  const doubleSideArea = singleSideArea * 2; // typical door painting covers both sides

  return (
    <TwoColumnLayout
      title="Painting Woodwork and Joinery"
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
                    Exposed joinery surfaces (timber chowkhats and panel shutters) must be painted with enamel paint or varnished to prevent weathering.
                  </span>
                ),
              },
              {
                type: 'bullet',
                text: (
                  <span>
                    <strong>Measurement Area:</strong> Computed in square meters (\(m^2\)) or square feet (sft), measured over the outer dimensions of the assembled frame.
                  </span>
                ),
                revealAt: 0,
              },
              {
                type: 'bullet',
                text: (
                  <span>
                    <strong>Multiplying Surface Factors:</strong> Because paneled or louvered doors have grooves and raised molding, flat calculated areas are multiplied by specific factors (e.g. 1.30 for paneled doors per side) to capture the actual painting surface.
                  </span>
                ),
                revealAt: 1,
              },
            ]}
          />
        </div>
      }
      rightContent={
        <InteractiveCard title="Woodwork Painting Calculator">
          <div className="space-y-3 mb-4 select-none">
            <ParameterSlider
              label="Flat Frame Opening Area"
              min={1.0}
              max={15.0}
              step={0.1}
              value={openingArea}
              onChange={setOpeningArea}
              unit=" m²"
            />
            
            <div className="flex flex-col gap-1 border-t border-border/40 pt-2">
              <span className="text-[10px] font-mono text-muted-foreground uppercase">Door / Panel Type Multiplier</span>
              <select
                value={doorMultiplier}
                onChange={(e) => setDoorMultiplier(parseFloat(e.target.value))}
                className="bg-background text-primary text-xs font-bold border border-border/40 px-2 py-1.5 rounded-md mt-1 h-9"
              >
                <option value={1.0}>Flush Door (1.0x flat area per side)</option>
                <option value={1.3}>Paneled Door (1.3x flat area per side)</option>
                <option value={1.8}>Louvered Door (1.8x flat area per side)</option>
                <option value={0.8}>Partially Glazed Door (0.8x flat area per side)</option>
              </select>
            </div>
          </div>

          <div className="border-t border-border/40 pt-3 space-y-2 font-mono text-[11px]">
            <CalculationOutput 
              title="Multiplier Factor" 
              value={`${doorMultiplier.toFixed(2)}`} 
              unit=""
            />
            <CalculationOutput 
              title="Single-Side Painted Area" 
              value={`${singleSideArea.toFixed(3)}`} 
              unit="m²"
            />
            <CalculationOutput 
              title="Double-Side Total Painted Area" 
              value={`${doubleSideArea.toFixed(3)}`} 
              unit="m²"
            />
          </div>
        </InteractiveCard>
      }
    />
  );
};

