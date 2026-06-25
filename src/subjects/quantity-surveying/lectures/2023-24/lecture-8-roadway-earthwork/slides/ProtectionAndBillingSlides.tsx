import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import {
  SlideList,
  ClickHighlight
} from '@/features/presentation/components/elements';
import { RoadwaySectionDrawing } from '@/subjects/quantity-surveying/features';

// ============================================================================
// Slide: Embankment Protection: Turfing
// ============================================================================
export const TurfingSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="3.3 Embankment Protection: Turfing"
      bgVariant="default"
      leftWidth="50%"
      leftContent={
        <div className="select-text">
          <SlideList
            title="Preventing Side Slope Erosion"
            description="Newly built and compacted earthwork embankments are extremely vulnerable to erosion from monsoon rains, which can cause structural collapse of the roadway."
            revealMode="each-click"
            variant="plain"
            items={[
              {
                title: "Grass Turfing Specification",
                text: "The PWD Schedule of Rates (Item 24.3) mandates laying turf sods on side slopes and tops of embankments to stabilize the soil.",
                revealAt: 1
              },
              {
                title: "Measurement Unit Shift",
                text: <span>Unlike bulk soil volumes ($m^3$), turfing is a surface treatment and must be calculated and billed strictly in <ClickHighlight at={2} variant="paint" className="text-emerald-500">Square Meters (m²)</ClickHighlight>.</span>,
                revealAt: 2
              },
              {
                title: "Laying & Maintenance Rules",
                text: "Contractors must use turf sods not less than 225mm square, pegged down, and watered until grass is fully established.",
                revealAt: 3
              }
            ]}
          />
        </div>
      }
      rightContent={
        <div className="h-full flex flex-col justify-center">
          <RoadwaySectionDrawing
            B={10}
            s={2}
            d={1.5}
            activeHighlight="turfing"
            className="flex-1 animate-fadeIn"
          />
        </div>
      }
    />
  );
};

// ============================================================================
// Slide: Earthwork in Box Cutting (PWD Item 24.2)
// ============================================================================
export const BoxCuttingSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="4.5 Earthwork in Box Cutting (PWD Item 24.2)"
      bgVariant="default"
      leftWidth="50%"
      leftContent={
        <div className="select-text">
          <SlideList
            title="Shallow Subgrade Excavation"
            description="Before pavement layers are constructed, the roadway subgrade bed must be carved out of the natural ground."
            revealMode="each-click"
            variant="plain"
            items={[
              {
                title: "The Definition",
                text: "Box cutting involves excavating a shallow, rectangular corridor to form the road bed, maintaining alignment, camber, and grade.",
                revealAt: 1
              },
              {
                title: "The Billing Rule",
                text: <span>If the excavation depth is shallow (up to <ClickHighlight at={2} variant="bold" className="text-amber-500">300 mm</ClickHighlight> or up to <ClickHighlight at={2} variant="bold" className="text-amber-500">450 mm</ClickHighlight>), PWD dictates it must be quantified and billed in <ClickHighlight at={2} variant="paint" className="text-primary">Square Meters (m²)</ClickHighlight> instead of cubic meters.</span>,
                revealAt: 2
              },
              {
                title: "Surveyor Application",
                text: "Planar area calculations (B × L) are used. Deep cuts (greater than 450mm) revert to standard cubic meter ($m^3$) billing.",
                revealAt: 3
              }
            ]}
          />
        </div>
      }
      rightContent={
        <div className="h-full flex flex-col justify-center space-y-2">
          <RoadwaySectionDrawing
            B={10}
            s={2}
            d={0.3}
            activeHighlight="box-cutting"
            className="flex-1 animate-fadeIn"
          />
        </div>
      }
    />
  );
};
