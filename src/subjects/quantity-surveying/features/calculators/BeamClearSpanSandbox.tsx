import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import {
  InteractiveCard,
  ClickHighlight,
  ParameterSlider
} from '@/features/presentation/components/elements';
import { useUrlSyncedState } from '@/features/presentation/hooks/useUrlSyncedState';
import { calculateBeamClearSpan } from '../../cores';

export const BeamClearSpanSandbox: React.FC = () => {
  const [cCenter, setCCenter] = useUrlSyncedState<number>('beam_cc_i', 4.50);
  const [colDim, setColDim] = useUrlSyncedState<number>('beam_col_dim', 0.30);

  const clearSpan = calculateBeamClearSpan(cCenter, colDim);

  return (
    <TwoColumnLayout
      title="2.2 Floor Beams: Extracting Clear Span"
      bgVariant="default"
      leftWidth="45%"
      leftContent={
        <div className="flex flex-col gap-4">
          <InteractiveCard title="Double Counting Prevention">
            <p className="text-xs text-muted-foreground leading-relaxed">
              To prevent double-counting concrete at the column intersection core, we must extract the <ClickHighlight at={1} variant="paint">Clear Span</ClickHighlight> rather than the Center-to-Center distance.
            </p>
            <div className="mt-3 p-3 bg-muted rounded border border-border/40 text-[11px] font-mono leading-relaxed">
              <strong>Beam Take-off length:</strong>
              <br />
              Length = Grid C/C Span - Width of column (or bearing width).
            </div>
          </InteractiveCard>
        </div>
      }
      rightContent={
        <div className="flex flex-col justify-between h-full space-y-4">
          <InteractiveCard title="Beam Clear Span Configurator">
            <div className="grid grid-cols-2 gap-3 mb-2">
              <ParameterSlider label="Grid C/C Span" min={3.00} max={6.00} step={0.10} value={cCenter} onChange={setCCenter} unit="m" />
              <ParameterSlider label="Column Support Width" min={0.25} max={0.50} step={0.05} value={colDim} onChange={setColDim} unit="m" />
            </div>

            <div className="bg-background rounded-lg border border-border/30 p-3 flex flex-col gap-2 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Clear Span:</span>
                <span className="font-bold">{clearSpan.toFixed(3)} m</span>
              </div>
            </div>

            <div className="w-full aspect-[2/1] bg-background border border-border/30 rounded-lg flex items-center justify-center p-2 relative overflow-hidden">
              <svg viewBox="0 0 280 140" className="w-full h-full select-none overflow-visible">
                {/* Columns */}
                <rect x="30" y="40" width="30" height="70" className="fill-muted stroke-border/60" strokeWidth="1.5" />
                <rect x="220" y="40" width="30" height="70" className="fill-muted stroke-border/60" strokeWidth="1.5" />
                
                {/* Beam */}
                <rect x="60" y="50" width="160" height="20" className="fill-primary/10 stroke-primary" strokeWidth="1.5" />

                {/* Overlaps highlighted in red */}
                <rect x="45" y="50" width="15" height="20" className="fill-destructive/20 stroke-destructive/50" strokeWidth="1" strokeDasharray="2 2" />
                <rect x="220" y="50" width="15" height="20" className="fill-destructive/20 stroke-destructive/50" strokeWidth="1" strokeDasharray="2 2" />

                {/* C/C line */}
                <line x1="45" y1="120" x2="235" y2="120" stroke="#f59e0b" strokeWidth="1" />
                <circle cx="45" cy="120" r="2" fill="#f59e0b" />
                <circle cx="235" cy="120" r="2" fill="#f59e0b" />
                <text x="140" y="115" textAnchor="middle" className="fill-amber-500 font-mono text-[8px] font-bold">C/C Grid Span</text>

                {/* Clear span line */}
                <line x1="60" y1="85" x2="220" y2="85" stroke="#3b82f6" strokeWidth="1" />
                <polygon points="60,85 66,82 66,88" fill="#3b82f6" />
                <polygon points="220,85 214,82 214,88" fill="#3b82f6" />
                <text x="140" y="80" textAnchor="middle" className="fill-blue-500 font-mono text-[8px] font-bold">Clear Span (Take-off L)</text>
              </svg>
            </div>
          </InteractiveCard>
        </div>
      }
    />
  );
};

export default BeamClearSpanSandbox;
