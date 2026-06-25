import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import { 
  SlideParagraph, 
  SlideCallout, 
  ClickReveal,
  SlideList
} from '@/features/presentation/components/elements';
import { AnalysisOfRatesLedger } from '../../../../features';

// ============================================================================
// Slide 3: Analysis of Rates: Building the Unit Price
// ============================================================================
export const Slide3: React.FC = () => (
  <TwoColumnLayout
    title="1.2 Rate Analysis: Building the Unit Price"
    bgVariant="default"
    leftWidth="48%"
    leftContent={
      <div className="space-y-4">
        <SlideParagraph title="Beyond the Schedule of Rates">
          While the PWD Schedule of Rates (SOR) provides standard pricing for common items, any custom architectural feature, localized material resource shift, or specialized project scope requires generating a unit rate from scratch.
        </SlideParagraph>
        
        <ClickReveal at={1}>
          <SlideCallout variant="info" title="The Estimator's Core Question">
            How is a rate built? We must isolate the direct components (materials, labor, machinery) and load them with contract overheads and profits to create a single compound unit rate.
          </SlideCallout>
        </ClickReveal>
      </div>
    }
    rightContent={
      <ClickReveal at={2} preset="fade-in">
        <div className="h-full flex flex-col justify-center space-y-4">
          <div className="p-4 bg-muted/40 border border-border rounded-xl">
            <span className="block text-xs uppercase font-mono font-bold text-indigo-600 mb-2">Analysis Objectives</span>
            <ul className="text-xs text-muted-foreground space-y-2">
              <li className="flex items-start">
                <span className="text-indigo-600 mr-2 font-bold">•</span>
                Ensure cost recovery for all indirect execution costs.
              </li>
              <li className="flex items-start">
                <span className="text-indigo-600 mr-2 font-bold">•</span>
                Incorporate overhead risks (site safety, utility bills).
              </li>
              <li className="flex items-start">
                <span className="text-indigo-600 mr-2 font-bold">•</span>
                Establish a legally defensible and auditable unit price.
              </li>
            </ul>
          </div>
        </div>
      </ClickReveal>
    }
  />
);

// ============================================================================
// Slide 4: The 5 Components of a Unit Rate
// ============================================================================
export const Slide4: React.FC = () => (
  <FullWidthLayout
    title="1.3 Interactive Rate Ledger: The 5 Pillars"
    bgVariant="default"
  >
    <div className="flex flex-col space-y-4 h-full">
      <SlideParagraph variant="plain" className="text-xs text-muted-foreground select-text">
        Adjust materials, labor, and markup sliders to see how the compound rate builds dynamically through subtotaling, overhead additions, and contractor profit compounding.
      </SlideParagraph>
      
      <div className="flex-1 min-h-0 overflow-y-auto">
        <AnalysisOfRatesLedger />
      </div>
    </div>
  </FullWidthLayout>
);

// ============================================================================
// Slide 5: Micro-Rate Additions: Water Charges & Contingencies (NEW)
// ============================================================================
export const Slide5: React.FC = () => (
  <TwoColumnLayout
    title="1.4 Micro-Rate Additions: Water Charges &amp; Contingencies"
    bgVariant="default"
    leftWidth="48%"
    leftContent={
      <div className="space-y-4">
        <SlideParagraph title="Detailed Cost Loading">
          In building unit rate analyses, estimators must add localized allowances to the raw materials and labor components before compound profit percentages are applied.
        </SlideParagraph>
        
        <SlideList
          revealMode="each-click"
          items={[
            { 
              title: "Water Charges (1.0%)", 
              text: "Strictly added to the raw cost of materials and labor for wet trades (like concrete, BFS, and masonry) to cover water delivery/pumping." 
            },
            { 
              title: "Petty Supervision & Contingencies", 
              text: "Standard PWD allowances of 3.0% to 5.0% added to the base estimate to absorb minor unforeseen items." 
            }
          ]}
        />
      </div>
    }
    rightContent={
      <div className="space-y-4 flex flex-col justify-center h-full">
        <ClickReveal at={2} preset="fade-in">
          <SlideCallout variant="warning" title="Analysis Sequence Rule">
            <p className="text-xs text-muted-foreground leading-relaxed mb-3">
              Always apply the 1.0% water charge to the subtotal of (Materials + Labor) **before** applying contractor overheads and profit margins:
            </p>
            <div className="p-3 bg-background border border-border rounded-lg text-xs font-mono">
              <div className="flex justify-between border-b pb-1 mb-1">
                <span>1. Direct Cost</span>
                <span>Mat + Lab + Equip</span>
              </div>
              <div className="flex justify-between border-b pb-1 mb-1 text-amber-600">
                <span>2. Water Charge</span>
                <span>+ 1% × (Mat + Lab)</span>
              </div>
              <div className="flex justify-between font-bold text-primary">
                <span>3. Gross Base</span>
                <span>Subtotal + Water Chg</span>
              </div>
            </div>
          </SlideCallout>
        </ClickReveal>
      </div>
    }
  />
);

// ============================================================================
// Slide 12: Laboratory Testing Budgets (NEW)
// ============================================================================
export const Slide12: React.FC = () => (
  <TwoColumnLayout
    title="1.7 Laboratory Testing Budgets"
    bgVariant="default"
    leftWidth="50%"
    leftContent={
      <div className="space-y-4">
        <SlideParagraph title="Concrete &amp; Material Test Exclusions">
          A common budgeting error is assuming that the concrete volumetric unit rates (e.g. per cubic meter of RCC) cover quality assurance testing.
        </SlideParagraph>
        
        <SlideList
          revealMode="each-click"
          items={[
            { 
              title: "The Volumetric Rate Exclusion", 
              text: "The PWD Schedule of Rates explicitly states that standard RCC volumetric rates exclude laboratory test fees. They must be billed as separate items." 
            },
            { 
              title: "Mandatory Quality Assurance Tests", 
              text: "Estimators must dedicate separate line items in the BoQ for mandatory laboratory tests carried out at authorized testing labs like BUET." 
            }
          ]}
        />
      </div>
    }
    rightContent={
      <div className="space-y-4 flex flex-col justify-center h-full">
        <ClickReveal at={2} preset="up">
          <SlideCallout variant="info" title="Standard Laboratory BoQ Items">
            <p className="text-xs text-muted-foreground leading-relaxed mb-3">
              Students must ensure the complete project budget contains items for:
            </p>
            <ul className="text-xs space-y-2.5 font-semibold text-primary">
              <li className="flex items-center">
                <span className="mr-2">🔬</span> Water Testing (pH, Chlorine, Arsenic, Iron)
              </li>
              <li className="flex items-center">
                <span className="mr-2">🔬</span> Soil Testing (Void ratio, Consolidation, Direct Shear)
              </li>
              <li className="flex items-center">
                <span className="mr-2">🔬</span> Concrete Cylinder Compression Tests
              </li>
            </ul>
          </SlideCallout>
        </ClickReveal>
      </div>
    }
  />
);
