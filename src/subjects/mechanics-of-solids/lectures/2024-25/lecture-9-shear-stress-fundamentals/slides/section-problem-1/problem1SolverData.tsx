import React from 'react';
import { type ClickSyncedTabItem } from '@/features/presentation/components/elements/ClickSyncedTabs';
import { LatexFormula, SlideParagraph, CalculationOutput, ClickReveal } from '@/features/presentation/components/elements';
import { ProfileShapeView } from '@/subjects/mechanics-of-solids/features/stress/components/diagrams/ProfileShapeView';
import { ShearStressProfileChart } from '@/subjects/mechanics-of-solids/features/stress/components/diagrams/ShearStressProfileChart';
import { CrossSectionEngine } from '@/subjects/mechanics-of-solids/cores/stress/cross-section.engine';
import { StressSolverEngine } from '@/subjects/mechanics-of-solids/cores/stress/stress-solver.engine';
import { StaticalMomentEngine } from '@/subjects/mechanics-of-solids/cores/stress/statical-moment.engine';
import { ExpandableDrawing } from '@/shared/components';
import { problem1Config } from '../../problemConfig';

export const Problem1Visualizer: React.FC<{ inspectY: number; step?: number; currentClick?: number }> = ({ inspectY, currentClick = 0 }) => {
  const { shape, V } = problem1Config;
  const props = CrossSectionEngine.calculateProperties(shape);
  const res = StressSolverEngine.solveDistribution(shape, 0, V);

  const H_m = shape.height ?? 0.3;
  const ybar_m = props.centroid;

  const svgW = currentClick <= 1 ? 160 : 240;
  const svgH = 150;
  const paddingY = 20;
  const chartH = svgH - paddingY * 2; // 110
  const toPixelY = (yNA: number) => paddingY + (1 - (yNA + ybar_m) / H_m) * chartH;

  const inspectY_m = inspectY / 1000;
  const statQ = StaticalMomentEngine.calculateQAndWidth(shape, inspectY_m, props);
  const pyInspect = toPixelY(inspectY_m);

  const currentTauActual = props.I > 1e-12 && statQ.t > 1e-6 ? (V * statQ.Q) / (props.I * statQ.t) : 0;
  const currentTauMPa = currentTauActual / 1e6;
  const maxTau = res.maxShear;

  let sliceHeight: number | undefined = undefined;
  let sliceDirection: 'above' | 'below' | undefined = undefined;
  let showCurve = false;
  let showJunctions = false;
  let showPeak = false;
  let showInteractiveDot = false;
  let filteredPoints = res.points;

  if (currentClick <= 1) {
    // Tab 1: Constants
  } else if (currentClick === 2) {
    // Tab 2, Click 0: NA Q
    showInteractiveDot = true;
    sliceHeight = 0;
    sliceDirection = 'above';
  } else if (currentClick === 3) {
    // Tab 2, Click 1: NA Stress
    showPeak = true;
    showInteractiveDot = true;
    sliceHeight = 0;
    sliceDirection = 'above';
    showCurve = true;
    filteredPoints = res.points.filter(pt => Math.abs(pt.y) < 1e-4);
  } else if (currentClick === 4) {
    // Tab 3, Click 0: Intermediate Q
    showInteractiveDot = true;
    sliceHeight = 75;
    sliceDirection = 'above';
    showCurve = true;
    filteredPoints = res.points.filter(pt => Math.abs(pt.y) < 1e-4);
  } else if (currentClick === 5) {
    // Tab 3, Click 1: Intermediate Stress
    showCurve = true;
    showPeak = true;
    showInteractiveDot = true;
    sliceHeight = 75;
    sliceDirection = 'above';
    filteredPoints = res.points.filter(pt => Math.abs(pt.y) <= 0.075 + 1e-4);
  } else if (currentClick === 6) {
    // Tab 4, Click 0: Boundary Q
    showInteractiveDot = true;
    sliceHeight = 150;
    sliceDirection = 'above';
    showCurve = true;
    filteredPoints = res.points.filter(pt => Math.abs(pt.y) <= 0.075 + 1e-4);
  } else if (currentClick === 7) {
    // Tab 4, Click 1: Boundary Stresses
    showCurve = true;
    showPeak = true;
    showInteractiveDot = true;
    sliceHeight = 150;
    sliceDirection = 'above';
  }

  const xSection = currentClick <= 1 ? 80 : 65;
  const xShear = 180;
  const svgMaxW = currentClick <= 1 ? 'max-w-[170px]' : 'max-w-[270px]';

  return (
    <ExpandableDrawing
      title={`Section Stress at y = ${inspectY} mm`}
      description={`Calculated stress distribution highlighting the slicing boundary at height coordinate y = ${inspectY} mm.`}
      className="max-w-[280px] mx-auto w-full"
    >
      <svg viewBox={`0 0 ${svgW} ${svgH}`} className={`w-full ${svgMaxW} overflow-visible`}>
        <ProfileShapeView
          shape={shape}
          centroid={ybar_m}
          toPixelY={toPixelY}
          inspectY={inspectY}
          currentWidth={statQ.t * 1000}
          xSection={xSection}
          sliceHeight={sliceHeight}
          sliceDirection={sliceDirection}
        />
        {currentClick > 1 && (
          <ShearStressProfileChart
            shape={shape}
            points={filteredPoints}
            maxTau={maxTau}
            toPixelY={toPixelY}
            H={H_m}
            ybar={ybar_m}
            V={V}
            props={props}
            pyInspect={pyInspect}
            currentTau={currentTauMPa}
            xShear={xShear}
            showCurve={showCurve}
            showJunctions={showJunctions}
            showPeak={showPeak}
            showInteractiveDot={showInteractiveDot}
          />
        )}
      </svg>
    </ExpandableDrawing>
  );
};

