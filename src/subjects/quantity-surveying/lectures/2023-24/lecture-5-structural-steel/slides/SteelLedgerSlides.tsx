import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import {
  SlideParagraph,
  InteractiveCard,
  SlideCallout
} from '@/features/presentation/components/elements';
import { SteelLedgerSandbox } from '@/subjects/quantity-surveying/features';

// ============================================================================
// Slide: The Steel Calculation Ledger
// ============================================================================
export const SteelLedgerSlide: React.FC = () => (
  <TwoColumnLayout
    title="3.8 The Steel Calculation Ledger"
    bgVariant="default"
    leftWidth="45%"
    leftContent={
      <div className="space-y-4">
        <SlideParagraph title="Aggregating by Weight (Tonnage)">
          Concrete estimates deal in volumetric cubic meters, but steel works are estimated and paid by **total weight** (kg or tonnes) based on Standard Steel Tables.
        </SlideParagraph>

        <p className="text-xs text-muted-foreground leading-relaxed select-text">
          Estimators compile quantities using a dedicated ledger format that incorporates standard section unit weights rather than standard length/width/height entries.
        </p>

        <SlideCallout variant="info" title="The 7-Column Log Pattern">
          <div className="text-[10px] leading-relaxed space-y-1 select-text">
            <p>1. <strong>Member Name</strong>: Isolated structure member category.</p>
            <p>2. <strong>Shape of Section</strong>: Standard symbol (e.g. angle, channel, plate).</p>
            <p>3. <strong>Design Section</strong>: Section details (e.g. L 75×75×6 mm).</p>
            <p>4. <strong>Quantity</strong>: Number of identical pieces.</p>
            <p>5. <strong>Length</strong>: Individual member cut length.</p>
            <p>6. <strong>Unit Weight</strong>: Weight per unit length from standard tables (kg/m).</p>
            <p>7. <strong>Total Weight</strong>: Quantity × Length × Unit Weight.</p>
          </div>
        </SlideCallout>
      </div>
    }
    rightContent={
      <div className="space-y-4 flex flex-col justify-between h-full">
        <InteractiveCard title="Standard Ledger Table Example" variant="default" className="flex-1 select-text">
          <div className="overflow-x-auto">
            <table className="w-full text-[9px] font-mono text-left border-collapse">
              <thead>
                <tr className="border-b border-border/50 text-muted-foreground font-bold">
                  <th className="pb-1">Member</th>
                  <th className="pb-1 text-center">Qty</th>
                  <th className="pb-1 text-right">Length</th>
                  <th className="pb-1 text-right">Unit Wt</th>
                  <th className="pb-1 text-right">Total Wt</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/30">
                  <td className="py-1.5 font-sans font-semibold">Top Chord</td>
                  <td className="py-1.5 text-center">4</td>
                  <td className="py-1.5 text-right">6.500 m</td>
                  <td className="py-1.5 text-right">6.80 kg/m</td>
                  <td className="py-1.5 text-right font-bold text-primary">176.80 kg</td>
                </tr>
                <tr className="border-b border-border/30">
                  <td className="py-1.5 font-sans font-semibold">Main Tie</td>
                  <td className="py-1.5 text-center">2</td>
                  <td className="py-1.5 text-right">12.000 m</td>
                  <td className="py-1.5 text-right">5.70 kg/m</td>
                  <td className="py-1.5 text-right font-bold text-primary">136.80 kg</td>
                </tr>
                <tr>
                  <td className="py-1.5 font-sans font-semibold">Purlins</td>
                  <td className="py-1.5 text-center">10</td>
                  <td className="py-1.5 text-right">6.000 m</td>
                  <td className="py-1.5 text-right">9.60 kg/m</td>
                  <td className="py-1.5 text-right font-bold text-primary">576.00 kg</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 p-2 bg-primary/5 rounded border border-primary/20 text-center font-bold text-xs font-mono">
            Total Weight = 889.60 kg
          </div>
        </InteractiveCard>
      </div>
    }
  />
);

// ============================================================================
// Slide: Steel Ledger Worked Example Sandbox
// ============================================================================
export const SteelLedgerSandboxSlide: React.FC = () => (
  <SteelLedgerSandbox />
);
