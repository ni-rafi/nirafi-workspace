import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import {
  SlideParagraph,
  InteractiveCard,
  SlideCallout,
  ClickHighlight
} from '@/features/presentation/components/elements';
import { SteelCostAnalyzerSandbox } from '@/subjects/quantity-surveying/features';

// ============================================================================
// Slide: Costing Integration: Erection & Welding
// ============================================================================
export const CostingErectionSlide: React.FC = () => (
  <TwoColumnLayout
    title="4.1 Costing Integration: Erection &amp; Welding"
    bgVariant="default"
    leftWidth="45%"
    leftContent={
      <div className="space-y-4">
        <SlideParagraph title="Translating Tonnage to Cost">
          Once the total weight (tonnage) of the structure is calculated, the surveyor must translate materials into a final project budget.
        </SlideParagraph>

        <p className="text-xs text-muted-foreground leading-relaxed select-text">
          Material procurement represents only one part of the steel budget. Erecting, bolting, and welding the members requires specialized labor and heavy machinery.
        </p>

        <SlideCallout variant="warning" title="The 10% Erection Rule">
          <p className="text-xs leading-relaxed select-text">
            Standard detailed estimates apply a <ClickHighlight at={1} variant="paint">10% cost multiplier</ClickHighlight> on top of the raw steel material cost to account for:
            <br />• Site assembly cranes &amp; hoisting equipment.
            <br />• Field welding labor &amp; generator fuel.
            <br />• High-strength bolt tightening torque tools.
          </p>
        </SlideCallout>
      </div>
    }
    rightContent={
      <div className="space-y-4 flex flex-col justify-between h-full">
        <InteractiveCard title="Standard Cost Estimation Flowchart" variant="default" className="flex-1 select-text">
          <div className="space-y-3 font-mono text-[10px] leading-relaxed text-muted-foreground mt-2">
            <div className="p-2 bg-muted/40 rounded border border-border/40 text-center">
              <span className="font-sans font-bold text-foreground block">STEP 1: Aggregate Weights</span>
              Calculate Total Weight from Ledger (e.g. 5,000 kg)
            </div>
            <div className="text-center font-bold text-primary font-sans">↓</div>
            <div className="p-2 bg-muted/40 rounded border border-border/40 text-center">
              <span className="font-sans font-bold text-foreground block">STEP 2: Raw Material Cost</span>
              Total Weight × Base Rate (e.g. 5,000 kg × 120 BDT = 600,000 BDT)
            </div>
            <div className="text-center font-bold text-primary font-sans">↓</div>
            <div className="p-2 bg-muted/40 rounded border border-border/40 text-center">
              <span className="font-sans font-bold text-foreground block">STEP 3: Add Erection Markup (10%)</span>
              Erection Cost = 600,000 BDT × 10% = 60,000 BDT
            </div>
            <div className="text-center font-bold text-primary font-sans">↓</div>
            <div className="p-2 bg-primary/10 rounded border border-primary/20 text-center text-primary font-bold">
              Total Budgeted Cost = 660,000 BDT
            </div>
          </div>
        </InteractiveCard>
      </div>
    }
  />
);

// ============================================================================
// Slide: PWD Cost Rate Analyzer & ASTM Steel Grades
// ============================================================================
export const PwdGradesCostSlide: React.FC = () => (
  <SteelCostAnalyzerSandbox />
);
