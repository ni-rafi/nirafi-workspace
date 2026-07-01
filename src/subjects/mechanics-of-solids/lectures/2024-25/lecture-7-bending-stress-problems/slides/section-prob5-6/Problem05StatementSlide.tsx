import React from 'react';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { SlideParagraph, SlideBullet, InteractiveCard } from '@/features/presentation/components/elements';
import { HelpCircle } from 'lucide-react';

export const Problem05StatementSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Problem 05: Cover-Plate Retrofitting"
      leftWidth="55%"
      leftContent={
        <div className="flex flex-col h-full justify-between gap-4 text-left select-text">
          <div>
            <div className="flex items-center space-x-1.5 text-indigo-500 font-bold text-[10px] uppercase mb-1">
              <HelpCircle className="h-4.5 w-4.5" />
              <span>Diagnostic Reinforcement challenge</span>
            </div>
            <SlideParagraph variant="plain" className="text-xs text-foreground font-semibold leading-relaxed">
              {"A baseline rolled steel joist has a depth of 240 mm and moment of inertia I_xx = 120 × 10⁶ mm⁴. It is reinforced symmetrically by welding a cover plate 200 mm wide and 15 mm thick to both top and bottom flanges. Find the percentage increase in its allowable UDL load capacity over a simply supported span of 8 m if normal stress cannot exceed 140 MPa."}
            </SlideParagraph>
          </div>
          <div className="space-y-1 my-1">
            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest block mb-0.5">Identified Parameters</span>
            <SlideBullet text="Baseline Core: I_0 = 120 × 10⁶ mm⁴, depth d = 240 mm." />
            <SlideBullet text="Cover Plates: b_p = 200 mm, t_p = 15 mm." />
            <SlideBullet text="Bending limits: σ_allow ≤ 140 MPa." />
          </div>
        </div>
      }
      rightContent={
        <div className="flex flex-col justify-center h-full w-full">
          <InteractiveCard title="Consulting Context" variant="default" spacing="space-y-3">
            <SlideParagraph className="text-xs leading-relaxed text-muted-foreground">
              {"Welding steel plates to extreme flanges increases Inertia (I) quadratically via parallel-axis transfer, but also increases the extreme fiber distance y_max."}
            </SlideParagraph>
            <SlideParagraph className="text-xs leading-relaxed text-muted-foreground font-bold">
              {"We must analyze the resulting net Section Modulus (Z) increase!"}
            </SlideParagraph>
          </InteractiveCard>
        </div>
      }
    />
  );
};

export default Problem05StatementSlide;
