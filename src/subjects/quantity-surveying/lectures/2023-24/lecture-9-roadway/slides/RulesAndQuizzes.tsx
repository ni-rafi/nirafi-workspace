import React from 'react';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import { ThankYouLayout } from '@/shared/layouts/ThankYouLayout';
import { TwoColumnLayout } from '@/shared/layouts/TwoColumnLayout';
import {
  InteractiveCard,
  SlideBullet,
  SlideBadge
} from '@/features/presentation/components/elements';
import { QuizCardOrchestrator } from '@/features/quiz';
import { parameterResolver } from '@/features/quiz/utils/parameterResolver';
import { SlideProps } from '@/features/presentation/components/slides/SlideRenderer';

// Slide 15: Quiz Checkpoint 1 (Pavement WBM Loose Volume)
export const Slide15: React.FC = () => {
  const questionText = React.useMemo(() => {
    const qFn = (reg: string) => parameterResolver.resolveTemplate(
      'Calculate the loose volume of WBM (Water Bound Macadam) sub-base in cubic meters (m³) required for a road segment of length 150m, pavement width 6.00m (note that the sub-base is extended by 0.30m on each side, so width is 6.60m), and sub-base thickness H = {H} m, assuming a compaction factor of 1.25. Round your final answer to exactly 3 decimal places.',
      { H: parameterResolver.lastDigit(0.15, 0.01, 'm') },
      reg
    );
    return Object.assign(qFn, {
      formula: 'Calculate the loose volume of WBM (Water Bound Macadam) sub-base in cubic meters (m³) required for a road segment of length 150m, pavement width 6.00m (extended sub-base width is 6.60m), and sub-base thickness H = (0.15 + [last digit] × 0.01) m, assuming a compaction factor of 1.25. Round your final answer to exactly 3 decimal places.'
    });
  }, []);

  return (
    <FullWidthLayout title="Pavement Volume Checkpoint Quiz">
      <div className="w-full max-w-[720px] mx-auto mt-6">
        <QuizCardOrchestrator
          quizId="qs_2023_lec9_q1"
          questionText={questionText}
          quizType="numeric-input"
        />
      </div>
    </FullWidthLayout>
  );
};

// Slide 16: Quiz Checkpoint 2 (Box Culvert Concrete Volume)
export const Slide16: React.FC = () => {
  const questionText = React.useMemo(() => {
    const qFn = (reg: string) => parameterResolver.resolveTemplate(
      'Calculate the RCC concrete volume in cubic meters (m³) for a box culvert of length 10.0m, where the outer width is 2.50m, outer height is 2.20m, inner void width (span) is 1.50m, and inner void height is H = {H} m. Round your final answer to exactly 3 decimal places.',
      { H: parameterResolver.lastDigit(1.20, 0.05, 'm') },
      reg
    );
    return Object.assign(qFn, {
      formula: 'Calculate the RCC concrete volume in cubic meters (m³) for a box culvert of length 10.0m, where the outer width is 2.50m, outer height is 2.20m, inner void width (span) is 1.50m, and inner void height is H = (1.20 + [last digit] × 0.05) m. Round your final answer to exactly 3 decimal places.'
    });
  }, []);

  return (
    <FullWidthLayout title="Culvert Concrete Checkpoint Quiz">
      <div className="w-full max-w-[720px] mx-auto mt-6">
        <QuizCardOrchestrator
          quizId="qs_2023_lec9_q2"
          questionText={questionText}
          quizType="numeric-input"
        />
      </div>
    </FullWidthLayout>
  );
};

// Slide: Quiz Checkpoint 3 (Retaining Wall Stem Concrete Volume)
export const SlideQuiz3: React.FC = () => {
  const questionText = React.useMemo(() => {
    const qFn = (reg: string) => parameterResolver.resolveTemplate(
      'Calculate the concrete volume in cubic meters (m³) for a tapered concrete retaining wall stem of height H = {H} m and length 12.0m, where the stem top width is 0.45m and the bottom width is 0.90m. Round your final answer to exactly 3 decimal places.',
      { H: parameterResolver.lastDigit(3.00, 0.10, 'm') },
      reg
    );
    return Object.assign(qFn, {
      formula: 'Calculate the concrete volume in cubic meters (m³) for a tapered concrete retaining wall stem of height H = (3.00 + [last digit] × 0.10) m and length 12.0m, where the stem top width is 0.45m and the bottom width is 0.90m. Round your final answer to exactly 3 decimal places.'
    });
  }, []);

  return (
    <FullWidthLayout title="Retaining Wall Stem Concrete Quiz">
      <div className="w-full max-w-[720px] mx-auto mt-6">
        <QuizCardOrchestrator
          quizId="qs_2023_lec9_q3"
          questionText={questionText}
          quizType="numeric-input"
        />
      </div>
    </FullWidthLayout>
  );
};

