import React from 'react';
import { TopicDividerLayout } from '@/shared/layouts/TopicDividerLayout';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import { 
  SlideParagraph, 
  SlideList, 
  SlideCallout, 
  ClickReveal,
  InteractiveCard,
  ParameterSlider,
  CalculationOutput
} from '@/features/presentation/components/elements';
import { SectionDrawingCanvas } from '@/features/building-drawing/components/SectionDrawingCanvas';
import { useUrlSyncedState } from '@/features/presentation/hooks/useUrlSyncedState';
import { CrossSectionSpec } from '@/features/building-drawing/types/sectionSchema';
import { LectureCover } from '@/shared/layouts/LectureCover';
import { SlideProps } from '@/features/presentation/components/slides/SlideRenderer';
import { QuizCardOrchestrator } from '@/features/quiz';

// ============================================================================
// Slide 1: Main Lecture Cover (TitleV2Layout representation)
// ============================================================================
export const Slide1: React.FC<SlideProps> = (props) => (
  <LectureCover {...props} />
);

// ============================================================================
// Slide 1B: Section 1 Title Divider
// ============================================================================
export const Slide1B: React.FC = () => (
  <TopicDividerLayout
    topicNumber="01"
    title="Fundamentals of Steel Reinforcement"
    subtitle="Rebar Basics, Standard Nomenclature, and Clear Cover Rules"
  />
);


// ============================================================================
// Slide 2: Rebar Basics & The 12-Meter Rule
// ============================================================================
export const Slide2: React.FC = () => (
  <TwoColumnLayout
    title="1.1 Rebar Nomenclature & Commercial Standards"
    bgVariant="default"
    leftWidth="50%"
    leftContent={
      <div className="space-y-4">
        <SlideParagraph variant="default" title="Standard Grades & Nomenclature">
          Reinforcement steel is specified by its yield strength. When reading structural drawings, you must identify both the size and the grade.
        </SlideParagraph>
        
        <SlideList
          revealMode="each-click"
          items={[
            { 
              title: "Common Yield Grades", 
              text: "Grade 40, Grade 60, Grade 75 (Higher grade = higher tensile yield strength)." 
            },
            { 
              title: "Diameter Tracking", 
              text: "Recorded in millimeters (e.g., 10mm, 12mm, 16mm, 20mm, 25mm)." 
            },
            { 
              title: "Local Market Translation", 
              text: "In the Bangladesh field, labor uses 'Suta'. (1 Suta = 1/8 inch ≈ 3.175mm). E.g., 4 Suta = 12mm bar." 
            }
          ]}
        />
      </div>
    }
    rightContent={
      <ClickReveal at={1} preset="fade-in">
        <div className="flex flex-col h-full justify-center">
          <SlideCallout variant="warning" title="🚨 The Commercial Length Constraint">
            <p className="mb-4 text-xs leading-relaxed">
              Steel bars are commercially manufactured and transported to the site in standard fixed lengths of:
            </p>
            <div className="text-4xl font-black text-center text-amber-600 dark:text-amber-500 my-3 font-mono">
              12 Meters <span className="text-lg text-muted-foreground font-normal">(40 ft)</span>
            </div>
            <p className="text-xs leading-relaxed">
              <strong>Golden Rule of Estimation:</strong> If any structural span (like a continuous tie beam) exceeds 12 meters, you <em>must</em> mathematically add a <strong>Lap Length</strong> to splice two bars together.
            </p>
          </SlideCallout>
        </div>
      </ClickReveal>
    }
  />
);

