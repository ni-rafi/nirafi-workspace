
import { type ClickSyncedTabItem } from '@/features/presentation/components/elements/ClickSyncedTabs';
import { LatexFormula, SlideParagraph, CalculationOutput, ClickReveal } from '@/features/presentation/components/elements';
import { Beam2DDrawing } from '@/subjects/mechanics-of-solids/features/sfd-bmd/components/drawings';
import { ExpandableDrawing } from '@/shared/components';
import { problem3Config } from '../../problemConfig';

export const getProblem3SolverItems = (currentClick: number): ClickSyncedTabItem[] => {
  const { beam, h_mm, tau_allow } = problem3Config;

  return [
    {
      title: '1. Reaction Force Analysis',
      badge: 'Reactions',
      badgeVariant: 'primary',
      description: 'Calculate support reactions under UDL load conditions.',
      tintClass: 'border-l-[3px] border-l-indigo-500 bg-indigo-500/5 dark:bg-indigo-500/[0.08]',
      rightVisualizer: (
        <ExpandableDrawing
          title="Beam Reaction Support Forces"
          description="Simply supported beam showing w = 10 kN/m, L = 3 m, and reaction support parameters."
          className="w-full max-w-[450px]"
        >
          <Beam2DDrawing
            beam={beam}
            showReactions={true}
            resolvedReactions={currentClick >= 1}
            reactionAVal={currentClick >= 1 ? "15.0 kN" : "R_A"}
            reactionBVal={currentClick >= 1 ? "15.0 kN" : "R_B"}
          />
        </ExpandableDrawing>
      ),
      rightContent: (
        <div className="text-xs leading-normal text-muted-foreground w-full px-1">
          <SlideParagraph variant="plain" className="text-xs font-bold text-foreground mb-1">
            Reaction Force Balance:
          </SlideParagraph>
          <span className="space-y-1 block text-muted-foreground">
            • <strong>Equilibrium Condition</strong>: For a symmetric simply supported span under UDL:
            <div className="text-xs text-foreground bg-muted/40 py-1 px-1.5 rounded text-center my-1 font-mono border border-border/20">
              <LatexFormula math="R_A = R_B = \frac{w \cdot L}{2}" />
            </div>
            <ClickReveal at={1}>
              <span>
                • <strong>Substitution</strong>: Substitute <LatexFormula math="w = 10\text{ kN/m}" /> and <LatexFormula math="L = 3\text{ m}" />:
                <div className="text-xs text-foreground bg-muted/40 py-1 px-1.5 rounded text-center my-1 font-mono border border-border/20">
                  <LatexFormula math="R_A = R_B = \frac{10 \cdot 3}{2} = 15.0\text{ kN}" />
                </div>
              </span>
            </ClickReveal>
          </span>
        </div>
      ),
      leftBottomContent: (
        <div className="grid grid-cols-2 gap-2 w-full border-t border-border/30 pt-3">
          <CalculationOutput title="Reaction R_A" value="R_A" unit="" variant="compact" />
          <ClickReveal at={1} className="w-full">
            <CalculationOutput title="Solved reaction" value="15.0" unit="kN" variant="compact" />
          </ClickReveal>
        </div>
      )
    },
    {
      title: '2. Maximum Shear Force',
      badge: 'Peak Shear',
      badgeVariant: 'warning',
      description: 'Determine maximum internal shear force across the span.',
      tintClass: 'border-l-[3px] border-l-amber-500 bg-amber-500/5 dark:bg-amber-500/[0.08]',
      rightVisualizer: (
        <ExpandableDrawing
          title="Shear Force Diagram Preview"
          description="Simply supported beam and reaction support values."
          className="w-full max-w-[450px]"
        >
          <Beam2DDrawing
            beam={beam}
            showReactions={true}
            resolvedReactions={true}
            reactionAVal="15.0 kN"
            reactionBVal="15.0 kN"
          />
        </ExpandableDrawing>
      ),
      rightContent: (
        <div className="text-xs leading-normal text-muted-foreground w-full px-1">
          <SlideParagraph variant="plain" className="text-xs font-bold text-foreground mb-1">
            Shear Limit:
          </SlideParagraph>
          <span className="space-y-1 block text-muted-foreground">
            • <strong>Location</strong>: The peak internal shear force occurs directly at the supports:
            <div className="text-xs text-foreground bg-muted/40 py-1 px-1.5 rounded text-center my-1 font-mono border border-border/20">
              <LatexFormula math="V_{\max} = R_A = 15.0\text{ kN}" />
            </div>
            <ClickReveal at={3}>
              <span>
                • <strong>SI Base Units</strong>: Convert shear force to Newtons for formula compatibility:
                <div className="text-xs text-foreground bg-muted/40 py-1 px-1.5 rounded text-center my-1 font-mono border border-border/20">
                  <LatexFormula math="V_{\max} = 15,000\text{ N}" />
                </div>
              </span>
            </ClickReveal>
          </span>
        </div>
      ),
      leftBottomContent: (
        <div className="grid grid-cols-2 gap-2 w-full border-t border-border/30 pt-3">
          <CalculationOutput title="Peak Shear V_max" value="15.0" unit="kN" variant="compact" />
          <ClickReveal at={3} className="w-full">
            <CalculationOutput title="Base Units" value="15,000" unit="N" variant="compact" />
          </ClickReveal>
        </div>
      )
    },
    {
      title: '3. Shear Stress Inequality',
      badge: 'Criteria',
      badgeVariant: 'info',
      description: 'Formulate allowable shear stress limit for rectangular section.',
      tintClass: 'border-l-[3px] border-l-cyan-500 bg-cyan-500/5 dark:bg-cyan-500/[0.08]',
      rightVisualizer: (
        <ExpandableDrawing
          title="Rectangular Section Design Profile"
          description="Cross-section showing width b and depth h = 300 mm."
          className="w-full max-w-[450px]"
        >
          <svg viewBox="0 0 160 120" className="w-full max-w-[160px] overflow-visible mx-auto">
            <rect x={55} y={15} width={50} height={90} className="fill-primary/10 stroke-muted-foreground" strokeWidth={1.5} />
            {/* Width Dimension */}
            <line x1={55} y1={10} x2={105} y2={10} className="stroke-muted-foreground/40" strokeWidth={0.8} />
            <text x={80} y={5} className="fill-blue-500 text-[10px] font-mono font-bold" textAnchor="middle">b = ?</text>
            {/* Depth Dimension */}
            <line x1={112} y1={15} x2={112} y2={105} className="stroke-muted-foreground/40" strokeWidth={0.8} />
            <text x={117} y={63} className="fill-foreground text-[10px] font-mono font-bold" textAnchor="start">h = 300 mm</text>
          </svg>
        </ExpandableDrawing>
      ),
      rightContent: (
        <div className="text-xs leading-normal text-muted-foreground w-full px-1">
          <SlideParagraph variant="plain" className="text-xs font-bold text-foreground mb-1">
            Rectangular Shear Stress Criterion:
          </SlideParagraph>
          <span className="space-y-1 block text-muted-foreground">
            • <strong>Stress Formula</strong>: For a solid rectangular beam, maximum shear stress is given by:
            <div className="text-xs text-foreground bg-muted/40 py-1 px-1.5 rounded text-center my-1 font-mono border border-border/20">
              <LatexFormula math="\tau_{\max} = \frac{1.5 \cdot V_{\max}}{b \cdot h} \le \tau_{\text{allow}}" />
            </div>
            • <strong>Constraint</strong>: Keep peak shear stress below allowable limits to prevent wood grain failure.
          </span>
        </div>
      ),
      leftBottomContent: (
        <div className="grid grid-cols-2 gap-2 w-full border-t border-border/30 pt-3">
          <CalculationOutput title="Allowable Limit" value={tau_allow.toFixed(2)} unit="MPa" variant="compact" />
          <CalculationOutput title="Depth h" value={h_mm.toFixed(0)} unit="mm" variant="compact" />
        </div>
      )
    },
    {
      title: '4. Width Sizing Solution',
      badge: 'Sizing',
      badgeVariant: 'success',
      description: 'Substitute values and solve for minimum width b.',
      tintClass: 'border-l-[3px] border-l-emerald-500 bg-emerald-500/5 dark:bg-emerald-500/[0.08]',
      rightVisualizer: (
        <ExpandableDrawing
          title="Solved Rectangular Cross Section"
          description="Sized timber cross-section showing b = 75 mm and depth h = 300 mm."
          className="w-full max-w-[450px]"
        >
          <svg viewBox="0 0 160 120" className="w-full max-w-[160px] overflow-visible mx-auto">
            <rect x={55} y={15} width={50} height={90} className="fill-emerald-500/10 stroke-emerald-500" strokeWidth={1.5} />
            {/* Width Dimension */}
            <line x1={55} y1={10} x2={105} y2={10} className="stroke-emerald-500/40" strokeWidth={0.8} />
            <text x={80} y={5} className="fill-emerald-500 text-[10px] font-mono font-bold" textAnchor="middle">b = 75 mm</text>
            {/* Depth Dimension */}
            <line x1={112} y1={15} x2={112} y2={105} className="stroke-muted-foreground/40" strokeWidth={0.8} />
            <text x={117} y={63} className="fill-foreground text-[10px] font-mono font-bold" textAnchor="start">h = 300 mm</text>
          </svg>
        </ExpandableDrawing>
      ),
      rightContent: (
        <div className="text-xs leading-normal text-muted-foreground w-full px-1">
          <SlideParagraph variant="plain" className="text-xs font-bold text-foreground mb-1">
            Solve Inequality:
          </SlideParagraph>
          <span className="space-y-1 block text-muted-foreground">
            • <strong>Substitute constants</strong>: Plug in <LatexFormula math="V_{\max} = 15,000\text{ N}" />, <LatexFormula math="h = 300\text{ mm}" />, and <LatexFormula math="\tau_{\text{allow}} = 1.0\text{ MPa}" />:
            <div className="text-xs text-foreground bg-muted/40 py-1 px-1.5 rounded text-center my-1 font-mono border border-border/20">
              <LatexFormula math="\frac{1.5 \cdot 15,000}{b \cdot 300} \le 1.0 \implies \frac{75.0}{b} \le 1.0" />
            </div>
            <ClickReveal at={6}>
              <span>
                • <strong>Minimum width b</strong>: Solve the inequality to isolate required dimension:
                <div className="text-xs text-foreground bg-muted/40 py-1 px-1.5 rounded text-center my-1 font-mono border border-border/20">
                  <LatexFormula math="b \ge 75.0\text{ mm}" />
                </div>
              </span>
            </ClickReveal>
          </span>
        </div>
      ),
      leftBottomContent: (
        <div className="grid grid-cols-2 gap-2 w-full border-t border-border/30 pt-3">
          <CalculationOutput title="Limit stress" value="1.0" unit="MPa" variant="compact" />
          <ClickReveal at={6} className="w-full">
            <CalculationOutput title="Min Width b" value="75.0" unit="mm" variant="compact" />
          </ClickReveal>
        </div>
      )
    }
  ];
};
