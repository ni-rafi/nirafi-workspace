import React from 'react';
import { ClickSyncedTabs, type ClickSyncedTabItem } from '@/features/presentation/components/elements/ClickSyncedTabs';
import { LatexFormula, SlideParagraph } from '@/features/presentation/components/elements';
import { GeometricGalleryDrawing } from './drawings/GeometricGalleryDrawing';

export const GeometricGallery: React.FC = () => {
  const items: ClickSyncedTabItem[] = [
    {
      title: '1. Symmetric Baseline',
      badge: 'Peak at N.A.',
      badgeVariant: 'primary',
      description: 'Symmetric profiles reach peak stress along the Neutral Axis.',
      rightContent: (
        <div className="flex flex-col items-center justify-start gap-2 w-full text-left">
          <GeometricGalleryDrawing currentClick={0} />
          <div className="text-[11px] leading-relaxed text-muted-foreground w-full px-1">
            <SlideParagraph variant="plain" className="text-[11px] font-bold text-foreground mb-1">
              Symmetric Profile Baseline:
            </SlideParagraph>
            <span className="space-y-1 block text-muted-foreground">
              • <strong>Symmetric Shapes</strong>: Applies to rectangular, circular, and other symmetrical sections.
              <br />
              • <strong>Peak Location</strong>: The maximum shear stress (<LatexFormula math="\tau_{\max}" />) always occurs along the centroidal Neutral Axis (N.A.).
              <br />
              • <strong>Governing Mechanics</strong>: The statical moment <LatexFormula math="Q(y)" /> peaks at the centroid (<LatexFormula math="y = 0" />), and width <LatexFormula math="b" /> is constant or wide.
            </span>
          </div>
        </div>
      )
    },
    {
      title: '2. Triangular Exception',
      badge: 'Peak at h/2',
      badgeVariant: 'error',
      description: 'Asymmetric profiles shift peak stress away from N.A.',
      rightContent: (
        <div className="flex flex-col items-center justify-start gap-2 w-full text-left">
          <GeometricGalleryDrawing currentClick={1} />
          <div className="text-[11px] leading-relaxed text-muted-foreground w-full px-1">
            <SlideParagraph variant="plain" className="text-[11px] font-bold text-foreground mb-1">
              Triangular Profile Exception:
            </SlideParagraph>
            <span className="space-y-1 block text-muted-foreground">
              • <strong>Centroidal Offset</strong>: The Neutral Axis lies at <LatexFormula math="2h/3" /> from the apex.
              <br />
              • <strong>Width Narrowing</strong>: Width decreases toward the apex, which shifts the maximum ratio of <LatexFormula math="Q(y)/b(y)" /> away from the N.A.
              <br />
              • <strong>Peak Location</strong>: Stress peaks exactly at mid-height (<LatexFormula math="y = h/2" />), where <LatexFormula math="\tau_{\max} = 1.5 \cdot \tau_{\text{avg}}" />.
              <br />
              • <strong>Comparison</strong>: Peak stress is 12.5% higher at mid-height than along the centroidal axis (<LatexFormula math="\tau_{\text{NA}} = \frac{8}{9}\tau_{\max}" />).
            </span>
          </div>
        </div>
      )
    },
    {
      title: '3. Cross Junction Jumps',
      badge: 'Width Bottleneck',
      badgeVariant: 'warning',
      description: 'Sudden width transitions trigger stress discontinuity jumps.',
      rightContent: (
        <div className="flex flex-col items-center justify-start gap-2 w-full text-left">
          <GeometricGalleryDrawing currentClick={2} />
          <div className="text-[11px] leading-relaxed text-muted-foreground w-full px-1">
            <SlideParagraph variant="plain" className="text-[11px] font-bold text-foreground mb-1">
              Junction Width Discontinuity:
            </SlideParagraph>
            <span className="space-y-1 block text-muted-foreground">
              • <strong>Discontinuity Locations</strong>: Occurs in I-beams, T-beams, or cross-shaped sections where the profile width changes abruptly.
              <br />
              • <strong>Inverse Relation</strong>: Because shear stress is inversely proportional to section width (<LatexFormula math="\tau \propto 1/b" />), narrowing triggers sudden jumps.
              <br />
              • <strong>Stress Step</strong>: Stresses experience a sharp vertical step discontinuity at the junction.
            </span>
          </div>
        </div>
      )
    }
  ];

  return (
    <ClickSyncedTabs
      title="The Geometric Oddities Stress Gallery"
      items={items}
      leftTitle="Cross-Section Geometry Exceptions"
      rightTitle="Symmetry & Discontinuity Distributions"
      leftWidth="48%"
      clickToTabMap={[0, 1, 2]}
    />
  );
};

export default GeometricGallery;
