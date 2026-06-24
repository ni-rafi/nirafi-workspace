import React from 'react';
import { TopicDividerLayout } from '@/shared/layouts/TopicDividerLayout';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { useClickStepsContext } from '@/features/presentation/context/ClickStepsContext';
import { SepticTankRevealDrawing, SoakPitFilterSandbox } from '@/subjects/quantity-surveying/features';
import {
  SlideParagraph,
  SlideList,
  SlideCallout,
} from '@/features/presentation/components/elements';

// Slide 9: Section Divider
export const Slide9: React.FC = () => (
  <TopicDividerLayout
    topicNumber="02"
    title="Septic Tank Structural Detailing"
    description="Baffle Walls, Fluid Traps, and the Soak Pit Void Ratio Rule"
  />
);

// Slide 10: Septic Tank Structural Anatomy Concepts
export const Slide10: React.FC = () => (
  <TwoColumnLayout
    title="2.1 Septic Tank Anatomy Concepts"
    bgVariant="default"
    leftWidth="55%"
    leftContent={
      <div className="space-y-4">
        <SlideParagraph title="Deconstructing Sanitary Masonry">
          A traditional septic tank represents a mixed structural design—combining concrete basework with brickwork containment shells.
        </SlideParagraph>
        <SlideList
          revealMode="each-click"
          items={[
            { title: "Base Slab (RCC)", text: "Monolithic concrete foundation slab acting as an impervious horizontal water barrier (m³)." },
            { title: "Baffle / Partition Wall", text: "Internal brick or concrete partitions separating chambers to slow waste movement (m³ or m²)." },
            { title: "Enclosure Brickwork", text: "Heavy outer load-bearing brick walls. Requires external bitumen coats to block subsoil dampness (m³)." }
          ]}
        />
      </div>
    }
    rightContent={
      <div className="h-full flex flex-col justify-center">
        <SlideCallout variant="info" title="Flow Appurtenances (Nos.)">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Mechanical fittings like Inlet/Outlet sanitary tee joints, ventilation pipelines, and cast-iron access covers are classified separately and billed by count (**Numbers [Nos.]**).
          </p>
        </SlideCallout>
      </div>
    }
  />
);

// Slide 11: Septic Tank Interactive Reveal
export const Slide11: React.FC = () => {
  const { currentClick } = useClickStepsContext();
  const activeStep = Math.min(3, Math.max(0, currentClick));

  return (
    <TwoColumnLayout
      title="2.1 Interactive Reveal Canvas"
      bgVariant="default"
      leftWidth="40%"
      leftContent={
        <div className="space-y-4">
          <SlideParagraph title="Layer Step-Reveal">
            Click through presentation steps to dissect the septic tank structural layers:
          </SlideParagraph>
          <SlideList
            revealMode="none"
            items={[
              { title: "Step 1: RCC Base Slab", text: "Highlights the bottom foundation seal.", icon: activeStep >= 0 ? "check" : "" },
              { title: "Step 2: Baffle Wall", text: "Highlights the internal partition.", icon: activeStep >= 1 ? "check" : "" },
              { title: "Step 3: External Walls", text: "Highlights outer brickwork.", icon: activeStep >= 2 ? "check" : "" },
              { title: "Step 4: Sanitary Tees", text: "Highlights plumbing fittings.", icon: activeStep >= 3 ? "check" : "" }
            ]}
          />
        </div>
      }
      rightContent={
        <SepticTankRevealDrawing activeStep={activeStep} />
      }
    />
  );
};

// Slide 12: Soak Pit Aggregate Filter Concepts
export const Slide12: React.FC = () => (
  <TwoColumnLayout
    title="2.2 Soak Pit Filtration Concepts"
    bgVariant="default"
    leftWidth="55%"
    leftContent={
      <div className="space-y-4">
        <SlideParagraph title="Passive Subsoil Percolation">
          Effluent overflow from the septic tank discharges into a Soak Pit packed with open-graded filtering khoa (broken brick bats) or stones.
        </SlideParagraph>
        <SlideList
          revealMode="each-click"
          items={[
            { title: "Cylindrical Excavation", text: "The pit is dug as a cylinder of diameter D and depth H. Billed in m³." },
            { title: "Voids Percolation Rule", text: "Voids in coarse aggregates must represent 33% to 40% of space to permit water seepage." },
            { title: "Loose Aggregate Compaction Factor", text: "Aggregate volume contracts when packed. Procurement requires a loose multiplier of 1.33." }
          ]}
        />
      </div>
    }
    rightContent={
      <div className="h-full flex flex-col justify-center">
        <SlideCallout variant="warning" title="Loose Aggregate Ordering Rule">
          <div className="text-lg font-mono text-center text-amber-500 bg-muted/40 p-4 rounded-xl border border-amber-500/20 font-bold">
            Loose Volume = Net Pit Volume × 1.33
          </div>
          <span className="text-[11px] text-muted-foreground block mt-2 text-center">Prevents overestimating aggregate bats on procurement invoices</span>
        </SlideCallout>
      </div>
    }
  />
);

// Slide 13: Soak Pit Volume Sandbox
export const Slide13: React.FC = () => {
  return (
    <TwoColumnLayout
      title="2.2 Soak Pit Volume Sandbox"
      bgVariant="default"
      leftWidth="100%"
      leftContent={
        <div className="w-full">
          <SoakPitFilterSandbox />
        </div>
      }
      rightContent={null}
    />
  );
};
