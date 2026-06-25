import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { useClickStepsContext } from '@/features/presentation/context/ClickStepsContext';
import {
  SlideList,
  SlideCallout,
  ClickReveal,
  ClickHighlight,
} from '@/features/presentation/components/elements';
import { RoadPavementDrawing } from '@/subjects/quantity-surveying/features';

// Slide: Herring Bone Bond (HBB) Pavements
export const SlidePavementHBB: React.FC = () => {
  const { currentClick } = useClickStepsContext();

  return (
    <TwoColumnLayout
      title="1.4 Herring Bone Bond (HBB) Pavements"
      bgVariant="default"
      leftWidth="52%"
      leftContent={
        <SlideList
          title="Regional Brick Pavement Specifications"
          description="In regional and rural roadway networks, brick-on-edge pavements laid in a Herring Bone pattern are extensively estimated under regional PWD guidelines."
          revealMode="each-click"
          items={[
            {
              title: "Bond Configuration",
              text: <span>Bricks are laid on edge diagonally at <ClickHighlight variant="paint" at={1}>45 degrees</ClickHighlight> to the road centerline, forming a interlocking pattern that distributes wheel loads.</span>
            },
            {
              title: "Sand Cushion Base",
              text: <span>Laid over a <ClickHighlight variant="paint" at={2}>12 mm thick sand cushion</ClickHighlight> (F.M. 0.80). Joint gaps are packed with the same fine sand to prevent brick movement.</span>
            },
            {
              title: "Bill of Quantities (BoQ) Unit",
              text: <span>Quantified strictly in <ClickHighlight variant="paint" at={3}>square meters (m²)</ClickHighlight> of surface area. Estimators do not calculate volume, but must specify brick quality (Jhama/First Class).</span>
            }
          ]}
        />
      }
      rightContent={
        <div className="h-full flex flex-col justify-between space-y-2">
          <RoadPavementDrawing activeHighlight={currentClick >= 1 ? 'sub-base' : 'none'} className="flex-1" />
          <ClickReveal at={3} preset="up">
            <SlideCallout variant="info" title="Brick Soling Estimator Tip" className="py-2.5">
              <span className="text-[10px] text-muted-foreground leading-normal block">
                Unlike flat soling (which uses ~32 bricks/m²), Herring Bone Bond (HBB) laid with brick on edges consumes approximately **52 bricks per square meter** due to the vertical depth orientation.
              </span>
            </SlideCallout>
          </ClickReveal>
        </div>
      }
    />
  );
};

// Slide: Bituminous Carpeting Execution Protocols
export const SlidePavementBitumenProtocols: React.FC = () => {
  const { currentClick } = useClickStepsContext();

  return (
    <TwoColumnLayout
      title="1.5 Bituminous Carpeting Protocols"
      bgVariant="default"
      leftWidth="52%"
      leftContent={
        <SlideList
          title="PWD Hot-Mix Asphalt Standards"
          description="Estimating bituminous carpeting involves strict adherence to execution specifications. Cost estimates in the BoQ depend directly on thermal and mixture controls."
          revealMode="each-click"
          items={[
            {
              title: "Separated Heating Controls",
              text: <span>PWD mandates 60/70 penetration asphalt heated to <ClickHighlight variant="paint" at={1}>140°C–155°C</ClickHighlight>, and stone chips heated separately to <ClickHighlight variant="paint" at={1}>150°C–170°C</ClickHighlight> before mixing.</span>
            },
            {
              title: "Compaction Rolling Temperature",
              text: <span>Rolling with steel-drum and pneumatic rollers must be completed before mix cools. Rolling temperature must not fall <ClickHighlight variant="paint" at={2}>below 90°C</ClickHighlight>.</span>
            },
            {
              title: "Aggregates Grading & Billing",
              text: <span>Blend requires 20mm and 12mm crushed stone chips mixed with stone dust. Compacted carpeting is billed in <ClickHighlight variant="paint" at={3}>square meters (m²)</ClickHighlight> for a specified thickness.</span>
            }
          ]}
        />
      }
      rightContent={
        <div className="h-full flex flex-col justify-between space-y-2">
          <RoadPavementDrawing activeHighlight={currentClick >= 1 ? 'surface' : 'none'} className="flex-1" />
          <ClickReveal at={2} preset="up">
            <SlideCallout variant="warning" title="BoQ Spec Requirements" className="py-2">
              <p className="text-[10px] leading-relaxed text-muted-foreground">
                Item descriptions for bituminous carpeting must specify: "pre-mixed, laid and compacted to specified thickness, including tack/prime coat binder application, heated and rolled at specified temperature limits."
              </p>
            </SlideCallout>
          </ClickReveal>
        </div>
      }
    />
  );
};

// Slide: Base Layer Compaction Metrics
export const SlidePavementCompaction: React.FC = () => {
  return (
    <TwoColumnLayout
      title="1.6 Base Layer Compaction Metrics"
      bgVariant="default"
      leftWidth="52%"
      leftContent={
        <SlideList
          title="Density-Based Volumetric Billing"
          description="Granular base and sub-base layers (like Aggregate Base Course Type-I or Type-II) are paid based on final compacted thickness, meaning dry density is critical."
          revealMode="each-click"
          items={[
            {
              title: "Compaction Equipment",
              text: <span>Granular base courses must be compacted in layers using a 7-10 ton vibratory roller, accompanied by continuous water sprinkling to achieve optimum moisture content.</span>
            },
            {
              title: "Maximum Dry Density (MDD)",
              text: <span>PWD rules require aggregate courses to reach <ClickHighlight variant="paint" at={1}>98% to 100% MDD</ClickHighlight>, verified in the field by Sand Cone or Nuclear Density tests.</span>
            },
            {
              title: "Estimator Ledger Impact",
              text: <span>The compaction factor (e.g. 1.30 for loose aggregate) is a multiplier to find transport volume, but the final billed ledger volume is strictly the compacted net in-situ volume.</span>
            }
          ]}
        />
      }
      rightContent={
        <div className="h-full flex flex-col justify-center space-y-4">
          <div className="p-4 bg-muted/40 border border-border/40 rounded-2xl space-y-3 font-mono text-xs select-none">
            <div>
              <span className="text-[10px] text-muted-foreground block font-bold uppercase">Billed Volume (BoQ)</span>
              <div className="bg-background p-2 rounded-lg border border-border/20 font-bold text-center text-primary mt-1">
                Compacted Vol = Length × Width × Thickness
              </div>
            </div>
            <div>
              <span className="text-[10px] text-muted-foreground block font-bold uppercase">Field Density Limit</span>
              <div className="bg-background p-2 rounded-lg border border-border/20 font-bold text-center text-emerald-600 dark:text-emerald-400 mt-1">
                Dry Density &ge; 98% Modified Proctor MDD
              </div>
            </div>
          </div>
          <SlideCallout variant="success" title="Density Standard" className="py-2.5">
            <span className="text-[10px] leading-normal text-muted-foreground">
              Specifying the density standard (e.g., 98% MDD) protects the client by binding the contractor to compact the loose aggregates to their structural design limit.
            </span>
          </SlideCallout>
        </div>
      }
    />
  );
};
