import { LatexFormula } from '@/features/presentation/components/elements';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';

export const LookupTableSlide: React.FC = () => {
  return (
    <FullWidthLayout title="Beam Peak Bending Moment Lookup Table" bgVariant="default">
      <div className="w-full max-w-4xl mx-auto py-2">
        <div className="overflow-x-auto border border-border/50 rounded-xl bg-muted/20 backdrop-blur-md">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-muted/40 border-b border-border text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                <th className="py-2.5 px-4">Beam Type</th>
                <th className="py-2.5 px-4">Loading Diagram</th>
                <th className="py-2.5 px-4">Max Shear (<LatexFormula math="V_{\max}" />)</th>
                <th className="py-2.5 px-4">Max Moment (<LatexFormula math="M_{\max}" />)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30 font-medium">
              <tr>
                <td className="py-3 px-4 text-foreground font-bold">Simply Supported</td>
                <td className="py-3 px-4 text-muted-foreground">
                  Concentrated load <LatexFormula math="P" /> at center
                </td>
                <td className="py-3 px-4 font-mono"><LatexFormula math="P / 2" /></td>
                <td className="py-3 px-4 font-mono text-indigo-400 font-bold"><LatexFormula math="P \cdot L / 4" /></td>
              </tr>
              <tr className="bg-muted/10">
                <td className="py-3 px-4 text-foreground font-bold">Simply Supported</td>
                <td className="py-3 px-4 text-muted-foreground">
                  Uniformly distributed load <LatexFormula math="w" />
                </td>
                <td className="py-3 px-4 font-mono"><LatexFormula math="w \cdot L / 2" /></td>
                <td className="py-3 px-4 font-mono text-indigo-400 font-bold"><LatexFormula math="w \cdot L^2 / 8" /></td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-foreground font-bold">Cantilever</td>
                <td className="py-3 px-4 text-muted-foreground">
                  Concentrated load <LatexFormula math="P" /> at free end
                </td>
                <td className="py-3 px-4 font-mono"><LatexFormula math="P" /></td>
                <td className="py-3 px-4 font-mono text-indigo-400 font-bold"><LatexFormula math="P \cdot L" /></td>
              </tr>
              <tr className="bg-muted/10">
                <td className="py-3 px-4 text-foreground font-bold">Cantilever</td>
                <td className="py-3 px-4 text-muted-foreground">
                  Uniformly distributed load <LatexFormula math="w" />
                </td>
                <td className="py-3 px-4 font-mono"><LatexFormula math="w \cdot L" /></td>
                <td className="py-3 px-4 font-mono text-indigo-400 font-bold"><LatexFormula math="w \cdot L^2 / 2" /></td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-[10px] text-muted-foreground text-center mt-3 leading-relaxed">
          *Use these standardized formulas to bypass full boundary integration steps for simple loading configurations.
        </p>
      </div>
    </FullWidthLayout>
  );
};

export default LookupTableSlide;
