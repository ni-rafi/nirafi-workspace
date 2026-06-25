import React from 'react';
import { TopicDividerLayout } from '@/shared/layouts/TopicDividerLayout';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import { ThankYouLayout } from '@/shared/layouts/ThankYouLayout';
import { QuizCardOrchestrator } from '@/features/quiz';
import { parameterResolver } from '@/features/quiz/utils/parameterResolver';
import { SlideProps } from '@/features/presentation/components/slides/SlideRenderer';
import {
  SlideParagraph,
  SlideList,
  SlideCallout,
  ClickReveal,
  ClickHighlight,
  InteractiveCard,
  SlideBadge
} from '@/features/presentation/components/elements';

// ============================================================================
// Slide 13: Section Divider
// ============================================================================
export const Slide13: React.FC = () => (
  <TopicDividerLayout
    topicNumber="06"
    title="Studio Directive &amp; Measurement Rules"
    description="Measurement Precision, Trade Segregation, and Course Outlines"
  />
);

// ============================================================================
// Slide 14: Trades Segregation & Measurement Rules
// ============================================================================
export const Slide14: React.FC = () => {
  return (
    <TwoColumnLayout
      title="6.1 Trades Segregation &amp; Measurement Rules"
      bgVariant="default"
      leftWidth="50%"
      leftContent={
        <div className="space-y-4">
          <SlideParagraph title="Separate Sub-Heads for Earthwork">
            Excavating (cutting) and filling (embankment) represent separate cost items and must not be lumped together in the Bill of Quantities (BoQ).
          </SlideParagraph>
          <SlideList
            revealMode="each-click"
            variant="plain"
            items={[
              { 
                title: "Excavation/Cutting Sub-Head", 
                text: "Refers to clearing natural earth to construct sub-grade channels. Soil handles are different, measured in Cubic Meter (m³)." 
              },
              { 
                title: "Filling/Embankment Sub-Head", 
                text: "Refers to importing, depositing, watering, and rolling soil to build platforms above ground. Billed in Cubic Meter (m³)." 
              }
            ]}
          />
        </div>
      }
      rightContent={
        <ClickReveal at={2} preset="up">
          <div className="h-full flex flex-col justify-center">
            <SlideCallout variant="success" title="Standard PWD Measurement Units Summary">
              <p className="mb-3 text-xs text-muted-foreground font-semibold font-sans">
                Apply standard PWD measurement precision values:
              </p>
              <SlideList
                revealMode="none"
                items={[
                  { 
                    title: "Dimension Measurements", 
                    text: <span>Measure on-site lengths, widths, and heights to exactly <span className="text-amber-500 font-bold">2 decimal places</span>.</span> 
                  },
                  { 
                    title: "Calculated Quantities (BoQ)", 
                    text: <span>Write all final volumes/areas in sessional sheets rounded to exactly <span className="text-primary font-bold">3 decimal places</span>.</span> 
                  },
                  { 
                    title: "Transit Lead/Lift Margins", 
                    text: <span>Apply PWD extra lead rates per 30m stage and lift rates per 1.5m stage.</span> 
                  }
                ]}
              />
              <p className="text-[10px] text-muted-foreground mt-4 border-t pt-2 italic">
                * Rule of Thumb: Final billing numbers in BoQs must use <ClickHighlight at={3} variant="bold" className="text-emerald-500">toFixed(3)</ClickHighlight> to prevent float leaks.
              </p>
            </SlideCallout>
          </div>
        </ClickReveal>
      }
    />
  );
};

// ============================================================================
// Slide: Submission Directives Slide (Slide 30)
// ============================================================================
export const SubmissionDirectivesSlide: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Lab Report 8: Submission Directives"
      bgVariant="default"
      leftWidth="50%"
      leftContent={
        <div className="flex flex-col gap-4">
          <InteractiveCard title="Submission Rules">
            <SlideList
              revealMode="none"
              variant="plain"
              items={[
                {
                  icon: "📝",
                  text: (
                    <span>
                      <strong>Individual Submissions:</strong> Although calculations are executed collaboratively in studio teams, the take-off report submission is strictly individual.
                    </span>
                  )
                },
                {
                  icon: "📏",
                  text: (
                    <span>
                      <strong>Precision Rounding:</strong> Maintain 4 decimal places during intermediate steps; round all final BoQ item quantities strictly to <strong>3 decimal places</strong>.
                    </span>
                  )
                }
              ]}
            />
          </InteractiveCard>
        </div>
      }
      rightContent={
        <div className="flex flex-col justify-center h-full select-text animate-fadeIn">
          <InteractiveCard title="Course Outcome Alignment">
            <div className="flex flex-col gap-2.5 text-left">
              <SlideBadge variant="info" label="CO2 Mapped" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                This studio session directly maps to <strong>CO2 (Prepare Bill of Quantities)</strong>:
              </p>
              <div className="p-3 bg-muted rounded-xl border border-border/40 text-xs leading-relaxed text-foreground font-semibold font-sans">
                "Prepare the bill of quantity for different work packages of a civil engineering project."
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed italic">
                Your ability to calculate roadway side slopes, perform gradient-based formation level offsets, and average spot levels is the core assessment metric.
              </p>
            </div>
          </InteractiveCard>
        </div>
      }
    />
  );
};

// ============================================================================
// Slide: Quizzes Divider
// ============================================================================
export const QuizzesDividerSlide: React.FC = () => (
  <TopicDividerLayout
    topicNumber="07"
    title="Interactive Checkpoints"
    description="Evaluating Cross-Sections, Compaction Voids, Gradients, and Grids"
  />
);

