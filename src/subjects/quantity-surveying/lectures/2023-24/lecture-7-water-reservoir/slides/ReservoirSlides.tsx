import React from 'react';
import { TitleV2Layout } from '@/shared/layouts/TitleV2Layout';
import { TopicDividerLayout } from '@/shared/layouts/TopicDividerLayout';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideProps } from '@/features/presentation/components/slides/SlideRenderer';
import { useUrlSyncedState } from '@/features/presentation/hooks/useUrlSyncedState';
import { WaterReservoirShellDrawing } from '@/subjects/quantity-surveying/features';
import {
  SlideParagraph,
  SlideList,
  SlideCallout,
  InteractiveCard,
  ParameterSlider,
  CalculationOutput,
} from '@/features/presentation/components/elements';

// Slide 1: Cover Slide
export const Slide1: React.FC<SlideProps> = () => (
  <TitleV2Layout
    courseCode="CE 204"
    courseTitle="Quantity Surveying & Valuation"
    subtitle="Estimation of Water Reservoir and Septic Tank"
    yearSemester="2nd Year/1st Semester"
    creditHours="3.0"
    usnCode="CO-QS-204"
    session="2023-2024"
    lectureNumber={7}
  />
);

// Slide 2: Section Divider
export const Slide2: React.FC = () => (
  <TopicDividerLayout
    topicNumber="01"
    title="Water Reservoir Volumetric Estimation"
    description="Deep Excavations, RCC Containment Shells, and Waterproofing Systems"
  />
);

// Slide 3: Excavation Logistics Concepts
export const Slide3: React.FC = () => (
  <TwoColumnLayout
    title="1.1 Underground Excavation & Shoring"
    bgVariant="default"
    leftWidth="55%"
    leftContent={
      <div className="space-y-4">
        <SlideParagraph title="Underground Volume Parameters">
          Deep excavation for reservoirs requires safety allowances and clearances.
        </SlideParagraph>
        <SlideList
          revealMode="each-click"
          items={[
            { title: "Net Base Dimension", text: "Structure base slab boundary profile (length × width)." },
            { title: "Working Space Offset (c)", text: "Extra 0.3m to 0.5m perimeter margin to construct forms and external damp-proof walls." },
            { title: "Timbering & Shoring Area", text: "Vertical wall supports billed in square meters (m²) when digging depth > 1.5m." }
          ]}
        />
      </div>
    }
    rightContent={
      <div className="h-full flex flex-col justify-center">
        <SlideCallout variant="warning" title="Excavation Volume Formula">
          <p className="text-sm text-muted-foreground mb-3">Surveying criteria mandate adding the working space perimeter offsets:</p>
          <div className="text-xl font-mono text-center text-amber-500 bg-muted/40 p-4 rounded-xl border border-amber-500/20 font-bold">
            V = (L + 2c) × (B + 2c) × H
          </div>
          <span className="text-[11px] text-muted-foreground block mt-2 text-center">Where H = excavation depth from Natural Ground level (EGL)</span>
        </SlideCallout>
      </div>
    }
  />
);

// Slide 4: Excavation Volume Sandbox
export const Slide4: React.FC = () => {
  const [length, setLength] = useUrlSyncedState<number>('res_exc_len', 6.0);
  const [width, setWidth] = useUrlSyncedState<number>('res_exc_width', 4.0);
  const [depth, setDepth] = useUrlSyncedState<number>('res_exc_depth', 3.0);
  const [clearance, setClearance] = useUrlSyncedState<number>('res_exc_clear', 0.5);

  const totalExcVol = (length + 2 * clearance) * (width + 2 * clearance) * depth;

  return (
    <TwoColumnLayout
      title="1.1 Excavation Sandbox"
      bgVariant="default"
      leftWidth="45%"
      leftContent={
        <InteractiveCard title="Excavation Modeler">
          <div className="space-y-4">
            <ParameterSlider label="Base Length (L)" min={3} max={15} step={0.5} value={length} onChange={setLength} unit=" m" />
            <ParameterSlider label="Base Width (B)" min={2} max={10} step={0.5} value={width} onChange={setWidth} unit=" m" />
            <ParameterSlider label="Excavation Depth (H)" min={1.5} max={5} step={0.1} value={depth} onChange={setDepth} unit=" m" />
            <ParameterSlider label="Clearance (c)" min={0.3} max={1} step={0.1} value={clearance} onChange={setClearance} unit=" m" />
            <CalculationOutput title="Total Excavation" value={`${totalExcVol.toFixed(3)}`} unit="m³" />
          </div>
        </InteractiveCard>
      }
      rightContent={
        <WaterReservoirShellDrawing mode="excavation" />
      }
    />
  );
};

// Slide 5: RCC Concrete Shell Concepts
export const Slide5: React.FC = () => (
  <TwoColumnLayout
    title="1.2 RCC Structural Containment Shell"
    bgVariant="default"
    leftWidth="55%"
    leftContent={
      <div className="space-y-4">
        <SlideParagraph title="Intersection Geometry">
          A liquid-retaining structure is an integrated monolithic concrete box. To avoid double-counting materials, overlaps must be deducted.
        </SlideParagraph>
        <SlideList
          revealMode="each-click"
          items={[
            { title: "Base Raft Slab", text: "Monolithic concrete slab at the bottom. Carries self-weight and fluid mass." },
            { title: "Vertical Walls Ring", text: "Retaining walls. Calculate long walls out-to-out, then short walls in-to-in." },
            { title: "Roof Cover Slab", text: "Top horizontal plate. Net area minus manhole access openings." }
          ]}
        />
      </div>
    }
    rightContent={
      <div className="h-full flex flex-col justify-center">
        <SlideCallout variant="info" title="Take-off Ledger Bounds">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Short walls must systematically deduct the thickness of the overlapping long walls. Neglect reinforcement steel displacement when taking off structural concrete.
          </p>
        </SlideCallout>
      </div>
    }
  />
);

