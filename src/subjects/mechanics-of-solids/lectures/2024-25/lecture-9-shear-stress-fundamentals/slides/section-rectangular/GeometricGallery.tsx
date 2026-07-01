import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, SlideCallout, LatexFormula } from '@/features/presentation/components/elements';
import { GeometricGalleryDrawing } from '@/subjects/mechanics-of-solids/features/stress/components/diagrams/GeometricGalleryDrawing';

export const GeometricGallery: React.FC = () => {
  return (
    <TwoColumnLayout
      title="The 'Geometric Oddities' Stress Gallery"
      leftWidth="52%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-3 text-left">
          <div>
            <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest block mb-1">
              Geometric exception profiles
            </span>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground">
              A common misconception is that the peak shear stress always occurs exactly at the centroidal Neutral Axis (N.A.). While true for symmetric sections like Rectangles and Circles, asymmetric geometry shifts this balance:
            </SlideParagraph>
          </div>

          <div className="space-y-2 text-xs text-muted-foreground">
            <h4 className="font-bold text-foreground">Triangular Profile Exception:</h4>
            <p>
              For a triangle of base b and height h, the N.A. lies at 2h/3 from the apex. However, the width-to-area slicing ratio optimizes at exactly half-height (y = h/2):
            </p>
            <ul className="list-disc pl-4 space-y-1">
              <li>
                Maximum stress at mid-depth (w = h/2):
                <LatexFormula math="\\tau_{\\max} = 1.5 \\cdot \\tau_{\\text{avg}} = \\frac{1.5 V}{A}" />
              </li>
              <li>
                Stress at centroidal N.A. (w = 2h/3):
                <LatexFormula math="\\tau_{\\text{NA}} = \\frac{4}{3} \\cdot \\tau_{\\text{avg}} = \\frac{8}{9} \\cdot \\tau_{\\max}" />
              </li>
            </ul>
            <p>
              Thus, peak stress occurs at mid-height, where the stress is 12.5% higher than at the neutral axis!
            </p>
          </div>

          <SlideCallout variant="warning" className="py-2 px-3 text-[10px]">
            <strong>Warning:</strong> Never blindly assume peak stresses occur at the neutral axis. Always calculate the maximum of the Q(y)/t(y) ratio.
          </SlideCallout>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center h-full min-h-[250px]">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-2">Cross-Sections & Shear Profiles</span>
          <GeometricGalleryDrawing />
        </div>
      }
    />
  );
};

export default GeometricGallery;
