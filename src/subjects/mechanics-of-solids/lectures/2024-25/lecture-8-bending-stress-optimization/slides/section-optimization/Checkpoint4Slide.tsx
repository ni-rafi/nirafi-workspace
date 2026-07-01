import React from 'react';
import { QuizCardOrchestrator } from '@/features/quiz';
import { FullWidthLayout } from '@/shared/layouts/FullWidthLayout';
import { parameterResolver } from '@/features/quiz/utils/parameterResolver';

export const Checkpoint4Slide: React.FC = () => {
  const h0_param = parameterResolver.lastDigit(150.0, 10.0, ' mm');

  const questionObj = {
    formula: `A tapered cantilever beam of width b = 100 mm has a depth varying linearly with rate k = 0.1. If the depth at the free end is h0 = ${h0_param.formula}, determine the distance (mm) from the free end where maximum bending stress occurs under a concentrated end load.`,
    resolve: (reg: string) => {
      const h0_val = h0_param.resolve(reg);
      return `A tapered cantilever beam of width b = 100 mm has a depth varying linearly with rate k = 0.1. If the depth at the free end is h0 = ${h0_val} mm, determine the distance (mm) from the free end where maximum bending stress occurs under a concentrated end load.`;
    }
  };

  return (
    <FullWidthLayout title="Checkpoint 4: Tapered Beam Peak Stress Location" bgVariant="default">
      <div className="w-full max-w-2xl mx-auto py-2">
        <QuizCardOrchestrator
          quizId="mos_2024_lec8_q4"
          questionText={questionObj}
          quizType="numeric-input"
        />
      </div>
    </FullWidthLayout>
  );
};

export default Checkpoint4Slide;
