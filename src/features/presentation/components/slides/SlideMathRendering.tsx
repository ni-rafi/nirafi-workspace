import React from 'react';
import LatexFormula from '../elements/LatexFormula';

export const SlideMathRendering: React.FC = () => {
  return (
    <div className="relative w-full h-full flex flex-col justify-start text-left px-8 py-8 overflow-y-auto">
      <div className="flex flex-col gap-1 mb-6 select-none">
        <h3 className="text-xl font-bold text-foreground">
          Slide 6: LaTeX Mathematical Formulations
        </h3>
        <p className="text-xs text-muted-foreground">
          KaTeX-powered high-fidelity typesetting for structural formulas and QS estimations.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6 w-full items-start">
        <div className="flex flex-col gap-3 p-4 border border-white/10 bg-slate-900/40 rounded-2xl">
          <span className="text-[10px] font-bold text-primary uppercase tracking-wider font-mono select-none">
            Direct Volume Equations (Block)
          </span>
          <p className="text-xs text-muted-foreground leading-normal">
            Volume estimation for a basic rectangular beam concrete volume:
          </p>
          <LatexFormula
            block={true}
            math="V_{\text{concrete}} = L \times W \times H \times (1 + \omega_{\text{waste}})"
          />
          <p className="text-xs text-muted-foreground leading-normal">
            Where <LatexFormula math="L" /> is length, <LatexFormula math="W" /> is width, <LatexFormula math="H" /> is thickness, and <LatexFormula math="\omega_{\text{waste}}" /> is the wastage allowance coefficient (e.g. <LatexFormula math="0.05" /> for 5% waste).
          </p>
        </div>

        <div className="flex flex-col gap-3 p-4 border border-white/10 bg-slate-900/40 rounded-2xl">
          <span className="text-[10px] font-bold text-primary uppercase tracking-wider font-mono select-none">
            Maxwell's Equations (Advanced Formula Block)
          </span>
          <LatexFormula
            block={true}
            math={`\\begin{aligned}
\\nabla \\cdot \\vec{E} &= \\frac{\\rho}{\\varepsilon_0} \\\\
\\nabla \\cdot \\vec{B} &= 0 \\\\
\\nabla \\times \\vec{E} &= -\\frac{\\partial\\vec{B}}{\\partial t} \\\\
\\nabla \\times \\vec{B} &= \\mu_0\\vec{J} + \\mu_0\\varepsilon_0\\frac{\\partial\\vec{E}}{\\partial t}
\\end{aligned}`}
          />
        </div>
      </div>
    </div>
  );
};

export default SlideMathRendering;
