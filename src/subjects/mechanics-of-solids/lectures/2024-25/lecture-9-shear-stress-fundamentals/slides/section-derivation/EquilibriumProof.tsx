import React from 'react';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import { SlideParagraph, LatexFormula } from '@/features/presentation/components/elements';
import { BookOpen } from 'lucide-react';

export const EquilibriumProof: React.FC = () => {
  return (
    <FullWidthLayout title="Formulating the Horizontal Equilibrium Proof">
      <div className="flex flex-col h-full justify-between gap-3 text-left max-w-3xl mx-auto py-1">
        <div>
          <div className="flex items-center space-x-1.5 text-indigo-500 font-bold text-xs uppercase mb-1">
            <BookOpen className="h-4.5 w-4.5" />
            <span>Mathematical Derivation Steps</span>
          </div>
          <SlideParagraph variant="plain" className="text-xs text-muted-foreground">
            We substitute the flexural normal stress formula σ = My/I into the horizontal force balance relation:
          </SlideParagraph>
        </div>

        {/* Step-by-step Equations list */}
        <div className="bg-slate-50 dark:bg-muted/10 border border-border/40 rounded-2xl p-4 space-y-3 font-sans text-xs">
          {/* Step 1 */}
          <div className="flex items-start gap-4">
            <span className="font-bold text-indigo-500 min-w-[50px] shrink-0">Step 1:</span>
            <div className="flex-1">
              <span className="text-muted-foreground">Force balance along plane:</span>
              <div className="my-1.5 py-1 text-center bg-background rounded border border-border/20">
                <LatexFormula math="\\Delta H = \\int_{A'} \\sigma_d \\, dA - \\int_{A'} \\sigma_C \\, dA = \\int_{A'} (\\sigma_d - \\sigma_C) \\, dA" />
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start gap-4">
            <span className="font-bold text-indigo-500 min-w-[50px] shrink-0">Step 2:</span>
            <div className="flex-1">
              <span className="text-muted-foreground">Substitute flexure stress σ = My/I, where M_d = M_C + ΔM:</span>
              <div className="my-1.5 py-1 text-center bg-background rounded border border-border/20">
                <LatexFormula math="\\Delta H = \\int_{A'} \\left( \\frac{(M_C + \\Delta M)y}{I} - \\frac{M_C y}{I} \\right) dA = \\int_{A'} \\frac{\\Delta M \\cdot y}{I} \\, dA" />
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-start gap-4">
            <span className="font-bold text-indigo-500 min-w-[50px] shrink-0">Step 3:</span>
            <div className="flex-1">
              <span className="text-muted-foreground">Pull constants (ΔM, I) outside the integral:</span>
              <div className="my-1.5 py-1 text-center bg-background rounded border border-border/20">
                <LatexFormula math="\\Delta H = \\frac{\\Delta M}{I} \\int_{A'} y \\, dA" />
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex items-start gap-4">
            <span className="font-bold text-indigo-500 min-w-[50px] shrink-0">Step 4:</span>
            <div className="flex-1">
              <span className="text-muted-foreground">Substitute the first moment of area Q = ∫ y dA and differential relation ΔM = V · Δx:</span>
              <div className="my-1.5 py-1.5 text-center bg-indigo-500/10 rounded border border-indigo-500/30">
                <LatexFormula math="\\Delta H = \\frac{V \\cdot Q}{I} \\cdot \\Delta x" />
              </div>
            </div>
          </div>
        </div>

        <div className="text-[10px] text-muted-foreground italic text-center">
          Note: Bending shear force V = dM/dx ≈ ΔM/Δx directly drives horizontal shear stress development.
        </div>
      </div>
    </FullWidthLayout>
  );
};

export default EquilibriumProof;
