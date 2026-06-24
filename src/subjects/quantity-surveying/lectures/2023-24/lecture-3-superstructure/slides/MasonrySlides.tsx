import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { InteractiveCard } from '@/features/presentation/components/elements';
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