// ============================================================================
// Slide 3: Clear Cover Rules
// ============================================================================
export const Slide3: React.FC = () => (
  <TwoColumnLayout
    title="1.2 Standard Clear Cover Rules"
    bgVariant="default"
    leftWidth="45%"
    leftContent={
      <div className="space-y-4">
        <SlideParagraph title="What is Clear Cover?">
          The physical distance between the outer surface of the concrete and the outermost edge of the reinforcement steel (usually the stirrup/tie).
        </SlideParagraph>
        
        <ClickReveal at={1}>
          <SlideCallout variant="info" title="Structural Purpose">
            Provides crucial fire resistance and protects the steel core from groundwater and atmospheric corrosion.
          </SlideCallout>
        </ClickReveal>
      </div>
    }
    rightContent={
      <ClickReveal at={2} preset="up">
        <SlideParagraph title="Standard Cover Allowances (Code Minimums)" variant="plain">
          <SlideList
            revealMode="each-click"
            items={[
              { 
                title: "Footings & Foundations", 
                text: <span className="text-sm font-bold text-primary">50 mm - 75 mm</span>,
                icon: "Layers"
              },
              { 
                title: "Columns (Verticals)", 
                text: <span className="text-sm font-bold text-primary">40 mm</span> 
              },
              { 
                title: "Beams (Horizontals)", 
                text: <span className="text-sm font-bold text-primary">25 mm</span> 
              },
              { 
                title: "Floor Slabs", 
                text: <span className="text-sm font-bold text-primary">15 mm - 20 mm</span>
              }
            ]}
          />
        </SlideParagraph>
      </ClickReveal>
    }
  />
);

// ============================================================================
// Slide 3B: Clear Cover Sandbox
// ============================================================================
export const Slide3B: React.FC = () => {
  const [width, setWidth] = useUrlSyncedState<number>('cc_beam_width', 300);
  const [depth, setDepth] = useUrlSyncedState<number>('cc_beam_depth', 450);
  const [cover, setCover] = useUrlSyncedState<number>('cc_beam_cover', 25);
  const [barDia, setBarDia] = useUrlSyncedState<number>('cc_beam_bar_dia', 16);

  const spec: CrossSectionSpec = {
    id: 'B-Sandbox',
    componentType: 'beam',
    width: width,
    depth: depth,
    clearCover: cover,
    longitudinalLayers: [
      { barDiameter: barDia, count: 3, side: 'top' },
      { barDiameter: barDia, count: 3, side: 'bottom' }
    ],
    stirrups: {
      diameter: 10,
      spacing: 150
    }
  };

  const effectiveDepth = depth - cover - 10 - barDia / 2; // in mm

  return (
    <TwoColumnLayout
      title="Clear Cover Sandbox Model"
      bgVariant="default"
      leftWidth="45%"
      leftContent={
        <InteractiveCard title="Cross-Section Parameters">
          <div className="space-y-3 mb-4">
            <ParameterSlider
              label="Beam Width (B)"
              min={250}
              max={450}
              step={10}
              value={width}
              onChange={setWidth}
              unit=" mm"
            />
            <ParameterSlider
              label="Beam Depth (H)"
              min={300}
              max={600}
              step={25}
              value={depth}
              onChange={setDepth}
              unit=" mm"
            />
            <ParameterSlider
              label="Clear Cover"
              min={15}
              max={75}
              step={5}
              value={cover}
              onChange={setCover}
              unit=" mm"
            />
            <ParameterSlider
              label="Bar Diameter"
              min={10}
              max={25}
              step={2}
              value={barDia}
              onChange={setBarDia}
              unit=" mm"
            />
          </div>

          <div className="border-t border-border/40 pt-2.5">
            <CalculationOutput 
              title="Effective Depth (d)" 
              value={`${effectiveDepth.toFixed(0)}`} 
              unit="mm"
              subtitle="Depth minus cover, stirrup, and half rebar diameter"
            />
          </div>
        </InteractiveCard>
      }
      rightContent={
        <div className="w-full h-full flex items-center justify-center">
          <SectionDrawingCanvas spec={spec} isActive={true} />
        </div>
      }
    />
  );
};

// ============================================================================
// Slide 3C: Quiz 1 (Clear Cover MCQ)
// ============================================================================
export const Slide3C: React.FC = () => {
  return (
    <FullWidthLayout title="Clear Cover Checkpoint Quiz">
      <div className="w-full max-w-[720px] mx-auto mt-6">
        <QuizCardOrchestrator
          quizId="qs_2023_lec4_q1"
          questionText="A structural column of size 400x400 mm has a clear cover of 40 mm. It is reinforced with longitudinal bars of 20 mm diameter and 10 mm stirrups. If there are exactly 2 longitudinal bars on one face, what is the center-to-center distance between them?"
          quizType="multiple-choice"
          options={['320 mm', '280 mm', '300 mm', '260 mm']}
        />
      </div>
    </FullWidthLayout>
  );
};