// Slide 6: RCC Shell Volume Sandbox
export const Slide6: React.FC = () => {
  const [length, setLength] = useUrlSyncedState<number>('res_shell_len', 5.0);
  const [width, setWidth] = useUrlSyncedState<number>('res_shell_width', 3.0);
  const [wallThick, setWallThick] = useUrlSyncedState<number>('res_shell_thick', 0.25);
  const [height, setHeight] = useUrlSyncedState<number>('res_shell_height', 2.5);

  const baseSlabVol = (length + 2 * wallThick) * (width + 2 * wallThick) * 0.3; // 300mm raft
  const wallVol = 2 * (length + width + 2 * wallThick) * wallThick * height;

  return (
    <TwoColumnLayout
      title="1.2 RCC Structural Shell Sandbox"
      bgVariant="default"
      leftWidth="45%"
      leftContent={
        <InteractiveCard title="RCC Shell Modeler">
          <div className="space-y-4">
            <ParameterSlider label="Inner Length" min={2} max={10} step={0.5} value={length} onChange={setLength} unit=" m" />
            <ParameterSlider label="Inner Width" min={1.5} max={8} step={0.5} value={width} onChange={setWidth} unit=" m" />
            <ParameterSlider label="Wall Thickness" min={0.2} max={0.4} step={0.05} value={wallThick} onChange={setWallThick} unit=" m" />
            <ParameterSlider label="Wall Height" min={1.5} max={4.0} step={0.1} value={height} onChange={setHeight} unit=" m" />
            <div className="grid grid-cols-2 gap-2 text-center font-mono">
              <CalculationOutput title="Raft Vol" value={`${baseSlabVol.toFixed(2)}`} unit="m³" variant="compact" />
              <CalculationOutput title="Wall Vol" value={`${wallVol.toFixed(2)}`} unit="m³" variant="compact" />
            </div>
          </div>
        </InteractiveCard>
      }
      rightContent={
        <WaterReservoirShellDrawing mode="shell" />
      }
    />
  );
};

// Slide 7: Waterproofing & Finishing Concepts
export const Slide7: React.FC = () => (
  <TwoColumnLayout
    title="1.3 Waterproofing & Plastering Finishes"
    bgVariant="default"
    leftWidth="55%"
    leftContent={
      <div className="space-y-4">
        <SlideParagraph title="Preventing Fluid Seepage">
          Hydraulic structures must be impervious to seepage and external groundwater infiltration.
        </SlideParagraph>
        <SlideList
          revealMode="each-click"
          items={[
            { title: "Waterproofing Admixture", text: "PWD criteria require adding chemical compounds (e.g. Pudlo) at 1.5% to 2% of total cement weight." },
            { title: "Internal Plaster Coat (1:3)", text: "12mm cement plaster applied to internal walls and floor. Billed in square meters (m²)." }
          ]}
        />
      </div>
    }
    rightContent={
      <div className="h-full flex flex-col justify-center">
        <SlideCallout variant="success" title="Plaster Area Equation">
          <div className="text-xl font-mono text-center text-emerald-600 dark:text-emerald-400 bg-muted/40 p-4 rounded-xl border border-emerald-500/20 font-bold">
            Area = 2(L + B) × h + L × B
          </div>
          <span className="text-[11px] text-muted-foreground block mt-2 text-center">Walls Area (Wet Perimeter × height) + Floor Area</span>
        </SlideCallout>
      </div>
    }
  />
);

// Slide 8: Plaster Area & Chemical Sandbox
export const Slide8: React.FC = () => {
  const [length, setLength] = useUrlSyncedState<number>('res_water_len', 5.0);
  const [width, setWidth] = useUrlSyncedState<number>('res_water_width', 3.0);
  const [height, setHeight] = useUrlSyncedState<number>('res_water_height', 2.5);

  const internalPerimeter = 2 * (length + width);
  const plasterArea = internalPerimeter * height + (length * width);
  const pudloKg = plasterArea * 0.015 * 50;

  return (
    <TwoColumnLayout
      title="1.3 Waterproofing Sandbox"
      bgVariant="default"
      leftWidth="45%"
      leftContent={
        <InteractiveCard title="Plaster & Chemical Modeler">
          <div className="space-y-4">
            <ParameterSlider label="Internal Length" min={2} max={10} step={0.5} value={length} onChange={setLength} unit=" m" />
            <ParameterSlider label="Internal Width" min={1.5} max={8} step={0.5} value={width} onChange={setWidth} unit=" m" />
            <ParameterSlider label="Liquid Depth (h)" min={1} max={4} step={0.1} value={height} onChange={setHeight} unit=" m" />
            <div className="grid grid-cols-2 gap-2 text-center font-mono">
              <CalculationOutput title="Plaster Area" value={`${plasterArea.toFixed(2)}`} unit="m²" variant="compact" />
              <CalculationOutput title="Pudlo Req." value={`${pudloKg.toFixed(1)}`} unit="kg" variant="compact" />
            </div>
          </div>
        </InteractiveCard>
      }
      rightContent={
        <WaterReservoirShellDrawing mode="waterproofing" />
      }
    />
  );
};
