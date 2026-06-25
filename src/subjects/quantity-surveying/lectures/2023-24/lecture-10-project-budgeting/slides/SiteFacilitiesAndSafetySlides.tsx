import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { 
  SlideParagraph, 
  SlideCallout, 
  ClickReveal,
  SlideList
} from '@/features/presentation/components/elements';
import { useUrlSyncedState } from '@/features/presentation/hooks/useUrlSyncedState';
import { SiteSafetyDrawing } from '../../../../features';

// ============================================================================
// Slide 8: Billing "Site Facilities" (PWD Chapter 1)
// ============================================================================
export const Slide8: React.FC = () => (
  <TwoColumnLayout
    title="1.3 Billing &quot;Site Facilities&quot; (PWD Chapter 1)"
    bgVariant="default"
    leftWidth="48%"
    leftContent={
      <div className="space-y-4">
        <SlideParagraph title="The Overhead Fallacy">
          A common mistake in quantity surveying is assuming that site mobilization, logistics, and office setups are &quot;fiscal risks&quot; that contractors must absorb into their 10% overhead/profit margin.
        </SlideParagraph>
        
        <ClickReveal at={1}>
          <SlideCallout variant="warning" title="The PWD Schedule Standard">
            The updated PWD Schedule of Rates explicitly rejects this. **Chapter 1 (General, Site facilities &amp; Safety)** converts site administration into mathematically billable line items placed directly in the Bill of Quantities (BoQ).
          </SlideCallout>
        </ClickReveal>
      </div>
    }
    rightContent={
      <div className="space-y-4 flex flex-col justify-center h-full">
        <ClickReveal at={2} preset="fade-in">
          <div className="p-4 bg-muted/40 border border-border rounded-xl">
            <span className="block text-xs uppercase font-mono font-bold text-amber-600 dark:text-amber-500 mb-2">Key Application Rule</span>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Estimators must explicitly list and price items like contractor site offices, testing transport, and project documentation. Compounding them as vague percentage markups is an audit failure under public works rules.
            </p>
          </div>
        </ClickReveal>
      </div>
    }
  />
);

// ============================================================================
// Slide 9: Key Administrative BoQ Items
// ============================================================================
export const Slide9: React.FC = () => (
  <TwoColumnLayout
    title="1.4 Key Administrative BoQ Items"
    bgVariant="default"
    leftWidth="50%"
    leftContent={
      <div className="space-y-4">
        <SlideParagraph title="Itemized Logistics Specifications">
          Chapter 1 defines exactly how administrative setups are structured, measured, and billed to the client:
        </SlideParagraph>
        
        <SlideList
          revealMode="each-click"
          items={[
            { 
              title: "As-Built Drawings & Operating Manuals", 
              text: "The contractor must supply 3 sets of drawings in AutoCAD (A-2 size) and operating manuals. Billed as a lump sum \"per tender\" (Item 01.3)." 
            },
            { 
              title: "Monthly Progress Meetings Support", 
              text: "Providing logistics and secretariat support for progress meetings between employer and contractor. Billed \"per month\" (Item 01.5)." 
            },
            { 
              title: "Quality Control (QC) Transport", 
              text: "Providing and maintaining transport (e.g. microbus/car) for carrying test samples to labs. Billed \"per month\" (Item 01.10)." 
            }
          ]}
        />
      </div>
    }
    rightContent={
      <div className="space-y-4 flex flex-col justify-center h-full">
        <ClickReveal at={3} preset="scale">
          <SlideCallout variant="info" title="Billing Code Metrics Summary">
            <div className="p-3 bg-background border border-border rounded-lg text-xs font-mono space-y-2">
              <div className="flex justify-between border-b pb-1.5">
                <span className="font-sans text-muted-foreground">Item 01.3 (As-Builts)</span>
                <span className="font-bold text-primary">Lump Sum (LS)</span>
              </div>
              <div className="flex justify-between border-b pb-1.5">
                <span className="font-sans text-muted-foreground">Item 01.5 (Meetings)</span>
                <span className="font-bold text-primary">Per Month (PM)</span>
              </div>
              <div className="flex justify-between">
                <span className="font-sans text-muted-foreground">Item 01.10 (QC Trans)</span>
                <span className="font-bold text-primary">Per Month (PM)</span>
              </div>
            </div>
          </SlideCallout>
        </ClickReveal>
      </div>
    }
  />
);

