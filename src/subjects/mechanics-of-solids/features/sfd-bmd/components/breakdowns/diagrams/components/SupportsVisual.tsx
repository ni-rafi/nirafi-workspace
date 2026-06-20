import React from 'react';
import { ISupport } from '@/subjects/mechanics-of-solids/cores/sfd-bmd/types';
import { BeamSupports } from '@/features/presentation/components/elements';
import { VisualCanvasShape } from '@/features/presentation/types/schema';

interface SupportsVisualProps {
  activeSupports: ISupport[];
  toPixel: (pos: number) => number;
  highlightedSupportId: string | null;
  yBeam: number;
  length: number;
  showSupportLetters: boolean;
  supportIdToLetter: Map<string, string>;
  customSupportType?: Record<string, 'roller' | 'hinge' | 'fixed' | 'free' | 'internal-roller' | 'internal-hinge'>;
  getOpacity: (x: number) => number;
}

export const SupportsVisual: React.FC<SupportsVisualProps> = ({
  activeSupports,
  toPixel,
  highlightedSupportId,
  yBeam,
  length,
  showSupportLetters,
  supportIdToLetter,
  customSupportType,
  getOpacity,
}) => {
  return (
    <>
      {activeSupports.map(s => {
        const px = toPixel(s.position);
        const isHighlighted = highlightedSupportId === s.id;
        const opacity = getOpacity(s.position);

        const sType = customSupportType && customSupportType[s.id]
          ? customSupportType[s.id]!
          : s.type;

        if (sType === 'free') return null;

        const shape: VisualCanvasShape = {
          id: s.id,
          type: sType === 'fixed' ? 'support-fixed' : sType === 'hinge' ? 'support-pin' : 'support-roller',
          x: 0,
          y: 0,
          w: 32,
          h: 32,
          enterAt: 1,
        };

        let tx = `translate(${px - 16}, ${yBeam + 4})`;
        if (sType === 'fixed') {
          tx = s.position < length / 2
            ? `translate(${px - 10}, ${yBeam - 16})`
            : `translate(${px + 10}, ${yBeam - 16}) scale(-1, 1)`;
        }

        const letter = supportIdToLetter.get(s.id) || '';
        const labelY = sType === 'fixed' ? yBeam - 18 : yBeam + 40;

        return (
          <g key={s.id} opacity={opacity}>
            <BeamSupports
              el={shape}
              stroke={isHighlighted ? 'var(--primary)' : 'var(--foreground)'}
              fill={isHighlighted ? 'var(--primary-hover)' : 'var(--muted)'}
              sw={isHighlighted ? 1.8 : 1.2}
              transform={tx}
            />
            <circle cx={px} cy={yBeam} r={4} className={isHighlighted ? 'fill-primary' : 'fill-muted-foreground'} />
            
            {showSupportLetters && (
              <text
                x={px}
                y={labelY}
                textAnchor="middle"
                className={`text-[13px] font-extrabold select-none ${isHighlighted ? 'fill-primary font-black' : 'fill-muted-foreground'}`}
              >
                {letter}
              </text>
            )}
          </g>
        );
      })}
    </>
  );
};
