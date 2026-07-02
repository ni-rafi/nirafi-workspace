import React from 'react';
import { SlideParagraph, SlideList, InteractiveCard } from '@/features/presentation/components/elements';
import TwoColumnLayout from '@/shared/layouts/TwoColumnLayout';

export const HomeworkSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Independent Homework Practice"
      leftWidth="50%"
      leftContent={
        <div className="flex flex-col gap-4 text-left select-text">
          <SlideList
            title="Assigned Exercises"
            description="Solve these targeted textbook exercise problems to master compound geometries and sizing calculations."
            revealMode="each-click"
            items={[
              { text: "Ferdinand L. Singer (Strength of Materials): Problems 551 – 558.", revealAt: 1 },
              { text: "R.S. Khurmi (Strength of Materials): Examples 14.10 – 14.17; Exercises 14.2, 15.1.", revealAt: 2 },
            ]}
          />
          <SlideParagraph variant="success" className="text-[10px] my-1 font-bold">
            {"Remember, homework is not a suggestion for any kind of examination!"}
          </SlideParagraph>
        </div>
      }
      rightContent={
        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center h-full min-h-[250px] w-full text-[10px] font-mono leading-relaxed text-muted-foreground">
          <InteractiveCard title="Practice Guidelines" className="w-full text-left">
            <div className="space-y-1.5 text-xs text-foreground font-mono">
              <p>1. Draw the FBD first.</p>
              <p>2. Locate Neutral Axis centroid.</p>
              <p>3. Calculate Inertia via Parallel Axis Theorem.</p>
              <p>4. Check limits at top and bottom fibers.</p>
            </div>
          </InteractiveCard>
        </div>
      }
    />
  );
};

export default HomeworkSlide;
