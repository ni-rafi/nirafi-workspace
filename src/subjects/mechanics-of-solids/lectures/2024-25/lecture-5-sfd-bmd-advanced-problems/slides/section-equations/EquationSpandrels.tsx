import React from 'react';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import { LatexFormula, SlideParagraph, SlideTable } from '@/features/presentation/components/elements';
import { ParabolaDownSVG, CubicUpSVG, CubicDownSVG } from './drawings/ShapeDiagrams';

export const EquationSpandrels: React.FC = () => {
  const headers = [
    { label: 'Spandrel Shape', width: '130px' },
    { label: 'Profile', align: 'center' as const, width: '100px' },
    { label: 'Area', width: '100px' },
    { label: 'Centroid C₁ (from face)', width: '120px' },
    { label: 'Centroid C₂ (from tip)', width: '120px' },
  ];

  const rows = [
    [
      <span className="font-bold text-foreground text-xs" key="sh-1">Parabolic (y = kx², concave down)</span>,
      <ParabolaDownSVG key="vis-1" />,
      <LatexFormula math="\frac{2bh}{3}" key="a-1" />,
      <LatexFormula math="\frac{3b}{8}" key="c1-1" />,
      <LatexFormula math="\frac{5b}{8}" key="c2-1" />,
    ],
    [
      <span className="font-bold text-foreground text-xs" key="sh-2">Cubic (y = kx³, concave up)</span>,
      <CubicUpSVG key="vis-2" />,
      <LatexFormula math="\frac{bh}{4}" key="a-2" />,
      <LatexFormula math="\frac{b}{5}" key="c1-2" />,
      <LatexFormula math="\frac{4b}{5}" key="c2-2" />,
    ],
    [
      <span className="font-bold text-foreground text-xs" key="sh-3">Cubic (y = kx³, concave down)</span>,
      <CubicDownSVG key="vis-3" />,
      <LatexFormula math="\frac{3bh}{4}" key="a-3" />,
      <LatexFormula math="\frac{2b}{5}" key="c1-3" />,
      <LatexFormula math="\frac{3b}{5}" key="c2-3" />,
    ],
    [
      <span className="font-bold text-foreground text-xs" key="sh-4">General Spandrel (y = kxⁿ, concave up)</span>,
      <div className="text-[10px] text-muted-foreground text-center" key="vis-4">y = kxⁿ</div>,
      <LatexFormula math="\frac{bh}{n+1}" key="a-4" />,
      <LatexFormula math="\frac{b}{n+2}" key="c1-4" />,
      <LatexFormula math="\frac{b(n+1)}{n+2}" key="c2-4" />,
    ],
  ];

  return (
    <FullWidthLayout title="Types of equation & corresponding graph">
      <div className="w-full h-full flex flex-col justify-between gap-4 p-4 text-left select-text">
        <div>
          <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest block mb-0.5">Reference Library (Spandrels)</span>
          <h2 className="text-lg font-bold text-foreground">Advanced Spandrel Integrations (Part 3)</h2>
          <SlideParagraph variant="plain" className="text-[11px] text-muted-foreground leading-normal">
            Centroid locations measured from the vertical face ($C_1$) vs the pointed tip ($C_2$).
          </SlideParagraph>
        </div>

        <div className="flex-1 overflow-hidden flex flex-col justify-stretch">
          <SlideTable
            headers={headers}
            rows={rows}
            dense="relaxed"
            bordered={true}
            hoverable={true}
            className="flex-1 text-sm"
          />
        </div>
      </div>
    </FullWidthLayout>
  );
};

export default EquationSpandrels;
