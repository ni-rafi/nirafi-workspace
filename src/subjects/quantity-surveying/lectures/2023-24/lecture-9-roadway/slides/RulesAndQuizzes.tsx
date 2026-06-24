import React from 'react';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import { ThankYouLayout } from '@/shared/layouts/ThankYouLayout';
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

// Slide 17: Thank You / Conclusion
export const Slide17: React.FC<SlideProps> = () => (
  <ThankYouLayout
    title="Thank You"
    subtitle="Let's proceed to the lab exercise for Roadway Pavements, Retaining Walls, and Culverts!"
  />
);
