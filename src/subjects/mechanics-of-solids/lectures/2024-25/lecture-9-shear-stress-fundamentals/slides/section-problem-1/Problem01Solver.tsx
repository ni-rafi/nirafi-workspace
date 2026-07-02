import React from 'react';
import { ClickSyncedTabs, type ClickSyncedTabItem } from '@/features/presentation/components/elements/ClickSyncedTabs';
import { LatexFormula, SlideParagraph, CalculationOutput, ClickHighlight } from '@/features/presentation/components/elements';
import { ExpandableDrawing } from '@/shared/components';
import { ProfileShapeView } from '@/subjects/mechanics-of-solids/features/stress/components/diagrams/ProfileShapeView';
import { ShearStressProfileChart } from '@/subjects/mechanics-of-solids/features/stress/components/diagrams/ShearStressProfileChart';
import { CrossSectionEngine } from '@/subjects/mechanics-of-solids/cores/stress/cross-section.engine';
import { StressSolverEngine } from '@/subjects/mechanics-of-solids/cores/stress/stress-solver.engine';
import { StaticalMomentEngine } from '@/subjects/mechanics-of-solids/cores/stress/statical-moment.engine';
import { problem1Config } from '../../problemConfig';

const ProblemVisualizer: React.FC<{ inspectY: number }> = ({ inspectY }) => {
  const { shape, V } = problem1Config;
  const props = CrossSectionEngine.calculateProperties(shape);
  const res = StressSolverEngine.solveDistribution(shape, 0, V);

  const H_m = shape.height ?? 0.3;
  const ybar_m = props.centroid;

  // Coordinate conversions
  const svgW = 200;
  const svgH = 150;
  const scale = svgH / (H_m * 1.5);
  const cy = svgH / 2;
  const toPixelY = (y: number) => cy - y * scale;

  const inspectY_m = inspectY / 1000;
  const statQ = StaticalMomentEngine.calculateQAndWidth(shape, inspectY_m, props);
  const pyInspect = toPixelY(inspectY_m);

  const currentTauActual = props.I > 1e-12 && statQ.t > 1e-6 ? (V * statQ.Q) / (props.I * statQ.t) : 0;
  const currentTauMPa = currentTauActual / 1e6;
  const maxTau = res.maxShear;

  return (
    <ExpandableDrawing
      title={`Section Stress at y = ${inspectY} mm`}
      description={`Calculated stress distribution highlighting the slicing boundary at height coordinate y = ${inspectY} mm.`}
      className="max-w-[280px] mx-auto w-full"
    >
      <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full max-w-[250px] overflow-visible">
        <ProfileShapeView
          shape={shape}
          centroid={ybar_m}
          toPixelY={toPixelY}
          inspectY={inspectY}
          currentWidth={statQ.t * 1000}
        />
        <ShearStressProfileChart
          shape={shape}
          points={res.points}
          maxTau={maxTau}
          toPixelY={toPixelY}
          H={H_m}
          ybar={ybar_m}
          V={V}
          props={props}
          pyInspect={pyInspect}
          currentTau={currentTauMPa}
        />
      </svg>
    </ExpandableDrawing>
  );
};

