import React from 'react';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import { LatexFormula, SlideParagraph, SlideTable } from '@/features/presentation/components/elements';
import { RectangleSVG, RightTriangleSVG, ParabolaUpSVG } from './drawings/ShapeDiagrams';

export const EquationBasicShapes: React.FC = () => {
  const headers = [
    { label: 'Geometric Shape', width: '130px' },
    { label: 'Visual Profile', align: 'center' as const, width: '100px' },
    { label: 'Area', width: '100px' },
    { label: 'Centroid C₁', width: '120px' },
    { label: 'Centroid C₂', width: '120px' },
  ];

  const rows = [
    [
      <span className="font-bold text-foreground" key="sh-1">Rectangle</span>,
      <RectangleSVG key="vis-1" />,
      <LatexFormula math="bh" key="a-1" />,
      <LatexFormula math="\frac{b}{2}" key="c1-1" />,
      <LatexFormula math="\frac{b}{2}" key="c2-1" />,
    ],
    [
      <span className="font-bold text-foreground" key="sh-2">Triangle</span>,
      <RightTriangleSVG key="vis-2" />,
      <LatexFormula math="\frac{bh}{2}" key="a-2" />,
      <LatexFormula math="\frac{b}{3}" key="c1-2" />,
      <LatexFormula math="\frac{2b}{3}" key="c2-2" />,
    ],
    [
      <span className="font-bold text-foreground text-xs" key="sh-3">Parabolic spandrel (y = kx², concave up)</span>,
      <ParabolaUpSVG key="vis-3" />,
      <LatexFormula math="\frac{bh}{3}" key="a-3" />,
      <LatexFormula math="\frac{b}{4}" key="c1-3" />,
      <LatexFormula math="\frac{3b}{4}" key="c2-3" />,
    ],
  ];

  return (
    <FullWidthLayout title="Types of equation & corresponding graph">
      <div className="w-full h-full flex flex-col justify-between gap-4 p-4 text-left select-text">
        <div>
          <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest block mb-0.5">Reference Library (Table 7.1)</span>
          <h2 className="text-lg font-bold text-foreground">Areas and Centroids of Basic Geometric Shapes</h2>
          <SlideParagraph variant="plain" className="text-[11px] text-muted-foreground leading-normal">
            Standard centroid distances measured relative to the vertical edge ($C_1$) vs the sloped tip ($C_2$).
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

export default EquationBasicShapes;
