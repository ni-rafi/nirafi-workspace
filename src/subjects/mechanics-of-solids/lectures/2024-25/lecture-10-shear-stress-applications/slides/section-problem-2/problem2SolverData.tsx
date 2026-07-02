import React from 'react';
import { type ClickSyncedTabItem } from '@/features/presentation/components/elements/ClickSyncedTabs';
import { LatexFormula, SlideParagraph, CalculationOutput, ClickReveal } from '@/features/presentation/components/elements';
import { ProfileShapeView } from '@/subjects/mechanics-of-solids/features/stress/components/diagrams/ProfileShapeView';
import { ShearStressProfileChart } from '@/subjects/mechanics-of-solids/features/stress/components/diagrams/ShearStressProfileChart';
import { CrossSectionEngine } from '@/subjects/mechanics-of-solids/cores/stress/cross-section.engine';
import { StressSolverEngine } from '@/subjects/mechanics-of-solids/cores/stress/stress-solver.engine';
import { StaticalMomentEngine } from '@/subjects/mechanics-of-solids/cores/stress/statical-moment.engine';
import { ExpandableDrawing } from '@/shared/components';
import { problem2Config } from '../../problemConfig';

export const Problem2Part1Visualizer: React.FC<{ inspectY: number; step?: number; currentClick?: number }> = ({ inspectY, currentClick = 0 }) => {
  const { shape, V } = problem2Config;
  const props = CrossSectionEngine.calculateProperties(shape);
  const res = StressSolverEngine.solveDistribution(shape, 0, V);

  const H_m = shape.height ?? 0.3;
  const ybar_m = props.centroid;

  // Coordinate conversions matching statement mapping perfectly to avoid dislocation
  const svgW = currentClick <= 1 ? 160 : 240;
  const svgH = 150;
  const paddingY = 20;
  const chartH = svgH - paddingY * 2; // 110
  const toPixelY = (yNA: number) => paddingY + (1 - (yNA + ybar_m) / H_m) * chartH;

  let queryY = inspectY;
  let sliceHeight: number | undefined = undefined;
  let sliceDirection: 'above' | 'below' | undefined = undefined;
  let showCurve = false;
  let showJunctions = false;
  let showPeak = false;
  let showInteractiveDot = false;
  let showCentroidDim = false;
  let filteredPoints = res.points;

  // Part 1 Clicks mapping (0 to 9)
  if (currentClick <= 1) {
    showCentroidDim = currentClick === 1;
  } else if (currentClick === 2) {
    showInteractiveDot = true;
    sliceHeight = 175;
    sliceDirection = 'above';
  } else if (currentClick === 3) {
    showInteractiveDot = true;
    sliceHeight = -125;
    sliceDirection = 'below';
    showCurve = true;
    filteredPoints = [];
  } else if (currentClick === 4) {
    showInteractiveDot = true;
    sliceHeight = 150;
    sliceDirection = 'above';
  } else if (currentClick === 5) {
    showCurve = true;
    showInteractiveDot = true;
    sliceHeight = 150;
    sliceDirection = 'above';
    filteredPoints = res.points.filter(pt => pt.y >= 0.150 - 1e-4);
  } else if (currentClick === 6) {
    showInteractiveDot = true;
    sliceHeight = 125;
    sliceDirection = 'above';
    showCurve = true;
    filteredPoints = res.points.filter(pt => pt.y >= 0.150 - 1e-4);
  } else if (currentClick === 7) {
    showCurve = true;
    showJunctions = true;
    showInteractiveDot = true;
    sliceHeight = 125;
    sliceDirection = 'above';
    filteredPoints = res.points.filter(pt => pt.y > 0.125 + 1e-4 || (Math.abs(pt.y - 0.125) < 1e-4 && pt.tau / 1e6 < 1.0));
    queryY = 125;
  } else if (currentClick === 8) {
    showCurve = true;
    showJunctions = true;
    showInteractiveDot = true;
    sliceHeight = 125;
    sliceDirection = 'above';
    filteredPoints = res.points.filter(pt => pt.y > 0.125 + 1e-4 || (Math.abs(pt.y - 0.125) < 1e-4 && pt.tau / 1e6 < 1.0));
  } else if (currentClick === 9) {
    showCurve = true;
    showJunctions = true;
    showInteractiveDot = true;
    sliceHeight = 125;
    sliceDirection = 'above';
    filteredPoints = res.points.filter(pt => pt.y >= 0.125 - 1e-4);
    queryY = 124.9;
  }

  const inspectY_m = queryY / 1000;
  const statQ = StaticalMomentEngine.calculateQAndWidth(shape, inspectY_m, props);
  const pyInspect = toPixelY(inspectY_m);

  const currentTauActual = props.I > 1e-12 && statQ.t > 1e-6 ? (V * statQ.Q) / (props.I * statQ.t) : 0;
  const currentTauMPa = currentTauActual / 1e6;
  const maxTau = res.maxShear;

  const xSection = currentClick <= 1 ? 85 : 65;
  const xShear = 180;
  const svgMaxW = currentClick <= 1 ? 'max-w-[170px]' : 'max-w-[270px]';

  return (
    <ExpandableDrawing
      title={`Section Stress at y = ${queryY.toFixed(0)} mm`}
      description={`Calculated stress distribution highlighting the slicing boundary at height coordinate y = ${queryY.toFixed(0)} mm.`}
      className="max-w-[280px] mx-auto w-full"
    >
      <svg viewBox={`0 0 ${svgW} ${svgH}`} className={`w-full ${svgMaxW} overflow-visible`}>
        <ProfileShapeView
          shape={shape}
          centroid={ybar_m}
          toPixelY={toPixelY}
          inspectY={queryY}
          currentWidth={statQ.t * 1000}
          xSection={xSection}
          sliceHeight={sliceHeight}
          sliceDirection={sliceDirection}
          showCentroidDim={showCentroidDim}
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

export const Problem2Part2Visualizer: React.FC<{ inspectY: number; step?: number; currentClick?: number }> = ({ inspectY, currentClick = 0 }) => {
  const { shape, V } = problem2Config;
  const props = CrossSectionEngine.calculateProperties(shape);
  const res = StressSolverEngine.solveDistribution(shape, 0, V);

  const H_m = shape.height ?? 0.3;
  const ybar_m = props.centroid;

  const svgH = 150;
  const paddingY = 20;
  const chartH = svgH - paddingY * 2; // 110
  const toPixelY = (yNA: number) => paddingY + (1 - (yNA + ybar_m) / H_m) * chartH;

  let queryY = inspectY;
  let sliceHeight: number | undefined = undefined;
  let sliceDirection: 'above' | 'below' | undefined = undefined;
  let showCurve = true;
  let showJunctions = true;
  let showPeak = false;
  let showInteractiveDot = false;
  let filteredPoints = res.points;

  // Part 2 Clicks mapping (0 to 5)
  if (currentClick === 0) {
    showInteractiveDot = true;
    sliceHeight = -75;
    sliceDirection = 'below';
    filteredPoints = res.points.filter(pt => pt.y >= 0.125 - 1e-4);
  } else if (currentClick === 1) {
    showInteractiveDot = true;
    sliceHeight = -75;
    sliceDirection = 'below';
    filteredPoints = res.points.filter(pt => pt.y >= 0.125 - 1e-4 || pt.y < -0.075 - 1e-4 || (Math.abs(pt.y - -0.075) < 1e-4 && pt.tau / 1e6 < 1.0));
    queryY = -75;
  } else if (currentClick === 2) {
    showInteractiveDot = true;
    sliceHeight = -75;
    sliceDirection = 'below';
    filteredPoints = res.points.filter(pt => pt.y >= 0.125 - 1e-4 || pt.y < -0.075 - 1e-4 || (Math.abs(pt.y - -0.075) < 1e-4 && pt.tau / 1e6 < 1.0));
  } else if (currentClick === 3) {
    showInteractiveDot = true;
    sliceHeight = -75;
    sliceDirection = 'below';
    filteredPoints = res.points.filter(pt => pt.y >= 0.125 - 1e-4 || pt.y <= -0.075 + 1e-4);
    queryY = -74.9;
  } else if (currentClick === 4) {
    showInteractiveDot = true;
    sliceHeight = 0;
    sliceDirection = 'above';
    filteredPoints = res.points.filter(pt => pt.y >= 0.125 - 1e-4 || pt.y <= -0.075 + 1e-4);
  } else if (currentClick >= 5) {
    showPeak = true;
    showInteractiveDot = true;
    sliceHeight = 0;
    sliceDirection = 'above';
    queryY = 0;
  }

  const inspectY_m = queryY / 1000;
  const statQ = StaticalMomentEngine.calculateQAndWidth(shape, inspectY_m, props);
  const pyInspect = toPixelY(inspectY_m);

  const currentTauActual = props.I > 1e-12 && statQ.t > 1e-6 ? (V * statQ.Q) / (props.I * statQ.t) : 0;
  const currentTauMPa = currentTauActual / 1e6;
  const maxTau = res.maxShear;

  const xSection = 65;
  const xShear = 180;

  return (
    <ExpandableDrawing
      title={`Section Stress at y = ${queryY.toFixed(0)} mm`}
      description={`Calculated stress distribution highlighting the slicing boundary at height coordinate y = ${queryY.toFixed(0)} mm.`}
      className="max-w-[280px] mx-auto w-full"
    >
      <svg viewBox="0 0 240 150" className="w-full max-w-[270px] overflow-visible">
        <ProfileShapeView
          shape={shape}
          centroid={ybar_m}
          toPixelY={toPixelY}
          inspectY={queryY}
          currentWidth={statQ.t * 1000}
          xSection={xSection}
          sliceHeight={sliceHeight}
          sliceDirection={sliceDirection}
        />
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
      </svg>
    </ExpandableDrawing>
  );
};

export const getProblem2Part1Items = (currentClick: number): ClickSyncedTabItem[] => [
  {
    title: '1. Centroid & Inertia',
    badge: 'Section Properties',
    badgeVariant: 'primary',
    description: 'Solve the centroid height and Moment of Inertia of the asymmetric shape.',
    tintClass: 'border-l-[3px] border-l-indigo-500 bg-indigo-500/5 dark:bg-indigo-500/[0.08]',
    rightVisualizer: <Problem2Part1Visualizer inspectY={0} step={1} currentClick={currentClick} />,
    rightContent: (
      <div className="text-xs leading-normal text-muted-foreground w-full px-1">
        <SlideParagraph variant="plain" className="text-xs font-bold text-foreground mb-1">
          Asymmetric Section Properties:
        </SlideParagraph>
        <span className="space-y-1 block text-muted-foreground">
          • <strong>Centroid location</strong>: Center of gravity height measured from bottom:
          <div className="text-xs text-foreground bg-muted/40 py-1 px-1.5 rounded text-center my-1 font-mono border border-border/20">
            <LatexFormula math="\bar{y} = \frac{\sum A_i \bar{y}_i}{\sum A_i} = 125.0\text{ mm}" />
          </div>
          <ClickReveal at={1}>
            <span>
              • <strong>Moment of Inertia</strong>: Parallel-axis theorem calculation yields:
              <div className="text-xs text-foreground bg-muted/40 py-1 px-1.5 rounded text-center my-1 font-mono border border-border/20">
                <LatexFormula math="I = 86.46 \times 10^6\text{ mm}^4" />
              </div>
            </span>
          </ClickReveal>
        </span>
      </div>
    ),
    leftBottomContent: (
      <div className="grid grid-cols-2 gap-2.5 w-full border-t border-border/30 pt-3">
        <CalculationOutput title="Centroid y_bar" value="125.0" unit="mm from bot" variant="compact" />
        <ClickReveal at={1} className="w-full">
          <CalculationOutput title="Inertia I_xx" value="86.46" unit="10⁶ mm⁴" variant="compact" />
        </ClickReveal>
      </div>
    )
  },
  {
    title: '2. Outer Skins',
    badge: 'Zero Boundaries',
    badgeVariant: 'info',
    description: 'Solve shear stress at the extreme upper and lower boundaries.',
    tintClass: 'border-l-[3px] border-l-slate-500 bg-slate-500/5 dark:bg-slate-500/[0.08]',
    rightVisualizer: <Problem2Part1Visualizer inspectY={175} step={2} currentClick={currentClick} />,
    rightContent: (
      <div className="text-xs leading-normal text-muted-foreground w-full px-1">
        <SlideParagraph variant="plain" className="text-xs font-bold text-foreground mb-1">
          Extreme Fiber Boundaries:
        </SlideParagraph>
        <span className="space-y-1 block text-muted-foreground">
          • <strong>Top Skin (<LatexFormula math="y = +175\text{ mm}" />)</strong>: Slicing boundary at the absolute top of the flange:
          <div className="text-xs text-foreground bg-muted/40 py-1 px-1.5 rounded text-center my-1 font-mono border border-border/20">
            <LatexFormula math="A' = 0 \implies Q = 0 \implies \tau_{\text{top}} = 0.00\text{ MPa}" />
          </div>
          <ClickReveal at={3}>
            <span>
              • <strong>Bottom Skin (<LatexFormula math="y = -125\text{ mm}" />)</strong>: Bottom of the wide lower flange:
              <div className="text-xs text-foreground bg-muted/40 py-1 px-1.5 rounded text-center my-1 font-mono border border-border/20">
                <LatexFormula math="\tau_{\text{bottom}} = 0.00\text{ MPa}" />
              </div>
            </span>
          </ClickReveal>
        </span>
      </div>
    ),
    leftBottomContent: (
      <div className="grid grid-cols-2 gap-2.5 w-full border-t border-border/30 pt-3">
        <CalculationOutput title="Top Stress τ" value="0.00" unit="MPa" variant="compact" />
        <ClickReveal at={3} className="w-full">
          <CalculationOutput title="Bottom Stress τ" value="0.00" unit="MPa" variant="compact" />
        </ClickReveal>
      </div>
    )
  },
  {
    title: '3. Upper Flange (y = 150)',
    badge: 'Flange Fiber',
    badgeVariant: 'warning',
    description: 'Solve stress at an intermediate fiber inside the top flange.',
    tintClass: 'border-l-[3px] border-l-amber-500 bg-amber-500/5 dark:bg-amber-500/[0.08]',
    rightVisualizer: <Problem2Part1Visualizer inspectY={150} step={3} currentClick={currentClick} />,
    rightContent: (
      <div className="text-xs leading-normal text-muted-foreground w-full px-1">
        <SlideParagraph variant="plain" className="text-xs font-bold text-foreground mb-1">
          Top Flange Stress:
        </SlideParagraph>
        <span className="space-y-1 block text-muted-foreground">
          • <strong>Statical Moment</strong>: <LatexFormula math="Q" /> for the top portion (width <LatexFormula math="100\text{ mm}" />, thickness <LatexFormula math="25\text{ mm}" />):
          <div className="text-xs text-foreground bg-muted/40 py-1 px-1.5 rounded text-center my-1 font-mono border border-border/20">
            <LatexFormula math="Q = (100 \cdot 25) \cdot 137.5 = 343,750\text{ mm}^3" />
          </div>
          <ClickReveal at={5}>
            <span>
              • <strong>Shear stress</strong>: Multiplied at flange width <LatexFormula math="b = 100\text{ mm}" />:
              <div className="text-xs text-foreground bg-muted/40 py-1 px-1.5 rounded text-center my-1 font-mono border border-border/20">
                <LatexFormula math="\tau = \frac{V \cdot Q}{I \cdot b} = 0.398\text{ MPa}" />
              </div>
            </span>
          </ClickReveal>
        </span>
      </div>
    ),
    leftBottomContent: (
      <div className="grid grid-cols-2 gap-2.5 w-full border-t border-border/30 pt-3">
        <CalculationOutput title="Statical Moment Q" value="343,750" unit="mm³" variant="compact" />
        <ClickReveal at={5} className="w-full">
          <CalculationOutput title="Flange Stress τ" value="0.398" unit="MPa" variant="compact" />
        </ClickReveal>
      </div>
    )
  },
  {
    title: '4. Top Junction (Flange Side)',
    badge: 'Flange Side',
    badgeVariant: 'error',
    description: 'Solve shear stress just inside the flange at Point B.',
    tintClass: 'border-l-[3px] border-l-rose-500 bg-rose-500/5 dark:bg-rose-500/[0.08]',
    rightVisualizer: <Problem2Part1Visualizer inspectY={125} step={4} currentClick={currentClick} />,
    rightContent: (
      <div className="text-xs leading-normal text-muted-foreground w-full px-1">
        <SlideParagraph variant="plain" className="text-xs font-bold text-foreground mb-1">
          Top Junction Flange-Side (<LatexFormula math="y = +125\text{ mm}" />):
        </SlideParagraph>
        <span className="space-y-1 block text-muted-foreground">
          • <strong>Junction <LatexFormula math="Q_j" /></strong>: Statical moment of top flange (<LatexFormula math="100 \times 50\text{ mm}" />):
          <div className="text-xs text-foreground bg-muted/40 py-1 px-1.5 rounded text-center my-1 font-mono border border-border/20">
            <LatexFormula math="Q_j = (100 \cdot 50) \cdot 150 = 750,000\text{ mm}^3" />
          </div>
          <ClickReveal at={7}>
            <div className="mt-1">
              • <strong>Flange Side (<LatexFormula math="b_{\text{flange}} = 100\text{ mm}" />)</strong>: Stress inside wide flange:
              <div className="text-xs text-foreground bg-muted/40 py-1 px-1.5 rounded text-center my-1 font-mono border border-border/20">
                <LatexFormula math="\tau_{\text{flange}} = \frac{V \cdot Q_j}{I \cdot b_{\text{flange}}} = 0.868\text{ MPa}" />
              </div>
            </div>
          </ClickReveal>
        </span>
      </div>
    ),
    leftBottomContent: (
      <div className="grid grid-cols-2 gap-2.5 w-full border-t border-border/30 pt-3">
        <CalculationOutput title="Flange Width b" value="100.0" unit="mm" variant="compact" />
        <ClickReveal at={7} className="w-full">
          <CalculationOutput title="Stress τ_flange" value="0.868" unit="MPa" variant="compact" />
        </ClickReveal>
      </div>
    )
  },
  {
    title: '5. Top Junction (Web Side)',
    badge: 'Web Side',
    badgeVariant: 'error',
    description: 'Solve shear stress just inside the web at Point B.',
    tintClass: 'border-l-[3px] border-l-rose-500 bg-rose-500/5 dark:bg-rose-500/[0.08]',
    rightVisualizer: <Problem2Part1Visualizer inspectY={125} step={5} currentClick={currentClick} />,
    rightContent: (
      <div className="text-xs leading-normal text-muted-foreground w-full px-1">
        <SlideParagraph variant="plain" className="text-xs font-bold text-foreground mb-1">
          Top Junction Web-Side (<LatexFormula math="y = +125\text{ mm}" />):
        </SlideParagraph>
        <span className="space-y-1 block text-muted-foreground">
          • <strong>Constant <LatexFormula math="Q_j" /></strong>: Sliced area above is identical:
          <div className="text-xs text-foreground bg-muted/40 py-1 px-1.5 rounded text-center my-1 font-mono border border-border/20">
            <LatexFormula math="Q_j = 750,000\text{ mm}^3" />
          </div>

          <ClickReveal at={9}>
            <div className="mt-1">
              • <strong>Web Side (<LatexFormula math="b_{\text{web}} = 50\text{ mm}" />)</strong>: Stress jumps as width narrows:
              <div className="text-xs text-foreground bg-muted/40 py-1 px-1.5 rounded text-center my-1 font-mono border border-border/20">
                <LatexFormula math="\tau_{\text{web}} = \tau_{\text{flange}} \cdot \frac{b_{\text{flange}}}{b_{\text{web}}} = 1.735\text{ MPa}" />
              </div>
            </div>
          </ClickReveal>
        </span>
      </div>
    ),
    leftBottomContent: (
      <div className="grid grid-cols-2 gap-2.5 w-full border-t border-border/30 pt-3">
        <CalculationOutput title="Web Width b" value="50.0" unit="mm" variant="compact" />
        <ClickReveal at={9} className="w-full">
          <CalculationOutput title="Stress τ_web" value="1.735" unit="MPa" variant="compact" />
        </ClickReveal>
      </div>
    )
  }
];

export const getProblem2Part2Items = (currentClick: number): ClickSyncedTabItem[] => [
  {
    title: '1. Bottom Junction (Flange Side)',
    badge: 'Flange Side',
    badgeVariant: 'info',
    description: 'Solve lower stress just inside the flange at Point D.',
    tintClass: 'border-l-[3px] border-l-cyan-500 bg-cyan-500/5 dark:bg-cyan-500/[0.08]',
    rightVisualizer: <Problem2Part2Visualizer inspectY={-75} step={1} currentClick={currentClick} />,
    rightContent: (
      <div className="text-xs leading-normal text-muted-foreground w-full px-1">
        <SlideParagraph variant="plain" className="text-xs font-bold text-foreground mb-1.5">
          Bottom Junction Flange-Side (<LatexFormula math="y = -75\text{ mm}" />):
        </SlideParagraph>
        <span className="space-y-1 block text-muted-foreground">
          • <strong>Junction <LatexFormula math="Q_j" /></strong>: Statical moment of bottom flange (<LatexFormula math="200 \times 50\text{ mm}" />):
          <div className="text-xs text-foreground bg-muted/40 py-1 px-1.5 rounded text-center my-1 font-mono border border-border/20">
            <LatexFormula math="Q_j = (200 \cdot 50) \cdot 100 = 1,000,000\text{ mm}^3" />
          </div>

          <ClickReveal at={1}>
            <div className="mt-1">
              • <strong>Flange Side (<LatexFormula math="b_{\text{flange}} = 200\text{ mm}" />)</strong>: Lower stress inside wide lower flange:
              <div className="text-xs text-foreground bg-muted/40 py-1 px-1.5 rounded text-center my-1 font-mono border border-border/20">
                <LatexFormula math="\tau_{\text{flange}} = \frac{V \cdot Q_j}{I \cdot b_{\text{flange}}} = 0.578\text{ MPa}" />
              </div>
            </div>
          </ClickReveal>
        </span>
      </div>
    ),
    leftBottomContent: (
      <div className="grid grid-cols-2 gap-2.5 w-full border-t border-border/30 pt-3">
        <CalculationOutput title="Flange Width b" value="200.0" unit="mm" variant="compact" />
        <ClickReveal at={1} className="w-full">
          <CalculationOutput title="Stress τ_flange" value="0.578" unit="MPa" variant="compact" />
        </ClickReveal>
      </div>
    )
  },
  {
    title: '2. Bottom Junction (Web Side)',
    badge: 'Web Side',
    badgeVariant: 'info',
    description: 'Solve lower stress just inside the web at Point D.',
    tintClass: 'border-l-[3px] border-l-cyan-500 bg-cyan-500/5 dark:bg-cyan-500/[0.08]',
    rightVisualizer: <Problem2Part2Visualizer inspectY={-75} step={2} currentClick={currentClick} />,
    rightContent: (
      <div className="text-xs leading-normal text-muted-foreground w-full px-1">
        <SlideParagraph variant="plain" className="text-xs font-bold text-foreground mb-1.5">
          Bottom Junction Web-Side (<LatexFormula math="y = -75\text{ mm}" />):
        </SlideParagraph>
        <span className="space-y-1 block text-muted-foreground">
          • <strong>Constant <LatexFormula math="Q_j" /></strong>: Sliced area below is identical:
          <div className="text-xs text-foreground bg-muted/40 py-1 px-1.5 rounded text-center my-1 font-mono border border-border/20">
            <LatexFormula math="Q_j = 1,000,000\text{ mm}^3" />
          </div>

          <ClickReveal at={3}>
            <div className="mt-1">
              • <strong>Web Side (<LatexFormula math="b_{\text{web}} = 50\text{ mm}" />)</strong>: Stress jumps inside narrow web:
              <div className="text-xs text-foreground bg-muted/40 py-1 px-1.5 rounded text-center my-1 font-mono border border-border/20">
                <LatexFormula math="\tau_{\text{web}} = \tau_{\text{flange}} \cdot \frac{b_{\text{flange}}}{b_{\text{web}}} = 2.313\text{ MPa}" />
              </div>
            </div>
          </ClickReveal>
        </span>
      </div>
    ),
    leftBottomContent: (
      <div className="grid grid-cols-2 gap-2.5 w-full border-t border-border/30 pt-3">
        <CalculationOutput title="Web Width b" value="50.0" unit="mm" variant="compact" />
        <ClickReveal at={3} className="w-full">
          <CalculationOutput title="Stress τ_web" value="2.313" unit="MPa" variant="compact" />
        </ClickReveal>
      </div>
    )
  },
  {
    title: '3. Neutral Axis (y = 0)',
    badge: 'Peak Stress',
    badgeVariant: 'success',
    description: 'Solve the maximum shear stress along the centroidal Neutral Axis.',
    tintClass: 'border-l-[3px] border-l-emerald-500 bg-emerald-500/5 dark:bg-emerald-500/[0.08]',
    rightVisualizer: <Problem2Part2Visualizer inspectY={0} step={3} currentClick={currentClick} />,
    rightContent: (
      <div className="text-xs leading-normal text-muted-foreground w-full px-1">
        <SlideParagraph variant="plain" className="text-xs font-bold text-foreground mb-1.5">
          Neutral Axis Maximum Stress:
        </SlideParagraph>
        <span className="space-y-2 block text-muted-foreground">
          • <strong>Maximum <LatexFormula math="Q" /></strong>: Sum of top flange moment and web segment above N.A.:
          <div className="text-xs text-foreground bg-muted/40 py-1 px-1.5 rounded text-center my-1 font-mono border border-border/20">
            <LatexFormula math="Q_{\max} = 750,000 + (50 \cdot 125) \cdot 62.5 = 1,140,625\text{ mm}^3" />
          </div>
          <ClickReveal at={5}>
            <span>
              • <strong>Peak Stress Value</strong>: Calculated inside the web width <LatexFormula math="b = 50\text{ mm}" />:
              <div className="text-xs text-foreground bg-muted/40 py-1 px-1.5 rounded text-center my-1 font-mono border border-border/20">
                <LatexFormula math="\tau_{\max} = \frac{V \cdot Q_{\max}}{I \cdot b} = 2.639\text{ MPa}" />
              </div>
            </span>
          </ClickReveal>
        </span>
      </div>
    ),
    leftBottomContent: (
      <div className="grid grid-cols-2 gap-2.5 w-full border-t border-border/30 pt-3">
        <CalculationOutput title="Max Moment Q_max" value="1,140,625" unit="mm³" variant="compact" />
        <ClickReveal at={5} className="w-full">
          <CalculationOutput title="Peak Stress τ_max" value="2.639" unit="MPa" variant="compact" />
        </ClickReveal>
      </div>
    )
  }
];
