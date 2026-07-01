import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, SlideBullet } from '@/features/presentation/components/elements';
import { HelpCircle } from 'lucide-react';

export const Problem03StatementSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Problem 03: Asymmetric I-Section"
      leftWidth="55%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-4 text-left select-text">
          <div>
            <div className="flex items-center space-x-1.5 text-indigo-500 font-bold text-[10px] uppercase mb-1">
              <HelpCircle className="h-4.5 w-4.5" />
              <span>Symmetric Stress Limits</span>
            </div>
            <SlideParagraph variant="plain" className="text-xs text-foreground font-semibold leading-relaxed">
              {"A rolled steel beam of an unsymmetrical I-section. If the maximum bending stress in the beam section is not to exceed 40 MPa, find the moment which the beam can resist. Extended: Is it possible to carry a greater moment if the section is inverted?"}
            </SlideParagraph>
          </div>
          <div className="space-y-1 my-1">
            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest block mb-0.5">Section Dimensions</span>
            <SlideBullet text="Top Flange: 100 mm wide × 50 mm thick" />
            <SlideBullet text="Web: 50 mm wide × 200 mm height" />
            <SlideBullet text="Bottom Flange: 200 mm wide × 50 mm thick" />
            <SlideBullet text="Allowable Stress: σ ≤ 40 MPa (T or C)" />
          </div>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center h-full min-h-[250px] w-full">
          <svg viewBox="0 0 160 160" className="w-[140px] h-[140px] overflow-visible">
            {/* Draw asymmetric I-section */}
            <rect x={55} y={15} width={50} height={25} fill="rgba(99, 102, 241, 0.08)" stroke="var(--foreground)" strokeWidth={1.2} />
            <rect x={67.5} y={40} width={25} height={100} fill="rgba(99, 102, 241, 0.08)" stroke="var(--foreground)" strokeWidth={1.2} />
            <rect x={30} y={140} width={100} height={25} fill="rgba(99, 102, 241, 0.08)" stroke="var(--foreground)" strokeWidth={1.2} />
            
            {/* Height dimension */}
            <line x1={20} y1={15} x2={20} y2={165} stroke="var(--muted-foreground)" strokeWidth={0.8} />
            <text x={10} y={90} textAnchor="middle" className="fill-muted-foreground text-[8px] font-bold">300 mm</text>
          </svg>
        </div>
      }
    />
  );
};

export default Problem03StatementSlide;
