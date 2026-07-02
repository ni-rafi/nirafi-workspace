import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, SlideCallout, SlideList } from '@/features/presentation/components/elements';
import { useClickStepsContext } from '@/features/presentation/context/ClickStepsContext';
import { FlangedJunctionExplodedView } from './drawings/FlangedJunctionExplodedView';
import { problem2Config } from '../../problemConfig';

export const Problem02JunctionMarker: React.FC = () => {
  const { shape } = problem2Config;
  const b_flange = (shape.width ?? 0.1) * 1000;
  const b_web = (shape.thicknessWeb ?? 0.05) * 1000;
  const { currentClick } = useClickStepsContext();

  return (
    <TwoColumnLayout
      title="Approaching Flange-to-Web Junction"
      leftWidth="50%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-3 text-left">
          <div>
            <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest block mb-1">
              Junction point warning
            </span>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground">
              When we analyze flanged shapes like I-beams, the junction where the wide flange merges into the thin web is a critical location.
            </SlideParagraph>
          </div>

          <div className="space-y-2 text-xs text-muted-foreground">
            <h4 className="font-bold text-foreground">Junction Coordinate (y = +125 mm):</h4>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground">
              At this exact height level, the material experiences a sudden geometrical change:
            </SlideParagraph>
            <SlideList
              items={[
                { text: `Just above the line (in the flange), the width is wide: b = ${b_flange.toFixed(0)} mm.` },
                { text: `Just below the line (in the web), the width is narrow: b = ${b_web.toFixed(0)} mm.` }
              ]}
            />
          </div>

          <SlideCallout variant="warning" className="py-2 px-3 text-[10px]">
            <strong>Stress Discontinuity:</strong> Since the width b is in the denominator of the shear formula, this sudden narrowing will trigger a sudden jump in shear stress!
          </SlideCallout>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center h-full min-h-[250px]">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-3">Junction Interface Details</span>
          <FlangedJunctionExplodedView currentClick={currentClick} />
        </div>
      }
    />
  );
};

export default Problem02JunctionMarker;
