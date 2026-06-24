import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import { 
  SlideParagraph, 
  SlideCallout, 
  ClickReveal 
} from '@/features/presentation/components/elements';
import { useUrlSyncedState } from '@/features/presentation/hooks/useUrlSyncedState';
import { AnalysisOfRatesLedger, CompleteEstimateTreeDrawing } from '../../../../features';

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
// Slide 7: Defining the "Complete Estimate"
// ============================================================================
export const Slide7: React.FC = () => (
  <TwoColumnLayout
    title="1.5 Defining the Complete Estimate"
    bgVariant="default"
    leftWidth="45%"
    leftContent={
      <div className="space-y-4">
        <SlideParagraph title="The Owner's Macro View">
          A common beginner error is assuming the "Structural Cost" (from the contractor's BoQ) represents the entire project budget. A complete estimate accounts for all capital requirements from planning to delivery.
        </SlideParagraph>
        
        <ClickReveal at={1}>
          <SlideCallout variant="warning" title="Syllabus Boundary Concept">
            The Complete Estimate is the sum of land purchase, legal vetting, permits, design consulting fees, and the physical building structure.
          </SlideCallout>
        </ClickReveal>
      </div>
    }
    rightContent={
      <div className="space-y-4 flex flex-col justify-center h-full">
        <ClickReveal at={2} preset="up">
          <div className="space-y-2.5 text-xs">
            <div className="p-3 bg-muted/40 border border-border rounded-lg flex justify-between items-center">
              <span className="font-semibold">🏛️ Land &amp; Deeds</span>
              <span className="text-muted-foreground font-mono">Owner Acquisition</span>
            </div>
            <div className="p-3 bg-muted/40 border border-border rounded-lg flex justify-between items-center">
              <span className="font-semibold">⚖️ Legal Vetting</span>
              <span className="text-muted-foreground font-mono">Regulatory &amp; Contracts</span>
            </div>
            <div className="p-3 bg-muted/40 border border-border rounded-lg flex justify-between items-center">
              <span className="font-semibold">📐 Professional Fees</span>
              <span className="text-muted-foreground font-mono">Architects &amp; Soils Lab</span>
            </div>
          </div>
        </ClickReveal>
      </div>
    }
  />
);

// ============================================================================
// Slide 8: The Complete Estimate Cost Tree
// ============================================================================
export const Slide8: React.FC = () => {
  const [highlight, setHighlight] = useUrlSyncedState<
    'land' | 'legal' | 'permit' | 'consulting' | 'structure' | 'none'
  >('active_estimate_highlight', 'none');

  return (
    <FullWidthLayout
      title="1.6 The Complete Estimate Cost Tree"
      bgVariant="default"
    >
      <div className="flex flex-col space-y-4 h-full">
        <SlideParagraph variant="plain" className="text-xs text-muted-foreground">
          Click branches of the tree below to focus on their constituent owner lifecycle costs.
        </SlideParagraph>

        <div className="flex-1 min-h-0 overflow-y-auto">
          <CompleteEstimateTreeDrawing
            activeHighlight={highlight}
            onHighlightChange={setHighlight}
          />
        </div>
      </div>
    </FullWidthLayout>
  );
};

// ============================================================================
// Slide 15: Macro Budgeting: Structural Cost Multipliers
// ============================================================================
export const Slide15: React.FC = () => (
  <TwoColumnLayout
    title="3.2 Macro Budgeting: Structural Multipliers"
    bgVariant="default"
    leftWidth="48%"
    leftContent={
      <div className="space-y-4">
        <SlideParagraph title="Percentage-Based Planning">
          When drawing details do not exist, preliminary budgeting relies on structural cost percentages. Historically, MEP and site preparation additions scale proportionally with the core structural concrete volume and footprint.
        </SlideParagraph>
        
        <ClickReveal at={1}>
          <div className="bg-muted/40 p-3 rounded-lg border border-border text-[11px] leading-relaxed">
            <span className="block font-bold text-foreground mb-1">Standard Sessional Multipliers:</span>
            <p>• Water Supply &amp; Sanitary: <span className="font-bold text-primary">7.5% to 8.0%</span></p>
            <p>• Electrification Works: <span className="font-bold text-primary">6.0% to 7.5%</span></p>
            <p>• Site Roads &amp; Lawns: <span className="font-bold text-primary">5.0%</span></p>
            <p>• Architectural Features: <span className="font-bold text-primary">1.0%</span></p>
          </div>
        </ClickReveal>
      </div>
    }
    rightContent={
      <div className="space-y-4 flex flex-col justify-center h-full">
        <ClickReveal at={2} preset="fade-in">
          <SlideCallout variant="danger" title="Risk &amp; Market Allowances">
            <p className="text-xs text-muted-foreground leading-relaxed mb-2">
              On top of functional additions, risk allocations must be layered at the project portfolio level to safeguard capital:
            </p>
            <div className="p-3 bg-background border border-destructive/20 rounded-lg text-xs font-mono">
              <div className="flex justify-between border-b pb-1 mb-1">
                <span>Contingencies (Unforeseen)</span>
                <span className="font-bold text-red-500">3% to 5%</span>
              </div>
              <div className="flex justify-between">
                <span>Inflation (Escalation Rule)</span>
                <span className="font-bold text-red-500">5.0%</span>
              </div>
            </div>
            <p className="text-[10px] text-muted-foreground mt-2 italic">
              * Note: Inflation/Escalation values are legally set in public projects by ministries to prevent budget overrun.
            </p>
          </SlideCallout>
        </ClickReveal>
      </div>
    }
  />
);
