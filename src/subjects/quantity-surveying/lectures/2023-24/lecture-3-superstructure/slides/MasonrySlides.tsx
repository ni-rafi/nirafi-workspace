import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import {
  InteractiveCard,
  SlideContent,
  LatexFormula,
  ParameterSlider,
  CalculationOutput
} from '@/features/presentation/components/elements';
import { ParapetWallDrawing, DpcAreaSandbox, MasonryHeightSandbox } from '@/subjects/quantity-surveying/features';
import { useUrlSyncedState } from '@/features/presentation/hooks/useUrlSyncedState';

// Slide 8: 3.1 DPC: Surface Area & Omissions
export const Slide8: React.FC = () => (
  <DpcAreaSandbox />
);

// Slide 9: 3.2 & 3.3 Masonry: Net Height Correction
export const Slide9: React.FC = () => (
  <MasonryHeightSandbox />
);

// Slide 10: 3.4 Roof Level: Parapet Details
export const Slide10: React.FC = () => {
  const [highlightedElement, setHighlightedElement] = useUrlSyncedState<'coping' | 'masonry' | 'slab' | 'none'>('parapet_highlight', 'none');

  return (
    <TwoColumnLayout
      title="3.4 Roof Level: Parapet Details"
      bgVariant="default"
      leftWidth="45%"
      leftContent={
        <div className="flex flex-col gap-4">
          <InteractiveCard title="Parapet Estimating Rules">
            <p className="text-xs text-muted-foreground leading-relaxed">
              Parapet walls are measured as a separate brickwork item at roof level. Click layers on the right to inspect elements:
            </p>
            <div className="flex flex-col gap-2 mt-2">
              {(['coping', 'masonry', 'slab'] as const).map((layer) => (
                <button
                  key={layer}
                  onClick={() => setHighlightedElement(layer)}
                  className={`w-full text-left px-3 py-2 rounded-lg border text-xs font-bold transition-all ${
                    highlightedElement === layer
                      ? 'bg-primary/10 border-primary text-primary'
                      : 'bg-muted/30 border-border/40 text-muted-foreground hover:bg-muted/50'
                  }`}
                >
                  {layer === 'coping' && 'Weathering Concrete Coping (Running Length / Volume)'}
                  {layer === 'masonry' && 'Parapet Masonry Wall (Volumetric - Width = 125mm)'}
                  {layer === 'slab' && 'Roof Concrete Slab (Slab Volumetric Limit)'}
                </button>
              ))}
            </div>
          </InteractiveCard>
        </div>
      }
      rightContent={
        <div className="flex flex-col justify-center h-full">
          <ParapetWallDrawing activeHighlight={highlightedElement} />
        </div>
      }
    />
  );
};

/**
 * Slide 10B: Parapet Wall: Complete Itemization
 */
export const Slide10B: React.FC = () => {
  const [perimeter, setPerimeter] = useUrlSyncedState<number>('parapet_perimeter', 48.0);
  const [height, setHeight] = useUrlSyncedState<number>('parapet_height', 1.0);
  const [thickness, setThickness] = useUrlSyncedState<number>('parapet_thickness', 0.125); // default 5" (125mm)

  const brickworkVol = perimeter * thickness * height;
  const plasterVertical = perimeter * height * 2; // inner face + outer face
  const plasterCopingTop = perimeter * thickness; // top coping width

  return (
    <TwoColumnLayout
      title="Parapet Wall: Complete Itemization"
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
                    The parapet wall runs along the roof perimeter for safety. Its estimation involves a complete, multi-item take-off distinct from the main floors.
                  </span>
                ),
              },
              {
                type: 'bullet',
                text: (
                  <span>
                    <strong>1. Brickwork Volume:</strong> Measured in cubic units (<LatexFormula math="\text{m}^3" /> or cft). Length = continuous outer perimeter of roof; width = thickness (e.g. 125mm or 250mm).
                  </span>
                ),
                revealAt: 0,
              },
              {
                type: 'bullet',
                text: (
                  <span>
                    <strong>2. Vertical Plastering:</strong> Plastering must be calculated in square units (<LatexFormula math="\text{m}^2" />) for <strong>both</strong> the inner face (roof side) and the outer face (elevation side).
                  </span>
                ),
                revealAt: 1,
              },
              {
                type: 'bullet',
                text: (
                  <span>
                    <strong>3. Top Width Plastering:</strong> A separate line item must calculate the plastering area for the narrow top width/coping of the parapet wall (<LatexFormula math="\text{Area} = L \times B" />).
                  </span>
                ),
                revealAt: 2,
              },
            ]}
          />
        </div>
      }
      rightContent={
        <InteractiveCard title="Parapet Take-off Quantifier">
          <div className="space-y-3 mb-4 select-none">
            <ParameterSlider
              label="Continuous Roof Perimeter (L)"
              min={20}
              max={100}
              step={1}
              value={perimeter}
              onChange={setPerimeter}
              unit=" m"
            />
            
            <div className="grid grid-cols-2 gap-3 border-t border-border/40 pt-2">
              <ParameterSlider
                label="Parapet Wall Height (H)"
                min={0.6}
                max={1.5}
                step={0.05}
                value={height}
                onChange={setHeight}
                unit=" m"
              />
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-mono text-muted-foreground uppercase">Wall Thickness (B)</span>
                <select
                  value={thickness}
                  onChange={(e) => setThickness(parseFloat(e.target.value))}
                  className="bg-background text-primary text-xs font-bold border border-border/40 px-2 py-1 rounded-md mt-1 h-9"
                >
                  <option value={0.125}>125 mm (5" Wall)</option>
                  <option value={0.250}>250 mm (10" Wall)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="border-t border-border/40 pt-3 space-y-2">
            <CalculationOutput 
              title="1. Brickwork Quantity" 
              value={`${brickworkVol.toFixed(3)}`} 
              unit="m³"
            />
            <div className="grid grid-cols-2 gap-3">
              <CalculationOutput 
                title="2. Vert Plaster (Inner + Outer)" 
                value={`${plasterVertical.toFixed(2)}`} 
                unit="m²"
              />
              <CalculationOutput 
                title="3. Top Plaster (Coping)" 
                value={`${plasterCopingTop.toFixed(2)}`} 
                unit="m²"
              />
            </div>
          </div>
        </InteractiveCard>
      }
    />
  );
};