// Slide: Quiz Checkpoint 4 (Culvert Abutment Soling Area)
export const SlideQuiz4: React.FC = () => {
  const questionText = React.useMemo(() => {
    const qFn = (reg: string) => parameterResolver.resolveTemplate(
      'Calculate the total Brick Flat Soling (BFS) area in square meters (m²) required under two parallel culvert abutments, each having length L = {L} m and base footing width 1.20m. Round your final answer to exactly 3 decimal places.',
      { L: parameterResolver.lastDigit(6.00, 0.10, 'm') },
      reg
    );
    return Object.assign(qFn, {
      formula: 'Calculate the total Brick Flat Soling (BFS) area in square meters (m²) required under two parallel culvert abutments, each having length L = (6.00 + [last digit] × 0.10) m and base footing width 1.20m. Round your final answer to exactly 3 decimal places.'
    });
  }, []);

  return (
    <FullWidthLayout title="Culvert Abutment Soling Area Quiz">
      <div className="w-full max-w-[720px] mx-auto mt-6">
        <QuizCardOrchestrator
          quizId="qs_2023_lec9_q4"
          questionText={questionText}
          quizType="numeric-input"
        />
      </div>
    </FullWidthLayout>
  );
};

// Slide: Lab Report 9 Submission Directives
export const SlideLabDirectives: React.FC = () => {
  return (
    <TwoColumnLayout
      title="Lab Report 9: Submission Directives"
      bgVariant="default"
      leftWidth="50%"
      leftContent={
        <div className="flex flex-col gap-4">
          <InteractiveCard title="Submission Rules">
            <ul className="flex flex-col gap-3.5">
              <SlideBullet revealAt={0} icon="📝">
                <span>
                  <strong>Individual Spreadsheet:</strong> Each student must prepare and submit an independent quantity take-off sheet for the pavement layers, retaining wall, and culvert structure.
                </span>
              </SlideBullet>
              <SlideBullet revealAt={1} icon="📏">
                <span>
                  <strong>3 Decimal Precision:</strong> All volume (m³), area (m²), and weight (kg) calculations must be rounded to exactly <strong>3 decimal places</strong>.
                </span>
              </SlideBullet>
              <SlideBullet revealAt={2} icon="📋">
                <span>
                  <strong>PWD Rate Schedule 2022:</strong> Use the official item codes, descriptions, and structural constants matching the Bangladesh PWD Schedule of Rates 2022.
                </span>
              </SlideBullet>
            </ul>
          </InteractiveCard>
        </div>
      }
      rightContent={
        <div className="flex flex-col justify-center h-full">
          <InteractiveCard title="Course Outcome Alignment">
            <div className="flex flex-col gap-2.5">
              <SlideBadge variant="info" label="CO2 Mapped" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                This studio session directly maps to <strong>CO2 (Prepare Bill of Quantities)</strong>:
              </p>
              <div className="p-3 bg-muted rounded-xl border border-border/40 text-xs leading-relaxed text-foreground font-semibold">
                "Prepare the bill of quantity for different work packages of a civil engineering project."
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed italic">
                This lab develops the core skill of compiling structured measurement sheets and rate analysis tables for public sector roadway billing.
              </p>
            </div>
          </InteractiveCard>
        </div>
      }
    />
  );
};

// Slide 17: Thank You / Conclusion
export const Slide17: React.FC<SlideProps> = () => (
  <ThankYouLayout
    title="Thank You"
    subtitle="Let's proceed to the lab exercise for Roadway Pavements, Retaining Walls, and Culverts!"
  />
);
