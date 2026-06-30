import React from 'react';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import { LatexFormula, SlideParagraph, SlideTable } from '@/features/presentation/components/elements';
import { ParabolaDownSVG, CubicDownSVG, ParabolaUpSVG, CubicUpSVG } from './drawings/ShapeDiagrams';

export const EquationParabolicCubic: React.FC = () => {
  const headers = [
    { label: 'Typical Equation', width: '150px' },
    { label: 'Shape & Slope Info', width: '120px' },
    { label: 'Visual Profile', align: 'center' as const, width: '100px' },
    { label: 'Area A', width: '100px' },
    { label: 'Centroid x̄', width: '100px' },
  ];

  const rows = [
    [
      <LatexFormula math="y = mx^2 + c" key="eq-1" />,
      <span className="font-bold text-foreground text-xs" key="sh-1">Parabola (Slope=0 at peak)</span>,
      <ParabolaDownSVG key="vis-1" />,
      <LatexFormula math="\frac{2LM}{3}" key="a-1" />,
      <LatexFormula math="\frac{3L}{8}" key="c-1" />,
    ],
    [
      <LatexFormula math="y = mx^3 + nx + c" key="eq-2" />,
      <span className="font-bold text-foreground text-xs" key="sh-2">Cubic (Slope=0 at peak)</span>,
      <CubicDownSVG key="vis-2" />,
      <LatexFormula math="\frac{3LM}{4}" key="a-2" />,
      <LatexFormula math="\frac{2L}{5}" key="c-2" />,
    ],
    [
      <LatexFormula math="y = mx^2 + c" key="eq-3" />,
      <span className="font-bold text-foreground text-xs" key="sh-3">Parabola (Slope=0 at tip)</span>,
      <ParabolaUpSVG key="vis-3" />,
      <LatexFormula math="\frac{LM}{3}" key="a-3" />,
      <LatexFormula math="\frac{L}{4}" key="c-3" />,
    ],
    [
      <LatexFormula math="y = mx^3 + nx + c" key="eq-4" />,
      <span className="font-bold text-foreground text-xs" key="sh-4">Cubic (Slope=0 at tip)</span>,
      <CubicUpSVG key="vis-4" />,
      <LatexFormula math="\frac{LM}{4}" key="a-4" />,
      <LatexFormula math="\frac{L}{5}" key="c-4" />,
    ],
  ];

  return (
    <FullWidthLayout title="Types of equation & corresponding graph">
      <div className="w-full h-full flex flex-col justify-between gap-4 p-4 text-left select-text">
        <div>
          <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest block mb-0.5">Reference Library (Parabolic & Cubic)</span>
          <h2 className="text-lg font-bold text-foreground">Integration Constants: Areas and Centroids (Part 2)</h2>
          <SlideParagraph variant="plain" className="text-[11px] text-muted-foreground leading-normal">
            For varying loads (UVL) producing parabolic shear, or parabolic shear producing cubic moment profiles.
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

export default EquationParabolicCubic;