// ============================================================================
// Slide 10: Physical Safety Budgeting
// ============================================================================
export const Slide10: React.FC = () => (
  <TwoColumnLayout
    title="1.5 Mandatory Health &amp; Safety Budgeting"
    bgVariant="default"
    leftWidth="48%"
    leftContent={
      <div className="space-y-4">
        <SlideParagraph title="Physical Safety Provisions">
          Modern public works contracts (including PWD and LGED) do not allow safety to be treated as a vague overhead percentage. Estimators must design, measure, and price specific safety structures.
        </SlideParagraph>
        
        <ClickReveal at={1}>
          <SlideCallout variant="danger" title="PWD Chapter 10 Mandates">
            Estimators must dedicate distinct BoQ line items to safety barriers and protective structures. These items are located in **Chapter 10 (Structural steel works, Sheet roofing and Safety canopy)**.
          </SlideCallout>
        </ClickReveal>
      </div>
    }
    rightContent={
      <div className="space-y-4 flex flex-col justify-center h-full">
        <ClickReveal at={2} preset="up">
          <div className="p-4 bg-muted/40 border border-border rounded-xl">
            <span className="block text-xs uppercase font-mono font-bold text-destructive mb-2">The Measurement Unit</span>
            <p className="text-xs text-muted-foreground leading-relaxed mb-3">
              Unlike general overhead margins, physical safety structures are measured and paid strictly in **square meters ($m^2$)** based on the actual outer envelope.
            </p>
            <div className="p-2 bg-background border border-destructive/20 rounded font-mono text-xs text-center text-destructive font-bold">
              Safety Pay Unit = Square Meter (m²)
            </div>
          </div>
        </ClickReveal>
      </div>
    }
  />
);

// ============================================================================
// Slide 11: Itemizing Site Safety Structures
// ============================================================================
export const Slide11: React.FC = () => {
  const [highlight, setHighlight] = useUrlSyncedState<
    'none' | 'canopy' | 'shed' | 'fencing'
  >('active_safety_highlight', 'none');

  return (
    <TwoColumnLayout
      title="1.6 Itemizing Site Safety Structures"
      bgVariant="default"
      leftWidth="45%"
      leftContent={
        <div className="space-y-3">
          <SlideParagraph variant="plain" className="text-xs text-muted-foreground mb-1">
            Click any safety item below to highlight its location and structural configuration in the construction site drawing.
          </SlideParagraph>

          <div className="space-y-2">
            <button
              onClick={() => setHighlight(highlight === 'canopy' ? 'none' : 'canopy')}
              className={`w-full p-2.5 text-left text-xs rounded-xl border transition-all ${
                highlight === 'canopy'
                  ? 'bg-amber-500/10 border-amber-500 font-bold text-amber-700 dark:text-amber-400'
                  : 'bg-muted/30 border-border hover:bg-muted/65 text-muted-foreground'
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span>🛡️ Safety Canopy (Chapter 10)</span>
                <span className="text-[9px] font-mono uppercase bg-amber-500/20 text-amber-700 dark:text-amber-400 px-1 rounded">m²</span>
              </div>
              <p className="text-[10px] font-light leading-relaxed">
                Truss of steel sections with 0.27mm CGI sheet flooring erected around the building perimeter to catch falling debris.
              </p>
            </button>

            <button
              onClick={() => setHighlight(highlight === 'shed' ? 'none' : 'shed')}
              className={`w-full p-2.5 text-left text-xs rounded-xl border transition-all ${
                highlight === 'shed'
                  ? 'bg-blue-500/10 border-blue-500 font-bold text-blue-700 dark:text-blue-400'
                  : 'bg-muted/30 border-border hover:bg-muted/65 text-muted-foreground'
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span>🚗 Safety Shed Over Driveway</span>
                <span className="text-[9px] font-mono uppercase bg-blue-500/20 text-blue-700 dark:text-blue-400 px-1 rounded">m²</span>
              </div>
              <p className="text-[10px] font-light leading-relaxed">
                CGI sheet shed at a 15-foot height erected specifically over driveways to shield vehicles and workers from vertical drops.
              </p>
            </button>

            <button
              onClick={() => setHighlight(highlight === 'fencing' ? 'none' : 'fencing')}
              className={`w-full p-2.5 text-left text-xs rounded-xl border transition-all ${
                highlight === 'fencing'
                  ? 'bg-red-500/10 border-red-500 font-bold text-red-700 dark:text-red-400'
                  : 'bg-muted/30 border-border hover:bg-muted/65 text-muted-foreground'
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span>🚧 Temporary Safety Fencing</span>
                <span className="text-[9px] font-mono uppercase bg-red-500/20 text-red-700 dark:text-red-400 px-1 rounded">m²</span>
              </div>
              <p className="text-[10px] font-light leading-relaxed">
                1.2m high fencing placed around the site periphery and slab punches to protect workers from falling off edges.
              </p>
            </button>
          </div>
        </div>
      }
      rightContent={
        <div className="h-full flex flex-col justify-center">
          <SiteSafetyDrawing activeHighlight={highlight} />
        </div>
      }
    />
  );
};
