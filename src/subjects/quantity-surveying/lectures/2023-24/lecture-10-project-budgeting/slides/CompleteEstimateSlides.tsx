import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import { 
  SlideParagraph, 
  SlideCallout, 
  ClickReveal,
  SlideList
} from '@/features/presentation/components/elements';
import { useUrlSyncedState } from '@/features/presentation/hooks/useUrlSyncedState';
import { CompleteEstimateTreeDrawing } from '../../../../features';

// ============================================================================
// Slide 13: Defining the "Complete Estimate"
// ============================================================================
export const Slide13: React.FC = () => (
  <TwoColumnLayout
    title="1.8 Defining the Complete Estimate"
    bgVariant="default"
    leftWidth="45%"
    leftContent={
      <div className="space-y-4">
        <SlideParagraph title="The Owner's Macro View">
          A common beginner error is assuming the &quot;Structural Cost&quot; (from the contractor&apos;s BoQ) represents the entire project budget. A complete estimate accounts for all capital requirements from planning to delivery.
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
// Slide 14: The Complete Estimate Cost Tree
// ============================================================================
export const Slide14: React.FC = () => {
  const [highlight, setHighlight] = useUrlSyncedState<
    'land' | 'legal' | 'permit' | 'consulting' | 'structure' | 'none'
  >('active_estimate_highlight', 'none');

  return (
    <FullWidthLayout
      title="1.9 The Complete Estimate Cost Tree"
      bgVariant="default"
    >
      <div className="flex flex-col space-y-4 h-full">
        <SlideParagraph variant="plain" className="text-xs text-muted-foreground">
          Click branches of the tree below to focus on their constituent owner lifecycle costs. Note the addition of Work-Charged Establishment (1.5% - 2.0%) under the structural cost node.
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
// Slide 15: Permitting Fees & Owner Costs (NEW)
// ============================================================================
export const Slide15: React.FC = () => (
  <TwoColumnLayout
    title="1.10 Permitting Fees &amp; Owner Costs"
    bgVariant="default"
    leftWidth="48%"
    leftContent={
      <div className="space-y-4">
        <SlideParagraph title="Utility Permitting &amp; Regulatory Fees">
          Owners must allocate specific budget lines for permit fees. The contractor&apos;s structural BoQ does not cover utility hookups or municipal approvals, which are paid directly by the owner.
        </SlideParagraph>
        
        <SlideList
          revealMode="each-click"
          items={[
            { 
              title: "Utility Permit Fees", 
              text: "Includes official fees for securing construction water and electricity grid hookups from concerned local authorities." 
            },
            { 
              title: "Professional &amp; Lab Fees", 
              text: "Covers architectural design, structural simulation, soil testing labs, and independent site QA supervision." 
            },
            { 
              title: "Legal Vetting Stamps", 
              text: "Fees for regulatory vetting, stamp duties, and legal registration of contract agreements." 
            }
          ]}
        />
      </div>
    }
    rightContent={
      <div className="space-y-4 flex flex-col justify-center h-full">
        <ClickReveal at={3} preset="fade-in">
          <SlideCallout variant="info" title="The Work-Charged Establishment Buffer">
            <p className="text-xs text-muted-foreground leading-relaxed mb-3">
              Older manuals define a standard percentage buffer added to the Complete Estimate for temporary site staff:
            </p>
            <div className="p-4 bg-background border border-border rounded-xl space-y-2 text-xs font-mono">
              <div className="flex justify-between border-b pb-1 font-bold">
                <span>Buffer Rate:</span>
                <span className="text-primary">1.5% to 2.0%</span>
              </div>
              <div className="text-muted-foreground text-[10px] leading-relaxed">
                👉 Used exclusively to fund temporary on-site watchmen, guards, and site security personnel during construction.
              </div>
            </div>
            <p className="text-[10px] text-muted-foreground mt-3 italic">
              * Note: Work-charged staff are not part of the contractor&apos;s permanent overhead; they scale directly with project duration.
            </p>
          </SlideCallout>
        </ClickReveal>
      </div>
    }
  />
);

// ============================================================================
// Slide 22: Macro Budgeting: Structural Cost Multipliers
// ============================================================================
export const Slide22: React.FC = () => (
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
