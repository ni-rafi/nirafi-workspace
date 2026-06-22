import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import {
  InteractiveCard,
  SlideBullet,
  SlideGrid,
  SlideBadge,
  SlideTable
} from '@/features/presentation/components/elements';

// Slide 17: Sessional Workshop Setup: The Measurement Sheet
export const Slide17: React.FC = () => {
  return (
    <FullWidthLayout title="Studio Workshop: The Measurement Ledger" bgVariant="default">
      <div className="flex flex-col gap-4">
        <p className="text-xs text-muted-foreground leading-relaxed">
          Open your group's architectural drawing set. Compile your measurements strictly matching the following professional PWD Measurement Book (MB) format.
        </p>

        <div className="overflow-x-auto text-xs md:text-sm">
          <SlideTable
            bordered
            striped
            headers={['Item No.', 'Description of Work', 'No.', 'Length (L)', 'Width (W)', 'Height/Depth (H)', 'Quantity', 'Explanatory Notes']}
            rows={[
              ['3.01', 'DPC complete...', '1', '12.50 m', '0.25 m', '—', '3.125 m²', 'Ground Floor Plinth'],
              ['3.02', '10" Main Brickwork...', '2', '8.40 m', '0.25 m', '2.80 m', '11.760 m³', 'GF Grid A-B Walls'],
              ['Ddt', 'Deduct Door Voids', '2', '1.00 m', '0.25 m', '2.10 m', '-1.050 m³', 'Opening Schedule'],
              ['Ddt', 'Deduct Lintel Bearing', '4', '0.15 m', '0.25 m', '0.15 m', '-0.090 m³', 'Lintel embedment offset']
            ]}
          />
        </div>
      </div>
    </FullWidthLayout>
  );
};

// Slide 18: Parallel Workflow: Team Task Allocation
export const Slide18: React.FC = () => {
  return (
    <FullWidthLayout title="Parallel Workflow: Team Task Allocation" bgVariant="default">
      <SlideGrid cols={4}>
        <InteractiveCard title="Student 1: RCC Frame">
          <div className="flex flex-col gap-2">
            <SlideBadge variant="info" label="Concrete Volumetric" />
            <p className="text-xs text-muted-foreground leading-relaxed mt-2">
              Extracts concrete volumes for Columns, Main Beams, Secondary Beams, and Floor Slabs.
            </p>
            <div className="mt-3 p-2 bg-muted rounded border border-border/40 text-[11px] font-mono">
              <strong>Key Task:</strong> Coordinate beam soffits column height limits with team members.
            </div>
          </div>
        </InteractiveCard>

        <InteractiveCard title="Student 2: Masonry">
          <div className="flex flex-col gap-2">
            <SlideBadge variant="warning" label="Brickwork Volumetric" />
            <p className="text-xs text-muted-foreground leading-relaxed mt-2">
              Tracks Gross Brickwork for main walls (10") and interior partition walls (5").
            </p>
            <div className="mt-3 p-2 bg-muted rounded border border-border/40 text-[11px] font-mono">
              <strong>Key Task:</strong> Apply net wall height reductions and manage ground vs first floors.
            </div>
          </div>
        </InteractiveCard>

        <InteractiveCard title="Student 3: Voids">
          <div className="flex flex-col gap-2">
            <SlideBadge variant="error" label="Deductions &amp; Joinery" />
            <p className="text-xs text-muted-foreground leading-relaxed mt-2">
              Calculates geometric voids (Ddt) for scheduled door/window openings and lintel bearings.
            </p>
            <div className="mt-3 p-2 bg-muted rounded border border-border/40 text-[11px] font-mono">
              <strong>Key Task:</strong> Take off timber frame (cft) and shutter panel surface areas (sft).
            </div>
          </div>
        </InteractiveCard>

        <InteractiveCard title="Student 4: Finishes">
          <div className="flex flex-col gap-2">
            <SlideBadge variant="success" label="Surface Finishes" />
            <p className="text-xs text-muted-foreground leading-relaxed mt-2">
              Calculates internal floor tiles and wall/ceiling plastering areas.
            </p>
            <div className="mt-3 p-2 bg-muted rounded border border-border/40 text-[11px] font-mono">
              <strong>Key Task:</strong> Apply plastering deduction thresholds (minor, medium, large openings).
            </div>
          </div>
        </InteractiveCard>
      </SlideGrid>
    </FullWidthLayout>
  );
};

// Slide 19: Lab Report 3: Submission Directives & Mappings
export const Slide19: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Lab Report 3: Submission Directives"
      bgVariant="default"
      leftWidth="50%"
      leftContent={
        <div className="flex flex-col gap-4">
          <InteractiveCard title="Submission Rules">
            <ul className="flex flex-col gap-3.5">
              <SlideBullet revealAt={0} icon="📝">
                <span>
                  <strong>Individual Submissions:</strong> Although calculations are executed collaboratively in studio teams, the take-off report submission is strictly individual.
                </span>
              </SlideBullet>
              <SlideBullet revealAt={1} icon="📏">
                <span>
                  <strong>Precision Rounding:</strong> Maintain 4 decimal places during intermediate steps; round all final BoQ item quantities strictly to <strong>3 decimal places</strong>.
                </span>
              </SlideBullet>
            </ul>
          </InteractiveCard>
        </div>
      }
      rightContent={
        <div className="flex flex-col justify-center h-full">
          <InteractiveCard title="Course Outcome Alignment">
            <div className="flex flex-col gap-2.5">
              <SlideBadge variant="info" label="CO2 Mapped" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                This studio session directly maps to <strong>CO2 (Prepare Bill of Quantities)</strong>:
              </p>
              <div className="p-3 bg-muted rounded-xl border border-border/40 text-xs leading-relaxed text-foreground font-semibold">
                "Prepare the bill of quantity for different work packages of a civil engineering project."
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed italic">
                Your ability to interpret 2D elevations, coordinate load paths, and apply standard deduction rules is the core assessment metric.
              </p>
            </div>
          </InteractiveCard>
        </div>
      }
    />
  );
};
