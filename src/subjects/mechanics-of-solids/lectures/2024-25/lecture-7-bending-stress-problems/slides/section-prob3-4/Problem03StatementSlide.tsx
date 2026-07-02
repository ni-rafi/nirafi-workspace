import React from 'react';
import { SlideList, LatexFormula } from '@/features/presentation/components/elements';
import { ExpandableDrawing } from '@/shared/components';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';

export const Problem03StatementSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Problem 03: Asymmetric I-Section"
      leftWidth="55%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-4 text-left select-text">
          <SlideList
            title="Symmetric Stress Limits"
            description="A rolled steel beam of an unsymmetrical I-section. If the maximum bending stress in the beam section is not to exceed 40 MPa, find the moment which the beam can resist. Extended: Is it possible to carry a greater moment if the section is inverted?"
            revealMode="each-click"
            items={[
              { text: "Top Flange: 100 mm wide × 50 mm thick", revealAt: 1 },
              { text: "Web: 50 mm wide × 200 mm height", revealAt: 2 },
              { text: "Bottom Flange: 200 mm wide × 50 mm thick", revealAt: 3 },
              { text: <span>Allowable Stress: <LatexFormula math="\sigma \le 40\text{ MPa}" /> (T or C)</span>, revealAt: 4 },
            ]}
          />
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center h-full min-h-[250px] w-full">
          <ExpandableDrawing title="Unsymmetrical I-Section Beam" description="Cross-section dimensions showing asymmetric top/bottom flanges and web thickness.">
            <svg viewBox="0 0 160 160" className="w-[120px] h-[120px] overflow-visible">
              {/* Draw asymmetric I-section */}
              <rect x={55} y={15} width={50} height={25} fill="rgba(99, 102, 241, 0.08)" stroke="var(--foreground)" strokeWidth={1.2} />
              <rect x={67.5} y={40} width={25} height={100} fill="rgba(99, 102, 241, 0.08)" stroke="var(--foreground)" strokeWidth={1.2} />
              <rect x={30} y={140} width={100} height={25} fill="rgba(99, 102, 241, 0.08)" stroke="var(--foreground)" strokeWidth={1.2} />

              {/* Height dimension */}
              <line x1={20} y1={15} x2={20} y2={165} stroke="var(--muted-foreground)" strokeWidth={0.8} />
              <text x={10} y={90} textAnchor="middle" className="fill-muted-foreground text-[8px] font-bold">300 mm</text>
            </svg>
          </ExpandableDrawing>
        </div>
      }
    />
  );
};

export default Problem03StatementSlide;