export const Problem01Solver: React.FC = () => {
  const items: ClickSyncedTabItem[] = [
    {
      title: '1. Multiplier Constants',
      badge: 'Constant Multiplier',
      badgeVariant: 'primary',
      description: 'Solve the constant terms of the flexural shear equation.',
      tintClass: 'border-l-[3px] border-l-indigo-500 bg-indigo-500/5 dark:bg-indigo-500/[0.08]',
      rightContent: (
        <div className="flex flex-col items-center justify-start gap-2 w-full text-left">
          <ProblemVisualizer inspectY={0} />
          <div className="text-[11px] leading-relaxed text-muted-foreground w-full px-1">
            <SlideParagraph variant="plain" className="text-[11px] font-bold text-foreground mb-1">
              Section Multiplier Constant:
            </SlideParagraph>
            <span className="space-y-1 block text-muted-foreground">
              • <strong>Isolate Constants</strong>: Compute constant terms (<LatexFormula math="V / I \cdot b" />) to simplify repeated calculations.
              <br />
              • <strong>Evaluation</strong>:
              <span className="block font-mono text-[10px] text-foreground bg-muted/40 p-1.5 rounded text-center my-1">
                Constant = <LatexFormula math="\frac{60 \times 10^3\text{ N}}{225 \times 10^6\text{ mm}^4 \cdot 100\text{ mm}} = 2.667 \times 10^{-6}\text{ MPa/mm}^3" />
              </span>
              • <strong>Simplified Equation</strong>: <ClickHighlight variant="paint" at={1} className="inline-block font-extrabold text-indigo-500">Shear stress becomes <LatexFormula math="\tau = (2.667 \times 10^{-6}) \cdot Q" /></ClickHighlight>.
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 w-full max-w-[280px] mt-1">
            <CalculationOutput title="Moment of Inertia I" value="225.0" unit="10⁶ mm⁴" />
            <CalculationOutput title="Multiplier Coeff" value="2.667" unit="x 10⁻⁶" />
          </div>
        </div>
      )
    },
    {
      title: '2. Neutral Axis (y = 0)',
      badge: 'Peak Stress',
      badgeVariant: 'success',
      description: 'Solve peak shear stress at the Neutral Axis.',
      tintClass: 'border-l-[3px] border-l-emerald-500 bg-emerald-500/5 dark:bg-emerald-500/[0.08]',
      rightContent: (
        <div className="flex flex-col items-center justify-start gap-2 w-full text-left">
          <ProblemVisualizer inspectY={0} />
          <div className="text-[11px] leading-relaxed text-muted-foreground w-full px-1">
            <SlideParagraph variant="plain" className="text-[11px] font-bold text-foreground mb-1">
              Neutral Axis Shear Stress:
            </SlideParagraph>
            <span className="space-y-1 block text-muted-foreground">
              • <strong>Statical Moment</strong>: Compute Q of the upper half above the Neutral Axis (<LatexFormula math="y = 0" />):
              <span className="block font-mono text-[10px] text-foreground bg-muted/40 p-1.5 rounded text-center my-1">
                Q = <LatexFormula math="75\text{ mm} \cdot (100 \cdot 150)\text{ mm}^2 = 1.125 \times 10^6\text{ mm}^3" />
              </span>
              • <strong>Max stress</strong>: Multiply Q by our constant multiplier to find peak stress: <ClickHighlight variant="paint" at={3} className="inline-block font-extrabold text-emerald-500"><LatexFormula math="\tau_{\max} = 3.00\text{ MPa}" /></ClickHighlight>.
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 w-full max-w-[280px] mt-1">
            <CalculationOutput title="Statical Moment Q" value="1,125,000" unit="mm³" />
            <CalculationOutput title="Peak Stress τ_max" value="3.00" unit="MPa" />
          </div>
        </div>
      )
    },
    {
      title: '3. Intermediate (y = ±75 mm)',
      badge: 'Symmetry Check',
      badgeVariant: 'warning',
      description: 'Solve shear stress halfway down from N.A.',
      tintClass: 'border-l-[3px] border-l-amber-500 bg-amber-500/5 dark:bg-amber-500/[0.08]',
      rightContent: (
        <div className="flex flex-col items-center justify-start gap-2 w-full text-left">
          <ProblemVisualizer inspectY={75} />
          <div className="text-[11px] leading-relaxed text-muted-foreground w-full px-1">
            <SlideParagraph variant="plain" className="text-[11px] font-bold text-foreground mb-1">
              Intermediate Fiber Stress:
            </SlideParagraph>
            <span className="space-y-1 block text-muted-foreground">
              • <strong>Statical Moment</strong>: Calculate Q for the block portion above height <LatexFormula math="y = 75\text{ mm}" />:
              <span className="block font-mono text-[10px] text-foreground bg-muted/40 p-1.5 rounded text-center my-1">
                Q = <LatexFormula math="112.5\text{ mm} \cdot (100 \cdot 75)\text{ mm}^2 = 843,750\text{ mm}^3" />
              </span>
              • <strong>Fiber Stress</strong>: Magnitudes are identical at <LatexFormula math="y = +75\text{ mm}" /> and <LatexFormula math="y = -75\text{ mm}" /> by symmetry: <ClickHighlight variant="paint" at={5} className="inline-block font-extrabold text-amber-500"><LatexFormula math="\tau = 2.25\text{ MPa}" /></ClickHighlight>.
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 w-full max-w-[280px] mt-1">
            <CalculationOutput title="Statical Moment Q" value="843,750" unit="mm³" />
            <CalculationOutput title="Shear Stress τ" value="2.25" unit="MPa" />
          </div>
        </div>
      )
    },
    {
      title: '4. Boundaries (y = ±150 mm)',
      badge: 'Zero Boundary',
      badgeVariant: 'error',
      description: 'Solve shear stress at the outer skins.',
      tintClass: 'border-l-[3px] border-l-rose-500 bg-rose-500/5 dark:bg-rose-500/[0.08]',
      rightContent: (
        <div className="flex flex-col items-center justify-start gap-2 w-full text-left">
          <ProblemVisualizer inspectY={150} />
          <div className="text-[11px] leading-relaxed text-muted-foreground w-full px-1">
            <SlideParagraph variant="plain" className="text-[11px] font-bold text-foreground mb-1">
              Boundary Surface Stress:
            </SlideParagraph>
            <span className="space-y-1 block text-muted-foreground">
              • <strong>Skin Limits</strong>: At the absolute top and bottom edges (<LatexFormula math="y = \pm 150\text{ mm}" />).
              <br />
              • <strong>Zero parameters</strong>: Slicing at the boundaries leaves zero area above/below the cut: <LatexFormula math="A' = 0 \implies Q = 0" />.
              <br />
              • <strong>Zero Stress</strong>: The boundary shear stress drops to zero: <ClickHighlight variant="paint" at={7} className="inline-block font-extrabold text-red-500"><LatexFormula math="\tau = 0.00\text{ MPa}" /></ClickHighlight>.
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 w-full max-w-[280px] mt-1">
            <CalculationOutput title="Sub-Area A'" value="0" unit="mm²" />
            <CalculationOutput title="Shear Stress τ" value="0.00" unit="MPa" />
          </div>
        </div>
      )
    }
  ];

  return (
    <ClickSyncedTabs
      title="Step-by-Step Stress Calculation Solver"
      items={items}
      leftTitle="Solving Shear Stresses at Specific Depths"
      rightTitle="Solver Output & Slice Visualizer"
      leftWidth="48%"
      clickToTabMap={[0, 0, 1, 1, 2, 2, 3, 3]}
    />
  );
};

export default Problem01Solver;
