import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import {
  InteractiveCard,
  SlideBullet,
  LatexFormula,
  ParameterSlider,
  CalculationOutput
} from '@/features/presentation/components/elements';
import { DeductionSandbox } from '@/subjects/quantity-surveying/features';
import { useUrlSyncedState } from '@/features/presentation/hooks/useUrlSyncedState';

// Slide 11: 4.1 & 4.2 The Deduction (Ddt) Protocol
export const Slide11: React.FC = () => (
  <DeductionSandbox />
);

// Slide 12: 4.3 Lintel Bearings & Embedment
export const Slide12: React.FC = () => {
  return (
    <TwoColumnLayout
      title="4.3 Lintel Bearings &amp; Embedment"
      bgVariant="default"
      leftWidth="45%"
      leftContent={
        <div className="flex flex-col gap-4">
          <InteractiveCard title="Lintel Measurement Logic">
            <ul className="flex flex-col gap-3">
              <SlideBullet revealAt={0} icon="↔️">
                <span>
                  <strong>The Bearing Offset:</strong> Lintels must extend past the clear opening into the masonry support on both sides (typically 150mm or 6").
                </span>
              </SlideBullet>
              <SlideBullet revealAt={1} icon="➕">
                <span>
                  <strong>Concrete Addition:</strong> Calculate and add the RCC volume of the full lintel length (<LatexFormula math="L_{clear} + 2 \times 0.15m" />).
                </span>
              </SlideBullet>
              <SlideBullet revealAt={2} icon="➖">
                <span>
                  <strong>Masonry Deduction:</strong> Deduct the lintel's embedded volume from the gross brickwork ledger.
                </span>
              </SlideBullet>
            </ul>
          </InteractiveCard>
        </div>
      }
      rightContent={
        <div className="flex flex-col justify-center h-full bg-muted/20 p-4 border border-border/40 rounded-xl">
          <span className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground mb-3 block text-center">
            Lintel Bearing &amp; Clear Span Anatomy
          </span>
          <div className="w-full aspect-[1.8/1] bg-background rounded-lg border border-border/20 p-2 flex items-center justify-center">
            <svg viewBox="0 0 300 150" className="w-full h-full select-none overflow-visible">
              {/* Lintel */}
              <rect x="30" y="50" width="240" height="20" className="fill-primary/10 stroke-primary" strokeWidth="1.5" />
              <text x="150" y="63" textAnchor="middle" className="fill-primary font-mono text-[9px] font-bold">RCC Lintel Band</text>

              {/* Masonry support blocks */}
              <rect x="10" y="70" width="50" height="60" className="fill-muted stroke-border/40" strokeWidth="1" />
              <rect x="240" y="70" width="50" height="60" className="fill-muted stroke-border/40" strokeWidth="1" />
              
              {/* Voids / opening */}
              <rect x="60" y="70" width="180" height="60" className="fill-transparent stroke-dashed stroke-border/30" strokeWidth="1" />
              <text x="150" y="105" textAnchor="middle" className="fill-muted-foreground font-mono text-[9px]">Clear Window Opening</text>

              {/* Bearing annotations */}
              {/* Left Bearing */}
              <line x1="30" y1="40" x2="60" y2="40" stroke="#f59e0b" strokeWidth="1" />
              <text x="45" y="34" textAnchor="middle" className="fill-amber-500 font-mono text-[8px] font-bold">150mm</text>

              {/* Clear span */}
              <line x1="60" y1="40" x2="240" y2="40" stroke="#3b82f6" strokeWidth="1" />
              <text x="150" y="34" textAnchor="middle" className="fill-blue-500 font-mono text-[8px] font-bold">Clear Span</text>

              {/* Right Bearing */}
              <line x1="240" y1="40" x2="270" y2="40" stroke="#f59e0b" strokeWidth="1" />
              <text x="255" y="34" textAnchor="middle" className="fill-amber-500 font-mono text-[8px] font-bold">150mm</text>
            </svg>
          </div>
        </div>
      }
    />
  );
};

// Slide 13: 4.4 Woodwork & Joinery Segregation
export const Slide13: React.FC = () => {
  const [doorH, setDoorH] = useUrlSyncedState<number>('wood_door_h', 2.1);
  const [doorW, setDoorW] = useUrlSyncedState<number>('wood_door_w', 1.0);
  const [frameB, setFrameB] = useUrlSyncedState<number>('wood_frame_b', 0.100); // 100mm (4")
  const [frameD, setFrameD] = useUrlSyncedState<number>('wood_frame_d', 0.075); // 75mm (3")
  const [horns, setHorns] = useUrlSyncedState<number>('wood_horns', 0.1); // 100mm (4") corner projections

  // Chowkhat (Frame) Volume
  // Total running length of frame = 2 * Height + Width + 2 * Horns (at top corners)
  const frameLength = (2 * doorH) + doorW + (2 * horns);
  const frameVol = frameLength * frameB * frameD;

  // Shutter Panel Area
  // Panel area fits inside the frame clear span:
  // Clear height = doorH - frameD
  // Clear width = doorW - 2 * frameD
  const clearH = Math.max(0, doorH - frameD);
  const clearW = Math.max(0, doorW - (2 * frameD));
  const shutterArea = clearH * clearW;

  return (
    <TwoColumnLayout
      title="4.4 Woodwork &amp; Joinery Segregation"
      bgVariant="default"
      leftWidth="45%"
      leftContent={
        <div className="space-y-3 flex flex-col justify-between h-full select-none">
          <InteractiveCard title="Woodwork Measurement Rules">
            <div className="space-y-3 text-xs leading-normal">
              <div className="p-2.5 bg-muted/40 border border-border/40 rounded-lg">
                <span className="text-[10px] text-primary uppercase font-bold block mb-1">Chowkhats (Frames)</span>
                <p className="text-muted-foreground">
                  Measured <strong>volumetrically</strong> (\(m^3\) or cft) by tracking the running length of the timber members times its cross-sectional area. Includes horn projections embedded in brickwork.
                </p>
              </div>
              <div className="p-2.5 bg-muted/40 border border-border/40 rounded-lg">
                <span className="text-[10px] text-emerald-500 uppercase font-bold block mb-1">Shutters (Panels)</span>
                <p className="text-muted-foreground">
                  Measured as a flat <strong>surface area</strong> (\(m^2\) or sft) based on clear inner dimensions inside the frame. Panel thickness is described but not multiplied.
                </p>
              </div>
            </div>
          </InteractiveCard>
        </div>
      }
      rightContent={
        <InteractiveCard title="Woodwork Take-off Calculator">
          <div className="space-y-2 mb-3 select-none">
            <div className="grid grid-cols-2 gap-2">
              <ParameterSlider
                label="Door Frame Height"
                min={1.8}
                max={2.5}
                step={0.05}
                value={doorH}
                onChange={setDoorH}
                unit=" m"
              />
              <ParameterSlider
                label="Door Frame Width"
                min={0.7}
                max={1.5}
                step={0.05}
                value={doorW}
                onChange={setDoorW}
                unit=" m"
              />
            </div>
            
            <div className="grid grid-cols-3 gap-2 border-t border-border/40 pt-2">
              <ParameterSlider
                label="Frame Breadth"
                min={0.075}
                max={0.150}
                step={0.005}
                value={frameB}
                onChange={setFrameB}
                unit=" m"
                displayValue={`${(frameB * 1000).toFixed(0)} mm`}
              />
              <ParameterSlider
                label="Frame Depth"
                min={0.050}
                max={0.100}
                step={0.005}
                value={frameD}
                onChange={setFrameD}
                unit=" m"
                displayValue={`${(frameD * 1000).toFixed(0)} mm`}
              />
              <ParameterSlider
                label="Corner Horns"
                min={0.05}
                max={0.20}
                step={0.01}
                value={horns}
                onChange={setHorns}
                unit=" m"
                displayValue={`${(horns * 1000).toFixed(0)} mm`}
              />
            </div>
          </div>

          <div className="border-t border-border/40 pt-2 space-y-1.5 font-mono text-[11px]">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Frame Length:</span>
              <span className="font-bold text-foreground">{frameLength.toFixed(2)} m</span>
            </div>
            <CalculationOutput 
              title="Chowkhat (Frame) Volume" 
              value={`${frameVol.toFixed(4)}`} 
              unit="m³"
            />
            <div className="flex justify-between">
              <span className="text-muted-foreground">Clear Panel Dims:</span>
              <span className="font-bold text-foreground">{clearW.toFixed(2)}m × {clearH.toFixed(2)}m</span>
            </div>
            <CalculationOutput 
              title="Shutter Panel Area" 
              value={`${shutterArea.toFixed(3)}`} 
              unit="m²"
            />
          </div>
        </InteractiveCard>
      }
    />
  );
};
