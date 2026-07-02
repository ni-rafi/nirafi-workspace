
import { type ClickSyncedTabItem } from '@/features/presentation/components/elements/ClickSyncedTabs';
import { LatexFormula, SlideParagraph, CalculationOutput, SlideList, ClickReveal } from '@/features/presentation/components/elements';
import { StressBalanceScaleDrawing } from './drawings/StressBalanceScaleDrawing';
import { CrossSectionEngine } from '@/subjects/mechanics-of-solids/cores/stress/cross-section.engine';
import { StaticalMomentEngine } from '@/subjects/mechanics-of-solids/cores/stress/statical-moment.engine';
import { problem2Config } from '../../problemConfig';

export const getConstraintsSolverItems = (currentClick: number): ClickSyncedTabItem[] => {
  const { shape } = problem2Config;
  const props = CrossSectionEngine.calculateProperties(shape);
  const H_m = shape.height ?? 0.3;

  // Calculate first moment of area at N.A. (y = 0)
  const statQ = StaticalMomentEngine.calculateQAndWidth(shape, 0, props);

  const Q_max_mm3 = statQ.Q * 1e9;
  const t_web_mm = (shape.thicknessWeb ?? 0.05) * 1000;

  // Distances to extreme fibers
  const c_top_mm = (H_m - props.centroid) * 1000;
  const c_bot_mm = props.centroid * 1000;
  const c_max_mm = Math.max(c_top_mm, c_bot_mm);

  // Solve for L using the constraint: σ_max = 4 * τ_max
  const L_mm = (4 * Q_max_mm3) / (t_web_mm * c_max_mm);
  const L_m = L_mm / 1000;

  const propertiesList = [
    { text: <span>Peak Statical Moment: <LatexFormula math={`Q_{\\max} = ${Q_max_mm3.toLocaleString()}\\text{ mm}^3`} /></span> },
    { text: <span>Web thickness: <LatexFormula math={`t_{\\text{web}} = ${t_web_mm}\\text{ mm}`} /></span> },
    { text: <span>Centroidal height: <LatexFormula math={`c_{\\max} = ${c_max_mm.toFixed(1)}\\text{ mm}`} /> (top fiber)</span> }
  ];

  return [
    {
      title: '1. Unsymmetric Section Constants',
      badge: 'Section Constants',
      badgeVariant: 'primary',
      description: 'Review structural constants of the unsymmetric section.',
      tintClass: 'border-l-[3px] border-l-indigo-500 bg-indigo-500/5 dark:bg-indigo-500/[0.08]',
      rightVisualizer: (
        <StressBalanceScaleDrawing currentClick={currentClick} />
      ),
      rightContent: (
        <div className="text-xs leading-normal text-muted-foreground w-full px-1">
          <SlideParagraph variant="plain" className="text-xs font-bold text-foreground mb-1">
            Section Constants:
          </SlideParagraph>
          <span className="space-y-1 block text-muted-foreground">
            • <strong>Peak Moment Location</strong>: Maximum shear stress occurs at the Neutral Axis, and peak normal stress occurs at extreme fibers:
            <div className="mt-1.5">
              <SlideList
                items={propertiesList}
                variant="plain"
                revealMode="none"
              />
            </div>
          </span>
        </div>
      ),
      leftBottomContent: (
        <div className="grid grid-cols-2 gap-2 w-full border-t border-border/30 pt-3">
          <CalculationOutput title="Q_max" value={Q_max_mm3.toLocaleString()} unit="mm³" variant="compact" />
          <CalculationOutput title="Web Width t_web" value={t_web_mm.toFixed(0)} unit="mm" variant="compact" />
        </div>
      )
    },
    {
      title: '2. Optimization Solution',
      badge: 'Solution',
      badgeVariant: 'success',
      description: 'Derive optimal beam length from bending-shear ratio constraint.',
      tintClass: 'border-l-[3px] border-l-emerald-500 bg-emerald-500/5 dark:bg-emerald-500/[0.08]',
      rightVisualizer: (
        <StressBalanceScaleDrawing currentClick={2} />
      ),
      rightContent: (
        <div className="text-xs leading-normal text-muted-foreground w-full px-1">
          <SlideParagraph variant="plain" className="text-xs font-bold text-foreground mb-1">
            Stress Ratio Equilibrium:
          </SlideParagraph>
          <span className="space-y-1 block text-muted-foreground">
            • <strong>Constraint Formulation</strong>: Set normal stress equal to four times shear stress:
            <div className="text-xs text-foreground bg-muted/40 py-1 px-1.5 rounded text-center my-1 font-mono border border-border/20">
              <LatexFormula math="\sigma_{\max} = 4\tau_{\max}" />
            </div>
            <ClickReveal at={2}>
              <span>
                • <strong>Solve for Length L</strong>: Substitute formulas and simplify to get:
                <div className="text-xs text-foreground bg-indigo-500/10 rounded-lg border border-indigo-500/20 text-indigo-500 font-extrabold text-[12px] py-1 px-1.5 text-center my-1">
                  <LatexFormula math="L = \frac{4 \cdot Q_{\max}}{t_{\text{web}} \cdot c_{\max}}" />
                </div>
              </span>
            </ClickReveal>
          </span>
        </div>
      ),
      leftBottomContent: (
        <div className="grid grid-cols-2 gap-2 w-full border-t border-border/30 pt-3">
          <CalculationOutput title="Ratio Constraint" value="σ = 4τ" unit="" variant="compact" />
          <ClickReveal at={2} className="w-full">
            <CalculationOutput title="Solved Length L" value={L_m.toFixed(3)} unit="m" variant="compact" />
          </ClickReveal>
        </div>
      )
    }
  ];
};