export const getProblem1SolverItems = (currentClick: number): ClickSyncedTabItem[] => [
  {
    title: '1. Multiplier Constants',
    badge: 'Constant Multiplier',
    badgeVariant: 'primary',
    description: 'Solve the constant terms of the flexural shear equation.',
    tintClass: 'border-l-[3px] border-l-indigo-500 bg-indigo-500/5 dark:bg-indigo-500/[0.08]',
    rightVisualizer: <Problem1Visualizer inspectY={0} step={1} currentClick={currentClick} />,
    rightContent: (
      <div className="text-xs leading-normal text-muted-foreground w-full px-1">
        <SlideParagraph variant="plain" className="text-xs font-bold text-foreground mb-1">
          Section Multiplier Constant:
        </SlideParagraph>
        <span className="space-y-1 block text-muted-foreground">
          • <strong>Isolate Constants</strong>: Compute constant terms to simplify repeated calculations.
          <div className="text-xs text-foreground bg-muted/40 py-1 px-1.5 rounded text-center my-1 font-mono border border-border/20">
            <LatexFormula math="\text{Multiplier} = \frac{V}{I \cdot b} = 2.667 \times 10^{-6}\text{ MPa/mm}^3" />
          </div>
          <ClickReveal at={1}>
            <span>
              • <strong>Simplified Equation</strong>: Shear stress equation reduces to: <LatexFormula math="\tau = (2.667 \times 10^{-6}) \cdot Q" />.
            </span>
          </ClickReveal>
        </span>
      </div>
    ),
    leftBottomContent: (
      <div className="grid grid-cols-2 gap-2 w-full border-t border-border/30 pt-3">
        <CalculationOutput title="Moment of Inertia I" value="225.0" unit="10⁶ mm⁴" variant="compact" />
        <ClickReveal at={1} className="w-full">
          <CalculationOutput title="Multiplier Coeff" value="2.667" unit="x 10⁻⁶" variant="compact" />
        </ClickReveal>
      </div>
    )
  },
  {
    title: '2. Neutral Axis (y = 0)',
    badge: 'Peak Stress',
    badgeVariant: 'success',
    description: 'Solve peak shear stress at the Neutral Axis.',
    tintClass: 'border-l-[3px] border-l-emerald-500 bg-emerald-500/5 dark:bg-emerald-500/[0.08]',
    rightVisualizer: <Problem1Visualizer inspectY={0} step={2} currentClick={currentClick} />,
    rightContent: (
      <div className="text-xs leading-normal text-muted-foreground w-full px-1">
        <SlideParagraph variant="plain" className="text-xs font-bold text-foreground mb-1">
          Neutral Axis Shear Stress:
        </SlideParagraph>
        <span className="space-y-1 block text-muted-foreground">
          • <strong>Statical Moment</strong>: Compute Q of the upper half above the Neutral Axis (y = 0):
          <div className="text-xs text-foreground bg-muted/40 py-1 px-1.5 rounded text-center my-1 font-mono border border-border/20">
            <LatexFormula math="Q = 75 \cdot (100 \cdot 150) = 1.125 \times 10^6\text{ mm}^3" />
          </div>
          <ClickReveal at={3}>
            <span>
              • <strong>Max stress</strong>: Multiply Q by our constant multiplier to find peak stress:
              <div className="text-xs text-foreground bg-muted/40 py-1 px-1.5 rounded text-center my-1 font-mono border border-border/20">
                <LatexFormula math="\tau_{\max} = 3.00\text{ MPa}" />
              </div>
            </span>
          </ClickReveal>
        </span>
      </div>
    ),
    leftBottomContent: (
      <div className="grid grid-cols-2 gap-2 w-full border-t border-border/30 pt-3">
        <CalculationOutput title="Statical Moment Q" value="1,125,000" unit="mm³" variant="compact" />
        <ClickReveal at={3} className="w-full">
          <CalculationOutput title="Peak Stress τ_max" value="3.00" unit="MPa" variant="compact" />
        </ClickReveal>
      </div>
    )
  },
  {
    title: '3. Intermediate (y = ±75 mm)',
    badge: 'Symmetry Check',
    badgeVariant: 'warning',
    description: 'Solve shear stress halfway down from N.A.',
    tintClass: 'border-l-[3px] border-l-amber-500 bg-amber-500/5 dark:bg-amber-500/[0.08]',
    rightVisualizer: <Problem1Visualizer inspectY={75} step={3} currentClick={currentClick} />,
    rightContent: (
      <div className="text-xs leading-normal text-muted-foreground w-full px-1">
        <SlideParagraph variant="plain" className="text-xs font-bold text-foreground mb-1">
          Intermediate Fiber Stress:
        </SlideParagraph>
        <span className="space-y-1 block text-muted-foreground">
          • <strong>Statical Moment</strong>: Calculate Q for the block portion above height y = 75 mm:
          <div className="text-xs text-foreground bg-muted/40 py-1 px-1.5 rounded text-center my-1 font-mono border border-border/20">
            <LatexFormula math="Q = 112.5 \cdot (100 \cdot 75) = 843,750\text{ mm}^3" />
          </div>
          <ClickReveal at={5}>
            <span>
              • <strong>Fiber Stress</strong>: Magnitudes are identical at y = +75 mm and y = -75 mm:
              <div className="text-xs text-foreground bg-muted/40 py-1 px-1.5 rounded text-center my-1 font-mono border border-border/20">
                <LatexFormula math="\tau = 2.25\text{ MPa}" />
              </div>
            </span>
          </ClickReveal>
        </span>
      </div>
    ),
    leftBottomContent: (
      <div className="grid grid-cols-2 gap-2 w-full border-t border-border/30 pt-3">
        <CalculationOutput title="Statical Moment Q" value="843,750" unit="mm³" variant="compact" />
        <ClickReveal at={5} className="w-full">
          <CalculationOutput title="Shear Stress τ" value="2.25" unit="MPa" variant="compact" />
        </ClickReveal>
      </div>
    )
  },
  {
    title: '4. Boundaries (y = ±150 mm)',
    badge: 'Zero Boundary',
    badgeVariant: 'error',
    description: 'Solve shear stress at the outer skins.',
    tintClass: 'border-l-[3px] border-l-rose-500 bg-rose-500/5 dark:bg-rose-500/[0.08]',
    rightVisualizer: <Problem1Visualizer inspectY={150} step={4} currentClick={currentClick} />,
    rightContent: (
      <div className="text-xs leading-normal text-muted-foreground w-full px-1">
        <SlideParagraph variant="plain" className="text-xs font-bold text-foreground mb-1">
          Boundary Surface Stress:
        </SlideParagraph>
        <span className="space-y-1 block text-muted-foreground">
          • <strong>Skin Limits</strong>: Slicing at the boundaries (y = ±150 mm) leaves zero area above/below the cut:
          <div className="text-xs text-foreground bg-muted/40 py-1 px-1.5 rounded text-center my-1 font-mono border border-border/20">
            <LatexFormula math="A' = 0 \implies Q = 0" />
          </div>
          <ClickReveal at={7}>
            <span>
              • <strong>Zero Stress</strong>: The boundary shear stress drops to zero:
              <div className="text-xs text-foreground bg-muted/40 py-1 px-1.5 rounded text-center my-1 font-mono border border-border/20">
                <LatexFormula math="\tau = 0.00\text{ MPa}" />
              </div>
            </span>
          </ClickReveal>
        </span>
      </div>
    ),
    leftBottomContent: (
      <div className="grid grid-cols-2 gap-2 w-full border-t border-border/30 pt-3">
        <CalculationOutput title="Sub-Area A'" value="0" unit="mm²" variant="compact" />
        <ClickReveal at={7} className="w-full">
          <CalculationOutput title="Shear Stress τ" value="0.00" unit="MPa" variant="compact" />
        </ClickReveal>
      </div>
    )
  }
];
