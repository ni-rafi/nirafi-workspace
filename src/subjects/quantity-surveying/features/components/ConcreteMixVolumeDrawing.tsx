import React, { useContext } from 'react';
import { PresentationContext } from '@/features/presentation/context/PresentationContext';

interface ConcreteMixVolumeDrawingProps {
  dryVolume?: number;
  cementBags?: number;
  sandVol?: number;
  stoneVol?: number;
  sandPart: number;
  stonePart: number;
  volumeUnit?: string;
  cementPart?: number;
  orientation?: 'vertical' | 'horizontal';
  label?: string;
  className?: string;
}

export const ConcreteMixVolumeDrawing: React.FC<ConcreteMixVolumeDrawingProps> = ({
  dryVolume = 0,
  cementBags = 0,
  sandVol = 0,
  stoneVol = 0,
  sandPart,
  stonePart,
  volumeUnit = 'cft',
  cementPart = 1,
  orientation = 'vertical',
  className = '',
}) => {
  const presentation = useContext(PresentationContext);
  const isBlog = presentation?.viewMode === 'blog';
  const isHorizontal = orientation === 'horizontal';

  const containerClasses = isBlog || isHorizontal
    ? 'bg-transparent border-none shadow-none p-0 flex flex-col items-center select-none w-full'
    : 'relative border border-border/80 bg-muted/20 dark:bg-muted/5 rounded-xl p-6 flex flex-col items-center shadow-sm select-none w-full h-full justify-center min-h-[300px]';

  if (isHorizontal) {
    const totalParts = cementPart + sandPart + stonePart;
    const totalWidth = 310;
    const cementW = (cementPart / totalParts) * totalWidth;
    const sandW = (sandPart / totalParts) * totalWidth;
    const stoneW = (stonePart / totalParts) * totalWidth;

    return (
      <div className={`${containerClasses} ${className}`}>
        <svg width="100%" height="32" viewBox="0 0 340 32" className="overflow-visible select-none">
          {/* Cement layer (Left) */}
          <rect x="15" y="2" width={cementW} height="28" fill="var(--chart-1)" rx="6" />
          {cementW > 35 && (
            <text x={15 + cementW / 2} y="19.5" className="fill-white font-sans text-[10px] font-bold" textAnchor="middle">
              Cement
            </text>
          )}

          {/* Sand layer (Middle) */}
          <rect x={15 + cementW} y="2" width={sandW} height="28" fill="var(--chart-2)" rx="6" />
          {sandW > 35 && (
            <text x={15 + cementW + sandW / 2} y="19.5" className="fill-white font-sans text-[10px] font-bold" textAnchor="middle">
              Sand
            </text>
          )}

          {/* Stone layer (Right) */}
          <rect x={15 + cementW + sandW} y="2" width={stoneW} height="28" fill="var(--chart-3)" rx="6" />
          {stoneW > 35 && (
            <text x={15 + cementW + sandW + stoneW / 2} y="19.5" className="fill-white font-sans text-[10px] font-bold" textAnchor="middle">
              Stone
            </text>
          )}
        </svg>
      </div>
    );
  }

  const totalParts = cementPart + sandPart + stonePart;
  const totalHeight = 200;
  const cementH = (cementPart / totalParts) * totalHeight;
  const sandH = (sandPart / totalParts) * totalHeight;
  const stoneH = (stonePart / totalParts) * totalHeight;

  return (
    <div className={`${containerClasses} ${className}`}>
      <span className="text-xs uppercase tracking-wider font-extrabold text-primary mb-5">
        Mix Volume Proportions
      </span>
      <svg width="340" height="230" viewBox="0 0 340 230" className="overflow-visible select-none">
        {/* Stone/Aggregates layer (Bottom) - var(--chart-3) */}
        <rect x="15" y={210 - stoneH} width="240" height={stoneH} fill="var(--chart-3)" rx="6" />
        {stoneH > 16 && (
          <text x="135" y={210 - (stoneH / 2) + 3.5} className="fill-white font-sans text-[10px] font-bold" textAnchor="middle">
            Aggregate ({stoneVol.toFixed(1)} {volumeUnit})
          </text>
        )}

        {/* Sand layer (Middle) - var(--chart-2) */}
        <rect x="15" y={210 - stoneH - sandH} width="240" height={sandH} fill="var(--chart-2)" rx="6" />
        {sandH > 16 && (
          <text x="135" y={210 - stoneH - (sandH / 2) + 3.5} className="fill-white font-sans text-[10px] font-bold" textAnchor="middle">
            Sand ({sandVol.toFixed(1)} {volumeUnit})
          </text>
        )}

        {/* Cement layer (Top) - var(--chart-1) */}
        <rect x="15" y={210 - stoneH - sandH - cementH} width="240" height={cementH} fill="var(--chart-1)" rx="6" />
        {cementH > 16 && (
          <text x="135" y={210 - stoneH - sandH - (cementH / 2) + 3.5} className="fill-white font-sans text-[10px] font-bold" textAnchor="middle">
            Cement ({cementBags.toFixed(1)} bags)
          </text>
        )}

        {/* Total Height line bracket */}
        <path d="M272,10 L279,10 L279,210 L272,210" fill="none" stroke="currentColor" strokeWidth="1.5" />
        
        {/* Compact, Stacked Dry Volume Label to prevent horizontal overflow */}
        <text x="288" y="98" className="fill-muted-foreground font-sans text-[10px] font-bold" textAnchor="start">
          <tspan x="288" dy="0">Total Dry</tspan>
          <tspan x="288" dy="15" className="fill-primary font-mono text-[11px] font-extrabold">{dryVolume.toFixed(1)}</tspan>
          <tspan x="288" dy="13" className="fill-muted-foreground font-sans text-[9px] font-semibold">{volumeUnit}</tspan>
        </text>
      </svg>
    </div>
  );
};

export default ConcreteMixVolumeDrawing;
