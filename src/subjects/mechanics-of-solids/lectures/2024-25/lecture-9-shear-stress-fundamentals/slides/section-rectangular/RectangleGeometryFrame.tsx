import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, SlideCallout, SlideList } from '@/features/presentation/components/elements';
import { RectangularShearPlotting } from './drawings/RectangularShearPlotting';

export const RectangleGeometryFrame: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Rectangular Section Coordinate Frame"
      leftWidth="55%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-3 text-left">
          <div>
            <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest block mb-1">
              Section Geometry Setup
            </span>
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground">
              To find how shear stress varies across a solid rectangular beam, we analyze a section of width b and total depth h.
            </SlideParagraph>
          </div>

          <div className="space-y-2 text-xs text-muted-foreground">
            <SlideParagraph variant="plain" className="text-xs text-muted-foreground">
              We want to calculate stress at any arbitrary height coordinate y measured from the Neutral Axis:
            </SlideParagraph>
            <SlideList
              items={[
                { text: 'The Neutral Axis lies at centroidal height (y = 0).' },
                { text: 'The outer boundaries lie at y_max = h/2 and -y_max = -h/2.' },
                { text: "We isolate a sliding sub-area A' representing the region from height y up to the top skin h/2." }
              ]}
            />
          </div>

          <SlideCallout variant="info" className="py-2 px-3 text-[10px]">
            The statical moment of area Q = ybar · A' is calculated for this shaded region above our coordinate line y.
          </SlideCallout>
        </div>
      }
      rightContent={
        <div className="flex flex-col items-center justify-center h-full">
          <RectangularShearPlotting plotStep={1} />
          <SlideParagraph variant="plain" className="text-[10.5px] text-muted-foreground mt-2 font-mono">
            Slicing Plane at Coordinate y
          </SlideParagraph>
        </div>
      }
    />
  );
};

export default RectangleGeometryFrame;
