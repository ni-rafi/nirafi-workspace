import React from 'react';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import { SlideParagraph, LatexFormula } from '@/features/presentation/components/elements';
import { BookOpen } from 'lucide-react';

export const ParabolicProof: React.FC = () => {
  return (
    <FullWidthLayout title="Deriving the Parabolic Stress Equation">
      <div className="flex flex-col h-full justify-between gap-3 text-left max-w-3xl mx-auto py-1">
        <div>
          <div className="flex items-center space-x-1.5 text-indigo-500 font-bold text-xs uppercase mb-1">
            <BookOpen className="h-4.5 w-4.5" />
            <span>Algebraic Substitution & Proof</span>
          </div>
          <SlideParagraph variant="plain" className="text-xs text-muted-foreground">
            We compute the statical moment of area Q and substitute it into the flexural shear stress equation:
          </SlideParagraph>
        </div>

        {/* Step-by-step math proof */}
        <div className="bg-slate-50 dark:bg-muted/10 border border-border/40 rounded-2xl p-4 space-y-3 font-sans text-xs">
          {/* Step 1 */}
          <div className="flex items-start gap-4">
            <span className="font-bold text-indigo-500 min-w-[50px] shrink-0">Step 1:</span>
            <div className="flex-1">
              <span className="text-muted-foreground">Formulate the statical moment Q:</span>
              <div className="my-1.5 py-1 text-center bg-background rounded border border-border/20">
                <LatexFormula math="Q = \\bar{y} A' = \\left[ \\frac{1}{2}\\left(\\frac{h}{2} + y\\right) \\right] \\cdot \\left[ b\\left(\\frac{h}{2} - y\\right) \\right] = \\frac{b}{2}\\left( \\frac{h^2}{4} - y^2 \\right)" />
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start gap-4">
            <span className="font-bold text-indigo-500 min-w-[50px] shrink-0">Step 2:</span>
            <div className="flex-1">
              <span className="text-muted-foreground">Substitute Q into the shear stress equation τ = VQ/Ib:</span>
              <div className="my-1.5 py-1 text-center bg-background rounded border border-border/20">
                <LatexFormula math="\\tau = \\frac{V \\cdot \\left[ \\frac{b}{2}\\left( \\frac{h^2}{4} - y^2 \\right) \\right]}{I \\cdot b} = \\frac{V}{2I}\\left( \\frac{h^2}{4} - y^2 \\right)" />
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-start gap-4">
            <span className="font-bold text-indigo-500 min-w-[50px] shrink-0">Step 3:</span>
            <div className="flex-1">
              <span className="text-muted-foreground">Rearrange in terms of I = bh³/12 and cross-sectional area A = b · h:</span>
              <div className="my-1.5 py-1.5 text-center bg-indigo-500/10 rounded border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 font-extrabold">
                <LatexFormula math="\\tau = \\frac{3}{2} \\cdot \\frac{V}{A} \\left( 1 - \\frac{y^2}{(h/2)^2} \\right)" />
              </div>
            </div>
          </div>
        </div>

        <div className="text-[10px] text-muted-foreground italic text-center">
          Note: Because y is squared and negative (-y²), the shear stress distribution across the depth is a **downward-opening parabola**.
        </div>
      </div>
    </FullWidthLayout>
  );
};

export default ParabolicProof;
