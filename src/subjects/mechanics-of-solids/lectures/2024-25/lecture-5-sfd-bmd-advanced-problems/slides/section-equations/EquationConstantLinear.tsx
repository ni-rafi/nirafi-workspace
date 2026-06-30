import React from 'react';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import { LatexFormula, SlideParagraph, SlideTable } from '@/features/presentation/components/elements';
import { RectangleSVG, RightTriangleSVG, PeakTriangleSVG, TrapezoidSVG } from './drawings/ShapeDiagrams';

export const EquationConstantLinear: React.FC = () => {
  const headers = [
    { label: 'Typical Equation', width: '130px' },
    { label: 'Shape', width: '100px' },
    { label: 'Visual Profile', align: 'center' as const, width: '100px' },
    { label: 'Area A', width: '120px' },
    { label: 'Centroid x̄', width: '140px' },
  ];

  const rows = [
    [
      <LatexFormula math="y = \text{Constant}" key="eq-1" />,
      <span className="font-bold text-foreground" key="sh-1">Rectangle</span>,
      <RectangleSVG key="vis-1" />,
      <LatexFormula math="L \cdot M" key="a-1" />,
      <LatexFormula math="\frac{L}{2}" key="c-1" />,
    ],
    [
      <LatexFormula math="y = mx + c" key="eq-2" />,
      <span className="font-bold text-foreground" key="sh-2">Triangle</span>,
      <RightTriangleSVG key="vis-2" />,
      <LatexFormula math="\frac{LM}{2}" key="a-2" />,
      <LatexFormula math="\frac{L}{3}" key="c-2" />,
    ],
    [
      <LatexFormula math="y = \text{Piecewise Linear}" key="eq-3" />,
      <span className="font-bold text-foreground" key="sh-3">Triangle (Peak)</span>,
      <PeakTriangleSVG key="vis-3" />,
      <LatexFormula math="\frac{LM}{2}" key="a-3" />,
      <LatexFormula math="\frac{1}{3}(L + a)" key="c-3" />,
    ],
    [
      <LatexFormula math="y = mx + c" key="eq-4" />,
      <span className="font-bold text-foreground" key="sh-4">Trapezoid</span>,
      <TrapezoidSVG key="vis-4" />,
      <LatexFormula math="\frac{L}{2}(M_a + M_b)" key="a-4" />,
      <LatexFormula math="\frac{L}{3}\left(\frac{M_a + 2M_b}{M_a + M_b}\right)" key="c-4" />,
    ],
  ];

  return (
    <FullWidthLayout title="Types of equation & corresponding graph">
      <div className="w-full h-full flex flex-col justify-between gap-4 p-4 text-left select-text">
        <div>
          <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest block mb-0.5">Reference Library (Constant & Linear)</span>
          <h2 className="text-lg font-bold text-foreground">Integration Constants: Areas and Centroids (Part 1)</h2>
          <SlideParagraph variant="plain" className="text-[11px] text-muted-foreground leading-normal">
            For constant loads (UDL) producing linear shear, or linear shear producing parabolic moments.
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

export default EquationConstantLinear;
