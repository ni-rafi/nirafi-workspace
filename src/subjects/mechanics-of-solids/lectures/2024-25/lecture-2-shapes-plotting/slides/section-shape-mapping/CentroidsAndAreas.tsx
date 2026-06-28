import React from 'react';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import { LatexFormula, SlideParagraph, SlideTable } from '@/features/presentation/components/elements';

export const CentroidsAndAreas: React.FC = () => {
  const headers = [
    { label: 'Shape', width: '112px' },
    { label: 'Visual Profile', align: 'center' as const, width: '112px' },
    { label: 'Area Formula (\\(A\\))' },
    { label: 'Centroid Position (\\(\\bar{x}\\))' },
  ];

  const rows = [
    [
      <span className="font-bold text-foreground" key="shape-1">Rectangle</span>,
      <svg className="w-16 h-8 mx-auto overflow-visible" viewBox="0 0 60 30" key="vis-1">
        <rect x="5" y="5" width="50" height="20" className="fill-emerald-500/10 stroke-emerald-500" strokeWidth="1.5" />
      </svg>,
      <LatexFormula math="A = b \cdot h" key="formula-1" />,
      <span key="centroid-1"><LatexFormula math="\bar{x} = \frac{b}{2}" /> (centered)</span>,
    ],
    [
      <span className="font-bold text-foreground" key="shape-2">Triangle</span>,
      <svg className="w-16 h-8 mx-auto overflow-visible" viewBox="0 0 60 30" key="vis-2">
        <polygon points="5,25 55,5 55,25" className="fill-blue-500/10 stroke-blue-500" strokeWidth="1.5" />
      </svg>,
      <LatexFormula math="A = \frac{1}{2} b \cdot h" key="formula-2" />,
      <span key="centroid-2"><LatexFormula math="\bar{x} = \frac{b}{3}" /> (from vertical base)</span>,
    ],
    [
      <span className="font-bold text-foreground" key="shape-3">Parabolic Spandrel</span>,
      <svg className="w-16 h-8 mx-auto overflow-visible" viewBox="0 0 60 30" key="vis-3">
        <path d="M 5,25 Q 40,25 55,5 L 55,25 Z" className="fill-indigo-500/10 stroke-indigo-500" strokeWidth="1.5" />
      </svg>,
      <LatexFormula math="A = \frac{1}{3} b \cdot h" key="formula-3" />,
      <span key="centroid-3"><LatexFormula math="\bar{x} = \frac{b}{4}" /> (from vertical base)</span>,
    ],
  ];

  return (
    <FullWidthLayout
      title={<span>Geometric Reference Library: Centroids & Areas</span>}
    >
      <div className="w-full h-full flex flex-col justify-between gap-4 p-4 text-left select-text">
        <div>
          <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest block mb-0.5">Reference Card</span>
          <h2 className="text-lg font-bold text-foreground">Geometric Properties of Diagram Areas</h2>
          <SlideParagraph variant="plain" className="text-[11px] text-muted-foreground leading-normal">
            Essential area and centroid formulas to determine bending moment changes: <LatexFormula math="\Delta M = \int V \, dx" />
          </SlideParagraph>
        </div>

        <div className="flex-1 overflow-hidden flex flex-col justify-stretch">
          <SlideTable
            headers={headers}
            rows={rows}
            dense="relaxed"
            bordered={true}
            hoverable={true}
            className="flex-1"
          />
        </div>
      </div>
    </FullWidthLayout>
  );
};

export default CentroidsAndAreas;
