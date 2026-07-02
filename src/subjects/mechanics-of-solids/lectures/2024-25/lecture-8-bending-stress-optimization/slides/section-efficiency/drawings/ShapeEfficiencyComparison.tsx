import React from 'react';
import { useUrlSyncedState } from '@/features/presentation/hooks/useUrlSyncedState';
import { ParameterSlider, SlideParagraph } from '@/features/presentation/components/elements';
import { ExpandableDrawing } from '@/shared/components';

export const ShapeEfficiencyComparison: React.FC = () => {
  const [area, setArea] = useUrlSyncedState<number>('eff_area', 10000); // mm²

  // 1. Square properties
  const side = Math.sqrt(area); // mm
  const Z_sq = Math.pow(side, 3) / 6; // mm³

  // 2. Circle properties
  const dia = Math.sqrt((4 * area) / Math.PI); // mm
  const Z_cir = (Math.PI * Math.pow(dia, 3)) / 32; // mm³

  // 3. Rectangle (d = 1.5b)
  const b_15 = Math.sqrt(area / 1.5);
  const d_15 = 1.5 * b_15;
  const Z_rect_15 = (b_15 * d_15 * d_15) / 6;

  // 4. Rectangle (d = 2b)
  const b_20 = Math.sqrt(area / 2.0);
  const d_20 = 2.0 * b_20;
  const Z_rect_20 = (b_20 * d_20 * d_20) / 6;

  // Efficiency factors relative to Square
  const f_cir = Z_cir / Z_sq;
  const f_rect_15 = Z_rect_15 / Z_sq;
  const f_rect_20 = Z_rect_20 / Z_sq;

  return (
    <div className="flex flex-col items-center justify-between w-full h-full gap-3 text-left">
      <div className="bg-muted/10 p-3.5 border border-border/40 rounded-xl w-full">
        <ParameterSlider label="Cross-Section Area (A)" value={area} unit="mm²" min={5000} max={15000} step={500} onChange={setArea} />
        <SlideParagraph variant="plain" className="text-[10px] text-muted-foreground leading-normal mt-1">
          Adjust the material cross-sectional area to see how different shapes distribute this area and change their relative Section Modulus (Z) bending efficiency.
        </SlideParagraph>
      </div>

      <ExpandableDrawing title="Bending Section Efficiency Comparison" description="Compares the section modulus efficiency of Circular, Square, and Rectangular cross-sections of constant Area.">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full p-2 bg-muted/10 border border-border/40 rounded-xl">
          {/* Circle Card */}
          <div className="bg-muted/20 border border-border/40 rounded-xl p-3 flex flex-col items-center text-center">
            <span className="text-[9px] font-bold text-muted-foreground uppercase">Circle</span>
            <svg viewBox="0 0 100 100" className="w-[60px] h-[60px] my-2 overflow-visible">
              <circle cx={50} cy={50} r={dia/2.2} fill="rgba(99, 102, 241, 0.08)" stroke="var(--foreground)" strokeWidth={1.2} />
            </svg>
            <span className="font-mono text-[8px]">Dia: {dia.toFixed(0)}mm</span>
            <span className="text-[10px] font-bold text-rose-500 font-mono mt-1">Eff: {(f_cir * 100).toFixed(0)}%</span>
          </div>

          {/* Square Card */}
          <div className="bg-muted/20 border border-border/40 rounded-xl p-3 flex flex-col items-center text-center">
            <span className="text-[9px] font-bold text-muted-foreground uppercase">Square</span>
            <svg viewBox="0 0 100 100" className="w-[60px] h-[60px] my-2 overflow-visible">
              <rect x={50 - side/2.2} y={50 - side/2.2} width={side/1.1} height={side/1.1} fill="rgba(99, 102, 241, 0.08)" stroke="var(--foreground)" strokeWidth={1.2} />
            </svg>
            <span className="font-mono text-[8px]">Side: {side.toFixed(0)}mm</span>
            <span className="text-[10px] font-bold text-indigo-500 font-mono mt-1">Eff: 100% (Base)</span>
          </div>

          {/* Rectangle d=1.5b */}
          <div className="bg-muted/20 border border-border/40 rounded-xl p-3 flex flex-col items-center text-center">
            <span className="text-[9px] font-bold text-muted-foreground uppercase">Deep Rect (1.5b)</span>
            <svg viewBox="0 0 100 100" className="w-[60px] h-[60px] my-2 overflow-visible">
              <rect x={50 - b_15/2.2} y={50 - d_15/2.2} width={b_15/1.1} height={d_15/1.1} fill="rgba(99, 102, 241, 0.08)" stroke="var(--foreground)" strokeWidth={1.2} />
            </svg>
            <span className="font-mono text-[8px]">{b_15.toFixed(0)}x{d_15.toFixed(0)}mm</span>
            <span className="text-[10px] font-bold text-emerald-500 font-mono mt-1">Eff: {(f_rect_15 * 100).toFixed(0)}%</span>
          </div>

          {/* Rectangle d=2b */}
          <div className="bg-muted/20 border border-border/40 rounded-xl p-3 flex flex-col items-center text-center">
            <span className="text-[9px] font-bold text-muted-foreground uppercase">Deep Rect (2.0b)</span>
            <svg viewBox="0 0 100 100" className="w-[60px] h-[60px] my-2 overflow-visible">
              <rect x={50 - b_20/2.2} y={50 - d_20/2.2} width={b_20/1.1} height={d_20/1.1} fill="rgba(99, 102, 241, 0.08)" stroke="var(--foreground)" strokeWidth={1.2} />
            </svg>
            <span className="font-mono text-[8px]">{b_20.toFixed(0)}x{d_20.toFixed(0)}mm</span>
            <span className="text-[10px] font-bold text-emerald-500 font-mono mt-1">Eff: {(f_rect_20 * 100).toFixed(0)}%</span>
          </div>
        </div>
      </ExpandableDrawing>
    </div>
  );
};
export default ShapeEfficiencyComparison;
