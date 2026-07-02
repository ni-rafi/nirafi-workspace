import React from 'react';
import { LatexFormula, SlideTable } from '@/features/presentation/components/elements';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';

export const LookupTableSlide: React.FC = () => {
  const headers = [
    { label: 'Beam Configuration', align: 'left' as const },
    { label: 'Loading Diagram', align: 'center' as const },
    { label: 'Max Shear (V_max)', align: 'left' as const },
    { label: 'Max Moment (M_max)', align: 'left' as const }
  ];

  const rows = [
    [
      <span className="font-bold">Simply Supported (Point Load)</span>,
      <svg className="w-[90px] h-[35px] overflow-visible" viewBox="0 0 90 35">
        <line x1="5" y1="20" x2="85" y2="20" stroke="var(--foreground)" strokeWidth="1.5" />
        <polygon points="5,20 1,26 9,26" fill="var(--foreground)" />
        <polygon points="85,20 81,26 89,26" fill="var(--foreground)" />
        <line x1="45" y1="3" x2="45" y2="18" stroke="var(--primary)" strokeWidth="1.2" />
        <polygon points="42,15 48,15 45,19" fill="var(--primary)" />
        <text x="45" y="-1" textAnchor="middle" className="fill-primary text-[7px] font-bold">P</text>
      </svg>,
      <LatexFormula math="P / 2" />,
      <span className="text-indigo-500 font-bold"><LatexFormula math="P \cdot L / 4" /></span>
    ],
    [
      <span className="font-bold">Simply Supported (UDL)</span>,
      <svg className="w-[90px] h-[35px] overflow-visible" viewBox="0 0 90 35">
        <line x1="5" y1="20" x2="85" y2="20" stroke="var(--foreground)" strokeWidth="1.5" />
        <polygon points="5,20 1,26 9,26" fill="var(--foreground)" />
        <polygon points="85,20 81,26 89,26" fill="var(--foreground)" />
        <path d="M 5 12 Q 15 8 25 12 Q 35 8 45 12 Q 55 8 65 12 Q 75 8 85 12" fill="none" stroke="var(--primary)" strokeWidth={1} />
        <text x="45" y="4" textAnchor="middle" className="fill-primary text-[7px] font-bold">w</text>
      </svg>,
      <LatexFormula math="w \cdot L / 2" />,
      <span className="text-indigo-500 font-bold"><LatexFormula math="w \cdot L^2 / 8" /></span>
    ],
    [
      <span className="font-bold">Simply Supported (Symmetrical Loads)</span>,
      <svg className="w-[90px] h-[35px] overflow-visible" viewBox="0 0 90 35">
        <line x1="5" y1="20" x2="85" y2="20" stroke="var(--foreground)" strokeWidth="1.5" />
        <polygon points="5,20 1,26 9,26" fill="var(--foreground)" />
        <polygon points="85,20 81,26 89,26" fill="var(--foreground)" />
        <line x1="30" y1="3" x2="30" y2="18" stroke="var(--primary)" strokeWidth="1.2" />
        <polygon points="27,15 33,15 30,19" fill="var(--primary)" />
        <line x1="60" y1="3" x2="60" y2="18" stroke="var(--primary)" strokeWidth="1.2" />
        <polygon points="57,15 63,15 60,19" fill="var(--primary)" />
        <text x="30" y="-1" textAnchor="middle" className="fill-primary text-[7px] font-bold">P</text>
        <text x="60" y="-1" textAnchor="middle" className="fill-primary text-[7px] font-bold">P</text>
      </svg>,
      <LatexFormula math="P" />,
      <span className="text-indigo-500 font-bold"><LatexFormula math="P \cdot a" /></span>
    ],
    [
      <span className="font-bold">Simply Supported (Triangular Peak)</span>,
      <svg className="w-[90px] h-[35px] overflow-visible" viewBox="0 0 90 35">
        <line x1="5" y1="20" x2="85" y2="20" stroke="var(--foreground)" strokeWidth="1.5" />
        <polygon points="5,20 1,26 9,26" fill="var(--foreground)" />
        <polygon points="85,20 81,26 89,26" fill="var(--foreground)" />
        <polygon points="5,20 45,5 85,20" fill="none" stroke="var(--primary)" strokeWidth={1} />
        <text x="45" y="0" textAnchor="middle" className="fill-primary text-[7px] font-bold">w₀</text>
      </svg>,
      <LatexFormula math="w_0 \cdot L / 4" />,
      <span className="text-indigo-500 font-bold"><LatexFormula math="w_0 \cdot L^2 / 12" /></span>
    ],
    [
      <span className="font-bold">Cantilever (Point Load)</span>,
      <svg className="w-[90px] h-[35px] overflow-visible" viewBox="0 0 90 35">
        <line x1="5" y1="5" x2="5" y2="30" stroke="var(--foreground)" strokeWidth="2.5" />
        <line x1="5" y1="20" x2="85" y2="20" stroke="var(--foreground)" strokeWidth="1.5" />
        <line x1="85" y1="3" x2="85" y2="18" stroke="var(--primary)" strokeWidth="1.2" />
        <polygon points="82,15 88,15 85,19" fill="var(--primary)" />
        <text x="85" y="-1" textAnchor="middle" className="fill-primary text-[7px] font-bold">P</text>
      </svg>,
      <LatexFormula math="P" />,
      <span className="text-indigo-500 font-bold"><LatexFormula math="P \cdot L" /></span>
    ],
    [
      <span className="font-bold">Cantilever (UDL)</span>,
      <svg className="w-[90px] h-[35px] overflow-visible" viewBox="0 0 90 35">
        <line x1="5" y1="5" x2="5" y2="30" stroke="var(--foreground)" strokeWidth="2.5" />
        <line x1="5" y1="20" x2="85" y2="20" stroke="var(--foreground)" strokeWidth="1.5" />
        <path d="M 5 12 Q 15 8 25 12 Q 35 8 45 12 Q 55 8 65 12 Q 75 8 85 12" fill="none" stroke="var(--primary)" strokeWidth={1} />
        <text x="45" y="4" textAnchor="middle" className="fill-primary text-[7px] font-bold">w</text>
      </svg>,
      <LatexFormula math="w \cdot L" />,
      <span className="text-indigo-500 font-bold"><LatexFormula math="w \cdot L^2 / 2" /></span>
    ],
    [
      <span className="font-bold">Cantilever (Triangular Load)</span>,
      <svg className="w-[90px] h-[35px] overflow-visible" viewBox="0 0 90 35">
        <line x1="5" y1="5" x2="5" y2="30" stroke="var(--foreground)" strokeWidth="2.5" />
        <line x1="5" y1="20" x2="85" y2="20" stroke="var(--foreground)" strokeWidth="1.5" />
        <polygon points="5,5 85,20 5,20" fill="none" stroke="var(--primary)" strokeWidth={1} />
        <text x="12" y="1" textAnchor="start" className="fill-primary text-[7px] font-bold">w₀</text>
      </svg>,
      <LatexFormula math="w_0 \cdot L / 2" />,
      <span className="text-indigo-500 font-bold"><LatexFormula math="w_0 \cdot L^2 / 6" /></span>
    ]
  ];

  return (
    <FullWidthLayout title="Beam Peak Bending Moment Lookup Table" bgVariant="default">
      <div className="w-full max-w-4xl mx-auto py-2">
        <SlideTable
          headers={headers}
          rows={rows}
          striped={true}
          bordered={true}
          dense="tight"
          caption="Standard Shear and Moment Formulas"
        />
        <p className="text-[10px] text-muted-foreground text-center mt-3 leading-relaxed">
          *Use these standardized formulas to bypass full boundary integration steps for simple loading configurations.
        </p>
      </div>
    </FullWidthLayout>
  );
};

export default LookupTableSlide;