// ============================================================================
// Slide 15: Quiz Checkpoint 1 (Roadway Cross-Section Area)
// ============================================================================
export const Slide15: React.FC = () => {
  const questionText = React.useMemo(() => {
    const qFn = (reg: string) => parameterResolver.resolveTemplate(
      'Calculate the cross-sectional area of a road embankment (filling) in square meters (m²) where the formation width B is 10.00m, the side slope s is 2.0:1, and the uniform fill height d is {d} m. Round your answer to exactly 3 decimal places.',
      { d: parameterResolver.lastDigit(1.5, 0.1, 'm') },
      reg
    );
    return Object.assign(qFn, {
      formula: 'Calculate the cross-sectional area of a road embankment (filling) in square meters (m²) where the formation width B is 10.00m, the side slope s is 2.0:1, and the uniform fill height d is (1.5 + [last digit] × 0.1) m. Round your final answer to exactly 3 decimal places.'
    });
  }, []);

  return (
    <FullWidthLayout title="Roadway Cross-Section Area Quiz">
      <div className="w-full max-w-[720px] mx-auto mt-6">
        <QuizCardOrchestrator
          quizId="qs_2023_lec8_q1"
          questionText={questionText}
          quizType="numeric-input"
        />
      </div>
    </FullWidthLayout>
  );
};

// ============================================================================
// Slide 16: Quiz Checkpoint 2 (Compacted Embankment Volume Correction)
// ============================================================================
export const Slide16: React.FC = () => {
  const questionText = React.useMemo(() => {
    const qFn = (reg: string) => parameterResolver.resolveTemplate(
      'Calculate the required raw in-situ soil excavation volume (bank measure) in cubic meters (m³) to construct a compacted roadway embankment of net design volume V_net = {V} m³, assuming a compaction shrinkage factor of 0.90. Round your answer to exactly 3 decimal places.',
      { V: parameterResolver.lastDigit(500, 10, 'm³') },
      reg
    );
    return Object.assign(qFn, {
      formula: 'Calculate the required raw in-situ soil excavation volume (bank measure) in cubic meters (m³) to construct a compacted roadway embankment of net design volume V_net = (500 + [last digit] × 10) m³, assuming a compaction shrinkage factor of 0.90. Round your final answer to exactly 3 decimal places.'
    });
  }, []);

  return (
    <FullWidthLayout title="Compacted Embankment Soil Volume Quiz">
      <div className="w-full max-w-[720px] mx-auto mt-6">
        <QuizCardOrchestrator
          quizId="qs_2023_lec8_q2"
          questionText={questionText}
          quizType="numeric-input"
        />
      </div>
    </FullWidthLayout>
  );
};

// ============================================================================
// Slide: Quiz Checkpoint 3 (Longitudinal Gradient FL Quiz)
// ============================================================================
export const GradientFLQuizSlide: React.FC = () => {
  const questionText = React.useMemo(() => {
    const qFn = (reg: string) => parameterResolver.resolveTemplate(
      'Calculate the Formation Level (FL) in meters at Station 3 (chainage 200m) for a roadway with a starting FL of 50.00m at Station 1 (chainage 0m), given a downward gradient of 1 in {G} and station intervals of 100m. Round your answer to exactly 3 decimal places.',
      { G: parameterResolver.lastDigit(500, 50) },
      reg
    );
    return Object.assign(qFn, {
      formula: 'Calculate the Formation Level (FL) in meters at Station 3 (chainage 200m) for a roadway with a starting FL of 50.00m at Station 1 (chainage 0m), given a downward gradient of 1 in (500 + [last digit] × 50) and station intervals of 100m. Round your final answer to exactly 3 decimal places.'
    });
  }, []);

  return (
    <FullWidthLayout title="Roadway Gradient FL Checkpoint Quiz">
      <div className="w-full max-w-[720px] mx-auto mt-6">
        <QuizCardOrchestrator
          quizId="qs_2023_lec8_q3"
          questionText={questionText}
          quizType="numeric-input"
        />
      </div>
    </FullWidthLayout>
  );
};

// ============================================================================
// Slide: Quiz Checkpoint 4 (Grid Cell Volume Quiz)
// ============================================================================
export const GridCellVolumeQuizSlide: React.FC = () => {
  const questionText = React.useMemo(() => {
    const qFn = (reg: string) => parameterResolver.resolveTemplate(
      'Calculate the excavation volume in cubic meters (m³) of a single square grid cell (dimensions 5.00m × 5.00m) where the measured corner depths (EGL minus FL) are d1 = 1.20m, d2 = 1.50m, d3 = {d3} m, and d4 = 1.60m. Round your answer to exactly 3 decimal places.',
      { d3: parameterResolver.lastDigit(1.00, 0.10, 'm') },
      reg
    );
    return Object.assign(qFn, {
      formula: 'Calculate the excavation volume in cubic meters (m³) of a single square grid cell (dimensions 5.00m × 5.00m) where the measured corner depths (EGL minus FL) are d1 = 1.20m, d2 = 1.50m, d3 = (1.00 + [last digit] × 0.10) m, and d4 = 1.60m. Round your final answer to exactly 3 decimal places.'
    });
  }, []);

  return (
    <FullWidthLayout title="Grid Cell Volume Checkpoint Quiz">
      <div className="w-full max-w-[720px] mx-auto mt-6">
        <QuizCardOrchestrator
          quizId="qs_2023_lec8_q4"
          questionText={questionText}
          quizType="numeric-input"
        />
      </div>
    </FullWidthLayout>
  );
};

// ============================================================================
// Slide 17: Thank You / Conclusion
// ============================================================================
export const Slide17: React.FC<SlideProps> = () => (
  <ThankYouLayout
    title="Thank You"
    subtitle="Let's proceed to the sessional drafting exercises for roadway earthworks!"
  />
);
