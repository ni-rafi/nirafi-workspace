import React from 'react';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import { LatexFormula, SlideParagraph } from '@/features/presentation/components/elements';

export const CentroidsAndAreas: React.FC = () => {
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

        <div className="flex-1 border border-border/50 rounded-xl overflow-hidden bg-background/50 flex flex-col justify-stretch">
          <table className="w-full text-left border-collapse text-[12.5px] flex-1">
            <thead>
              <tr className="bg-muted/40 border-b border-border/40 text-muted-foreground font-bold uppercase tracking-wider">
                <th className="px-4 py-2 w-28">Shape</th>
                <th className="px-4 py-2 text-center w-28">Visual Profile</th>
                <th className="px-4 py-2">{"Area Formula (\\(A\\))"}</th>
                <th className="px-4 py-2">{"Centroid Position (\\(\\bar{x}\\))"}</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/10 hover:bg-muted/5">
                <td className="px-4 py-2 font-bold text-foreground">Rectangle</td>
                <td className="px-4 py-2 text-center">
                  <svg className="w-16 h-8 mx-auto overflow-visible" viewBox="0 0 60 30">
                    <rect x="5" y="5" width="50" height="20" className="fill-emerald-500/10 stroke-emerald-500" strokeWidth="1.5" />
                  </svg>
                </td>
                <td className="px-4 py-2 font-mono"><LatexFormula math="A = b \cdot h" /></td>
                <td className="px-4 py-2"><LatexFormula math="\bar{x} = \frac{b}{2}" /> (centered)</td>
              </tr>
              <tr className="border-b border-border/10 hover:bg-muted/5">
                <td className="px-4 py-2 font-bold text-foreground">Triangle</td>
                <td className="px-4 py-2 text-center">
                  <svg className="w-16 h-8 mx-auto overflow-visible" viewBox="0 0 60 30">
                    <polygon points="5,25 55,5 55,25" className="fill-blue-500/10 stroke-blue-500" strokeWidth="1.5" />
                  </svg>
                </td>
                <td className="px-4 py-2 font-mono"><LatexFormula math="A = \frac{1}{2} b \cdot h" /></td>
                <td className="px-4 py-2"><LatexFormula math="\bar{x} = \frac{b}{3}" /> (from vertical base)</td>
              </tr>
              <tr className="hover:bg-muted/5">
                <td className="px-4 py-2 font-bold text-foreground">Parabolic Spandrel</td>
                <td className="px-4 py-2 text-center">
                  <svg className="w-16 h-8 mx-auto overflow-visible" viewBox="0 0 60 30">
                    <path d="M 5,25 Q 40,25 55,5 L 55,25 Z" className="fill-indigo-500/10 stroke-indigo-500" strokeWidth="1.5" />
                  </svg>
                </td>
                <td className="px-4 py-2 font-mono"><LatexFormula math="A = \frac{1}{3} b \cdot h" /></td>
                <td className="px-4 py-2"><LatexFormula math="\bar{x} = \frac{b}{4}" /> (from vertical base)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </FullWidthLayout>
  );
};

export default CentroidsAndAreas;
