import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import {
  InteractiveCard,
  SlideBullet,
  LatexFormula,
  ClickHighlight,
  SlideContent,
  ParameterSlider
} from '@/features/presentation/components/elements';
import { ParapetWallDrawing } from '@/subjects/quantity-surveying/features';
import { useUrlSyncedState } from '@/features/presentation/hooks/useUrlSyncedState';

// Slide 8: 3.1 DPC: Surface Area & Omissions
export const Slide8: React.FC = () => {
  const [dpcLength, setDpcLength] = useUrlSyncedState<number>('dpc_len_i', 12.00);
  const [dpcWidth, setDpcWidth] = useUrlSyncedState<number>('dpc_wid_i', 0.25);
  const [doorSillsCount, setDoorSillsCount] = useUrlSyncedState<number>('dpc_sills_i', 2);

  const doorWidth = 1.00; // 1m door frame width standard
  const grossArea = dpcLength * dpcWidth;
  const deductionArea = doorSillsCount * doorWidth * dpcWidth;
  const netArea = grossArea - deductionArea;

  return (
    <TwoColumnLayout
      title="3.1 DPC: Surface Area &amp; Omissions"
      bgVariant="default"
      leftWidth="45%"
      leftContent={
        <div className="flex flex-col gap-4">
          <InteractiveCard title="DPC Take-off Rules">
            <SlideContent
              blocks={[
                {
                  type: 'paragraph',
                  text: (
                    <span>
                      Damp-Proof Course (DPC) is measured strictly as a horizontal surface area (<LatexFormula math="L \times W" />) across the plinth transition level.
                    </span>
                  ),
                },
                {
                  type: 'bullet',
                  text: (
                    <span>
                      <ClickHighlight at={1} variant="paint">The Sill Deduction Rule:</ClickHighlight> You must deduct DPC area across door openings, veranda openings, and thresholds where concrete columns clash.
                    </span>
                  ),
                  revealAt: 0,
                },
              ]}
            />
          </InteractiveCard>
        </div>
      }
      rightContent={
        <div className="flex flex-col justify-between h-full space-y-4">
          <InteractiveCard title="DPC Take-off Simulator">
            <div className="grid grid-cols-2 gap-3 mb-2">
              <ParameterSlider label="Wall Length" min={8.00} max={20.00} step={0.50} value={dpcLength} onChange={setDpcLength} unit="m" />
              <ParameterSlider label="Wall Width" min={0.125} max={0.375} step={0.125} value={dpcWidth} onChange={setDpcWidth} unit="m" displayValue={`${(dpcWidth * 1000).toFixed(0)} mm`} />
              <ParameterSlider label="Door Openings (N)" min={0} max={4} step={1} value={doorSillsCount} onChange={setDoorSillsCount} unit="" />
            </div>

            <div className="bg-background rounded-lg border border-border/30 p-3 flex flex-col gap-2 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Gross DPC Area:</span>
                <span className="font-bold">{grossArea.toFixed(3)} m²</span>
              </div>
              <div className="flex justify-between text-destructive">
                <span>Deductions ({doorSillsCount} Doors):</span>
                <span>- {deductionArea.toFixed(3)} m²</span>
              </div>
              <div className="border-t border-border/25 pt-2 flex justify-between font-extrabold text-primary">
                <span>Net Billing Area:</span>
                <span>{netArea.toFixed(3)} m²</span>
              </div>
            </div>
          </InteractiveCard>
        </div>
      }
    />
  );
};

// Slide 9: 3.2 & 3.3 Masonry Net Height & Segregation
export const Slide9: React.FC = () => {
  const [fHeight, setFHeight] = useUrlSyncedState<number>('mas_fheight_i', 3.00);
  const [bDepth, setBDepth] = useUrlSyncedState<number>('mas_bdepth_i', 0.35);

  const netWallHeight = fHeight - bDepth;

  return (
    <TwoColumnLayout
      title="3.2 &amp; 3.3 Masonry: Net Height Correction"
      bgVariant="default"
      leftWidth="45%"
      leftContent={
        <div className="flex flex-col gap-4">
          <InteractiveCard title="Brick Masonry Guidelines">
            <ul className="flex flex-col gap-3">
              <SlideBullet revealAt={0} icon="🧱">
                <span>
                  <strong>Wall Segregation:</strong> Separate thick structural main walls (e.g. 10" or 250mm) from thin internal partition layouts (e.g. 5" or 125mm) into different BoQ item lines.
                </span>
              </SlideBullet>
              <SlideBullet revealAt={1} icon="📐">
                <span>
                  <strong>The Beam Clash:</strong> Masonry walls stop at the beam soffit. Never calculate brickwork all the way to the top of the floor slab.
                </span>
              </SlideBullet>
            </ul>
          </InteractiveCard>
        </div>
      }
      rightContent={
        <div className="flex flex-col justify-between h-full space-y-4">
          <InteractiveCard title="Net Height Computation">
            <div className="grid grid-cols-2 gap-3 mb-2">
              <ParameterSlider label="Floor Height" min={2.80} max={3.50} step={0.05} value={fHeight} onChange={setFHeight} unit="m" />
              <ParameterSlider label="Beam Depth" min={0.25} max={0.50} step={0.05} value={bDepth} onChange={setBDepth} unit="m" />
            </div>

            <div className="bg-background rounded-lg border border-border/30 p-3 flex flex-col gap-2 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Floor to Floor height:</span>
                <span className="font-bold">{fHeight.toFixed(2)} m</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Isolate Beam Depth:</span>
                <span className="font-bold text-destructive">- {bDepth.toFixed(2)} m</span>
              </div>
              <div className="border-t border-border/25 pt-2 flex justify-between font-extrabold text-primary">
                <span>Net Wall Height (Hn):</span>
                <span>{netWallHeight.toFixed(2)} m</span>
              </div>
            </div>

            <div className="mt-2 p-3 bg-muted rounded border border-border/40 text-center">
              <div className="text-md font-bold text-foreground font-mono">
                <LatexFormula math="H_{net} = H_{floor\_to\_floor} - d_{beam\_depth}" />
              </div>
            </div>
          </InteractiveCard>
        </div>
      }
    />
  );
};

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
