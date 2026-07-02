import React from 'react';
import { ClickSyncedTabs, type ClickSyncedTabItem } from '@/features/presentation/components/elements/ClickSyncedTabs';
import { LatexFormula, SlideParagraph, ClickHighlight } from '@/features/presentation/components/elements';
import { RectangularShearPlotting } from './drawings/RectangularShearPlotting';

export const RectangularShearDistribution: React.FC = () => {
  const items: ClickSyncedTabItem[] = [
    {
      title: '1. Coordinate Frame',
      badge: 'Section Geometry',
      badgeVariant: 'primary',
      description: 'Analyze a rectangular section with depth y measured from N.A.',
      rightContent: (
        <div className="flex flex-col items-center justify-start gap-2 w-full text-left">
          <RectangularShearPlotting plotStep={1} />
          <div className="text-[11px] leading-relaxed text-muted-foreground w-full px-1">
            <SlideParagraph variant="plain" className="text-[11px] font-bold text-foreground mb-1">
              Coordinate Frame Setup:
            </SlideParagraph>
            <span className="space-y-1 block text-muted-foreground">
              • <strong>Section Bounds</strong>: Width <LatexFormula math="b" /> and height <LatexFormula math="h" /> are defined.
              <br />
              • <strong>Neutral Axis (N.A.)</strong>: Placed at the centroidal height (<LatexFormula math="y = 0" />).
              <br />
              • <strong>Isolated Area</strong>: Slicing at fiber height <LatexFormula math="y" /> isolates sub-area <LatexFormula math="A'" /> extending to the top skin (<LatexFormula math="h/2" />).
            </span>
          </div>
        </div>
      )
    },
    {
      title: '2. Section Parameters',
      badge: 'I & Q Formulas',
      badgeVariant: 'warning',
      description: 'Formulate Moment of Inertia (I) and Statical Moment (Q).',
      rightContent: (
        <div className="flex flex-col items-center justify-start gap-2 w-full text-left">
          <RectangularShearPlotting plotStep={1} />
          <div className="text-[11px] leading-relaxed text-muted-foreground w-full px-1">
            <SlideParagraph variant="plain" className="text-[11px] font-bold text-foreground mb-1">
              Section Properties:
            </SlideParagraph>
            <span className="space-y-1 block text-muted-foreground">
              • <strong>Moment of Inertia</strong>: Defined for the entire section as <LatexFormula math="I = \frac{b \cdot h^3}{12}" />.
              <br />
              • <strong>Statical Moment</strong>: Calculated as <ClickHighlight variant="paint" at={2} className="inline-block font-bold"><LatexFormula math="Q = \bar{y}' \cdot A'" /></ClickHighlight>.
              <br />
              • <strong>Sub-Area Properties</strong>: Area <LatexFormula math="A' = b\left(\frac{h}{2} - y\right)" /> and centroidal arm <LatexFormula math="\bar{y}' = \frac{1}{2}\left(\frac{h}{2} + y\right)" />.
            </span>
          </div>
        </div>
      )
    },
    {
      title: '3. Average Shear Baseline',
      badge: 'Approximation',
      badgeVariant: 'error',
      description: 'Uniform average shear stress ignores stress variations.',
      rightContent: (
        <div className="flex flex-col items-center justify-start gap-2 w-full text-left">
          <RectangularShearPlotting plotStep={5} />
          <div className="text-[11px] leading-relaxed text-muted-foreground w-full px-1">
            <SlideParagraph variant="plain" className="text-[11px] font-bold text-foreground mb-1">
              Average Shear Approximation:
            </SlideParagraph>
            <span className="space-y-1 block text-muted-foreground">
              • <strong>Uniform Approximation</strong>: Under uniform distribution, average shear stress is <LatexFormula math="\tau_{\text{avg}} = \frac{V}{A} = \frac{V}{b \cdot h}" />.
              <br />
              • <strong>Design Concern</strong>: This simplified model misses peak stress and is unsafe to use alone in shear design.
            </span>
          </div>
        </div>
      )
    },
    {
      title: '4. Boundary Conditions',
      badge: 'Free Boundaries',
      badgeVariant: 'info',
      description: 'Shear stress drops to zero at the top and bottom skins.',
      rightContent: (
        <div className="flex flex-col items-center justify-start gap-2 w-full text-left">
          <RectangularShearPlotting plotStep={2} />
          <div className="text-[11px] leading-relaxed text-muted-foreground w-full px-1">
            <SlideParagraph variant="plain" className="text-[11px] font-bold text-foreground mb-1">
              Free Surface Boundaries:
            </SlideParagraph>
            <span className="space-y-1 block text-muted-foreground">
              • <strong>Outer Skins</strong>: At the top and bottom free surfaces (<LatexFormula math="y = \pm h/2" />).
              <br />
              • <strong>Zero Parameters</strong>: No area exists beyond the boundary: <LatexFormula math="A' = 0 \implies Q = 0" />.
              <br />
              • <strong>Zero Shear stress</strong>: Shear stress drops to zero: <LatexFormula math="\tau = 0" />.
            </span>
          </div>
        </div>
      )
    },
    {
      title: '5. Peak Stress & Parabola',
      badge: 'Rectangular Criterion',
      badgeVariant: 'success',
      description: 'Maximum stress peaks at Neutral Axis as 1.5 times average.',
      rightContent: (
        <div className="flex flex-col items-center justify-start gap-2 w-full text-left">
          <RectangularShearPlotting plotStep={5} />
          <div className="text-[11px] leading-relaxed text-muted-foreground w-full px-1">
            <SlideParagraph variant="plain" className="text-[11px] font-bold text-foreground mb-1">
              Parabolic Shear Distribution:
            </SlideParagraph>
            <span className="space-y-1 block text-muted-foreground">
              • <strong>Parabolic Curve</strong>: Substituting parameters yields <LatexFormula math="\tau = \frac{3V}{2A}\left(1 - \frac{y^2}{(h/2)^2}\right)" />.
              <br />
              • <strong>Centroidal Peak</strong>: Maximum stress occurs at the Neutral Axis (<LatexFormula math="y=0" />):
              <span className="block font-mono text-[10px] text-foreground bg-muted/40 p-1.5 rounded text-center my-1">
                <ClickHighlight variant="paint" at={6} className="inline-block font-extrabold text-indigo-500">
                  <LatexFormula math="\tau_{\max} = 1.5 \cdot \tau_{\text{avg}} = \frac{3V}{2A}" />
                </ClickHighlight>
              </span>
            </span>
          </div>
        </div>
      )
    }
  ];

  return (
    <ClickSyncedTabs
      title="Shear Stress in Rectangular Sections"
      items={items}
      leftTitle="Constituent Parameters & Distribution"
      rightTitle="Distribution Plotting Details"
      leftWidth="48%"
      clickToTabMap={[0, 1, 1, 2, 3, 4, 4]}
    />
  );
};

export default RectangularShearDistribution;
